"use client";

import type {
  User,
  PortfolioImage,
  Contest,
  RecruitmentPost,
  Event,
  ModelCategory,
} from "./types";

const PLACEHOLDER = (w: number, h: number, label: string) =>
  `https://placehold.co/${w}x${h}/e855a0/white?text=${encodeURIComponent(label)}`;

const AVATAR = (name: string) =>
  `https://placehold.co/150x150/7c3aed/white?text=${encodeURIComponent(name.slice(0, 2).toUpperCase())}`;

const sampleUsers: User[] = [
  {
    id: "u1",
    name: "Amara Okafor",
    email: "amara@example.com",
    role: "model",
    avatar: AVATAR("Amara"),
    bio: "Fitness & runway model based in Lagos. Passionate about empowering young models.",
    location: "Lagos, Nigeria",
    categories: ["fitness", "runway"],
    isNsfw: false,
    joined: "2025-01-15",
    followers: 4200,
    following: 180,
    verified: true,
  },
  {
    id: "u2",
    name: "Liam Chen",
    email: "liam@example.com",
    role: "model",
    avatar: AVATAR("Liam"),
    bio: "Editorial and fashion model. NYC based. Open to collaborations.",
    location: "New York, USA",
    categories: ["editorial", "fashion"],
    isNsfw: false,
    joined: "2025-03-20",
    followers: 2800,
    following: 95,
    verified: true,
  },
  {
    id: "u3",
    name: "Sofia Reyes",
    email: "sofia@example.com",
    role: "model",
    avatar: AVATAR("Sofia"),
    bio: "Plus-size model breaking barriers. Self-love advocate.",
    location: "Miami, USA",
    categories: ["plus-size", "fashion", "commercial"],
    isNsfw: false,
    joined: "2025-02-10",
    followers: 6100,
    following: 220,
    verified: true,
  },
  {
    id: "u4",
    name: "Kai Williams",
    email: "kai@example.com",
    role: "model",
    avatar: AVATAR("Kai"),
    bio: "Alternative & glamour model. 18+ content creator.",
    location: "London, UK",
    categories: ["alternative", "glamour"],
    isNsfw: true,
    joined: "2025-04-05",
    followers: 3500,
    following: 150,
    verified: false,
  },
  {
    id: "u5",
    name: "Marcus Studio",
    email: "marcus@example.com",
    role: "photographer",
    avatar: AVATAR("Marcus"),
    bio: "Fashion & editorial photographer. 10+ years experience.",
    location: "Paris, France",
    categories: ["fashion", "editorial"],
    isNsfw: false,
    joined: "2025-01-01",
    followers: 8900,
    following: 340,
    verified: true,
  },
  {
    id: "u6",
    name: "Elite Models Agency",
    email: "elite@example.com",
    role: "agency",
    avatar: AVATAR("Elite"),
    bio: "Premier modelling agency representing top talent worldwide.",
    location: "London, UK",
    categories: ["runway", "fashion", "editorial"],
    isNsfw: false,
    joined: "2024-11-01",
    followers: 15000,
    following: 50,
    verified: true,
  },
  {
    id: "u7",
    name: "ModelPro Academy",
    email: "academy@example.com",
    role: "school",
    avatar: AVATAR("MPA"),
    bio: "Professional modelling school. Courses for all levels.",
    location: "Cape Town, South Africa",
    categories: ["runway", "fashion", "commercial"],
    isNsfw: false,
    joined: "2025-01-20",
    followers: 3200,
    following: 80,
    verified: true,
  },
  {
    id: "admin1",
    name: "KMACA Admin",
    email: "admin@kmaca.com",
    role: "admin",
    avatar: AVATAR("Admin"),
    bio: "Platform administrator",
    location: "Global",
    categories: [],
    isNsfw: false,
    joined: "2024-01-01",
    followers: 0,
    following: 0,
    verified: true,
  },
];

