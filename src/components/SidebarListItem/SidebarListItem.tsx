import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import "./SidebarListItem.scss";

type SidebarListItemProps = {
  item: any;
};

function SidebarListItem({ item }: SidebarListItemProps) {
  return (
    <Link className="link" to={`/room/${item.id}`}>
      <div className="sidebar__chat">
        <div className="avatar__container">
          <Avatar
            style={{
              width: 45,
              height: 45,
            }}
            src={
              item.photoURL ||
              `https://avatars.dicebear.com/api/human/${item.id}.svg`
            }
          />
        </div>
        <div className="sidebar__chat--info">
          <h2>{item.name}</h2>
        </div>
      </div>
    </Link>
  );
}

export default SidebarListItem;
