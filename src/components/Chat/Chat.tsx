import { useParams, useNavigate } from "react-router-dom";
import { AddPhotoAlternate, MoreVert } from "@mui/icons-material";
import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import type { User } from "firebase/auth";
import ChatMessages from "../ChatMessages";
import MediaPreview from "../MediaPreview";
import ChatFooter from "../ChatFooter";
import useRoom from "../../hooks/useRoom";
import { WindowSize } from "../../hooks/useWindowSize";

import "./Chat.scss";

type ChatProps = {
  user: User;
  page: WindowSize;
};

function Chat({ user, page }: ChatProps) {
  const { roomId } = useParams();
  const room = useRoom(user.uid, roomId ?? "");
  console.log({ room });
  const navigate = useNavigate();
  return (
    <div className="chat">
      <div className="chat__background" style={{ height: page.height }}></div>
      <div className="chat__header">
        <div className="avatar__container">
          <Avatar src={room?.photoURL} />
        </div>
        <div className="chat__header-info">
          <h3>{room?.name}</h3>
        </div>
        <div className="chat__header-right">
          <input
            id="image"
            style={{ display: "none" }}
            accept="image/*"
            type="file"
          />
          <IconButton>
            <label style={{ cursor: "pointer", height: 24 }} htmlFor="image">
              <AddPhotoAlternate />
            </label>
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
          <Menu id="menu" open={false} keepMounted>
            <MenuItem>Delete Room</MenuItem>
          </Menu>
        </div>
      </div>
      <div
        className="chat__body-container"
        style={{ height: page.height! - 68 }}
      >
        <ChatMessages />
      </div>
      <MediaPreview />
      <ChatFooter />
    </div>
  );
}

export default Chat;
