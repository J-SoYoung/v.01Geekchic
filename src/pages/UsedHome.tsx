import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { UsedItemType } from "../types/usedType";
import { loadUserData, usedItemLists, usedItemSearch } from "../api/firebase";

import SearchList from "../components/usedHome/SearchList";
import UsedItemList from "../components/usedHome/UsedItemList";
import UsedSearchBar from "../components/usedHome/UsedSearchBar";
import { useRecoilState } from "recoil";
import { geekChickUser } from "../atoms/userAtom";

const UsedHome = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useRecoilState(geekChickUser);

  useEffect(() => {
    const fetchData = async () => {
      const data = await loadUserData(user.userId);
      data && setUser(data);
    };
    fetchData();
  }, [user.userId, setUser]);

  // GET 중고 데이터 & Update recoil State
  const {
    data: usedItems,
    isLoading: usedItemLoading,
    isError: usedItemError,
  } = useQuery<UsedItemType[], Error>({
    queryKey: ["usedItems"],
    queryFn: () => usedItemLists(),
  });

  const { data: searchResultData, isLoading: searchLoading } = useQuery<
    UsedItemType[],
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

  if (usedItemError)
    return (
      <div>
        <p>데이터를 가져오는 동안 문제가 발생했습니다</p>
        <Link to={"/"}>메인으로 이동하기</Link>
      </div>
    );

  return (
    <div className="min-h-screen w-[600px]">
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
        {usedItemLoading && <div className="min-h-screen">로딩중입니다</div>}
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
