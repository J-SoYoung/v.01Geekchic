// UsedDetailPage.tsx
import React from "react";

const UsedDetail: React.FC = () => {
  return (
    <div className="h-[100%] w-[600px] p-8">
      <h1 className="text-3xl font-bold text-left mb-5 ">상세페이지 </h1>
      <div className="my-4 h-[100vh]">
        <h1 className="text-xl font-bold mb-4">중고 상품 상세</h1>
        <div className="mb-4">{/* 상세 정보 */}</div>
      </div>
    </div>
  );
};

export default UsedDetail;
