export default function ContactMe() {
  return (
    <>
      <div className="flex justify-center mb-7">
        <span className="text-3xl">Contact Me</span>
      </div>
      <main className="md:w-1/2 lg:w-5/12 xl:w-4/12 mx-auto p-5 rounded-md bg-sky-200 md:border-4 border-sky-500 shadow-lg">
        <form className="flex flex-col space-y-5 text-lg">
          <div className="flex flex-col space-y-2">
            <label htmlFor="email" className="text-wide font-plex-serif">Email</label>
            <input type="email" id="email" className="p-2 md:p-3 rounded-md text-black font-plex-sans"/>
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="thoughts" className="text-wide font-plex-serif">Thoughts?</label>
            <input type="text" id="thoughts" className="p-2 md:p-3 rounded-md text-black font-plex-sans"/>
          </div>
          <button className="py-2 rounded-md bg-sky-500 text-white font-plex-sans-medium transition duration-300 hover:bg-blue-500 hover:shadow-lg">Submit</button>
        </form>
      </main>
    </>
  )
}
