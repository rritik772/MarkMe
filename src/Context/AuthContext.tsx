import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, Unsubscribe, User } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";

import Loading from "../Components/Loading/Loading";
import useToggle from "../Library/useToggle"
import { Message } from "../Components/Message/MessageBox";
import { auth } from "./../../firebase";
import { createQrCode, getStudentswithDocRef, ICreateQrCode, IQrCode, markStudent, getStudentsWithDocRef, getBarcodesByUser, getUserAttendance } from "./QRCodeContext";
import { login, logout, signup, getUserDetails } from "./UserContext";
import InterfaceMeeting from "../Components/ScanQrCode/InterfaceMeeting";
import { Status } from "../Components/Attendance/InterfaceAttendee";
import { DocumentData, QuerySnapshot } from "firebase/firestore";
import UserModal, { ISignUp } from "../Modal/UserModal";
import { AttendeeModal } from "../Modal/AttendeeModal";

////
// Context types
export interface AuthContextType {
    loading: boolean;
    currentUser: User | undefined;
    SignUp: undefined | ((signupDetails: ISignUp) => Promise<Message>);
    Login: undefined  | ((email: string, password: string) => Promise<Message>);
    Logout: undefined | (() => Promise<Message>);
    CreateQrCode: undefined | ((qrCodeDetails: IQrCode) => Promise<ICreateQrCode>);
    GetUserDetails: undefined | ((user_id: string) => Promise<UserModal>);
    MarkStudent: undefined | ((meetingDetails: InterfaceMeeting, userDetails: IUserDetails, status: Status) => Promise<Message>);
    GetStudentsWithDocRef: undefined | ((docRef: string) => Promise<DocumentData[]>);
    GetBarcodesByUser: undefined | (( uid: stirng ) => Promise<string[]>);
    GetUserAttendance: undefined | (( uid: string ) => Promist<AttendeeModal[]>);
}

const AuthContextTypeDefault: AuthContextType =  {
    loading: false,
    currentUser: undefined,
    SignUp: undefined,
    Login: undefined,
    Logout: undefined,
    CreateQrCode: undefined,
    GetUserDetails: undefined,
    MarkStudent: undefined,
    GetStudentsWithDocRef: undefined,
    GetBarcodesByUser: undefined,
    GetUserAttendance: undefined
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

    function GetUserDetails(userId: string): UserModal {
        return getUserDetails(userId)
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

    const GetStudentsWithDocRef = async ( docRef: string ): DocumentData[] => {
        const data = await getStudentsWithDocRef(docRef);
        return data;
    }

    const GetBarcodesByUser = async ( uid: string ): Promise<string[]> => {
        const data = await getBarcodesByUser(uid);
        return data;
    }

    const GetUserAttandance = async ( uid: string ): Promise<AttendeeModal[]> => {
        const data = await getUserAttendance(uid);
        return data
    }
    // -----------------------------------------------------------------

    const values = { 
        loading,
        currentUser,
        SignUp,
        Login,
        Logout,
        createqrcode,
        GetUserDetails,
        MarkStudent,
        GetStudentsWithDocRef,
        GetBarcodesByUser,
        GetUserAttandance
    }

    if ( loading ) return <Loading/>

    return (
        <AuthContext.Provider value={values}>
          { loading? <Loading/> : children }
        </AuthContext.Provider>
    )
}
