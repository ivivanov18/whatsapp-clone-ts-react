import React, { useEffect } from "react";
import { auth, db } from "../firebaseApp";
import {
  collection,
  addDoc,
  getDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

export default function useAuthUser() {
  const [user] = useAuthState(auth);

  useEffect(() => {
    addUser();

    async function addUser() {
      try {
        if (user) {
          const docRef = await doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (!docSnap.exists()) {
            await addDoc(collection(db, "users"), {
              name: user.displayName,
              photoUrl: user.photoURL,
              timestamp: serverTimestamp(),
            });
          }
        }
      } catch (error) {
        console.error("Error adding the user: ", error);
      }
    }
  }, [user]);

  return user;
}
