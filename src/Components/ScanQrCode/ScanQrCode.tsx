import { useMemo, useState, lazy } from 'react';

const QrReader = lazy(() => import('react-qr-reader'));
const MeetingInfo = lazy(() => import('./Meeting_Info'));

import { Link } from "react-router-dom";
import { ArrowCircleLeftIcon } from "@heroicons/react/outline";

import "./ScanQrCode.css"
import useToggle from '../../Library/useToggle';
import MessageBox, { Message } from '../Message/MessageBox';
import { useAuth } from '../../Context/AuthContext';
import { AttendeeModal } from '../../Modal/AttendeeModal';
import UserModal from '../../Modal/UserModal';
import { QRCodeModal } from '../../Modal/QRCodeModal';
import { serverTimestamp, Timestamp } from 'firebase/firestore';

const ScanQrCode = () => {
  const [alert, setAlert] = useState<Message | null>();
  const [scannedData, setScannedData] = useState<QRCodeModal | undefined>();
  const [toggleCamera, setToggleCamera] = useToggle(true);
  const [scannedRef, setScannedRef] = useState<string>('');
  const [userDetail, setUserDetail] = useState<UserModal | undefined>(undefined);

  const { currentUser, MarkStudent, GetUserDetails, BarcodeExist } = useAuth();

  useMemo(async () => {
    const response = await GetUserDetails!!(currentUser!!.uid)
    const data = response;

    setUserDetail(data)
  }, [currentUser])

  const onHandleMarkStudent = async (status: number) => {
    if (scannedData && currentUser && userDetail) {
      const attendeeModal: AttendeeModal = new AttendeeModal(
        currentUser.email!!,
        userDetail.full_name,
        scannedData.meeting_id,
        status,
        userDetail.unique_id,
        userDetail.university,
        userDetail.uid,
        serverTimestamp() as Timestamp
      )

      const response: Message = await MarkStudent!!(scannedRef, attendeeModal)

      setAlert(response)
      setTimeout(() => setAlert(undefined), 4000)
      setScannedData(undefined)
    } else
      setAlert(new Message(0, "Something went wrong."));
    setTimeout(() => setAlert(undefined), 4000)
  }

  const handleScanningResult = (value: string) => {
    setScannedData(undefined);
    if (value !== null && value.length > 0) {
      try {
        BarcodeExist!!(value)
          .then((response) => {
            const data = response.data;
            const message = response.message;
            if (message.messageType === 0) {
              setAlert(message)
              setTimeout(() => setAlert(undefined), 4000)
              return;
            }

            if (data.checkSpace && checkOrgSpace(data.orgSpace) === false) {
              setAlert(new Message(0, "Space do not Matched"));
              setToggleCamera(() => setAlert(undefined), 4000);
              return;
            }

            setScannedData(data);
            setToggleCamera();
          })

        setScannedRef(value);

      } catch (error) {
        setAlert(new Message(0, "Somethin went wrong!"));
        setTimeout(() => setAlert(undefined), 4000)
        setToggleCamera();
      }
    }
  }

  const checkOrgSpace = (orgSpace: string) => {
    const spaceRegex = /@[a-z]+\.[a-z][.a-z]+$/
    const finding = spaceRegex.exec(userDetail!!.email) || '';
    if (finding[0] !== orgSpace) return false;
    return true;
  }

  return (
    <>
      <div className="w-full svg-background-layered-steps"></div>
      <div className="md:w-1/2 lg:w-5/12 xl:w-4/12 mx-auto flex items-center mb-3">
        <Link to="/dashboard" className=""><ArrowCircleLeftIcon className="h-10 text-blue-500 font-bold" /></Link>
        <span className="block my-5 w-full text-3xl text-center font-plex-sans">Mark Attendence</span>
      </div>
      {(alert) && <MessageBox message={alert} />}
      <main className="md:w-1/2 lg:w-5/12 xl:w-4/12 mx-auto p-5 space-y-5 4 shadow-lg bg-white">
        <div className="flex space-x-4">
          <button className="w-full py-2 rounded-md bg-sky-500 text-white font-plex-sans-medium transition duration-300 hover:bg-blue-500 hover:shadow-lg" onClick={() => { setAlert(null); setToggleCamera() }}>{(toggleCamera) ? 'Stop' : 'Start'} Scanning</button>
        </div>
        {(toggleCamera) ?
          <section className="flex justify-center rounded-md overflow-hidden p-5 border-4 border-sky-500 bg-white">
            <QrReader
              delay={1000}
              style={{ width: '100%' }}
              onError={() => setAlert(new Message(0, "Something went wrong."))}
              onScan={(e: any) => handleScanningResult(e)}
            />
          </section> :
          <MeetingInfo scannedData={scannedData} />
        }
      </main>
      {
        (scannedData) &&
        <main className="md:w-1/2 lg:w-5/12 xl:w-4/12 mx-auto mt-5 p-5 space-y-5 bg-white shadow-md hover:shadow-xl duration-300">
          <div className="flex space-x-4">
            <button className="w-full py-2 rounded-md bg-teal-500 text-white font-plex-sans-medium transition duration-300 hover:bg-teal-600 hover:shadow-lg" onClick={() => { setAlert(null); onHandleMarkStudent(2) }}>Mark Present</button>
            <button className="w-full py-2 rounded-md bg-yellow-400 text-black font-plex-sans-medium transition duration-300 hover:bg-yellow-500 hover:shadow-lg" onClick={() => { setAlert(null); onHandleMarkStudent(1) }}>Mark Absent</button>
          </div>
        </main>
      }
    </>
  );
};
export default ScanQrCode;
