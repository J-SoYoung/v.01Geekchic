import { useState } from "react";
import { useRecoilValue } from "recoil";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { geekChickUser } from "../../atoms/userAtom";
import { editUsedComment, removeUsedComment } from "../../api/firebase";

interface CommentObjProps {
  commentObj: {
    commentId: string;
    comment: string;
    createdAt: string;
    userId: string;
    nickname: string;
    userAvatar: string;
  };
}

const UsedComment = ({ commentObj }: CommentObjProps) => {
  const { itemId } = useParams();
  const loginUser = useRecoilValue(geekChickUser);
  const [isCommentEdit, setIsCommentEdit] = useState(false);
  const [editComment, setEditComment] = useState(commentObj.comment);

  const queryClient = useQueryClient();

  const commentRemoveMutation = useMutation({
    mutationFn: async (commentId) => {
      await removeUsedComment(itemId as string, commentId, commentObj.userId);
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
  const onClickRemoveUsedComment = (commentId: string) => {
    if (loginUser.userId === commentObj.userId && itemId) {
      commentRemoveMutation.mutate(commentId);
    }
  };

  const commentEditMutation = useMutation({
    mutationFn: async (editCommentData) => {
      await editUsedComment(itemId, commentObj.commentId, editCommentData);
      setIsCommentEdit(false);
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
  const onClickEditUsedComment = async () => {
    const editCommentData = {
      ...commentObj,
      comment: editComment,
    };
    commentEditMutation.mutate(editCommentData);
  };

  return (
    <div className="flex border-b py-6">
      <img
        src={commentObj.userAvatar}
        alt={commentObj.nickname}
        className="w-[60px] h-[60px]  mr-4 object-cover rounded-full border"
      />
      <div className="w-full">
        <div className="flex mb-2 items-end justify-between">
          <div className="flex">
            <div className="font-semibold">{commentObj.nickname}</div>
            {/* ⭕버튼 컴포넌트 만들기. 똑같은버튼 중복임 */}
            {loginUser.userId === commentObj.userId &&
              (isCommentEdit ? (
                <>
                  <button
                    onClick={onClickEditUsedComment}
                    className="w-[60px] ml-2 px-2 py-1 bg-gray-200 rounded-md"
                  >
                    저장
                  </button>

                  <button
                    onClick={() => setIsCommentEdit(false)}
                    className="w-[60px] ml-2 px-2 py-1 bg-gray-200 rounded-md"
                  >
                    취소
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setIsCommentEdit(true)}
                    className="w-[60px] ml-2 px-2 py-1 bg-gray-200 rounded-md"
                  >
                    수정
                  </button>

                  <button
                    onClick={() =>
                      onClickRemoveUsedComment(commentObj.commentId)
                    }
                    className="w-[60px] ml-2 bg-gray-200 rounded-md"
                  >
                    삭제
                  </button>
                </>
              ))}
          </div>
          <div className="text-sm text-gray-500">
            {commentObj.createdAt.split("T")[0]}
          </div>
        </div>

        {isCommentEdit ? (
          <>
            <input
              type="text"
              defaultValue={commentObj.comment}
              onChange={(e) => {
                setEditComment(e.target.value);
              }}
              className="w-full py-2"
            />
          </>
        ) : (
          <div className="text-gray-800">{commentObj.comment}</div>
        )}
      </div>
    </div>
  );
};

export default UsedComment;
