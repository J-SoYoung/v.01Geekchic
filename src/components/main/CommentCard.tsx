import React from "react";
import { useParams } from "react-router-dom";
import useComment from "../../hook/useComment";
import CommentBtn from "./CommentBtn";

import EmptyStar from "../../assets/icons/EmptyStar.svg";
import FilledStar from "../../assets/icons/FilledStar.svg";

export default function CommentCard() {
  const { id } = useParams<{ id: string }>();
  const {
    commentQuery: { isLoading, data: comments },
  } = useComment(id as string);

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  }
  {
    isLoading && <p>Loading..</p>;
  }
  return (
    <div className="text-[14px] mt-[50px]">
      {comments && comments.length > 0 ? (
        comments?.map((comment) => (
          <div key={comment.id} className="mt-[50px]">
            <div className="flex ml-[40px]">
              <img
                src={comment.userPhoto}
                alt={comment.displayName}
                className="w-[60px] h-[60px] object-cover rounded-full border"
              />
              <div className="mt-[5px] ml-[15px]">
                <h3 className="text-left text-lg font-bold">
                  {comment.displayName}
                </h3>
                <p className="text-sm">{formatDate(comment.createdAt)}</p>
              </div>
              <div className="flex mt-[10px] ml-[250px]">
                {Array.from({ length: 5 }).map((_, index) => (
                  <img
                    key={index}
                    src={index < comment.rank ? FilledStar : EmptyStar}
                    alt={index < comment.rank ? "Filled Star" : "Empty Star"}
                    className="w-[20px] h-[20px]"
                  />
                ))}
              </div>
            </div>
            <CommentBtn key={comment.id} comments={comment} />
          </div>
        ))
      ) : (
        <p>리뷰를 작성해 보세요.</p>
      )}
    </div>
  );
}
