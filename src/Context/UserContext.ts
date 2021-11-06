import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { collection, setDoc, doc, getDoc, where, query, getDocs, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { Message } from "../Components/Message/MessageBox";
import { auth, firestore, storage } from "./../../firebase"
import UserModal, { ISignUp, UserModalConverter, UserModalDefault } from "../Modal/UserModal";
import { uploadBytes } from "firebase/storage";

////
// create users and its infomation
export const signup = async (signupDetails: ISignUp): Promise<Message> => {
  return await createUserWithEmailAndPassword(auth,
    signupDetails.userModal.email,
    signupDetails.password)
    .then(async (userCredential): Promise<Message> => {
      const { user } = userCredential;
      const user_id = user.uid;

      const ref = doc(firestore, "users", user_id).withConverter(UserModalConverter);

      return await setDoc(ref, new UserModal(
        signupDetails.userModal.unique_id,
        signupDetails.userModal.email,
        signupDetails.userModal.full_name,
        user_id,
        signupDetails.userModal.university,
        signupDetails.userModal.photoUrl
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
    .catch((error): Message => {
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
    .then((userCrediential): Message => {
      if (userCrediential.user.emailVerified === false)
        return new Message(1, "Email not verified")
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
export const userAlreadyExist = async (email_id: string): Promise<Message> => {
  let message: Message = new Message(2, "No such user Exist");

  const userRef = collection(firestore, "users")
  const q = query(userRef, where("email", "==", email_id));

  const document = await getDocs(q);

  document.forEach(item => {
    if (item.data().email === email_id) {
      message = new Message(1, "Looks like you already have a account.");
    }
  })
  return message
}
/// ---------------------------------------------------------------------

////
// get user details
export const getUserDetails = async (userId: string): Promise<UserModal> => {
  const docSnap = await getDoc(doc(firestore, "users", userId).withConverter(UserModalConverter))

  if (docSnap.exists()) {
    return docSnap.data()
  }
  console.error("Error getting user")
  return UserModalDefault
}
// ----------------------------------------------------------------------

////
// user Password reset
export const sendPasswordReset = async (email: string): Promise<Message> => {
  return sendPasswordResetEmail(auth, email)
    .then(() => {
      console.log("Sent Password link")
      return new Message(2, "Password reset link sent.");
    })
    .catch(error => {
      console.error(error)
      return new Message(0, "Something went wrong.");
    })
}
// ----------------------------------------------------------------------

////
// Update user details
export const updateUserDetails = async (userModal: UserModal, file?: File): Promise<Message> => {
  let message = new Message(0, "Something went wrong");

  const userRef = doc(firestore, "users", userModal.uid);
  await updateDoc(userRef, {
    full_name: userModal.full_name,
    unique_id: userModal.unique_id,
    university: userModal.university,
    photoUrl: `profilePics/${userModal.uid}`
  })
    .then(async () => {
      if (file) {
        const profilePicRef = ref(storage, `profilePics/${userModal.uid}`);
        await uploadBytes(profilePicRef, file)
          .then(() => {
            console.log("Updated user succefully");
            message = new Message(2, "Updated user profile.")
          })
          .catch((error) => {
            console.log("Error on uploading profile picture", error)
            message = new Message(1, "Error on uploading image.")
          })
      }
      else message = new Message(2, "Updated user profile.")
    })
    .catch((error) => {
      console.log("Error on updating user: ", error)
      message = new Message(0, "Something went wrong.")
    })

  return message;
}
// ----------------------------------------------------------------------

////
// Get user profile picture url
export const getUserProfilePicURL = async (uid: string): Promise<string> => {
  var result = "No url";
  const profilePicRef = ref(storage, `profilePics/${uid}`)

  await getDownloadURL(profilePicRef)
    .then((url) => result = url)
    .catch(() => result = 'No url');

  return result;
}
// -----------------------------------------------------------------------------

////
// send variafication email to user
export const sendVerificationEmail = async (email: string): Promise<Message> => {
  let message = new Message(0, "Something went wrong.");
  const uid = await getUIDFromEmail(email);
  if (uid === "NA") return message;

  return sendVerificationEmail(uid)
    .then(() => {
      console.log("Verification sent")
      message = new Message(2, "Verification sent successful.")
      return message;
    })
    .catch(() => {
      console.log("Something is wrong while sending verification email.")
      return message;
    })
}
// -----------------------------------------------------------------------------

////
// get uid of the user
export const getUIDFromEmail = async (email: string): Promise<string> => {

  const userRef = collection(firestore, "users");
  const q = query(userRef, where("email", "==", email));

  const document = await getDocs(q);
  if (document.docs.length > 0 && document.docs[0].exists()) {
    return document.docs[0].data().uid;
  } else {
    return "NA";
  }
}
