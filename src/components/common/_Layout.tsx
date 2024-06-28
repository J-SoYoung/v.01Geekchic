import React from "react";
import { Link } from "react-router-dom";

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
    </div>
  );
};
export default Layout;
