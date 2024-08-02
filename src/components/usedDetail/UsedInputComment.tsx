import React, { useState } from "react";

interface CommentListProps {
  addComment: (review: string) => void;
}

const UsedInputComment = ({ addComment }: CommentListProps) => {
  const [newReview, setNewReview] = useState("");

  const handleAddReview = () => {
    if (newReview.trim()) {
      addComment(newReview);
      setNewReview("");
    }
  };

  return (
    <div className="mb-10">
      {/* 리뷰 입력칸 */}
      <div className="flex mt-4 h-[50px]">
        <input
          type="text"
          className="h-[100%] flex-1 px-4 border rounded-l-md m-0"
          placeholder="댓글을 입력하세요"
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
        />
        <button
          onClick={handleAddReview}
          className="px-4 py-2 bg-[#8F5BBD] text-white rounded-r-md"
        >
          댓글 추가
        </button>
      </div>
    </div>
  );
};

export default UsedInputComment;
