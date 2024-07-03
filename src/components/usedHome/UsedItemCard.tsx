import React from "react";
import { Link } from "react-router-dom";
import { MyUsedItemType } from "../../types/usedType";

interface UsedItemCardProps {
  item: MyUsedItemType;
}

const UsedItemCard = ({ item }: UsedItemCardProps) => {
  return (
    <Link
      to={`/usedHome/detail/${item.itemId}`}
      className=" p-3 rounded-md  cursor-pointer"
    >
      <img
        src={item.imageUrl}
        alt={item.itemName}
        className="w-full h-48 object-cover rounded-md mb-2"
      />
      <h2 className="text-lg font-bold pl-2">{item.itemName}</h2>
      <p className="text-gray-500 pl-2">{item.price.toLocaleString()}원</p>
    </Link>
  );
};

export default UsedItemCard;
