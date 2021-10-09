import { CameraIcon, QrcodeIcon, IdentificationIcon, BriefcaseIcon } from "@heroicons/react/outline";

function Dashboard() {
  return (
    <main className="md:w-1/2 lg:w-5/12 xl:w-4/12 mx-auto p-5 rounded-md bg-sky-200 shadow-lg md:border-4 border-sky-500">
      <div className="space-y-2">
        <button className="flex items-center p-2 w-full space-x-5 rounded-md hover:bg-sky-300 duration-200">
          <CameraIcon className="h-14 text-sky-600"/>
          <span className="text-xl font-plex-sans">Give your attendance</span>
        </button>
        <button className="flex items-center p-2 w-full space-x-5 rounded-md hover:bg-sky-300 duration-200">
          <QrcodeIcon className="h-14 text-sky-600"/>
          <span className="text-xl font-plex-sans">Generate Qr Code</span>
        </button>
        <button className="flex items-center p-2 w-full space-x-5 rounded-md hover:bg-sky-300 duration-200">
          <BriefcaseIcon className="h-14 text-sky-600"/>
          <span className="text-xl font-plex-sans">Mark leave</span>
        </button>
        <button className="flex items-center p-2 w-full space-x-5 rounded-md hover:bg-sky-300 duration-200">
          <IdentificationIcon className="h-14 text-sky-600"/>
          <span className="text-xl font-plex-sans">Profile</span>
        </button>
      </div>
    </main>
  );
}

export default Dashboard;
