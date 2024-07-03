import React from "react";
import UsedItemList from "../components/usedHome/UsedItemList";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";

const UsedHome = () => {
  return (
    <div className="h-[100%] w-[600px]">
      <header className="p-11 pb-4 text-right">
        <h1 className="text-3xl font-bold text-left mb-5 ">중고거래</h1>
        <button className="bg-black text-white px-4 py-2 mb-5 rounded-md text-right">
          <Link to="/usedPostUpload">등록하기</Link>
        </button>

        {/* <SearchHeader/> */}
        <div className="flex mb-4 text-xl">
          <form className="flex w-[100%]">
            <input
              className="w-[100%] p-2 outline-none bg-[#EEE] placeholder-gray-500 rounded-l-[8px] border-0 pl-4 "
              type="text"
              placeholder="상품검색"
            />
            <button className="bg-[#EEE] rounded-r-[8px] mt-1 px-4 h-[44px] box-border">
              <BsSearch />
            </button>
          </form>
        </div>
      </header>

      <p className="text-left pl-3 pl-8">
        전체<span>10</span>
      </p>
      <UsedItemList />
    </div>
  );
};

export default UsedHome;
