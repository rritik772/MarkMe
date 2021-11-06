import { ArrowCircleLeftIcon, PhotographIcon } from "@heroicons/react/outline";
import { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";
import UserModal, { UserModalDefault } from "../../../Modal/UserModal";
import MessageBox, { Message } from "../../Message/MessageBox";

const UpdateProfile = () => {
  const [userDetails, setUserDetails] = useState<UserModal>(UserModalDefault);
  const [fullName, setFullName] = useState<string>('');
  const [uniqueID, setUniqueID] = useState<string>('');
  const [university, setUniversity] = useState<string>('');
  const [profilePic, setProfilePic] = useState<File | undefined>();
  const [alert, setAlert] = useState<Message | undefined>(undefined);

  const { currentUser, GetUserDetails, UpdateUserDetails } = useAuth();

  const profilePicSetter = (files: FileList | null) => {
    if (files === null) return;
    if (files.length === 0 || files[0] === undefined) {
      setAlert(new Message(0, "Please provide a profile picture."))
      setTimeout(() => setAlert(undefined), 4000);
      return;
    }

    setProfilePic(files[0]);
  }

  const handleUpdateProfile = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const modal = new UserModal(
      uniqueID,
      currentUser!!.email!!,
      fullName,
      currentUser!!.uid,
      university,
      "No url"
    );

    UpdateUserDetails!!(modal, profilePic!!)
      .then((response) => {
        console.log(response)
        setAlert(response)
        setTimeout(() => setAlert(undefined), 4000)
      })
  }

  useEffect(() => {
    GetUserDetails!!(currentUser!!.uid)
      .then((response) => {
        setUserDetails(response)
        setUniqueID(response.unique_id);
        setFullName(response.full_name);
        setUniversity(response.university)
      });
  }, [])

  return (
    <div className="space-y-10">
      {alert && <MessageBox message={alert} />}
      <section className="grid grid-cols-3 lg:w-1/2 mx-auto font-plex-sans">
        <Link to="/dashboard/profile"><ArrowCircleLeftIcon className="h-10 text-blue-500" /></Link>
        <span className="text-3xl font-plex-sans">Update Profile</span>
      </section>
      <form className="w-full lg:w-7/12 grid grid-cols-1 md:grid-cols-2 gap-5 mx-auto p-5 rounded-md" onSubmit={(e) => handleUpdateProfile(e)}>
        <div className="flex flex-col p-5 bg-white rounded-md shadow-md hover:shadow-xl duration-300 space-y-1">
          <label className="text-lg px-3 cursor-pointer" htmlFor="unique_id">Unique ID</label>
          <input className="px-3 py-2 border-2 hover:border-sky-500 text-lg rounded-md font-plex-sans-medium" type="text" id="unique_id" value={uniqueID} onChange={(e) => setUniqueID(e.target.value)} />
        </div>
        <div className="flex flex-col p-5 bg-white rounded-md shadow-md hover:shadow-xl duration-300 space-y-1">
          <label className="text-lg px-3 cursor-pointer" htmlFor="full_name">Full Name</label>
          <input className="px-3 py-2 border-2 hover:border-sky-500 text-lg rounded-md font-plex-sans-medium" type="text" id="full_name" value={fullName} onChange={e => setFullName(e.target.value)} />
        </div>
        <div className="flex flex-col p-5 bg-white rounded-md shadow-md hover:shadow-xl duration-300 space-y-1">
          <label className="text-lg px-3 cursor-pointer" htmlFor="university">University</label>
          <input className="px-3 py-2 border-2 hover:border-sky-500 text-lg rounded-md font-plex-sans-medium" type="text" id="university" value={university} onChange={e => setUniversity(e.target.value)} />
        </div>
        <div className="flex flex-col justify-center p-5 bg-white rounded-md shadow-md hover:shadow-xl duration-300 space-y-1">
          <label className="truncate text-xl px-3 cursor-pointer space-x-4" htmlFor="photo">
            <PhotographIcon className="h-20 inline-block text-sky-500" />
            <span className="w-full">{(profilePic) ? profilePic.name : 'Profile Photo'}</span>
          </label>
          <input hidden className="px-3 py-2 border-2 hover:border-sky-500 text-lg rounded-md font-plex-sans-medium" type="file" accept="image/*" id="photo" onChange={e => profilePicSetter(e.target.files)} />
        </div>
        <button type="submit" className="px-4 py-4 bg-sky-500 rounded-md shadow-md hover:shadow-xl text-white font-bold duration-300">Update User</button>
      </form>
    </div>
  )
}

export default UpdateProfile;
