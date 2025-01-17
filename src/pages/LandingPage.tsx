import NavBar from  "../components/NavBar";
import { useLanguage } from "../contexts/LanguageContext";
import { LandingTexts } from "../constants/texts";
import ScreenHeightPage from "../components/ScreenHeightPage";
export default function LandingPage() {
  const { language } = useLanguage();
  return (
    <main className="bg-background">
      <ScreenHeightPage className="flex flex-col">
        {/*elso oldal*/}
        <NavBar language={language} />
        <section className=" flex flex-grow flex-col w-11/12 mx-auto justify-between items-center lg:flex-row overflow-hidden">
          <div className="basis-full sm:basis-4/12">
            <h1 className="text-7xl text-center lg:text-left">
              {LandingTexts.title[language]}
            </h1>
            <hr className="my-10" />
            <button className="bg-highlight rounded w-full h-10 text-white">
              {LandingTexts.button[language]}
            </button>
            <p className="mt-10 text-center">{LandingTexts.mobile[language]}</p>
            <div className="flex w-full flex-1 justify-center items-center">
              <img className="lg:w-1/2 w-3/12" src="assets/apple.svg" alt="" />
              <img
                className="lg:w-1/2 w-3/12"
                src="assets/android.svg"
                alt=""
              />
            </div>
          </div>

          <div className="sm:basis-7/12 basis-full  flex items-center justify-center">
            <img
              className="basis-full sm:basis-2/3 "
              src="assets/FrontDecoration.svg"
              alt=""
            />
          </div>
        </section>
          <img src="assets/PageDivider_top.svg" alt="" className="h-16" />

      </ScreenHeightPage>





      <section className=" flex flex-col-reverse w-11/12 mx-auto justify-between items-center lg:flex-row overflow-hidden">
        <div className="sm:basis-7/12 basis-full  flex items-center justify-center">
          <img
            className="basis-full sm:basis-2/3 "
            src="assets/FrontDecoration2.svg"
            alt=""
          />
        </div>
        <div className="basis-full sm:basis-4/12">
          <img
            src="assets/auoLogo_black.svg"
            alt="auo_logo"
            className="my-10"
          />
          <h1 className="text-7xl text-center lg:text-right">
            {LandingTexts.title2[language]}
          </h1>
          <hr className="my-10" />
          <button className="bg-white outline outline-highlight rounded w-full h-10 text-black">
            {LandingTexts.button2[language]}
          </button>
        </div>
      </section>
    </main>
  );
}
