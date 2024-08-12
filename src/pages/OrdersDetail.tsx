import React from "react";
import { useLocation } from "react-router-dom";

interface testProduct {
  title: string;
  description: string;
  price: string;
  image: string;
  options: string[];
  quantity: number;
}

interface getOrderDetails {
  ordersId?: string;
  name: string;
  phone: string;
  address: string;
  paymentMethod: string;
  createdAt?: string;
  items: testProduct[];
}

export default function OrdersDetail() {
  const location = useLocation();
  const { orders } = location.state as { orders: getOrderDetails };

  console.log(orders);
  return (
    <>
      <div>주문내역</div>
      {/* <div>{orders.name}</div> */}
    </>
  );
}
