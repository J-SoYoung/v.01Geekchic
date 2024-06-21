import React, { useState } from "react";
import { login, logout } from "../api/firebase";
import { User } from "firebase/auth";

export default function Login() {
  const [user, setUser] = useState<User | void | null>(null);

  const handleLogin = () => {
    login().then(setUser);
  };

  const handleLogout = () => {
    logout().then(setUser);
  };
  return (
    <div>
      {!user ? (
        <button onClick={handleLogin}>Google Login</button>
      ) : (
        <button onClick={handleLogout}>Google Logout</button>
      )}
    </div>
  );
}
