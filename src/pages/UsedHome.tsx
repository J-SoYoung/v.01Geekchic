import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";

import { loadUserData } from "../api/firebase";
import { geekChickUser } from "../atoms/userAtom";
import { useLoadUsedItem, useSearchUsedItem } from "../hook/useUsedHome";

import SearchList from "../components/usedHome/SearchList";
import UsedItemList from "../components/usedHome/UsedItemList";
import UsedSearchBar from "../components/usedHome/UsedSearchBar";
import UsedHomeSkeletonGrid from "../components/skeleton/UsedHomeSkeletonGrid";

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

  const {
    data: usedItems,
    isPending: usedItemLoading,
    isError: usedItemError,
  } = useLoadUsedItem();

  const { data: searchResultData, isPending: searchLoading } =
    useSearchUsedItem(searchQuery);

  const onClickSearch = (query: string) => {
    setSearchQuery(query);
    setIsSearching(!!query);
  };

  const onClickBackToUsedHome = () => {
    setSearchQuery("");
    setIsSearching(false);
  };

  if (usedItemError)
    return (
      <div>
        <p>데이터를 가져오는 동안 문제가 발생했습니다</p>
        <p className="cursor-pointer" onClick={() => window.location.reload()}>
          geekchic 중고 메인 페이지 새로고침
        </p>
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
        <UsedSearchBar onSearch={onClickSearch} />
      </header>

      <div>
        {usedItemLoading && <UsedHomeSkeletonGrid />}
        {isSearching ? (
          <SearchList
            searchData={searchResultData || []}
            onClickfunc={onClickBackToUsedHome}
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
