import { MdBookmark, MdMoreHoriz } from 'react-icons/md';
import { UserPostResponseType } from '../../lib/types';
import Avatar from '@mui/material/Avatar';
import { grey } from '@mui/material/colors';
import { NavLink } from 'react-router';
import { useState } from 'react';
import { ListItemIcon, ListItemText, Menu, MenuItem, MenuList } from '@mui/material';
import { favoritePost } from '../../lib/ApiCalls/PostApiCalls';

export default function PostHeader({ user, postId }: { user: UserPostResponseType, postId: number }) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = anchorEl != null ? true : false;
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    console.log('clicked');
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <div className=" py-3 px-3 bg-backdropPrimary hover:opacity-50 transition-opacity flex basis-2/12 items-center justify-start w-full">
      <NavLink to={`/profile/${user.id}`} className={'mr-3 gap-3 flex flex-row items-center w-full'}>
        <Avatar sx={{ bgcolor: grey[800], width: 48, height: 48 }} src={user.profileImg}>
          {user.nickname.substring(0, 3).toUpperCase()}
        </Avatar>
      <p className="txl flex-1 self-center">{user.nickname}</p>
      </NavLink>
      <div className="justify-self-end flex justify-center text-xl px-4">
        <button onClick={handleClick}>
          <MdMoreHoriz size={32} />
        </button>
        <Menu id="profleMenu" anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuList>
            <MenuItem onClick={async()=>{handleClose(); await favoritePost(postId)}} className="bg-background">
              <ListItemIcon>
                <MdBookmark className="text-3xl" />
              </ListItemIcon>
              <ListItemText>Mentés</ListItemText>
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
}
