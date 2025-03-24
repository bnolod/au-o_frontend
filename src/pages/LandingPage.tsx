import LoginModal from '../components/LoginModal';
import LandingHeader from '../components/LandingHeader';
import ScrollableDisplay from '../components/ScrollableDisplay';
import { LandingTexts } from '../constants/texts';
import { useLanguage } from '../contexts/LanguageContext';
import { useEffect, useRef, useState } from 'react';

export default function LandingPage() {
  const { language } = useLanguage();

  const [registerMode, setRegisterMode] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  const toggleRegister = () => {
    setRegisterMode(!registerMode);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (event.target instanceof HTMLDialogElement) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className=" w-full min-h-screen max-lg:min-h-screen*2 flex flex-col bg-backgroundGradient relative">
      <LandingHeader></LandingHeader>
      <div ref={modalRef}>
        <LoginModal
          toggleRegister={() => toggleRegister()}
          registerMode={registerMode}
          language={language}
          toggleModal={toggleModal}
          isOpen={isOpen}
        />
      </div>

      <main className="min-h-screen flex flex-wrap text-textColor justify-center max-lg:gap-36 gap-8 p-[5vw]">
        <div className="flex flex-col lg:flex-row justify-center items-center gap-8 lg:h-1/2 ">
          <h1 className="text-6xl font-bold basis-6/12 z-10">{LandingTexts.title[language]}</h1>
          <div className="basis-6/12  max-lg:opacity-25 max-lg:absolute z-0">
            <img className="h-full opacity-50" src="assets/FrontDecorationDark.svg" alt="" />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center flex-grow gap-8  ">
          <ScrollableDisplay
            className={' basis-6/12 h-full py-12 px-16 font-medium  cursor-pointer z-0'}
            language={language}
          />
          <div className="flex flex-col items-center justify-between basis-6/12 text-center gap-4">
            <button
              className="text-4xl dark:bg-highlightPrimary bg-highlightSecondary py-4 px-20 font-semibold  rounded-2xl shadow-lg shadow-[#00000033] hover:opacity-75"
              onClick={toggleModal}
            >
              {LandingTexts.button[language]}
            </button>
            <p>{LandingTexts.mobile[language]}</p>
            <div className="flex flex-wrap justify-center">
              <img className="" src="assets/apple.svg" alt="" />
              <img className="" src="assets/android.svg" alt="android link" />
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-black w-full min-h-64 text-white/75 p-8 pb-32 flex flex-col items-center border-t-2 border-white/10 gap-4">
        <img src="assets/auoLogo_white.svg" alt="auo logo" />
        <div className="w-full flex flex-wrap max-md:flex-col max-md:gap-8">
          <div className="w-1/2 flex flex-col justify-center items-center max-lg:w-full">
            <p className="text-xl underline p-2">Development Team</p>
            <ul className="list-disc">
              <li>Pásztor Márk</li>
              <li>Kiss Bence</li>
              <li>Gyenes Bálint</li>
            </ul>
          </div>
          <div className="w-1/2 flex flex-col justify-center items-center max-lg:w-full">
            <p className="text-xl underline p-2">Github</p>
            <ul className="text-white underline flex items-center flex-col">
              <li><a href="https://github.com/bnolod/au-o_backend" target="_blank" rel="noopener noreferrer">Backend repository</a></li>
              <li><a href="https://github.com/bnolod/au-o_frontend" target="_blank" rel="noopener noreferrer">Frontend repository</a></li>
              <li><a href="https://github.com/bnolod/au-o_mobil" target="_blank" rel="noopener noreferrer">Mobile repository</a></li>
            </ul>
          </div>
          <div className="w-full flex flex-col justify-center items-center max-lg:w-full">
            <h4 className="text-xl p-2">About</h4>
            <p>2025 Vizsgaremek</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
