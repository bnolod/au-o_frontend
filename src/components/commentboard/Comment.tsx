import { ReactNode } from "react";
import ProfileImage from "../ProfileImage";

export default function Comment({ replies }: { replies?: boolean }) {
  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-start">
        <div className="flex flex-col">
          <ProfileImage></ProfileImage>
        </div>
        <div className="flex flex-col flex-grow">
          <h1 className="font-bold">Nev</h1>
          <p className="text-xs">@petykes</p>
        </div>
        <p className="text-xs justify-self-end">2001.09.11</p>
      </div>
      <div className="bg-cyan-50 h-full w-1 self-center"></div>
      {replies ? (
        <div className="flex flex-row">
          <div className="w-12 flex-grow flex justify-center"><div className="w-1 bg-backdropSecondary h-full rounded-b"></div></div>
          <Comment></Comment>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
