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
    <div className="w-[600px] mt-[80px] h-screen">
      <div className="flex justify-center">
        <img
          className="w-[500px] h-[440px] mb-[80px]"
          src="/public/img/loginLogo.png"
          alt="loginLogo"
        />
      </div>
      <div className="mb-[15px]">
        {!user ? (
          <button
            className="bg-white text-black text-[18px] w-[350px] h-[48px] rounded hover:brightness-90 border border-black"
            onClick={handleLogin}
          >
            <img
              className="inline w-[38px] h-[38px]"
              src="/public/img/googleLogo.png"
              alt="googleLogo"
            />
            Google로 로그인
          </button>
        ) : (
          <button
            className="bg-white text-black text-[18px] w-[350px] h-[48px] rounded hover:brightness-90 border border-black"
            onClick={handleLogout}
          >
            <img
              className="inline w-[38px] h-[38px]"
              src="/public/img/googleLogo.png"
              alt="googleLogo"
            />
            Google 로그아웃
          </button>
        )}
      </div>
      <div>
        {!user ? (
          <button
            className="bg-[#EFDB30] text-black text-[18px] w-[350px] h-[48px] rounded hover:brightness-90 border border-black"
            onClick={handleLogin}
          >
            <img
              className="inline w-[16] h-[15px] mr-[13px]"
              src="/public/img/kakaoLogo.png"
              alt="googleLogo"
            />
            카카오로 로그인
          </button>
        ) : (
          <button
            className="bg-white text-black text-[18px] w-[350px] h-[48px] rounded hover:brightness-90 border border-black"
            onClick={handleLogout}
          >
            <img
              className="inline w-[16px] h-[15px] mr-[13px]"
              src="/public/img/kakaoLogo.png"
              alt="googleLogo"
            />
            카카오 로그아웃
          </button>
        )}
      </div>
    </div>
  );
}
