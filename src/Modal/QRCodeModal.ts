import { DocumentData, QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";

export class QRCodeModal {

  datestamp: string;
  destroyed: boolean;
  host_email_id: string;
  meeting_id: string;
  timestamp: string;
  topic: string;
  uid: string;

  constructor
  (
    datestamp: string,
    destroyed: boolean,
    host_email_id: string,
    meeting_id: string,
    timestamp: string,
    topic: string,
    uid: string
  ) {
    this.datestamp = datestamp;
    this.destroyed = destroyed;
    this.host_email_id = host_email_id;
    this.meeting_id = meeting_id;
    this.timestamp = timestamp;
    this.topic = topic;
    this.uid = uid;
  }

  toString() {
    return
    (
        this.uid + " " +
        this.meeting_id + " " +
        this.host_email_id + " " +
        this.topic + " " +
        this.datestamp + " " +
        this.timestamp + " " +
        this.destroyed
    )
  }
}

export const QRCodeModalConverter = {
  toFirestore ( qrCodeModal: QRCodeModal ): DocumentData {
    return {
      datestamp: qrCodeModal.datestamp,
      destroyed: qrCodeModal.destroyed,
      host_email_id: qrCodeModal.host_email_id,
      meeting_id: qrCodeModal.meeting_id,
      timestamp: qrCodeModal.timestamp,
      topic: qrCodeModal.topic,
      uid: qrCodeModal.uid
    }
  },
  fromFirestore( snapshot: QueryDocumentSnapshot, options: SnapshotOptions ): QRCodeModal {
    const data = snapshot.data( options );
    return new QRCodeModal(
        data.datestamp,
        data.destroyed,
        data.host_email_id,
        data.meeting_id,
        data.timestamp,
        data.topic,
        data.uid
    )
  }
}

export const QRCodeModalDefault = new QRCodeModal (
  "NA",
  false,
  "NA",
  "NA",
  "NA",
  "NA",
  "NA",
)
