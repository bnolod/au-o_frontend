import { Link } from "react-router";
import { HeaderTexts } from "../constants/texts";

export default function LandingHeader({language = "EN"}:{language?: "EN" | "HU";}) {
  return (
    <header>
      <nav className="max-w-screen flex flex-wrap items-center justify-between">
        <div className="basis-1/3 flex justify-end p-5">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="assets/auoLogo_white.svg"
              className="h-10"
              alt="AUO logo"
            />
          </Link>
        </div>
        <div className="basis-2/3 items-center p-5"><div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
              <li className="flex items-center">
                <Link
                  to="#"
                  className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  {HeaderTexts.downloadApp[language]}
                </Link>
              </li>
              <li className="flex items-center">
                <Link
                  to="#"
                  className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  {HeaderTexts.faq[language]}
                </Link>
              </li>
              <li className="flex items-center">
                <Link
                  to="#"
                  className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  {HeaderTexts.aboutUs[language]}
                </Link>
              </li>
              <li className="flex items-center">
                <Link
                  to="/login"
                  className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  {HeaderTexts.login[language]}
                </Link>
              </li>
            </ul>
          </div></div>
        
      </nav>
    </header>
  );
}
