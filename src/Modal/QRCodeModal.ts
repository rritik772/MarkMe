export class QRCodeModal {
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
  toFirestore: ( qrCodeModal ) => {
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
  fromFirestore: ( snapshot, options ) => {
    const data = snapshot.data( options );
    return new QRCodeModal(
        datestamp = data.datestamp,
        destroyed = data.destroyed,
        host_email_id = data.host_email_id,
        meeting_id = data.meeting_id,
        timestamp = data.timestamp,
        topic = data.topic,
        uid = data.uid
    )
  }
}
