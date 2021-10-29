import { ArrowCircleLeftIcon } from "@heroicons/react/outline";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";
import AttendeeIterator from "../../Attendance/AttendeeIterator";
import Loading from "../../Loading/Loading";

const TakenAttendance = () => {
  const [ barcodes, setBarcodes ] = useState<string[]>([])
  const [ loading, setLoading ] = useState<boolean>(false);

  const { currentUser, GetBarcodesByUser } = useAuth();

  useEffect(() => {
    const getBarcodeData = async () => {
      setLoading( true );

      const uid = currentUser!!.uid;
      await GetBarcodesByUser!!(uid)
        .then((document) => {
          setBarcodes(document)

          setLoading( false )
        })
    }
    getBarcodeData();
  }, [])

  if ( loading ) return <Loading/>

  return (
    <div className="space-y-10 mt-10">
      <section className="grid grid-cols-3 lg:w-1/2 mx-auto font-plex-sans">
        <Link to="/dashboard/profile"><ArrowCircleLeftIcon className="h-10 text-blue-500"/></Link>
        <span className="text-3xl font-plex-sans">Attendance Taken</span>
      </section>
      <main className="container flex flex-col md:flex-row mx-auto md:space-x-8 items-start">
        <div className="flex-grow w-full p-5 rounded-md space-y-2 bg-white">
          <BarcodeIterator barcodes={ barcodes }/>
        </div>
      </main>
    </div>
  )
}


const BarcodeIterator: React.FC<{ barcodes: string[] }> = ({ barcodes }) => {
    return (
      <div className="space-y-8">
      {
        barcodes.map((item) => {
          return ( <AttendeeIterator docRef={item} key={item}/> )
        })
      }
      </div>
    );
  }
  

export default TakenAttendance;
