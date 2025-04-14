import { ReactNode } from "react";

export default function Card({children, className}:{children?:ReactNode, className?:string}) {
  return (
    <div className={"bg-background rounded-2xl flex flex-col p-3 shadow-md shadow-[#00000066]" + className}>
        {children}
    </div>
  );
}
