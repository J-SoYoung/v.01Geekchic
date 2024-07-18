import UsedItemCard from "./UsedItemCard";
import { MyUsedItemType } from "../../types/usedType";

interface UsedItemListProps {
  searchData: MyUsedItemType[];
}

const SearchList = ({ searchData }: UsedItemListProps) => {
  return (
    <>
      <p className="text-left pl-3 pl-8">
        전체<span>{searchData.length}</span>
      </p>
      <div className="p-8 pt-4 grid grid-cols-2 gap-4 mb-24">
        {searchData.length !== 0 ? (
          searchData.map((item) => <UsedItemCard key={item.id} item={item} />)
        ) : (
          <div>검색결과가 없습니다</div>
        )}
      </div>
      <p>중고 메인으로 돌아가기</p>
    </>
  );
};

export default SearchList;
