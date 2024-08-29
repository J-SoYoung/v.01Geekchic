import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeComment } from "../../api/firebase";
import { useRecoilValue } from "recoil";
import { userState } from "../../atoms/userAtom";
import { useParams } from "react-router-dom";

export interface Comment {
  id: string;
  text: string;
  rank: number;
  createdAt: string;
  uid: string;
  userPhoto: string;
  displayName: string;
}

export default function CommentBtn(comments: Comment) {
  const productId = useParams<{ productId: string }>();
  const [isCommentEdit, setIsCommentEdit] = useState(false);
  const loginUser = useRecoilValue(userState);
  const uid = loginUser?.uid;
  console.log(comments);
  console.log(productId);

  const queryClient = useQueryClient();
  const removeCommentItem = useMutation<void, Error, Comment>({
    mutationFn: async ({ uid, id }) => await removeComment(uid, id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments"],
      });
    },
  });

  const onClickRemoveComment = (id: string) => {
    if (productId && id) {
      removeCommentItem.mutate({ productId, id });
    }
  };

  return (
    <div className="flex justify-end -mt-[55px] mr-[30px]">
      {isCommentEdit ? (
        <>
          <button className="w-[40px] h-[40px] ml-2 mb-2 bg-gray-200 rounded-md">
            저장
          </button>
          <button
            onClick={() => setIsCommentEdit(false)}
            className="w-[40px] h-[40px] mr-5 ml-2 mb-2 bg-gray-200 rounded-md"
          >
            취소
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => setIsCommentEdit(true)}
            className="w-[40px] h-[40px] ml-2 mb-2 bg-gray-200 rounded-md"
          >
            수정
          </button>
          <button
            onClick={() => onClickRemoveComment(comments.id)}
            className="w-[40px] h-[40px] mr-5 ml-2 mb-2 bg-gray-200 rounded-md"
          >
            삭제
          </button>
        </>
      )}
    </div>
  );
}
