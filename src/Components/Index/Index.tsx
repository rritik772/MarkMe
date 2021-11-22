import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { lazy, Suspense } from 'react';

import "./Index.css"

const Attendees = lazy(() => import("../Attendance/Attendees"));
const Dashboard = lazy(() => import("../Dashboard/Dashboard"));
const GenerateQrCode = lazy(() => import("../GenerateQrCode/GenerateQrCode"));
const Leave = lazy(() => import("../Leave/Leave"));
const Login = lazy(() => import("../Login/Login"));
const ScanQrCode = lazy(() => import('../ScanQrCode/ScanQrCode'));
const SignUp = lazy(() => import("../SignUp/SignUp"));
const Error = lazy(() => import("../Error404/Error"));
const ContactMe = lazy(() => import("../Contact/ContactMe"));
const AboutMe = lazy(() => import("../Contact/AboutMe"));
const PrivateRoute = lazy(() => import("../PrivateRoute/PrivateRoute"));
const Nav = lazy(() => import("../Nav/Nav"));
const Profile = lazy(() => import("../Profile/Profile"));
const TakenAttendance = lazy(() => import("../Profile/TakenAttendance/TakenAttendance"));
const MyAttendance = lazy(() => import("../Profile/MyAttendance/MyAttendance"));
const UpdateProfile = lazy(() => import("../Profile/UpdateProfile/UpdateProfile"));
import { AuthProvider } from "../../Context/AuthContext";
import Loading from "../Loading/Loading";

function Index() {

  return (
    <>
      <main className="">
          <Suspense fallback={<Loading />}>

        <Router>
        <AuthProvider>
        <Nav />
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
        <PrivateRoute exact path="/dashboard/profile" comp={Profile}/>
        <PrivateRoute exact path="/dashboard/profile/myAttendance" comp={MyAttendance}/>
        <PrivateRoute exact path="/dashboard/profile/takenAttendance" comp={TakenAttendance}/>
        <PrivateRoute exact path="/dashboard/profile/updateProfile" comp={UpdateProfile}/>
        <Route component={Error}/>
        </Switch>
        </AuthProvider>
        </Router>
          </Suspense>
      </main>
    </>
  );
};

export default Index;
