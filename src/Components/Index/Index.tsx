import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { MenuIcon } from '@heroicons/react/outline';

import useToggle from "../../Library/useToggle";
import Attendees from "../Attendance/Attendees";
import Dashboard from "../Dashboard/Dashboard";
import ExportCSV from "../ExportCSV/ExportCSV";
import GenerateQrCode from "../GenerateQrCode/GenerateQrCode";
import Leave from "../Leave/Leave";
import Login from "../Login/Login";
import ScanQrCode from '../ScanQrCode/ScanQrCode';
import SignUp from "../SignUp/SignUp";
import Error from "../Error404/Error";
import "./Index.css"
import ContactMe from "../Contact/ContactMe";
import AboutMe from "../Contact/AboutMe";

function Index() {
  const [ toggleNavBar, setToggleNavBar ] = useToggle();
  return (
    <>
      <nav className="flex justify-between top-0 m-5 p-5 bg-sky-500 rounded-md sticky z-50 overflow-none">
        <span className="self-start text-2xl text-bold text-white tracking-widest font-sharp-sans align-middle">MARK ME!</span>
        <section className="self-center flex flex-col md:flex-row items-end md:space-x-5 text-white">
        {
          <section className={`flex flex-col md:flex-row items-end ${(toggleNavBar)?'block':'hidden'} md:block md:space-x-5 text-center order-last md:order-first`}>
            <a href="/contact" className="hover:underline">Contact Me</a>
            <a href="/about_me" className="hover:underline">About Me</a>
          </section>
        }
        <MenuIcon className='h-6 text-white md:hidden' onClick={() => setToggleNavBar()}/>
        </section>
      </nav>
      <main className="">
        <Router>
          <Switch>
            <Route exact path="/" component={Login}/>
            <Route exact path="/signUp" component={SignUp}/>
            <Route exact path="/contact" component={ContactMe}/>
            <Route exact path="/about_me" component={AboutMe}/>
            <Route exact path="/dashboard" component={Dashboard}/>
            <Route exact path="/dashboard/qrCodeGenerate" component={GenerateQrCode}/>
            <Route exact path="/dashboard/qrCodeGenerate/attendees/:qrCode_id" component={Attendees}/>
            <Route exact path="/dashboard/leave" component={Leave}/>
            <Route exact path="/dashboard/scanQrCode" component={ScanQrCode}/>
            <Route path="*" component={Error}/>
          </Switch>
        </Router>
      </main>
    </>
  );
};

export default Index;
