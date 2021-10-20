import { useEffect, useState } from "react";

function SignUp() {
  return (
    <main className="md:w-1/2 lg:w-5/12 xl:w-4/12 mx-auto p-5 rounded-md bg-sky-200 md:border-4 border-sky-500 shadow-lg">
      <form>
        <div className="flex flex-col space-y-5 text-lg">
          <div className="flex flex-col space-y-2">
            <label htmlFor="name" className="text-wide font-plex-serif">Full name</label>
            <input type="text" id="name" placeholder="Type here..." className="p-2 md:p-3 rounded-md text-black font-plex-sans"/>
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="unique_id" className="text-wide font-plex-serif">Unique ID</label>
            <input type="text" id="unique_id" placeholder="Type here..." className="p-2 md:p-3 rounded-md text-black font-plex-sans"/>
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="unversity" className="text-wide font-plex-serif">University</label>
            <input type="text" id="university" placeholder="Type here..." className="p-2 md:p-3 rounded-md text-black font-plex-sans"/>
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="password" className="text-wide font-plex-serif">Repeat password</label>
            <input type="password" id="password" placeholder="Type here..." className="p-2 md:p-3 rounded-md text-black font-plex-sans"/>
          </div>
          <div className="space-x-4 grid grid-cols-2">
            <button className="py-2 rounded-md bg-sky-500 text-white font-plex-sans-medium transition duration-300 hover:bg-blue-500 hover:shadow-lg">Clear</button>
            <button className="py-2 rounded-md bg-sky-500 text-white font-plex-sans-medium transition duration-300 hover:bg-blue-500 hover:shadow-lg">Done</button>
          </div>
        </div>
      </form>
    </main>
  );
};

export default SignUp;
