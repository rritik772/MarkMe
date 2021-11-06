import { Timestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { AttendeeModal } from "../../Modal/AttendeeModal";

interface IExportCSV {
  docRef: string;
  reFetch?: number;
}

const ExportCSV: React.FC<IExportCSV> = ({ docRef, reFetch }) => {
  const [attendees, setAttendees] = useState<AttendeeModal[]>([]);
  const [isUniqueID, setIsUniqueID] = useState<boolean>(true);
  const [isFullName, setIsFullName] = useState<boolean>(false);
  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [isStatus, setIsStatus] = useState<boolean>(true);
  const [isDatestamp, setIsDatestamp] = useState<boolean>(false);
  const [isTimestamp, setIsTimestamp] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { GetStudentsWithDocRef } = useAuth();

  const exportCSV = () => {
    var csvData = 'Index,Unique ID,Email,Full Name,Status,Datestamp,Timestamp\n';
    attendees.forEach((item, index) => {
      csvData += `${(index + 1)},${item.toString()}`;
      csvData += '\n';
    })

    var hiddenElement = document.createElement('a');
    hiddenElement.href = `data:text/csv;charset=utf-8,${encodeURI(csvData)}`;
    hiddenElement.target = '_blank';
    hiddenElement.download = 'Attandance.csv'
    hiddenElement.click();
  }


  useEffect(() => {
    setLoading(true);

    const getAttendeesFromFirebase = () => {
      GetStudentsWithDocRef!!(docRef)
        .then(students => {
          setAttendees(students);
        })
    }

    getAttendeesFromFirebase();

    setLoading(false)
  }, [reFetch])

  return (
    <>
      <main className="md:w-10/12 lg:w-8/12 mx-auto p-10 shadow-lg space-y-5 mb-10">
        <span className="text-lg font-plex-sans-medium">Avaliable columns (*Not Working)</span>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 font-plex-sans">
          <label htmlFor="unique_id" className="flex items-center p-2 hover:shadow-lg border-b-2 hover:border-blue-500 rounded-md space-x-3 cursor-pointer duration-300 checkbox">
            <input type="checkbox" id="unique_id" checked={isUniqueID} onChange={e => setIsUniqueID(e.target.checked)} />
            <span>Unique ID</span>
          </label>
          <label htmlFor="name" className="flex items-center p-2 hover:shadow-lg border-b-2 hover:border-blue-500 rounded-md space-x-3 cursor-pointer duration-300 checkbox">
            <input type="checkbox" id="name" checked={isFullName} onChange={e => setIsFullName(e.target.checked)} />
            <span>Full Name</span>
          </label>
          <label htmlFor="email_id" className="flex items-center p-2 hover:shadow-lg border-b-2 hover:border-blue-500 rounded-md space-x-3 cursor-pointer duration-300 checkbox">
            <input type="checkbox" id="email_id" checked={isEmail} onChange={e => setIsEmail(e.target.checked)} />
            <span>Email ID</span>
          </label>
          <label htmlFor="status" className="flex items-center p-2 hover:shadow-lg border-b-2 hover:border-blue-500 rounded-md space-x-3 cursor-pointer duration-300 checkbox">
            <input type="checkbox" id="status" checked={isStatus} onChange={e => setIsStatus(e.target.checked)} />
            <span>Status</span>
          </label>
          <label htmlFor="timestamp" className="flex items-center p-2 hover:shadow-lg border-b-2 hover:border-blue-500 rounded-md space-x-3 cursor-pointer duration-300 checkbox">
            <input type="checkbox" id="timestamp" checked={isDatestamp} onChange={e => setIsDatestamp(e.target.checked)} />
            <span>Datestamp</span>
          </label>
          <label htmlFor="timestamp" className="flex items-center p-2 hover:shadow-lg border-b-2 hover:border-blue-500 rounded-md space-x-3 cursor-pointer duration-300 checkbox">
            <input type="checkbox" id="timestamp" checked={isTimestamp} onChange={e => setIsTimestamp(e.target.checked)} />
            <span>Timestamp</span>
          </label>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 flex-wrap">
          <button className="w-full py-2 rounded-md bg-sky-500 text-white font-plex-sans-medium duration-500 hover:bg-blue-500" onClick={() => exportCSV()}>All Columns</button>
          <button className="w-full py-2 rounded-md bg-sky-500 text-white font-plex-sans-medium duration-500 hover:bg-blue-500" onClick={() => exportCSV()}>Export CSV</button>
        </div>
      </main>
      <table className="w-full table-auto mx-auto border-collapse border-4 border-sky-500">
        <thead>
          <tr>
            <th className="border-2 border-sky-500">Unique ID</th>
            <th className="border-2 border-sky-500">Full Name</th>
            <th className="border-2 border-sky-500">Email ID</th>
            <th className="border-2 border-sky-500">Status</th>
            <th className="border-2 border-sky-500">Datestamp</th>
            <th className="border-2 border-sky-500">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {
            attendees.map(item => {
              return (
                <tr>
                  <td className="h-12 text-center border-2 border-sky-500">{item.unique_id}</td>
                  <td className="h-12 text-center border-2 border-sky-500">{item.full_name}</td>
                  <td className="h-12 text-center border-2 border-sky-500">{item.email_id}</td>
                  <td className="h-12 text-center border-2 border-sky-500">{(item.status == 1) ? 'Absent' : 'Present'}</td>
                  <td className="h-12 text-center border-2 border-sky-500">{item.convertDatestamp()}</td>
                  <td className="h-12 text-center border-2 border-sky-500">{item.convertTimestamp()}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </>
  );
};

export default ExportCSV;
