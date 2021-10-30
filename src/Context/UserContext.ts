import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { collection, addDoc, setDoc, doc, getDoc } from "firebase/firestore";
import { ref, set } from "firebase/database";
import { Message } from "../Components/Message/MessageBox";
import { auth, firestore } from "./../../firebase"
import UserModal, { ISignUp, UserModalConverter, UserModalDefault } from "../Modal/UserModal";

////
// create users and its infomation
export const signup = async ( signupDetails: ISignUp ): Promise<Message> => {
  return await createUserWithEmailAndPassword( auth,
                                               signupDetails.userModal.email,
                                               signupDetails.password )
    .then(async (userCredential): Promise<Message> => {
      const { user }  = userCredential;
      const user_id = user.uid;

      const ref = doc(firestore, "users", user_id).withConverter( UserModalConverter );

      return await setDoc(ref, new UserModal (
        signupDetails.userModal.unique_id,
        signupDetails.userModal.email,
        signupDetails.userModal.full_name,
        user_id,
        signupDetails.userModal.university
      ))
        .then((): Message => {
          console.log("Document written succefully")
          return new Message(2, "Account created Successfully")
        })
        .catch((error): Message => {
          console.log("Cannot write user document", error)
          return new Message(0, "Somthing gone wrong.")
        })
    })
    .catch((error):Message => {
      console.log("Cannot add user", error);
      return new Message(0, "Something is wrong")
    })
}
// -------------------------------------------------------------------
////


////
// login user
export const login = async (email: string, password: string): Promise<Message> => {
  return await signInWithEmailAndPassword(auth, email, password)
    .then(( userCrediential ): Message => {
      return new Message(2, "Successful Logged in.")
    })
    .catch((error): Message => {
      return new Message(0, "Something is wrong.")
    })
}
// ---------------------------------------------------------------------
////


////
// logout user
export const logout = async (): Promise<Message> => {
  return signOut(auth)
    .then((): Message => {
      console.log("Logged out user")
      return new Message(2, "Successfully logged out")
    })
    .catch((): Message => {
      return new Message(0, "Unable to Logout.")
    })
}
//-----------------------------------------------------------------------
////

//// --------------------------------------------------------------------
/// ---------------------------------------------------------------------

////
// get user details
export const getUserDetails = async ( userId: string ): Promise<UserModal> => {
  const docSnap = await getDoc( doc( firestore, "users", userId ).withConverter(UserModalConverter) )

  if ( docSnap.exists() ){
    return docSnap.data()
  }
  console.log("Error getting user")
  return UserModalDefault
}
// ----------------------------------------------------------------------
