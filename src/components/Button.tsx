export default function Button({
  text,
  onClick,
  className,
  variant,
}: {
  text: string;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary";
}) {
    //TODO: Nem
  const VarPrimary =
    "dark:bg-black bg-highlight rounded m-10 text-center h-10 text-white";
  const VarSecondary =
    "bg-transparent outline outline-highlight rounded  h-10 text-black m-10";
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
