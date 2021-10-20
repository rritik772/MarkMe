import React ,{ useState } from "react";
import { EmojiHappyIcon } from "@heroicons/react/outline";

import { IAttendee, Status } from "./InterfaceAttendee";

interface IAttendeInformation {
  attendeeInfo: IAttendee
};

const AttendeeInformation: React.FC<IAttendeInformation> = ({ attendeeInfo }): JSX.Element => {
  return(
    <>
      <main className="grid grid-cols-1 md:grid-cols-2 gap-1 text-left place-items-start md:px-8 rounded-md">
        <section className="w-full grid grid-cols-2 justify-item-start rounded-md bg-transparent">
          <span className="font-plex-sans">ID</span>
          <span className="font-plex-sans-medium truncate">{ attendeeInfo.id }</span>
        </section>
        <section className="w-full grid grid-cols-2 justify-item-start rounded-md bg-transparent">
          <span className="font-plex-sans">Meeting ID</span>
          <span className="font-plex-sans-medium truncate">{ attendeeInfo.meeting_id }</span>
        </section>
        <section className="w-full grid grid-cols-2 justify-item-start rounded-md bg-transparent">
          <span className="font-plex-sans">Email ID</span>
          <span className="font-plex-sans-medium truncate">{ attendeeInfo.email_id }</span>
        </section>
        <section className="w-full grid grid-cols-2 justify-item-start rounded-md bg-transparent">
          <span className="font-plex-sans">University</span>
          <span className="font-plex-sans-medium truncate">{ attendeeInfo.university }</span>
        </section>
        <section className="w-full grid grid-cols-2 justify-item-start rounded-md bg-transparent">
          <span className="font-plex-sans">Staus</span>
          <span className="font-plex-sans-medium truncate">{ attendeeInfo.status }</span>
        </section>
      </main>
    </>
  )
}

export default AttendeeInformation;
