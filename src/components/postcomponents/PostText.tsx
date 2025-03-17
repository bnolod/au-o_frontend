import { useEffect, useState } from "react";
import { User } from "../../lib/entity/User";
import { NavLink } from "react-router";

export default function PostText({ text, user }: { text: string, user:User }) {
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
    <div className="p-4 pt-0 bg-background">
      <p><NavLink to={`/profile/${user.id}`} className="font-bold">@{user.username} </NavLink>{displayedText}</p>
      {!isTextOpen && isLongText ? <p className="underline" onClick={handleOpenText}>Több...</p> : ""}
    </div>
  );
}
