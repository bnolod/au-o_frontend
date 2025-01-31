import LoginModal from "../components/LoginModal";
import LandingHeader from "../components/LandingHeader";
import ScrollableDisplay from "../components/ScrollableDisplay";
import { LandingTexts } from "../constants/texts";
import { useLanguage } from "../contexts/LanguageContext";

export default function LandingPage() {
  const { language } = useLanguage();

  return (
    <div className="sm:max-h-screen sm:h-screen bg-backgroundGradient overflow-hidden">
      <LandingHeader></LandingHeader>
      <LoginModal language={language} />
      <main className="flex flex-col text-textColor h-full p-24">
        <div className="flex flex-col lg:flex-row justify-center items-center lg:h-1/2 ">
          <h1 className="text-6xl font-bold basis-6/12">
            {LandingTexts.title[language]}
          </h1>
          <div className="basis-6/12">
            <img className="h-full" src="assets/FrontDecoration.svg" alt="" />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center flex-grow   ">
          <ScrollableDisplay className="basis-6/12 h-full p-6 font-medium" language={language} />
          <div className="flex flex-col items-center basis-6/12 text-center">
            <button className="text-4xl dark:bg-highlightPrimary bg-highlightSecondary py-4 px-20 font-semibold  rounded-lg ">
              {LandingTexts.button[language]}
            </button>
            <p>{LandingTexts.mobile[language]}</p>
            <div className="flex">
              <img className="w-1/2" src="assets/apple.svg" alt="" />
              <img
                className="w-1/2"
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
