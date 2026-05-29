"use client";

import { useState } from "react";
import Image from "next/image";
import { Trophy, Clock, Users, Star, ThumbsUp } from "lucide-react";
import { getContests } from "@/lib/store";
import type { Contest, ContestType } from "@/lib/types";

const typeColors: Record<ContestType, string> = {
  daily: "bg-amber-100 text-amber-700",
  weekly: "bg-blue-100 text-blue-700",
  monthly: "bg-purple-100 text-purple-700",
};

const typeLabels: Record<ContestType, string> = {
  daily: "Daily",
  weekly: "Weekly",
  monthly: "Monthly",
};

export default function ContestsPage() {
  const [contests] = useState<Contest[]>(() => getContests());
  const [filter, setFilter] = useState<ContestType | "all">("all");
  const [selectedContest, setSelectedContest] = useState<Contest | null>(null);

  const filtered =
    filter === "all"
      ? contests
      : contests.filter((c) => c.type === filter);

  return (
    <div className="py-6 space-y-4 animate-fade-in">
      <div className="flex items-center gap-2">
        <Trophy size={24} className="text-amber-500" />
        <h1 className="text-2xl font-bold">Contests</h1>
      </div>

      <div className="flex gap-2">
        {(["all", "daily", "weekly", "monthly"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === t
                ? "bg-primary text-white"
                : "bg-surface text-foreground hover:bg-primary/10"
            }`}
          >
            {t === "all" ? "All" : typeLabels[t]}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((contest) => (
          <div
            key={contest.id}
            className="bg-white rounded-2xl border border-border overflow-hidden"
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full ${typeColors[contest.type]}`}
                >
                  {typeLabels[contest.type]}
                </span>
                {contest.isActive && (
                  <span className="text-xs font-medium text-success flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                    Live
                  </span>
                )}
              </div>

              <h3 className="font-bold text-lg">{contest.title}</h3>
              <p className="text-sm text-muted mt-1 line-clamp-2">
                {contest.description}
              </p>

              <div className="flex items-center gap-4 mt-3 text-xs text-muted">
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  Ends {contest.endDate}
                </span>
                <span className="flex items-center gap-1">
                  <Users size={12} />
                  {contest.entries.length} entries
                </span>
              </div>

              <div className="flex items-center gap-1 mt-2">
                <Star size={14} className="text-amber-500" />
                <span className="text-sm font-medium">{contest.prize}</span>
              </div>

              <button
                onClick={() =>
                  setSelectedContest(
                    selectedContest?.id === contest.id ? null : contest
                  )
                }
                className="mt-3 w-full py-2.5 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl hover:opacity-90 transition-opacity text-sm"
              >
                {selectedContest?.id === contest.id
                  ? "Hide Entries"
                  : "View Entries & Vote"}
              </button>
            </div>

            {selectedContest?.id === contest.id && (
              <div className="border-t border-border p-4 space-y-3 animate-fade-in">
                {contest.entries.length > 0 ? (
                  contest.entries
                    .sort((a, b) => b.votes - a.votes)
                    .map((entry, rank) => (
                      <div
                        key={entry.id}
                        className="flex items-center gap-3 p-3 rounded-xl bg-surface"
                      >
                        <span
                          className={`text-lg font-bold w-8 text-center ${
                            rank === 0
                              ? "text-amber-500"
                              : rank === 1
                                ? "text-gray-400"
                                : "text-amber-700"
                          }`}
                        >
                          #{rank + 1}
                        </span>
                        <Image
                          src={entry.imageUrl}
                          alt={entry.userName}
                          width={48}
                          height={60}
                          className="rounded-lg object-cover"
                          unoptimized
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <Image
                              src={entry.userAvatar}
                              alt={entry.userName}
                              width={20}
                              height={20}
                              className="rounded-full"
                              unoptimized
                            />
                            <span className="text-sm font-medium truncate">
                              {entry.userName}
                            </span>
                          </div>
                          <p className="text-xs text-muted mt-0.5">
                            {entry.votes} votes
                          </p>
                        </div>
                        <button className="shrink-0 p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                          <ThumbsUp size={16} />
                        </button>
                      </div>
                    ))
                ) : (
                  <div className="text-center py-8 text-muted">
                    <Trophy size={24} className="mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No entries yet — be the first!</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted">
          <Trophy size={32} className="mx-auto mb-2 opacity-50" />
          <p>No contests found</p>
        </div>
      )}
    </div>
  );
}
