import Layout from "../components/myPage/_Layout";
import { useLocation } from "react-router-dom";

const UsedMessageList = () => {
  const location = useLocation();
  const { itemId, userId, itemName, price, seller, itemImage } = location.state;

  console.log(itemId, userId, itemName, price, seller);

  // const [messages, setMessages] = useState([
  //   {
  //     id: 1,
  //     sender: "seller",
  //     text: "안녕하세요, 이 낚싯대는 여전히 판매 중입니다!",
  //   },
  //   { id: 2, sender: "buyer", text: "안녕하세요, 가격 흥정이 가능한가요?" },
  // ]);
  // const [newMessage, setNewMessage] = useState("");

  // useEffect(() => {
  //   const fetchUsedItem = async () => {
  //     if (itemId && userId) {
  //       const itemData = await usedDetailItem(itemId);
  //       setUsedItem(itemData);

  //       const userData = await loadUserData(userId);
  //       setUser(userData);
  //     }
  //   };
  //   fetchUsedItem();
  // }, [itemId, userId]);

  return (
    <Layout title="내 쪽지함">
      <div className="w-[596px] min-h-screen p-8 flex flex-col bg-gray-100">

        {/* 판매자정보 */}
        <div className="p-4 border-b bg-white flex items-center">
          <img
            src={itemImage}
            alt="Product"
            className="w-20 h-20 rounded-md"
          />
          <div className="ml-2">
            <div className="text-lg font-bold">{seller.nickname}</div>
            <div className="text-gray-500">{itemName}</div>
            <div className="text-lg font-semibold text-blue-500">{price.toLocaleString()}원</div>
          </div>
          <button className="ml-auto text-blue-500">결제하기</button>
        </div>

        {/* 대화창 */}
        <div className="p-4  overflow-y-auto">
          {/* {messages.map((message) => (
            <div
              key={message.id}
              className={`flex mb-4 ${
                message.sender === "buyer" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs p-3 rounded-lg ${
                  message.sender === "buyer"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))} */}
        </div>

        {/* 대화 입력창 */}
        <div>
          <textarea
            className="border p-2 w-full mb-4"
            // value={message}
            // onChange={(e) => setMessage(e.target.value)}
            placeholder="메시지를 입력하세요"
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            // onClick={sendMessage}
          >
            전송
          </button>
        </div>
      </div>
    </Layout>
  );
};
export default UsedMessageList;
