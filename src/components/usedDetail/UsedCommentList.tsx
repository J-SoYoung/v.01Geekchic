import React from "react";
import UsedComment from "./UsedComment";

//
interface CommentListProps {
  reviews: {
    reviewId: string;
    reviewInfo: {
      userId: string;
      userName: string;
      userAvatar: string;
      review: string;
      createdAt: string;
    };
  }[];
}

const UsedCommentList = ({ reviews }: CommentListProps) => {
  return (
    <div className="mb-10">
      <div className="text-lg font-bold mb-4">댓글 {reviews.length}</div>
      {/* 리뷰 보여주기 */}
      {reviews.map((r) => (
        <UsedComment
          key={r.reviewId}
          reviewId={r.reviewId}
          userAvatar={r.reviewInfo.userAvatar}
          userName={r.reviewInfo.userName}
          createdAt={r.reviewInfo.createdAt}
          review={r.reviewInfo.review}
        />
      ))}
    </div>
  );
};

export default UsedCommentList;
