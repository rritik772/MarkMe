import React, { useEffect, useState } from "react";
import useToggle from "../../Library/useToggle";
import { sha256 } from "js-sha256";

import MessageBox, { Message } from "../Message/MessageBox";
import { useAuth } from "../../Context/AuthContext";
import { Redirect, useHistory } from "react-router-dom";
import { ISignUp } from "../../Modal/UserModal";

function SignUp() {
  const [ email, setEmail ]           = useState<string>('');
  const [ fullName, setFullName ]     = useState<string>('');
  const [ uniqueID, setUniqueID ]     = useState<string>('');
  const [ university, setUniversity ] = useState<string>('');
  const [ password1, setPassword1 ]   = useState<string>('');
  const [ password2, setPassword2 ]   = useState<string>('');

  const [ alert, setAlert ] = useState<Message | undefined>();
  const [ formVisible, setFormVisible ] = useToggle(true);

  const { currentUser, SignUp } = useAuth();
  const history = useHistory();

  if ( currentUser ) history.push("/dashboard")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAlert(undefined);

    if ( email.length < 4 ){
      setAlert(new Message(0, "Email length is too short."));
      return;
    }else if ( fullName.length < 4 ){
      setAlert(new Message(0, "Full name is too short."));
      return;
    }else if ( uniqueID.length < 2 ){
      setAlert(new Message(0, "Unique ID is too short."));
      return;
    }else if ( university.length < 4 ){
      setAlert(new Message(0, "University length is too sort."));
      return;
    }else if ( password1.length < 4 ){
      setAlert(new Message(0, "Password length is too short."))
      return;
    }else if ( password2.length < 4 ){
      setAlert(new Message(0, "Repeat Password length is too short."))
      return;
    }else if ( password1 !== password2 ) {
      setAlert(new Message(0, "Passwords does not match.") )
      return;
    }else {
      const hashedPass = sha256(password1)
      const signupDetails: ISignUp = {
        email: email,
        full_name: fullName,
        unique_id: uniqueID,
        university: university,
        password: hashedPass
      };

      const message: Message = await SignUp!!(signupDetails);
      console.log(message)
      const messageType = await message.messageType
      if ( messageType === 2 )
        history.push("dashboard");
      else
        setAlert(message);
    }
  }

  return (
    <>
    {
      alert && <MessageBox message={alert}/>
    }
      <main className="md:w-1/2 lg:w-5/12 xl:w-4/12 mx-auto p-5 rounded-md shadow-sm border-2 border-gray-200 hover:shadow-xl duration-200">
        <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}>
          <div className="flex flex-col space-y-5 text-lg">
            {
              (formVisible) &&
                <>
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="email" className="text-wide font-plex-serif">Email</label>
                    <input type="email" id="email" placeholder="Type here..." className="p-2 md:p-3 rounded-md text-black font-plex-sans border-b-2 border-gray-300 hover:shadow-lg shadow-sm focus:shadow-lg duration-300" value={email} onChange={(e) => setEmail(e.target.value)}/>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="password" className="text-wide font-plex-serif">Password</label>
                    <input type="password" id="password" placeholder="Type here..." className="p-2 md:p-3 rounded-md text-black font-plex-sans border-b-2 border-gray-300 hover:shadow-lg shadow-sm focus:shadow-lg duration-300" value={password1} onChange={e=> setPassword1(e.target.value)}/>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="password" className="text-wide font-plex-serif">Repeat password</label>
                    <input type="password" id="password" placeholder="Type here..." className="p-2 md:p-3 rounded-md text-black font-plex-sans border-b-2 border-gray-300 hover:shadow-lg shadow-sm focus:shadow-lg duration-300" value={password2} onChange={e => setPassword2(e.target.value)}/>
                  </div>
                </>
            }
            {
              (!formVisible) &&
                <>
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="name" className="text-wide font-plex-serif">Full name</label>
                    <input type="text" id="name" placeholder="Type here..." className="p-2 md:p-3 rounded-md text-black font-plex-sans border-b-2 border-gray-300 hover:shadow-lg shadow-sm focus:shadow-lg duration-300" value={fullName} onChange={e => setFullName(e.target.value)}/>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="unique_id" className="text-wide font-plex-serif">Unique ID</label>
                    <input type="text" id="unique_id" placeholder="Type here..." className="p-2 md:p-3 rounded-md text-black font-plex-sans border-b-2 border-gray-300 hover:shadow-lg shadow-sm focus:shadow-lg duration-300" value={uniqueID} onChange={e => setUniqueID(e.target.value)}/>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="unversity" className="text-wide font-plex-serif">University</label>
                    <input type="text" id="university" placeholder="Type here..." className="p-2 md:p-3 rounded-md text-black font-plex-sans border-b-2 border-gray-300 hover:shadow-lg shadow-sm focus:shadow-lg duration-300" value={university} onChange={e => setUniversity(e.target.value)}/>
                  </div>
                </>
            }
            {
              formVisible &&
                <button className="py-2 rounded-md bg-sky-500 text-white font-plex-sans-medium transition duration-300 hover:bg-blue-500 hover:shadow-lg" onClick={() => setFormVisible()}>Next</button>
            }
            {
            !formVisible &&
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="py-2 rounded-md bg-sky-500 text-white font-plex-sans-medium transition duration-300 hover:bg-blue-500 hover:shadow-lg" onClick={() => setFormVisible()}>Previous</button>
                <button type="submit" className="py-2 rounded-md bg-sky-500 text-white font-plex-sans-medium transition duration-300 hover:bg-blue-500 hover:shadow-lg">SignUp</button>
              </div>
            }
          </div>
        </form>
      </main>
    </>
  );
};

export default SignUp;
