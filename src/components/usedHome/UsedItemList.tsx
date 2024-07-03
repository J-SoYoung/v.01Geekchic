import React from "react";
import UsedItemCard from "./UsedItemCard";
import { usedItems } from "../../types/dummyData";

const UsedItemList = () => {
  console.log(usedItems);
  return (
    <div className="p-8 pt-4 grid grid-cols-2 gap-4 mb-24">
      {usedItems.map((item) => (
        <UsedItemCard key={item.itemId} item={item} />
      ))}
    </div>
  );
};

export default UsedItemList;
