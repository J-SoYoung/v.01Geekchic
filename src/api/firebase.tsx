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
  orderByChild,
  remove,
} from "firebase/database";
import { MyUsedItemType, ReviewType } from "../types/usedType";
import { UserDataType } from "../pages/MyPage";

interface AdminUser extends User {
  isAdmin: boolean;
}

interface Product {
  id: string;
  title: string;
  category: string;
  description: string;
  price: string;
  image: string;
  options: string[];
}

interface Comment {
  id: string;
  text: string;
  rank: number;
  createdAt: string;
  uid: User;
  userPhoto: string;
  displayName: string;
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

const searchProducts = async (keyword: string): Promise<Product[]> => {
  const response = get(ref(database, "products"));
  const products: Product[] = [];

  (await response).forEach((childSnapshot) => {
    const item = childSnapshot.val();
    const product: Product = {
      id: childSnapshot.key as string,
      title: item.title,
      category: item.category,
      description: item.description,
      price: item.price,
      image: item.image,
      options: item.options,
    };
    products.push(product);
  });

  const filteredItems = products.filter((item) =>
    item.description.toLowerCase().includes(keyword.toLowerCase())
  );

  return filteredItems;
};

export default function useProducts() {
  const search = async (keyword: string): Promise<Product[]> => {
    return keyword ? searchProducts(keyword) : getProducts();
  };
  return { search };
}

export async function getProducts(): Promise<Product[]> {
  return get(ref(database, "products")).then((snapshot) => {
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    }
    return [];
  });
}

export async function addNewProduct(
  product: Product,
  image: string
): Promise<void> {
  const id = uuidv4();
  const definedId = id.replace(/[.#$[\]]/g, "_");

  set(ref(database, `products/${definedId}`), {
    ...product,
    id,
    price: product.price,
    image,
    options: product.options,
    // options: product.options.split(","),
  });
}

export async function addWishlistItem(
  userId: string,
  product: Product
): Promise<void> {
  const wishlistRef = ref(database, `wishlist/${userId}/${product.id}`);
  return set(wishlistRef, product);
}

export async function setWishlistItems(
  userId: string,
  wishlist: Product[]
): Promise<void> {
  await set(ref(database, `wishlist/${userId}`), wishlist);
}

// export async function removeWishlistItem(
//   userId: string,
//   product: Product
// ): Promise<void> {
//   return remove(ref(database, `wishlist/${userId}/${product.id}}`));
// }

export async function getWishlistItems(userId: string): Promise<Product[]> {
  const wishlistRef = ref(database, `wishlist/${userId}`);
  return get(wishlistRef).then((snapshot) => {
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    }
    return [];
  });
}

export async function newComment(
  productId: string,
  comment: Omit<Comment, "id" | "createdAt">
): Promise<void> {
  const commentId = uuidv4();
  const newComment: Comment = {
    id: commentId,
    text: comment.text,
    rank: comment.rank,
    createdAt: new Date().toISOString(),
    uid: comment.uid,
    userPhoto: comment.userPhoto,
    displayName: comment.displayName,
  };

  const commentRef = ref(
    getDatabase(),
    `products/${productId}/comments/${commentId}`
  );
  await set(commentRef, newComment);
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

// 댓글 추가 ( = 아이템 데이터 수정 )
export function updateItemComments(id: string, reviews: ReviewType[]) {
  console.log("db저장 - ", id, reviews);
  const itemRef = ref(database, `usedItems/${id}/reviews`);
  return set(itemRef, reviews);
}

// 댓글 삭제
export async function removeItemComments(
  id: string,
  reviewId: string
): Promise<void> {
  console.log(id, reviewId);
  const itemRef = ref(database, `usedItems/${id}/reviews/${reviewId}`);
  await remove(itemRef); 
}

// 중고 데이터 쿼리 검색
// firebase검색어 쿼리로는 검색하기에 한계가 있음. 따로 filter함수를 사용해서 검색
export async function usedItemSearch(
  queryString: string
): Promise<MyUsedItemType[]> {
  return new Promise((resolve, reject) => {
    const usedItemRef = ref(database, "usedItems");
    const queryUsedItem = query(usedItemRef, orderByChild("itemName"));

    onValue(
      queryUsedItem,
      (snapshop) => {
        const data = snapshop.val();
        if (data) {
          const dataArr = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          dataArr.reverse();
          const filterData = dataArr.filter((item) =>
            item.itemName.toLowerCase().includes(queryString.toLowerCase())
          );
          resolve(filterData);
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

// 유저 데이터 생성
export async function uploadUserData(
  data: UserDataType
): Promise<UserDataType> {
  const userTestRef = ref(database, `userData/${data.userId}`);
  await set(userTestRef, {
    ...data,
    createdAt: Date.now(),
  });
  return data;
}

// 유저 데이터 불러오기
export async function loadUserData(
  userId: string
): Promise<UserDataType | null> {
  const userRef = ref(database, `userData/${userId}`);
  const snapshot = await get(userRef);
  if (snapshot.exists()) {
    return snapshot.val() as UserDataType;
  } else {
    return null;
  }
}

// 유저 데이터 삭제
export async function deleteUser(userId: string): Promise<void> {
  console.log(userId);
  const userRef = ref(database, `userData/${userId}`);
  await remove(userRef);
}
