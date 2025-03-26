import { HeaderTexts } from '../constants/texts';
import { useEffect, useState } from 'react';

export default function LandingHeader({ language = 'EN' }: { language?: 'EN' | 'HU' }) {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');

    if (mq.matches) {
      setIsDark(true);
    }

    // This callback will fire if the perferred color scheme changes without a reload
    mq.addEventListener('change', (evt) => setIsDark(evt.matches));
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <nav className="max-w-screen flex flex-wrap flex-row items-center justify-between">
        <div className=" items-center p-5 max-lg:p-0 w-full text-textColor">
          <img
            src={isDark ? 'assets/auoLogo_white.svg' : 'assets/auoLogo_black.svg'}
            className="absolute m-2 max-lg:hidden"
            alt="AUO logo"
          />
          <div className=" lg:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-row justify-center p-4 lg:p-0 mt-4  rounded-lg lg:flex-row lg:space-x-8 rtl:space-x-reverse">
              <li className="flex items-center">
                <a
                  href="#"
                  className="block py-2 px-3 rounded hover:opacity-75 lg:border-0 lg:p-0"
                >
                  {HeaderTexts.downloadApp[language]}
                </a>
              </li>
              <li className="flex items-center">
                <a
                  href="#footer"
                  className="block py-2 px-3 rounded hover:opacity-75 lg:border-0 lg:p-0"
                >
                  {HeaderTexts.faq[language]}
                </a>
              </li>
              <li className="flex items-center">
                <a
                  href="#footer"
                  className="block py-2 px-3 rounded hover:opacity-75 lg:border-0 lg:p-0"
                >
                  {HeaderTexts.aboutUs[language]}
                </a>
              </li>
              {/* <li className="flex items-center">
                <a
                  href="/login"
                  className="block py-2 px-3 rounded hover:opacity-75 lg:border-0 lg:p-0"
                >
                  {HeaderTexts.login[language]}
                </a>
              </li> */}
            </ul>
          </div>
        </div>
        <div className="w-1/3"></div>
      </nav>
    </header>
  );
}
