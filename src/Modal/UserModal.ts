import { DocumentData, QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";

export default class UserModal {
  unique_id: string;
  email: string;
  full_name: string;
  uid: string;
  university: string;
  constructor( unique_id: string, email: string, full_name: string, uid: string, university: string ){
    this.full_name = full_name;
    this.email = email;
    this.uid = uid;
    this.university = university;
    this.unique_id = unique_id;
  }

  toString() {
    return this.uid + " " + this.unique_id + " " + this.email + " " + this.full_name + " " + this.university;
  }
}

export const UserModalDefault = new UserModal( "NA", "NA", "NA", "NA", "NA" )

export const UserModalConverter = {
  toFirestore( userModal: UserModal ): DocumentData {
    return {
        uid: userModal.uid,
        email: userModal.email,
        full_name: userModal.full_name,
        unique_id: userModal.unique_id,
        university: userModal.university
    }
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): UserModal => {
    const data = snapshot.data(options);
    return new UserModal(
      data.unique_id,
      data.email,
      data.full_name,
      data.uid,
      data.university
    );
  }
}

export interface ISignUp {
  password: string;
  userModal: UserModal
}
