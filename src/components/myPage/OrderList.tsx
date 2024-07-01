import React from "react";
import MyUsedItemList, { MyUsedItemType } from "./MyUsedItemList";
// import ItemComp from "./ItemComp";

export interface Order {
  date: string;
  myUsedItems: MyUsedItemType[];
}

const orders: Order[] = [
  {
    date: "2024. 01. 10",
    myUsedItems: [
      {
        id: "order01",
        name: "나이키 V2K 런1",
        size: "270",
        quantity: 1,
        price: 139000,
        imageUrl: "https://via.placeholder.com/150",
      },
      {
        id: "order02",
        name: "나이키 V2K 런2",
        size: "270",
        quantity: 1,
        price: 139000,
        imageUrl: "https://via.placeholder.com/150",
      },
      {
        id: "order03",
        name: "나이키 V2K 런3",
        size: "270",
        quantity: 1,
        price: 139000,
        imageUrl: "https://via.placeholder.com/150",
      },
    ],
  },
  {
    date: "2024. 01. 12",
    myUsedItems: [
      {
        id: "order04",
        name: "나이키 V2K 런4",
        size: "270",
        quantity: 1,
        price: 139000,
        imageUrl: "https://via.placeholder.com/150",
      },
    ],
  },
];

const OrderList = () => {
  return (
    <div className="p-10 text-left">
      <div className="text-m text-gray-600 mb-4 pb-4 border-b">
        <span className="font-bold">전체 </span>
        {orders.reduce((sum, order) => sum + order.myUsedItems.length, 0)}
      </div>

      {orders.map((order) => (
        <div key={order.date} className="mb-4 border-b">
          <div className="text-gray-500 mb-2">{order.date}</div>
          <MyUsedItemList myUsedItems={order.myUsedItems} isCart={false} />
        </div>
      ))}
    </div>
  );
};

export default OrderList;
