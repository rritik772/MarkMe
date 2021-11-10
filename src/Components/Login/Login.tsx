import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

import MessageBox, { Message } from "../Message/MessageBox";
import "./Login.css"

const Login: React.FC<{ alertProp?: Message }> = ({ alertProp }) => {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [alert, setAlert] = useState<Message | undefined>(alertProp);

  const history = useHistory();
  const { verified, currentUser, Login, SendPasswordReset, GetUserDetails } = useAuth();

  if (verified) history.push("/dashboard")

  const handlePasswordReset = () => {
    if (email.length === 0) {
      setAlert(new Message(1, "Please enter you email."));
      setTimeout(() => setAlert(undefined), 4000)
      return
    }
    SendPasswordReset!!(email)
      .then((message) => {
        setAlert(message)
        setTimeout(() => setAlert(undefined), 4000);
      })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setAlert(undefined);
    e.preventDefault();

    if (email.length < 4) {
      setAlert(new Message(0, "Email too short."))
      return;
    } else if (password.length < 4) {
      setAlert(new Message(0, "Password too short."))
      return;
    } else {
      const message: Message = await Login!!(email, password);
      const messageType = message.messageType;

      if (messageType === 2) {
        history.push("/dashboard")
      } else if (messageType === 1) {
        setAlert(message);
      } else {
        setAlert(message);
        setTimeout(() => setAlert(undefined), 4000)
      }
    }
  }

  return (
    <div>
      <main>
        <div className="w-full svg-background-wave"></div>
        <section className="flex flex-col items-center space-y-10 my-10">
          <span className="text-3xl uppercase font-plex-sans">Login</span>
        </section>
        {
          alert && <MessageBox message={alert} />
        }
        <main className="sm:w-7/12 lg:w-4/12 xl:3/12 mx-auto p-5 rounded-md border border-sky-500 bg-white hover:shadow-lg">
          <form className="divide-y-2 divide-gray-300 divide-line space-y-4 flex flex-col">
            <div className="flex flex-col space-y-5 text-lg">
              <input autoFocus type="email" id="email" placeholder="Email..." className="p-2 md:p-3 rounded-md text-black font-plex-sans border-b-2 border-gray-300 hover:shadow-lg shadow-sm focus:shadow-lg duration-300" value={email} onChange={e => setEmail(e.target.value)} />
              <input type="password" id="password" placeholder="Password" className="p-2 md:p-3 rounded-md text-black font-plex-sans border-b-2 border-gray-300 hover:shadow-lg shadow-sm focus:shadow-lg duration-300" value={password} onChange={e => setPassword(e.target.value)} />
              <button type="submit" className="py-2 rounded-md bg-sky-500 text-white font-plex-sans-medium transition duration-300 hover:bg-blue-500 hover:shadow-lg" onClick={(e: any) => handleSubmit(e)}>Login</button>
            </div>
            <div className="grid grid-cols-1 justify-items-center md:grid-cols-2 pt-4 gap-2">
              <span className='hover:text-blue-800 font-plex-serif hover:underline cursor-pointer text-sm' onClick={() => handlePasswordReset()}>Forgot password?</span>
              <Link className="font-plex-serif hover:underline hover:text-blue-800 text-gray-500 text-sm" to="/signup">Don't have a account?</Link>
            </div>
          </form>
        </main>
      </main>
    </div>
  );
};

export default Login;
