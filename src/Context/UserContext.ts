import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { collection, addDoc, setDoc, doc, getDoc, where, query, getDocs } from "firebase/firestore";
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
// User already exist
export const userAlreadyExist = async ( email_id: string ): Promise<Message> => {
  let message: Message = new Message(2, "No such user Exist");

  const userRef = collection(firestore, "users")
  const q = query(userRef, where("email", "==", email_id));

  const document = await getDocs(q);

  document.forEach(item => {
    if (item.data().email === email_id){
      message = new Message(1, "Looks like you already have a account.");
    }
  })
  return message
}
/// ---------------------------------------------------------------------

////
// get user details
export const getUserDetails = async ( userId: string ): Promise<UserModal> => {
  const docSnap = await getDoc( doc( firestore, "users", userId ).withConverter(UserModalConverter) )

  if ( docSnap.exists() ){
    return docSnap.data()
  }
  console.error("Error getting user")
  return UserModalDefault
}
// ----------------------------------------------------------------------

////
// user Password reset
export const sendPasswordReset = async ( email: string ): Promise<Message> => {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      console.log("Sent Password link")
      return new Message( 2, "Password reset link sent." );
    })
    .catch(error => {
      console.error(error)
      return new Message( 0, "Something went wrong." );
    })
}
