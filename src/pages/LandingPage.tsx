import LandingHeader from "../components/LandingHeader";
import ScrollableDisplay from "../components/ScrollableDisplay";
import { LandingTexts } from "../constants/texts";
import { useLanguage } from "../contexts/LanguageContext";

export default function LandingPage() {
  const { language } = useLanguage();

  return (
    <div className="sm:max-h-screen sm:h-screen bg-backgroundGradient overflow-hidden">
      <LandingHeader></LandingHeader>
      <main className="flex flex-col text-textColor h-full p-16">
        <div className="flex flex-col lg:flex-row justify-center items-center lg:h-1/2">
          <h1 className="text-7xl basis-5/12">{LandingTexts.title[language]}</h1>
          <img className="h-full" src="assets/FrontDecoration.svg" alt="" />
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-center flex-grow  ">
          <ScrollableDisplay className="basis-5/12 p-5" language={language} />
          <div className="flex flex-col items-center basis-5/1 text-center p-5">
            <button className="text-4xl dark:bg-highlightPrimary bg-highlightSecondary p-4 rounded-lg w-4/6">
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
