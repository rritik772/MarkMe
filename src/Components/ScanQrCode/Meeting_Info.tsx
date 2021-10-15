import React, { useState } from "react";
import MessageBox, { Message } from "../Message/MessageBox";
import InterfaceMeeting from "./InterfaceMeeting";

export default function MeetingInfo( { scannedData } ): React.FC<InterfaceMeeting> {

  let meetingID = "Not Avaliable";
  let topic = "Not Avaliable";
  let hostEmailID = "Not Avaliable";

  if (scannedData){
    meetingID = scannedData.meeting_id;
    topic = scannedData.topic;
    hostEmailID = scannedData.host_email_id;
  }

  return (
    <>
      <main className="space-y-3">
        <section className="flex flex-col">
          <span className="text-lg font-plex-sans">Meeting ID</span>
          <span className="text-lg font-plex-sans-medium">{meetingID}</span>
        </section>
        <section className="flex flex-col">
          <span className="text-lg font-plex-sans">Topic</span>
          <span className="text-lg font-plex-sans-medium">{topic}</span>
        </section>
        <section className="flex flex-col">
          <span className="text-lg font-plex-sans">Host email ID</span>
          <span className="text-lg font-plex-sans-medium">{hostEmailID}</span>
        </section>
      </main>
    </>
  )
}
