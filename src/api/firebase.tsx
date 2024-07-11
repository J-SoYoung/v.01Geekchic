import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  User,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import axios from "axios";
import { getDatabase, ref, get } from "firebase/database";

interface SearchResult {
  items: Video[];
}

interface Video {
  kind: string;
  etag: string;
  id: VideoId;
  snippet: {
    price: number;
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
        width: number;
        height: number;
      };
      medium: {
        url: string;
        width: number;
        height: number;
      };
      high: {
        url: string;
        width: number;
        height: number;
      };
    };
    channelTitle: string;
    liveBroadcastContent: string;
    publishTime: string;
  };
}

interface VideoId {
  kind: string;
  videoId: string;
}

interface AdminUser extends User {
  isAdmin: boolean;
}

const firebaseConfig = {
  // apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  // authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
  // databaseURL: import.meta.env.VITE_APP_FIREBASE_DB_URL,
  // projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
  apiKey: "AIzaSyAwXLdcG6bSu0bF1iy1mPgqjM-d_mehHbg",
  authDomain: "geekchic-968c3.firebaseapp.com",
  databaseURL:
    "https://geekchic-968c3-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "geekchic-968c3",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export async function login(): Promise<User | void> {
  return signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      return user;
    })
    .catch(console.error);
}

export async function logout(): Promise<null> {
  return signOut(auth).then(() => {
    return null;
  });
}

export function onUserStateChange(callback: (user: User | null) => void): void {
  onAuthStateChanged(auth, async (user) => {
    const updatedUser = user ? await adminUser(user) : null;
    callback(updatedUser);
  });
}

async function adminUser(user: User): Promise<AdminUser> {
  const snapshot = await get(ref(database, "admins"));
  if (snapshot.exists()) {
    const admins = snapshot.val();
    const isAdmin = admins.includes(user.uid);
    return { ...user, isAdmin };
  }
  return { ...user, isAdmin: false };
}

export default function useProducts() {
  const httpClient = axios.create({
    baseURL: "/",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const search = async (keyword: string): Promise<Video[]> => {
    return keyword ? searchByKeyword(keyword) : newProducts();
  };

  const searchByKeyword = async (keyword: string): Promise<Video[]> => {
    const response = await httpClient.get<SearchResult>(
      "/products/search.json"
    );
    const filteredItems = response.data.items.filter((item) =>
      item.snippet.title.toLowerCase().includes(keyword.toLowerCase())
    );
    return filteredItems.map((item) => ({
      ...item,
      id: {
        kind: item.id.kind,
        videoId: item.id.videoId,
      },
      snippet: {
        ...item.snippet,
      },
    }));
  };

  const newProducts = async (): Promise<Video[]> => {
    const response = await httpClient.get<SearchResult>(
      "/products/search.json"
    );
    return response.data.items;
  };
  return {
    search,
  };
}
