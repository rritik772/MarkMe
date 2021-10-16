import { useState } from 'react';
import QrReader from 'react-weblineindia-qrcode-scanner'
import useToggle from '../../Library/useToggle';
import MessageBox, { Message } from '../Message/MessageBox';
import MeetingInfo from './Meeting_Info';
import InterfaceMeeting from "./InterfaceMeeting";

export default function ScanQrCode() {
  const [ alert, setAlert ] = useState<Message>();
  const [ scannedData, setScannedData ] = useState<InterfaceMeeting>();
  const [ toggleCamera, setToggleCamera ] = useToggle(true);

  const handleScanningResult = (value: string) => {
    setScannedData();
    if (value !== null && value.length > 0){
      try {
        const data = JSON.parse(value);

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
      {(alert) && <MessageBox message={alert}/>}
      <main className="md:w-1/2 lg:w-5/12 xl:w-4/12 mx-auto p-5 rounded-md space-y-5 bg-sky-200 md:border-4 border-sky-500 shadow-lg">
        <div className="flex space-x-4">
          <button className="w-full py-2 rounded-md bg-sky-500 text-white font-plex-sans-medium transition duration-300 hover:bg-blue-500 hover:shadow-lg" onClick={() => {setAlert(null); setToggleCamera()}}>{(toggleCamera)?'Stop':'Start'} Scanning</button>
        </div>
        {(toggleCamera)?
         <section className="flex justify-center rounded-md overflow-hidden p-5 border-4 border-sky-500 bg-white">
           <QrReader
             delay={100}
             style={{height: 340}}
             onError={(e) => setAlert(new Message(0, "Something went wrong."))}
             onScan={(e) => handleScanningResult(e)}
           />
         </section> :
         <MeetingInfo scannedData={scannedData}/>
        }
      </main>
      {
        (scannedData) &&
          <main className="md:w-1/2 lg:w-5/12 xl:w-4/12 mx-auto mt-5 p-5 rounded-md space-y-5 bg-sky-200 md:border-4 border-sky-500 shadow-lg">
            <div className="flex space-x-4">
              <button className="w-full py-2 rounded-md bg-teal-500 text-white font-plex-sans-medium transition duration-300 hover:bg-teal-600 hover:shadow-lg" onClick={() => {setAlert(null); setToggleCamera()}}>Mark Present</button>
              <button className="w-full py-2 rounded-md bg-yellow-400 text-black font-plex-sans-medium transition duration-300 hover:bg-yellow-500 hover:shadow-lg" onClick={() => setToggleCamera()}>Mark Leave</button>
            </div>
          </main>
      }
    </>
  );
};
