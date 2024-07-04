import React from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/common/Header";
import SearchHeader from "../components/common/SearchHeader";
import { useQuery, QueryFunction, QueryKey } from "@tanstack/react-query";
import ProductCard from "../components/Home/ProductCard";

export default function Home() {
  interface SearchResult {
    items: Video[];
  }

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
  const fetchProducts: QueryFunction<SearchResult, QueryKey> = async () => {
    const response = await fetch(`/products/search.json`);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  const {
    isLoading,
    error,
    data: products,
  } = useQuery<SearchResult, Error>({
    queryKey: ["products", keyword],
    queryFn: fetchProducts,
  });

  {
    isLoading && <p>Loading..</p>;
  }
  {
    error && <p>Something is wrong</p>;
  }
  return (
    <div className="h-[100vh]">
      <Link to="/api/login">
        <h2 className="text-2xl">Login</h2>
      </Link>
      <Header />
      <SearchHeader />
      <div className="w-full h-[300px] mt-[30px]">
        <img
          className="object-cover object-center w-[100%] h-[100%]"
          src="/public/img/mainImg.jpg"
          alt="mainImage"
        />
      </div>
      <div className="text-lg font-bold text-left ml-[20px] mt-[30px] mb-[15px]">
        최근 등록 상품
      </div>

      {products && (
        <ul>
          {products.items.map((product) => (
            <ProductCard key={product.id.videoId} product={product} />
          ))}
        </ul>
      )}
    </div>
  );
}
