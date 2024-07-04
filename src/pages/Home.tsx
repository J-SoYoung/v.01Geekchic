import React from "react";
import { useParams } from "react-router-dom";
import Header from "../components/common/Header";
import SearchHeader from "../components/common/SearchHeader";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../components/Home/ProductCard";
import useProducts from "../api/firebase";

export default function Home() {
  interface Video {
    kind: string;
    etag: string;
    id: VideoId;
    snippet: Snippet;
  }

  interface VideoId {
    kind: string;
    videoId: string;
  }

  interface Snippet {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: Thumbnails;
    channelTitle: string;
    liveBroadcastContent: string;
    publishTime: string;
  }

  interface Thumbnails {
    default: Thumbnail;
    medium: Thumbnail;
    high: Thumbnail;
  }

  interface Thumbnail {
    url: string;
    width: number;
    height: number;
  }

  const { keyword } = useParams<{ keyword: string }>();
  const searchKeyword = keyword || "";

  const product = useProducts();

  const {
    isLoading,
    error,
    data: products,
  } = useQuery<Video[], Error>({
    queryKey: ["products", searchKeyword],
    queryFn: () => product.search(searchKeyword),
  });

  {
    isLoading && <p>Loading..</p>;
  }
  {
    error && <p>Something is wrong</p>;
  }
  return (
    <div className="h-full">
      <Header />
      <SearchHeader />
      <div className="w-full h-[300px] mt-[30px]">
        <img
          className="object-cover object-center w-[100%] h-[100%]"
          src="/public/img/mainImg.jpg"
          alt="mainImage"
        />
      </div>
      {keyword ? (
        <div>
          {products?.length !== 0 ? (
            <p className="text-lg font-bold text-left ml-[30px] mt-[30px] mb-[15px] flex">
              {keyword}
              <p className="ml-[5px] text-[#BEBEBE]">{products?.length}</p>
            </p>
          ) : (
            ""
          )}
        </div>
      ) : (
        <div className="text-lg font-bold text-left ml-[30px] mt-[30px] mb-[15px]">
          최근 등록 상품
        </div>
      )}

      <div className="flex justify-center">
        {products?.length !== 0 ? (
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[20px] mb-[100px]">
            {products?.map((product) => (
              <ProductCard key={product.id.videoId} product={product} />
            ))}
          </ul>
        ) : (
          <div>없어요</div>
        )}
      </div>
    </div>
  );
}
