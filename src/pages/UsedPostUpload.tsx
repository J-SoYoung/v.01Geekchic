import React from "react";
import Layout from "../components/common/_Layout";

const UsedPostUpload: React.FC = () => {
  return (
    <Layout title="상품등록">
      <div className="my-4 h-[100vh] text-left">
        <form>
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700">
              상품명
            </label>
            <input
              type="text"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              placeholder="상품명을 입력하세요"
            />
          </div>
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700">
              가격
            </label>
            <input
              type="text"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              placeholder="가격을 입력하세요"
            />
          </div>
          <div className="mb-8 h-[200px]">
            <label className="block text-sm font-medium text-gray-700">
              설명
            </label>
            <textarea
              className="mt-1 block min-h-[150px] w-full resize-none border border-gray-300 rounded-md p-4 focus:outline-none"
              placeholder="상품 설명을 입력하세요"
            />
          </div>
          <button
            type="submit"
            className="w-full h-[45px] py-2 px-4  bg-black  text-white rounded-md "
          >
            업로드
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default UsedPostUpload;
