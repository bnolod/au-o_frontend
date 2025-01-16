import Header from "./Header";
import { useLanguage } from "../contexts/LanguageContext";
import { LandingTexts } from "../constants/texts";
export default function Landing(){

    const {language} = useLanguage();
    return (
        <main>
            <Header language={language}/>
            <div className=" flex flex-col w-11/12 mx-auto justify-between items-center lg:flex-row overflow-hidden">

            
            <section className="basis-full sm:basis-4/12" >
                <h1 className="text-7xl text-center lg:text-left">{LandingTexts.title[language]}</h1>
                <hr className="my-10"/>
                <button className="bg-highlight rounded w-full h-10 text-white">{LandingTexts.button[language]}</button>
                <p className="mt-10 text-center">{LandingTexts.mobile[language]}</p>
                <div className="flex w-full flex-1 justify-center items-center">
                <img className="lg:w-1/2 w-3/12" src="assets/apple.svg" alt="" />
                <img className="lg:w-1/2 w-3/12" src="assets/android.svg" alt="" />
                </div>
            </section>


             <section className="sm:basis-7/12 basis-full  flex items-center justify-center"> 
                <img className="basis-full sm:basis-2/3 " src="assets/FrontDecoration.svg" alt="" />
            </section>


            </div>
        </main>
    )
}