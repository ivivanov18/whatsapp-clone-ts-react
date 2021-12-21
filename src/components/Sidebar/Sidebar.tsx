import { FormEvent, ReactNode, useState } from "react";
import { NavLink } from "react-router-dom";
import { auth, db } from "../../firebaseApp";
import {
  serverTimestamp,
  addDoc,
  collection,
  query,
  where,
} from "@firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
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
import useUsers from "../../hooks/useUsers";
import useChats from "../../hooks/useChats";

type SidebarProps = {
  page: WindowSize;
  user: User;
};

type Tab = 1 | 2 | 3 | 4;

function Sidebar({ user, page }: SidebarProps) {
  const [menu, setMenu] = useState<Tab>(1);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const rooms = useRooms() ?? [];
  const users = useUsers(user) ?? [];
  const chats = useChats(user) ?? [];

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

  const searchUsersRooms = async (event: any) => {
    event.preventDefault();
    const searchTerm = event.target.elements.namedItem("search")?.value;
    const usersRef = collection(db, "users");
    const roomsRef = collection(db, "rooms");
    const usersQuery = query(usersRef, where("name", "==", searchTerm));
    const roomsQuery = query(roomsRef, where("name", "==", searchTerm));
    const [usersSnapshot] = useCollection(usersQuery);
    const [roomsSnapshot] = useCollection(roomsQuery);
    const users =
      usersSnapshot?.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data(),
      })) ?? [];
    const rooms =
      roomsSnapshot?.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data(),
      })) ?? [];
    setSearchResults([...users, ...rooms]);
    setMenu(4);
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
  switch (menu) {
    case 1:
      List = <SidebarList title="Chats" data={chats} />;
      break;
    case 2:
      List = <SidebarList title="Rooms" data={rooms} />;
      break;
    case 3:
      List = <SidebarList title="Users" data={users} />;
      break;
    case 4:
      List = <SidebarList title="Search" data={[]} />;
      break;
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
        <form
          onSubmit={searchUsersRooms}
          className="sidebar__search--container"
        >
          <SearchOutlined />
          <input
            placeholder="Search for users"
            type="text"
            id="search"
            name="search"
          />
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
