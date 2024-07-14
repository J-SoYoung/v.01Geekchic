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
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_APP_FIREBASE_DB_URL,
  projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export async function login(): Promise<User | void> {
  // try {
  //   const result = await signInWithPopup(auth, provider);
  //   const user = result.user;
  //   const adminUser = await fetchAdminUser(user);
  //   return adminUser;
  // } catch (error) {
  //   console.error(error);
  // }
  // return signInWithPopup(auth, provider)
  //   .then((result) => {
  //     const user = result.user;
  //     // const adminUser = fetchAdminUser(user);
  //     // return adminUser;
  //     return user;
  //   })
  //   .catch(console.error);
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Login error:", error);
  }
}

export async function logout(): Promise<void | null> {
  return signOut(auth).then(() => {
    return null;
  });

  // return signOut(auth)
  // .then(() => null)
  // .catch(console.error);
}
// export async function logout(): Promise<void | null> {
//   try {
//     await signOut(auth);
//     return null;
//   } catch (error) {
//     console.error("Logout error:", error);
//     throw error;
//   }
// }

export function onUserStateChange(callback: (user: User | null) => void): void {
  onAuthStateChanged(auth, async (user) => {
    const updatedUser = user ? await fetchAdminUser(user) : null;
    callback(updatedUser);
  });
}

async function fetchAdminUser(user: User): Promise<AdminUser> {
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
