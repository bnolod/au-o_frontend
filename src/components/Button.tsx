import { ReactNode } from "react";

export default function Button({
  onClick,
  className,
  secondary = false,
  children
}: {
  onClick?: () => void;
  className?: string;
  secondary?: boolean;
  children?: ReactNode
}) {
  const VarPrimary =
    "p-3 bg-highlightPrimary rounded-xl text-center text-white";
  const VarSecondary =
    "p-3 bg-highlightSecondary rounded-xl";
  return (
    
    <button
      onClick={onClick}
      className={
        secondary ? VarSecondary : VarPrimary + " " + className
      }
    >
      {children}
    </button>
  );
}
//hello gonba vagyok a gonba 