import Layout from "../components/myPage/_Layout";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { loadUsedMessage, sendUsedMessage } from "../api/firebase";
import { MessagesType } from "../types/usedType";
import { makeArr } from "../types/utils";
import { useRecoilValue } from "recoil";
import { geekChickUser } from "../atoms/userAtom";

const UsedMessage = () => {
  const location = useLocation();
  const { messageId, userId } = location.state || {};
  const loginUser = useRecoilValue(geekChickUser);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<MessagesType>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await loadUsedMessage({ userId, messageId });
        setMessages(data);
      } catch (err) {
        console.error("쪽지 데이터 로드 에러", err);
      }
    };
    fetchData();
  }, [messageId, userId]);

  const onClickSendMessage = async () => {
    try {
      const newMessageObj = {
        id: "",
        message: newMessage,
        sender:
          messages?.seller.sellerId == loginUser.userId ? "seller" : "buyer",
        createdAt: new Date().toISOString(),
      };

      await sendUsedMessage({
        messages: newMessageObj,
        userId,
        messageId,
        sellerId: messages?.seller.sellerId,
      });

      setMessages((prev) => ({
        ...prev,
        messageList: { ...prev?.messageList, newMessageObj },
      }));
    } catch (err) {
      console.error("쪽지 페이지 불러오기 ERror-", err);
    }
    setNewMessage("");
  };

  if (!messages) {
    return (
      <div>로딩중입니다. ⭕react-query 상태관리, 스켈레톤 로딩이미지 </div>
    );
  }

  return (
    <Layout title={"쪽지 보내기"} data={loginUser.messages}>
      <div className="w-[596px] min-h-screen p-8 flex flex-col bg-gray-100 relative">
        {/* 판매자정보 */}
        <div className="p-4 border-b bg-white flex mb-8">
          <img
            src={messages.itemImage}
            alt="Product"
            className="w-20 h-20 rounded-md object-cover"
          />
          <div className="ml-2 text-left">
            <div className="text-lg font-bold">{messages.seller.nickname}</div>
            <div className="text-gray-500">{messages.itemName}</div>
            <div className="text-lg font-semibold text-[#8F5BBD]">
              {messages.price.toLocaleString()}원
            </div>
          </div>
          {messages?.seller.sellerId !== loginUser.userId && (
            <button className="ml-auto font-bold text-[#8F5BBD]">
              결제하기
            </button>
          )}
        </div>

        {/* 대화창 */}
        <div className=" max-w-xs p-3 rounded-lg mb-4 bg-gray-200 text-black">
          "{messages.itemName}" 판매자
          <br />
          {messages.seller.nickname}입니다
        </div>
        {makeArr(messages.messageList).map((m) => {
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

        {/* 대화 입력창 */}
        <div className="w-[532px] flex items-center fixed bottom-24">
          <textarea
            className="border w-full p-2 resize-none outline-0"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="메시지를 입력하세요"
          />
          <button
            className="bg-[#8F5BBD] text-white px-4 py-2 rounded"
            onClick={onClickSendMessage}
          >
            전송
          </button>
        </div>
      </div>
    </Layout>
  );
};
export default UsedMessage;
