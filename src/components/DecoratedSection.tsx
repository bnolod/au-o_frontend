//
// screenheightpage
// optional navbar
//  div (comtainer)
//  topsvg
//  {children} REactNode
//  bottomsvg
//  /div
// /screenheightpage
//
//

import { ReactElement, ReactNode } from "react";
import ScreenHeightPage from "./ScreenHeightPage";

interface SectionProps {
  className?: string;
  innerClassName?: string;
  children?: ReactNode;
  navigation?: ReactElement;
  futyis: boolean;
}

export default function DecoratedSection(props: SectionProps) {
  return (
    <ScreenHeightPage className={props.className}>
      {props.navigation}
      <div className={(props.innerClassName)+ " " + (props.futyis ? "bg-pink-500" : "bg-blue-500")}>
        <img />
        {props.children}
        <img />
      </div>
    </ScreenHeightPage>
  );
}
