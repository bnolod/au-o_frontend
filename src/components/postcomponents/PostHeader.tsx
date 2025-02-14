import { MdMoreHoriz } from "react-icons/md";
import ProfileImage from "../ProfileImage";
import { UserPostResponseType } from "../../lib/types";

export default function PostHeader({user}: {user: UserPostResponseType}
) {
  return (
    <div className="flex basis-2/12 items-center justify-start w-full p-3">
      <ProfileImage src={user.profileImg}/>
      <div className="flex flex-col flex-grow justify-center items-start ml-2">
        <h1 className="font-bold">{user.username}</h1>
        <p className="text-xs">{user.nickname}</p>
      </div>
      <div className="justify-self-end flex justify-center text-xl"><MdMoreHoriz/></div>
    </div>
  );
}
