import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, Unsubscribe, User } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";

import Loading from "../Components/Loading/Loading";
import useToggle from "../Library/useToggle"
import { Message } from "../Components/Message/MessageBox";
import { auth } from "./../../firebase";
import { createQrCode, ICreateQrCode, IQrCode, markStudent } from "./QRCodeContext";
import { ISignup, login, logout, signup, IUserDetails, getUserDetails } from "./UserContext";
import InterfaceMeeting from "../Components/ScanQrCode/InterfaceMeeting";
import { Status } from "../Components/Attendance/InterfaceAttendee";

////
// Context types
export interface AuthContextType {
    loading: boolean;
    currentUser: User | undefined;
    SignUp: undefined | ((signupDetails: ISignup) => Promise<Message>);
    Login: undefined  | ((email: string, password: string) => Promise<Message>);
    Logout: undefined | (() => Promise<Message>);
    CreateQrCode: undefined | ((qrCodeDetails: IQrCode) => Promise<ICreateQrCode>);
    GetUserDetails: undefined | ((user_id: string) => Promise<IUserDetails>);
}

const AuthContextTypeDefault: AuthContextType =  {
    loading: false,
    currentUser: undefined,
    SignUp: undefined,
    Login: undefined,
    Logout: undefined,
    CreateQrCode: undefined,
    GetUserDetails: undefined
}

// -----------------------------------------------------

////
// Pre Context
const AuthContext = React.createContext<AuthContextType>(AuthContextTypeDefault as AuthContextType);

export const useAuth = () => useContext( AuthContext );
// ----------------------------------------------------

export const AuthProvider: React.FC = ({ children }) => {
    // ---------------------------------------------------------
    // User
    const [ loading, setLoading ] = useState<boolean>(true)
    const [ currentUser, setCurrentUser ] = useState<User | undefined>();

    async function SignUp(signupDetails: ISignup): Promise<Message> {
        return await signup( signupDetails )
    }

    async function Login(email: string, password: string): Promise<Message> {
        return await login(email, password);
    }

    async function Logout(): Promise<Message> {
        return await logout();
    }

    async function GetUserDetails(userId: string): Promise<IUserDetails> {
        return await getUserDetails(userId)
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

    const MarkStudent = async (meetingDetails: InterfaceMeeting, userDetails: IUserDetails, status: Status): Promise<Message> => {
        return await markStudent(meetingDetails, userDetails, status);
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
        MarkStudent
     }

    if ( loading ) return <Loading/>

    return (
        <AuthContext.Provider value={values}>
          { loading? <Loading/> : children }
        </AuthContext.Provider>
    )
}
