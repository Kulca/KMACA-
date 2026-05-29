"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight, User, Camera, Building2, GraduationCap } from "lucide-react";
import { addUser, setCurrentUser, getUsers } from "@/lib/store";
import type { UserRole, ModelCategory } from "@/lib/types";
import { ALL_CATEGORIES } from "@/lib/store";

type Step = "welcome" | "role" | "info" | "categories" | "done";

const roles: { value: UserRole; label: string; icon: React.ElementType; desc: string }[] = [
  { value: "model", label: "Model", icon: User, desc: "Build your portfolio & get discovered" },
  { value: "photographer", label: "Photographer", icon: Camera, desc: "Showcase your work & find talent" },
  { value: "agency", label: "Agency", icon: Building2, desc: "Scout & manage talent" },
  { value: "school", label: "School", icon: GraduationCap, desc: "Train the next generation" },
];

export default function AuthPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("welcome");
  const [mode, setMode] = useState<"signup" | "login">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<UserRole>("model");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [categories, setCategories] = useState<ModelCategory[]>([]);
  const [isNsfw, setIsNsfw] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = () => {
    const users = getUsers();
    const found = users.find((u) => u.email === email);
    if (found) {
      setCurrentUser(found);
      router.push("/profile");
    } else {
      setError("No account found with that email. Sign up instead!");
    }
  };

  const handleSignup = () => {
    const id = "u" + Date.now();
    const avatar = `https://placehold.co/150x150/e855a0/white?text=${encodeURIComponent(name.slice(0, 2).toUpperCase())}`;
    const newUser = {
      id,
      name,
      email,
      role,
      avatar,
      bio,
      location,
      categories,
      isNsfw,
      joined: new Date().toISOString().split("T")[0],
      followers: 0,
      following: 0,
      verified: false,
    };
    addUser(newUser);
    setCurrentUser(newUser);
    setStep("done");
  };

  const toggleCategory = (cat: ModelCategory) => {
    setCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  if (step === "welcome") {
    return (
      <div className="py-12 space-y-8 animate-fade-in">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent">
            <Sparkles size={36} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              KMACA
            </span>
          </h1>
          <p className="text-muted">Your modelling journey starts here</p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => { setMode("signup"); setStep("role"); }}
            className="w-full py-4 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-2xl hover:opacity-90 transition-opacity text-lg"
          >
            Create Account
          </button>
          <button
            onClick={() => setMode("login")}
            className="w-full py-4 border-2 border-border text-foreground font-semibold rounded-2xl hover:bg-surface transition-colors text-lg"
          >
            Sign In
          </button>
        </div>

        {mode === "login" && (
          <div className="space-y-4 animate-fade-in">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            {error && <p className="text-danger text-sm">{error}</p>}
            <button
              onClick={handleLogin}
              className="w-full py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors"
            >
              Sign In
            </button>
          </div>
        )}
      </div>
    );
  }

  if (step === "role") {
    return (
      <div className="py-8 space-y-6 animate-fade-in">
        <div className="text-center">
          <h2 className="text-2xl font-bold">I am a...</h2>
          <p className="text-muted text-sm mt-1">Choose your role on KMACA</p>
        </div>
        <div className="space-y-3">
          {roles.map((r) => (
            <button
              key={r.value}
              onClick={() => { setRole(r.value); setStep("info"); }}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-colors ${
                role === r.value
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/30"
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-surface flex items-center justify-center">
                <r.icon size={24} className="text-primary" />
              </div>
              <div className="text-left">
                <p className="font-semibold">{r.label}</p>
                <p className="text-sm text-muted">{r.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (step === "info") {
    return (
      <div className="py-8 space-y-6 animate-fade-in">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Tell us about you</h2>
          <p className="text-muted text-sm mt-1">Quick setup — takes 30 seconds!</p>
        </div>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Your name or brand"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <input
            type="text"
            placeholder="City, Country"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <textarea
            placeholder="Short bio (optional)"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
          />
        </div>
        <button
          onClick={() => setStep("categories")}
          disabled={!name || !email}
          className="w-full py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
        >
          Continue <ArrowRight size={18} />
        </button>
      </div>
    );
  }

  if (step === "categories") {
    return (
      <div className="py-8 space-y-6 animate-fade-in">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Pick your categories</h2>
          <p className="text-muted text-sm mt-1">Select all that apply</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => toggleCategory(cat.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                categories.includes(cat.value)
                  ? "bg-primary text-white"
                  : "bg-surface text-foreground hover:bg-primary/10"
              }`}
            >
              {cat.emoji} {cat.label}
            </button>
          ))}
        </div>

        {(role === "model") && (
          <label className="flex items-center gap-3 p-4 rounded-xl bg-surface">
            <input
              type="checkbox"
              checked={isNsfw}
              onChange={(e) => setIsNsfw(e.target.checked)}
              className="w-5 h-5 rounded accent-primary"
            />
            <div>
              <p className="font-medium text-sm">NSFW Content</p>
              <p className="text-xs text-muted">My content may include explicit material</p>
            </div>
          </label>
        )}

        <button
          onClick={handleSignup}
          className="w-full py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        >
          <Sparkles size={18} />
          Create My Profile
        </button>
      </div>
    );
  }

  // done
  return (
    <div className="py-16 text-center space-y-6 animate-fade-in">
      <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent">
        <Sparkles size={40} className="text-white" />
      </div>
      <h2 className="text-2xl font-bold">You&apos;re all set! 🎉</h2>
      <p className="text-muted">
        Welcome to KMACA, <strong>{name}</strong>! Start building your portfolio.
      </p>
      <button
        onClick={() => router.push("/profile")}
        className="px-6 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary-dark transition-colors"
      >
        Go to My Profile
      </button>
    </div>
  );
}
