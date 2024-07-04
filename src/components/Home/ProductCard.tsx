import React from "react";

interface VideoId {
  kind: string;
  videoId: string;
}

interface Snippet {
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
  return (
    <li className="border rounded-md truncate">
      <img
        className="w-[120px] h-[130px] "
        src={thumbnails.medium.url}
        alt="img"
      />
    </li>
  );
}
