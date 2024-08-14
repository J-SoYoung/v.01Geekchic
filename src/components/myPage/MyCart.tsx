import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getCart } from "../../api/firebase";
import { useRecoilValue } from "recoil";
import { userState } from "../../atoms/userAtom";
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
  return <div></div>;
}
