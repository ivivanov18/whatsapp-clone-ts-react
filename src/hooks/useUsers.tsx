import { collection, orderBy, query, getDocs } from "@firebase/firestore";
import type { User } from "firebase/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebaseApp";

export default function useUsers(user: User): any[] {
  const usersRef = collection(db, "users");
  const q = query(usersRef, orderBy("timestamp", "desc"));
  const [snapshot] = useCollection(q);
  if (!!user) {
    const users: any[] = [];

    snapshot?.docs.forEach((doc: any) => {
      const id =
        doc.id > user.uid ? `${doc.id}${user.uid}` : `${user.uid}${doc.id}`;

      if (doc.id !== user.uid) {
        users.push({
          id,
          userId: doc.id,
          ...doc.data(),
        });
      }
    });

    return users;
  }
  return [];
}
