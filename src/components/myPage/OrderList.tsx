import React from "react";
import MyUsedItemList from "./MyUsedItemList";
import { OrderItemsType } from "../../types/usedType";

interface OrdersProps {
  orders: OrderItemsType[];
}

const OrderList = ({ orders }: OrdersProps) => {

  return (
    <div className="p-10 text-left">
      <div className="text-m text-gray-600 mb-4 pb-4 border-b">
        <span className="font-bold">전체 </span>
        {orders.length}
      </div>

      {orders.map((order: OrderItemsType) => {
        return (
          <div key={order.orderId} className="mb-4 border-b">
            <div>{order.orderDate}</div>
            {order.items.map((el) => {
              return <MyUsedItemList key={el.itemId} item={el} isCart={false} />;
            })}
          </div>
        );
      })}
    </div>
  );
};

export default OrderList;
