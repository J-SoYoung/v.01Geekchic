import React from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "../../types/mainType";

export default function ProductCard({ product }: { product: Product }) {
  const { image, id } = product;
  const navigate = useNavigate();
  return (
    <li
      onClick={() => {
        navigate(`/products/detail/${id}`, {
          state: { product },
        });
      }}
      className="border rounded-md truncate cursor-pointer"
    >
      <img className="w-[120px] h-[130px] " src={image} alt="img" />
    </li>
  );
}
