import React from "react";
import TrashIcon from "../../assets/icons/trash.svg";
import Plus from "../../assets/icons/square_plus.svg";
import Minus from "../../assets/icons/square_minus.svg";

export interface MyUsedItemType {
  id: string;
  name: string;
  size: string;
  quantity: number;
  price: number;
  imageUrl: string;
}

interface MyUsedItemListProps {
  myUsedItems: MyUsedItemType[];
  isCart: boolean;
  onQuantityChange?: (id: string, quantity: number) => void;
  onRemove?: (id: string) => void;
}

const MyUsedItemList = ({
  myUsedItems,
  isCart,
  onQuantityChange,
  onRemove,
}: MyUsedItemListProps) => {
  return (
    <div className={isCart ? "border-b mb-8" : ""}>
      {myUsedItems.map((item) => (
        <div key={item.id} className="flex mb-4">
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-20 h-20 object-cover rounded-lg mr-4"
          />
          <div className="w-full flex justify-between ">
            <div>
              <div className="font-semibold">{item.name}</div>
              <div className="text-sm text-gray-500">
                {item.size}
                {!isCart && ` | ${item.quantity}개`}
              </div>
              <div className="font-bold text-lg">
                {item.price.toLocaleString()}원
              </div>
            </div>
            {isCart && (
              <div className="flex">
                <div className="flex items-center">
                  <button
                    onClick={() =>
                      onQuantityChange &&
                      onQuantityChange(item.id, item.quantity - 1)
                    }
                  >
                    <img
                      src={Minus}
                      alt="빼기"
                      className="w-5 h-5 mx-auto mx-2.5"
                    />
                  </button>
                  <span className="">{item.quantity}</span>
                  <button
                    onClick={() =>
                      onQuantityChange &&
                      onQuantityChange(item.id, item.quantity + 1)
                    }
                  >
                    <img
                      src={Plus}
                      alt="추가하기"
                      className="w-5 h-5 mx-auto mx-2.5"
                    />
                  </button>
                </div>
                <button onClick={() => onRemove && onRemove(item.id)}>
                  <img src={TrashIcon} alt="삭제" className="w-5 h-5 mx-auto" />
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyUsedItemList;
