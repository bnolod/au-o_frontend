import { redirect } from "react-router";

export default function Button({
  text,
  onClick,
  className,
  variant,
}: {
  text: string;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "";
}) {
    //TODO: Nem
  const VarPrimary =
    "bg-highlightPrimary rounded m-10 text-center h-10 text-white";
  const VarSecondary =
    "bg-transparent outline outline-highlightPrimary text-highlightPrimary rounded h-10 text-black m-10";
  return (
    
    <button
      onClick={onClick}
      className={
        variant == "primary" ? VarPrimary : VarSecondary + " " + className
      }
    >
      {text}
    </button>
  );
}
//hello gonba vagyok a gonba 