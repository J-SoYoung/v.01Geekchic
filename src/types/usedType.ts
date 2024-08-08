import { User } from "firebase/auth";
import { Product } from "../api/firebase";

export interface UsedItemType extends UsedSaleItem {
  // 중고 데이터 타입 ( 중고 판매 타입 확장 )
  description: string;
  seller: SellerType;
  comments?: UsedCommentType;
}

export interface UsedCommentType {
  userId: string;
  commentId: string;
  createdAt: string;
  comment: string;
  nickname: string;
  userAvatar: string;
}

interface SellerType {
  // 판매자 정보
  sellerId: string | null;
  userName: string | null;
  nickname: string | null;
  userAvatar: string | null;
  address: string | null;
  phone: string | null;
}

export interface FirebaseUserType extends User {
  // firebase 유저 타입
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  phoneNumber: string | null;
}

export interface UsedSaleItem {
  // 중고 판매목록 아이템 타입
  id: string;
  itemName: string;
  size: string;
  createdAt: string;
  quantity: number;
  price: string;
  imageArr: string[];
  isSales: boolean;
  options: string[];
}

export interface OrderItemsType {
  // 주문내역 아이템 타입
  orderId: string;
  totalPrice: string;
  // items: UsedItems[] | Product[];
  items: UsedSaleItem[] | Product[];
  buyerInfo: {
    name: string;
    address: string;
    phone: string;
  };
  paymentMethod: string;
  orderDate: string;
}

export interface Message {}

export interface UserDataType {
  //유저 타입
  userId: string;
  userEmail: string | null;
  userName: string | null;
  nickname: string | null;
  userAvatar: string | null;
  address: string;
  phone: string | null;
  orders: OrderItemsType[];
  sales: UsedSaleItem;
  carts: Product[];
  wishlists: Product[];
  messages: Message[];
}
