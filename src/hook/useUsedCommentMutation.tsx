import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editUsedComment, removeUsedComment } from "../api/firebase";

export const useRemoveComment = (itemId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (commentId: string) => {
      await removeUsedComment(itemId, commentId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(
        {
          queryKey: ["usedDetailItem"],
          refetchType: "active",
          exact: true,
        },
        { throwOnError: true, cancelRefetch: true }
      );
    },
  });
};

export const useEditComment = (itemId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (editCommentData) => {
      await editUsedComment(itemId, editCommentData) ;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["usedDetailItem"],
        refetchType: "active",
        exact: true,
      });
    },
  });
};
