import React, { useEffect, useState } from "react";
import { EmojiHappyIcon } from "@heroicons/react/outline";

import { IAttendee, Status } from "./InterfaceAttendee";
import AttendeeInformation from "./AttendeeInformation";
import { useAuth } from "../../Context/AuthContext";
import useToggle from "../../Library/useToggle";
import { LoadBundleTask } from "firebase/firestore";
import Loading from "../Loading/Loading";

interface ISingleAttendee {
  Information: IAttendee;
  key: number
};

const AttendeeIterator: React.FC<{ docRef: string }> = ({ docRef }): JSX.Element => {
  const [ attendees, setAttendees ] = useState([]);
  const [ loading, setLoading ] = useState<boolean>();

  const { currentUser, GetStudentsWithDocRef } = useAuth();

  useEffect(() => {
    const getAttendeesFromFirebase = () => {
      GetStudentsWithDocRef!!( docRef )
      .then(students => {
        setAttendees(students);
      })
    }

    getAttendeesFromFirebase();
  }, [])

    return (
    <div className="space-y-3">
      {
        attendees.map((item: IAttendee, index: number) => {
          return (
            <SingleAttendee Information={item} key={index}/>
          )
        })
      }
    </div>
    )
  }


const SingleAttendee: React.FC<ISingleAttendee> = ({ Information }): JSX.Element => {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  return (
    <button
      className=
        {
          `grid grid-rows-auto w-full
          p-5 rounded-md
          ${
          (Information.status === Status.Present)?'bg-white border-sky-500':
          'border-red-500'
          }
          overflow-auto space-x-1 md:space-x-5 cursor-pointer
          border-l-4
          duration-500 shadow-md hover:shadow-xl`
        }
          onClick={() => setIsClicked(!isClicked)}>
      <section className="flex space-x-4 justify-between overflow-auto">
        <div className="flex space-x-5 items-center">
          <EmojiHappyIcon className="h-8"/>
          <span className="text-lg font-plex-sans-medium truncate">{Information.full_name}</span>
        </div>
        {
          (!isClicked) &&
            <div className="flex space-x-5 items-center">
              <span className="truncate">{Information.email_id}</span>
            </div>
        }
      </section>
      { (isClicked)&&<AttendeeInformation attendeeInfo={Information}/> }
    </button>
  );
};

export default AttendeeIterator;
