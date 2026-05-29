"use client";

import type { ModelCategory } from "@/lib/types";
import { ALL_CATEGORIES } from "@/lib/store";

interface CategoryPillsProps {
  selected: ModelCategory | "all";
  onChange: (cat: ModelCategory | "all") => void;
  showAll?: boolean;
}

export default function CategoryPills({
  selected,
  onChange,
  showAll = true,
}: CategoryPillsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {showAll && (
        <button
          onClick={() => onChange("all")}
          className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selected === "all"
              ? "bg-primary text-white"
              : "bg-surface text-foreground hover:bg-primary/10"
          }`}
        >
          🔥 All
        </button>
      )}
      {ALL_CATEGORIES.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onChange(cat.value)}
          className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
            selected === cat.value
              ? "bg-primary text-white"
              : "bg-surface text-foreground hover:bg-primary/10"
          }`}
        >
          {cat.emoji} {cat.label}
        </button>
      ))}
    </div>
  );
}
