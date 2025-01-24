import LandingHeader from "../components/LandingHeader";
import { LandingTexts } from "../constants/texts";
import { useLanguage } from "../contexts/LanguageContext";

export default function LandingPage() {
  const {language} = useLanguage();

  return (
    <div className="h-screen bg-backgroundGradient">
      <LandingHeader></LandingHeader>
      <main className="flex flex-col">
        <div className="flex">
          <h1 className="text-7xl">
            {LandingTexts.title[language]}
          </h1>
          <img
            className="basis-full sm:basis-2/3 "
            src="assets/FrontDecoration.svg"
            alt=""
          />
        </div>
        <div className="flex">
          <div className="bg-amber-500 basis-1/2">
            {/*TODO: scrollableDisplay*/}a
          </div>
          <div className="flex flex-col">
            
          </div>
        </div>
      </main>
    </div>
  );
}
