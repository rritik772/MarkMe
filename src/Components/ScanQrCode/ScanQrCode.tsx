import { useState } from 'react';
import QrReader from 'react-weblineindia-qrcode-scanner'
import { Link } from "react-router-dom";
import { ArrowCircleLeftIcon } from "@heroicons/react/outline";

import "./ScanQrCode.css"
import useToggle from '../../Library/useToggle';
import MessageBox, { Message } from '../Message/MessageBox';
import MeetingInfo from './Meeting_Info';
import InterfaceMeeting from "./InterfaceMeeting";
import { withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from '../Loading/Loading';

export function ScanQrCode() {
  const [ alert, setAlert ] = useState<Message | null>();
  const [ scannedData, setScannedData ] = useState<InterfaceMeeting | undefined>();
  const [ toggleCamera, setToggleCamera ] = useToggle(true);

  const handleScanningResult = (value: string) => {
    setScannedData(undefined);
    if (value !== null && value.length > 0){
      try {
        const data: InterfaceMeeting = JSON.parse(value);

        if (data.meeting_id == undefined || data.host_email_id == undefined || data.topic == undefined) throw "Invalid QRcode";

        setScannedData(data);
        setToggleCamera();
      }catch(error) {
        setAlert(new Message(0, "Somethin went wrong!"));
        setToggleCamera();
      }
    }
  }

  return (
    <>
      <div className="w-full svg-background-layered-steps"></div>
      <div className="md:w-1/2 lg:w-5/12 xl:w-4/12 mx-auto flex items-center mb-3">
        <Link to="/dashboard" className=""><ArrowCircleLeftIcon className="h-10 text-blue-500 font-bold"/></Link>
        <span className="block my-5 w-full text-3xl text-center font-plex-sans">Mark Attendence</span>
      </div>
      {(alert) && <MessageBox message={alert}/>}
      <main className="md:w-1/2 lg:w-5/12 xl:w-4/12 mx-auto p-5 space-y-5 4 shadow-lg">
        <div className="flex space-x-4">
          <button className="w-full py-2 rounded-md bg-sky-500 text-white font-plex-sans-medium transition duration-300 hover:bg-blue-500 hover:shadow-lg" onClick={() => {setAlert(null); setToggleCamera()}}>{(toggleCamera)?'Stop':'Start'} Scanning</button>
        </div>
        {(toggleCamera)?
         <section className="flex justify-center rounded-md overflow-hidden p-5 border-4 border-sky-500 bg-white">
           <QrReader
             delay={50}
             style={{height: 340}}
             onError={(e: any) => setAlert(new Message(0, "Something went wrong."))}
             onScan={(e: any) => handleScanningResult(e)}
           />
         </section> :
         <MeetingInfo scannedData={scannedData}/>
        }
      </main>
      {
        (scannedData) &&
          <main className="md:w-1/2 lg:w-5/12 xl:w-4/12 mx-auto mt-5 p-5 space-y-5 bg-white shadow-md hover:shadow-xl duration-300">
            <div className="flex space-x-4">
              <button className="w-full py-2 rounded-md bg-teal-500 text-white font-plex-sans-medium transition duration-300 hover:bg-teal-600 hover:shadow-lg" onClick={() => {setAlert(null); setToggleCamera()}}>Mark Present</button>
              <button className="w-full py-2 rounded-md bg-yellow-400 text-black font-plex-sans-medium transition duration-300 hover:bg-yellow-500 hover:shadow-lg" onClick={() => setToggleCamera()}>Mark Leave</button>
            </div>
          </main>
      }
    </>
  );
};

export default withAuthenticationRequired(ScanQrCode, {
  onRedirecting: () => <Loading/>
})
