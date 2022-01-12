import { doc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import { db } from "../firebaseApp";

export default function useRoom(userId: string, roomId: string) {
  const isUserRoom = roomId.includes(userId);

  const docToFetch = isUserRoom ? roomId?.replace(userId, "") : roomId;
  const ref = doc(db, isUserRoom ? "users" : "rooms", docToFetch);
  const [snapshot] = useDocument(ref);

  if (!snapshot) return null;

  return {
    id: snapshot.id,
    photoURL:
      snapshot.data()?.photoURL ||
      `https://avatars.dicebear.com/api/human/${snapshot.id}.svg`,

    name: snapshot.data()?.name,
    ...snapshot.data(),
  };
}
