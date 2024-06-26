// UsedDetailPage.tsx
import React from "react";
import Layout from "../components/common/_Layout";

const UsedDetail: React.FC = () => {
  return (
    <Layout title="제품 상세 페이지">
      <div className="my-4 h-[100vh]">
        <h1 className="text-xl font-bold mb-4">중고 상품 상세</h1>
        <div className="mb-4">{/* 상세 정보 */}</div>
      </div>
    </Layout>
  );
};

export default UsedDetail;
