import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";

export default function SearchHeader() {
  const [text, setText] = useState("");

  return (
    <header className="w-[600px] flex mb-4">
      <form className="w-full flex">
        <input
          className="w-8/12 p-2 outline-none bg-[#EEE] rounded-l-[8px] ml-[40px] border-0"
          type="text"
          placeholder="상품검색"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="bg-[#EEE] rounded-r-[8px] mt-1 px-4 h-[40px] box-border">
          <BsSearch />
        </button>
      </form>
    </header>
  );
}
