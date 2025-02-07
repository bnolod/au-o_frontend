import { Link } from "react-router";
import { useEffect, useState } from "react";
import { MdSearch, MdSettings } from "react-icons/md";
import ProfileImage from "./ProfileImage";

export default function Header() {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");

    if (mq.matches) {
      setIsDark(true);
    }

    // This callback will fire if the perferred color scheme changes without a reload
    mq.addEventListener("change", (evt) => setIsDark(evt.matches));
    
  }, []);



  return (
    <header className="fixed backdrop-blur-xl w-full p-3">
      <nav className="max-w-screen flex flex-wrap items-center justify-between">
        <div className="basis-1/3 flex justify-start">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src={
                isDark ? "assets/auoLogo_white.svg" : "assets/auoLogo_black.svg"
              }
              className=""
              alt="AUO logo"
            />
          </Link>
        </div>
        <div className="basis-1/3 flex items-center justify-between text-textColor backdrop-blur-7xl bg-white/50 rounded-xl ">
          <input
            type="search"
            className="p-3 w-10/12 rounded bg-transparent"
            placeholder="example"
          />
          <button className="flex-grow flex justify-end p-3">
            <MdSearch className="text-xl"></MdSearch>
          </button>
        </div>
        <div className="basis-1/3 flex justify-end items-center">
        
        
          <h3 className="text-center hidden md:flex">Felhasznalo Nev</h3>
          <ProfileImage className="mx-3"/>
          <button className="mr-3" onClick={() => {
              document.getElementById("root")!.classList.toggle('dark')
        }}>
            <MdSettings className="text-4xl" />
          </button>
        </div>
      </nav>
    </header>
  );
}
