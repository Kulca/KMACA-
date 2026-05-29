"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, CheckCircle2 } from "lucide-react";
import type { User } from "@/lib/types";

interface UserCardProps {
  user: User;
  compact?: boolean;
}

export default function UserCard({ user, compact }: UserCardProps) {
  if (compact) {
    return (
      <Link
        href={`/profile/${user.id}`}
        className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface transition-colors"
      >
        <Image
          src={user.avatar}
          alt={user.name}
          width={40}
          height={40}
          className="rounded-full"
          unoptimized
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <span className="font-medium text-sm truncate">{user.name}</span>
            {user.verified && (
              <CheckCircle2
                size={14}
                className="text-primary shrink-0"
                fill="currentColor"
              />
            )}
          </div>
          <p className="text-xs text-muted truncate">{user.location}</p>
        </div>
        <span className="text-xs text-muted capitalize bg-surface-alt px-2 py-1 rounded-full">
          {user.role}
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={`/profile/${user.id}`}
      className="block bg-white rounded-2xl border border-border p-4 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center gap-3 mb-3">
        <Image
          src={user.avatar}
          alt={user.name}
          width={56}
          height={56}
          className="rounded-full"
          unoptimized
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <span className="font-semibold truncate">{user.name}</span>
            {user.verified && (
              <CheckCircle2
                size={16}
                className="text-primary shrink-0"
                fill="currentColor"
              />
            )}
          </div>
          <div className="flex items-center gap-1 text-sm text-muted">
            <MapPin size={12} />
            <span className="truncate">{user.location}</span>
          </div>
        </div>
      </div>
      <p className="text-sm text-muted line-clamp-2 mb-3">{user.bio}</p>
      <div className="flex items-center gap-3 text-xs text-muted">
        <span>
          <strong className="text-foreground">{user.followers.toLocaleString()}</strong>{" "}
          followers
        </span>
        <span className="capitalize bg-surface-alt px-2 py-1 rounded-full">
          {user.role}
        </span>
      </div>
    </Link>
  );
}
