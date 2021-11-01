import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, Unsubscribe, User } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";

import Loading from "../Components/Loading/Loading";
import useToggle from "../Library/useToggle"
import { Message } from "../Components/Message/MessageBox";
import { auth } from "./../../firebase";
import { createQrCode, ICreateQrCode, IQrCode, markStudent, getStudentsWithDocRef, getBarcodesByUser, getUserAttendance, getBarcodeData, destroyQRCode, barcodeExist } from "./QRCodeContext";
import { login, logout, signup, getUserDetails, userAlreadyExist, sendPasswordReset } from "./UserContext";
import InterfaceMeeting from "../Components/ScanQrCode/InterfaceMeeting";
import { Status } from "../Components/Attendance/InterfaceAttendee";
import { DocumentData, QuerySnapshot } from "firebase/firestore";
import UserModal, { ISignUp } from "../Modal/UserModal";
import { AttendeeModal } from "../Modal/AttendeeModal";
import { QRCodeModal } from "../Modal/QRCodeModal";

////
// Context types
export interface AuthContextType {
    loading: boolean;
    currentUser: User | undefined;
    UserAlreadyExist: undefined | ((email_id: string) => Promise<async>);
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
    BarcodeExist: undefined | ((docRef: string) => Promise<Message>);
    SendPasswordReset: undefined | ((email: string) => Promise<Message>);
}

const AuthContextTypeDefault: AuthContextType =  {
    loading: false,
    currentUser: undefined,
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
    SendPasswordReset: undefined
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

    useEffect(() => {
        setLoading(false);

        const unsubscriber = onAuthStateChanged(auth, user => {
            if ( user ){
                setCurrentUser(user)
            }
        })

        setLoading(false);
        return unsubscriber;
    }, [])

    // ----------------------------------------------------------------

    ////
    // QR Code
    const createqrcode = async (qrCodeDetails: IQrCode): Promise<ICreateQrCode> => {
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

    async function BarcodeExist( docRef: string ): Promise<Message> {
        return await barcodeExist(docRef)
    }
    // -----------------------------------------------------------------

    const values = { 
        loading,
        currentUser,
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
        SendPasswordReset
    }

    if ( loading ) return <Loading/>

    return (
        <AuthContext.Provider value={values}>
          { loading? <Loading/> : children }
        </AuthContext.Provider>
    )
}
