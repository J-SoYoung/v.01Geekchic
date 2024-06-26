import React from "react";
import { Link } from "react-router-dom";

import HomeIcon from "../../assets/icons/nav_home.svg";
import ItemsIcon from "../../assets/icons/nav_items.svg";
import WishIcon from "../../assets/icons/nav_wish.svg";
import UsedIcon from "../../assets/icons/nav_used.svg";
import MyIcon from "../../assets/icons/nav_my.svg";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  isPostButton?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, title, isPostButton }) => {
  return (
    <div className="w-[600px] h-[100%]">
      {/* Header */}
      <header className="p-8 text-right">
        <h1 className="text-2xl font-bold text-left mb-5">{title}</h1>
        {isPostButton && (
          <button className="bg-black text-white px-4 py-2 rounded-md text-right">
            <Link to="/usedPostUpload">등록하기</Link>
          </button>
        )}
      </header>

      {/* Contents */}
      <main className="flex-grow p-4 pt-0">{children}</main>

      {/* Buttom Nav Bar */}
      <nav className="fixed bottom-0 mx-auto w-full max-w-[596px] border-t-2 bg-white">
        <ul className="flex justify-around p-4">
          <Link to="/" className="text-center cursor-pointer">
            <img src={HomeIcon} alt="Home" className="w-6 h-6 mx-auto" />
            <span className="text-xs">홈</span>
          </Link>
          <li className="text-center cursor-pointer">
            <img src={ItemsIcon} alt="Items" className="w-6 h-6 mx-auto" />
            <span className="text-xs">상품</span>
          </li>
          <li className="text-center cursor-pointer">
            <img src={WishIcon} alt="Wish" className="w-6 h-6 mx-auto" />
            <span className="text-xs">관심목록</span>
          </li>
          <Link to="/usedHome" className="text-center cursor-pointer">
            <img src={UsedIcon} alt="Used" className="w-6 h-6 mx-auto" />
            <span className="text-xs">중고거래</span>
          </Link>
          <Link to="/my" className="text-center cursor-pointer">
            <img src={MyIcon} alt="My" className="w-6 h-6 mx-auto" />
            <span className="text-xs">마이</span>
          </Link>
        </ul>
      </nav>
    </div>
  );
};
export default Layout;