const sampleImages: PortfolioImage[] = [
  { id: "img1", userId: "u1", url: PLACEHOLDER(600, 800, "Fitness+Shot"), thumbnail: PLACEHOLDER(300, 400, "Fitness"), caption: "Morning workout vibes", category: "fitness", isNsfw: false, likes: 342, createdAt: "2025-05-01" },
  { id: "img2", userId: "u1", url: PLACEHOLDER(600, 900, "Runway+Walk"), thumbnail: PLACEHOLDER(300, 450, "Runway"), caption: "Fashion week 2025", category: "runway", isNsfw: false, likes: 567, createdAt: "2025-04-28" },
  { id: "img3", userId: "u2", url: PLACEHOLDER(600, 800, "Editorial+1"), thumbnail: PLACEHOLDER(300, 400, "Editorial"), caption: "Vogue submission", category: "editorial", isNsfw: false, likes: 891, createdAt: "2025-05-10" },
  { id: "img4", userId: "u2", url: PLACEHOLDER(600, 750, "Fashion+Look"), thumbnail: PLACEHOLDER(300, 375, "Fashion"), caption: "Street style NYC", category: "fashion", isNsfw: false, likes: 445, createdAt: "2025-05-08" },
  { id: "img5", userId: "u3", url: PLACEHOLDER(600, 800, "Plus+Size"), thumbnail: PLACEHOLDER(300, 400, "Plus"), caption: "Body positivity campaign", category: "plus-size", isNsfw: false, likes: 1023, createdAt: "2025-05-12" },
  { id: "img6", userId: "u3", url: PLACEHOLDER(600, 800, "Commercial+1"), thumbnail: PLACEHOLDER(300, 400, "Commercial"), caption: "Summer collection", category: "commercial", isNsfw: false, likes: 678, createdAt: "2025-05-05" },
  { id: "img7", userId: "u4", url: PLACEHOLDER(600, 800, "Alt+Model"), thumbnail: PLACEHOLDER(300, 400, "Alt"), caption: "Dark aesthetic", category: "alternative", isNsfw: false, likes: 234, createdAt: "2025-05-15" },
  { id: "img8", userId: "u4", url: PLACEHOLDER(600, 800, "Glamour+18"), thumbnail: PLACEHOLDER(300, 400, "18+"), caption: "Exclusive content", category: "glamour", isNsfw: true, likes: 456, createdAt: "2025-05-14" },
  { id: "img9", userId: "u1", url: PLACEHOLDER(600, 800, "Gym+Shoot"), thumbnail: PLACEHOLDER(300, 400, "Gym"), caption: "Gym shoot day", category: "fitness", isNsfw: false, likes: 289, createdAt: "2025-05-18" },
  { id: "img10", userId: "u2", url: PLACEHOLDER(600, 900, "High+Fashion"), thumbnail: PLACEHOLDER(300, 450, "HF"), caption: "High fashion editorial", category: "editorial", isNsfw: false, likes: 712, createdAt: "2025-05-20" },
  { id: "img11", userId: "u3", url: PLACEHOLDER(600, 800, "Curvy+Queen"), thumbnail: PLACEHOLDER(300, 400, "CQ"), caption: "Embrace every curve", category: "plus-size", isNsfw: false, likes: 934, createdAt: "2025-05-22" },
  { id: "img12", userId: "u4", url: PLACEHOLDER(600, 800, "NSFW+Art"), thumbnail: PLACEHOLDER(300, 400, "Art"), caption: "Artistic expression", category: "glamour", isNsfw: true, likes: 567, createdAt: "2025-05-21" },
];

