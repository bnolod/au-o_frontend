import { Link, NavLink } from "react-router";
import { useEffect, useState } from "react";
import { useAuthentication } from "../contexts/AuthenticationContext";
import Avatar from "@mui/material/Avatar";
import { grey } from "@mui/material/colors";
import {
  Drawer,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
} from "@mui/material";
import { BiLogOut } from "react-icons/bi";
import { logout } from "../lib/apiClient";

export default function Header() {
  const { user } = useAuthentication();
  const [isDark, setIsDark] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");

    if (mq.matches) {
      setIsDark(true);
    }

    // This callback will fire if the perferred color scheme changes without a reload
    mq.addEventListener("change", (evt) => setIsDark(evt.matches));
  }, []);

  return (
    <header className="fixed backdrop-blur-xl w-full p-3 z-50">
      <nav className="max-w-screen flex flex-wrap items-center justify-between">
        <div className=" flex justify-start">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src={
                isDark
                  ? "/assets/auoLogo_white.svg"
                  : "/assets/auoLogo_black.svg"
              }
              className=""
              alt="AUO logo"
            />
          </Link>
        </div>
        <div className="flex items-center justify-center rounded-xl justify-self-center">
          <div className="p-3 text-highlightPrimary">Home</div>
          <div className="p-3">Groups</div>
          <div className="p-3">Events</div>
        </div>
        <div className="flex justify-end gap-1 items-center">
          <h3 className="text-center hidden md:flex">{user?.nickname}</h3>
          <button
            onClick={() => {
              setDrawerOpen(!isDrawerOpen);
            }}
          >
            <Avatar sx={{ bgcolor: grey[800] }} src={user?.profileImg}>
              {user?.nickname.substring(0, 3).toUpperCase()}
            </Avatar>
          </button>
          <Drawer
            className=""
            open={isDrawerOpen}
            anchor="right"
            onClose={() => {
              setDrawerOpen(false);
            }}
          >
            <List className="flex flex-col h-full justify-start bg-backdropSecondary">
              <ListItem className="">
                <ListItemAvatar>
                  <NavLink to={"/profile"}>
                    <Avatar sx={{ bgcolor: grey[800] }} src={user?.profileImg}>
                      {user?.nickname.substring(0, 3).toUpperCase()}
                    </Avatar>
                  </NavLink>
                </ListItemAvatar>
                <ListItemText primary={user?.nickname} />
              </ListItem>
              <ListItem>
                {" "}
                <ListItemButton
                  onClick={() => {
                    logout();
                  }}
                >
                  <ListItemIcon>
                    <BiLogOut></BiLogOut>
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </ListItem>

              <ListItem className="">
                <ListItemText>Dark mode</ListItemText>
                <Switch
                  edge="end"
                  onChange={() => {
                    document.getElementById("root")!.classList.toggle("dark");
                  }}
                  checked={document
                    .getElementById("root")
                    ?.classList.contains("dark")}
                ></Switch>
              </ListItem>
            </List>
          </Drawer>
        </div>
      </nav>
    </header>
  );
}
