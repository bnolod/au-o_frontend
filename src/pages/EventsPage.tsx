import { TbCalendarTime } from "react-icons/tb";
import { EventTexts } from "../constants/texts";
import { useLanguage } from "../contexts/LanguageContext";


export default function EventsPage(){
    const {language} = useLanguage();
    return (
        <div className="flex flex-col items-center min-h-96 justify-center gap-6 bg-background/50 rounded-3xl cardshadow">
            <TbCalendarTime className="text-8xl text-highlightSecondary"/>
            <h2 className="text-2xl">{EventTexts.notAvailable[language]}</h2>
            <p className="text-xl text-highlightPrimary">{EventTexts.staytuned[language]}</p>
        </div>
    )
}