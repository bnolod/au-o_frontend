import { ReactNode } from "react";

export default function Card({children, className}:{children?:ReactNode, className?:string}) {
  return (
    <div className={"bg-background rounded-xl flex flex-col p-3 " + className}>
        {children}
    </div>
  );
}
