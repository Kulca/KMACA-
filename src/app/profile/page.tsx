"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  CheckCircle2,
  Settings,
  Upload,
  LogOut,
  Grid3X3,
  ImagePlus,
} from "lucide-react";
import ShareButton from "@/components/ShareButton";
import {
  getCurrentUser,
  setCurrentUser,
  getImages,
  addImage,
} from "@/lib/store";
import { ALL_CATEGORIES } from "@/lib/store";
import type { User, PortfolioImage, ModelCategory } from "@/lib/types";
import ImageCard from "@/components/ImageCard";

export default function ProfilePage() {
  const router = useRouter();
  const [user] = useState<User | null>(() => getCurrentUser());
  const [images, setImages] = useState<PortfolioImage[]>(() => {
    const u = getCurrentUser();
    return u ? getImages().filter((i) => i.userId === u.id) : [];
  });
  const [showUpload, setShowUpload] = useState(false);
  const [uploadCaption, setUploadCaption] = useState("");
  const [uploadCategory, setUploadCategory] = useState<ModelCategory>("fashion");
  const [uploadNsfw, setUploadNsfw] = useState(false);

  useEffect(() => {
    if (!user) router.push("/auth");
  }, [user, router]);

  const handleUpload = () => {
    if (!user) return;
    const newImage: PortfolioImage = {
      id: "img" + Date.now(),
      userId: user.id,
      url: `https://placehold.co/600x800/e855a0/white?text=${encodeURIComponent(uploadCaption.slice(0, 10) || "New")}`,
      thumbnail: `https://placehold.co/300x400/e855a0/white?text=${encodeURIComponent(uploadCaption.slice(0, 10) || "New")}`,
      caption: uploadCaption,
      category: uploadCategory,
      isNsfw: uploadNsfw,
      likes: 0,
      createdAt: new Date().toISOString().split("T")[0],
    };
    addImage(newImage);
    setImages((prev) => [newImage, ...prev]);
    setShowUpload(false);
    setUploadCaption("");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    router.push("/auth");
  };

  if (!user) return null;

  return (
    <div className="py-6 space-y-6 animate-fade-in">
      {/* Profile Header */}
      <div className="text-center space-y-3">
        <div className="relative inline-block">
          <Image
            src={user.avatar}
            alt={user.name}
            width={96}
            height={96}
            className="rounded-full ring-4 ring-primary/20"
            unoptimized
          />
          {user.verified && (
            <CheckCircle2
              size={24}
              className="absolute bottom-0 right-0 text-primary bg-white rounded-full"
              fill="currentColor"
            />
          )}
        </div>
        <div>
          <h1 className="text-xl font-bold">{user.name}</h1>
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

      {/* Stats */}
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

      {/* Categories */}
      {user.categories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {user.categories.map((cat) => {
            const info = ALL_CATEGORIES.find((c) => c.value === cat);
            return (
              <span
                key={cat}
                className="px-3 py-1 bg-surface text-sm rounded-full"
              >
                {info?.emoji} {info?.label}
              </span>
            );
          })}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={() => setShowUpload(true)}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors"
        >
          <Upload size={16} />
          Upload
        </button>
        <Link
          href="/profile/edit"
          className="flex items-center justify-center px-4 py-2.5 border border-border rounded-xl hover:bg-surface transition-colors"
        >
          <Settings size={18} />
        </Link>
        <ShareButton
          url={`/profile/${user.id}`}
          title={`${user.name} on KMACA`}
          description={user.bio}
        />
        <button
          onClick={handleLogout}
          className="flex items-center justify-center px-4 py-2.5 border border-border rounded-xl hover:bg-surface transition-colors text-danger"
        >
          <LogOut size={18} />
        </button>
      </div>

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-end justify-center">
          <div className="bg-white rounded-t-3xl w-full max-w-lg p-6 space-y-4 animate-slide-up">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <ImagePlus size={20} className="text-primary" />
                Upload Photo
              </h3>
              <button
                onClick={() => setShowUpload(false)}
                className="text-muted hover:text-foreground"
              >
                Cancel
              </button>
            </div>

            <div className="border-2 border-dashed border-border rounded-xl p-8 text-center">
              <Upload size={32} className="mx-auto text-muted mb-2" />
              <p className="text-sm text-muted">
                Tap to select a photo
              </p>
              <p className="text-xs text-muted mt-1">
                (Demo mode — placeholder images used)
              </p>
            </div>

            <input
              type="text"
              placeholder="Caption"
              value={uploadCaption}
              onChange={(e) => setUploadCaption(e.target.value)}
              className="w-full px-4 py-2.5 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
            />

            <select
              value={uploadCategory}
              onChange={(e) => setUploadCategory(e.target.value as ModelCategory)}
              className="w-full px-4 py-2.5 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
            >
              {ALL_CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.emoji} {cat.label}
                </option>
              ))}
            </select>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={uploadNsfw}
                onChange={(e) => setUploadNsfw(e.target.checked)}
                className="w-4 h-4 accent-primary"
              />
              <span className="text-sm">Mark as NSFW (18+)</span>
            </label>

            <button
              onClick={handleUpload}
              className="w-full py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
            >
              Upload Photo
            </button>
          </div>
        </div>
      )}

      {/* Portfolio Grid */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Grid3X3 size={18} className="text-muted" />
          <h2 className="font-semibold">Portfolio</h2>
        </div>
        {images.length > 0 ? (
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
        ) : (
          <div className="text-center py-12 bg-surface rounded-2xl">
            <ImagePlus size={32} className="mx-auto text-muted mb-2" />
            <p className="text-muted">No photos yet</p>
            <button
              onClick={() => setShowUpload(true)}
              className="mt-3 px-4 py-2 bg-primary text-white text-sm font-medium rounded-full"
            >
              Upload Your First Photo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
