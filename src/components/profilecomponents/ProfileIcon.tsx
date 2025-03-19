import { Avatar } from "@mui/material";
import { grey } from "@mui/material/colors";
import { NavLink } from "react-router";
import { User } from "../../lib/entity/User";

export default function ProfileIcon({user}:{user:User}) {
    return <NavLink to={`/profile/${user.id}`} className={'mr-3 gap-3 flex flex-row items-center w-full'}>
      <Avatar sx={{ bgcolor: grey[800], width: 48, height: 48 }} src={user.profileImg}>
        {user.nickname.substring(0, 3).toUpperCase()}
      </Avatar>
      <p className="txl flex-1 self-center">{user.nickname}</p>
    </NavLink>;
  }