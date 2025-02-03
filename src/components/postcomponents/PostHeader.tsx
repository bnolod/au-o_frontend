import { MdMoreHoriz } from "react-icons/md";
import ProfileImage from "../ProfileImage";

export default function PostHeader() {
  return (
    <div className="flex basis-2/12 items-center justify-start w-full p-3">
      <ProfileImage />
      <div className="flex flex-col flex-grow justify-center items-start ml-2">
        <h1 className="font-bold">Nev</h1>
        <p className="text-xs">@petykes</p>
      </div>
      <div className="justify-self-end flex justify-center text-xl"><MdMoreHoriz/></div>
    </div>
  );
}
