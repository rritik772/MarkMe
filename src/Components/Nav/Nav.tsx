import { Link, useHistory } from "react-router-dom";
import { MenuIcon } from '@heroicons/react/outline';
import useToggle from "../../Library/useToggle";
import { useAuth } from "../../Context/AuthContext";
import MessageBox, { Message } from "../Message/MessageBox";
import { useState } from "react";

const Nav = () => {
  const [ toggleNavBar, setToggleNavBar ] = useToggle();
  const [ alert, setAlert ] = useState<Message | undefined>()

  const { currentUser, Logout } = useAuth();

  const history = useHistory();

  const logoutUser = async () => {
    const message: Message = await Logout();
    const messageType = await message.messageType;

    if ( messageType === 2 ){
      console.log("Logged out")
      window.location.reload(false)
    }else {
      setAlert(message)
    }
  }

  return (
    <>
      <nav className="flex justify-between top-0 m-5 p-5 bg-sky-500 rounded-md sticky z-50 overflow-none">
        <Link to="/" className="self-start text-2xl text-bold text-white tracking-widest font-sharp-sans align-middle">MARK ME!</Link>
        <section className="self-center flex flex-col md:flex-row items-end md:space-x-5 text-white">
          {
            <section className={`flex flex-col md:flex-row items-end ${(toggleNavBar)?'block':'hidden'} md:block md:space-x-5 text-center order-last md:order-first`}>
              <a href="/contact" className="hover:underline">Contact Me</a>
              <a href="/about_me" className="hover:underline">About Me</a>
              { currentUser && <button onClick={() => logoutUser()} className="hover:underline">Log out</button> }
            </section>
          }
          <MenuIcon className='h-6 text-white md:hidden' onClick={() => setToggleNavBar()}/>
        </section>
      </nav>
      { alert && <MessageBox message={alert}/> }
    </>
  )
}

export default Nav;
