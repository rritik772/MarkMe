import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, Unsubscribe, User } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";

import Loading from "../Components/Loading/Loading";
import useToggle from "../Library/useToggle"
import { Message } from "../Components/Message/MessageBox";
import { auth } from "./../../firebase";
import { createQrCode, ICreateQrCode, IQrCode } from "./QRCodeContext";
import { ISignup, login, logout, signup } from "./UserContext";

////
// Context types
export interface AuthContextType {
    loading: boolean;
    currentUser: User | undefined;
    SignUp: undefined | ((signupDetails: ISignup) => Promise<Message>);
    Login: undefined  | ((email: string, password: string) => Promise<Message>);
    Logout: undefined | (() => Promise<Message>);
    createqrcode: undefined | ((qrCodeDetails: IQrCode) => Promise<ICreateQrCode>);
}

const AuthContextTypeDefault: AuthContextType =  {
    loading: false,
    currentUser: undefined,
    SignUp: undefined,
    Login: undefined,
    Logout: undefined,
    createqrcode: undefined,
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
    // -----------------------------------------------------------------

    const values = { 
        loading,
        currentUser,
        SignUp,
        Login,
        Logout,
        createqrcode
     }

    if ( loading ) return <Loading/>

    return (
        <AuthContext.Provider value={values}>
          { loading? <Loading/> : children }
        </AuthContext.Provider>
    )
}
