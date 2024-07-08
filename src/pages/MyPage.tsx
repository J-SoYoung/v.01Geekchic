import React from "react";
import Layout from "../components/myPage/_Layout";
import { Link } from "react-router-dom";
import { userData } from "../types/dummyData";
import { UserType } from "../types/usedType";

const user: UserType = userData[0];

const MyPage = () => {
  console.log(user);
  return (
    <Layout title="마이페이지">
      <div className="m-16 p-4 h-[100vh]">
        {/* 프로필 관리 */}
        <div className="mb-16 border-b-2">
          <div className="flex items-center mb-8 mx-auto">
            <div className="w-16 h-16 bg-gray-200 rounded-full">
              <img src={user.userAvatar} alt={user.userName} />
            </div>
            <div className="ml-4 text-left">
              <div className="text-lg font-semibold">{user.userName}</div>
              <div className="text-sm text-gray-500">{user.address}</div>
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
            <span className="text-lg font-semibold">{user.orders && user.orders.length}</span>
          </Link>
          <Link
            to="salelist"
            className="flex justify-between items-center p-4 bg-gray-100 rounded-md cursor-pointer"
          >
            <span className="text-lg">판매목록</span>
            <span className="text-lg font-semibold">
              {user.sales && user.sales.salesItems.length}
            </span>
          </Link>
          <Link
            to="cart"
            className="flex justify-between items-center p-4 bg-gray-100 rounded-md cursor-pointer"
          >
            <span className="text-lg">장바구니</span>
            <span className="text-lg font-semibold">
              {user.carts && user.carts.cartsItems.length}
            </span>
          </Link>
        </div>
      </div>
    </Layout>
  );
};
export default MyPage;
