import { Link } from "react-router-dom";
import { UsedItemType } from "../../types/usedType";
import { IsSeller } from "../common/IsSeller";

interface UsedItemCardProps {
  item: UsedItemType;
}

const UsedItemCard = ({ item }: UsedItemCardProps) => {
  const isSoldout = item.quantity < 1;

  return (
    <Link
      to={`/usedHome/detail/${item.id}`}
      className={`p-3 rounded-md cursor-pointer relative ${
        isSoldout && "opacity-50"
      }`}
    >
      <IsSeller sellerId={item?.seller.sellerId} />
      {item.imageArr ? (
        <img
          src={item.imageArr[0]}
          alt={item.itemName}
          className="w-full h-48 object-cover rounded-md mb-2"
        />
      ) : (
        <img
          src="/"
          className="w-full h-48 object-cover rounded-md mb-2 border"
        />
      )}
      <div className="flex">
        <h2 className="text-lg font-bold mr-1 ">{item.itemName}</h2>
      </div>
      <div className="flex items-center justify-center">
        <div className="w-full flex text-gray-500">
          <p>{item.price.toLocaleString()}원</p>
          <p>{isSoldout? '( 품절 )' : `( ${item.quantity}개 남음 )`}</p>
        </div>
      </div>
    </Link>
  );
};

export default UsedItemCard;
