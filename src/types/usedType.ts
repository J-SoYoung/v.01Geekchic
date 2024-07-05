export interface MyUsedItemType {
  itemId: string;
  itemName: string;
  size: string;
  quantity: number;
  description: string;
  price: number;
  imageUrl: string;
  imageArr: string[];
  isSales: boolean;
  options: string[];
  seller: SellerType;
  reviews: ReviewType[];
}
export interface ReviewType {
  reviewId: string;
  reviewInfo: ReveiwInfoType;
}

// 유저타입 지정되면 공통 부분 정리하기
export interface ReveiwInfoType {
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  review: string;
  createdAt: string;
}

export interface MyUsedItemListType {
  myUsedItems: MyUsedItemType[];
  isCart: boolean;
  onQuantityChange?: (id: string, quantity: number) => void;
  onRemove?: (id: string) => void;
}

export interface MyUsedOrderItemType {
  itemId: "order01",
  itemName: "나이키 V2K 런1",
  size: "270",
  quantity: 1,
  price: 139000,
  imageUrl: "https://via.placeholder.com/150",
  isSales: false,
}


export interface Order {
  date: string;
  myUsedOrderItems: MyUsedOrderItemType[];
}

export interface SellerType {
  sellerId: string;
  userName: string;
  nickname: string;
  userAvatar: string;
  address: string;
  phone: string;
}
