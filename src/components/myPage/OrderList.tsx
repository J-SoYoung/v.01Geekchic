import React from "react";
import MyUsedItemList from "./MyUsedItemList";
import { UserType } from "../../types/usedType";
import { userData } from "../../types/dummyData";

const user: UserType = userData[0];

const OrderList = () => {
  return (
    <div className="p-10 text-left">
      <div className="text-m text-gray-600 mb-4 pb-4 border-b">
        <span className="font-bold">전체 </span>
        {user.orders.length}
      </div>

      {user.orders.map((order) => {
        return (
          <div key={order.orderId} className="mb-4 border-b">
            <div>{order.orderDate}</div>
            {order.items.map(
              (el) => {
                return <MyUsedItemList item={el} isCart={false} />;
              }
            )}
          </div>
        );
      })}
    </div>
  );
};

export default OrderList;
