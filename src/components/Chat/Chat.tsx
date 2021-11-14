import type { User } from "firebase/auth";
import { WindowSize } from "../../hooks/useWindowSize";

type ChatProps = {
  user: User;
  page: WindowSize;
};

function Chat({ user, page }: ChatProps) {
  return <div>Chat</div>;
}

export default Chat;
