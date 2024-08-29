import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addOrUpdateToCart, getCart, removeFromCart } from "../api/firebase";
import { useRecoilValue } from "recoil";
import { userState } from "../atoms/userAtom";

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
interface CartUpdateVariables {
  carts: CartProducts;
}
interface CartRemoveVariables {
  userId: string;
  id: string;
}

export default function useCart() {
  const queryClient = useQueryClient();
  const user = useRecoilValue(userState);
  const userId = user?.uid;

  const cartQuery = useQuery<CartProducts[]>({
    queryKey: ["carts", userId || ""],
    queryFn: () => getCart(userId as string),
    enabled: !!userId,
  });

  const addOrUpdateItem = useMutation<void, Error, CartUpdateVariables>({
    mutationFn: ({ carts }) => addOrUpdateToCart(userId as string, carts),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["carts", userId],
      });
    },
  });
  const removeItem = useMutation<void, Error, CartRemoveVariables>({
    mutationFn: ({ id }) => removeFromCart(userId as string, id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["carts", userId],
      });
    },
  });
  return { cartQuery, addOrUpdateItem, removeItem };
}
