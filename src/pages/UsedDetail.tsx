import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Chevron_left from "../assets/icons/chevron_left.svg";
import { updateItemComments, usedDetailItem } from "../api/firebase";
import { UsedItemType } from "../types/usedType";
import UsedCommentList from "../components/usedDetail/UsedCommentList";
import { useRecoilValue } from "recoil";
import { geekChickUser } from "../atoms/userAtom";
import UsedInputComment from "../components/usedDetail/UsedInputComment";

const UsedDetail = () => {
  const navigate = useNavigate();
  // item id
  const { id } = useParams();

  const user = useRecoilValue(geekChickUser);
  const [item, setItem] = useState<UsedItemType>();
  console.log(item);
  useEffect(() => {
    const fetchItem = async () => {
      if (id) {
        const data: UsedItemType = await usedDetailItem(id);
        setItem(data);
      }
    };
    fetchItem();
  }, [id]);

  const addComment = async (comment: string) => {
    if (user && item && id) {
      const comments = {
        comment,
        userId: user.userId,
        nickname: user.nickname,
        userAvatar: user.userAvatar,
      };
      await updateItemComments(id, comments, setItem, item);
    }
  };

  return (
    <>
      {!item ? (
        <>
          <div> 데이터가 없습니다. </div>
          <Link to="/usedHome">중고 메인페이지로 돌아가기</Link>
        </>
      ) : (
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
                  src={item.imageArr[0]}
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
                <div className="text-lg font-semibold">
                  {item.seller.nickname}
                </div>
                <div className="text-sm text-gray-500">
                  {item.seller.address}
                </div>
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

            {item.comments && <UsedCommentList comments={item.comments} />}

            <UsedInputComment addComment={addComment} />
            <Link
              to="/sendMessage"
              state={{
                userId: user?.userId,
                itemId: id,
                itemName: item.itemName,
                itemImage: item.imageArr[0],
                price: item.price,
                seller: item.seller,
              }}
              className="w-full py-2 mb-4 bg-[#8F5BBD] text-white rounded-md"
            >
              쪽지 보내기
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
export default UsedDetail;
