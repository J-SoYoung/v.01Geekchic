import React from "react";
import UsedItemList from "../components/usedHome/UsedItemList";
import Layout from "../components/common/_Layout";

const UsedHome = () => {
  return (
    <Layout title="중고거래" isPostButton={true}>
      <div className="h-[100%]">
        {/* search검색바 컴포넌트 */}
        <div className="mb-5">
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
      </div>
    </Layout>
  );
};

export default UsedHome;
