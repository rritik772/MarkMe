import Login from "../Login/Login";
import "./Index.css"

function Index() {
  return (
    <>
      <nav className="top-0 m-5 p-5 bg-sky-500 rounded-lg text-center sticky">
        <span className="text-2xl text-bold text-white tracking-widest font-Sharp-sans align-middle">MARK ME!</span>
      </nav>
      <main className="my-32">
        <Login/>
      </main>
      <footer className="w-full space-x-12 text-center absolute bottom-4">
        <a href="Contact">Contact Me</a>
        <a href="About_me">About Me</a>
      </footer>
    </>
  );
};

export default Index;
