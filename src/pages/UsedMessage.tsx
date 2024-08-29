import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { v4 as uuidv4 } from "uuid";

import Layout from "../components/myPage/_Layout";
import MessageSkeleton from "../components/skeleton/MessageSkeleton";
import { addNotification, loadUsedMessage, updateOrderUsedStatus } from "../api/firebase";
import { MessageListType, NotificationDataType, SellerType } from "../types/usedType";
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
  const queryClient = useQueryClient();

  const { userId } = useParams<string>();
  const { messageId } = location.state || {};
  const loginUser = useRecoilValue(geekChickUser);
  
  const [newMessage, setNewMessage] = useState("");
  const [quantity, setQuantity] = useState(1);

  const {
    data: usedMessage,
    isPending: messagePending,
    isError: messageERror,
    error,
  } = useQuery({
    queryKey: ["usedMessage"],
    queryFn: () => {
      if (userId) return loadUsedMessage({ userId, messageId });
    },
  });
  console.log(usedMessage);

  const statusMessages = {
    initialization: "결제하기",
    pending: "판매 승인 대기중",
    completion: "구매완료",
    rejection: "판매거절",
  };

  const renderButtonMessage = (
    status: string,
    onClickUsedPurchase: () => void
  ) => {
    switch (status) {
      case "initialization":
        return (
          <button
            className="ml-auto font-bold text-[#8F5BBD]"
            onClick={onClickUsedPurchase}
          >
            {statusMessages[status]}
          </button>
        );
      case "pending":
      case "completion":
      case "rejection":
        return <p>{statusMessages[status]}</p>;
      default:
        return <p>새로고침 해주세요</p>;
    }
  };

  const sendMessageMutation = useSendMessage({
    userId,
    messageId,
    sellerId: usedMessage?.seller.sellerId,
  });
  const onClickSendMessage = () => {
    if (!newMessage) return;
    const talkId = uuidv4();
    const newMessageObj: MessageListType = {
      id: talkId,
      message: newMessage,
      sender:
        usedMessage.seller.sellerId == loginUser.userId ? "seller" : "buyer",
      createdAt: new Date().toISOString(),
    };
    sendMessageMutation.mutate(newMessageObj);
    setNewMessage("");
  };

  const onClickUsedPurchase = async () => {
    // ⭕ mutation으로 업데이트
    alert("제품이 마음에 드셨나요? 판매자의 판매 확정을 기다려주세요");
    const notificationId = uuidv4();
    const notificationData = {
      notificationId: notificationId,
      messageId: messageId,
      buyerId: usedMessage.userId,
      itemId: usedMessage.itemId,
      itemName: usedMessage.itemName,
      itemQuantity: usedMessage.quantity,
      quantity: quantity,
      salesStatus: "pending",
      createdAt: new Date().toISOString(),
    };

    // 판매 구매자 모두에게 알림db생성
    await addNotification({
      buyerId: usedMessage.userId,
      sellerId: usedMessage.seller.sellerId,
      usedMessage,
      notificationData,
    });
  };

  const orderStateMutation = useMutation({
    mutationFn: async ({
      notification,
      sellerId,
    }: {
      notification: NotificationDataType;
      sellerId: string;
    }) => {
      await updateOrderUsedStatus({
        notification,
        sellerId,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(
        {
          queryKey: ["notifications"],
          refetchType: "active",
          exact: true,
        },
        { throwOnError: true, cancelRefetch: true }
      );
    },
  });

  // 구매 요청 승인 ( 상태 업데이트 )
  const onClickPurchaseApprove = (notification: NotificationDataType) => {
    orderStateMutation.mutate({
      notification,
      sellerId: userId as string,
    });
  };

  if (messageERror) {
    console.log(error);
    return <div>메세지 로드에 문제가 생겼습니다. 새로고침 해주세요</div>;
  }
  const isSalesCompleted: boolean =
    usedMessage && usedMessage.salesStatus === "completion";

  console.log(isSalesCompleted);

  return (
    <Layout title={"쪽지 보내기"} data={loginUser.messages}>
      <div className="w-[596px] p-8 flex min-h-screen flex-col bg-gray-100 relative">
        {/* 판매자정보 */}
        {messagePending ? (
          <MessageSkeleton />
        ) : (
          <div>
            {/* 판매자정보 */}
            <div className="flex justify-between p-4 mb-8 border-b bg-white">
              <div className="flex">
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
              </div>
              {usedMessage?.seller.sellerId !== loginUser.userId ? (
                // 구매자인 경우
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
                  {messagePending ? (
                    <p>로딩중...</p>
                  ) : (
                    usedMessage &&
                    renderButtonMessage(
                      usedMessage.salesStatus,
                      onClickUsedPurchase
                    )
                  )}
                </>
              ) : (
                // 판매자인 경우
                usedMessage.salesStatus === "pending" && (
                  <div className="flex items-center">
                    <button 
                    // onClick={onClickPurchaseApprove}
                    className="p-2 mr-2 bg-[#8F5BBD] text-white font-bold rounded-lg ">
                      판매 수락
                    </button>
                    <button 
                    // onClick={}
                    className="p-2 bg-gray-400 text-white font-bold rounded-lg ">
                      판매 거절
                    </button>
                  </div>
                )
              )}
            </div>

            {/* 대화창 */}
            <div className={isSalesCompleted ? "opacity-50" : ""}>
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
                disabled={isSalesCompleted}
              />
              <button
                className={`text-white px-4 py-2 rounded ${
                  isSalesCompleted ? "bg-gray-400" : "bg-[#8F5BBD]"
                }`}
                onClick={onClickSendMessage}
                disabled={isSalesCompleted}
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
