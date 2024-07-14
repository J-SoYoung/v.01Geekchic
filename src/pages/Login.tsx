import React, { useEffect, useState } from "react";
import { login, logout, onUserStateChange } from "../api/firebase";
import { User } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "../atoms/userAtom";
import { fetchAdminUser } from "../api/firebase";
interface AdminUser extends User {
  isAdmin: boolean;
}

export default function Login() {
  // const [localUser, setLocalUser] = useState<AdminUser | null>(null);
  // const navigate = useNavigate();
  // const setUser = useSetRecoilState(userState);

  // useEffect(() => {
  //   onUserStateChange((user) => {
  //     console.log(user);
  //     setLocalUser(user as AdminUser);
  //     setUser(user as AdminUser);
  //   });
  // }, [setUser]);

  // const handleLogin = async () => {
  //   // login().then((user) => {
  //   //   setLocalUser(user as AdminUser);
  //   //   setUser(user as AdminUser);
  //   //   navigate("/");
  //   // });
  //   // try {
  //   //   const user = await login();
  //   //   setLocalUser(user as AdminUser);
  //   //   setUser(user as AdminUser);
  //   //   if (user) {
  //   //     navigate("/");
  //   //   }
  //   // } catch (error) {
  //   //   console.error("Login error:", error);
  //   // }
  //   const user = await login();
  //   if (user) {
  //     setLocalUser(user as AdminUser);
  //     setUser(user as AdminUser);
  //     navigate("/");
  //   }
  // };

  // const handleLogout = async () => {
  //   // logout().then(() => {
  //   //   setLocalUser(null);
  //   //   setUser(null);
  //   // });
  //   await logout();
  //   setLocalUser(null);
  //   setUser(null);
  // };

  const [localUser, setLocalUser] = useState<AdminUser | null>(null);
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    onUserStateChange(async (user) => {
      if (user) {
        const adminUser = await fetchAdminUser(user);
        setLocalUser({ ...adminUser });
        setUser({ ...adminUser });
      } else {
        setLocalUser(null);
        setUser(null);
      }
    });
  }, [setUser]);

  const handleLogin = async () => {
    const user = await login();
    if (user) {
      const adminUser = await fetchAdminUser(user);
      setLocalUser({ ...adminUser });
      setUser({ ...adminUser });
      navigate("/");
    }
  };

  const handleLogout = async () => {
    await logout();
    setLocalUser(null);
    setUser(null);
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
        {!localUser ? (
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
        {!localUser ? (
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
        <div className="mt-[15px]">
          {localUser && localUser.isAdmin && (
            <button className="bg-white text-black text-[18px] w-[350px] h-[48px] rounded hover:brightness-90 border border-black">
              admin
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
