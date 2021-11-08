import { ArrowCircleLeftIcon, ArrowCircleRightIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import QRCode from "qrcode.react";

import "./GenerateQrCode.css"
import { ICreateQrCode } from "../../Context/QRCodeContext";
import { useAuth } from "../../Context/AuthContext";
import MessageBox, { Message } from "../Message/MessageBox";
import { QRCodeModal } from "../../Modal/QRCodeModal";
import { serverTimestamp, Timestamp } from "firebase/firestore";

const GenerateQrCode = () => {
  const [meetingID, setMeetingID] = useState<string>('');
  const [topic, setTopic] = useState<string>('');
  const [hostEmailID, setHostEmailID] = useState<string>('');
  const [QRCodeString, setQRCodeString] = useState<string>('');
  const [alert, setAlert] = useState<Message | undefined>();
  const [docID, setDocID] = useState<string>('');
  const [checkedSpace, setCheckedSpace] = useState<boolean>(false);
  const [orgSpace, setOrgSpace] = useState<string>('');

  const [forwardlink, setForwardLink] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const { currentUser, createqrcode } = useAuth();
  const { uid } = currentUser!!;

  const qrString = (doc_id: string) => {

    const data = doc_id;
    setQRCodeString(data);

    setDocID('');
    setDocID(doc_id);

    console.log("Forward link setted ");
    setForwardLink("");
    setForwardLink(`/dashboard/qrCodeGenerate/attendees/${doc_id}`);
  };

  const handleWritingQrCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (hostEmailID.length < 3 || topic.length < 2 || meetingID.length < 3) {
      setAlert(new Message(1, "Please fill all the information"));
      setTimeout(() => setAlert(undefined), 4000);
      return;
    }

    const emailRegex = /^[a-z0-9].?[a-z0-9-+]+.?[a-z0-9-]+@[a-z]+\.[a-z][.a-z]+$/
    if (emailRegex.test(hostEmailID) === false) {
      setAlert(new Message(0, "Invalid email address"));
      setTimeout(() => setAlert(undefined), 4000);
      return;
    }

    const spaceRegex = /@[a-z]+\.[a-z][.a-z]+$/
    const finding = spaceRegex.exec(hostEmailID) || '';
    setOrgSpace(finding[0])


    const qrCodeDetails: QRCodeModal = new QRCodeModal(
      serverTimestamp() as Timestamp,
      false,
      hostEmailID,
      meetingID,
      topic,
      uid,
      checkedSpace,
      finding[0]
    );

    const result: ICreateQrCode = await createqrcode!!(qrCodeDetails)

    const messageType = result.message.messageType;
    const doc_id = result.docID;

    if (messageType === 2) {
      setAlert(result.message);
      setTimeout(() => setAlert(undefined), 4000);

      qrString(doc_id);

      setLoading(false)
    } else {
      setAlert(result.message);
    }
  }

  useEffect(() => {
    const regex = /@[a-z]+\.[a-z][.a-z]+$/
    const finding = regex.exec(hostEmailID);
    console.log("found: ", finding)
  }, [hostEmailID])

  return (
    <>
      {alert && <MessageBox message={alert} />}
      <div className="w-full svg-background-layered-steps"></div>
      <div className="container mx-auto space-y-10 my-10">
        <section className="flex justify-center space-x-10 lg:w-1/2 mx-auto font-plex-sans">
          <Link to="/dashboard"><ArrowCircleLeftIcon className="h-10 text-blue-500" /></Link>
          <span className="text-3xl font-plex-sans">Generate Qr Code</span>
          {!loading && <Link to={forwardlink} className="justify-self-end"><ArrowCircleRightIcon className="h-10 text-blue-500" /></Link>}
        </section>
        <main className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full lg:w-1/2 mx-auto p-5 bg-white shadow-xl">
          <form className="p-5 space-y-4 text-lg">
            <div className="flex flex-col space-y-2">
              <label htmlFor="meeting_id font-plex-sans">Meeting ID</label>
              <input type="number" autoFocus id="meeting_id" className="p-2 md:p-3 rounded-md text-black font-plex-sans border-b-2 border-gray-300 hover:shadow-lg shadow-sm focus:shadow-lg duration-300" value={meetingID} onChange={(e) => setMeetingID(e.target.value)} placeholder="Type here..." />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="topic">Topic</label>
              <input type="text" id="topic" className="p-2 md:p-3 rounded-md text-black font-plex-sans border-b-2 border-gray-300 hover:shadow-lg shadow-sm focus:shadow-lg duration-300" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Type here..." />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="host_id" className="">Host Email ID</label>
              <input type="email" id="host_id" className="p-2 md:p-3 rounded-md text-black font-plex-sans border-b-2 border-gray-300 hover:shadow-lg shadow-sm focus:shadow-lg duration-300" value={hostEmailID} onChange={(e) => setHostEmailID(e.target.value)} placeholder="Type here..." />
            </div>
            <div className="flex space-x-2">
              <input type="checkbox" id="attandanceSpace" checked={checkedSpace} onChange={e => setCheckedSpace(e.target.checked)} />
              <label htmlFor="attandanceSpace" className="font-plex-sans">Same space?</label>
            </div>
          </form>
          <section className="text-center place-self-center p-5 rounded-md border-4 border-black bg-white">
            <QRCode
              value={QRCodeString}
              size={250}
            />
            <button className="w-full py-2 mt-5 rounded-md bg-sky-500 text-white font-plex-sans-medium transition duration-300 hover:bg-blue-500 hover:shadow-lg" onClick={(e) => handleWritingQrCode(e)}>Generate Qr Code</button>
          </section>
        </main>
      </div>
    </>
  );
}
export default GenerateQrCode;
