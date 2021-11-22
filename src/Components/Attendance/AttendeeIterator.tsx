import React, { useEffect, useState, lazy } from "react";
import { PhotographIcon, TrashIcon } from '@heroicons/react/outline';

import AttendeeInformation from "./AttendeeInformation";
const Loading = lazy(() => import("../Loading/Loading"));

import { Status } from "./InterfaceAttendee";
import { useAuth } from "../../Context/AuthContext";
import { AttendeeModal } from "../../Modal/AttendeeModal";
import { QRCodeModal, QRCodeModalDefault } from "../../Modal/QRCodeModal";

interface IAttendeeIterator {
  docRef: string;
  searchString?: string;
  reFetch?: number;
}

interface ISingleAttendee {
  Information: AttendeeModal;
  docRef: string;
  key?: number
};

const AttendeeIterator: React.FC<IAttendeeIterator> = ({ docRef, searchString, reFetch }): JSX.Element => {
  const [attendees, setAttendees] = useState<AttendeeModal[]>([]);
  const [loading, setLoading] = useState<boolean>();
  const [meetingDetails, setMeetingDetails] = useState<QRCodeModal>(QRCodeModalDefault);
  const [destroyAlert, setDestroyedAlert] = useState<string | undefined>();

  const { GetStudentsWithDocRef, BarcodeExist, DestoryBarcode } = useAuth();

  const handleDestroyQrCode = () => {
    if (meetingDetails.destroyed === true) {
      setDestroyedAlert("Barcode Already Destroyed");
      setTimeout(() => setDestroyedAlert(undefined), 4000)
      return
    }

    DestoryBarcode!!(docRef)
      .then((message) => {
        setDestroyedAlert("Barcode Destroyed successfully");
        setTimeout(() => setDestroyedAlert(undefined), 4000)
      })
  }

  const exportCSV = () => {
    var csvData = 'Index,Unique ID,Email,Full Name,Status,Datestamp,Timestamp\n';
    attendees.forEach((item, index) => {
      csvData += `${(index + 1)},${item.toString()}`;
      csvData += '\n';
    })

    var hiddenElement = document.createElement('a');
    hiddenElement.href = `data:text/csv;charset=utf-8,${encodeURI(csvData)}`;
    hiddenElement.target = '_blank';
    hiddenElement.download = 'Attandance.csv'
    hiddenElement.click();
  }

  useEffect(() => {
    setLoading(true);

    const getAttendeesFromFirebase = () => {
      GetStudentsWithDocRef!!(docRef)
        .then(students => {
          setAttendees(students);
        })
    }

    getAttendeesFromFirebase();

    setLoading(false)
  }, [reFetch])

  useEffect(() => {
    setLoading(true)

    BarcodeExist!!(docRef)
      .then(response => {
        const data = response.data;

        setMeetingDetails(data);
      })

    setLoading(false);
  }, [docRef])

  const searchFunction = (item: AttendeeModal) => {
    let ss = '';
    if (searchString === undefined) ss = '';
    else ss = searchString.toLocaleLowerCase();

    if (ss !== '') {
      if (item.email_id.toLocaleLowerCase().includes(ss)) return true;
      else if (item.full_name.toLocaleLowerCase().includes(ss)) return true;
      else if (item.meeting_id.toLocaleLowerCase().includes(ss)) return true;
      else if (item.unique_id.toLocaleLowerCase().includes(ss)) return true;
      else return false;
    }

    return true;
  }

  if (loading) return <Loading />

  return (
    <div className="space-y-3">
      <section className={`flex space-x-2 justify-center md:justify-start ${(attendees.length === 0) && 'hidden'}`}>
        <span className="px-3 py-1 rounded-l-lg border-2 border-sky-500 font-plex-sans-medium">{meetingDetails.meeting_id}</span>
        <span className="px-3 py-1 border-2 border-sky-500 font-plex-sans-medium">{meetingDetails.convertDatestring()}</span>
        <button className={`px-3 py-1 ${(!meetingDetails.destroyed) ? 'bg-red-500' : 'bg-sky-500'}  hover:bg-blue-500 font-plex-sans-medium text-white`} onClick={() => handleDestroyQrCode()}>{(meetingDetails.destroyed) ? 'Destroyed' : 'Not Destoryed'}</button>
        <button className={`px-3 py-1 bg-sky-500 hover:bg-blue-500 rounded-r-md font-plex-sans-medium text-white`} onClick={() => exportCSV()}>Export CSV</button>
      </section>
      {
        destroyAlert &&
        <div className="bg-yellow-300 px-4 py-2 rounded-md">
          {destroyAlert}
        </div>
      }
      {
        attendees.filter(item => searchFunction(item)).map((item: AttendeeModal) => {
          return (
            <div key={item.uid} className="space-y-2">
              <SingleAttendee Information={item} docRef={docRef} />
            </div>
          )
        })
      }
    </div>
  )
}


const SingleAttendee: React.FC<ISingleAttendee> = ({ Information, docRef }): JSX.Element => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [profilePicUrl, setProfilePicUrl] = useState<string>('');
  const [destroyed, setDestroyed] = useState<boolean>(false)

  const { DeleteUserAttandance } = useAuth();

  const handleDeleteAttendance = () => {
    DeleteUserAttandance!!(docRef, Information.uid)
      .then(alert => {
        if (alert.messageType === 2) {
          setDestroyed(true);
        }
      })
  }


  const { GetUserProfilePicURL } = useAuth();
  useEffect(() => {
    GetUserProfilePicURL!!(Information.uid)
      .then((url) => {
        setProfilePicUrl(url);
      })
  })

  return (
    <button
      className=
      {
        `grid grid-rows-auto w-full
          p-5 rounded-md
          ${(Information.status === Status.Present) ? 'bg-white border-sky-500' :
          'border-red-500'
        }
          overflow-auto space-x-1 md:space-x-5 cursor-pointer
          border-l-4
          duration-500 shadow-md hover:shadow-xl
          ${
           (destroyed === true)? 'text-gray-400': 'text-black'
          }`
      }
      onClick={() => setIsClicked(!isClicked)}>
      <section className="flex space-x-4 justify-between overflow-auto">
        <div className="flex space-x-5 items-center">
          {
            profilePicUrl === "No url" ?
              <PhotographIcon className={`h-10 w-10 ${(Information.status === 1) ? 'text-red-500' : 'text-sky-500'}`} /> :
              <img src={profilePicUrl} className="h-10 w-10 rounded-full" />
          }
          <span className="text-lg font-plex-sans-medium truncate">{Information.full_name}</span>
        </div>
        {
          (!isClicked) ?
            <div className="flex space-x-5 items-center">
              <span className="truncate">{Information.email_id}</span>
            </div> :
            <TrashIcon className="h-7 hover:text-red-600" onClick={() => handleDeleteAttendance()}/>
        }
      </section>
      {(isClicked) && <AttendeeInformation attendeeInfo={Information} />}
    </button>
  );
};

export default AttendeeIterator;
