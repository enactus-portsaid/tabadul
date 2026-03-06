# Tabadul (تبادل)

> B2B AI-powered Industrial Symbiosis Platform — a digital marketplace connecting factories generating waste with factories needing cheap raw materials.

## ✨ Features

- **Waste Marketplace** — List and browse industrial waste materials with photos, specs, and pricing
- **AI Matching** — Rule-based matching connects waste sellers with potential buyers automatically
- **Transaction Lifecycle** — End-to-end flow: listing → purchase → deposit → inspection → logistics → delivery approval
- **Bilingual UI** — Full Arabic (RTL) and English (LTR) support across mobile and web
- **Real-time Chat** — In-app messaging between buyers and sellers with moderation
- **Quality Assurance** — Seller photos, buyer ratings, and middleman inspector verification
- **Admin Panel** — Web-based admin dashboard for payment verification, user management, and moderation
- **InstaPay Payments** — Manual payment verification with receipt upload

## 🛠 Tech Stack

| Layer              | Technology                    |
| ------------------ | ----------------------------- |
| Mobile Framework   | React Native + Expo (SDK 52)  |
| Web Framework      | Next.js 15 (App Router)       |
| Language           | TypeScript 5.x                |
| Backend (BaaS)     | Supabase                      |
| Database           | PostgreSQL (via Supabase)     |
| Auth               | Supabase Auth (email/password)|
| Styling (Mobile)   | NativeWind (Tailwind CSS)     |
| Styling (Web)      | Tailwind CSS                  |
| State Management   | TanStack Query + Zustand      |
| Forms              | React Hook Form + Zod         |
| i18n               | i18next + react-i18next       |
| Notifications      | Expo Notifications            |

See [`docs/tech-stack.md`](docs/tech-stack.md) for full decision rationale and architecture diagrams.

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- pnpm 9+
- Expo CLI (`npx expo`)
- Supabase account (free tier)

### Installation

```bash
git clone https://github.com/your-org/tabadul.git
cd tabadul
pnpm install
cp .env.example .env    # Fill in Supabase keys
```

### Running the Mobile App

```bash
cd apps/mobile
npx expo start
```

### Running the Web App

```bash
cd apps/web
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## 🔐 Environment Variables

| Variable                          | Description                          | Required |
| --------------------------------- | ------------------------------------ | -------- |
| `EXPO_PUBLIC_SUPABASE_URL`        | Supabase project URL                 | ✅       |
| `EXPO_PUBLIC_SUPABASE_ANON_KEY`   | Supabase anonymous key               | ✅       |
| `NEXT_PUBLIC_SUPABASE_URL`        | Supabase project URL (web)           | ✅       |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`   | Supabase anonymous key (web)         | ✅       |

See `.env.example` for all variables.

## 📦 Scripts

| Script          | Description                    |
| --------------- | ------------------------------ |
| `pnpm dev`      | Start dev server (web)         |
| `pnpm build`    | Production build               |
| `pnpm lint`     | Lint code                      |
| `pnpm test`     | Run tests                      |

## 📁 Project Structure

```
tabadul/
├── apps/
│   ├── mobile/          # React Native + Expo app
│   └── web/             # Next.js 15 web app + admin panel
├── packages/
│   └── shared/          # Shared types, schemas, translations, hooks
├── supabase/            # Edge Functions, migrations, seed data
└── docs/                # Documentation
```

## 📖 API Documentation

See [`docs/api/`](docs/api/) for the API specification.

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## 📄 License

All rights reserved.
