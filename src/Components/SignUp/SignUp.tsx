import React, { FormEvent, useEffect, useState } from "react";
import useToggle from "../../Library/useToggle";

import MessageBox, { Message } from "../Message/MessageBox";
import { useAuth } from "../../Context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import UserModal, { ISignUp } from "../../Modal/UserModal";

function SignUp() {
  const [email, setEmail] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [uniqueID, setUniqueID] = useState<string>('');
  const [university, setUniversity] = useState<string>('');
  const [password1, setPassword1] = useState<string>('');
  const [password2, setPassword2] = useState<string>('');
  const [disableSignup, setDisableSignUp] = useState<boolean>(true);

  const [alert, setAlert] = useState<Message | undefined>();
  const [formVisible, setFormVisible] = useToggle(true);

  const { currentUser, verified, SignUp, UserAlreadyExist, GetUserDetails } = useAuth();
  const history = useHistory();

  if (verified) history.push("/dashboard")

  const handleEmailCheckup = () => {
    setAlert(undefined);
    setDisableSignUp(false);

    UserAlreadyExist!!(email)
      .then((message) => {
        if (message.messageType === 1) {
          setAlert(message);
          setTimeout(() => setAlert(undefined), 4000);
          setDisableSignUp(true);
        } else {
          setDisableSignUp(false);
        }
      })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAlert(undefined);

    if (email.length < 4) {
      setAlert(new Message(0, "Email length is too short."));
      setTimeout(() => setAlert(undefined), 4000);
      return;
    } else if (fullName.length < 4) {
      setAlert(new Message(0, "Full name is too short."));
      setTimeout(() => setAlert(undefined), 4000);
      return;
    } else if (uniqueID.length < 1) {
      setAlert(new Message(0, "Unique ID is too short."));
      setTimeout(() => setAlert(undefined), 4000);
      return;
    } else if (university.length < 4) {
      setAlert(new Message(0, "University length is too sort."));
      setTimeout(() => setAlert(undefined), 4000);
      return;
    } else if (password1.length <= 6) {
      setAlert(new Message(0, "Password length is too short."))
      setTimeout(() => setAlert(undefined), 4000);
      return;
    } else if (password2.length <= 6) {
      setAlert(new Message(0, "Repeat Password length is too short."))
      setTimeout(() => setAlert(undefined), 4000);
      return;
    } else if (password1 !== password2) {
      setAlert(new Message(0, "Passwords does not match."))
      setTimeout(() => setAlert(undefined), 4000);
      return;
    } else {

      const regex = /^[a-z0-9].?[a-z0-9-+]+.?[a-z0-9-]+@[a-z]+\.[a-z][.a-z]+$/
      if (regex.test(email) === false) {
        setAlert(new Message(0, "Invalid email address"));
        setTimeout(() => setAlert(undefined), 4000);
        return;
      }

      const signupDetails: ISignUp = {
        password: password1,
        userModal: new UserModal(
          uniqueID,
          email,
          fullName,
          "NA",
          university,
          "No url"
        )
      };

      const message: Message = await SignUp!!(signupDetails);

      console.log("Signed successfully");

      const messageType = message.messageType
      if (messageType === 2)
        history.push("/");
      else {
        setAlert(message);
        setTimeout(() => setAlert(undefined), 4000);
      }
    }
  }

  return (
    <>
      <div className="w-full svg-background-wave"></div>
      <section className="flex flex-col items-center space-y-10 my-10">
        <span className="text-3xl uppercase font-plex-sans">SignUp</span>
      </section>
      {
        alert && <MessageBox message={alert} />
      }
      <main className="sm:w-7/12 lg:w-4/12 xl:3/12 mx-auto p-5 rounded-md border border-sky-500 bg-white hover:shadow-lg">
        <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)} className="divide-y-2 divide-gray-400 flex flex-col space-y-3">
          <div className="flex flex-col space-y-4 text-lg">
            {
              (formVisible) &&
              <>
                <input type="email" autoFocus id="email" placeholder="Email..." className="p-2 md:p-3 rounded-md text-black font-plex-sans border-b-2 border-gray-300 hover:shadow-lg shadow-sm focus:shadow-lg duration-300" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" id="password" placeholder="Password..." className="p-2 md:p-3 rounded-md text-black font-plex-sans border-b-2 border-gray-300 hover:shadow-lg shadow-sm focus:shadow-lg duration-300" value={password1} onChange={e => setPassword1(e.target.value)} />
                <input type="password" id="Rpassword" placeholder="Confirm Password..." className="p-2 md:p-3 rounded-md text-black font-plex-sans border-b-2 border-gray-300 hover:shadow-lg shadow-sm focus:shadow-lg duration-300" value={password2} onChange={e => setPassword2(e.target.value)} />
              </>
            }
            {
              (!formVisible) &&
              <>
                  <input type="text" id="name" placeholder="Full Name..." className="p-2 md:p-3 rounded-md text-black font-plex-sans border-b-2 border-gray-300 hover:shadow-lg shadow-sm focus:shadow-lg duration-300" value={fullName} onChange={e => setFullName(e.target.value)} />
                  <input type="text" id="unique_id" placeholder="Unique ID..." className="p-2 md:p-3 rounded-md text-black font-plex-sans border-b-2 border-gray-300 hover:shadow-lg shadow-sm focus:shadow-lg duration-300" value={uniqueID} onChange={e => setUniqueID(e.target.value)} />
                  <input type="text" id="university" placeholder="University..." className="p-2 md:p-3 rounded-md text-black font-plex-sans border-b-2 border-gray-300 hover:shadow-lg shadow-sm focus:shadow-lg duration-300" value={university} onChange={e => setUniversity(e.target.value)} />
              </>
            }
            {
              formVisible && (
                <div className="flex space-x-4">
                  <button className="w-full py-2 rounded-md bg-sky-500 text-white font-plex-sans-medium transition duration-300 hover:bg-blue-500 hover:shadow-lg" onClick={() => { setFormVisible(); handleEmailCheckup() }}>Next</button>
                </div>
              )
            }
            {
              !formVisible &&
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="py-2 rounded-md bg-sky-500 text-white font-plex-sans-medium transition duration-300 hover:bg-blue-500 hover:shadow-lg" onClick={() => setFormVisible()}>Previous</button>
                <button type="submit" disabled={disableSignup} className={`py-2 rounded-md ${(disableSignup) ? "bg-sky-200" : "bg-sky-500"} text-white font-plex-sans-medium transition duration-300 hover:bg-blue-500 hover:shadow-lg`}>SignUp</button>
              </div>
            }
          </div>
          <Link to="/" className="pt-3 font-plex-serif hover:underline hover:text-blue-800 text-gray-500 text-sm">Already have a account?</Link>
        </form>
      </main>
    </>
  );
};

export default SignUp;
