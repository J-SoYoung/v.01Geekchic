import React, { useEffect, useState } from "react";
import { getCommentItems } from "../../api/firebase";
import { useParams } from "react-router-dom";

interface Comment {
  id: string;
  text: string;
  rank: number;
  createdAt: string;
  uid: string;
  userPhoto: string;
  displayName: string;
}

export default function CommentCard() {
  // const user = useRecoilValue(userState);
  const { id } = useParams<{ id: string }>();
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    if (id) {
      getCommentItems(id).then(setComments);
    }
  }, [id]);

  return (
    <div>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id}>
            <img src={comment.userPhoto} alt={comment.displayName} />
            <h3>{comment.displayName}</h3>
            <p>{comment.text}</p>
            <p>Rating: {comment.rank}</p>
          </div>
        ))
      ) : (
        <p>리뷰를 작성해 보세요.</p>
      )}
    </div>
  );
}
