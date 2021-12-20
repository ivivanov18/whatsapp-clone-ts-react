import { collection, orderBy, query, where } from "@firebase/firestore";
import type { User } from "firebase/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebaseApp";

export default function useChats(user: User) {
  const chatsRef = collection(db, "chats");
  const q = user
    ? query(chatsRef, where("id", "==", user.uid), orderBy("timestamp", "desc"))
    : null;
  const [snapshot] = useCollection(q);

  return snapshot?.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}
