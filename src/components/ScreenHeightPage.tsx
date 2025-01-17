import { ReactNode } from "react";

interface ScreenHProps {
    children?: ReactNode;
    className?: string;
}

export default function ScreenHeightPage(props:ScreenHProps) {
    return  <div className={props.className + " min-h-screen"}>
    {props.children}
    </div>
}