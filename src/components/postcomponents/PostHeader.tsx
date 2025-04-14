import { MdBookmark, MdDelete, MdMoreHoriz } from 'react-icons/md';
import { UserPostResponseType } from '../../lib/types';
import Avatar from '@mui/material/Avatar';
import { grey } from '@mui/material/colors';
import { NavLink } from 'react-router';
import { useState } from 'react';
import { ListItemIcon, ListItemText, Menu, MenuItem, MenuList } from '@mui/material';
import { deletePost, favoritePost } from '../../lib/ApiCalls/PostApiCalls';
import { Post } from '../../lib/entity/Post';
import { useAuthentication } from '../../contexts/AuthenticationContext';
import { useSnackbar } from '../../contexts/SnackbarContext';

export default function PostHeader({
  user,
  postId,
  favorite,
  post,
  groupView,
  loadPosts,
  isAuthorized
}: {
  user: UserPostResponseType;
  postId: number;
  favorite: boolean;
  post: Post;
  groupView?:boolean;
  loadPosts: () => void;
  isAuthorized?: boolean;
}) {
  const {showSnackbar} = useSnackbar();
  const { user: AuthUser } = useAuthentication();
  const [isFavorite, setIsFavorite] = useState<boolean>(favorite);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = anchorEl != null ? true : false;
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    console.log('clicked');
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  async function handleDelete(postId:number) {
    if (await deletePost(postId)) {
      showSnackbar('Post deleted', 'success');
      loadPosts();
    }

  }

  return (
    <div className=" py-3 px-3 bg-backdropPrimary hover:opacity-50 transition-opacity flex basis-2/12 items-center justify-start w-full">
      {post && post.group != null && groupView != true ? (
        <NavLink to={`/groups/${post.group.id}`} className={'mr-3 gap-3 flex flex-row items-center w-full'}>
          <img src={post.group.bannerImage} className='h-14 w-14 rounded-xl'>
            {/* {user.nickname.substring(0, 3).toUpperCase()} */}
          </img>
          <div className='flex flex-col flex-1'>
          <p className='txl flex-1'>{post.group.name}
            <span className='text-base text-textColor/50 pl-2'>{post.group.alias}</span>
          </p>
          <p className=" text-textColor/50 flex-1">{user.nickname}</p>
          </div>
        </NavLink>
      ) : (
        <NavLink to={`/profile/${user.id}`} className={'mr-3 gap-3 flex flex-row items-center w-full'}>
          <Avatar sx={{ bgcolor: grey[800], width: 48, height: 48 }} src={user.profileImg}>
            {user.nickname.substring(0, 3).toUpperCase()}
          </Avatar>
          <p className="txl flex-1 self-center">{user.nickname}</p>
        </NavLink>
      )}

      <div className="justify-self-end flex justify-center text-xl px-4">
        <button onClick={handleClick}>
          <MdMoreHoriz size={32} />
        </button>
        <Menu id="profleMenu" anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuList>
            <MenuItem
              onClick={async () => {
                handleClose();
                await favoritePost(postId);
                setIsFavorite((prev) => !prev);
              }}
              className="bg-background"
            >
              <ListItemIcon>
                <MdBookmark className={`text-3xl ${isFavorite ? 'text-highlightPrimary ' : ''}`} />
              </ListItemIcon>
              <ListItemText>{isFavorite ? 'Unfavorite' : 'Favorite'}</ListItemText>
            </MenuItem>
              {
                (user.id === AuthUser?.id) || isAuthorized && (
                  <MenuItem onClick={()=>{handleDelete(postId)}} className="bg-background">
                  <ListItemIcon>
                    <MdDelete className={`text-3xl`} />
                  </ListItemIcon>
                  <ListItemText>Delete</ListItemText>
                  </MenuItem>
                )
              }
          </MenuList>
        </Menu>
      </div>
    </div>
  );
}
