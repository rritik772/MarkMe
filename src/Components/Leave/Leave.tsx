import { useState } from "react"
import MessageBox, { Message, IMessageType } from "../Message/MessageBox";
import "./Leave.css"

export default function Leave() {
  const [ remarks, setRemarks ] = useState<string>('');
  const [ meetingID, setMettingID ] = useState<string>('');

  const [ remarkLength, setRemarkLength ] = useState<number>(0);
  const [ alert, setAlert ] = useState<Message>();

  const remarksLengthChecker = (rmk: string) => {
    if (rmk.length >= 501){
      setAlert(new Message(IMessageType.Info, "Remarks are too long"));
      return;
    }
    setRemarkLength(rmk.length);
    setRemarks(rmk);
    setAlert(null);
  }

  const meetingIDLengthChecker = (mt_ID: stirng) => {
    if (mt_ID.length >= 101){
      setAlert( new Message(1, "Meeting ID is too long") );
      return;
    }
    setMettingID(mt_ID);
    setAlert(null)
  }

  return (
    <>
      <span className="block my-5 w-full text-2xl text-center font-plex-sans-medium">Mark Me Leave</span>
      <main className="md:w-1/2 lg:w-5/12 xl:w-4/12 mx-auto p-5 rounded-md bg-sky-200 md:border-4 border-sky-500 shadow-lg space-y-5">
        <label htmlFor="meeting_id" className="flex flex-col space-y-2">
          <span className="text-lg font-plex-sans">Meeting ID *</span>
          <input id="meeting_id" className="p-2 rounded-md text-lg font-plex-sans-medium" placeholder="Type here..." value={meetingID} onChange={(e) => meetingIDLengthChecker(e.target.value)}/>
        </label>
        <label htmlFor="remark" className="flex flex-col space-y-2">
          <span className="text-lg font-plex-sans">Remark</span>
          <textarea id="remark" className="max-h-48 p-2 rounded-md text-lg font-plex-sans" placeholder="Type here..." value={remarks} onChange={(e) => remarksLengthChecker(e.target.value)}/>
          <small className={`self-end ${(remarkLength >= 500)&&'text-red-500 font-bold'}`}>{remarkLength}/500</small>
        </label>
        <div className="space-x-4 grid grid-cols-2">
          <button className="py-2 rounded-md bg-sky-500 text-white font-plex-sans-medium transition duration-300 hover:bg-blue-500 hover:shadow-lg" onClick={() => { remarksLengthChecker(''); setMettingID('') }}>Clear</button>
          <button className="pi-2 rounded-md bg-sky-500 text-white font-plex-sans-medium transition duration-300 hover:bg-blue-500 hover:shadow-lg">Mark Leave</button>
        </div>
      </main>
      {(alert) && <MessageBox message={alert}/> }
    </>
  )
};
