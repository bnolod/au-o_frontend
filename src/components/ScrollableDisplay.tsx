import { useState } from "react";
import { LandingTexts } from "../constants/texts";

export default function ScrollableDisplay({
  className,
  language = "EN",
}: {
  className?: string;
  language?: "EN" | "HU";
}) 
{
    const [firstPage,setFirstPage] = useState<boolean>(true);
    
    function clickHandler(){
        setFirstPage(!firstPage);
    }
 
    return (
    <div
        onClick={clickHandler}
      className={className+ " " + (firstPage ? "text-left" : "text-right") + " flex flex-col justify-between bg-backdropPrimary/10 w-full rounded-2xl"}
    >
      <h3 className="text-4xl">{firstPage ? LandingTexts.title2[language] : LandingTexts.title3[language]}</h3>
        <hr />
    </div>
  );
}
