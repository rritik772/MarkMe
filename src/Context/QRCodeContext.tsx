import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { firestore } from "../../firebase"
import { Message } from "../Components/Message/MessageBox"

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
