import React, { useEffect, useState } from "react";
import Layout from "../components/myPage/_Layout";
import { Link, useParams } from "react-router-dom";

import { useRecoilValue } from "recoil";
import { userState } from "../atoms/userAtom";
import { deleteUser, User } from "firebase/auth";
import { loadUserData, uploadUserData } from "../api/firebase";

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

const MyPage = () => {
  // userId = firebase소셜 로그인 uid
  const { userId } = useParams<{ userId: string }>();
  const firebaseUser = useRecoilValue(userState);
  const [me, setMe] = useState<UserDataType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        const data = await loadUserData(userId);
        setMe(data);
        console.log("db유저확인", data);

        if (!data && firebaseUser) {
          const newUser: UserDataType = {
            userId: firebaseUser.uid,
            userEmail: firebaseUser.email,
            userName: firebaseUser.displayName,
            nickname: firebaseUser.displayName,
            userAvatar: firebaseUser.photoURL,
            address: "",
            phone: firebaseUser.phoneNumber,
            orders: [
              {
                orderId: "orderId_754c",
                totalPrice: 0,
                items: [
                  {
                    itemId: "itemId850H",
                    itemName: "NASDAQ",
                    price: 602000,
                    size: "M",
                    imageUrl: "https://i.postimg.cc/K89Dxv30/1-1.webp",
                    quantity: 1,
                  },
                  {
                    itemId: "itemId534M",
                    itemName: "NASDAQ",
                    price: 36000,
                    size: "XS",
                    imageUrl: "https://i.postimg.cc/KjFMtdgK/2-1.webp",
                    quantity: 1,
                  },
                ],
                buyerInfo: {
                  name: "Sumner",
                  address: "4923 Mesta Park",
                  phone: "010-2436-4062",
                },
                paymentMethod: "creditcard",
                orderDate: "2024-01-28",
              },
              {
                orderId: "orderId_578e",
                totalPrice: 0,
                items: [
                  {
                    itemId: "itemId534M",
                    itemName: "NASDAQ",
                    price: 36000,
                    size: "XS",
                    imageUrl: "https://i.postimg.cc/KjFMtdgK/2-1.webp",
                    quantity: 1,
                  },
                  {
                    itemId: "itemId850H",
                    itemName: "NASDAQ",
                    price: 602000,
                    size: "M",
                    imageUrl: "https://i.postimg.cc/K89Dxv30/1-1.webp",
                    quantity: 1,
                  },
                ],
                buyerInfo: {
                  name: "Sumner",
                  address: "4923 Mesta Park",
                  phone: "010-2436-4062",
                },
                paymentMethod: "creditcard",
                orderDate: "2024-07-28",
              },
            ],
            sales: {
              saleId: `saleId_${firebaseUser.uid}`,
              salesItems: [
                {
                  itemId: "itemId850H",
                  itemName: "NASDAQ",
                  price: 602000,
                  size: "M",
                  imageUrl: "https://i.postimg.cc/K89Dxv30/1-1.webp",
                  quantity: 1,
                  createdAt: "2024-06-17",
                  isSales: false,
                  options: ["배송비포함", "새상품"],
                },
                {
                  itemId: "itemId111O",
                  itemName: "NYSE",
                  quantity: 2,
                  size: "XS",
                  price: 15000,
                  imageUrl: "https://i.postimg.cc/Wz2xx1ks/4-1.png",
                  createdAt: "2024-06-17",
                  isSales: true,
                  options: ["배송비포함", "새상품"],
                },
              ],
            },
            carts: {
              cartId: `cartId_${firebaseUser.uid}`,
              cartsItems: [
                {
                  itemId: "itemId850H",
                  itemName: "NASDAQ",
                  price: 602000,
                  size: "M",
                  imageUrl: "https://i.postimg.cc/K89Dxv30/1-1.webp",
                  quantity: 1,
                },
                {
                  itemId: "itemId534M",
                  itemName: "NASDAQ",
                  price: 36000,
                  size: "XS",
                  imageUrl: "https://i.postimg.cc/KjFMtdgK/2-1.webp",
                  quantity: 1,
                },
                {
                  itemId: "itemId784I",
                  itemName: "NYSE",
                  price: 226000,
                  size: "L",
                  imageUrl: "https://i.postimg.cc/cLrGsC5H/3-1.webp",
                  quantity: 1,
                },
              ],
            },
            wishlists: [
              {
                itemId: "itemId850H",
                itemName: "NASDAQ",
                price: 602000,
                imageUrl: "https://i.postimg.cc/K89Dxv30/1-1.webp",
              },
              {
                itemId: "itemId534M",
                itemName: "NASDAQ",
                price: 36000,
                imageUrl: "https://i.postimg.cc/KjFMtdgK/2-1.webp",
              },
            ],
          };
          console.log("생성할 유저데이터", newUser);
          const createdUser = await uploadUserData(newUser);
          console.log("firebase저장한 유저데이터", createdUser);
          setMe(createdUser);
        }
      }
    };
    fetchData();
  }, [userId, firebaseUser]);

  const onClickUserDelete = () => {
    deleteUser(userId);
  };
  // useEffect(() => {
  //   // 페이지 들어왔을 때, 로그인 된 유저인지 확인하기
  //   // 유저 데이터 불러오기 ( firebase googlelogin uid 아이디 검색 )
  //   const loadUSer = async (userId: string) => {
  //     const data = await loadUserData(userId);
  //     setMe(data);
  //     console.log("db유저확인", data);
  //     return data;
  //   };
  //   userId && loadUSer(userId);

  //   // 없으면 유저 데이터 생성 및 firebase에 저장
  //   if (me == null) {
  //     const uploadUser = async () => {
  //       const newUser = {
  //         userId: firebaseUser && firebaseUser.uid,
  //         userEmail: firebaseUser && firebaseUser.email,
  //         userName: firebaseUser && firebaseUser.displayName,
  //         nickname: firebaseUser && firebaseUser.displayName,
  //         userAvatar: firebaseUser && firebaseUser.photoURL,
  //         address: "",
  //         phone: firebaseUser && firebaseUser.phoneNumber,
  //         orders: [],
  //         sales: {
  //           saleId: `saleId_${firebaseUser && firebaseUser.uid}`,
  //           salesItems: [],
  //         },
  //         carts: {
  //           cartId: `cartId_${firebaseUser && firebaseUser.uid}`,
  //           cartsItems: [],
  //         },
  //         wishlists: [],
  //       };
  //       console.log("생성할 유저데이터", newUser);
  //       const data = await uploadUserData(newUser);
  //       console.log("firebase저장한 유저데이터", data);
  //       setMe(data);
  //     };
  //     // uploadUser();
  //   }
  // }, []);
  if (me == null) {
    return (
      <div>
        <p>로그인이 필요합니다.</p>
        <p>
          <Link to={"/api/login"}>로그인 페이지로 이동합니다</Link>
        </p>
        <p>
          <Link to={"/"}>아니요, 구경만할래요</Link>
        </p>
      </div>
    );
  }

  return (
    <Layout title="마이페이지">
      <button onClick={onClickUserDelete}>유저삭제</button>
      <div className="m-16 p-4 h-[100vh]">
        {/* 프로필 관리 */}
        <div className="mb-16 border-b-2">
          <div className="flex items-center mb-8 mx-auto">
            <div className="w-16 h-16 bg-gray-200 rounded-full">
              <img src={me?.userAvatar} alt={me?.userName} />
            </div>
            <div className="ml-4 text-left">
              <div className="text-lg font-semibold">{me?.userName}</div>
              <div className="text-sm text-gray-500">
                {me?.address ? me.address : "주소를 작성해주세요"}
              </div>
            </div>
          </div>

          <button className="w-full h-[45px] py-2 mb-16 bg-black text-white rounded-md">
            <Link to="profile">프로필 관리</Link>
          </button>
        </div>

        {/* 내 상품 관리 */}
        <div className="space-y-4">
          <Link
            to="orderlist"
            className="flex justify-between items-center p-4 bg-gray-100 rounded-md cursor-pointer"
          >
            <span className="text-lg">주문내역</span>
            <span className="text-lg font-semibold">
              {me?.orders ? me.orders.length : 0}
            </span>
          </Link>
          <Link
            to="salelist"
            className="flex justify-between items-center p-4 bg-gray-100 rounded-md cursor-pointer"
          >
            <span className="text-lg">판매목록</span>
            <span className="text-lg font-semibold">
              {me?.sales.salesItems ? me.sales.salesItems.length : 0}
            </span>
          </Link>
          <Link
            to="cart"
            className="flex justify-between items-center p-4 bg-gray-100 rounded-md cursor-pointer"
          >
            <span className="text-lg">장바구니</span>
            <span className="text-lg font-semibold">
              {me?.carts.cartsItems ? me.carts.cartsItems.length : 0}
            </span>
          </Link>
        </div>
      </div>
    </Layout>
  );
};
export default MyPage;
