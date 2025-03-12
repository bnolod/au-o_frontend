import { MdMoreHoriz } from 'react-icons/md';
import { UserPostResponseType } from '../../lib/types';
import Avatar from '@mui/material/Avatar';
import { grey } from '@mui/material/colors';
import { NavLink } from 'react-router';

export default function PostHeader({ user }: { user: UserPostResponseType }) {
  return (
    <div className="flex basis-2/12 items-center justify-start w-full ">
      <NavLink to={`/profile/${user.id}`} className={'mr-3'}>
        <Avatar sx={{ bgcolor: grey[800], width: 48, height: 48 }} src={user.profileImg}>
          {user.nickname.substring(0, 3).toUpperCase()}
        </Avatar>
      </NavLink>
      <p className="txl flex-1 self-center">{user.nickname}</p>
      <div className="justify-self-end flex justify-center text-xl px-4">
        <MdMoreHoriz size={32} />
      </div>
    </div>
  );
}
