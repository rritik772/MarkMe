import { ArrowCircleLeftIcon, EmojiHappyIcon, ExclamationCircleIcon, SearchIcon } from "@heroicons/react/outline";
import React, { useMemo, useState, lazy } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";
import { AttendeeModal } from "../../../Modal/AttendeeModal";
import { Status } from "../../Attendance/InterfaceAttendee";

import useToggle from "../../../Library/useToggle";

import Loading from "../../Loading/Loading";
import AttendeeInformation from "../../Attendance/AttendeeInformation";

const MyAttendance = () => {
  const [userAllAttendance, setUserAllAttendance] = useState<AttendeeModal[]>([]);
  const [loading, setLoading] = useToggle();
  const [searchString, setSearchString] = useState<string>('');

  const { currentUser, GetUserAttendance } = useAuth();

  useMemo(async () => {
    setLoading();

    const { uid } = currentUser!!;
    await GetUserAttendance!!(uid)
      .then((data: AttendeeModal[]) => {
        setUserAllAttendance(data)
      })
    setLoading();
  }, [currentUser])

  const searchFunction = (item: AttendeeModal) => {
    let ss = '';
    if (searchString === undefined) ss = '';
    else ss = searchString.toLocaleLowerCase();

    if (ss !== '') {
      if (item.email_id.toLocaleLowerCase().includes(ss)) return true;
      else if (item.full_name.toLocaleLowerCase().includes(ss)) return true;
      else if (item.meeting_id.toLocaleLowerCase().includes(ss)) return true;
      else if (item.unique_id.toLocaleLowerCase().includes(ss)) return true;
      else if (item.convertDatestamp().includes(ss)) return true;
      else return false;
    }

    return true;
  }

  return (
    <div className="container mx-auto space-y-4 mt-10">
      <section className="grid grid-cols-3 lg:w-5/12 mx-auto font-plex-sans">
        <Link to="/dashboard/profile" className="justify-self-center"><ArrowCircleLeftIcon className="h-10 text-blue-500" /></Link>
        <span className="text-3xl font-plex-sans justify-self-center">Attandance</span>
      </section>
      <div className="flex justify-center items-center py-5 space-x-4">
        <input
          type="text"
          id="searcher"
          className="border-2 border-gray-500 p-2 rounded-md md:w-3/12 focus:outline-none hover:border-sky-500 focus:border-sky-500"
          value={searchString}
          onChange={e => setSearchString(e.target.value)}
        />
        <SearchIcon className="h-8 inline-block text-black hover:text-sky-600 cursor-pointer" />
      </div>
      {loading && <Loading />}
      {
        userAllAttendance.length === 0 && !loading &&
        <main className="md:w-1/2 lg:w-5/12 xl:w-4/12 mx-auto flex items-center p-5 space-x-5 rounded-md bg-white shadow-lg">
          <ExclamationCircleIcon className="p-2 text-white bg-sky-500 h-32 rounded-md" />
          <div className="flex flex-col">
            <span className="text-3xl font-plex-sans">Oops</span>
            <span className="text-3xl font-plex-sans">No Data</span>
            <span className="text-3xl font-plex-sans">Avaliable</span>
          </div>
        </main>
      }
      {
        userAllAttendance.filter(item => searchFunction(item)).map(item => (
          <div key={item.meeting_id} className="shadow-md rounded-md">
            <SingleAttandance Information={item} />
          </div>
        ))
      }
    </div>
  )
}

const SingleAttandance: React.FC<{ Information: AttendeeModal }> = ({ Information }) => {

  const [isClicked, setIsClicked] = useState<boolean>()

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
            duration-500 shadow-md hover:shadow-xl`
      }
      onClick={() => setIsClicked(!isClicked)}>
      <section className="flex space-x-4 justify-between overflow-auto">
        <div className="flex space-x-5 items-center">
          <EmojiHappyIcon className="h-8" />
          <span className="text-lg font-plex-sans-medium truncate">{Information.meeting_id}</span>
        </div>
        {
          (!isClicked) &&
          <div className="flex space-x-5 items-center">
            <span className="truncate">{Information.convertTimestamp()}</span>
          </div>
        }
      </section>
      {(isClicked) && <AttendeeInformation attendeeInfo={Information} />}
    </button>
  )
}

export default MyAttendance;
