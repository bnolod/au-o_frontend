import { Link, NavLink } from 'react-router';
import { useEffect, useState } from 'react';
import { useAuthentication } from '../contexts/AuthenticationContext';
import Avatar from '@mui/material/Avatar';
import { grey } from '@mui/material/colors';
import {
  Drawer,
  Icon,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Switch,
} from '@mui/material';
import { BiLogOut } from 'react-icons/bi';
import { logout } from '../lib/apiClient';
import { PiPlus } from 'react-icons/pi';
import { MdMessage, MdOutlineComment, MdOutlineMessage } from 'react-icons/md';

export default function Header() {
  const { user } = useAuthentication();
  const [isDark, setIsDark] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');

    if (mq.matches) {
      setIsDark(true);
    }

    // This callback will fire if the perferred color scheme changes without a reload
    mq.addEventListener('change', (evt) => setIsDark(evt.matches));
  }, []);

  return (
    <header className="fixed backdrop-blur-xl w-full p-3 z-50 text-lg">
      <nav className="max-w-screen flex flex-wrap items-center justify-between">
        <div className=" justify-start hidden md:flex">
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={isDark ? '/assets/auoLogo_white.svg' : '/assets/auoLogo_black.svg'} className="" alt="AUO logo" />
          </Link>
        </div>
        <div className="flex items-center justify-center rounded-xl justify-self-center">
          <NavLink to={"/"} className={({isActive}) => `p-3 ${isActive && "text-highlightPrimary font-bold"} cursor-pointer hover:opacity-50 transition-all`}>Home</NavLink>
          <NavLink to={"/groups"} className={({isActive}) => `p-3 ${isActive && "text-highlightPrimary font-bold"} cursor-pointer hover:opacity-50 transition-all`}>Groups</NavLink>
          <NavLink to={"/events"} className={({isActive}) => `p-3 ${isActive && "text-highlightPrimary font-bold"} cursor-pointer hover:opacity-50 transition-all`}>Events</NavLink>
          
        </div>
        <div className="flex justify-end gap-1 items-center">
          
        
        <NavLink to={"/messages"} className={({isActive}) => `p-3 ${isActive && "text-highlightPrimary font-bold"} cursor-pointer hover:opacity-50 transition-all`}>
        <MdOutlineComment size={32}/>
        </NavLink>

          <button className='flex flex-row items-center gap-2 transition-all px-4 py-2'
            onClick={() => {
              setDrawerOpen(!isDrawerOpen);
            }}
          >
            
            <Avatar sx={{ bgcolor: grey[800], width:48, height:48 }} src={user?.profileImg} className='hover:opacity-50 transition-all'>
              {user?.nickname.substring(0, 3).toUpperCase()}
            </Avatar>
          </button>
          <Drawer
            className="text-textColor"
            open={isDrawerOpen}
            anchor="right"
            onClose={() => {
              setDrawerOpen(false);
            }}
          >
            <List className="flex flex-col sm:min-w-64 h-full justify-start bg-backdropSecondary gap-2 text-textColor">
              <ListItem className="">
                <NavLink
                  to={'/profile'}
                  className={'w-full flex flex-row items-center bg-backdropPrimary p-2 rounded-xl shadow-md shadow-[#00000022] hover:opacity-50 transition-all'}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: grey[800] }} src={user?.profileImg}>
                      {user?.nickname.substring(0, 3).toUpperCase()}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText  primary={user?.nickname} />
                </NavLink>
              </ListItem>

              <ListItem>
                <NavLink
                  to={'/post'}
                  className={
                   'w-9/12 flex flex-row items-center bg-backdropPrimary p-2 rounded-xl shadow-md shadow-[#00000022] hover:opacity-50 transition-all text-left'
                  }
                >
                  <ListItemIcon>
                    <PiPlus className='ml-2'></PiPlus>
                  </ListItemIcon>
                  <ListItemText primary="New post"></ListItemText>
                </NavLink>
              </ListItem>

              <ListItem>
                <button className={'w-9/12 flex flex-row items-center bg-backdropPrimary p-2 rounded-xl shadow-md shadow-[#00000022] hover:opacity-50 transition-all text-left'}
                  onClick={() => {
                    logout();
                  }}
                >
                  <ListItemIcon>
                    <BiLogOut className='ml-2'></BiLogOut>
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </button>
              </ListItem>

              <ListItem className="">
                <ListItemText>Dark mode</ListItemText>
                <Switch
                  edge="end"
                  onChange={() => {
                    document.getElementById('root')!.classList.toggle('dark');
                  }}
                  checked={document.getElementById('root')?.classList.contains('dark')}
                ></Switch>
              </ListItem>
            </List>
          </Drawer>
        </div>
      </nav>
    </header>
  );
}
