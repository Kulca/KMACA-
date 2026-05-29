"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Briefcase,
  MapPin,
  Clock,
  Users,
  DollarSign,
  Search,
  Send,
  Filter,
} from "lucide-react";
import { getRecruitments, getCurrentUser, ALL_CATEGORIES } from "@/lib/store";
import type { RecruitmentPost } from "@/lib/types";
import ShareButton from "@/components/ShareButton";

const typeColors: Record<string, string> = {
  casting: "bg-pink-100 text-pink-700",
  collaboration: "bg-blue-100 text-blue-700",
  job: "bg-green-100 text-green-700",
};

export default function RecruitPage() {
  const [posts] = useState<RecruitmentPost[]>(() => getRecruitments());
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);
  const [appliedTo, setAppliedTo] = useState<Set<string>>(new Set());

  const filtered = posts.filter((p) => {
    if (search) {
      const haystack = `${p.title} ${p.description} ${p.authorName}`.toLowerCase();
      if (!haystack.includes(search.toLowerCase())) return false;
    }
    if (locationFilter) {
      if (!p.location.toLowerCase().includes(locationFilter.toLowerCase()))
        return false;
    }
    if (typeFilter !== "all" && p.type !== typeFilter) return false;
    return true;
  });

  const handleApply = (postId: string) => {
    const user = getCurrentUser();
    if (!user) {
      alert("Please sign in to apply!");
      return;
    }
    setAppliedTo((prev) => new Set(prev).add(postId));
  };

  return (
    <div className="py-6 space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Briefcase size={24} className="text-primary" />
          <h1 className="text-2xl font-bold">Recruitment</h1>
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`p-2 rounded-full transition-colors ${
            showFilters ? "bg-primary text-white" : "hover:bg-surface"
          }`}
        >
          <Filter size={20} />
        </button>
      </div>

      <div className="relative">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
        <input
          type="text"
          placeholder="Search opportunities..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
        />
      </div>

      {showFilters && (
        <div className="space-y-3 animate-fade-in bg-surface rounded-xl p-4">
          <div>
            <label className="text-xs font-medium text-muted block mb-1">Location</label>
            <input
              type="text"
              placeholder="Filter by city or country..."
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted block mb-1">Type</label>
            <div className="flex gap-2">
              {["all", "casting", "collaboration", "job"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTypeFilter(t)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors capitalize ${
                    typeFilter === t
                      ? "bg-primary text-white"
                      : "bg-white text-foreground hover:bg-primary/10"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {filtered.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-2xl border border-border p-4 space-y-3"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Image
                  src={post.authorAvatar}
                  alt={post.authorName}
                  width={40}
                  height={40}
                  className="rounded-full"
                  unoptimized
                />
                <div>
                  <p className="font-medium text-sm">{post.authorName}</p>
                  <p className="text-xs text-muted capitalize">{post.authorRole}</p>
                </div>
              </div>
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${typeColors[post.type] ?? "bg-gray-100 text-gray-700"}`}
              >
                {post.type}
              </span>
            </div>

            <h3 className="font-bold">{post.title}</h3>
            <p className="text-sm text-muted line-clamp-3">{post.description}</p>

            <div className="flex flex-wrap gap-2">
              {post.categories.map((cat) => {
                const info = ALL_CATEGORIES.find((c) => c.value === cat);
                return (
                  <span
                    key={cat}
                    className="text-xs px-2 py-0.5 bg-surface rounded-full"
                  >
                    {info?.emoji} {info?.label}
                  </span>
                );
              })}
            </div>

            <div className="flex items-center gap-4 text-xs text-muted">
              <span className="flex items-center gap-1">
                <MapPin size={12} />
                {post.location}
              </span>
              <span className="flex items-center gap-1">
                <DollarSign size={12} />
                {post.compensation}
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs text-muted">
              <span className="flex items-center gap-1">
                <Clock size={12} />
                Deadline: {post.deadline}
              </span>
              <span className="flex items-center gap-1">
                <Users size={12} />
                {post.applicants} applied
              </span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleApply(post.id)}
                disabled={appliedTo.has(post.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  appliedTo.has(post.id)
                    ? "bg-success/10 text-success"
                    : "bg-primary text-white hover:bg-primary-dark"
                }`}
              >
                <Send size={14} />
                {appliedTo.has(post.id) ? "Applied!" : "Share Profile & Apply"}
              </button>
              <ShareButton
                url={`/recruit#${post.id}`}
                title={post.title}
                description={post.description}
                compact
              />
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted">
          <Briefcase size={32} className="mx-auto mb-2 opacity-50" />
          <p>No opportunities found</p>
          <p className="text-sm">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
}
