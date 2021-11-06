import { DocumentData, QueryDocumentSnapshot, SnapshotOptions, Timestamp } from "firebase/firestore";

export class AttendeeModal {

  email_id: string;
  full_name: string;
  meeting_id: string;
  status: number;
  unique_id: string;
  university: string;
  uid: string;
  stamp: Timestamp;

  constructor(
    email_id: string,
    full_name: string,
    meeting_id: string,
    status: number,
    unique_id: string,
    university: string,
    uid: string,
    stamp: Timestamp
  ) {
    this.email_id = email_id;
    this.full_name = full_name;
    this.meeting_id = meeting_id;
    this.status = status;
    this.unique_id = unique_id;
    this.university = university;
    this.uid = uid;
    this.stamp = stamp
  }

  convertDatestamp() {
    const date = this.stamp.toDate();
    const dstamp = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
    return dstamp;
  }

  convertTimestamp() {
    const date = this.stamp.toDate();
    const tstamp = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    return tstamp;
  }

  toString() {
    const status = (this.status === 1) ? 'Absent' : 'Present';

    return (
      this.unique_id + ',' +
      this.email_id + ',' +
      this.full_name + ',' +
      status + ',' +
      this.convertDatestamp() + ',' +
      this.convertTimestamp() + ','
    );
  }
}

export const AttendeeModalConverter = {
  toFirestore(attendeeModal: AttendeeModal): DocumentData {
    return {
      email_id: attendeeModal.email_id,
      full_name: attendeeModal.full_name,
      meeting_id: attendeeModal.meeting_id,
      status: attendeeModal.status,
      unique_id: attendeeModal.unique_id,
      university: attendeeModal.university,
      uid: attendeeModal.uid,
      stamp: attendeeModal.stamp
    }
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): AttendeeModal {
    const data = snapshot.data(options);
    return new AttendeeModal(
      data.email_id,
      data.full_name,
      data.meeting_id,
      data.status,
      data.unique_id,
      data.university,
      data.uid,
      data.stamp
    );
  }
}
