import React from "react";
import MinusIcon from "../../assets/icons/square_minus.svg";
import PlusIcon from "../../assets/icons/square_plus.svg";
import TrashIcon from "../../assets/icons/trash.svg";
import { addOrUpdateToCart } from "../../api/firebase";
import { removeFromCart } from "../../api/firebase";

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
export default function CartItem({
  carts,
  userId,
}: {
  carts: CartProducts;
  userId?: string;
}) {
  const { id, title, description, price, image, options, quantity } = carts;
  const hadleMinus = () => {
    if (quantity < 2) return;
    if (!userId) {
      console.error("User ID is missing");
      return;
    }
    addOrUpdateToCart(userId, { ...carts, quantity: quantity - 1 });
  };
  const handlePlus = () => {
    if (!userId) {
      console.error("User ID is missing");
      return;
    }
    addOrUpdateToCart(userId, { ...carts, quantity: quantity + 1 });
  };
  const hadleDelete = () => {
    if (!userId) {
      console.error("User ID is missing");
      return;
    }
    removeFromCart(userId, id);
  };

  return (
    <>
      <li className="flex mb-5 w-[550px]">
        <img
          className="w-[130px] h-[130px] rounded-[5px]"
          src={image}
          alt={title}
        />
        <div className="flex text-left px-1 w-[380px]">
          <div className="text-left px-4 w-[380px]">
            <p>{title}</p>
            <p className="mt-[5px] font-bold">{description}</p>
            <p className="text-[#959595]">{options}</p>
            <p className="mt-[25px] text-xl text-nowrap font-bold">{price}원</p>
          </div>
          <div className="flex items-center">
            <img
              className="w-[20px] mr-[5px] cursor-pointer"
              src={MinusIcon}
              alt="MinusIcon"
              onClick={hadleMinus}
            />
            <p className="w-[20px] mr-[5px]">{quantity}</p>
            <img
              className="w-[20px] mr-[5px] cursor-pointer"
              src={PlusIcon}
              alt="PlusIcon"
              onClick={handlePlus}
            />

            <img
              className="w-[20px] cursor-pointer"
              src={TrashIcon}
              alt="TrashIcon"
              onClick={hadleDelete}
            />
          </div>
        </div>
      </li>
    </>
  );
}
