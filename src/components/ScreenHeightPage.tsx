import { Children, ReactNode } from "react";

interface ScreenHProps {
    mobileScreenExtendHeight: boolean;
    children?: ReactNode;
    className?: string;
}

export default function ScreenHeightPage(props:ScreenHProps) {
    return  <div className={props.className}>
    {props.children}
    </div>
}