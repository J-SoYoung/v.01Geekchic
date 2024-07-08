import React from "react";
import Layout from "../components/myPage/_Layout";
import Icon_Pencile from "../assets/icons/pencil.svg";

import { userData } from "../types/dummyData";
import { UserType } from "../types/usedType";

const user: UserType = userData[0];

const MyProfile = () => {
  return (
    <Layout title="내 프로필 관리">
      
      <div className="h-[100vh] p-8">
        <div>
          <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-10 relative">
            <img
              src={user.userAvatar}
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center cursor-pointer">
              <img src={Icon_Pencile} alt="profile_img_edit" />
            </button>
          </div>
        </div>
        <div className="text-left">
          <div className="border-b pt-5">
            <span className="block text-sm text-gray-500">닉네임</span>
            <span className="block text-lg p-2">{user.nickname}</span>
          </div>
          <div className="border-b pt-5">
            <span className="block text-sm text-gray-500">이름</span>
            <span className="block text-lg p-2">{user.userName}</span>
          </div>
          <div className="border-b pt-5">
            <span className="block text-sm text-gray-500">전화번호</span>
            <span className="block text-lg p-2">{user.phone}</span>
          </div>
          <div className="border-b pt-5">
            <span className="block text-sm text-gray-500">배송지</span>
            <span className="block text-lg p-2">{user.address}</span>
          </div>
        </div>
        <button className="my-20 w-full py-3 bg-[#8F5BBD] text-white rounded-lg">
          수정하기
        </button>
      </div>
    </Layout>
  );
};

export default MyProfile;
