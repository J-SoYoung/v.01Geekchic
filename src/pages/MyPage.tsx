import React, { useEffect, useState } from "react";
import Layout from "../components/myPage/_Layout";
import { Link, useParams } from "react-router-dom";

import { useRecoilValue } from "recoil";
import { userState } from "../atoms/userAtom";
import { User } from "firebase/auth";
import { loadUserData, uploadUserData } from "../api/firebase";

export interface FirebaseUserType extends User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  phoneNumber: string | null;
}

export interface UserDataType {
  userId: string;
  userEmail: string | null;
  userName: string | null;
  nickname: string | null;
  userAvatar: string | null;
  address: string;
  phone: string | null;
  orders: [];
  sales: {
    saleId: string;
    salesItems: [];
  };
  carts: {
    cartId: string;
    cartsItems: [];
  };
  wishlists: [];
}

const MyPage = () => {
  // userId = firebase소셜 로그인 uid
  const { userId } = useParams<{ userId: string }>();
  const firebaseUser = useRecoilValue(userState);
  const [me, setMe] = useState<UserDataType | null>(null);

  console.log(me);

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
            orders: [],
            sales: {
              saleId: `saleId_${firebaseUser.uid}`,
              salesItems: [],
            },
            carts: {
              cartId: `cartId_${firebaseUser.uid}`,
              cartsItems: [],
            },
            wishlists: [],
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

  return (
    <Layout title="마이페이지">
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
