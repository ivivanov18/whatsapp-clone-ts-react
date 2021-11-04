// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithRedirect, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC_hLa4afGb0yUGMeOsjGqqWO3QpOzf1rA",
  authDomain: "whatsapp-clone-ts.firebaseapp.com",
  projectId: "whatsapp-clone-ts",
  storageBucket: "whatsapp-clone-ts.appspot.com",
  messagingSenderId: "282534560750",
  appId: "1:282534560750:web:4dce1fa06022bfad87c4ff",
  measurementId: "G-CDB9KFYWB6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app, "gs://images");
export const audioStorage = getStorage(app, "gs://audios");
export const signIn = signInWithRedirect;
// export const createTimestamp = firebase.firestore.FieldValue.serverTimestamp;
// export const serverTimestamp = firebase.database.ServerValue.TIMESTAMP;
