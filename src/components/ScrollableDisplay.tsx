import { useState } from "react";
import { LandingTexts } from "../constants/texts";

export default function ScrollableDisplay({
  className,
  language = "EN",
}: {
  className?: string;
  language?: "EN" | "HU";
}) {
  const [firstPage, setFirstPage] = useState<boolean>(true);

  function clickHandler() {
    setFirstPage(!firstPage);
  }

  return (
    <div
      onClick={clickHandler}
      className={
        className +
        " " +
        (firstPage ? "text-left items-start" : "text-right items-end") +
        " flex flex-col justify-between z-0 bg-backdropPrimary/10 w-full rounded-3xl "
      }
    >
      <h3 className="text-4xl w-9/12 drop-shadow-lg">
        {firstPage
          ? LandingTexts.title2[language]
          : LandingTexts.title3[language]}
      </h3>
      <div className="self-center w-full flex justify-center pt-6">
      <div className={"w-2/12 mx-1 h-2 rounded-3xl opacity-75 shadow-md shadow-[#00000033] " + (firstPage ? "bg-highlightPrimary" : "bg-highlightSecondary")}/>
      <div className={"w-2/12 mx-1 h-2 rounded-3xl opacity-75 shadow-md shadow-[#00000033]  " + (!firstPage ? "bg-highlightPrimary" : "bg-highlightSecondary")}/>
      </div>
    </div>
  );
}
