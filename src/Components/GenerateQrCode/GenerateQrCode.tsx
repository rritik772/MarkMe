import { QrcodeIcon, ArrowCircleLeftIcon, ArrowCircleRightIcon} from "@heroicons/react/outline";
import QrCode from "react-qr-code";

function GenerateQrCode() {
  return (
    <div className="container mx-auto space-y-5">
      <section className="flex justify-between lg:w-1/2 mx-auto font-plex-sans">
        <ArrowCircleLeftIcon className="h-10 text-blue-500"/>
        <span className="text-3xl font-plex-sans">Generate Qr Code</span>
        <ArrowCircleRightIcon className="h-10 text-blue-500"/>
      </section>
      <main className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full lg:w-1/2 mx-auto p-5 rounded-md bg-sky-200 shadow-lg sm:border-4 border-sky-500">
        <form className="p-5 space-y-4 text-lg">
          <div className="flex flex-col space-y-2">
            <label for="meeting_id font-plex-sans">Meeting ID</label>
            <input type="number" id="meeting_id" className="p-2 md:p-3 rounded-md text-black font-plex-sans"/>
          </div>
          <div className="flex flex-col space-y-2">
            <label for="topic">Topic</label>
            <input type="text" id="topic" className="p-2 md:p-3 rounded-md text-black font-plex-sans"/>
          </div>
          <div className="flex flex-col space-y-2">
            <label for="host_id" className="">Host Email ID</label>
            <input type="email" id="host_id" className="p-2 md:p-3 rounded-md text-black font-plex-sans"/>
          </div>
          <button className="w-full py-2 mt-5 rounded-md bg-sky-500 text-white font-plex-sans-medium transition duration-300 hover:bg-blue-500 hover:shadow-lg">Generate Qr Code</button>
        </form>
        <section className="text-center place-self-center p-5 rounded-md border-4 border-sky-500 bg-white">
          {/* <QrcodeIcon className="h-3/6"/> */}
          <QrCode value="never mind" className="mb-5"/>
          <span className="text-lg font-plex-sans-medium">Scan Me!</span>
        </section>
      </main>
    </div>
  );
}

export default GenerateQrCode;
