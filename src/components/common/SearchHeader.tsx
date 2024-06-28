import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";

export default function SearchHeader() {
  const [text, setText] = useState("");

  return (
    <header className="w-[600px] flex mb-4 text-xl ml-[25px]">
      <form className="w-full flex">
        <input
          className="w-9/12 p-2 outline-none bg-[#EEE] placeholder-gray-500 rounded-l-[8px] border-0 pl-4 "
          type="text"
          placeholder="상품검색"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="bg-[#EEE] rounded-r-[8px] mt-1 px-4 h-[44px] box-border">
          <BsSearch />
        </button>
      </form>
    </header>
  );
}
