import React, { useState, lazy } from "react";
import { EmojiHappyIcon } from "@heroicons/react/outline";

import { Status } from "./InterfaceAttendee";
import { AttendeeModal } from "../../Modal/AttendeeModal";

const AttendeeInformation = lazy(() => import("./AttendeeInformation"));

const SingleAttendee: React.FC<{ Information: AttendeeModal }> = ({ Information }): JSX.Element => {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  return (
    <button
      className={
        `grid grid-rows-auto w-full
          p-5 rounded-md
          ${
          (Information.status === Status.Present)?'bg-white hover:bg-sky-100':
          'bg-red-100 hover:bg-red-200'
          }
          overflow-auto space-x-1 md:space-x-5 cursor-pointer
          duration-500 hover:shadow-xl`}
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

export default SingleAttendee;
