import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { sha256 } from "js-sha256";

import MessageBox, { Message } from "../Message/MessageBox";
import "./Login.css"

function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [alert, setAlert] = useState<Message | undefined>();

  const history = useHistory();
  const { currentUser, Login, SendPasswordReset } = useAuth();

  if (currentUser) history.push("/dashboard");

  const handlePasswordReset = () => {
    if ( email.length === 0 ) {
      setAlert(new Message(1, "Please enter you email."));
      setTimeout(() => setAlert(undefined), 4000)
      return
    }
    SendPasswordReset!!(email)
      .then((message) => {
        console.log(message)
        setAlert(message)
        setTimeout(() => setAlert(undefined), 4000)
      })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setAlert(undefined);
    e.preventDefault();

    if (email.length < 4) {
      setAlert(new Message(0, "Email too short."))
      return;
    } else if (password.length < 4) {
      setAlert(new Message(0, "Email too short."))
      return;
    } else {
      const message: Message = await Login!!(email, sha256(password));
      const messageType = await message.messageType;

      if (messageType === 2) {
        setAlert(message)
        history.push("/dashboard")
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
        <section className="flex flex-col items-center space-y-10">
          <span className="text-3xl uppercase font-plex-sans">Login</span>
        </section>
        {
          alert && <MessageBox message={alert} />
        }
        <main className="md:w-1/2 lg:w-5/12 xl:w-4/12 mx-auto p-5 rounded-md bg-white shadow-lg">
          <form>
            <div className="flex flex-col space-y-5 text-lg">
              <div className="flex flex-col space-y-2">
                <label htmlFor="email" className="text-wide font-plex-serif">Email</label>
                <input autoFocus type="email" id="email" placeholder="Type here..." className="p-2 md:p-3 rounded-md text-black font-plex-sans border-b-2 border-gray-300 hover:shadow-lg shadow-sm focus:shadow-lg duration-300" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="password" className="text-wide font-plex-serif">Password</label>
                <input type="password" id="password" placeholder="Type here..." className="p-2 md:p-3 rounded-md text-black font-plex-sans border-b-2 border-gray-300 hover:shadow-lg shadow-sm focus:shadow-lg duration-300" value={password} onChange={e => setPassword(e.target.value)} />
              </div>
              <span className='hover:text-blue-800 font-plex-serif hover:underline cursor-pointer' onClick={() => handlePasswordReset()}>Forgot password?</span>
              <div className="space-x-4 grid grid-cols-2">
                <button className="py-2 rounded-md bg-sky-500 text-white font-plex-sans-medium transition duration-300 hover:bg-blue-500 hover:shadow-lg" onClick={(e: any) => handleSubmit(e)}>Login</button>
                <button className="py-2 rounded-md bg-sky-500 text-white font-plex-sans-medium transition duration-300 hover:bg-blue-500 hover:shadow-lg" onClick={() => history.push("/signup")}>Signup</button>
              </div>
            </div>
          </form>
        </main>
      </main>
    </div>
  );
};

export default Login;
