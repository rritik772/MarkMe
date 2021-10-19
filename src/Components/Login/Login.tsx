import "./Login.css"

function Login() {
  return (
    <>
      <main className="flex flex-col items-center space-y-10">
        <div className="w-full svg-background-wave"></div>
        <div>
          <section>
            <span className="text-3xl uppercase font-plex-sans">Login</span>
          </section>
        </div
        >
        <main className="md:w-1/2 lg:w-5/12 xl:w-4/12 mx-auto p-5 rounded-md bg-white shadow-lg">
          <form>
            <div className="flex flex-col space-y-5 text-lg">
              <div className="flex flex-col space-y-2">
                <label htmlFor="email" className="text-wide font-plex-serif">Email</label>
                <input autoFocus type="email" id="email" placeholder="Type here..." className="p-2 md:p-3 rounded-md text-black font-plex-sans border-b-2 border-gray-300 hover:shadow-lg shadow-sm focus:shadow-lg duration-300"/>
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="password" className="text-wide font-plex-serif">Password</label>
                <input type="password" id="password" placeholder="Type here..." className="p-2 md:p-3 rounded-md text-black font-plex-sans border-b-2 border-gray-300 hover:shadow-lg shadow-sm focus:shadow-lg duration-300"/>
              </div>
              <div className="space-x-2 align-middle">
                <input type="checkbox" id="remember_me" className=""/>
                <label htmlFor="remember_me" className="font-plex-serif">Remember me?</label>
              </div>
              <div className="space-x-4 grid grid-cols-2">
                <button className="py-2 rounded-md bg-sky-500 text-white font-plex-sans-medium transition duration-300 hover:bg-blue-500 hover:shadow-lg">Clear</button>
                <button className="py-2 rounded-md bg-sky-500 text-white font-plex-sans-medium transition duration-300 hover:bg-blue-500 hover:shadow-lg">Login</button>
              </div>
              <small className="font-plex-sans text-black text-opacity-50">If you don't have account dont worry. Just Login!</small>
            </div>
          </form>
        </main>
      </main>
    </>
  );
};

export default Login;
