import { ArrowCircleLeftIcon, ArrowCircleRightIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom'


const Profile = () => {
    return(
      <div>
        <div className="space-y-10">
          <section className="grid grid-cols-3 lg:w-5/12 mx-auto font-plex-sans">
            <Link to="/dashboard" className="justify-self-center"><ArrowCircleLeftIcon className="h-10 text-blue-500"/></Link>
            <span className="text-3xl font-plex-sans justify-self-center">Profile</span>
          </section>
          <main className="md:w-1/2 lg:w-5/12 xl:w-4/12 mx-auto p-5 rounded-md border-2 border-sky-500 shadow-sm hover:shadow-lg duration-300 bg-white">
            <div className="space-y-2">
              <Link className="flex items-center p-4 w-full space-x-5 shadow-sm hover:shadow-lg border-l-2 border-sky-500 rounded-md duration-200" to="/dashboard/profile/myAttendance">
                <span className="text-xl font-plex-sans">Your Attendance</span>
              </Link>
              <Link className="flex items-center p-4 w-full space-x-5 shadow-sm hover:shadow-lg border-l-2 border-sky-500 rounded-md duration-200" to="/dashboard/profile/takenAttendance">
                <span className="text-xl font-plex-sans">Taken Attendance</span>
              </Link>
            </div>
          </main>
        </div>
      </div>
    )
}

export default Profile;
