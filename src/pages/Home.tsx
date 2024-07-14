import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/common/Header";
import SearchHeader from "../components/common/SearchHeader";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../components/main/ProductCard";
import useProducts from "../api/firebase";
import { useRecoilValue } from "recoil";
import { userState } from "../atoms/userAtom";

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
    price: number;
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
  const user = useRecoilValue(userState);
  const searchKeyword = keyword || "";
  const product = useProducts();

  useEffect(() => {
    console.log(user);
  }, [user]);

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
  console.log(user);
  return (
    <div className="h-full min-h-screen">
      <Header />
      <SearchHeader />
      {keyword ? (
        <div>
          {products?.length !== 0 ? (
            <div>
              <div className="w-full h-[300px] mt-[30px]">
                <img
                  className="object-cover object-center w-[100%] h-[100%]"
                  src="/public/img/mainImg.jpg"
                  alt="mainImage"
                />
              </div>
              <p className="text-lg font-bold text-left ml-[30px] mt-[30px] mb-[15px] flex">
                {keyword}
                <p className="ml-[5px] text-[#BEBEBE]">{products?.length}</p>
              </p>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        <div>
          <div className="w-full h-[300px] mt-[30px]">
            <img
              className="object-cover object-center w-[100%] h-[100%]"
              src="/public/img/mainImg.jpg"
              alt="mainImage"
            />
          </div>
          <div className="text-lg font-bold text-left ml-[30px] mt-[30px] mb-[15px]">
            최근 등록 상품
          </div>
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
          <div className="h-[100vh]">
            <div className="text-2xl mt-[130px] mb-[40px]">
              검색하신 상품이 없어요.
            </div>
            <button className="w-[220px] py-2 bg-[#fff] text-[#8F5BBD] border border-[#8F5BBD] rounded-md hover:bg-[#8F5BBD] hover:text-[#fff] duration-200">
              상품으로 바로가기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
