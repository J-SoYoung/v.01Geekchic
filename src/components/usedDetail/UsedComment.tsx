import React from "react";
import { removeItemComments } from "../../api/firebase";
import { useParams } from "react-router-dom";

interface CommentProps {
  commentId: string;
  comment: string;
  createdAt: string;
  userId: string;
  nickname: string;
  userAvatar: string;
}

const UsedComment = ({
  commentId,
  comment,
  createdAt,
  userId,
  userAvatar,
  nickname,
}: CommentProps) => {
  const { id } = useParams();

  const onClickUsedCommentRemove = (commentId: string) => {
    if (id) removeItemComments(id, commentId, userId);
  };

  return (
    <div className="flex border-b py-6">
      <img
        src={userAvatar}
        alt={nickname}
        className="w-[60px] h-[60px]  mr-4 object-cover rounded-full border"
      />
      <div className="w-full">
        <div className="flex mb-2 items-end justify-between">
          <div className="flex">
            <div className="font-semibold">{nickname}</div>
            <button className="ml-2 px-2 py-1 bg-gray-200 rounded-md">
              수정
            </button>
            <button
              onClick={() => onClickUsedCommentRemove(commentId)}
              className="w-[60px] ml-2 border bg-gray-200 rounded-md"
            >
              삭제
            </button>
          </div>
          <div className="text-sm text-gray-500">{createdAt.split('T')[0]}</div>
        </div>
        <div className="text-gray-800">{comment}</div>
      </div>
    </div>
  );
};

export default UsedComment;
