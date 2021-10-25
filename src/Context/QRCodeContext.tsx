import { addDoc, collection, doc, serverTimestamp, setDoc } from "firebase/firestore"
import { firestore } from "../../firebase"
import { Status } from "../Components/Attendance/InterfaceAttendee"
import { Message } from "../Components/Message/MessageBox"
import InterfaceMeeting from "../Components/ScanQrCode/InterfaceMeeting"
import { IUserDetails } from "./UserContext"

export interface IQrCode {
  meeting_id: string,
  host_email_id: string,
  topic: string,
  uid: string,
  datestamp: string,
  timestamp: string,
  destroyed: boolean
}

export interface ICreateQrCode {
  message: Message,
  docID: string
}

export const createQrCode = async (qrCodeDetails: IQrCode): Promise<ICreateQrCode> => {
  return await addDoc(collection(firestore, "qrcode"), {
    meeting_id: qrCodeDetails.meeting_id,
    topic: qrCodeDetails.topic,
    host_email_id: qrCodeDetails.host_email_id,
    uid: qrCodeDetails.uid,
    datestamp: qrCodeDetails.datestamp,
    timestamp: qrCodeDetails.timestamp,
    destroyed: qrCodeDetails.destroyed
  })
    .then((docRef): ICreateQrCode => {
      console.log("Qrcode document written successfully.")

      const docId = docRef.id;
      const result: ICreateQrCode = {
        message: (new Message(2, "QRCode Generated successfully")),
        docID: docId
      };

      return result;
    })
    .catch((): ICreateQrCode => {
      console.log("Qrcode document not written.");

      const result: ICreateQrCode = {
        message: (new Message(0, "QRCode Generated successfully")),
        docID: "Not Avaliable"
      };

      return result;
    })
}

export const markStudent = async ( meetingDetails: InterfaceMeeting, userDetails: IUserDetails, status: Status): Promise<Message> => {
  console.log( userDetails, status, status === 1, status == 1, status === 2, status == 2 )
  return await setDoc(doc(doc(firestore, "attendance", meetingDetails.ref), meetingDetails.ref, userDetails.uid), {
    full_name: userDetails.full_name,
    email_id: userDetails.email,
    meeting_id: meetingDetails.meeting_id,
    status: status,
    unique_id: userDetails.unique_id,
    university: userDetails.university
  })
    .then(() => {
      if ( status === 2 ) return new Message(2, "Marked present successfully")
      else return new Message(2, "Marked absent successfully")
    })
    .catch(() => {
      return new Message(0, "Something went wrong.")
    })
}
