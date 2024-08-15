import React from "react";
import MinusIcon from "../../assets/icons/square_minus.svg";
import PlusIcon from "../../assets/icons/square_plus.svg";
import TrashIcon from "../../assets/icons/trash.svg";

export interface CartProducts {
  id: string;
  title: string;
  category: string;
  description: string;
  price: string;
  image: string;
  options: string;
  quantity: number;
}
export default function CartItem({ carts }: { carts: CartProducts }) {
  const { id, title, description, price, image, options, quantity } = carts;
  return (
    <>
      <li className="flex mb-4 w-[550px] cursor-pointer">
        <img
          className="w-[150px] h-[150px] rounded-[5px]"
          src={image}
          alt={title}
        />
        <div className="text-left px-4 w-[380px]">
          <div className="flex gap-[280px] items-start">
            <h3 className="text-xl font-bold mb-[10px]">{title}</h3>
          </div>
          <p className="text-xl mb-[55px]">{description}</p>
          <p className="text-xl font-bold text-right">{`${price}원`}</p>
        </div>
      </li>
      <p className="border border-[#D9D9D9] w-[520px] m-auto mt-[40px] mb-[45px]"></p>
    </>
  );
}
