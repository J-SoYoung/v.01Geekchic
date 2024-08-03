import React from "react";
import UsedComment from "./UsedComment";
import { UsedCommentType } from "../../types/usedType";

interface CommentListProps {
  comments: { [key: string]: UsedCommentType };
}

const UsedCommentList = ({comments}: CommentListProps) => {
  const commentsArr = Object.keys(comments).map((key) => ({
    ...comments[key],
  }));
  
  return (
    <div className="mb-10">
      <div className="text-lg font-bold mb-4">댓글 {commentsArr.length}</div>
      {/* 댓글 보여주기 */}
      {commentsArr.map((c: UsedCommentType) => (
        <UsedComment
          key={c.commentId}
          commentId={c.commentId}
          createdAt={c.createdAt}
          comment={c.comment}
          userId={c.userId}
          nickname={c.nickname}
          userAvatar={c.userAvatar}
        />
      ))}
    </div>
  );
};

export default UsedCommentList;
