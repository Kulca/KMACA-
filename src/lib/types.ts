export type UserRole = "model" | "photographer" | "agency" | "school" | "admin";

export type ModelCategory =
  | "teens"
  | "fitness"
  | "runway"
  | "fashion"
  | "plus-size"
  | "editorial"
  | "commercial"
  | "glamour"
  | "alternative"
  | "parts"
  | "mature";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  bio: string;
  location: string;
  categories: ModelCategory[];
  isNsfw: boolean;
  joined: string;
  followers: number;
  following: number;
  verified: boolean;
}

export interface PortfolioImage {
  id: string;
  userId: string;
  url: string;
  thumbnail: string;
  caption: string;
  category: ModelCategory;
  isNsfw: boolean;
  likes: number;
  createdAt: string;
}

export type ContestType = "daily" | "weekly" | "monthly";

export interface Contest {
  id: string;
  title: string;
  description: string;
  type: ContestType;
  category: string;
  startDate: string;
  endDate: string;
  entries: ContestEntry[];
  prize: string;
  isActive: boolean;
}

export interface ContestEntry {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  imageUrl: string;
  votes: number;
  submittedAt: string;
}

export interface RecruitmentPost {
  id: string;
  authorId: string;
  authorName: string;
  authorRole: UserRole;
  authorAvatar: string;
  title: string;
  description: string;
  location: string;
  categories: ModelCategory[];
  compensation: string;
  deadline: string;
  applicants: number;
  createdAt: string;
  type: "casting" | "collaboration" | "job";
}

export interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  time: string;
  organizer: string;
  organizerAvatar: string;
  attendees: number;
  imageUrl: string;
  category: string;
}
