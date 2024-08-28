import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRecoilValue } from "recoil";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { newComment } from "../../api/firebase";
import { userState } from "../../atoms/userAtom";

import EmptyStar from "../../assets/icons/EmptyStar.svg";
import FilledStar from "../../assets/icons/FilledStar.svg";

interface Product {
  id: string;
  title: string;
  category: string;
  description: string;
  price: string;
  image: string;
  options: string[];
}

interface Comment {
  id: string;
  text: string;
  rank: number;
  createdAt: string;
  uid: string;
  userPhoto: string;
  displayName: string;
}

interface AddCommentVariables {
  productId: string;
  comments: Omit<Comment, "id" | "createdAt">;
}

export default function Comment({ product }: { product: Product }) {
  const user = useRecoilValue(userState);
  const queryClient = useQueryClient();
  const productId = product.id;

  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [comment, setComment] = useState<Omit<Comment, "id" | "createdAt">>({
    text: "",
    rank: 0,
    uid: "",
    userPhoto: "",
    displayName: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setComment((comment) => ({ ...comment, [name]: value }));
  };

  const handleStarClick = (rank: number) => {
    setComment((comment) => ({ ...comment, rank }));
  };

  const addcomment = useMutation<void, Error, AddCommentVariables>({
    mutationFn: async ({ productId, comments }) =>
      await newComment(productId, comments),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments"],
      });
    },
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      console.error("User is not authenticated");
      return;
    }

    const comments = {
      text: comment.text ?? "",
      rank: comment.rank ?? 0,
      uid: user.uid,
      userPhoto: user.photoURL || "",
      displayName: user.displayName || "",
    };

    setIsUploading(true);

    await addcomment.mutate({
      productId: productId,
      comments: comments,
    });

    setSuccess("리뷰 추가 완료!");

    setComment({
      text: "",
      rank: 0,
      uid: "",
      userPhoto: "",
      displayName: "",
    });

    setTimeout(() => {
      setSuccess(null);
    }, 4000);

    setIsUploading(false);
  };

  return (
    <>
      {success && <p className="my-2">✅ {success}</p>}
      <h1 className="text-3xl font-bold text-left ml-[25px] mt-[50px]">
        상품 후기
      </h1>
      <form
        className="flex flex-col px-12 gap-1 mt-[25px]"
        onSubmit={handleSubmit}
      >
        <div className="flex w-[30px] ml-[350px] mb-[20px] h-[30px]">
          {Array.from({ length: 5 }).map((_, index) => (
            <img
              key={index}
              src={index < comment.rank ? FilledStar : EmptyStar}
              alt={index < comment.rank ? "Filled Star" : "Empty Star"}
              className="w-[30px] h-[30px] cursor-pointer"
              onClick={() => handleStarClick(index + 1)}
            />
          ))}
        </div>

        <button
          className="w-[70px] h-[40px] ml-[430px] -mb-[30px] z-0 bg-[#000] text-[#fff] border border-[#000] rounded-full hover:bg-[#fff] hover:text-[#000] duration-200"
          disabled={isUploading}
        >
          {isUploading ? "업로드중..." : "등록"}
        </button>
        <input
          className=" border-b-2 border-0 h-[30px]"
          type="text"
          placeholder="리뷰를 작성해주세요."
          name="text"
          value={comment.text ?? ""}
          required
          onChange={handleChange}
        />
      </form>
    </>
  );
}
