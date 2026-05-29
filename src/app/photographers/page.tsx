"use client";

import { useState } from "react";
import { Camera, Search } from "lucide-react";
import { getUsers } from "@/lib/store";
import type { User } from "@/lib/types";
import UserCard from "@/components/UserCard";

export default function PhotographersPage() {
  const [photographers] = useState<User[]>(() => getUsers().filter((u) => u.role === "photographer"));
  const [search, setSearch] = useState("");

  const filtered = photographers.filter((p) =>
    search
      ? `${p.name} ${p.location} ${p.bio}`.toLowerCase().includes(search.toLowerCase())
      : true
  );

  return (
    <div className="py-6 space-y-4 animate-fade-in">
      <div className="flex items-center gap-2">
        <Camera size={24} className="text-accent" />
        <h1 className="text-2xl font-bold">Photographers</h1>
      </div>

      <div className="relative">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
        <input
          type="text"
          placeholder="Search photographers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
        />
      </div>

      <div className="space-y-3">
        {filtered.map((p) => (
          <UserCard key={p.id} user={p} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted">
          <Camera size={32} className="mx-auto mb-2 opacity-50" />
          <p>No photographers found</p>
        </div>
      )}
    </div>
  );
}
