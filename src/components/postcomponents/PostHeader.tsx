import { MdMoreHoriz } from 'react-icons/md';
import { UserPostResponseType } from '../../lib/types';
import Avatar from '@mui/material/Avatar';
import { grey } from '@mui/material/colors';
import { NavLink } from 'react-router';
import { useState } from 'react';
import { Menu, MenuItem } from '@mui/material';

export default function PostHeader({ user }: { user: UserPostResponseType }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = anchorEl ? true : false;
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    console.log('clicked');
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    console.log(anchorEl)
  };

  return (
    <div className="flex basis-2/12 items-center justify-start w-full ">
      <NavLink to={`/profile/${user.id}`} className={'mr-3'}>
        <Avatar sx={{ bgcolor: grey[800], width: 48, height: 48 }} src={user.profileImg}>
          {user.nickname.substring(0, 3).toUpperCase()}
        </Avatar>
      </NavLink>
      <p className="txl flex-1 self-center">{user.nickname}</p>
      <div className="justify-self-end flex justify-center text-xl px-4">
        <button onClick={handleClick}>
          <MdMoreHoriz size={32} />
          <Menu
          id='profleMenu'
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
          </Menu>
        </button>
      </div>
    </div>
  );
}
