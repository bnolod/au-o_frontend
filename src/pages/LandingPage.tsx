import NavBar from "../components/NavBar";
import { useLanguage } from "../contexts/LanguageContext";
import { LandingTexts } from "../constants/texts";
import DecoratedSection from "../components/DecoratedSection";
import Button from "../components/Button";
export default function LandingPage() {
  const { language } = useLanguage();

  return (
    <>
      <DecoratedSection
        innerClassName="justify-between"
        className="bg-background "
        navigation={<NavBar />}
      >
        <div className="basis-full sm:basis-4/12 flex flex-col p-12">
          <h1 className="text-7xl text-center lg:text-left">
            {LandingTexts.title[language]}
          </h1>
          <hr className="mt-10" />
          <Button text={LandingTexts.button[language]} variant="primary" />
          <p className=" text-center">{LandingTexts.mobile[language]}</p>
          <div className="flex w-full flex-1 justify-center items-center">
            <img className="lg:w-1/2 w-3/12" src="assets/apple.svg" alt="" />
            <img className="lg:w-1/2 w-3/12" src="assets/android.svg" alt="" />
          </div>
        </div>

        <div className="sm:basis-7/12 basis-full  flex items-center p-12 justify-center">
          <img
            className="basis-full sm:basis-2/3 "
            src="assets/FrontDecoration.svg"
            alt=""
          />
        </div>
      </DecoratedSection>
      <DecoratedSection
        innerClassName="justify-between"
        className=""
        disableBottomDecoration={true}
      >
        <div className="sm:basis-7/12 basis-full flex items-center p-12 justify-center">
          <img
            className="basis-full sm:basis-2/3"
            src="assets/FrontDecoration2.svg"
            alt=""
          />
        </div>
        <div className="basis-full sm:basis-4/12  flex flex-col p-12">
          <img
            src="assets/auoLogo_black.svg"
            alt="auo_logo"
            className="my-10 justify-self-end max-h-32"
          />
          <h1 className="text-7xl text-center lg:text-right">
            {LandingTexts.title2[language]}
          </h1>
          <hr className="mt-10" />
          <Button text={LandingTexts.button2[language]} variant="secondary" />
        </div>
      </DecoratedSection>
      <DecoratedSection
        innerClassName="justify-center"
        className="bg-[url('assets/FrontDecoration3.svg')] bg-contain bg-center bg-no-repeat"
        disableTopDecoration={true}
      >
          <div className="flex flex-col items-center bg-gray-500 rounded-3xl bg-opacity-25 basis-6/12 p-16  ">
            <img
              src="assets/auoLogo_black.svg"
              alt=""
              className="w-7/12 text-textColor"
            />

            <h1 className="text-7xl">{LandingTexts.title3[language]}</h1>
          </div>
        
      </DecoratedSection>
    </>
  );
}
