import { auth } from "../../firebaseApp";
import { Avatar, IconButton } from "@mui/material";
import { ExitToApp } from "@mui/icons-material";
import type { User } from "firebase/auth";
import { WindowSize } from "../../hooks/useWindowSize";
import "./Sidebar.scss";

type SidebarProps = {
  page: WindowSize;
  user: User;
};

function Sidebar({ user, page }: SidebarProps) {
  const signOut = () => {
    auth.signOut();
  };

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__header--left">
          <Avatar src={!!user.photoURL ? user.photoURL : ""} />
          <h4>{user.displayName}</h4>
        </div>
        <div className="sidebar__header--right">
          <IconButton onClick={signOut}>
            <ExitToApp />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
