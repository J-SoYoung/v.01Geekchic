import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { MyUsedItemType } from "../types/usedType";
import { usedItemLists, usedItemSearch } from "../api/firebase";

import SearchList from "../components/usedHome/SearchList";
import UsedItemList from "../components/usedHome/UsedItemList";
import UsedSearchBar from "../components/usedHome/UsedSearchBar";

const UsedHome = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: usedItems, isLoading: usedItemLoading } = useQuery<
    MyUsedItemType[],
    Error
  >({
    queryKey: ["usedItems"],
    queryFn: () => usedItemLists(),
  });

  const { data: searchResultData, isLoading: searchLoading } = useQuery<
    MyUsedItemType[],
    Error
  >({
    queryKey: ["searchUsedItems", searchQuery],
    queryFn: () => usedItemSearch(searchQuery),
    enabled: !!searchQuery, // query가 빈 문자열일 때는 쿼리를 실행하지 않습니다
  });

  const onClickSearch = (query: string) => {
    setSearchQuery(query);
    setIsSearching(!!query);
  };

  const handleBackToMain = () => {
    setSearchQuery("");
    setIsSearching(false);
  };

  if (usedItemLoading) return <div>로딩중입니다</div>;

  return (
    <div className="h-[100%] w-[600px]">
      <header className="p-11 pb-4 text-right">
        <h1 className="text-3xl font-bold text-left mb-5 ">
          <Link to="/usedHome">중고거래</Link>
        </h1>
        <button className="bg-black text-white px-4 py-2 mb-5 rounded-md text-right">
          <Link to="/usedPostUpload">등록하기</Link>
        </button>

        {/* 검색바 */}
        <UsedSearchBar onSearch={onClickSearch} />
      </header>

      <div>
        {isSearching ? (
          <SearchList
            searchData={searchResultData || []}
            onClickfunc={handleBackToMain}
            searchLoading={searchLoading}
          />
        ) : (
          usedItems && <UsedItemList usedItems={usedItems} />
        )}
      </div>
    </div>
  );
};

export default UsedHome;
