import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getCart } from "../../api/firebase";
import { useRecoilValue } from "recoil";
import { userState } from "../../atoms/userAtom";
import CartItem from "./CartItem";
// import PlusIcon from "../../assets/icons/square_plus.svg";

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

export default function MyCart() {
  // const queryClient = useQueryClient();
  const user = useRecoilValue(userState);
  const userId = user?.uid;
  const { isLoading, data: carts } = useQuery<CartProducts[], Error>({
    queryKey: ["carts", userId || ""],
    queryFn: () => {
      if (userId) {
        return getCart(userId);
      }
      return Promise.reject(new Error("User ID is undefined"));
    },
    enabled: !!userId,
  });
  {
    isLoading && <p>Loading..</p>;
  }
  console.log(carts);
  return (
    <div className="container w-[600px]">
      <div className="flex justify-center mt-[80px] mb-[10px]">
        <h1 className="text-3xl font-bold text-left mb-[20px]">장바구니</h1>
      </div>
      <div className="flex text-lg gap-1 text-left px-11 mb-[10px]">
        <p className="font-bold mr-[5px]">전체</p>
        <p className="text-[#BEBEBE]">{carts?.length}</p>
      </div>
      <p className="border border-[#D9D9D9] w-[520px] m-auto mt-[20px] mb-[30px]"></p>
      <ul className="px-11 py-2 pb-4">
        {carts &&
          carts.map((product) => (
            <CartItem key={product.id} carts={product} /* uid={uid} */ />
          ))}
      </ul>
    </div>
  );
}
