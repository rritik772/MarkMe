import { MenuIcon } from '@heroicons/react/outline';

import useToggle from "../../Library/useToggle";
import Attendees from "../Attendance/Attendees";
import Dashboard from "../Dashboard/Dashboard";
import ExportCSV from "../ExportCSV/ExportCSV";
import GenerateQrCode from "../GenerateQrCode/GenerateQrCode";
import Leave from "../Leave/Leave";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";
import "./Index.css"

function Index() {
  const [ toggleNavBar, setToggleNavBar ] = useToggle();
  return (
    <>
      <nav className="flex justify-between top-0 m-5 p-5 bg-sky-500 rounded-lg sticky z-50">
        <span className="self-start text-2xl text-bold text-white tracking-widest font-sharp-sans align-middle">MARK ME!</span>
        <section className="self-center flex flex-col md:flex-row items-end md:space-x-5 text-white">
        {
          <section className={`flex flex-col md:flex-row items-end ${(toggleNavBar)?'block':'hidden'} md:block md:space-x-5 text-center order-last md:order-first`}>
            <a href="Contact" className="hover:underline">Contact Me</a>
            <a href="About_me" className="hover:underline">About Me</a>
          </section>
        }
        <MenuIcon className='h-6 text-white md:hidden' onClick={() => setToggleNavBar()}/>
        </section>
      </nav>
      <main className="">
        <Leave/>
      </main>
    </>
  );
};

export default Index;