const sampleContests: Contest[] = [
  {
    id: "c1",
    title: "Model of the Week",
    description: "Show us your best shot! The model with the most votes wins featured placement on the homepage.",
    type: "weekly",
    category: "Best Photo",
    startDate: "2025-05-26",
    endDate: "2025-06-01",
    prize: "Featured on homepage + 500 KMACA coins",
    isActive: true,
    entries: [
      { id: "ce1", userId: "u1", userName: "Amara Okafor", userAvatar: AVATAR("Amara"), imageUrl: PLACEHOLDER(400, 500, "Entry+1"), votes: 234, submittedAt: "2025-05-26" },
      { id: "ce2", userId: "u2", userName: "Liam Chen", userAvatar: AVATAR("Liam"), imageUrl: PLACEHOLDER(400, 500, "Entry+2"), votes: 189, submittedAt: "2025-05-27" },
      { id: "ce3", userId: "u3", userName: "Sofia Reyes", userAvatar: AVATAR("Sofia"), imageUrl: PLACEHOLDER(400, 500, "Entry+3"), votes: 312, submittedAt: "2025-05-26" },
    ],
  },
  {
    id: "c2",
    title: "Model of the Month",
    description: "Monthly competition for the most outstanding portfolio. Judged by industry professionals.",
    type: "monthly",
    category: "Best Portfolio",
    startDate: "2025-05-01",
    endDate: "2025-05-31",
    prize: "Agency review + 2000 KMACA coins",
    isActive: true,
    entries: [
      { id: "ce4", userId: "u1", userName: "Amara Okafor", userAvatar: AVATAR("Amara"), imageUrl: PLACEHOLDER(400, 500, "Monthly+1"), votes: 892, submittedAt: "2025-05-03" },
      { id: "ce5", userId: "u3", userName: "Sofia Reyes", userAvatar: AVATAR("Sofia"), imageUrl: PLACEHOLDER(400, 500, "Monthly+2"), votes: 1045, submittedAt: "2025-05-05" },
    ],
  },
  {
    id: "c3",
    title: "Daily Spotlight",
    description: "Upload your photo of the day. Top voted gets featured in the daily digest!",
    type: "daily",
    category: "Photo of the Day",
    startDate: "2025-05-29",
    endDate: "2025-05-29",
    prize: "Daily feature + 100 KMACA coins",
    isActive: true,
    entries: [
      { id: "ce6", userId: "u2", userName: "Liam Chen", userAvatar: AVATAR("Liam"), imageUrl: PLACEHOLDER(400, 500, "Daily+1"), votes: 56, submittedAt: "2025-05-29" },
    ],
  },
  {
    id: "c4",
    title: "Most Active Model",
    description: "The model who engages the most with the community wins!",
    type: "weekly",
    category: "Community",
    startDate: "2025-05-26",
    endDate: "2025-06-01",
    prize: "Verified badge + 300 KMACA coins",
    isActive: true,
    entries: [],
  },
  {
    id: "c5",
    title: "Best Fitness Transformation",
    description: "Share your fitness journey. Before and after shots welcome.",
    type: "monthly",
    category: "Fitness",
    startDate: "2025-05-01",
    endDate: "2025-05-31",
    prize: "Brand sponsorship opportunity",
    isActive: true,
    entries: [
      { id: "ce7", userId: "u1", userName: "Amara Okafor", userAvatar: AVATAR("Amara"), imageUrl: PLACEHOLDER(400, 500, "Fitness+Entry"), votes: 445, submittedAt: "2025-05-10" },
    ],
  },
];

