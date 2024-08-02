import React from "react";
import { removeItemComments } from "../../api/firebase";
import { useParams } from "react-router-dom";

interface CommentProps {
  reviewId: string;
  userAvatar: string;
  userName: string;
  createdAt: string;
  review: string;
}

const UsedComment = ({
  reviewId,
  userAvatar,
  userName,
  createdAt,
  review,
}: CommentProps) => {
  const { id } = useParams();

  const onClickUsedCommentRemove = (reviewId: string) => {
    if(id)removeItemComments(id, reviewId);
  };

  return (
    <div className="flex border-b py-6">
      <img
        src={userAvatar}
        alt={userName}
        className="w-[60px] h-[60px]  mr-4 object-cover rounded-full border"
      />
      <div className="w-full">
        <div className="flex mb-2 items-end justify-between">
          <div className="flex">
            <div className="font-semibold">{userName}</div>
            <button className="ml-2 px-2 py-1 bg-gray-200 rounded-md">
              수정
            </button>
            <button
              onClick={() => onClickUsedCommentRemove(reviewId)}
              className="w-[60px] ml-2 border bg-gray-200 rounded-md"
            >
              삭제
            </button>
          </div>
          <div className="text-sm text-gray-500">{createdAt}</div>
        </div>
        <div className="text-gray-800">{review}</div>
      </div>
    </div>
  );
};

export default UsedComment;
