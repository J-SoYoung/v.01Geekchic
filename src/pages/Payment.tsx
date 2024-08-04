import React from "react";
import { useLocation } from "react-router-dom";

interface Product {
  id: string;
  title: string;
  category: string;
  description: string;
  price: string;
  image: string;
  options: string[];
}

export default function Payment() {
  const location = useLocation();
  const state = location.state as { payProduct?: Product };
  const payProduct = state?.payProduct;

  if (!payProduct) {
    return <div>데이터가 없습니다.</div>;
  }

  const { description, image, price, options } = payProduct;

  console.log(description, image, price, options);
  return (
    <div>
      <p>{description}</p>
      <p>{price}</p>
      <p>{options}</p>
    </div>
  );
}
