import React, { useState, ChangeEvent, FormEvent } from "react";
import { newComment } from "../../api/firebase";
import { useRecoilValue } from "recoil";
import { userState } from "../../atoms/userAtom";

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

export default function Comment({ product }: { product: Product }) {
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [comment, setComment] = useState<Omit<Comment, "id" | "createdAt">>({
    text: "",
    rank: 0,
    uid: "",
    userPhoto: "",
    displayName: "",
  });
  const user = useRecoilValue(userState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setComment((comment) => ({ ...comment, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      console.error("User is not authenticated");
      return;
    }
    setIsUploading(true);
    await newComment(product.id, {
      text: comment.text ?? "",
      rank: comment.rank ?? 0,
      uid: user.uid,
      userPhoto: user.photoURL || "",
      displayName: user.displayName || "",
    });
    setSuccess("성공적으로 제품이 추가되었습니다.");
    setTimeout(() => {
      setSuccess(null);
    }, 4000);
    setIsUploading(false);
  };
  console.log(user);
  return (
    <>
      {success && <p className="my-2">✅ {success}</p>}
      <form className="flex flex-col px-12 gap-1" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="리뷰를 작성해주세요."
          name="text"
          value={comment.text ?? ""}
          required
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="평점"
          name="rank"
          value={comment.rank ?? 0}
          required
          onChange={handleChange}
        />
        <button
          className="mb-[100px] mt-[10px] py-3 bg-[#8F5BBD] text-[#fff] border border-[#8F5BBD] rounded-md hover:bg-[#fff] hover:text-[#8F5BBD] duration-200"
          disabled={isUploading}
        >
          {isUploading ? "업로드중..." : "리뷰등록"}
        </button>
      </form>
    </>
  );
}
