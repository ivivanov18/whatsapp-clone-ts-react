import type { User } from "firebase/auth";
import { useParams } from "react-router-dom";
import useRoom from "../../hooks/useRoom";
import { WindowSize } from "../../hooks/useWindowSize";

type ChatProps = {
  user: User;
  page: WindowSize;
};

function Chat({ user, page }: ChatProps) {
  const { roomId } = useParams();
  const room = useRoom(user.uid, roomId ?? "");
  console.log({ room });
  return <div>Chat</div>;
}

export default Chat;
