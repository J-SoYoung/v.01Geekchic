import React from "react";
import MyUsedItemList from "./MyUsedItemList";
import { OrderItemsType } from "../../types/usedType";
import { Link } from "react-router-dom";
import { makeArr } from "../../types/utils";

interface OrdersProps {
  orders: OrderItemsType;
}

const OrderList = ({ orders }: OrdersProps) => {
  const ordersArr = makeArr(orders);

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
        {ordersArr.length}
      </div>

      {ordersArr.map((order) => {
        return (
          <div key={order.ordersId} className="mb-4 border-b">
            <div className="flex justify-between items-center py-2 mb-2">
              <p className="font-bold">{order.createdAt.split("T")[0]}</p>
              <Link to={`/orders/detail/${order.ordersId}`} className="text-sm">주문 상세보기</Link>
            </div>
            {makeArr(order.items).map((item, idx) => {
              return (
                <div>
                  <MyUsedItemList key={idx} item={item} isCart={false} />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default OrderList;
