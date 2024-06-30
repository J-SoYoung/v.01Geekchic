import React from "react";

const UsedPostUpload: React.FC = () => {
  return (
    <div className="h-[100vh] w-[600px] p-8 text-left">
      <h1 className="text-3xl font-bold mb-5 ">상품등록 </h1>

      {/* 사진등록 */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          사진 등록
        </label>
        <div className="flex space-x-2">
          <div className="w-20 h-20 bg-gray-200 relative flex items-center justify-center">
            <button className="absolute top-0 right-0 p-1 text-xs text-gray-500">
              ×
            </button>
          </div>
          <div className="w-20 h-20 bg-gray-200 relative flex items-center justify-center">
            <button className="absolute top-0 right-0 p-1 text-xs text-gray-500">
              ×
            </button>
          </div>
          <div className="w-20 h-20 bg-gray-300 flex items-center justify-center text-2xl text-gray-500">
            +
          </div>
        </div>
      </div>

      {/* input type등록 */}
      <div className="">
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
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            배송비
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="shipping"
                value="included"
                // checked={shippingIncluded}
                // onChange={() => setShippingIncluded(true)}
                className="form-radio"
              />
              <span className="ml-2">배송비 포함</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="shipping"
                value="notIncluded"
                // checked={!shippingIncluded}
                // onChange={() => setShippingIncluded(false)}
                className="form-radio"
              />
              <span className="ml-2">배송비 비포함</span>
            </label>
          </div>
        </div>
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            물품 상태
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="condition"
                value="new"
                // checked={productCondition === "new"}
                // onChange={() => setProductCondition("new")}
                className="form-radio"
              />
              <span className="ml-2">새상품</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="condition"
                value="used"
                // checked={productCondition === "used"}
                // onChange={() => setProductCondition("used")}
                className="form-radio"
              />
              <span className="ml-2">중고상품</span>
            </label>
          </div>
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
        <button className="w-full h-[45px] py-2 px-4 bg-puple text-white rounded-md">
          등록하기
        </button>
      </div>
    </div>
  );
};

export default UsedPostUpload;
