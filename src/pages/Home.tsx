import React from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/common/Header";
import SearchHeader from "../components/common/SearchHeader";

export default function Home() {
  const { keyword } = useParams();
  console.log(keyword);
  return (
    <div className="h-[100vh]">
      <Header />
      <SearchHeader />
      <div className="w-full h-[300px] mt-[30px]">
        <img
          className="object-cover object-center w-[100%] h-[100%]"
          src="/public/img/mainImg.jpg"
          alt="mainImage"
        />
      </div>
      <div className="text-3xl">HOME {keyword}</div>
      <Link to="/api/login">
        <h2 className="text-2xl">Login</h2>
      </Link>
    </div>
  );
}
