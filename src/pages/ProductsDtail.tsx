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

export default function ProductsDtail() {
  const location = useLocation();
  const { product } = location.state as { product: Product };
  const { description, image, price } = product;
  return (
    <div className="h-[1000px] min-h-screen w-[600px]">
      <img className="w-[600px] h-[450px]" src={image} alt={description} />
      <div className="flex m-[30px] gap-[20px]">
        <div className="w-[100px] h-[100px] bg-[#BEBEBE]"></div>
        <div className="w-[100px] h-[100px] bg-[#BEBEBE]"></div>
      </div>
      <p className="text-lg text-left ml-[30px] mt-[25px]">구매가</p>
      <p className="text-2xl font-bold text-left ml-[30px]">{`${price} 원`}</p>
      <h1 className="text-lg text-left ml-[30px] mt-[15px]">{description}</h1>
      <div className="w-full flex flex-col">
        <select className="p-3 m-7 border-2 border-brand rounded-md outline-none bg-[#EEE]">
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
        </select>
      </div>
      <p className="border border-[#D9D9D9] w-[550px] m-auto"></p>
      <div className="flex justify-center gap-[30px] mt-[30px]">
        <button className="w-[260px] py-3 bg-[#D34D4D] text-[#fff] border border-[#D34D4D] rounded-md hover:bg-[#fff] hover:text-[#D34D4D] duration-200">
          장바구니 담기
        </button>
        <button className="w-[260px] py-3 bg-[#8F5BBD] text-[#fff] border border-[#8F5BBD] rounded-md hover:bg-[#fff] hover:text-[#8F5BBD] duration-200">
          바로구매
        </button>
      </div>
    </div>
  );
}
