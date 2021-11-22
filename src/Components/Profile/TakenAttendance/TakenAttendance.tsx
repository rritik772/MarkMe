import { ArrowCircleLeftIcon, ExclamationCircleIcon, SearchIcon } from "@heroicons/react/outline";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";

import AttendeeIterator from "../../Attendance/AttendeeIterator";
import Loading from "../../Loading/Loading";

const TakenAttendance = () => {
  const [barcodes, setBarcodes] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(false);
  const [searchString, setSearchString] = useState<string>('')

  const { currentUser, GetBarcodesByUser } = useAuth();

  useEffect(() => {
    const getUserBarcodes = async () => {
      setLoading(true);

      const uid = currentUser!!.uid;
      await GetBarcodesByUser!!(uid)
        .then((document) => {
          setBarcodes(document)

          setLoading(false)
        })
    }
    getUserBarcodes();
  }, [])

  return (
    <div className="space-y-10 mt-10">
      <section className="flex justify-center space-x-5 lg:w-1/2 mx-auto font-plex-sans">
        <Link to="/dashboard/profile"><ArrowCircleLeftIcon className="h-10 text-blue-500" /></Link>
        <span className="text-3xl font-plex-sans">Attendees</span>
      </section>
      <main className="container flex flex-col md:flex-row mx-auto md:space-x-8 items-start">
        <div className="flex-grow w-full p-5 rounded-md space-y-2 bg-white">
          <div className="flex justify-center items-center py-5 space-x-4">
            <input
                type="text"
                id="searcher"
                className="border-2 border-gray-500 p-2 rounded-md md:w-3/12 focus:outline-none hover:border-sky-500 focus:border-sky-500"
                value={searchString}
                onChange={e => setSearchString(e.target.value)}
            />
            <SearchIcon className="h-8 inline-block text-black hover:text-sky-600 cursor-pointer" />
          </div>
          {(loading) && <Loading />}
          {
            (barcodes.length === 0 && !loading) &&
            <main className="md:w-1/2 lg:w-5/12 xl:w-4/12 mx-auto flex items-center p-5 space-x-5 rounded-md bg-white shadow-lg">
              <ExclamationCircleIcon className="p-2 text-white bg-sky-500 h-32 rounded-md" />
              <div className="flex flex-col">
                <span className="text-3xl font-plex-sans">Oops</span>
                <span className="text-3xl font-plex-sans">No Data</span>
                <span className="text-3xl font-plex-sans">Avaliable</span>
              </div>
            </main>
          }
          <BarcodeIterator barcodes={barcodes} searchString={searchString} />
        </div>
      </main>
    </div>
  )
}


const BarcodeIterator: React.FC<{ barcodes: string[]; searchString: string }> = ({ barcodes, searchString }) => {
  return (
    <div className="space-y-8">
      {
        barcodes.map((item) => {
          return (
            <div key={item} className="grid">
              <AttendeeIterator docRef={item} searchString={searchString}/>
            </div>
          )
        })
      }
    </div>
  );
}


export default TakenAttendance;
