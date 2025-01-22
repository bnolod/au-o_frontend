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
}

export default function DecoratedSection(props: SectionProps) {

  const topDecoration = <img src="assets/PageDivider_bottom.svg" className="h-16 w-full"/>;
  const bottomDecoration = <img src="assets/PageDivider_top.svg" className="h-16 w-full"/>;

  return (
    <ScreenHeightPage className={props.className + " text-textColor bg-background"}>
        {props.navigation ? props.navigation : topDecoration}
      <section className={(props.innerClassName + " flex flex-grow flex-col w-11/12 mx-auto items-center lg:flex-row overflow-hidden ")}>
        {props.children}
      </section>
        {bottomDecoration}
    </ScreenHeightPage>
  );
}
