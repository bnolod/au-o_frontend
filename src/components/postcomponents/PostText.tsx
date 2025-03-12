import { useEffect, useState } from "react";

export default function PostText({ text,username }: { text: string, username:string }) {
  const [displayedText, setDisplayedText] = useState<string>(text);
  const [isTextOpen, setIsTextOpen] = useState<boolean>(false);
  const isLongText = text.length > 200;

  useEffect(() => {
    if (displayedText.length > 200) {
      setDisplayedText(
        text.slice(0, 200) + "..."
      );
      setIsTextOpen(false);
    }
  }, []);

  function handleOpenText() {
    setDisplayedText(text);
    setIsTextOpen(true);
  }

  return (
    <div className="p-4 pt-0">
      <p><span className="font-bold">@{username} </span>{displayedText}</p>
      {!isTextOpen && isLongText ? <p className="underline" onClick={handleOpenText}>Több...</p> : ""}
    </div>
  );
}
