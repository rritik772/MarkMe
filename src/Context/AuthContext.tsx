import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, Unsubscribe, User } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";

import Loading from "../Components/Loading/Loading";
import useToggle from "../Library/useToggle"
import { Message } from "../Components/Message/MessageBox";
import { auth } from "./../../firebase";
import { createQrCode, IQrCode } from "./QRCodeContext";
import { ISignup, login, logout, signup } from "./UserContext";

const AuthContext = React.createContext(undefined);

export const useAuth = () => useContext( AuthContext );

export const AuthProvider: React.FC = ({ children }) => {
    // ---------------------------------------------------------
    // User
    const [ loading, setLoading ] = useState<boolean>(true)
    const [ currentUser, setCurrentUser ] = useState<User | undefined>();

    async function SignUp(signupDetails: ISignup): Message {
        return await signup( signupDetails )
    }

    async function Login(email: string, password: string): Message{
        return await login(email, password);
    }

    async function Logout(): Message{
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
    const createqrcode = async (qrCodeDetails: IQrCode): Message => {
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
