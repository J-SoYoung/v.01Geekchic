import { User } from "firebase/auth";

// 중고 데이터 타입
export interface MyUsedItemType {
  id?: string;
  itemName: string;
  size: string;
  quantity: number;
  description: string;
  price: number;
  imageArr: string[];
  isSales: boolean;
  options: string[];
  seller: SellerType;
  reviews?: ReviewType[];
}

export interface MyUsedItemListType {
  item: MyItems;
  isCart: boolean;
  onQuantityChange?: (id: string, quantity: number) => void;
  onRemove?: (id: string) => void;
}

export interface ReviewType {
  reviewId: string;
  reviewInfo: ReveiwInfoType;
}

// 유저타입 지정되면 공통 부분 정리하기
interface ReveiwInfoType {
  userId: string;
  userName: string;
  userAvatar: string;
  review: string;
  createdAt: string;
}

interface SellerType {
  sellerId: string;
  userName: string;
  nickname: string;
  userAvatar: string;
  address: string;
  phone: string;
}

// 유저 데이터타입
export interface UserType {
  userId: string;
  userName: string;
  nickname: string;
  userAvatar: string;
  address: string;
  phone: string;
  orders: [] | Orders[];
  sales: Sales;
  carts: Carts;
  wishlists: [] | Wishlists[];
}

export interface Orders {
  orderId: string;
  totalPrice: number;
  items: MyItems[];
  buyerInfo: {
    name: string;
    address: string;
    phone: string;
  };
  paymentMethod: string;
  orderDate: string;
}

export interface Sales {
  salesId: string;
  salesItems: SalesItemsType[];
  // | {
  //     itemId: string;
  //     itemName: string;
  //     price: number;
  //     size: string;
  //     imageUrl: string;
  //     quantity: number;
  //     createdAt: string;
  //     isSales: boolean;
  //     options: string[];
  //   }[]
  // | [];
}

export interface Carts {
  cartsId: string;
  cartsItems: [] | MyItems[];
}

export interface MyItems {
  itemId: string;
  itemName: string;
  price: number;
  size: string;
  imageUrl: string;
  quantity: number;
}

interface Wishlists {
  itemId: string;
  itemName: string;
  price: number;
  imageUrl: string;
}

// firebase 유저 타입
export interface FirebaseUserType extends User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  phoneNumber: string | null;
}

interface UsedItems {
  itemId: string;
  itemName: string;
  price: number;
  size: string;
  imageUrl: string;
  quantity: number;
}

interface SalesItemsType extends UsedItems {
  createdAt: string;
  isSales: boolean;
  options: string[];
}

interface OrderItemsType {
  orderId: string;
  totalPrice: number;
  items: UsedItems[];
  buyerInfo: {
    name: string;
    address: string;
    phone: string;
  };
  paymentMethod: string;
  orderDate: string;
}

interface WishItemsType {
  itemId: string;
  itemName: string;
  price: number;
  imageUrl: string;
}

export interface UserDataType {
  userId: string;
  userEmail: string | null;
  userName: string | null;
  nickname: string | null;
  userAvatar: string | null;
  address: string;
  phone: string | null;
  orders: OrderItemsType[];
  sales: {
    saleId: string;
    salesItems: SalesItemsType[];
  };
  carts: {
    cartId: string;
    cartsItems: UsedItems[];
  };
  wishlists: WishItemsType[];
}
