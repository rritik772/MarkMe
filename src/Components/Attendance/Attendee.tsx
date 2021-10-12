import React, { useState } from "react";
import { EmojiHappyIcon } from "@heroicons/react/outline";

import Attendees from "./../../Test/Attendance/Attendees";
import { IAttendee, Status } from "./InterfaceAttendee";
import AttendeeInformation from "./AttendeeInformation";

function Attendee() {
  const [attendees, setAttendees] = useState<IAttendee>(Attendees);

  return(
    <>
      {
        attendees.map((item: IAttendee, index: number) => (
          <SingleAttendee Information={item} key={index}/>
        ))
      }
    </>
  );
};

function SingleAttendee({ Information }): React.FC<IAttendee> {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  return (
    <button
      className={
        `grid grid-rows-auto w-full
         p-5 rounded-md
         ${
            (Information.status === Status.Present)?'bg-white hover:bg-sky-100':
            (Information.status === Status.Leave)?  'bg-yellow-100 hover:bg-yellow-200':
                                                    'bg-red-100 hover:bg-red-200'
          }
         overflow-auto space-x-1 md:space-x-5 cursor-pointer
         duration-500 hover:shadow-xl`}
      onClick={() => setIsClicked(!isClicked)}>
      <section className="flex gap-2 justify-between">
        <div className="flex space-x-5 items-center">
          <EmojiHappyIcon className="h-8"/>
          <span className="text-lg font-plex-sans-medium truncate">{Information.name}</span>
        </div>
        {
          (!isClicked) &&
            <div className="flex space-x-5 items-center">
              <span className="truncate">{Information.email_id}</span>
            </div>
        }
       </section>
      { (isClicked)&&<AttendeeInformation onClick={(e) => setIsClicked(e)} attendeeInfo={Information}/> }
    </button>
  );
};

export default Attendee;
