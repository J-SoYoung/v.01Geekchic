import { initializeApp } from "firebase/app";
import { v4 as uuidv4 } from "uuid";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  User,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getDatabase, ref, get, set } from "firebase/database";
import axios from "axios";

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

interface Product {
  title: string;
  price: number;
  category: string;
  description: string;
  options: string;
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
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Login error:", error);
  }
}

export async function logout(): Promise<void | null> {
  try {
    await signOut(auth);
    return null;
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
}

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

export async function addNewProduct(
  product: Product,
  image: string
): Promise<void> {
  const id = uuidv4();
  const sanitizedId = id.replace(/[.#$[\]]/g, "_");

  set(ref(database, `products/${sanitizedId}`), {
    ...product,
    id,
    price: product.price,
    image,
    options: product.options.split(","),
  });
}
