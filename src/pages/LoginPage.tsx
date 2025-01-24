import DecoratedSection from "../components/DecoratedSection";
import NavBar from "../components/NavBar";
import { useLanguage } from "../contexts/LanguageContext";
import { AuthTexts } from "../constants/texts";
import { Link } from "react-router";

export default function LoginPage() {
  const { language } = useLanguage();
  return (
    <>
      <DecoratedSection navigation={<NavBar />} innerClassName="justify-center">
        {/* faszom a kódot a kurva anyád aki ezt írta meg a picsába a kódot*/}
        <div className="bg-backdropPrimary basis-full sm:basis-4/12 p-12 rounded-lg font-bold">
          <h1 className="text-5xl text-center p-5">
            {AuthTexts.login.heroText[language]}
          </h1>
          <form action="" className="">
            <div className="py-5">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                {AuthTexts.login.labels.email[language]}
              </label>
              <input
                type="email"
                id="email"
                className=" border rounded-full bg-transparent w-full block p-3"
                placeholder={AuthTexts.login.placeholders.email[language]}
                required
              />
            </div>
            <div className="py-5">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                {AuthTexts.login.labels.password[language]}
              </label>
              <input
                type="password"
                id="password"
                className=" border rounded-full bg-transparent w-full block p-3"
                placeholder={AuthTexts.login.placeholders.password[language]}
                required
              />
            </div>

            <div className="py-5">
            <button className="bg-highlightPrimary rounded-full p-3 w-full font-bold">
              {AuthTexts.login.confirm[language]}
            </button>
            </div>

            <div className="flex justify-between py-5">
              <p>{AuthTexts.login.notRegistered[language]}</p>
              <Link to="/register">
                {AuthTexts.login.confirmTabSwitch[language]}
              </Link>
            </div>
          </form>
        </div>
      </DecoratedSection>
    </>
  );
}
