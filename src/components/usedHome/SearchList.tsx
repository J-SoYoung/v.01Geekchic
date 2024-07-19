import UsedItemCard from "./UsedItemCard";
import { MyUsedItemType } from "../../types/usedType";

interface UsedItemListProps {
  searchData: MyUsedItemType[];
  onClickfunc: () => void;
}

const SearchList = ({ searchData, onClickfunc }: UsedItemListProps) => {
  return (
    <div className="min-h-screen overflow-auto">
      <p className="text-left px-11">
        전체<span>{searchData.length}</span>
      </p>
      {searchData.length !== 0 ? (
        searchData.map((item) => (
          <div key={item.id} className="p-8 pt-4 grid grid-cols-2 gap-4 mb-24">
            <UsedItemCard item={item} />
          </div>
        ))
      ) : (
        <div className="">검색결과가 없습니다</div>
      )}
      <button onClick={onClickfunc}>중고 메인으로 돌아가기</button>
    </div>
  );
};

export default SearchList;
