import React from "react";
import { useLocation } from "react-router-dom";

interface VideoId {
  kind: string;
  videoId: string;
}

interface Snippet {
  price: number;
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: {
    default: {
      url: string;
      width: number;
      height: number;
    };
    medium: {
      url: string;
      width: number;
      height: number;
    };
    high: {
      url: string;
      width: number;
      height: number;
    };
  };
  channelTitle: string;
  liveBroadcastContent: string;
  publishTime: string;
}

interface Video {
  kind: string;
  etag: string;
  id: VideoId;
  snippet: Snippet;
}
export default function ProductsDtail() {
  const location = useLocation();
  const { product } = location.state as { product: Video };
  const { title, thumbnails, price } = product.snippet;
  return (
    <div className="h-full min-h-screen w-[600px]">
      <img
        className="w-[600px] h-[450px]"
        src={thumbnails.high.url}
        alt={title}
      />
      <div className="flex m-[30px] gap-[20px]">
        <div className="w-[100px] h-[100px] bg-[#BEBEBE]"></div>
        <div className="w-[100px] h-[100px] bg-[#BEBEBE]"></div>
      </div>
      <p className="text-lg text-left ml-[30px] mt-[25px]">구매가</p>
      <p className="text-2xl font-bold text-left ml-[30px]">{`${price} 원`}</p>
      <h1 className="text-lg text-left ml-[30px] mt-[15px]">{title}</h1>
      <form action="">
        <select name="" id="">
          ss
        </select>
      </form>
      <button className="w-[220px] py-2 bg-[#fff] text-[#8F5BBD] border border-[#8F5BBD] rounded-md hover:bg-[#8F5BBD] hover:text-[#fff] duration-200">
        상품으로 바로가기
      </button>
      <button className="w-[220px] py-2 bg-[#fff] text-[#8F5BBD] border border-[#8F5BBD] rounded-md hover:bg-[#8F5BBD] hover:text-[#fff] duration-200">
        상품으로 바로가기
      </button>
    </div>
  );
}
