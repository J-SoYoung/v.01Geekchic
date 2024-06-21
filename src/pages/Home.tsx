import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div>HOME</div>
      <Link to="/api/login">
        <h2>Login</h2>
      </Link>
    </>
  );
}
