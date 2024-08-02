import React from "react";
import Layout from "../components/myPage/_Layout";
import { UserDataType } from "../types/usedType";
import { Link, useLocation } from "react-router-dom";

interface StateProps {
  user: UserDataType;
}

const MySalelist = () => {
  const location = useLocation();
  const { user }: StateProps = location.state || {};
  const sales = user.sales;

  // ⭕ 중고 메인과 컴포넌트 공통으로 사용할 수 있게 해야함
  return (
    <Layout title="판매목록">
      <div className="text-left h-[100vh]">
        <div className=" text-m text-gray-600 m-8 mb-4 pb-4 border-b">
          <span className="font-bold">전체 {sales? sales.length : 0}</span>
        </div>

        <div className="p-8 pt-4 grid grid-cols-2 gap-4 mb-24">
          {!sales ? (
            <div>
              판매중인 상품이 없습니다.
              <p>
                <Link to="/usedHome">중고 홈 구경하기</Link>
              </p>
            </div>
          ) : (
            sales.map((sale, idx) => (
              <Link
                key={idx}
                to={`/usedHome/detail/${sale.itemId}`}
                className=" p-3 rounded-md cursor-pointer"
              >
                <img
                  src={sale.imageUrl}
                  alt={sale.itemName}
                  className="w-full h-48 object-cover rounded-md mb-2"
                />
                <h2 className="text-lg font-bold pl-2">{sale.itemName}</h2>
                <p className="text-gray-500 pl-2">
                  {sale.price}원
                </p>
              </Link>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default MySalelist;
