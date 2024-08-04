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
  const { description, image, price, options, title } = payProduct;

  return (
    <div className="h-[1500px] min-h-screen w-[600px]">
      <div className="flex justify-center mt-[80px] mb-[10px]">
        <h1 className="text-3xl font-bold text-left mb-[20px]">관심물품</h1>
      </div>
      <div className="flex mb-4 ml-[30px] w-[550px]">
        <img
          src={image}
          alt={title}
          className="w-[150px] h-[150px] rounded-[5px]"
        />
        <div className="text-left px-4 w-[380px] mt-[20px]">
          <p>{title}</p>
          <p>{description}</p>
          <p>{options}</p>
        </div>
        <p className="mt-[150px] mr-[30px]">{price}</p>
      </div>
    </div>
  );
}
