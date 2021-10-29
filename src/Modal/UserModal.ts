export default class UserModal {
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

export const UserModalConverter = {
  toFirestore: ( userModel ) => {
    return {
        uid: userModel.uid,
        email: userModel.email,
        full_name: userModel.full_name,
        unique_id: userModel.unique_id,
        university: userModel.university
    }
  },
  fromFirestore: (snapshot, options) => {
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
  userModel: UserModal
}
