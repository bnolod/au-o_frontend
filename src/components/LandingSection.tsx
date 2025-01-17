import { ReactNode } from "react";

interface LandingSectionProps {
    className?: string,
    children?: ReactNode,
}

export default function LandingSection(props:LandingSectionProps) {
    return <div>
    {props.children}
    </div>
}