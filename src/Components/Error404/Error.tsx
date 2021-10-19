import { Link } from "react-router-dom";

export default function Error() {
  return (
    <>
      <main className="flex flex-col items-center space-y-10">
        <div>
          <section>
            <span className="text-2xl md:text-3xl uppercase font-plex-sans">You landed on wrong planet!</span>
          </section>
        </div>
        <div className="flex justify-around w-full md:w-1/2 lg:w-5/12 xl:w-4/12 mx-auto p-5 rounded-md bg-sky-200 md:border-4 border-sky-500 shadow-lg">
          <Link to="/">        <span className="text-lg font-plex-sans-medium hover:underline ">Login</span> </Link>
          <Link to="contact">  <span className="text-lg font-plex-sans-medium hover:underline ">Contact</span> </Link>
          <Link to="about_me"> <span className="text-lg font-plex-sans-medium hover:underline ">About Me</span> </Link>
        </div>
      </main>
    </>
  )
}
