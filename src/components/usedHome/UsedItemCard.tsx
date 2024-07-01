import React from "react";
import { Link } from "react-router-dom";

interface UsedItemsCardProps {
  id: string;
  title: string;
  price: string;
  imageUrl: string;
}

const ProductCard: React.FC<UsedItemsCardProps> = ({
  id,
  title,
  price,
  imageUrl,
}) => {
  return (
    <Link to={`detail/${id}`} className="border rounded-md p-4 cursor-pointer">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="text-gray-500">{price}</p>
    </Link>
  );
};

export default ProductCard;
