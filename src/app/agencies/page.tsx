"use client";

import { useState } from "react";
import { Building2, GraduationCap, Search } from "lucide-react";
import { getUsers } from "@/lib/store";
import type { User } from "@/lib/types";
import UserCard from "@/components/UserCard";

export default function AgenciesPage() {
  const [allUsers] = useState<User[]>(() => getUsers());
  const agencies = allUsers.filter((u) => u.role === "agency");
  const schools = allUsers.filter((u) => u.role === "school");
  const [tab, setTab] = useState<"agencies" | "schools">("agencies");
  const [search, setSearch] = useState("");

  const list = tab === "agencies" ? agencies : schools;
  const filtered = list.filter((item) =>
    search
      ? `${item.name} ${item.location} ${item.bio}`.toLowerCase().includes(search.toLowerCase())
      : true
  );

  return (
    <div className="py-6 space-y-4 animate-fade-in">
      <h1 className="text-2xl font-bold">Agencies & Schools</h1>

      <div className="flex gap-2">
        <button
          onClick={() => setTab("agencies")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
            tab === "agencies"
              ? "bg-primary text-white"
              : "bg-surface text-foreground hover:bg-primary/10"
          }`}
        >
          <Building2 size={16} />
          Agencies
        </button>
        <button
          onClick={() => setTab("schools")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
            tab === "schools"
              ? "bg-accent text-white"
              : "bg-surface text-foreground hover:bg-accent/10"
          }`}
        >
          <GraduationCap size={16} />
          Schools
        </button>
      </div>

      <div className="relative">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
        <input
          type="text"
          placeholder={`Search ${tab}...`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
        />
      </div>

      <div className="space-y-3">
        {filtered.map((item) => (
          <UserCard key={item.id} user={item} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted">
          <Building2 size={32} className="mx-auto mb-2 opacity-50" />
          <p>No {tab} found</p>
        </div>
      )}
    </div>
  );
}
