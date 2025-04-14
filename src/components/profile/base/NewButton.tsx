import { ReactNode } from "react";
import Button from "../../Button";

export default function NewButton({onClick, icon, label}: {onClick?: () => void, icon?: ReactNode, label?: string}) {

   return (
        <>
        <Button onClick={onClick} className="button w-full bg-highlightSecondary flex flex-col items-center gap-2"  >
            {icon}
            {label}
        </Button>
        </>
    )
}
