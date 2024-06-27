import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";

export default function SearchHeader() {
  const [text, setText] = useState("");

  return (
    <header className="w-[600px] flex p-4 text-2xl  mb-4">
      <form className="w-full flex">
        <input
          className="w-8/12 p-2 outline-none bg-[#EEE] text-[#808080] rounded-[8px] ml-[20px]"
          type="text"
          placeholder="상품검색"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="bg-zinc-600 px-4">
          <BsSearch />
        </button>
      </form>
    </header>
  );
}
