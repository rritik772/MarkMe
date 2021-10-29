export enum Status {
  Absent = 1,
  Present = 2
};

export interface IAttendee {
  id: number,
  full_name: string,
  university: string,
  meeting_id: string,
  email_id: string,
  status: Status
};
