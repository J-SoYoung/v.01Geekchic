import React from "react";
import { useQuery } from "@tanstack/react-query";
import getOrderItems from "../api/firebase";
import { useRecoilValue } from "recoil";
import { userState } from "../atoms/userAtom";

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
  const user = useRecoilValue(userState);
  const userId = user?.uid;

  const {
    isLoading,
    error,
    data: orders,
  } = useQuery<getOrderDetails[]>({
    queryKey: ["orders", userId],
    queryFn: () => getOrderItems(userId as string),
    enabled: !!userId, // userId가 존재할 때만 실행
  });

  if (isLoading) return <p>Loading..</p>;
  if (error) return <p>Something is wrong</p>;
  console.log(orders);
  return <div>주문내역</div>;
}
