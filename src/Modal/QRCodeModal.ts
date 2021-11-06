import { DocumentData, FieldValue, QueryDocumentSnapshot, serverTimestamp, SnapshotOptions, Timestamp } from "firebase/firestore";

export class QRCodeModal {

  timestamp: Timestamp;
  destroyed: boolean;
  host_email_id: string;
  meeting_id: string;
  topic: string;
  uid: string;

  constructor
    (
      timestamp: Timestamp,
      destroyed: boolean,
      host_email_id: string,
      meeting_id: string,
      topic: string,
      uid: string
    ) {
    this.timestamp = timestamp;
    this.destroyed = destroyed;
    this.host_email_id = host_email_id;
    this.meeting_id = meeting_id;
    this.topic = topic;
    this.uid = uid;
  }

  convertDatestring() {
    if ( this.host_email_id === "NA" ) return;
    const firebaseDate = this.timestamp.toDate();
    const date = `${firebaseDate.getDay()}/${firebaseDate.getMonth()}/${firebaseDate.getFullYear()}`;
    return date
  }

  toString() {
    return (
      this.uid + " " +
      this.meeting_id + " " +
      this.host_email_id + " " +
      this.topic + " " +
      this.timestamp + " " +
      this.destroyed
    );
  }
}

export const QRCodeModalConverter = {
  toFirestore(qrCodeModal: QRCodeModal): DocumentData {
    return {
      timestamp: qrCodeModal.timestamp,
      destroyed: qrCodeModal.destroyed,
      host_email_id: qrCodeModal.host_email_id,
      meeting_id: qrCodeModal.meeting_id,
      topic: qrCodeModal.topic,
      uid: qrCodeModal.uid
    }
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): QRCodeModal {
    const data = snapshot.data(options);
    return new QRCodeModal(
      data.timestamp,
      data.destroyed,
      data.host_email_id,
      data.meeting_id,
      data.topic,
      data.uid
    )
  }
}

export const QRCodeModalDefault = new QRCodeModal(serverTimestamp() as Timestamp, false, "NA", "NA", "NA", "NA");
