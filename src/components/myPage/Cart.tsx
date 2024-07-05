import React, { useState } from "react";
import MyUsedItemList from "./MyUsedItemList";
import { MyUsedItemType } from "../../types/usedType";

// 유저 데이터 안에 카트 데이터 있음
const initialCart: MyUsedItemType[] = [
  {
    cartId: "item1",
    itemName: "나이키 V2K 런",
    size: "270",
    quantity: 1,
    price: 139000,
    imageUrl: "https://via.placeholder.com/150",
    isSales: true,
  },
  {
    cartId: "order02",
    itemName: "나이키 V2K 런2",
    size: "270",
    quantity: 1,
    price: 139000,
    imageUrl: "https://via.placeholder.com/150",
    isSales: true,
  },
];

const Cart = () => {
  const [cardItems, setCartItems] = useState<MyUsedItemType[]>(initialCart);

  const handleQuantityChange = (cartId: string, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.cartId === cartId ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const handleRemove = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div className="p-10 text-left">
      <div className="text-m text-gray-600 mb-4 pb-4 border-b">
        <span className="font-bold">전체 {cardItems.length}</span>
      </div>
      <MyUsedItemList
        myUsedItems={cardItems}
        isCart={true}
        onQuantityChange={handleQuantityChange}
        onRemove={handleRemove}
      />
      <div className="p-4 bg-gray-100 rounded-lg flex justify-between items-center text-center">
        <div className="flex flex-col ">
          <span>상품 총액</span>
          <span>
            {cardItems
              .reduce(
                (acc, cardItem) => acc + cardItem.price * cardItem.quantity,
                0
              )
              .toLocaleString()}
            원
          </span>
        </div>
        <p> + </p>
        <div className="flex flex-col ">
          <span>배송비</span>
          <span>3,000원</span>
        </div>
        <p> = </p>
        <div className="flex flex-col font-bold">
          <span>총 금액</span>
          <span>
            {(
              cardItems.reduce(
                (acc, cardItem) => acc + cardItem.price * cardItem.quantity,
                0
              ) + 3000
            ).toLocaleString()}
            원
          </span>
        </div>
      </div>
      <button className="w-full py-2 my-10 bg-[#8F5BBD] text-white rounded">
        주문하기
      </button>
    </div>
  );
};

export default Cart;
