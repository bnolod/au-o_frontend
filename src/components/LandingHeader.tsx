import { Link } from "react-router";
import { HeaderTexts } from "../constants/texts";
import { useEffect, useState } from "react";

export default function LandingHeader({
  language = "EN",
}: {
  language?: "EN" | "HU";
}) {
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
    <header className="sticky top-0 z-50">
      <nav className="max-w-screen flex flex-wrap flex-row items-center justify-between">
        {/* <div className=" flex p-5 w-1/3">
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
        </div> */}
        <div className=" items-center p-5 max-lg:p-0 w-full text-textColor">
          <div className=" lg:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-row justify-center p-4 lg:p-0 mt-4  rounded-lg lg:flex-row lg:space-x-8 rtl:space-x-reverse">
              <li className="flex items-center">
                <Link
                  to="#"
                  className="block py-2 px-3 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:p-0"
                >
                  {HeaderTexts.downloadApp[language]}
                </Link>
              </li>
              <li className="flex items-center">
                <Link
                  to="#"
                  className="block py-2 px-3 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:p-0"
                >
                  {HeaderTexts.faq[language]}
                </Link>
              </li>
              <li className="flex items-center">
                <Link
                  to="#"
                  className="block py-2 px-3 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:p-0"
                >
                  {HeaderTexts.aboutUs[language]}
                </Link>
              </li>
              <li className="flex items-center">
                <Link
                  to="/login"
                  className="block py-2 px-3 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:p-0"
                >
                  {HeaderTexts.login[language]}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-1/3"></div>
      </nav>
    </header>
  );
}
