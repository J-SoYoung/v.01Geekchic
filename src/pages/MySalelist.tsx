import React from "react";
import Layout from "../components/myPage/_Layout";
import { UserType } from "../types/usedType";
import { userData } from "../types/dummyData";
import { Link } from "react-router-dom";

const user: UserType = userData[0];
const items = user.sales.salesItems;

const MySalelist = () => {
  return (
    <Layout title="판매목록">
      <div className="text-left h-[100vh]">
        <div className=" text-m text-gray-600 m-8 mb-4 pb-4 border-b">
          <span className="font-bold">전체 {items.length}</span>
        </div>
        {/* <UsedItemList /> */}

        <div className="p-8 pt-4 grid grid-cols-2 gap-4 mb-24">
          {items.map((el) => (
            <Link
              to={`/usedHome/detail/${el.itemId}`}
              className=" p-3 rounded-md cursor-pointer"
            >
              <img
                src={el.imageUrl}
                alt={el.itemName}
                className="w-full h-48 object-cover rounded-md mb-2"
              />
              <h2 className="text-lg font-bold pl-2">{el.itemName}</h2>
              <p className="text-gray-500 pl-2">
                {el.price.toLocaleString()}원
              </p>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default MySalelist;
