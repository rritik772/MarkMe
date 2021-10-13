export InterfaceColumns {
  index: boolean;
  name: bolean;
  email_id: boolean;
  status: boolean;
  remark: boolean;
  meeting_id: boolean;
  university: boolean;
};

export class CSVColumns implements InterfaceColumns {
  constructor() {
    this.index = false;
    this.name = false;
    this.email_id = false;
    this.status = false;
    this.remark = false;
    this.university = false;
    this.meeting_id = false;
  }

  setIndex(value: boolean): void {
    this.index = value;
  }

  setName(value: boolean): void {
    this.name = value;
  }

  setEmail_id(value: boolean): void {
    this.email_id = value;
  }

  setStatus(value: boolean): void {
    this.status = value;
  }

  setRemark(value: boolean): void {
    this.remark = value;
  }

  setUniversity(value: boolean): void {
    this.university = value;
  }

  setMeeting_id(value: boolean): void {
    this.meeting_id = value;
  }

  getSelectedColumns(): Array<boolean> {
    return [ this.index, this.name, this.email_id, this.status, this.remark, this.university, this.meeting_id ];
  }
}
