"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Shield,
  Users,
  Image as ImageIcon,
  Trophy,
  Briefcase,
  Calendar,
  Trash2,
  Edit3,
  Plus,
  ChevronRight,
  BarChart3,
  ArrowLeft,
  Save,
  X,
  CheckCircle2,
} from "lucide-react";
import {
  getCurrentUser,
  getUsers,
  deleteUser,
  updateUser,
  getImages,
  deleteImage,
  getContests,
  deleteContest,
  addContest,
  getRecruitments,
  deleteRecruitment,
  getEvents,
  deleteEvent,
  addEvent,
} from "@/lib/store";
import type { User, PortfolioImage, Contest, RecruitmentPost, Event as KEvent, ContestType } from "@/lib/types";

type Tab = "overview" | "users" | "images" | "contests" | "recruitment" | "events";

export default function AdminPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("overview");
  const [users, setUsers] = useState<User[]>(() => getUsers());
  const [images, setImages] = useState<PortfolioImage[]>(() => getImages());
  const [contests, setContests] = useState<Contest[]>(() => getContests());
  const [recruitments, setRecruitments] = useState<RecruitmentPost[]>(() => getRecruitments());
  const [events, setEvents] = useState<KEvent[]>(() => getEvents());
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showAddContest, setShowAddContest] = useState(false);
  const [showAddEvent, setShowAddEvent] = useState(false);

  const refreshData = () => {
    setUsers(getUsers());
    setImages(getImages());
    setContests(getContests());
    setRecruitments(getRecruitments());
    setEvents(getEvents());
  };

  useEffect(() => {
    const u = getCurrentUser();
    if (!u || u.role !== "admin") {
      router.push("/");
    }
  }, [router]);

  const handleDeleteUser = (id: string) => {
    if (confirm("Delete this user?")) {
      deleteUser(id);
      refreshData();
    }
  };

  const handleDeleteImage = (id: string) => {
    if (confirm("Delete this image?")) {
      deleteImage(id);
      refreshData();
    }
  };

  const handleDeleteContest = (id: string) => {
    if (confirm("Delete this contest?")) {
      deleteContest(id);
      refreshData();
    }
  };

  const handleDeleteRecruitment = (id: string) => {
    if (confirm("Delete this post?")) {
      deleteRecruitment(id);
      refreshData();
    }
  };

  const handleDeleteEvent = (id: string) => {
    if (confirm("Delete this event?")) {
      deleteEvent(id);
      refreshData();
    }
  };

  const handleSaveUser = () => {
    if (!editingUser) return;
    updateUser(editingUser.id, editingUser);
    setEditingUser(null);
    refreshData();
  };

  const tabs: { id: Tab; label: string; icon: React.ElementType; count: number }[] = [
    { id: "overview", label: "Overview", icon: BarChart3, count: 0 },
    { id: "users", label: "Users", icon: Users, count: users.length },
    { id: "images", label: "Images", icon: ImageIcon, count: images.length },
    { id: "contests", label: "Contests", icon: Trophy, count: contests.length },
    { id: "recruitment", label: "Recruitment", icon: Briefcase, count: recruitments.length },
    { id: "events", label: "Events", icon: Calendar, count: events.length },
  ];

  return (
    <div className="py-6 space-y-4 animate-fade-in">
      <div className="flex items-center gap-2">
        <button onClick={() => router.push("/")} className="p-2 rounded-full hover:bg-surface">
          <ArrowLeft size={20} />
        </button>
        <Shield size={24} className="text-accent" />
        <h1 className="text-2xl font-bold">Admin Panel</h1>
      </div>

      {/* Tab navigation */}
      <div className="flex gap-1.5 overflow-x-auto pb-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
              tab === t.id
                ? "bg-accent text-white"
                : "bg-surface text-foreground hover:bg-accent/10"
            }`}
          >
            <t.icon size={14} />
            {t.label}
            {t.count > 0 && (
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                tab === t.id ? "bg-white/20" : "bg-accent/10"
              }`}>
                {t.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Overview */}
      {tab === "overview" && (
        <div className="space-y-4 animate-fade-in">
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Users", value: users.length, color: "text-primary", bg: "bg-pink-50" },
              { label: "Images", value: images.length, color: "text-accent", bg: "bg-purple-50" },
              { label: "Contests", value: contests.length, color: "text-amber-500", bg: "bg-amber-50" },
              { label: "Events", value: events.length, color: "text-blue-500", bg: "bg-blue-50" },
              { label: "Recruitments", value: recruitments.length, color: "text-green-500", bg: "bg-green-50" },
              { label: "Models", value: users.filter((u) => u.role === "model").length, color: "text-pink-500", bg: "bg-pink-50" },
            ].map((stat) => (
              <div key={stat.label} className={`${stat.bg} rounded-2xl p-4`}>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-xs text-muted">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-sm text-muted">Quick Actions</h3>
            {tabs.slice(1).map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-white border border-border hover:bg-surface transition-colors"
              >
                <div className="flex items-center gap-3">
                  <t.icon size={18} className="text-accent" />
                  <span className="text-sm font-medium">Manage {t.label}</span>
                </div>
                <ChevronRight size={16} className="text-muted" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Users CRUD */}
      {tab === "users" && (
        <div className="space-y-3 animate-fade-in">
          {editingUser ? (
            <div className="bg-white border border-border rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold">Edit User</h3>
                <button onClick={() => setEditingUser(null)}><X size={20} /></button>
              </div>
              <input
                type="text"
                value={editingUser.name}
                onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-lg text-sm"
                placeholder="Name"
              />
              <input
                type="text"
                value={editingUser.email}
                onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-lg text-sm"
                placeholder="Email"
              />
              <input
                type="text"
                value={editingUser.location}
                onChange={(e) => setEditingUser({ ...editingUser, location: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-lg text-sm"
                placeholder="Location"
              />
              <textarea
                value={editingUser.bio}
                onChange={(e) => setEditingUser({ ...editingUser, bio: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-lg text-sm resize-none"
                rows={2}
                placeholder="Bio"
              />
              <select
                value={editingUser.role}
                onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value as User["role"] })}
                className="w-full px-3 py-2 border border-border rounded-lg text-sm"
              >
                <option value="model">Model</option>
                <option value="photographer">Photographer</option>
                <option value="agency">Agency</option>
                <option value="school">School</option>
                <option value="admin">Admin</option>
              </select>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={editingUser.verified}
                  onChange={(e) => setEditingUser({ ...editingUser, verified: e.target.checked })}
                  className="accent-primary"
                />
                Verified
              </label>
              <button
                onClick={handleSaveUser}
                className="w-full py-2 bg-accent text-white font-semibold rounded-lg flex items-center justify-center gap-2"
              >
                <Save size={14} /> Save Changes
              </button>
            </div>
          ) : (
            users.map((u) => (
              <div key={u.id} className="flex items-center gap-3 p-3 bg-white border border-border rounded-xl">
                <Image src={u.avatar} alt={u.name} width={36} height={36} className="rounded-full" unoptimized />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium truncate">{u.name}</span>
                    {u.verified && <CheckCircle2 size={12} className="text-primary shrink-0" fill="currentColor" />}
                  </div>
                  <p className="text-xs text-muted">{u.role} • {u.location}</p>
                </div>
                <button onClick={() => setEditingUser(u)} className="p-1.5 rounded-lg hover:bg-surface">
                  <Edit3 size={14} className="text-accent" />
                </button>
                <button onClick={() => handleDeleteUser(u.id)} className="p-1.5 rounded-lg hover:bg-surface">
                  <Trash2 size={14} className="text-danger" />
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* Images CRUD */}
      {tab === "images" && (
        <div className="space-y-3 animate-fade-in">
          {images.map((img) => {
            const owner = users.find((u) => u.id === img.userId);
            return (
              <div key={img.id} className="flex items-center gap-3 p-3 bg-white border border-border rounded-xl">
                <Image src={img.thumbnail} alt={img.caption} width={48} height={64} className="rounded-lg object-cover" unoptimized />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{img.caption}</p>
                  <p className="text-xs text-muted">
                    by {owner?.name ?? "Unknown"} • {img.category}
                    {img.isNsfw && <span className="text-danger ml-1">• NSFW</span>}
                  </p>
                  <p className="text-xs text-muted">{img.likes} likes</p>
                </div>
                <button onClick={() => handleDeleteImage(img.id)} className="p-1.5 rounded-lg hover:bg-surface">
                  <Trash2 size={14} className="text-danger" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Contests CRUD */}
      {tab === "contests" && (
        <div className="space-y-3 animate-fade-in">
          <button
            onClick={() => setShowAddContest(!showAddContest)}
            className="w-full py-2 bg-accent text-white font-semibold rounded-xl flex items-center justify-center gap-2 text-sm"
          >
            <Plus size={16} /> Add Contest
          </button>

          {showAddContest && <AddContestForm onDone={() => { setShowAddContest(false); refreshData(); }} />}

          {contests.map((c) => (
            <div key={c.id} className="flex items-center gap-3 p-3 bg-white border border-border rounded-xl">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{c.title}</p>
                <p className="text-xs text-muted capitalize">{c.type} • {c.entries.length} entries</p>
              </div>
              <button onClick={() => handleDeleteContest(c.id)} className="p-1.5 rounded-lg hover:bg-surface">
                <Trash2 size={14} className="text-danger" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Recruitment CRUD */}
      {tab === "recruitment" && (
        <div className="space-y-3 animate-fade-in">
          {recruitments.map((r) => (
            <div key={r.id} className="flex items-center gap-3 p-3 bg-white border border-border rounded-xl">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{r.title}</p>
                <p className="text-xs text-muted">{r.authorName} • {r.type} • {r.applicants} applicants</p>
              </div>
              <button onClick={() => handleDeleteRecruitment(r.id)} className="p-1.5 rounded-lg hover:bg-surface">
                <Trash2 size={14} className="text-danger" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Events CRUD */}
      {tab === "events" && (
        <div className="space-y-3 animate-fade-in">
          <button
            onClick={() => setShowAddEvent(!showAddEvent)}
            className="w-full py-2 bg-accent text-white font-semibold rounded-xl flex items-center justify-center gap-2 text-sm"
          >
            <Plus size={16} /> Add Event
          </button>

          {showAddEvent && <AddEventForm onDone={() => { setShowAddEvent(false); refreshData(); }} />}

          {events.map((e) => (
            <div key={e.id} className="flex items-center gap-3 p-3 bg-white border border-border rounded-xl">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{e.title}</p>
                <p className="text-xs text-muted">{e.date} • {e.location} • {e.attendees} attending</p>
              </div>
              <button onClick={() => handleDeleteEvent(e.id)} className="p-1.5 rounded-lg hover:bg-surface">
                <Trash2 size={14} className="text-danger" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function AddContestForm({ onDone }: { onDone: () => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<ContestType>("weekly");
  const [prize, setPrize] = useState("");

  const handleSubmit = () => {
    const now = new Date().toISOString().split("T")[0];
    addContest({
      id: "c" + Date.now(),
      title,
      description,
      type,
      category: "General",
      startDate: now,
      endDate: now,
      entries: [],
      prize,
      isActive: true,
    });
    onDone();
  };

  return (
    <div className="bg-surface rounded-xl p-4 space-y-3 animate-fade-in">
      <input type="text" placeholder="Contest title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-3 py-2 border border-border rounded-lg text-sm" />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} rows={2} className="w-full px-3 py-2 border border-border rounded-lg text-sm resize-none" />
      <select value={type} onChange={(e) => setType(e.target.value as ContestType)} className="w-full px-3 py-2 border border-border rounded-lg text-sm">
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
      </select>
      <input type="text" placeholder="Prize" value={prize} onChange={(e) => setPrize(e.target.value)} className="w-full px-3 py-2 border border-border rounded-lg text-sm" />
      <button onClick={handleSubmit} disabled={!title} className="w-full py-2 bg-accent text-white font-semibold rounded-lg text-sm disabled:opacity-50">Create</button>
    </div>
  );
}

function AddEventForm({ onDone }: { onDone: () => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = () => {
    addEvent({
      id: "e" + Date.now(),
      title,
      description,
      location,
      date,
      time,
      organizer: "KMACA Admin",
      organizerAvatar: `https://placehold.co/150x150/7c3aed/white?text=KM`,
      attendees: 0,
      imageUrl: `https://placehold.co/600x300/e855a0/white?text=${encodeURIComponent(title.slice(0, 15))}`,
      category: "Event",
    });
    onDone();
  };

  return (
    <div className="bg-surface rounded-xl p-4 space-y-3 animate-fade-in">
      <input type="text" placeholder="Event title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-3 py-2 border border-border rounded-lg text-sm" />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} rows={2} className="w-full px-3 py-2 border border-border rounded-lg text-sm resize-none" />
      <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full px-3 py-2 border border-border rounded-lg text-sm" />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full px-3 py-2 border border-border rounded-lg text-sm" />
      <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-full px-3 py-2 border border-border rounded-lg text-sm" />
      <button onClick={handleSubmit} disabled={!title} className="w-full py-2 bg-accent text-white font-semibold rounded-lg text-sm disabled:opacity-50">Create</button>
    </div>
  );
}
