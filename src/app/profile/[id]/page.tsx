"use client";

import { useState, use } from "react";
import Image from "next/image";
import { MapPin, CheckCircle2, UserPlus, MessageCircle } from "lucide-react";
import { getUser, getImages, ALL_CATEGORIES } from "@/lib/store";
import type { PortfolioImage } from "@/lib/types";
import ImageCard from "@/components/ImageCard";
import ShareButton from "@/components/ShareButton";

export default function PublicProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [allUsers] = useState(() => ({ users: getUser(id) ?? null }));
  const user = allUsers.users;
  const [images] = useState<PortfolioImage[]>(() => getImages().filter((i) => i.userId === id));

  if (!user) {
    return (
      <div className="py-12 text-center text-muted">
        <p>Profile not found</p>
      </div>
    );
  }

  return (
    <div className="py-6 space-y-6 animate-fade-in">
      <div className="text-center space-y-3">
        <Image
          src={user.avatar}
          alt={user.name}
          width={96}
          height={96}
          className="mx-auto rounded-full ring-4 ring-primary/20"
          unoptimized
        />
        <div>
          <div className="flex items-center justify-center gap-1">
            <h1 className="text-xl font-bold">{user.name}</h1>
            {user.verified && (
              <CheckCircle2
                size={20}
                className="text-primary"
                fill="currentColor"
              />
            )}
          </div>
          <div className="flex items-center justify-center gap-1 text-sm text-muted">
            <MapPin size={14} />
            {user.location}
          </div>
          <span className="inline-block mt-1 text-xs font-medium capitalize bg-surface-alt text-accent px-3 py-1 rounded-full">
            {user.role}
          </span>
        </div>
        <p className="text-sm text-muted">{user.bio}</p>
      </div>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-surface rounded-xl p-3">
          <p className="text-lg font-bold">{images.length}</p>
          <p className="text-xs text-muted">Photos</p>
        </div>
        <div className="bg-surface rounded-xl p-3">
          <p className="text-lg font-bold">{user.followers.toLocaleString()}</p>
          <p className="text-xs text-muted">Followers</p>
        </div>
        <div className="bg-surface rounded-xl p-3">
          <p className="text-lg font-bold">{user.following}</p>
          <p className="text-xs text-muted">Following</p>
        </div>
      </div>

      {user.categories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {user.categories.map((cat) => {
            const info = ALL_CATEGORIES.find((c) => c.value === cat);
            return (
              <span key={cat} className="px-3 py-1 bg-surface text-sm rounded-full">
                {info?.emoji} {info?.label}
              </span>
            );
          })}
        </div>
      )}

      <div className="flex gap-3">
        <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors">
          <UserPlus size={16} />
          Follow
        </button>
        <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-border rounded-xl hover:bg-surface transition-colors">
          <MessageCircle size={16} />
          Message
        </button>
        <ShareButton
          url={`/profile/${user.id}`}
          title={`${user.name} on KMACA`}
          description={user.bio}
          compact
        />
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          {images.map((img) => (
            <ImageCard
              key={img.id}
              src={img.thumbnail}
              caption={img.caption}
              likes={img.likes}
              isNsfw={img.isNsfw}
            />
          ))}
        </div>
      )}
    </div>
  );
}
