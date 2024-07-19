import React, { useState } from "react";
import UsedItemList from "../components/usedHome/UsedItemList";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import { usedItemSearch } from "../api/firebase";
import { MyUsedItemType } from "../types/usedType";
import SearchList from "../components/usedHome/SearchList";
// import UsedSearchHeader from "../components/usedHome/UsedSearchHeader";

const UsedHome = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResultData, setSearchResultData] = useState<MyUsedItemType[]>(
    []
  );

  const onClickSearch = async () => {
    try {
      const data = await usedItemSearch(searchQuery);
      setSearchResultData(data);
      setIsSearching(true);
    } catch (error) {
      console.error(error);
      setIsSearching(false);
    }
  };

  const handleBackToMain = () => {
    setSearchQuery("");
    setSearchResultData([]);
    setIsSearching(false);
  };

  return (
    <div className="h-[100%] w-[600px]">
      <header className="p-11 pb-4 text-right">
        <h1 className="text-3xl font-bold text-left mb-5 ">
          <Link to="/usedHome">중고거래</Link>
        </h1>
        <button className="bg-black text-white px-4 py-2 mb-5 rounded-md text-right">
          <Link to="/usedPostUpload">등록하기</Link>
        </button>

        {/* <UsedSearchHeader onclickFunc={onClickSearch}/> */}
        <div className="flex mb-4 text-xl">
          <div className="flex w-[100%]">
            <input
              className="w-[100%] p-2 outline-none bg-[#EEE] placeholder-gray-500 rounded-l-[8px] border-0 pl-4 "
              type="text"
              placeholder="상품검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              className="bg-[#EEE] rounded-r-[8px] mt-1 px-4 h-[44px] box-border"
              onClick={onClickSearch}
              type="button"
            >
              <BsSearch />
            </button>
          </div>
        </div>
      </header>

      <div className="">
        {isSearching ? (
          <SearchList
            searchData={searchResultData}
            onClickfunc={handleBackToMain}
          />
        ) : (
          <UsedItemList />
        )}
      </div>
    </div>
  );
};

export default UsedHome;
