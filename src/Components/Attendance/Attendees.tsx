import { QrcodeIcon, ArrowCircleLeftIcon, ArrowCircleRightIcon} from "@heroicons/react/outline";
import { Link } from "react-router-dom"
;
import useToggle from "../../Library/useToggle";
import AddStudent from "../AddStudent/AddStudent";
import RemoveStudent from "../RemoveStudent/RemoveStudent";
import SearchStudent from "../SearchStudent/SearchStudent";
import Attendee from "./Attendee"
;
function Attendees() {
  const [ toggleAddStudent, setToggleAddStudent ] = useToggle();
  const [ toggleRemoveStudent, setToggleRemoveStudent ] = useToggle();
  const [ toggleSearchStudent, setToggleSearchStudent ] = useToggle()
  ;
  return (
    <>
      <div className="space-y-10">
        <section className="flex justify-between lg:w-1/2 mx-auto font-plex-sans">
          <Link to="/dashboard/qrCodeGenerate"><ArrowCircleLeftIcon className="h-10 text-blue-500"/></Link>
          <span className="text-3xl font-plex-sans">Attendees</span>
          <Link to="/qrCodeGenerate/attendees/12" ><ArrowCircleRightIcon className="h-10 text-blue-500"/></Link>
        </section>
        <main className="container flex flex-col md:flex-row mx-auto md:space-x-8 items-start">
          <section className="flex-grow w-full p-5 rounded-md space-y-2 bg-sky-200 md:border-4 border-sky-500">
            <Attendee/>
          </section>
          <nav className="md:flex-none w-full md:w-3/12 order-first md:order-last space-y-5">
            <div className="flex flex-col p-5 rounded-md space-y-4 bg-sky-200 md:border-4 border-sky-500">
              <button className="py-2 rounded-md bg-sky-500 text-white font-plex-sans-medium transition duration-300 hover:bg-blue-500 hover:shadow-lg">Export CSV</button>
              <button className="py-2 rounded-md bg-sky-500 text-white font-plex-sans-medium transition duration-300 hover:bg-blue-500 hover:shadow-lg">Destroy QrCode</button>
              <button className="py-2 rounded-md bg-sky-500 text-white font-plex-sans-medium transition duration-300 hover:bg-blue-500 hover:shadow-lg" onClick={() => setToggleAddStudent()}>Add Student</button>
              <button className="py-2 rounded-md bg-sky-500 text-white font-plex-sans-medium transition duration-300 hover:bg-blue-500 hover:shadow-lg" onClick={() => setToggleRemoveStudent()}>Remove Student</button>
              <button className="py-2 rounded-md bg-sky-500 text-white font-plex-sans-medium transition duration-300 hover:bg-blue-500 hover:shadow-lg" onClick={() => setToggleSearchStudent()}>Search Student</button>
            </div>
            { (toggleAddStudent) && <AddStudent/> }
            { (toggleRemoveStudent) && <RemoveStudent/> }
            { (toggleSearchStudent) && <SearchStudent/> }
          </nav>
        </main>
      </div>
    </>
  );
};

export default Attendees;
