import { useEffect, useState } from "react";
import Layout from "../components/myPage/_Layout";
import { Link, useParams } from "react-router-dom";

import { useRecoilValue } from "recoil";
import { userState } from "../atoms/userAtom";
import { loadUserData, uploadUserData } from "../api/firebase";
import { UserDataType } from "../types/usedType";
import { defaultImage } from "../types/dummyData";

const MyPage = () => {
  // userId = firebase소셜 로그인 uid
  const { userId } = useParams<{ userId: string }>();
  const firebaseUser = useRecoilValue(userState);
  const [me, setMe] = useState<UserDataType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        // firebase db에 유저 찾기
        const data = await loadUserData(userId);
        setMe(data);

        // firebase db에 유저 없는 경우 유저 데이터 생성
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
          // 유저 데이터 db저장
          const createdUser = await uploadUserData(newUser);
          setMe(createdUser);
        }
      }
    };
    fetchData();
  }, [firebaseUser, userId]);

  if (me == null) {
    // 스켈레톤으로 ㄱㄱ 로그인 여부를 확인해서 자동으로 페이지 이동
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
      <div className="m-16 p-4 h-[100vh]">
        {/* 프로필 관리 */}
        <div className="mb-16 border-b-2">
          <div className="flex items-center mb-8 mx-auto">
            <div className="w-16 h-16 bg-gray-200 rounded-full">
              <img
                src={me.userAvatar ?? defaultImage}
                alt={me.userName ?? ""}
              />
            </div>
            <div className="ml-4 text-left">
              <div className="text-lg font-semibold">{me?.userName}</div>
              <div className="text-sm text-gray-500">
                {me?.address ? me.address : "주소를 작성해주세요"}
              </div>
            </div>
          </div>

          <button className="w-full h-[45px] py-2 mb-16 bg-black text-white rounded-md">
            <Link to="profile" state={{ user: me }}>
              프로필 관리
            </Link>
          </button>
        </div>

        {/* 내 상품 관리 */}
        <div className="space-y-4">
          <Link
            to="orderlist"
            state={{ user: me }}
            className="flex justify-between items-center p-4 bg-gray-100 rounded-md cursor-pointer"
          >
            <span className="text-lg">주문내역</span>
            <span className="text-lg font-semibold">
              {me?.orders ? me.orders.length : 0}
            </span>
          </Link>
          <Link
            to="salelist"
            state={{ user: me }}
            className="flex justify-between items-center p-4 bg-gray-100 rounded-md cursor-pointer"
          >
            <span className="text-lg">판매목록</span>
            <span className="text-lg font-semibold">
              {me?.sales.salesItems ? me.sales.salesItems.length : 0}
            </span>
          </Link>
          <Link
            to="cart"
            state={{ user: me }}
            className="flex justify-between items-center p-4 bg-gray-100 rounded-md cursor-pointer"
          >
            <span className="text-lg">장바구니</span>
            <span className="text-lg font-semibold">
              {me?.carts.cartsItems ? me.carts.cartsItems.length : 0}
            </span>
          </Link>
          <Link
            to="talk"
            className="flex justify-between items-center p-4 bg-gray-100 rounded-md cursor-pointer"
          >
            <span className="text-lg">내 쪽지함</span>
            <span className="text-lg font-semibold">
              {/* {me?.carts.cartsItems ? me.carts.cartsItems.length : 0} */}
            </span>
          </Link>
        </div>
      </div>
    </Layout>
  );
};
export default MyPage;
