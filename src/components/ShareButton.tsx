"use client";

import { useState } from "react";
import {
  Share2,
  X,
  Link2,
  Check,
} from "lucide-react";

interface ShareButtonProps {
  url: string;
  title: string;
  description?: string;
  compact?: boolean;
}

export default function ShareButton({
  url,
  title,
  description = "",
  compact = false,
}: ShareButtonProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const fullUrl = typeof window !== "undefined" ? `${window.location.origin}${url}` : url;
  const encodedUrl = encodeURIComponent(fullUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedDesc = encodeURIComponent(description);

  const socials = [
    {
      name: "X / Twitter",
      color: "bg-black text-white",
      icon: "𝕏",
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    },
    {
      name: "Facebook",
      color: "bg-blue-600 text-white",
      icon: "f",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      name: "WhatsApp",
      color: "bg-green-500 text-white",
      icon: "W",
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    },
    {
      name: "LinkedIn",
      color: "bg-blue-700 text-white",
      icon: "in",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      name: "Telegram",
      color: "bg-sky-500 text-white",
      icon: "T",
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      name: "Email",
      color: "bg-gray-600 text-white",
      icon: "@",
      href: `mailto:?subject=${encodedTitle}&body=${encodedDesc}%0A%0A${encodedUrl}`,
    },
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const input = document.createElement("input");
      input.value = fullUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text: description, url: fullUrl });
        return;
      } catch {
        // user cancelled or not supported, fall through to modal
      }
    }
    setOpen(true);
  };

  return (
    <>
      <button
        onClick={handleNativeShare}
        className={
          compact
            ? "p-2 rounded-full hover:bg-surface transition-colors"
            : "flex items-center justify-center gap-2 px-4 py-2.5 border border-border rounded-xl hover:bg-surface transition-colors text-sm font-medium"
        }
        title="Share profile"
      >
        <Share2 size={compact ? 18 : 16} />
        {!compact && "Share"}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-end justify-center">
          <div className="bg-white rounded-t-3xl w-full max-w-lg p-6 space-y-5 animate-slide-up">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Share Profile</h3>
              <button
                onClick={() => setOpen(false)}
                className="p-1 rounded-full hover:bg-surface transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2"
                  onClick={() => setOpen(false)}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${s.color}`}
                  >
                    {s.icon}
                  </div>
                  <span className="text-xs text-muted">{s.name}</span>
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2 bg-surface rounded-xl p-2">
              <input
                type="text"
                readOnly
                value={fullUrl}
                className="flex-1 bg-transparent text-sm px-2 outline-none truncate"
              />
              <button
                onClick={handleCopy}
                className={`shrink-0 flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  copied
                    ? "bg-success text-white"
                    : "bg-primary text-white hover:bg-primary-dark"
                }`}
              >
                {copied ? <Check size={14} /> : <Link2 size={14} />}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
