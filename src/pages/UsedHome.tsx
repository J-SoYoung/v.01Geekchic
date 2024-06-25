import React from "react";
import UsedItemList from "../components/usedHome/UsedItemList";
import BottomNav from "../components/common/BottomNav";

export default function UsedHome() {
  return (
    <>
      <div className="w-[600px]">
        
        {/* header 컴포넌트  */}
        <header className="p-8 text-right">
          <h1 className="text-2xl font-bold text-left mb-5">중고거래</h1>
          <button className="bg-black text-white px-4 py-2 rounded-md text-right">
            등록하기
          </button>
        </header>

        {/* search검색바 컴포넌트 */}
        <div className="px-4 mb-5">
          <input
            type="text"
            placeholder="상품검색"
            className="w-full p-3 rounded-md bg-gray-200 border-none placeholder-gray-700	focus:outline-none mb-lg"
          />
        </div>

        <p className="text-left pl-3">
          전체<span>10</span>
        </p>
        <UsedItemList />
        <BottomNav />
      </div>
    </>
  );
}
