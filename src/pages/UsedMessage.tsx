import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { v4 as uuidv4 } from "uuid";

import Layout from "../components/myPage/_Layout";
import MessageSkeleton from "../components/skeleton/MessageSkeleton";
import {
  addNotificationToSeller,
  loadNotification,
  loadUsedMessage,
} from "../api/firebase";
import { MessageListType, SellerType } from "../types/usedType";
import { makeArr } from "../types/utils";
import { geekChickUser } from "../atoms/userAtom";
import { useSendMessage } from "../hook/useUsedMessageMutation";

export interface UsedItemsOrdersInfoType {
  id: string;
  seller: SellerType;
  itemId: string;
  itemName: string;
  itemImage: string;
  price: string;
  userId: string;
  quantity: number;
  createdAt: string;
}

const UsedMessage = () => {
  const location = useLocation();
  const { userId } = useParams<string>();
  const { messageId } = location.state || {};
  const loginUser = useRecoilValue(geekChickUser);
  const [newMessage, setNewMessage] = useState("");
  const [quantity, setQuantity] = useState(1);

  const {
    data: usedMessage,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["usedMessage"],
    queryFn: () => {
      if (userId) return loadUsedMessage({ userId, messageId });
    },
  });

  const { data: notification, isPending: notificationPending } = useQuery({
    queryKey: ["notification"],
    queryFn: () => {
      if (userId)
        return loadNotification({
          userId,
          notificationId: usedMessage.notificationId,
        });
    },
    retry: 3,
    retryDelay: 1000,
  });

  const sendMessageMutation = useSendMessage({
    userId,
    messageId,
    sellerId: usedMessage?.seller.sellerId,
  });

  const onClickSendMessage = () => {
    if (!newMessage) return;
    const messageId = uuidv4();
    const newMessageObj: MessageListType = {
      id: messageId,
      message: newMessage,
      sender:
        usedMessage.seller.sellerId == loginUser.userId ? "seller" : "buyer",
      createdAt: new Date().toISOString(),
    };
    sendMessageMutation.mutate(newMessageObj);
    setNewMessage("");
  };

  // ⭕ mutation으로 결제하기 해야되는거아닌감.여튼
  const onClickUsedPurchase = async () => {
    alert("제품이 마음에 드셨나요? 판매자의 판매 확정을 기다려주세요");
    // 판매자에게 구매요청 버튼 생성
    const notificationId = uuidv4();
    const notificationData = {
      id: notificationId,
      buyerId: usedMessage.userId,
      itemId: usedMessage.itemId,
      itemName: usedMessage.itemName,
      itemQuantity: usedMessage.quantity,
      quantity: quantity,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    // 판매 구매자 모두에게 알림db생성
    await addNotificationToSeller({
      buyerId: usedMessage.userId,
      sellerId: usedMessage.seller.sellerId,
      notificationData,
    });
  };

  if (isError) {
    console.log(error);
    return <div>데이터를 로드하지 못했습니다.</div>;
  }

  const isSalesCompleted = notification && notification?.status === "approved";
  return (
    <Layout title={"쪽지 보내기"} data={loginUser.messages}>
      <div className="w-[596px] p-8 flex min-h-screen flex-col bg-gray-100 relative">
        {/* 판매자정보 */}
        {isPending ? (
          <MessageSkeleton />
        ) : (
          <div>
            {/* 판매자정보 */}
            <div className="p-4 border-b bg-white flex mb-8">
              <img
                src={usedMessage.itemImage}
                alt="Product"
                className="w-20 h-20 rounded-md object-cover"
              />
              <div className="ml-2 text-left">
                <div className="text-lg font-bold">
                  {usedMessage.seller.nickname}
                </div>
                <div className="text-gray-500">{usedMessage.itemName}</div>
                <div className="text-lg font-semibold text-[#8F5BBD]">
                  {usedMessage.price.toLocaleString()}원
                </div>
              </div>
              {usedMessage?.seller.sellerId !== loginUser.userId && (
                <>
                  <div className="h-12 flex border items-center">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1 bg-gray-200 rounded-l"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="text-center "
                      min={1}
                      max={usedMessage.quantity}
                    />
                    <button
                      onClick={() =>
                        setQuantity(
                          Math.min(usedMessage.quantity, quantity + 1)
                        )
                      }
                      className="px-3 py-1 bg-gray-200 rounded-r"
                    >
                      +
                    </button>
                  </div>
                  {notificationPending ? (
                    <p>로딩중...</p>
                  ) : notification === null ? (
                    <button
                      className="ml-auto font-bold text-[#8F5BBD]"
                      onClick={onClickUsedPurchase}
                    >
                      결제하기
                    </button>
                  ) : notification && notification.status === "pending" ? (
                    <p>판매 수락 대기중</p>
                  ) : (
                    <p>판매완료</p>
                  )}
                </>
              )}
            </div>

            {/* 대화창 */}
            <div className={isSalesCompleted && "opacity-50"}>
              <div className="max-w-xs p-3 rounded-lg mb-4 bg-gray-200 text-black">
                "{usedMessage.itemName}" 판매자
                <br />
                {usedMessage.seller.nickname}입니다
              </div>
              {makeArr(usedMessage.messageList).map((m) => {
                return (
                  <div
                    key={m.id}
                    className={`flex mb-4 ${
                      m.sender === "buyer" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs p-3 rounded-lg ${
                        m.sender === "buyer"
                          ? "bg-[#8F5BBD] text-white"
                          : "bg-gray-200 text-black"
                      }`}
                    >
                      {m.message}
                    </div>
                  </div>
                );
              })}
            </div>

            {isSalesCompleted && (
              <div className="py-8">
                -------------------------- 판매 완료 되었습니다
                --------------------------
              </div>
            )}
            {/* 대화 입력창 */}
            <div className="w-[532px] flex items-center fixed bottom-24">
              <textarea
                className="border w-full p-2 resize-none outline-0"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="메시지를 입력하세요"
                disabled={isSalesCompleted ? true : false}
              />
              <button
                className={`text-white px-4 py-2 rounded ${isSalesCompleted? 'bg-gray-400':'bg-[#8F5BBD]'}`}
                onClick={onClickSendMessage}
                disabled
              >
                전송
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};
export default UsedMessage;
