import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MessageListType } from "../types/usedType";
import { sendUsedMessage } from "../api/firebase";

export const useSendMessage = ({
  buyerId,
  messageId,
  sellerId,
}: {
  buyerId: string;
  messageId: string;
  sellerId: string;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newMessageObj: MessageListType) => {
      await sendUsedMessage({
        messages: newMessageObj,
        buyerId,
        messageId,
        sellerId,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(
        {
          queryKey: ["usedMessage"],
          refetchType: "active",
          exact: true,
        },
        { throwOnError: true, cancelRefetch: true }
      );
    },
  });
};
