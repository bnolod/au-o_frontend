import LoginModal from "../components/LoginModal";
import LandingHeader from "../components/LandingHeader";
import ScrollableDisplay from "../components/ScrollableDisplay";
import { LandingTexts } from "../constants/texts";
import { useLanguage } from "../contexts/LanguageContext";
import { useEffect, useRef, useState } from "react";

export default function LandingPage() {
  const { language } = useLanguage();

  const [registerMode, setRegisterMode] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  const toggleRegister = () =>{
    
  
    setRegisterMode(!registerMode);
  }

  // click outside modal (:c)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (event.target instanceof HTMLDialogElement) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="sm:max-h-screen sm:h-screen w-full flex flex-col bg-backgroundGradient overflow-hidden">
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

      <main className="flex flex-col text-textColor justify-center gap-8 h-full p-[5vw]">
        <div className="flex flex-col lg:flex-row justify-center items-center gap-8 lg:h-1/2 ">
          <h1 className="text-6xl font-bold basis-6/12">
            {LandingTexts.title[language]}
          </h1>
          <div className="basis-6/12 p-32">
            <img className="h-full" src="assets/FrontDecoration.svg" alt="" />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center flex-grow gap-8  ">
          <ScrollableDisplay
            className={" basis-6/12 h-full py-12 px-16 font-medium  cursor-pointer z-0"}
            language={language}
          />
          <div className="flex flex-col items-center justify-between basis-6/12 text-center gap-4">
            <button
              className="text-4xl dark:bg-highlightPrimary bg-highlightSecondary py-4 px-20 font-semibold  rounded-2xl shadow-lg shadow-[#00000033]"
              onClick={toggleModal}
            >
              {LandingTexts.button[language]}
            </button>
            <p>{LandingTexts.mobile[language]}</p>
            <div className="flex justify-between">
              <img className="" src="assets/apple.svg" alt="" />
              <img
                className=""
                src="assets/android.svg"
                alt="android link"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
