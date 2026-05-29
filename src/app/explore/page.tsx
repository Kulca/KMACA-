"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { getImages, getUsers } from "@/lib/store";
import type { PortfolioImage, User, ModelCategory } from "@/lib/types";
import ImageCard from "@/components/ImageCard";
import CategoryPills from "@/components/CategoryPills";

export default function ExplorePage() {
  const [images] = useState<PortfolioImage[]>(() => getImages());
  const [users] = useState<User[]>(() => getUsers());
  const [category, setCategory] = useState<ModelCategory | "all">("all");
  const [search, setSearch] = useState("");

  const filtered = images.filter((img) => {
    if (category !== "all" && img.category !== category) return false;
    if (search) {
      const owner = users.find((u) => u.id === img.userId);
      const haystack = `${img.caption} ${owner?.name ?? ""}`.toLowerCase();
      if (!haystack.includes(search.toLowerCase())) return false;
    }
    return true;
  });

  return (
    <div className="py-6 space-y-4 animate-fade-in">
      <h1 className="text-2xl font-bold">Explore</h1>

      <div className="relative">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
        />
        <input
          type="text"
          placeholder="Search models, categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
        />
      </div>

      <CategoryPills selected={category} onChange={setCategory} />

      <div className="grid grid-cols-2 gap-3">
        {filtered.map((img) => {
          const owner = users.find((u) => u.id === img.userId);
          return (
            <ImageCard
              key={img.id}
              src={img.thumbnail}
              caption={img.caption}
              likes={img.likes}
              isNsfw={img.isNsfw}
              userName={owner?.name}
              userAvatar={owner?.avatar}
            />
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted">
          <p className="text-lg">No photos found</p>
          <p className="text-sm">Try a different category or search term</p>
        </div>
      )}
    </div>
  );
}
