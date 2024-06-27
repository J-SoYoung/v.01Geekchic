import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/common/Header";
import SearchHeader from "../components/common/SearchHeader";

export default function Home() {
  return (
    <>
      <Header />
      <SearchHeader />
      <div className="text-3xl">HOME</div>
      <Link to="/api/login">
        <h2 className="text-2xl">Login</h2>
      </Link>
    </>
  );
}
