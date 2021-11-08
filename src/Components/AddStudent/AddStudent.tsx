import { useState } from "react";
import { AttendeeModal } from "../../Modal/AttendeeModal";
import { QRCodeModal } from "../../Modal/QRCodeModal";
import { Message } from "../Message/MessageBox";

const AddStudent:React.FC<{ meetingDetails: QRCodeModal }> = ({ meetingDetails }) => {
  const [uniqueId, setUniqueID] = useState<string>('');
  const [email, setEmail] = useState<string>('');
    const [fullName, setFullName] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<boolean>(true);
  const [alert, setAlert] = useState<Message | undefined>();

  const handleSubmit = async () => {
    if (uniqueId.length < 1) {
      setAlert(new Message(0, "Please provide a profile picture."))
      setTimeout(() => setAlert(undefined), 4000);
      return;
    } else if (email.length < 4) {
      setAlert(new Message(0, "Please provide a profile picture."))
      setTimeout(() => setAlert(undefined), 4000);
      return;
    } else {

      const emailRegex = /^[a-z0-9].?[a-z0-9-+]+.?[a-z0-9-]+@[a-z]+\.[a-z][.a-z]+$/
      if (emailRegex.test(email) === false) {
        setAlert(new Message(0, "Invalid email address"));
        setTimeout(() => setAlert(undefined), 4000);
        return;
      }

    }
  }

  return (
    <div className="flex flex-col p-5 space-y-5 rounded-md bg-sky-200 md:border-4 border-sky-500 font-plex-sans">
      <span className="text-lg text-center font-plex-sans-medium">Add Student</span>
      <div className="flex justify-between items-center space-x-3">
        <label htmlFor="student_id">ID</label>
        <input id="student_id" className="p-2 rounded-md" />
      </div>
      <div className="flex justify-between items-center space-x-3">
        <label htmlFor="full_name">Name</label>
        <input id="full_name" className="p-2 rounded-md" value={fullName} onChange={e => setFullName(e.target.value)} />
      </div>
      <div className="flex justify-between items-center space-x-3">
        <label htmlFor="email_id">Email</label>
        <input type='email' id="email_id" className="p-2 rounded-md" />
      </div>
      <div className="flex space-x-3">
        <input type='checkbox' id="status" checked={selectedStatus} onChange={e => setSelectedStatus(e.target.checked)} className="font-plex-sans" />
        <label htmlFor="status">Present?</label>
      </div>
      <button className="w-full py-2 rounded-md bg-sky-500 text-white font-plex-sans-medium duration-500 hover:bg-blue-500">Add Student</button>
    </div>
  )
}

export default AddStudent;
