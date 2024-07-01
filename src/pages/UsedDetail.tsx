// UsedDetailPage.tsx
import React from "react";
import { Link } from "react-router-dom";
import Chevron_left from "../assets/icons/chevron_left.svg";

const product = {
  name: "나이키 페가수스 41",
  price: 200000,
  description:
    "나이키 페가수스 41 리뷰글 입니다. 네고 가능 댓글 & 쪽지 남겨주세요. 나이키 페가수스 41 리뷰글 입니다. 네고 가능 댓글 & 쪽지 남겨주세요. 나이키 페가수스 41 리뷰글 입니다. 네고 가능 댓글 & 쪽지 남겨주세요. 나이키 페가수스 41 리뷰글 입니다. 네고 가능 댓글 & 쪽지 남겨주세요.",
  imageUrl: "https://via.placeholder.com/300x200", // 예시 이미지 URL입니다.
  colors: ["#cccccc", "#999999"],
  owner: {
    name: "나이키 매니아",
    address: "부산광역시 양도구 임선동3가",
    imageUrl: "https://via.placeholder.com/50", // 예시 프로필 이미지 URL입니다.
  },
  comments: [
    {
      user: "나이키 매니아",
      time: "15분전",
      text: "나이키 페가수스 41 리뷰글 입니다. 추가 정보는 프로필을 확인해 주세요. 최신 정보로 업데이트 했습니다.",
      userImageUrl: "https://via.placeholder.com/50", // 예시 프로필 이미지 URL입니다.
    },
    {
      user: "나이키 매니아",
      time: "1시간전",
      text: "나이키 페가수스 41 리뷰글 입니다. 추가 정보는 프로필을 확인해 주세요. 최신 정보로 업데이트 했습니다.",
      userImageUrl: "https://via.placeholder.com/50", // 예시 프로필 이미지 URL입니다.
    },
  ],
};

const UsedDetail: React.FC = () => {
  return (
    <div className="w-[600px] h-[100%] mb-20 text-left">
      {/* 제품 이미지 */}
      <div>
        <Link to="/usedHome">
          <img
            src={Chevron_left}
            alt="이전 페이지로"
            className="w-10 h-10 top-2 cursor-pointer fixed "
          />
        </Link>
        <div className="w-[598px] h-80 mb-6 bg-gray-200 ">
          {/* <div className=" w-full h-64 mb-6 bg-gray-200 "> */}
          <img src="/" alt="제품명" />
        </div>
        <div className="flex space-x-4 pl-8">
          {[0, 1, 2].map((i, idx) => (
            <div
              key={idx}
              className="w-20 h-20 flex items-center justify-center border"
            >
              {i}
            </div>
          ))}
        </div>
      </div>

      {/* 제품 설명 */}
      <div className="p-8">
        {/* 유저 */}
        <div className="flex pb-6 border-b">
          <div className="w-12 h-12 bg-gray-200 rounded-full">
            <img src="/" alt="유저" />
          </div>
          <div className="ml-4 ">
            <div className="text-lg font-semibold">판매자 아이디</div>
            <div className="text-sm text-gray-500">
              부산광역시 명도구 인정동3가
            </div>
          </div>
        </div>

        <div className="my-8 border-b pb-8">
          <div className="text-xl font-bold">나이키</div>
          <div className="text-sm text-gray-500">10일전</div>
          <div className="text-xl font-bold mt-2">
            100000원
            {/* {product.price.toLocaleString()}원 */}
          </div>
          <div className="flex space-x-2 mt-2">
            <span className="px-2 py-1 bg-gray-200 rounded-full text-sm">
              배송비 포함
            </span>
            <span className="px-2 py-1 bg-gray-200 rounded-full text-sm">
              새 상품
            </span>
          </div>
        </div>

        <div className="mb-10">
          <p className="text-gray-700">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </div>

        <div className="mb-10 ">
          <div className="text-lg font-bold mb-4">
            댓글 {product.comments.length}
          </div>
          {product.comments.map((comment, index) => (
            <div key={index} className="flex border-b py-6">
              <img
                src={comment.userImageUrl}
                alt={comment.user}
                className="w-[60px] h-[60px]  mr-4 object-cover rounded-full border"
              />
              <div>
                <div className="flex mb-2">
                  <div className="flex-1 font-semibold">{comment.user}</div>
                  <div className="text-sm text-gray-500">{comment.time}</div>
                </div>
                <div className="text-gray-800">{comment.text}</div>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full py-2 mb-4 bg-[#8F5BBD] text-white rounded-md">
          쪽지 보내기
        </button>
      </div>
    </div>
  );
};

export default UsedDetail;
