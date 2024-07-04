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
    <li>
      <img src={thumbnails.medium.url} alt="" />
    </li>
  );
}
