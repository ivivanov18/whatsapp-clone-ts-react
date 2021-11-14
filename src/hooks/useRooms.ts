import { collection, orderBy, query, getDocs } from "@firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebaseApp";

export default function useRooms() {
  const roomsRef = collection(db, "rooms");
  const q = query(roomsRef, orderBy("timestamp", "desc"));
  const [snapshot] = useCollection(q);
  const rooms = snapshot?.docs.map((doc: any) => ({
    id: doc.id,
    userId: doc.id,
    ...doc.data(),
  }));
  return rooms;
}
