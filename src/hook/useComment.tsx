import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCommentItems, newComment } from "../api/firebase";
import { Comment } from "../types/mainType";

interface AddCommentVariables {
  id: string;
  comments: Omit<Comment, "id" | "createdAt">;
}

export default function useComment(id: string) {
  const queryClient = useQueryClient();
  const commentQuery = useQuery<Comment[], Error>({
    queryKey: ["comments"],
    queryFn: () => getCommentItems(id as string),
  });

  const addComment = useMutation<void, Error, AddCommentVariables>({
    mutationFn: async ({ id, comments }) => await newComment(id, comments),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments"],
      });
    },
  });

  return { commentQuery, addComment };
}
