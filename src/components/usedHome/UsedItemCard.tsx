import React from "react";

interface ProductCardProps {
  title: string;
  price: string;
  imageUrl: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  price,
  imageUrl,
}) => {
  return (
    <div className="border rounded-md p-4">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="text-gray-500">{price}</p>
    </div>
  );
};

export default ProductCard;
