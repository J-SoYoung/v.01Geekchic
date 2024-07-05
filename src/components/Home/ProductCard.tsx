import React from "react";
import { useNavigate } from "react-router-dom";

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

export default function ProductCard({ product }: { product: Video }) {
  const { thumbnails } = product.snippet;
  const { videoId } = product.id;
  const navigate = useNavigate();
  return (
    <li
      onClick={() => {
        navigate(`/products/detail/${videoId}`, {
          state: { product },
        });
      }}
      className="border rounded-md truncate cursor-pointer"
    >
      <img
        className="w-[120px] h-[130px] "
        src={thumbnails.medium.url}
        alt="img"
      />
    </li>
  );
}
