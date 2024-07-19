import React, { useEffect, useState } from "react";
import UsedItemCard from "./UsedItemCard";
import { MyUsedItemType } from "../../types/usedType";
import { usedItemLists } from "../../api/firebase";

const UsedItemList = () => {
  const [usedItems, setUsedItems] = useState<MyUsedItemType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await usedItemLists();
        setUsedItems(data);
      } catch (error) {
        console.error("Error fetching used items:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <p className="text-left px-11">
        전체<span>{usedItems.length}</span>
      </p>
      <div className="p-8 pt-4 grid grid-cols-2 gap-4 mb-24">
        {usedItems.map((item) => (
          <UsedItemCard key={item.id} item={item} />
        ))}
      </div>
    </>
  );
};

export default UsedItemList;
