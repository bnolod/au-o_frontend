import { ReactNode } from "react";

export default function Card({children}:{children?:ReactNode}) {
  return (
    <div className="bg-background rounded-xl flex flex-col p-3">
        {children}
    </div>
  );
}
