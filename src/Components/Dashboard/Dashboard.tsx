import { CameraIcon, QrcodeIcon, IdentificationIcon, BriefcaseIcon } from "@heroicons/react/outline";
import "./Dashboard.css"
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import { useAuth } from "../../Context/AuthContext";

const Dashboard = (): JSX.Element => {
  const { currentUser } = useAuth();

  return (
    <>
      <div className="flex flex-col justify-center items-center space-y-5">
        <div className="w-full svg-background-layer-waves"></div>
        <span className="text-3xl">Dashboard</span>
        <main className="md:w-1/2 lg:w-5/12 xl:w-4/12 mx-auto p-5 rounded-md shadow-lg bg-white">
          <div className="space-y-2">
            <Link className="flex items-center p-2 w-full space-x-5 shadow-sm hover:shadow-lg border-b-2 rounded-md duration-200" to="/dashboard/scanQrCode">
              <CameraIcon className="p-2 text-white bg-sky-500 h-16 rounded-md"/>
              <span className="text-xl font-plex-sans">Give your attendance</span>
            </Link>
            <Link className="flex items-center p-2 w-full space-x-5 shadow-sm hover:shadow-lg border-b-2 rounded-md duration-200" to="/dashboard/qrCodeGenerate">
              <QrcodeIcon className="p-2 text-white bg-sky-500 h-16 rounded-md"/>
              <span className="text-xl font-plex-sans">Generate Qr Code</span>
            </Link>
            <Link className="flex items-center p-2 w-full space-x-5 shadow-sm hover:shadow-lg border-b-2 rounded-md duration-200" to="/dashboard/leave">
              <BriefcaseIcon className="p-2 text-white bg-sky-500 h-16 rounded-md"/>
              <span className="text-xl font-plex-sans">Mark leave</span>
            </Link>
            <Link className="flex items-center p-2 w-full space-x-5 shadow-sm hover:shadow-lg border-b-2 rounded-md duration-200" to="/dashboard/profile">
              <IdentificationIcon className="p-2 text-white bg-sky-500 h-16 rounded-md"/>
              <span className="text-xl font-plex-sans">Profile</span>
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}
export default Dashboard
