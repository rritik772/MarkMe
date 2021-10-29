import { ArrowCircleLeftIcon, EmojiHappyIcon } from "@heroicons/react/outline";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";
import useToggle from "../../../Library/useToggle";
import { AttendeeModal } from "../../../Modal/AttendeeModal";
import AttendeeInformation from "../../Attendance/AttendeeInformation";
import { Status } from "../../Attendance/InterfaceAttendee";
import SingleAttendee from "../../Attendance/SingleAttendee";
import Loading from "../../Loading/Loading";

const MyAttendance = () => {
  const [ userAllAttendance, setUserAllAttendance ] = useState<AttendeeModal[]>([]);
  const [ loading, setLoading ] = useToggle();
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const { currentUser, GetUserAttandance } = useAuth();

    const userAttendanceFetcher = useMemo( async () => {
      setLoading();

        const { uid } = currentUser!!;
        await GetUserAttandance!!(uid)
            .then( data => {
              setUserAllAttendance( data )
            })
      setLoading();
    }, [currentUser])

  return (
    <div className="container mx-auto space-y-4">
      <section className="grid grid-cols-3 lg:w-5/12 mx-auto font-plex-sans">
        <Link to="/dashboard/profile" className="justify-self-center"><ArrowCircleLeftIcon className="h-10 text-blue-500"/></Link>
        <span className="text-3xl font-plex-sans justify-self-center">Profile</span>
      </section>
      { loading && <Loading/> }
      {
        userAllAttendance.map(item => (
          <div key={item.meeting_id} className="shadow-md rounded-md">
            <SingleAttendee Information={item}/>
          </div>
        ))
      }
    </div>
  )
}

const singleAttandance = ({ Information }) => {
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
  )
}

export default MyAttendance;