const sampleRecruitments: RecruitmentPost[] = [
  {
    id: "r1",
    authorId: "u6",
    authorName: "Elite Models Agency",
    authorRole: "agency",
    authorAvatar: AVATAR("Elite"),
    title: "Runway Models Needed - London Fashion Week",
    description: "Seeking 5 runway models (male & female) for upcoming London Fashion Week shows. Height 5'9\"+ required. All ethnicities welcome.",
    location: "London, UK",
    categories: ["runway", "fashion"],
    compensation: "£500/day + travel",
    deadline: "2025-06-15",
    applicants: 23,
    createdAt: "2025-05-20",
    type: "casting",
  },
  {
    id: "r2",
    authorId: "u5",
    authorName: "Marcus Studio",
    authorRole: "photographer",
    authorAvatar: AVATAR("Marcus"),
    title: "TFP Editorial Shoot - Paris",
    description: "Looking for editorial models for a creative TFP shoot in central Paris. Building portfolio pieces for both of us.",
    location: "Paris, France",
    categories: ["editorial", "fashion"],
    compensation: "TFP (Trade for Photos)",
    deadline: "2025-06-10",
    applicants: 12,
    createdAt: "2025-05-22",
    type: "collaboration",
  },
  {
    id: "r3",
    authorId: "u6",
    authorName: "Elite Models Agency",
    authorRole: "agency",
    authorAvatar: AVATAR("Elite"),
    title: "Plus-Size Campaign - Summer Collection",
    description: "Major retail brand seeking plus-size models (US 14-22) for summer campaign. 3-day shoot, full styling provided.",
    location: "Miami, USA",
    categories: ["plus-size", "commercial"],
    compensation: "$2000/day",
    deadline: "2025-06-20",
    applicants: 45,
    createdAt: "2025-05-25",
    type: "job",
  },
  {
    id: "r4",
    authorId: "u7",
    authorName: "ModelPro Academy",
    authorRole: "school",
    authorAvatar: AVATAR("MPA"),
    title: "Scholarship - Teen Model Training Program",
    description: "Offering 3 full scholarships for our 6-week teen model training program. Ages 14-17. Parental consent required.",
    location: "Cape Town, South Africa",
    categories: ["teens", "runway"],
    compensation: "Full scholarship",
    deadline: "2025-07-01",
    applicants: 67,
    createdAt: "2025-05-28",
    type: "job",
  },
];

const sampleEvents: Event[] = [
  {
    id: "e1",
    title: "KMACA Model Meetup",
    description: "Network with fellow models, photographers and agencies at our monthly meetup. Free drinks and snacks!",
    location: "Lagos, Nigeria",
    date: "2025-06-15",
    time: "18:00",
    organizer: "KMACA Team",
    organizerAvatar: AVATAR("KM"),
    attendees: 89,
    imageUrl: PLACEHOLDER(600, 300, "Meetup"),
    category: "Networking",
  },
  {
    id: "e2",
    title: "Runway Workshop",
    description: "Learn the basics of runway walking from industry professionals. Open to all skill levels.",
    location: "New York, USA",
    date: "2025-06-20",
    time: "14:00",
    organizer: "ModelPro Academy",
    organizerAvatar: AVATAR("MPA"),
    attendees: 45,
    imageUrl: PLACEHOLDER(600, 300, "Workshop"),
    category: "Workshop",
  },
  {
    id: "e3",
    title: "Summer Fashion Show",
    description: "Annual summer fashion show featuring emerging designers and models. Open casting available!",
    location: "London, UK",
    date: "2025-07-10",
    time: "19:00",
    organizer: "Elite Models Agency",
    organizerAvatar: AVATAR("Elite"),
    attendees: 234,
    imageUrl: PLACEHOLDER(600, 300, "Fashion+Show"),
    category: "Fashion Show",
  },
  {
    id: "e4",
    title: "Photography Masterclass",
    description: "A full-day masterclass on fashion and portrait photography. Bring your own camera.",
    location: "Paris, France",
    date: "2025-06-25",
    time: "10:00",
    organizer: "Marcus Studio",
    organizerAvatar: AVATAR("Marcus"),
    attendees: 30,
    imageUrl: PLACEHOLDER(600, 300, "Masterclass"),
    category: "Workshop",
  },
];

function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage<T>(key: string, data: T) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // ignore quota errors
  }
}

export function getUsers(): User[] {
  return loadFromStorage("kmaca_users", sampleUsers);
}

export function getUser(id: string): User | undefined {
  return getUsers().find((u) => u.id === id);
}

export function saveUsers(users: User[]) {
  saveToStorage("kmaca_users", users);
}

