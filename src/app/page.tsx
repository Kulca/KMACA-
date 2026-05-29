"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { TrendingUp, Trophy, Calendar, Sparkles, ArrowRight, Users, Camera, Building2 } from "lucide-react";
import { getImages, getUsers, getContests, getEvents } from "@/lib/store";
import type { PortfolioImage, User, Contest, Event as KEvent } from "@/lib/types";
import ImageCard from "@/components/ImageCard";

export default function HomePage() {
  const [images] = useState<PortfolioImage[]>(() => getImages());
  const [users] = useState<User[]>(() => getUsers());
  const [contests] = useState<Contest[]>(() => getContests());
  const [events] = useState<KEvent[]>(() => getEvents());

  const trendingImages = images
    .filter((i) => !i.isNsfw)
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 6);
  const featuredModels = users.filter((u) => u.role === "model" && u.verified).slice(0, 4);
  const activeContest = contests.find((c) => c.isActive);
  const nextEvent = events[0];

  return (
    <div className="py-6 space-y-8 animate-fade-in">
      {/* Hero */}
      <section className="text-center space-y-3">
        <h1 className="text-3xl font-bold">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            KMACA
          </span>
        </h1>
        <p className="text-muted text-sm">
          Your modelling career starts here. Build your portfolio, connect &amp; grow.
        </p>
        <Link
          href="/auth"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-full hover:opacity-90 transition-opacity animate-pulse-glow"
        >
          <Sparkles size={18} />
          Join Now — It&apos;s Free!
        </Link>
      </section>

      {/* Quick links */}
      <section className="grid grid-cols-4 gap-3">
        {[
          { href: "/explore", icon: TrendingUp, label: "Explore", color: "bg-pink-50 text-primary" },
          { href: "/photographers", icon: Camera, label: "Photogs", color: "bg-purple-50 text-accent" },
          { href: "/agencies", icon: Building2, label: "Agencies", color: "bg-blue-50 text-blue-500" },
          { href: "/contests", icon: Trophy, label: "Contests", color: "bg-amber-50 text-amber-500" },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl ${item.color} transition-transform hover:scale-105`}
          >
            <item.icon size={24} />
            <span className="text-xs font-medium">{item.label}</span>
          </Link>
        ))}
      </section>

      {/* Trending */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <TrendingUp size={20} className="text-primary" />
            Trending Now
          </h2>
          <Link
            href="/explore"
            className="text-sm text-primary font-medium flex items-center gap-1"
          >
            See All <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {trendingImages.map((img) => {
            const owner = users.find((u) => u.id === img.userId);
            return (
              <ImageCard
                key={img.id}
                src={img.thumbnail}
                caption={img.caption}
                likes={img.likes}
                isNsfw={img.isNsfw}
                userName={owner?.name}
                userAvatar={owner?.avatar}
              />
            );
          })}
        </div>
      </section>

      {/* Featured Models */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Users size={20} className="text-accent" />
            Featured Models
          </h2>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {featuredModels.map((model) => (
            <Link
              key={model.id}
              href={`/profile/${model.id}`}
              className="shrink-0 flex flex-col items-center gap-2 w-20"
            >
              <div className="w-16 h-16 rounded-full ring-2 ring-primary ring-offset-2 overflow-hidden">
                <Image
                  src={model.avatar}
                  alt={model.name}
                  width={64}
                  height={64}
                  className="object-cover"
                  unoptimized
                />
              </div>
              <span className="text-xs font-medium text-center truncate w-full">
                {model.name.split(" ")[0]}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Active Contest */}
      {activeContest && (
        <section>
          <Link
            href="/contests"
            className="block bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-4 border border-primary/20"
          >
            <div className="flex items-center gap-2 mb-2">
              <Trophy size={20} className="text-primary" />
              <h2 className="text-lg font-bold">Active Contest</h2>
            </div>
            <h3 className="font-semibold">{activeContest.title}</h3>
            <p className="text-sm text-muted mt-1 line-clamp-2">
              {activeContest.description}
            </p>
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-muted">
                {activeContest.entries.length} entries
              </span>
              <span className="text-sm font-semibold text-primary flex items-center gap-1">
                Enter Now <ArrowRight size={14} />
              </span>
            </div>
          </Link>
        </section>
      )}

      {/* Next Event */}
      {nextEvent && (
        <section>
          <Link
            href="/events"
            className="block bg-white rounded-2xl border border-border overflow-hidden"
          >
            <Image
              src={nextEvent.imageUrl}
              alt={nextEvent.title}
              width={600}
              height={300}
              className="w-full h-36 object-cover"
              unoptimized
            />
            <div className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <Calendar size={14} className="text-primary" />
                <span className="text-xs text-muted">{nextEvent.date} at {nextEvent.time}</span>
              </div>
              <h3 className="font-semibold">{nextEvent.title}</h3>
              <p className="text-sm text-muted mt-1 line-clamp-2">
                {nextEvent.description}
              </p>
            </div>
          </Link>
        </section>
      )}
    </div>
  );
}
