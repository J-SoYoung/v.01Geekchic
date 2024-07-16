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

import {
  getDatabase,
  ref,
  get,
  push,
  set,
  query,
  orderByKey,
  onValue,
} from "firebase/database";

import axios from "axios";
import { MyUsedItemType } from "../types/usedType";

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

// 중고 제품 업로드
export function usedItemUpload(itemData: MyUsedItemType) {
  const usedItemRef = ref(database, "usedItems");
  const newItemRef = push(usedItemRef);

  return set(newItemRef, {
    ...itemData,
    createdAt: Date.now(),
  });
}

// 중고 메인 데이터 받아오기
export function usedItemLists(): Promise<MyUsedItemType[]> {
  return new Promise((resolve, reject) => {
    const usedDataRef = ref(database, "usedItems");
    const sortUsedItem = query(usedDataRef, orderByKey());

    onValue(
      sortUsedItem,
      (snapshop) => {
        const data = snapshop.val();
        if (data) {
          const dataArr = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          dataArr.reverse();
          resolve(dataArr);
        } else {
          resolve([]);
        }
      },
      (error) => {
        reject(error);
      }
    );
  });
}

// 중고 상세페이지 데이터 받아오기
export async function usedDetailItem(id: string) {
  try {
    const itemRef = ref(database, `usedItems/${id}`);
    const snapshot = await get(itemRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Item not found");
  }
}
