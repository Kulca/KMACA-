"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Shield, Menu, X } from "lucide-react";
import { useState } from "react";
import { getCurrentUser } from "@/lib/store";

const menuItems = [
  { href: "/explore", label: "Explore" },
  { href: "/photographers", label: "Photographers" },
  { href: "/agencies", label: "Agencies & Schools" },
  { href: "/nsfw", label: "NSFW" },
  { href: "/contests", label: "Contests" },
  { href: "/recruit", label: "Recruitment" },
  { href: "/events", label: "Events" },
];

export default function TopBar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const user = getCurrentUser();

  if (pathname.startsWith("/admin") || pathname.startsWith("/auth")) return null;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-border">
        <div className="mx-auto max-w-lg flex items-center justify-between px-4 h-14">
          <Link href="/" className="flex items-center gap-1.5">
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              KMACA
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <button className="p-2 rounded-full hover:bg-surface transition-colors relative">
              <Bell size={20} className="text-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
            </button>

            {user?.role === "admin" && (
              <Link
                href="/admin"
                className="p-2 rounded-full hover:bg-surface transition-colors"
              >
                <Shield size={20} className="text-accent" />
              </Link>
            )}

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-full hover:bg-surface transition-colors"
            >
              {menuOpen ? (
                <X size={20} className="text-foreground" />
              ) : (
                <Menu size={20} className="text-foreground" />
              )}
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-40 pt-14 bg-white animate-fade-in">
          <nav className="flex flex-col p-4 gap-1">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`px-4 py-3 rounded-xl text-lg font-medium transition-colors ${
                  pathname.startsWith(item.href)
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-surface text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
            {!user && (
              <Link
                href="/auth"
                onClick={() => setMenuOpen(false)}
                className="mt-4 px-4 py-3 rounded-xl text-lg font-semibold bg-gradient-to-r from-primary to-accent text-white text-center"
              >
                Join KMACA
              </Link>
            )}
          </nav>
        </div>
      )}
    </>
  );
}
