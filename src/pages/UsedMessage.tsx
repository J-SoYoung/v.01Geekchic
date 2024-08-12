import Layout from "../components/myPage/_Layout";
import { useLocation } from "react-router-dom";
import { makeArr } from "../types/utils";
import { useState } from "react";

const UsedMessage = () => {
  const location = useLocation();
  const { messageData } = location.state || {};
  const {
    // createdAt,
    // itemId,
    // messageId,
    itemImage,
    itemName,
    messageList,
    price,
    seller,
    userId,
  } = messageData;

  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState(messageList);

  const onClickSendMessage = () => {
    setNewMessage(newMessage);
    const newMessageObj = {
      id: "1",
      message: newMessage,
      sender: seller.sellerId == userId ? "seller" : "buyer",
      createdAt: new Date().toISOString(),
    };
    console.log(newMessageObj)
    setMessages({ ...messages, newMessageObj });
    setNewMessage("");
  };
  console.log(messages)
  return (
    <Layout title={"쪽지 보내기"}>
      <div className="w-[596px] min-h-screen p-8 flex flex-col bg-gray-100 relative">
        {/* 판매자정보 */}
        <div className="p-4 border-b bg-white flex mb-8">
          <img
            src={itemImage}
            alt="Product"
            className="w-20 h-20 rounded-md object-cover"
          />
          <div className="ml-2 text-left">
            <div className="text-lg font-bold">{seller.nickname}</div>
            <div className="text-gray-500">{itemName}</div>
            <div className="text-lg font-semibold text-[#8F5BBD]">
              {price.toLocaleString()}원
            </div>
          </div>
          <button className="ml-auto font-bold text-[#8F5BBD]">결제하기</button>
        </div>

        {/* 대화창 */}
        <div className=" max-w-xs p-3 rounded-lg mb-4 bg-gray-200 text-black">
          "{itemName}" 판매자
          <br />
          {seller.nickname}입니다
        </div>
        {makeArr(messageList || []).map((m) => {
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
