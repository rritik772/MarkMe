import { ArrowCircleLeftIcon, ArrowCircleRightIcon } from "@heroicons/react/outline";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState, lazy } from "react";

const QRCode = lazy(() => import("qrcode.react"));
import AttendeeIterator from "./AttendeeIterator";

import useToggle from "../../Library/useToggle";
import { useAuth } from "../../Context/AuthContext";
import { Message } from "../Message/MessageBox";
import { QRCodeModal, QRCodeModalDefault } from "../../Modal/QRCodeModal";

const Attendees = (): JSX.Element => {
  const { docRef } = useParams<{ docRef: string }>();

  const [toggleSearchStudent, setToggleSearchStudent] = useToggle();
  const [toggleBarcode, setToggleBarcode] = useToggle();

  const [meetingDetails, setMeetingDetails] = useState<QRCodeModal>(QRCodeModalDefault);
  const [qrCodeString, setQRCodeString] = useState<string>();
  const [reFetch, setReFetch] = useState<number>(0);
  const [destroyedAlert, setDestroyedAlert] = useState<Message | undefined>();
  const [barcodeAlert, setBarcodeAlert] = useState<string | undefined>();
  const [searchString, setSearchString] = useState<string>('');

  const { GetBarcodeData, DestoryBarcode } = useAuth();

  useEffect(() => {
    GetBarcodeData!!(docRef)
      .then(data => {
        if (data === undefined || data?.destroyed === true) {
          setBarcodeAlert("No Barcode Avaliable");
          setTimeout(() => setBarcodeAlert(undefined), 400);
          return;
        };
        const barcodeData = docRef;
        setMeetingDetails(data);

        setQRCodeString(barcodeData);
      });
  }, [toggleBarcode])

  const handleDestroyQRCode = () => {
    if (barcodeAlert === "No Barcode Avaliable") {
      setBarcodeAlert(barcodeAlert);
      setTimeout(() => setBarcodeAlert(undefined), 400);
    }
    DestoryBarcode!!(docRef)
      .then((message) => {
        setDestroyedAlert(message)
        setTimeout(() => setDestroyedAlert(undefined), 400);
      })
  }

  return (
    <>
      <div className="space-y-10">
        <section className="grid grid-cols-3 lg:w-1/2 mx-auto font-plex-sans">
          <Link to="/dashboard/qrCodeGenerate"><ArrowCircleLeftIcon className="h-10 text-blue-500" /></Link>
          <span className="text-3xl font-plex-sans">Attendees</span>
        </section>
        <main className="container flex flex-col md:flex-row mx-auto md:space-x-8 items-start">
          <section className="flex-grow w-full p-5 rounded-md space-y-2 bg-white">
            <AttendeeIterator docRef={docRef} reFetch={(reFetch)} searchString={searchString} /> :
          </section>
          <nav className="md:flex-none w-full md:w-3/12 order-first md:order-last space-y-5">
            <div className="flex flex-col p-5 rounded-md space-y-4">
              <button className="py-2 rounded-md bg-red-400 text-black font-plex-sans-medium transition duration-300 hover:bg-blue-500 hover:shadow-lg" onClick={() => handleDestroyQRCode()}>Destroy QrCode</button>
              {
                destroyedAlert &&
                <div className="flex justify-between items-center rounded-md p-3 bg-red-400 font-bold font-plex-sans-medium">
                  {destroyedAlert.messageString}
                </div>
              }
              <button className="py-2 rounded-md bg-teal-500 text-white font-plex-sans-medium transition duration-300 hover:bg-blue-500 hover:shadow-lg" onClick={() => setToggleBarcode()}>Show Barcode</button>
              {
                barcodeAlert &&
                <div className="flex justify-between items-center rounded-md p-3 bg-red-400 font-bold font-plex-sans-medium">
                  {barcodeAlert}
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
              <button className="py-2 rounded-md bg-sky-500 text-white font-plex-sans-medium transition duration-300 hover:bg-blue-500 hover:shadow-lg" onClick={() => setToggleSearchStudent()}>Search Student</button>
              {
                (toggleSearchStudent) &&
                <main className="flex flex-col p-5 space-y-5 rounded-md bg-sky-200 md:border-4 border-sky-500 font-plex-sans">
                  <span className="text-lg text-center font-plex-sans-medium">Search Student</span>
                  <div className="flex justify-between items-center space-x-3">
                    <input id="email_id" className="w-full p-2 rounded-md" onChange={e => (setSearchString(e.target.value))} value={searchString} />
                  </div>
                </main>
              }
            </div>
          </nav>
        </main>
      </div>
    </>
  );
};

export default Attendees;
