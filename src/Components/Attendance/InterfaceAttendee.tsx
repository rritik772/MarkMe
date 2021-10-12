export enum Status {
  Leave = 'Leave',
  Absent = 'Absent',
  Present = 'Present'
};

export interface IAttendee {
  id: number,
  name: string,
  university: string,
  meetinf_id: number,
  email_id: string,
  status: Status
};
