import { ReactNode } from "react";

interface LandingSectionProps {
    className?: String,
    children?: ReactNode,
}

export default function LandingSection(props:LandingSectionProps) {
    return <div>
    {props.children}
    </div>
}