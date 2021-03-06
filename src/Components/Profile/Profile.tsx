import { ArrowCircleLeftIcon, ArrowCircleRightIcon, DatabaseIcon, SparklesIcon, UserCircleIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom'
import './Profile.css'


const Profile = () => {
  return (
    <div>
        <div className="svg-background-blurry"></div>
      <div className="space-y-10 p-5 mt-10">
        <section className="flex justify-center space-x-10 lg:w-5/12 mx-auto font-plex-sans">
          <Link to="/dashboard" className="justify-self-center"><ArrowCircleLeftIcon className="h-10 text-blue-500" /></Link>
          <span className="text-3xl font-plex-sans justify-self-center">Profile</span>
          <Link to="/dashboard/profile/updateProfile" className="justify-self-center"><ArrowCircleRightIcon className="h-10 text-blue-500" /></Link>
        </section>
        <main className="w-full lg:w-7/12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mx-auto p-5 rounded-md">
          <Link className="flex flex-col items-center space-y-5 p-5 h-44 md:h-48 w-full shadow-sm hover:shadow-lg border-b-2 rounded-md duration-200 bg-white" to="/dashboard/profile/myAttendance">
            <SparklesIcon className="w-full p-2 text-white bg-sky-500 h-2/3 rounded-md" />
            <span className="text-xl font-plex-sans">Your Attendance</span>
          </Link>
          <Link className="flex flex-col items-center space-y-5 p-5 h-44 md:h-48 w-full shadow-sm hover:shadow-lg border-b-2 rounded-md duration-200 bg-white" to="/dashboard/profile/takenAttendance">
            <DatabaseIcon className="w-full p-2 text-white bg-sky-500 h-2/3 rounded-md" />
            <span className="text-xl font-plex-sans">Taken Attendance</span>
          </Link>
          <Link className="flex flex-col items-center space-y-5 p-5 h-44 md:h-48 w-full shadow-sm hover:shadow-lg border-b-2 rounded-md duration-200 bg-white" to="/dashboard/profile/updateProfile">
            <UserCircleIcon className="w-full p-2 text-white bg-sky-500 h-2/3 rounded-md" />
            <span className="text-xl font-plex-sans">Update Profile</span>
          </Link>
        </main>
      </div>
    </div>
  )
}

export default Profile;
