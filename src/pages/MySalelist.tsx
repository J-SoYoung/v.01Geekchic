import React from "react";
import Layout from "../components/myPage/_Layout";
// import UsedItemList from "../components/usedHome/UsedItemList";

const MySalelist = () => {
  return (
    <Layout title="판매목록">
      <div className="text-left">
        <div className=" text-m text-gray-600 m-8 mb-4 pb-4 border-b">
          <span className="font-bold">전체 {4}</span>
          <div>판매내역 중고 카드.</div>
        </div>
        {/* <UsedItemList /> */}
      </div>
    </Layout>
  );
};

export default MySalelist;
