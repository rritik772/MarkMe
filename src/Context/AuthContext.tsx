import { onAuthStateChanged, User } from "firebase/auth"; import React, { useContext, useEffect, useState } from "react";

import Loading from "../Components/Loading/Loading";
import { Message } from "../Components/Message/MessageBox";
import { auth } from "./../../firebase";
import { createQrCode, ICreateQrCode, markStudent, getStudentsWithDocRef, getBarcodesByUser, getUserAttendance, getBarcodeData, destroyQRCode, barcodeExist, IBarcodeExist } from "./QRCodeContext";
import { login, logout, signup, getUserDetails, userAlreadyExist, sendPasswordReset, updateUserDetails, getUserProfilePicURL, sendVerificationEmail } from "./UserContext";
import UserModal, { ISignUp } from "../Modal/UserModal";
import { AttendeeModal } from "../Modal/AttendeeModal";
import { QRCodeModal } from "../Modal/QRCodeModal";

////
// Context types
export interface AuthContextType {
    loading: boolean;
    currentUser: User | undefined;
    verified: boolean;
    UserAlreadyExist: undefined | ((email_id: string) => Promise<Message>);
    SignUp: undefined | ((signupDetails: ISignUp) => Promise<Message>);
    Login: undefined  | ((email: string, password: string) => Promise<Message>);
    Logout: undefined | (() => Promise<Message>);
    createqrcode: undefined | ((qrCodeDetails: IQrCode) => Promise<ICreateQrCode>);
    GetUserDetails: undefined | ((user_id: string) => Promise<UserModal>);
    MarkStudent: undefined | ((docRef: string, attendeeModal: AttendeeModal) => Promise<Message>);
    GetStudentsWithDocRef: undefined | ((docRef: string) => Promise<AttendeeModal[]>);
    GetBarcodesByUser: undefined | (( uid: string ) => Promise<string[]>);
    GetUserAttendance: undefined | (( uid: string ) => Promise<AttendeeModal[]>);
    GetBarcodeData: undefined | ((docRef: string) => Promise<QRCodeModal | undefined>);
    DestoryBarcode: undefined | ((docRef: string) => Promise<Message>);
    BarcodeExist: undefined | ((docRef: string) => Promise<IBarcodeExist>);
    SendPasswordReset: undefined | ((email: string) => Promise<Message>);
    UpdateUserDetails: undefined | ((userModal: UserModal, file: File) => Promise<Message>);
    GetUserProfilePicURL: undefined | ((uid: string) => Promise<string>);
    SendVerificationEmail: undefined | ((uid: string) => Promise<Message>);
}

const AuthContextTypeDefault: AuthContextType =  {
    loading: false,
    currentUser: undefined,
    verified: false,
    UserAlreadyExist: undefined,
    SignUp: undefined,
    Login: undefined,
    Logout: undefined,
    createqrcode: undefined,
    GetUserDetails: undefined,
    MarkStudent: undefined,
    GetStudentsWithDocRef: undefined,
    GetBarcodesByUser: undefined,
    GetUserAttendance: undefined,
    GetBarcodeData: undefined,
    DestoryBarcode: undefined,
    BarcodeExist: undefined,
    SendPasswordReset: undefined,
    UpdateUserDetails: undefined,
    GetUserProfilePicURL: undefined,
    SendVerificationEmail: undefined
}

// -----------------------------------------------------

////
// Pre Context
export const AuthContext = React.createContext<AuthContextType>(AuthContextTypeDefault as AuthContextType);

export const useAuth = () => useContext( AuthContext );
// ----------------------------------------------------

export const AuthProvider: React.FC = ({ children }) => {
    // ---------------------------------------------------------
    // User
    const [ loading, setLoading ] = useState<boolean>(true)
    const [ currentUser, setCurrentUser ] = useState<User | undefined>();
    const [ verified, setVerified ] = useState<boolean>(false);

    async function SignUp(signupDetails: ISignUp ): Promise<Message> {
        return await signup( signupDetails )
    }

    async function Login(email: string, password: string): Promise<Message> {
        return await login(email, password);
    }

    async function Logout(): Promise<Message> {
        return await logout();
    }

    async function GetUserDetails(userId: string): Promise<UserModal> {
        return await getUserDetails(userId)
    }

    async function UserAlreadyExist(email_id: string): Promise<Message> {
        return await userAlreadyExist(email_id);
    }

    async function SendPasswordReset( email: string ): Promise<Message> {
        return await sendPasswordReset(email);
    }

    async function UpdateUserDetails( userModal: UserModal, file: File ): Promise<Message>{
        return updateUserDetails(userModal, file)
    }

    async function GetUserProfilePicURL( uid: string ): Promise<string> {
        return await getUserProfilePicURL(uid);
    }

    async function SendVerificationEmail( email: string ): Promise<Message> {
        return await sendVerificationEmail(email);
    }

    useEffect(() => {
        setLoading(false);

        const unsubscriber = onAuthStateChanged(auth, user => {
            if ( user ){
                setCurrentUser(user);
                setVerified(user.emailVerified);
            }
        })

        setLoading(false);
        return unsubscriber;
    }, [])

    // ----------------------------------------------------------------

    ////
    // QR Code
    const createqrcode = async (qrCodeDetails: QRCodeModal): Promise<ICreateQrCode> => {
        return await createQrCode(qrCodeDetails)
    }

    const MarkStudent = async ( docRef: string, attendeeModal: AttendeeModal  ): Promise<Message> => {
        return await markStudent(docRef, attendeeModal);
    }

    const GetStudentsWithDocRef = async ( docRef: string ): Promise<AttendeeModal[]> => {
        const data = await getStudentsWithDocRef(docRef);
        return data;
    }

    const GetBarcodesByUser = async ( uid: string ): Promise<string[]> => {
        const data = await getBarcodesByUser(uid);
        return data;
    }

    const GetUserAttendance = async ( uid: string ): Promise<AttendeeModal[]> => {
        const data = await getUserAttendance(uid);
        return data
    }

    async function GetBarcodeData(docRef: string): Promise<QRCodeModal | undefined> {
        return await getBarcodeData(docRef)
    }

    async function DestoryBarcode( docRef: string ): Promise<Message> {
        return await destroyQRCode(docRef)
    }

    async function BarcodeExist( docRef: string ): Promise<IBarcodeExist> {
        return await barcodeExist(docRef)
    }
    // -----------------------------------------------------------------

    const values = { 
        loading,
        currentUser,
        verified,
        UserAlreadyExist,
        SignUp,
        Login,
        Logout,
        createqrcode,
        GetUserDetails,
        MarkStudent,
        GetStudentsWithDocRef,
        GetBarcodesByUser,
        GetUserAttendance,
        GetBarcodeData,
        DestoryBarcode,
        BarcodeExist,
        SendPasswordReset,
        UpdateUserDetails,
        GetUserProfilePicURL,
        SendVerificationEmail
    }

    if ( loading ) return <Loading/>

    return (
        <AuthContext.Provider value={values}>
          { loading? <Loading/> : children }
        </AuthContext.Provider>
    )
}
