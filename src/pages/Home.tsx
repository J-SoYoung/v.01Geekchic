import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div className="text-3xl">HOME</div>
      <Link to="/api/login">
        <h2 className="text-2xl">Login</h2>
      </Link>
    </>
  );
}
