"use client";

import { useState } from "react";
import { ShieldAlert } from "lucide-react";

interface NsfwGuardProps {
  children: React.ReactNode;
}

export default function NsfwGuard({ children }: NsfwGuardProps) {
  const [revealed, setRevealed] = useState(false);

  if (revealed) return <>{children}</>;

  return (
    <div className="relative">
      <div className="blur-nsfw pointer-events-none select-none">
        {children}
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 rounded-xl backdrop-blur-sm">
        <ShieldAlert size={32} className="text-white mb-2" />
        <p className="text-white text-sm font-medium mb-1">NSFW Content</p>
        <p className="text-white/70 text-xs mb-3 text-center px-4">
          This content is marked as explicit
        </p>
        <button
          onClick={() => setRevealed(true)}
          className="px-4 py-2 bg-white text-foreground text-sm font-semibold rounded-full hover:bg-gray-100 transition-colors"
        >
          I&apos;m 18+ — Reveal
        </button>
      </div>
    </div>
  );
}
