import { Link, NavLink } from "react-router";
import { useEffect, useState } from "react";
import { MdSearch, MdSettings } from "react-icons/md";
import ProfileImage from "./ProfileImage";
import { useAuthentication } from "../contexts/AuthenticationContext";
import Avatar from "@mui/material/Avatar";
import { grey } from "@mui/material/colors";

export default function Header() {
  const { user } = useAuthentication();
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
    <header className="fixed backdrop-blur-xl w-full p-3 z-50">
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
        <div className="basis-1/3 flex items-center justify-center rounded-xl ">
          <div className="p-3 text-highlightPrimary">Home</div>
          <div className="p-3">Groups</div>
          <div className="p-3">Events</div>
        </div>
        <div className="basis-1/3 flex justify-end gap-1 items-center">
          <h3 className="text-center hidden md:flex">{user?.nickname}</h3>
          <NavLink to={"/profile"}>
          <Avatar
            sx={{ bgcolor: grey[800] }}
            src={user?.profileImg}
          >
            {user?.nickname.substring(0, 3).toUpperCase()}
          </Avatar>
          </NavLink>
          <button
            className=""
            onClick={() => {
              document.getElementById("root")!.classList.toggle("dark");
            }}
          >
            <MdSettings className="text-4xl" />
          </button>
        </div>
      </nav>
    </header>
  );
}
