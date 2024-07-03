import React from "react";
import { useParams } from "react-router-dom";
import Cart from "../components/myPage/Cart";
import Layout from "../components/myPage/_Layout";
import OrderList from "../components/myPage/OrderList";

const MyList = () => {
  const { list } = useParams();

  return (
    <Layout title={list == "cart" ? "장바구니" : "주문내역"}>
      <div className="h-[100vh] p-4">
        <h1>{list == "cart" ? <Cart /> : <OrderList />}</h1>
      </div>
    </Layout>
  );
};

export default MyList;
