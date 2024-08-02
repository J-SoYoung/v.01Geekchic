import { User } from "firebase/auth";
import { Product } from "../api/firebase";

// 중고 데이터 타입
export interface UsedItemType {
  id?: string;
  itemName: string;
  size: string;
  quantity: number;
  description: string;
  price: string;
  imageArr: string[];
  isSales: boolean;
  options: string[];
  seller: SellerType;
  reviews?: ReviewType[];
}

export interface ReviewType {
  reviewId: string;
  reviewInfo: CommentInfoType;
}

// 유저타입 지정되면 공통 부분 정리하기
interface CommentInfoType {
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

// interface Product {
//   id: string;
//   title: string;
//   category: string;
//   description: string;
//   price: string;
//   image: string;
//   options: string[];
// }

export interface FirebaseUserType extends User {
  // firebase 유저 타입
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  phoneNumber: string | null;
}

export interface UsedItems {
  // 중고 아이템
  itemId: string;
  itemName: string;
  price: string;
  size: string;
  imageUrl: string;
  quantity: number;
}

export interface SalesItemsType extends UsedItems {
  // 판매 목록
  createdAt: string;
  isSales: boolean;
  options: string[];
}

export interface OrderItemsType {
  // 주문 목록
  orderId: string;
  totalPrice: string;
  items: UsedItems[] | Product[];
  buyerInfo: {
    name: string;
    address: string;
    phone: string;
  };
  paymentMethod: string;
  orderDate: string;
}

export interface UserDataType {
  //유저 타입
  userId: string;
  userEmail: string;
  userName: string;
  nickname: string;
  userAvatar: string;
  address: string;
  phone: string;
  orders: OrderItemsType[];
  sales: SalesItemsType[];
  carts: Product[];
  wishlists: Product[];
}
