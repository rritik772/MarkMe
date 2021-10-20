export enum Status {
  Leave = 1,
  Absent = 2,
  Present = 3
};

export interface IAttendee {
  id: number,
  name: string,
  university: string,
  meeting_id: string,
  email_id: string,
  status: Status
};
