import Attendees from "../Attendance/Attendees";
import Dashboard from "../Dashboard/Dashboard";
import GenerateQrCode from "../GenerateQrCode/GenerateQrCode";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";
import "./Index.css"

function Index() {
  return (
    <>
      <nav className="top-0 m-5 p-5 bg-sky-500 rounded-lg text-center sticky z-50">
        <span className="text-2xl text-bold text-white tracking-widest font-sharp-sans align-middle">MARK ME!</span>
      </nav>
      <main className="">
        <Attendees/>
      </main>
      <footer className="w-full my-12 space-x-12 text-center">
        <a href="Contact" className="hover:underline">Contact Me</a>
        <a href="About_me" className="hover:underline">About Me</a>
      </footer>
    </>
  );
};

export default Index;
