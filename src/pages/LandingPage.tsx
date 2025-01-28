import LandingHeader from "../components/LandingHeader";
import ScrollableDisplay from "../components/ScrollableDisplay";
import { LandingTexts } from "../constants/texts";
import { useLanguage } from "../contexts/LanguageContext";

export default function LandingPage() {
  const {language} = useLanguage();

  return (
    <div className="sm:max-h-screen sm:h-screen bg-backgroundGradient overflow-hidden">
      <LandingHeader></LandingHeader>
      <main className="flex flex-col text-textColor h-full p-16">
        <div className="flex flex-col lg:flex-row justify-center items-center lg:h-1/2">
          <h1 className="text-7xl">
            {LandingTexts.title[language]}
          </h1>
          <img
            className="h-full"
            src="assets/FrontDecoration.svg"
            alt=""
          />
        </div>
        <div className="flex flex-col lg:flex-row justify-center items-center flex-grow  ">
          <ScrollableDisplay className="basis-5/12" language={language}/>
          <div className="flex flex-col flex-grow basis-5/12 text-center bg-backdropPrimary/20">
            hello
          </div>
        </div>
      </main>
    </div>
  );
}
