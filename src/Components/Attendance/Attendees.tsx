import { QrcodeIcon, ArrowCircleLeftIcon, ArrowCircleRightIcon} from "@heroicons/react/outline";
import { Link, useParams } from "react-router-dom";
import QRCode from "qrcode.react";
import { useEffect, useState } from "react";

import useToggle from "../../Library/useToggle";
import AddStudent from "../AddStudent/AddStudent";
import RemoveStudent from "../RemoveStudent/RemoveStudent";
import SearchStudent from "../SearchStudent/SearchStudent";
import AttendeeIterator from "./AttendeeIterator";
import { useAuth } from "../../Context/AuthContext";
import MessageBox, { Message } from "../Message/MessageBox";

const Attendees = (): JSX.Element => {
  const { docRef } = useParams<{ docRef: string }>();

  const [ toggleAddStudent, setToggleAddStudent ] = useToggle();
  const [ toggleRemoveStudent, setToggleRemoveStudent ] = useToggle();
  const [ toggleSearchStudent, setToggleSearchStudent ] = useToggle();
  const [ toggleBarcode, setToggleBarcode ] = useToggle();
  const [ qrCodeString, setQRCodeString ] = useState<string>();
  const [ reFetch, setReFetch ] = useState<number>(0);
  const [ destroyedAlert, setDestroyedAlert ] = useState<Message | undefined>();
  const [ barcodeAlert, setBarcodeAlert ] = useState<string | undefined>();

  const { GetBarcodeData, DestoryBarcode } = useAuth();

  useEffect(() => {
    GetBarcodeData!!(docRef)
      .then(data => {
        if ( data === undefined ) {
          setBarcodeAlert("No Barcode Avaliable");
          return;
        };
        const barcodeData =  {
          "meeting_id" : `${data.meeting_id}`,
          "topic" : `${data.topic}`,
          "host_email_id" : `${data.host_email_id}`,
          "ref": `${docRef}`
        };

        const json = JSON.stringify(barcodeData);
        setQRCodeString(json);
      });
  }, [ destroyedAlert ])

  const handleDestroyQRCode = () => {
    DestoryBarcode!!(docRef)
      .then((message) => setDestroyedAlert(message))
  }

  return (
    <>
      <div className="space-y-10">
        <section className="grid grid-cols-3 lg:w-1/2 mx-auto font-plex-sans">
          <Link to="/dashboard/qrCodeGenerate"><ArrowCircleLeftIcon className="h-10 text-blue-500"/></Link>
          <span className="text-3xl font-plex-sans">Attendees</span>
        </section>
        <main className="container flex flex-col md:flex-row mx-auto md:space-x-8 items-start">
          <section className="flex-grow w-full p-5 rounded-md space-y-2 bg-white">
            <AttendeeIterator docRef={ docRef } reFetch={ (reFetch) }/>
          </section>
          <nav className="md:flex-none w-full md:w-3/12 order-first md:order-last space-y-5">
            <div className="flex flex-col p-5 rounded-md space-y-4">
              <button className="py-2 rounded-md bg-red-400 text-black font-plex-sans-medium transition duration-300 hover:bg-blue-500 hover:shadow-lg" onClick={() => handleDestroyQRCode()}>Destroy QrCode</button>
              {
                destroyedAlert &&
                  <div className="flex justify-between items-center rounded-md p-3 bg-red-400 font-bold font-plex-sans-medium">
                    {destroyedAlert.messageString}
                    <div className="cursor-pointer" onClick={() => setDestroyedAlert(undefined)}>&#10006;</div>
                  </div>
              }
              <button className="py-2 rounded-md bg-teal-500 text-white font-plex-sans-medium transition duration-300 hover:bg-blue-500 hover:shadow-lg" onClick={() => setToggleBarcode()}>Show Barcode</button>
              {
                barcodeAlert &&
                  <div className="flex justify-between items-center rounded-md p-3 bg-red-400 font-bold font-plex-sans-medium">
                    {barcodeAlert}
                    <div className="cursor-pointer" onClick={() => setBarcodeAlert(undefined)}>&#10006;</div>
                  </div>
              }
              {
                (qrCodeString && toggleBarcode) &&
                  <div className="flex justify-center">
                    <QRCode
                      value={qrCodeString}
                      size={250}
                    />
                  </div>
              }
              <button className="py-2 rounded-md bg-yellow-500 text-black font-plex-sans-medium transition duration-300 hover:bg-blue-500 hover:shadow-lg" onClick={() => setReFetch(reFetch + 1)}>Refresh Attandees</button>
              <button className="py-2 rounded-md bg-sky-500 text-white font-plex-sans-medium transition duration-300 hover:bg-blue-500 hover:shadow-lg">Export CSV</button>
              <button className="py-2 rounded-md bg-sky-500 text-white font-plex-sans-medium transition duration-300 hover:bg-blue-500 hover:shadow-lg" onClick={() => setToggleAddStudent()}>Add Student</button>
              { (toggleAddStudent) && <AddStudent/> }
              <button className="py-2 rounded-md bg-sky-500 text-white font-plex-sans-medium transition duration-300 hover:bg-blue-500 hover:shadow-lg" onClick={() => setToggleRemoveStudent()}>Remove Student</button>
              { (toggleRemoveStudent) && <RemoveStudent/> }
              <button className="py-2 rounded-md bg-sky-500 text-white font-plex-sans-medium transition duration-300 hover:bg-blue-500 hover:shadow-lg" onClick={() => setToggleSearchStudent()}>Search Student</button>
              { (toggleSearchStudent) && <SearchStudent/> }
            </div>
          </nav>
        </main>
      </div>
    </>
  );
};

export default Attendees;
