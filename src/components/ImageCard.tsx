"use client";

import Image from "next/image";
import { Heart } from "lucide-react";
import NsfwGuard from "./NsfwGuard";

interface ImageCardProps {
  src: string;
  caption: string;
  likes: number;
  isNsfw: boolean;
  userName?: string;
  userAvatar?: string;
  onClick?: () => void;
}

export default function ImageCard({
  src,
  caption,
  likes,
  isNsfw,
  userName,
  userAvatar,
  onClick,
}: ImageCardProps) {
  const content = (
    <div
      className="relative rounded-xl overflow-hidden bg-surface cursor-pointer group"
      onClick={onClick}
    >
      <Image
        src={src}
        alt={caption}
        width={300}
        height={400}
        className="w-full h-auto object-cover transition-transform group-hover:scale-105"
        unoptimized
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
        {userName && (
          <div className="flex items-center gap-2 mb-1">
            {userAvatar && (
              <Image
                src={userAvatar}
                alt={userName}
                width={20}
                height={20}
                className="rounded-full"
                unoptimized
              />
            )}
            <span className="text-white text-xs font-medium">{userName}</span>
          </div>
        )}
        <p className="text-white text-xs truncate">{caption}</p>
        <div className="flex items-center gap-1 mt-1">
          <Heart size={12} className="text-primary-light" />
          <span className="text-white text-xs">{likes}</span>
        </div>
      </div>
    </div>
  );

  if (isNsfw) {
    return <NsfwGuard>{content}</NsfwGuard>;
  }

  return content;
}
