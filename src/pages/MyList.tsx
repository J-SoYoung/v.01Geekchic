import React from "react";
import BuyList from "../components/myPage/BuyList";
import Cart from "../components/myPage/Cart";
import Layout from "../components/common/_Layout";
import { useParams } from "react-router-dom";

const MyList = () => {
  const { list } = useParams();

  return (
    <Layout title={list == "cart" ? "장바구니" : "주문내역"}>
      <div className="h-[100vh]">
        <h1>{list == "cart" ? <Cart /> : <BuyList />}</h1>
      </div>
    </Layout>
  );
};

export default MyList;
