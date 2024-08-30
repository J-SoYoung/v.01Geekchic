import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { v4 as uuidv4 } from "uuid";

import Layout from "../components/myPage/_Layout";
import MessageSkeleton from "../components/skeleton/MessageSkeleton";
import { loadUsedMessage, updateOrderUsedStatus } from "../api/firebase";
import { MessageListType, MessagesType, SellerType } from "../types/usedType";
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

  const { buyerId } = useParams<{ buyerId: string }>();
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
      if (buyerId) return loadUsedMessage({ buyerId, messageId });
    },
  });
  if (!buyerId) {
    throw new Error("구매자의 아이디가 올바르지 않습니다");
  }
  const sendMessageMutation = useSendMessage({
    buyerId,
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

  const orderStateMutation = useMutation({
    mutationFn: async ({
      usedMessage,
      sellerId,
      salesQuantity,
    }: {
      usedMessage: MessagesType;
      sellerId: string;
      salesQuantity: number;
    }) => {
      await updateOrderUsedStatus({
        usedMessage,
        sellerId,
        salesQuantity,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(
        {
          queryKey: ["usedMessage"],
          refetchType: "active",
          exact: true,
        },
        { throwOnError: true, cancelRefetch: true }
      );
    },
  });

  // 판매수락 버튼 클릭
  const onClickPurchaseApprove = () => {
    orderStateMutation.mutate({
      usedMessage,
      sellerId: loginUser.userId,
      salesQuantity: quantity,
    });
  };

  if (messageERror) {
    console.log(error);
    return <div>메세지 로드에 문제가 생겼습니다. 새로고침 해주세요</div>;
  }
  if (usedMessage) {
    <div>로딩중</div>;
  }

  const isSalesCompleted: boolean =
    usedMessage && usedMessage.salesStatus === "completion";

  return (
    <Layout title={"쪽지 보내기"} data={loginUser.messages}>
      <div className="w-[596px] p-8 flex min-h-screen flex-col bg-gray-100 relative">
        {messagePending ? (
          <MessageSkeleton />
        ) : (
          <div>
            {/* 판매자정보 */}
            <div className="flex justify-between p-4 mb-8 border-b bg-white">
              <div className="flex">
                <img
                  src={usedMessage?.itemImage}
                  alt="Product"
                  className="w-20 h-20 rounded-md object-cover"
                />
                <div className="ml-2 text-left">
                  <div className="text-lg font-bold">
                    {usedMessage?.seller.nickname}
                  </div>
                  <div className="text-gray-500">{usedMessage.itemName}</div>
                  <div className="text-lg font-semibold text-[#8F5BBD]">
                    {usedMessage.price.toLocaleString()}원
                  </div>
                </div>
              </div>
              {usedMessage?.seller.sellerId == loginUser.userId &&
                usedMessage.salesStatus === "initialization" && (
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
                    <div className="flex items-center">
                      <button
                        onClick={onClickPurchaseApprove}
                        className="p-2 mr-2 bg-[#8F5BBD] text-white font-bold rounded-lg "
                      >
                        판매 수락
                      </button>
                      <button
                        // onClick={}
                        className="p-2 bg-gray-400 text-white font-bold rounded-lg "
                      >
                        판매 거절
                      </button>
                    </div>
                  </>
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
