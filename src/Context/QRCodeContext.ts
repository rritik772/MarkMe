import { Unsubscribe } from "firebase/auth"
import { addDoc, collection, collectionGroup, doc, DocumentData, FieldValue, getDoc, getDocs, increment, onSnapshot, query, QuerySnapshot, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore"
import { firestore } from "../../firebase"
import { Status } from "../Components/Attendance/InterfaceAttendee"
import { Message } from "../Components/Message/MessageBox"
import InterfaceMeeting from "../Components/ScanQrCode/InterfaceMeeting"
import { AttendeeModal, AttendeeModalConverter } from "../Modal/AttendeeModal"
import { QRCodeModal, QRCodeModalConverter } from "../Modal/QRCodeModal"
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

export const createQrCode = async (qrCodeDetails: QRCodeModal): Promise<ICreateQrCode> => {
  return await addDoc(collection(firestore, "qrcode").withConverter(QRCodeModalConverter), new QRCodeModal(
    qrCodeDetails.datestamp,
    qrCodeDetails.destroyed,
    qrCodeDetails.host_email_id,
    qrCodeDetails.meeting_id,
    qrCodeDetails.timestamp,
    qrCodeDetails.topic,
    qrCodeDetails.uid,
  ))
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

////
// Mark student present or absent and return message
export const markStudent = async ( docRef: string, attendeeModal: AttendeeModal ): Promise<Message> => {
  console.log( attendeeModal.email_id )

  const barcodeRef = doc(firestore, "attendance", docRef);
  const userAttandanceRef = doc(barcodeRef, "students", attendeeModal.uid).withConverter(AttendeeModalConverter);

  return await setDoc(userAttandanceRef, attendeeModal)
    .then(async () => {
      return await setDoc( barcodeRef, { numberOfReads: increment(1) } , { merge: true })
        .then(() => {
          if ( attendeeModal.status === 2 ) return new Message(2, "Marked present successfully")
          else return new Message(2, "Marked absent successfully")
        })
        .catch ((error) => {
          console.log("Error Incrementing value", error)
          return new Message(0, "Something went wrong.")
        })
    })
    .catch(() => {
      return new Message(0, "Something went wrong.")
    })
}

export const getStudentsWithDocRef = async ( docRef: string ): AttendeeModal[] =>
{
  const attendanceref = doc(firestore, "attendance", docRef);
  const userattendanceref = collection(attendanceref, "students");

  const q = query( userattendanceref )
  const documents = await getDocs(q);
  
  const result: AttendeeModal[] = [];
  documents.forEach( doc => result.push( doc.data() ))

  return result;
}
// ----------------------------------------------------------------------------------------

////
// Return all the barcode generated by the user
export const getBarcodesByUser = async ( uid: string ): Promise<string[]> =>
{

  const q = query(collection(firestore, "qrcode"), where("uid", "==", uid));
  const document = await getDocs(q)

  const result: string[] = [];
  document.forEach(item => result.push(item.id))
  return result;
}
// -----------------------------------------------------------------------------------------

////
// all the meeting user has given attendance
export const getUserAttendance = async ( uid: string ): Promise<AttendeeModal[]> =>{
  let result: AttendeeModal = [];

  const attendanceRef = collectionGroup(firestore, "students");
  const q = query(attendanceRef, where("uid", "==", uid));

  const querySnapshot = await getDocs(q)
  querySnapshot.forEach( doc => result.push(doc.data()) )

  return result
}
// --------------------------------------------------------------------------------------------
