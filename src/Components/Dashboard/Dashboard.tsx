import { CameraIcon, QrcodeIcon, IdentificationIcon, BriefcaseIcon } from "@heroicons/react/outline";
import "./Dashboard.css"
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import AddStudent from "../AddStudent/AddStudent";

const Dashboard = (): JSX.Element => {
  const { currentUser, BarcodeExist } = useAuth();

  return (
    <>
      <div className="flex flex-col justify-center items-center space-y-5 md:p-5">
        <div className="w-full svg-background-layer-waves"></div>
        <span className="text-3xl">Dashboard</span>
        <main className="w-full lg:w-7/12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mx-auto p-5 rounded-md">
          <Link className="flex flex-col items-center space-y-5 p-5 h-44 md:h-48 w-full shadow-sm hover:shadow-lg border-b-2 rounded-md duration-200 bg-white" to="/dashboard/scanQrCode">
            <CameraIcon className="w-full p-2 text-white bg-sky-500 h-2/3 rounded-md" />
            <span className="text-xl font-plex-sans">Give your attendance</span>
          </Link>
          <Link className="flex flex-col items-center space-y-5 p-5 h-44 md:h-48 w-full shadow-sm hover:shadow-lg border-b-2 rounded-md duration-200 bg-white" to="/dashboard/qrCodeGenerate">
            <QrcodeIcon className="w-full p-2 text-white bg-sky-500 h-2/3 rounded-md" />
            <span className="text-xl font-plex-sans">Generate Qr Code</span>
          </Link>
          <Link className="flex flex-col items-center space-y-5 p-5 h-44 md:h-48 w-full shadow-sm hover:shadow-lg border-b-2 rounded-md duration-200 bg-white" to="/dashboard/profile">
            <IdentificationIcon className="w-full p-2 text-white bg-sky-500 h-2/3 rounded-md" />
            <span className="text-xl font-plex-sans">Profile</span>
          </Link>
        </main>
      </div>
    </>
  );
}
export default Dashboard
