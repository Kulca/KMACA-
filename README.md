# KMACA — Model Portfolio Platform

A mobile-friendly webapp for models to upload their pictures as part of their profiles and portfolios.

## Features

- **Profile & Portfolio** — Simple sign-on, easy profile setup, photo uploads with categories
- **Model Categories** — Teens, Fitness, Runway, Fashion, Plus Size, Editorial, Commercial, Glamour, Alternative, Parts, Mature
- **NSFW Section** — Age-verified section for explicit content with blurred previews
- **Photographers** — Dedicated section for photographers to showcase work
- **Agencies & Schools** — Browse and connect with modelling agencies and schools
- **Contests** — Daily, weekly, and monthly competitions (Model of the Week, Best Portfolio, etc.)
- **Recruitment** — Matching models, agencies, and photographers by location and category
- **Events** — Notice board for events with RSVP and sharing
- **Social Sharing** — Share profiles to Twitter/X, Facebook, WhatsApp, LinkedIn, Telegram, Email
- **Admin Panel** — Full CRUD admin panel for managing users, images, contests, events, and recruitment posts

## Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS 4**
- **Lucide React** (icons)
- **localStorage** for demo data persistence

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Demo Accounts

The app comes pre-loaded with sample data. To access the admin panel:
1. Sign in with email: `admin@kmaca.com`
2. Click the shield icon in the top bar

## Project Structure

```
src/
├── app/
│   ├── admin/       — CRUD admin panel
│   ├── agencies/    — Agencies & schools listing
│   ├── auth/        — Sign up / sign in flow
│   ├── contests/    — Daily/weekly/monthly contests
│   ├── events/      — Event notice board
│   ├── explore/     — Browse all portfolio images
│   ├── nsfw/        — Age-verified NSFW section
│   ├── photographers/ — Photographer listing
│   ├── profile/     — User profile & portfolio
│   └── recruit/     — Recruitment matching board
├── components/      — Shared UI components
└── lib/             — Types, data store, utilities
```
