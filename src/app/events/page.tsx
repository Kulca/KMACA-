"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Search,
} from "lucide-react";
import { getEvents } from "@/lib/store";
import type { Event as KEvent } from "@/lib/types";
import ShareButton from "@/components/ShareButton";

export default function EventsPage() {
  const [events] = useState<KEvent[]>(() => getEvents());
  const [search, setSearch] = useState("");
  const [attending, setAttending] = useState<Set<string>>(new Set());

  const filtered = events.filter((e) =>
    search
      ? `${e.title} ${e.location} ${e.description} ${e.category}`
          .toLowerCase()
          .includes(search.toLowerCase())
      : true
  );

  const handleAttend = (eventId: string) => {
    setAttending((prev) => {
      const next = new Set(prev);
      if (next.has(eventId)) next.delete(eventId);
      else next.add(eventId);
      return next;
    });
  };

  return (
    <div className="py-6 space-y-4 animate-fade-in">
      <div className="flex items-center gap-2">
        <Calendar size={24} className="text-primary" />
        <h1 className="text-2xl font-bold">Events</h1>
      </div>

      <div className="relative">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
        />
      </div>

      <div className="space-y-4">
        {filtered.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-2xl border border-border overflow-hidden"
          >
            <Image
              src={event.imageUrl}
              alt={event.title}
              width={600}
              height={300}
              className="w-full h-40 object-cover"
              unoptimized
            />
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                  {event.category}
                </span>
                <ShareButton
                  url={`/events#${event.id}`}
                  title={event.title}
                  description={event.description}
                  compact
                />
              </div>

              <h3 className="font-bold text-lg">{event.title}</h3>
              <p className="text-sm text-muted line-clamp-2">
                {event.description}
              </p>

              <div className="flex flex-col gap-2 text-sm text-muted">
                <span className="flex items-center gap-2">
                  <Calendar size={14} className="text-primary" />
                  {event.date}
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={14} className="text-primary" />
                  {event.time}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin size={14} className="text-primary" />
                  {event.location}
                </span>
                <span className="flex items-center gap-2">
                  <Users size={14} className="text-primary" />
                  {event.attendees + (attending.has(event.id) ? 1 : 0)} attending
                </span>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <Image
                  src={event.organizerAvatar}
                  alt={event.organizer}
                  width={24}
                  height={24}
                  className="rounded-full"
                  unoptimized
                />
                <span className="text-xs text-muted">
                  Organized by <strong className="text-foreground">{event.organizer}</strong>
                </span>
              </div>

              <button
                onClick={() => handleAttend(event.id)}
                className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  attending.has(event.id)
                    ? "bg-success/10 text-success border border-success/30"
                    : "bg-gradient-to-r from-primary to-accent text-white hover:opacity-90"
                }`}
              >
                {attending.has(event.id) ? "Attending!" : "I'm Interested"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted">
          <Calendar size={32} className="mx-auto mb-2 opacity-50" />
          <p>No events found</p>
        </div>
      )}
    </div>
  );
}
