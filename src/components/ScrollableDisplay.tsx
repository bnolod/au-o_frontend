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
        " flex flex-col justify-between bg-backdropPrimary/10 w-full rounded-2xl"
      }
    >
      <h3 className="text-4xl w-9/12">
        {firstPage
          ? LandingTexts.title2[language]
          : LandingTexts.title3[language]}
      </h3>
      <div className="self-center w-full flex justify-center pt-6">
      <hr className={"w-2/12 mx-1 " + (firstPage ? "border-highlightPrimary" : "border-highlightSecondary")}/>
      <hr className={"w-2/12 mx-1 " + (!firstPage ? "border-highlightPrimary" : "border-highlightSecondary")}/>
      </div>
    </div>
  );
}
