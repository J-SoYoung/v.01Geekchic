import React from "react";
import MyUsedItemList from "./MyUsedItemList";
import { OrderItemsType } from "../../types/usedType";
import { Link } from "react-router-dom";

interface OrdersProps {
  orders: OrderItemsType[];
}

const OrderList = ({ orders }: OrdersProps) => {

  if (!orders) {
    return (
      <div>
        <p>주문내역이 없습니다</p>
        <p>
          <Link to="/">제품 구경하러 홈으로 이동</Link>
        </p>
      </div>
    );
  }
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
              return (
                <MyUsedItemList key={el.itemId} item={el} isCart={false} />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default OrderList;
