// UsedDetailPage.tsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Chevron_left from "../assets/icons/chevron_left.svg";
import { usedItems } from "../types/dummyData";

// 디테일 페이지 그림 업로드 되는 부분 빠르게 되나?
const UsedDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const item = usedItems.filter((i) => i.itemId === id)[0];

  return (
    <div className="w-[600px] h-[100%] mb-20 text-left">
      <div>
        <button
          className="w-10 h-10 top-2 cursor-pointer fixed"
          onClick={() => navigate(-1)}
        >
          <img src={Chevron_left} alt="이전 페이지로" className="w-full" />
        </button>
        <div className="w-[598px] h-[100%]">
          <div className="mb-6 bg-gray-200 border-red-400">
            <img
              src={item.imageUrl}
              alt={item.itemName}
              className="w-[100%] h-96 object-cover"
            />
          </div>
          <div className="flex space-x-4 pl-8">
            {item.imageArr.map((i, idx) => (
              <div
                key={idx}
                className="w-24 h-24 flex items-center justify-center"
              >
                <img src={i} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="flex pb-6 border-b">
          <div className="w-12 h-12 bg-gray-200 rounded-full">
            <img src={item.seller.userAvatar} alt="유저" />
          </div>
          <div className="ml-4 ">
            <div className="text-lg font-semibold">{item.seller.nickname}</div>
            <div className="text-sm text-gray-500">{item.seller.address}</div>
          </div>
        </div>

        <div className="my-8 border-b pb-8">
          <div className="text-xl font-bold">{item.itemName}</div>
          {/* 상품 업로드 한 날짜를 db에 넣어야 함 */}
          {/* <div className="text-sm text-gray-500">10일전</div> */}
          <div className="text-xl font-bold mt-2">
            {item.price.toLocaleString()}원
          </div>

          <div className="flex space-x-2 mt-2">
            {item.options.map((i, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-gray-200 rounded-full text-sm"
              >
                {i}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-10">
          <p className="text-gray-700">{item.description}</p>
        </div>

        <div className="mb-10 ">
          <div className="text-lg font-bold mb-4">
            댓글 {item.reviews.length}
          </div>
          {item.reviews.map((r) => (
            <div key={r.reviewId} className="flex border-b py-6">
              <img
                src={r.reviewInfo.userAvatar}
                alt={r.reviewInfo.userName}
                className="w-[60px] h-[60px]  mr-4 object-cover rounded-full border"
              />
              <div>
                <div className="flex mb-2 items-end">
                  <div className="flex-1 font-semibold">
                    {r.reviewInfo.userName}
                  </div>
                  <div className="text-sm text-gray-500">
                    {r.reviewInfo.createdAt}
                  </div>
                </div>
                <div className="text-gray-800">{r.reviewInfo.review}</div>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full py-2 mb-4 bg-[#8F5BBD] text-white rounded-md">
          {/* 중고 구매하면 isSalse true로 바꿔야함 -> 판매완료로 해야함 */}
          쪽지 보내기
        </button>
      </div>
    </div>
  );
};

export default UsedDetail;
