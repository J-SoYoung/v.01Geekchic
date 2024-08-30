import { User } from "firebase/auth";
import { Product } from "../types/mainType";

export interface UsedItemType {
  // 중고 데이터 타입
  id: string;
  itemName: string;
  size: string;
  createdAt: string;
  quantity: number;
  price: string;
  imageArr: string[];
  isSales: boolean;
  options: string[];
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

export interface SellerType {
  // 판매자 정보
  sellerId: string | null;
  userName: string | null;
  nickname: string | null;
  userAvatar: string | null;
  address: string | null;
  phone: string | null;
}
export interface BuyerType {
  // 구매자 정보
  userId: string;
  nickname: string | null;
  userAvatar: string | null;
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
  salesQuantity: number;
}

export interface OrderItemsType {
  // 주문내역 아이템 타입
  address: string;
  createdAt: string;
  items: Product;
  name: string;
  ordersId: string;
  paymentMethod: string;
  phone: string;
}

// ⭕ type 상세설정
export interface MessageListType {
  id?: string;
  message: string;
  sender: string; //sender, buyer
  createdAt: string;
}

// ⭕ type 상세설정
export interface MessagesType {
  createdAt: string;
  itemId: string | undefined;
  itemImage: string;
  itemName: string;
  messageId: string;
  messageList?: MessageListType;
  price: string;
  quantity: number;
  seller: SellerType;
  buyer: BuyerType;
  salesStatus: string; //initialization, pending, completion, rejection
}

//유저 타입
export interface UserDataType {
  userId: string;
  userEmail: string | null;
  userName: string | null;
  nickname: string | null;
  userAvatar: string | null;
  address: string;
  phone: string | null;
  orders?: OrderItemsType;
  sales?: UsedSaleItem;
  carts?: Product[];
  wishlists?: Product[];
  messages?: MessagesType;
}
