import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./Index.css"
import Attendees from "../Attendance/Attendees";
import Dashboard from "../Dashboard/Dashboard";
import ExportCSV from "../ExportCSV/ExportCSV";
import GenerateQrCode from "../GenerateQrCode/GenerateQrCode";
import Leave from "../Leave/Leave";
import Login from "../Login/Login";
import ScanQrCode from '../ScanQrCode/ScanQrCode';
import SignUp from "../SignUp/SignUp";
import Error from "../Error404/Error";
import ContactMe from "../Contact/ContactMe";
import AboutMe from "../Contact/AboutMe";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import { AuthProvider } from "../../Context/AuthContext";
import Nav from "../Nav/Nav";

function Index() {

  return (
    <>
      <main className="">
        <Router>
          <AuthProvider>
            <Nav/>
            <Switch>
              <Route exact path="/" component={Login}/>
              <Route exact path="/signup" component={SignUp}/>
              <Route exact path="/contact" component={ContactMe}/>
              <Route exact path="/about_me" component={AboutMe}/>
              <PrivateRoute exact path="/dashboard" comp={Dashboard}/>
              <PrivateRoute exact path="/dashboard/qrCodeGenerate" comp={GenerateQrCode}/>
              <PrivateRoute exact path="/dashboard/qrCodeGenerate/attendees/:docRef" comp={Attendees}/>
              <PrivateRoute exact path="/dashboard/leave" comp={Leave}/>
              <PrivateRoute exact path="/dashboard/scanQrCode" comp={ScanQrCode}/>
              <Route component={Error}/>
            </Switch>
          </AuthProvider>
        </Router>
      </main>
    </>
  );
};

export default Index;
