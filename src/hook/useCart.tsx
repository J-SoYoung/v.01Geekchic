import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addOrUpdateToCart, getCart, removeFromCart } from "../api/firebase";
import { CartProducts } from "../types/mainType";

interface CartUpdateVariables {
  carts: CartProducts;
}
interface CartRemoveVariables {
  userId: string;
  id: string;
}

export default function useCart(userId: string) {
  const queryClient = useQueryClient();
  const cartQuery = useQuery<CartProducts[]>({
    queryKey: ["carts", userId || ""],
    queryFn: () => getCart(userId),
    enabled: !!userId,
  });

  const addOrUpdateItem = useMutation<void, Error, CartUpdateVariables>({
    mutationFn: ({ carts }) => addOrUpdateToCart(userId, carts),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["carts", userId],
      });
    },
  });
  const removeItem = useMutation<void, Error, CartRemoveVariables>({
    mutationFn: ({ id }) => removeFromCart(userId, id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["carts", userId],
      });
    },
  });
  return { cartQuery, addOrUpdateItem, removeItem };
}
