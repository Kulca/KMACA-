"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import { getCurrentUser, setCurrentUser, updateUser, ALL_CATEGORIES } from "@/lib/store";
import type { User, ModelCategory } from "@/lib/types";

function loadInitialUser() {
  if (typeof window === "undefined") return null;
  return getCurrentUser();
}

export default function EditProfilePage() {
  const router = useRouter();
  const [user] = useState<User | null>(() => loadInitialUser());
  const [name, setName] = useState(() => loadInitialUser()?.name ?? "");
  const [bio, setBio] = useState(() => loadInitialUser()?.bio ?? "");
  const [location, setLocation] = useState(() => loadInitialUser()?.location ?? "");
  const [categories, setCategories] = useState<ModelCategory[]>(() => loadInitialUser()?.categories ?? []);
  const [isNsfw, setIsNsfw] = useState(() => loadInitialUser()?.isNsfw ?? false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!user) router.push("/auth");
  }, [user, router]);

  const toggleCategory = (cat: ModelCategory) => {
    setCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleSave = () => {
    if (!user) return;
    const updates = { name, bio, location, categories, isNsfw };
    updateUser(user.id, updates);
    setCurrentUser({ ...user, ...updates });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!user) return null;

  return (
    <div className="py-6 space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-full hover:bg-surface transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold">Edit Profile</h1>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-muted block mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2.5 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-muted block mb-1">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            className="w-full px-4 py-2.5 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-muted block mb-1">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-2.5 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-muted block mb-2">Categories</label>
          <div className="flex flex-wrap gap-2">
            {ALL_CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => toggleCategory(cat.value)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  categories.includes(cat.value)
                    ? "bg-primary text-white"
                    : "bg-surface text-foreground hover:bg-primary/10"
                }`}
              >
                {cat.emoji} {cat.label}
              </button>
            ))}
          </div>
        </div>

        {user.role === "model" && (
          <label className="flex items-center gap-3 p-4 rounded-xl bg-surface">
            <input
              type="checkbox"
              checked={isNsfw}
              onChange={(e) => setIsNsfw(e.target.checked)}
              className="w-5 h-5 rounded accent-primary"
            />
            <div>
              <p className="font-medium text-sm">NSFW Content</p>
              <p className="text-xs text-muted">My content may include explicit material</p>
            </div>
          </label>
        )}
      </div>

      <button
        onClick={handleSave}
        className="w-full py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
      >
        <Save size={18} />
        {saved ? "Saved!" : "Save Changes"}
      </button>
    </div>
  );
}
