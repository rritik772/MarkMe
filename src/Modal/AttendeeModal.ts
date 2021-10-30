import { DocumentData, QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";

export class AttendeeModal {

  email_id: string;
  full_name: string;
  meeting_id: string;
  status: number;
  unique_id: string;
  university: string;
  uid: string;
  datestamp: string;
  timestamp: string;

  constructor(
    email_id: string,
    full_name: string,
    meeting_id: string,
    status: number,
    unique_id: string,
    university: string,
    uid: string,
    datestamp: string,
    timestamp: string
  ) {
    this.email_id = email_id;
    this.full_name = full_name;
    this.meeting_id = meeting_id;
    this.status = status;
    this.unique_id = unique_id;
    this.university = university;
    this.uid = uid;
    this.timestamp = timestamp;
    this.datestamp = datestamp;
  }

  toString() {
    return (
      this.email_id + " "
        + this.full_name + " "
        + this.meeting_id + " "
        + this.status + " "
        + this.unique_id + " "
        + this.university + " "
        + this.uid + " "
        + this.datestamp + " "
        + this.timestamp + " "
    );
  }
}

export const AttendeeModalConverter = {
  toFirestore( attendeeModal:AttendeeModal ):DocumentData {
    return {
        email_id : attendeeModal.email_id,
        full_name : attendeeModal.full_name,
        meeting_id : attendeeModal.meeting_id,
        status : attendeeModal.status,
        unique_id : attendeeModal.unique_id,
        university : attendeeModal.university,
        uid : attendeeModal.uid,
        datestamp: attendeeModal.datestamp,
        timestamp: attendeeModal.timestamp
    }
  },
  fromFirestore( snapshot: QueryDocumentSnapshot, options: SnapshotOptions ): AttendeeModal {
    const data = snapshot.data(options);
    return new AttendeeModal(
        data.email_id,
        data.full_name,
        data.meeting_id,
        data.status,
        data.unique_id,
        data.university,
        data.uid,
        data.datestamp,
        data.timestamp
    );
  }
}
