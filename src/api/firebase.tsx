import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  User,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  // apiKey: process.env.VITE_APP_FIREBASE_API_KEY,
  // authDomain: process.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
  // databaseURL: process.env.VITE_APP_FIREBASE_DB_URL,
  // projectId: process.env.VITE_APP_FIREBASE_PROJECT_ID,
  apiKey: "AIzaSyAwXLdcG6bSu0bF1iy1mPgqjM-d_mehHbg",
  authDomain: "geekchic-968c3.firebaseapp.com",
  databaseURL:
    "https://geekchic-968c3-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "geekchic-968c3",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export async function login(): Promise<User | void> {
  return signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log(user);
      console.log(app);
      return user;
    })
    .catch(console.error);
}

export async function logout(): Promise<null> {
  return signOut(auth).then(() => {
    return null;
  });
}