export function addUser(user: User) {
  const users = getUsers();
  users.push(user);
  saveUsers(users);
}

export function updateUser(id: string, data: Partial<User>) {
  const users = getUsers();
  const idx = users.findIndex((u) => u.id === id);
  if (idx !== -1) {
    users[idx] = { ...users[idx], ...data };
    saveUsers(users);
  }
}

export function deleteUser(id: string) {
  const users = getUsers().filter((u) => u.id !== id);
  saveUsers(users);
}

export function getImages(): PortfolioImage[] {
  return loadFromStorage("kmaca_images", sampleImages);
}

export function saveImages(images: PortfolioImage[]) {
  saveToStorage("kmaca_images", images);
}

export function addImage(image: PortfolioImage) {
  const images = getImages();
  images.unshift(image);
  saveImages(images);
}

export function deleteImage(id: string) {
  const images = getImages().filter((i) => i.id !== id);
  saveImages(images);
}

export function getContests(): Contest[] {
  return loadFromStorage("kmaca_contests", sampleContests);
}

export function saveContests(contests: Contest[]) {
  saveToStorage("kmaca_contests", contests);
}

export function addContest(contest: Contest) {
  const contests = getContests();
  contests.push(contest);
  saveContests(contests);
}

export function updateContest(id: string, data: Partial<Contest>) {
  const contests = getContests();
  const idx = contests.findIndex((c) => c.id === id);
  if (idx !== -1) {
    contests[idx] = { ...contests[idx], ...data };
    saveContests(contests);
  }
}

export function deleteContest(id: string) {
  const contests = getContests().filter((c) => c.id !== id);
  saveContests(contests);
}

export function getRecruitments(): RecruitmentPost[] {
  return loadFromStorage("kmaca_recruitments", sampleRecruitments);
}

export function saveRecruitments(posts: RecruitmentPost[]) {
  saveToStorage("kmaca_recruitments", posts);
}

export function addRecruitment(post: RecruitmentPost) {
  const posts = getRecruitments();
  posts.unshift(post);
  saveRecruitments(posts);
}

export function deleteRecruitment(id: string) {
  const posts = getRecruitments().filter((p) => p.id !== id);
  saveRecruitments(posts);
}

export function getEvents(): Event[] {
  return loadFromStorage("kmaca_events", sampleEvents);
}

export function saveEvents(events: Event[]) {
  saveToStorage("kmaca_events", events);
}

export function addEvent(event: Event) {
  const events = getEvents();
  events.unshift(event);
  saveEvents(events);
}

export function deleteEvent(id: string) {
  const events = getEvents().filter((e) => e.id !== id);
  saveEvents(events);
}

export function getCurrentUser(): User | null {
  return loadFromStorage<User | null>("kmaca_current_user", null);
}

export function setCurrentUser(user: User | null) {
  saveToStorage("kmaca_current_user", user);
}

export function getAgeVerified(): boolean {
  return loadFromStorage("kmaca_age_verified", false);
}

export function setAgeVerified(verified: boolean) {
  saveToStorage("kmaca_age_verified", verified);
}

export const ALL_CATEGORIES: { value: ModelCategory; label: string; emoji: string }[] = [
  { value: "teens", label: "Teens", emoji: "🌟" },
  { value: "fitness", label: "Fitness", emoji: "💪" },
  { value: "runway", label: "Runway", emoji: "👠" },
  { value: "fashion", label: "Fashion", emoji: "👗" },
  { value: "plus-size", label: "Plus Size", emoji: "💖" },
  { value: "editorial", label: "Editorial", emoji: "📸" },
  { value: "commercial", label: "Commercial", emoji: "📺" },
  { value: "glamour", label: "Glamour", emoji: "✨" },
  { value: "alternative", label: "Alternative", emoji: "🎭" },
  { value: "parts", label: "Parts", emoji: "🤚" },
  { value: "mature", label: "Mature", emoji: "🌹" },
];
