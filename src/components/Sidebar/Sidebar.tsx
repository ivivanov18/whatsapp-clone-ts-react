import { ReactNode, useState } from "react";
import { NavLink } from "react-router-dom";
import { auth, db } from "../../firebaseApp";
import { serverTimestamp, addDoc, collection } from "@firebase/firestore";
import { Avatar, IconButton } from "@mui/material";
import {
  Add,
  ExitToApp,
  Home,
  Message,
  PeopleAlt,
  SearchOutlined,
} from "@mui/icons-material";
import type { User } from "firebase/auth";
import { WindowSize } from "../../hooks/useWindowSize";
import SidebarList from "../SidebarList";
import useRooms from "../../hooks/useRooms";
import "./Sidebar.scss";

type SidebarProps = {
  page: WindowSize;
  user: User;
};

type Tab = 1 | 2 | 3 | 4;

function Sidebar({ user, page }: SidebarProps) {
  const [menu, setMenu] = useState<Tab>(1);
  const rooms = useRooms();
  console.table(rooms);
  const signOut = () => {
    auth.signOut();
  };

  const onAddRoomClick = async () => {
    const name = prompt("Enter the room name");
    await addDoc(collection(db, "rooms"), {
      name,
      timestamp: serverTimestamp(),
    });
  };

  let Nav: React.ElementType;
  if (page.isMobile) {
    Nav = NavLink;
  } else {
    Nav = (props: {
      children: ReactNode;
      activeClass: string;
      activeClassName: string;
      onClick: () => {};
    }) => (
      <div
        className={`${props.activeClass ? "sidebar__menu--selected" : ""}`}
        onClick={props.onClick}
      >
        {props.children}
      </div>
    );
  }

  let List = null;
  if (menu === 1 || menu === 2 || menu === 3) {
    List = <SidebarList />;
  }

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
      <div className="sidebar__search">
        <form className="sidebar__search--container">
          <SearchOutlined />
          <input placeholder="Search for users" type="text" id="search" />
        </form>
      </div>
      <div className="sidebar__menu">
        <Nav
          to="/chats"
          activeClassName="sidebar__menu--selected"
          onClick={() => setMenu(1)}
          activeClass={menu === 1}
        >
          <div className="sidebar__menu--home">
            <Home />
            <div className="sidebar__menu--line" />
          </div>
        </Nav>
        <Nav
          to="/rooms"
          activeClassName="sidebar__menu--selected"
          onClick={() => setMenu(2)}
          activeClass={menu === 2}
        >
          <div className="sidebar__menu--rooms">
            <Message />
            <div className="sidebar__menu--line" />
          </div>
        </Nav>
        <Nav
          to="/users"
          activeClassName="sidebar__menu--selected"
          onClick={() => setMenu(3)}
          activeClass={menu === 3}
        >
          <div className="sidebar__menu--users">
            <PeopleAlt />
            <div className="sidebar__menu--line" />
          </div>
        </Nav>
      </div>
      {List}
      <div className="sidebar__chat--addRoom">
        <IconButton onClick={onAddRoomClick}>
          <Add />
        </IconButton>
      </div>
    </div>
  );
}

export default Sidebar;
