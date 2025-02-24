import { Avatar } from "@mui/material";
import Header from "../components/Header";
import { useAuthentication } from "../contexts/AuthenticationContext";
import { MdBackupTable, MdBookmark, MdCarCrash, MdCarRepair, MdGroups, MdMoreHoriz } from "react-icons/md";
import PostDisplay from "../components/profilecomponents/PostDisplay";

export default function ProfilePage() {
  const { user } = useAuthentication();

  return (
    <>
      <div className="bg-background rounded-xl my-2 flex flex-col p-3 gap-3">
        <MdMoreHoriz className="text-2xl self-end" />
        <div className="flex justify-start items-center w-full gap-3">
          <Avatar src={user?.profileImg} sx={{ height: 76, width: 76 }}>
            {user?.nickname.substring(0, 3).toUpperCase()}
          </Avatar>
          <div className="flex-grow">
            <h3 className="text-4xl">{user?.username}</h3>
            <p className="text-sm">@{user?.nickname}</p>
          </div>
          <div className="justify-self-end text-right">
            <p>{8} Followers</p>
            <p>{1111} Following</p>
          </div>
        </div>
        <div className="flex text-3xl bg-backdropSecondary rounded-xl p-2 justify-center divide-x-2">
          <button className="flex-grow flex justify-center"><MdBackupTable/></button>
          <button className="flex-grow flex justify-center"><MdGroups/></button>
          <button className="flex-grow flex justify-center"><MdBookmark/></button>
          <button className="flex-grow flex justify-center"><MdCarRepair/></button>
        </div>
      </div>
      <PostDisplay/>
    
    </>
  );
}
