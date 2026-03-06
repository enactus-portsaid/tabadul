# Tabadul — Tech Stack

> **Status:** Approved  
> **Last Updated:** 2026-03-05  
> **SOP:** SOP-001 (Tech Stack Selection)

---

## 1. Technology Overview

| Layer                | Technology               | Version   | Purpose                                      |
| -------------------- | ------------------------ | --------- | -------------------------------------------- |
| **Mobile Framework** | React Native + Expo      | SDK 52    | Cross-platform native app (Android + iOS)    |
| **Web Framework**    | Next.js (App Router)     | 15.x      | Public website + marketplace web interface   |
| **Language**         | TypeScript               | 5.x       | Type-safe development across entire stack    |
| **Mobile Routing**   | Expo Router              | 4.x       | File-based navigation for React Native      |
| **Web Routing**      | Next.js App Router       | 15.x      | File-based routing, SSR, i18n routing        |
| **Backend (BaaS)**   | Supabase                 | Latest    | PostgreSQL, Auth, Storage, Realtime, Edge Fn |
| **Database**         | PostgreSQL               | 15+       | Relational database (via Supabase)           |
| **ORM/Client**       | Supabase JS Client       | 2.x       | Type-safe database queries                   |
| **Authentication**   | Supabase Auth            | —         | Email/password, JWT, session management      |
| **File Storage**     | Supabase Storage         | —         | Photos, receipts, inspection reports         |
| **Real-time**        | Supabase Realtime        | —         | Chat messaging, live notifications           |
| **Server Functions** | Supabase Edge Functions  | Deno      | Business logic (matching, moderation)        |
| **State (Server)**   | TanStack Query           | 5.x       | Server state caching & synchronization       |
| **State (Client)**   | Zustand                  | 5.x       | Lightweight client-side state                |
| **Forms**            | React Hook Form          | 7.x       | Form validation and handling                 |
| **Validation**       | Zod                      | 3.x       | Schema validation (forms + API)              |
| **Styling (Mobile)** | NativeWind (Tailwind)    | 4.x       | Utility-first styling for React Native       |
| **Styling (Web)**    | Tailwind CSS             | 3.x       | Utility-first styling for Next.js web app    |
| **i18n**             | i18next + react-i18next  | 24.x      | Arabic/English translation + RTL/LTR         |
| **Notifications**    | Expo Notifications       | —         | Push notifications (free, unlimited)         |
| **Image Handling**   | Expo Image Picker        | —         | Camera + gallery for photo uploads           |
| **Icons**            | Expo Vector Icons        | —         | Icon library                                 |
| **Build (Mobile)**   | EAS (Expo App Services)  | —         | Cloud builds, OTA updates, app store submit  |
| **Deploy (Web)**     | Vercel                   | Free      | Next.js hosting, edge functions, CDN         |
| **Version Control**  | Git + GitHub             | —         | Source control and collaboration             |

---

## 2. Decision Rationale

### 2.1 Web Framework — Next.js

**Decision Matrix** (score 1–5, weighted):

| Criteria               | Weight | Next.js     | Remix      | Nuxt (Vue) |
| ---------------------- | ------ | ----------- | ---------- | ---------- |
| Free Tier / Cost       | 20%    | 5           | 4          | 4          |
| React Code Sharing     | 25%    | 5           | 5          | 1          |
| SEO / SSR              | 15%    | 5           | 5          | 5          |
| RTL/i18n Support       | 15%    | 5           | 3          | 4          |
| Ecosystem / Community  | 15%    | 5           | 3          | 4          |
| Learning Curve         | 10%    | 4           | 4          | 3          |
| **Weighted Total**     |        | **4.85**    | **4.00**   | **3.15**   |

**Chosen: Next.js 15 (App Router)** because:

- **React-based** — shares the same component model, hooks, and mental model as React Native. TypeScript types, Zod schemas, Supabase client code, and business logic are reusable across mobile and web.
- **Built-in i18n routing** — Next.js supports locale-prefixed routes (`/ar/marketplace`, `/en/marketplace`) with automatic RTL/LTR `dir` attribute. Combined with the same i18next translation files used by the mobile app.
- **SSR/SSG for SEO** — marketplace listings need to be indexable by search engines so factories can discover the platform via Google. Static generation for landing pages, server rendering for dynamic listings.
- **Vercel free tier** is generous (100 GB bandwidth, serverless functions, edge middleware) and purpose-built for Next.js.
- **App Router** supports React Server Components, reducing client-side JS bundle and improving 3G load times (< 3s requirement).

**Alternatives rejected:**

- **Remix:** Good SSR but smaller ecosystem. No native i18n routing. Deployment options less seamless than Vercel + Next.js.
- **Nuxt (Vue):** Would require learning Vue. Zero code sharing with React Native. Different component model.

---

### 2.2 Mobile Framework — React Native + Expo

**Decision Matrix** (score 1–5, weighted):

| Criteria               | Weight | React Native + Expo | Flutter | Kotlin Multiplatform |
| ---------------------- | ------ | ------------------- | ------- | -------------------- |
| Free Tier / Cost       | 25%    | 5                   | 5       | 5                    |
| RTL/i18n Support       | 20%    | 4                   | 5       | 3                    |
| Ecosystem / Community  | 15%    | 5                   | 4       | 3                    |
| Learning Curve         | 15%    | 4                   | 3       | 2                    |
| Feature Coverage (SDK) | 15%    | 5                   | 4       | 3                    |
| Performance            | 10%    | 4                   | 5       | 4                    |
| **Weighted Total**     |        | **4.55**            | **4.40**| **3.45**             |

**Chosen: React Native + Expo** because:

- **Expo SDK** provides batteries-included support for camera, notifications, image picker, localization, and secure storage — all required by the platform.
- **TypeScript** across the entire stack (mobile + edge functions) — one language, fewer context switches.
- **Expo Router** offers file-based routing (familiar Next.js-like pattern) reducing boilerplate.
- **EAS Build** provides free-tier CI/CD for Android + iOS builds (30 builds/month free).
- **Hermes engine** delivers strong JS performance on mobile.
- **Largest ecosystem** — npm packages for every requirement (chat UI, form handling, RTL, etc.).

**Alternatives rejected:**

- **Flutter:** Excellent RTL support and performance, but Dart is an additional language to learn, and the npm ecosystem (for marketplace/B2B patterns) is larger. Fewer Supabase-specific integrations.
- **Kotlin Multiplatform:** Immature for full cross-platform UI; requires platform-specific UI code. Too complex for a small team MVP.

---

### 2.3 Backend — Supabase (BaaS)

**Decision Matrix:**

| Criteria               | Weight | Supabase | Firebase | Custom Node.js/Express |
| ---------------------- | ------ | -------- | -------- | ---------------------- |
| Free Tier / Cost       | 25%    | 5        | 5        | 3                      |
| Relational Data Fit    | 20%    | 5        | 2        | 5                      |
| Ecosystem / Community  | 15%    | 4        | 5        | 4                      |
| Learning Curve         | 15%    | 4        | 3        | 3                      |
| Feature Coverage       | 15%    | 5        | 4        | 2                      |
| Performance            | 10%    | 4        | 4        | 4                      |
| **Weighted Total**     |        | **4.60** | **3.75** | **3.35**               |

**Chosen: Supabase** because:

- **PostgreSQL** is the right database for a marketplace with complex relational data (users → listings → transactions → payments → inspections → reviews). Firebase's NoSQL (Firestore) would require denormalization and lose referential integrity.
- **All-in-one free tier** covers Auth, Storage, Realtime, Edge Functions, and database — no need to stitch together multiple services.
- **Row Level Security (RLS)** provides database-level authorization, critical for a multi-role platform (buyer, seller, admin, inspector).
- **Supabase Realtime** powers chat without a separate WebSocket server.
- **Edge Functions** (Deno/TypeScript) handle server-side business logic (AI matching, chat moderation, commission calculations) in the same language as the frontend.
- **Free tier limits** (500 MB database, 1 GB storage, 50K MAU, 500K Edge Function invocations/month) are far beyond MVP needs (~10–50 users).

**Alternatives rejected:**

- **Firebase:** NoSQL data model is a poor fit for relational marketplace data. Complex security rules. Vendor lock-in to Google Cloud.
- **Custom Node.js/Express:** Requires hosting (Railway/Render free tiers are limited), building auth from scratch, setting up file storage, implementing WebSockets — all of which Supabase provides for free. Over-engineering for MVP scope.

---

### 2.4 Database — PostgreSQL (via Supabase)

**Chosen: PostgreSQL** because:

- The platform's data model is deeply relational: factories → listings → transactions → payments → inspections → reviews → chat messages, with many-to-many relationships (buyers ↔ sellers through transactions).
- ACID compliance ensures data consistency for financial transactions (deposits, commissions).
- Full-text search for marketplace listing discovery.
- JSONB columns for flexible metadata (waste categories, inspection reports).
- PostGIS extension available if geospatial queries are needed later (distance-based shipping estimates).

**Alternatives considered:**

- **MongoDB:** Flexible schema but loses referential integrity; not ideal for transaction-heavy systems.
- **MySQL:** Similar capabilities but Supabase only supports PostgreSQL natively.

---

### 2.5 State Management — TanStack Query + Zustand

**Chosen because:**

- **TanStack Query** handles server state (Supabase queries, caching, optimistic updates, pagination) — which is 90% of this app's state.
- **Zustand** handles the remaining client-only state (language preference, UI toggles, navigation state) with minimal boilerplate.
- Together they avoid Redux's complexity while covering every state management need.

**Alternative rejected:**

- **Redux Toolkit:** Significant boilerplate for a project this size. RTK Query duplicates TanStack Query's functionality.

---

### 2.6 Styling — Tailwind CSS (Web) + NativeWind (Mobile)

**Chosen because:**

- Utility-first approach speeds up UI development significantly.
- Tailwind's RTL utilities (`rtl:` and `ltr:` variants) simplify bilingual layout handling.
- **Shared design tokens** — a single `tailwind.config.ts` defines colors, spacing, and typography used by both web (Tailwind CSS) and mobile (NativeWind). Consistent design language across platforms.
- **Web:** Standard Tailwind CSS with Next.js — zero runtime cost, CSS extraction at build time.
- **Mobile:** NativeWind compiles Tailwind classes to React Native StyleSheet at build time.
- Team writes the same utility classes (`bg-primary`, `text-lg`, `rtl:mr-4`) on both platforms.

**Alternative rejected:**

- **StyleSheet API (vanilla):** Verbose, no design tokens, harder to maintain RTL variants.
- **Styled Components / CSS Modules:** No code sharing between web and mobile. Runtime overhead on mobile.

---

### 2.7 Internationalization — i18next + react-i18next

**Chosen because:**

- **i18next** is the most mature i18n framework, with pluralization, interpolation, and namespace support — critical for Arabic (which has complex plural forms).
- **react-i18next** provides hooks (`useTranslation`) for seamless integration in both React Native and Next.js.
- **Shared translation files** (`/shared/locales/ar.json`, `/shared/locales/en.json`) used by both mobile and web apps.
- **Mobile:** expo-localization detects device locale; React Native's I18nManager handles RTL/LTR layout direction.
- **Web:** Next.js i18n routing handles locale-prefixed URLs; HTML `dir="rtl"` attribute switches layout direction.

---

### 2.8 Navigation — Expo Router (Mobile) + Next.js App Router (Web)

**Chosen because:**

- **Mobile (Expo Router):** File-based routing, built on React Navigation. Deep linking built-in (push notification navigation). Layout routes simplify tab bar and drawer patterns.
- **Web (Next.js App Router):** File-based routing with locale prefixes (`/ar/...`, `/en/...`). React Server Components for performance. Parallel routes for modals/dialogs. Middleware for auth guards and locale detection.

---

### 2.9 Forms — React Hook Form + Zod

**Chosen because:**

- **React Hook Form** provides uncontrolled form handling with minimal re-renders — important for mobile performance.
- **Zod** provides TypeScript-first schema validation that works on both client (forms) and server (Edge Functions): one validation schema, two runtimes.
- `@hookform/resolvers` integrates Zod schemas directly into React Hook Form.

---

### 2.10 Push Notifications — Expo Notifications (Mobile)

**Chosen because:**

- Completely free with no message limits.
- Expo handles both Android (FCM) and iOS (APNs) under a unified API.
- Seamless integration with Supabase Edge Functions for server-triggered notifications.
- Built into the Expo SDK — no additional setup or third-party service.

---

### 2.11 Admin Panel — Web (Next.js, Role-Gated)

**Decision:** Admin features are built into the Next.js web app, gated by the `admin` role via Supabase RLS and Next.js middleware. A web interface is the natural fit for admin tasks (reviewing receipts, moderating listings, managing users) — larger screens, keyboard-centric workflows, data tables.

The admin section is a set of protected routes within the same Next.js app (e.g., `/admin/transactions`, `/admin/users`), not a separate project.

---

## 3. Dependencies & Integrations

| Service                | Purpose                           | Cost Tier    | Free Tier Limits                       |
| ---------------------- | --------------------------------- | ------------ | -------------------------------------- |
| **Supabase**           | BaaS (DB, Auth, Storage, RT, FN)  | Free         | 500 MB DB, 1 GB storage, 50K MAU      |
| **Expo / EAS**         | Mobile build, deploy, OTA updates | Free         | 30 builds/month, limited OTA updates   |
| **Vercel**             | Next.js web hosting               | Free         | 100 GB bandwidth, serverless functions |
| **Expo Notifications** | Push notifications (mobile)       | Free         | Unlimited messages                     |
| **GitHub**             | Version control, CI/CD            | Free         | Unlimited public/private repos         |
| **Google Play Store**  | Android distribution              | One-time $25 | —                                      |
| **Apple App Store**    | iOS distribution                  | $99/year     | Required for iOS distribution          |

> **Note:** Apple Developer Program ($99/year) is the only non-free cost. This is unavoidable for iOS App Store distribution. For MVP testing, Expo Go or TestFlight (included in the $99) can be used.

---

## 4. Stack Synergies

The chosen stack is a **proven combination** with strong interoperability:

```
┌─────────────────────────────────────────────────┐
│                   MOBILE APP                     │
│  React Native + Expo (TypeScript)                │
│  ┌──────────┐ ┌──────────┐ ┌──────────────────┐ │
│  │Expo Router│ │NativeWind│ │ i18next (AR/EN)  │ │
│  └──────────┘ └──────────┘ └──────────────────┘ │
│  ┌──────────────────┐ ┌───────────────────────┐  │
│  │ TanStack Query    │ │ React Hook Form + Zod │  │
│  └──────────────────┘ └───────────────────────┘  │
│  ┌──────────┐ ┌──────────────┐ ┌──────────────┐ │
│  │ Zustand   │ │ Expo Notifs  │ │ Expo Image   │ │
│  └──────────┘ └──────────────┘ └──────────────┘ │
└───────────────────────┬─────────────────────────┘
                        │                          
                        │ @supabase/supabase-js     
                        │                          
┌───────────────────────┼─────────────────────────┐
│                   WEB APP                        │
│  Next.js 15 + App Router (TypeScript)            │
│  ┌──────────┐ ┌──────────┐ ┌──────────────────┐ │
│  │App Router│ │Tailwind  │ │ i18next (AR/EN)  │ │
│  │(i18n rt) │ │   CSS    │ │ (shared locales) │ │
│  └──────────┘ └──────────┘ └──────────────────┘ │
│  ┌──────────────────┐ ┌───────────────────────┐  │
│  │ TanStack Query    │ │ React Hook Form + Zod │  │
│  └──────────────────┘ └───────────────────────┘  │
│  ┌──────────┐ ┌──────────────────────────────┐   │
│  │ Zustand   │ │ Admin Panel (role-gated)     │   │
│  └──────────┘ └──────────────────────────────┘   │
└───────────────────────┬─────────────────────────┘
                        │ @supabase/ssr             
                        ▼                          
┌─────────────────────────────────────────────────┐
│                   SUPABASE                       │
│  ┌──────────┐ ┌──────────┐ ┌──────────────────┐ │
│  │   Auth    │ │ Storage  │ │    Realtime      │ │
│  │(email/pw) │ │ (photos) │ │    (chat)        │ │
│  └──────────┘ └──────────┘ └──────────────────┘ │
│  ┌──────────────────┐ ┌───────────────────────┐  │
│  │   PostgreSQL      │ │   Edge Functions      │  │
│  │  (all data,RLS)   │ │  (matching,moderation)│  │
│  └──────────────────┘ └───────────────────────┘  │
└─────────────────────────────────────────────────┘
```

**Why this combination works:**

1. **Single language:** TypeScript everywhere — mobile app, web app, Supabase client queries, Edge Functions (Deno). One language, one type system.
2. **React everywhere:** React Native (mobile) and Next.js (web) share the same component model, hooks, and patterns. Business logic hooks (e.g. `useListings`, `useTransactions`) can live in a shared package.
3. **Shared dependencies:** Zod schemas, i18next translation files, Supabase client setup, and TanStack Query hooks are reusable across both apps.
4. **Supabase JS Client** works with both `@supabase/supabase-js` (mobile) and `@supabase/ssr` (Next.js server components/middleware). Same database, same RLS policies.
5. **Tailwind everywhere:** NativeWind (mobile) and Tailwind CSS (web) share the same `tailwind.config.ts` design tokens — colors, spacing, and typography stay consistent across platforms.
6. **Bilingual RTL/LTR:** Mobile uses I18nManager + NativeWind RTL variants; Web uses Next.js i18n routing + HTML `dir` attribute + Tailwind RTL variants. Same i18next translation files power both.
7. **Supabase Realtime** subscriptions are consumed by TanStack Query for automatic chat UI updates on both platforms.
8. **Expo Router** deep links connect push notifications to the right mobile screen; Next.js middleware handles auth guards and locale redirects on the web.

---

## 5. Feature-to-Technology Mapping

| Feature                        | Technologies Used                                                |
| ------------------------------ | ---------------------------------------------------------------- |
| User registration & login      | Supabase Auth, SecureStore (mobile), `@supabase/ssr` (web)       |
| Factory profiles               | Supabase PostgreSQL + RLS (both platforms)                       |
| Waste listings (CRUD)          | Supabase PostgreSQL + Storage (photos) + TanStack Query          |
| Auction system                 | Supabase PostgreSQL + Realtime (live bids) + Edge Functions      |
| Marketplace browsing           | Supabase PostgreSQL (full-text search, filters) + TanStack Query |
| Marketplace SEO                | Next.js SSR/SSG for listing pages (web only)                     |
| AI matching (rule-based)       | Supabase Edge Functions (TypeScript) + PostgreSQL queries        |
| Chat messaging                 | Supabase Realtime + PostgreSQL (both platforms)                  |
| Chat moderation                | Supabase Edge Functions (regex filters for phone/email/profanity)|
| InstaPay receipt upload        | Expo Image Picker (mobile) / `<input type="file">` (web)        |
| Admin panel                    | Next.js web app, role-gated routes via middleware + Supabase RLS |
| Admin payment verification     | Web admin panel — data tables, receipt image viewer              |
| Middleman inspection           | Supabase Storage (report photos) + PostgreSQL (report data)      |
| Transaction lifecycle          | Supabase PostgreSQL (state machine) + Edge Functions (triggers)  |
| Push notifications             | Expo Notifications (mobile) + browser notifications (web, post-MVP)|
| Rating & reviews               | Supabase PostgreSQL + TanStack Query                             |
| 3PL logistics connection       | Supabase Edge Functions (API integration) + PostgreSQL           |
| Bilingual UI (AR/EN)           | i18next (shared locales) + expo-localization / Next.js i18n      |
| RTL/LTR layout switching       | NativeWind RTL (mobile) + Tailwind RTL + `dir` attr (web)       |

---

## 6. Risks & Mitigations

| Risk                                            | Impact | Likelihood | Mitigation                                                                                      |
| ----------------------------------------------- | ------ | ---------- | ----------------------------------------------------------------------------------------------- |
| Supabase free tier limits exceeded               | High   | Low        | MVP targets ~10 factories; limits are 100x beyond need. Monitor usage dashboard.                |
| Supabase service outage                          | High   | Low        | Supabase has 99.9% uptime SLA. For MVP, acceptable risk. Data is in PostgreSQL (exportable).    |
| Expo managed workflow limits native module needs | Medium | Low        | Expo SDK 52 covers all required native modules. Development builds available if custom native code needed. |
| NativeWind RTL rendering issues                  | Medium | Medium     | Test RTL layout early in Phase 3. Fallback to StyleSheet API for specific components if needed.  |
| React Native performance on low-end devices      | Medium | Low        | Hermes engine optimized for low-end. Paginate lists, lazy-load images. Target 3G performance.    |
| Supabase Edge Functions cold starts              | Low    | Medium     | Edge Functions run on Deno Deploy (fast cold starts). Acceptable for MVP traffic levels.         |
| Apple Developer Program cost ($99/year)          | Low    | Certain    | Required for iOS. Budget for this. Use TestFlight during development.                            |
| Vendor lock-in (Supabase)                        | Medium | —          | Supabase is open-source. Database is standard PostgreSQL. Auth and Storage APIs are replaceable. |
| Maintaining two apps (mobile + web)              | Medium | Certain    | Shared package for types, schemas, hooks, translations. Monorepo structure keeps code co-located. |
| Vercel free tier limits                           | Low    | Low        | 100 GB bandwidth is ample for MVP. Serverless function limits (~100K invocations) sufficient.    |

---

## 7. Future Considerations (Post-MVP)

| Enhancement                    | Technology Options                                          | When                                    |
| ------------------------------ | ----------------------------------------------------------- | --------------------------------------- |
| LLM-based AI matching          | OpenAI API, Gemini API, or local models via Edge Functions  | After validating rule-based matching    |
| Automated receipt OCR          | Google Cloud Vision (free tier: 1K/month) or Tesseract      | After manual flow is validated          |
| Dedicated admin dashboard      | Separate admin app if complexity grows                       | When admin panel needs exceed current scope |
| Advanced analytics             | Supabase PostgreSQL views + charting library                 | After achieving transaction volume      |
| Geospatial queries             | PostGIS extension on Supabase PostgreSQL                    | For shipping cost estimates             |
| Multi-region expansion         | Supabase project regions + CDN                              | After Suez Canal Zone traction          |
| Payment gateway integration    | Paymob (Egyptian gateway) or Stripe                         | When scaling beyond manual verification |

---

## 8. Initial Dependencies

### Monorepo Structure

The project uses a monorepo with shared packages:

```
tabadul/
├── apps/
│   ├── mobile/          # React Native + Expo app
│   └── web/             # Next.js web app
├── packages/
│   └── shared/          # Shared code (types, schemas, translations, hooks)
└── supabase/            # Edge Functions, migrations, seed data
```

### Mobile App — `apps/mobile/package.json`

```json
{
  "dependencies": {
    "expo": "~52.0.0",
    "expo-router": "~4.0.0",
    "expo-localization": "~16.0.0",
    "expo-image-picker": "~16.0.0",
    "expo-notifications": "~0.29.0",
    "expo-secure-store": "~14.0.0",
    "expo-status-bar": "~2.0.0",
    "react": "18.3.1",
    "react-native": "0.76.x",
    "react-native-safe-area-context": "~5.0.0",
    "react-native-screens": "~4.0.0",
    "react-native-reanimated": "~3.16.0",
    "react-native-gesture-handler": "~2.20.0",
    "@supabase/supabase-js": "^2.47.0",
    "@tanstack/react-query": "^5.62.0",
    "zustand": "^5.0.0",
    "react-hook-form": "^7.54.0",
    "@hookform/resolvers": "^3.9.0",
    "zod": "^3.24.0",
    "nativewind": "^4.1.0",
    "i18next": "^24.2.0",
    "react-i18next": "^15.4.0",
    "react-native-url-polyfill": "^2.0.0"
  },
  "devDependencies": {
    "@types/react": "~18.3.0",
    "typescript": "~5.6.0",
    "tailwindcss": "^3.4.0",
    "prettier": "^3.4.0",
    "eslint": "^9.0.0",
    "eslint-config-expo": "~8.0.0"
  }
}
```

### Web App — `apps/web/package.json`

```json
{
  "dependencies": {
    "next": "^15.1.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@supabase/supabase-js": "^2.47.0",
    "@supabase/ssr": "^0.5.0",
    "@tanstack/react-query": "^5.62.0",
    "zustand": "^5.0.0",
    "react-hook-form": "^7.54.0",
    "@hookform/resolvers": "^3.9.0",
    "zod": "^3.24.0",
    "i18next": "^24.2.0",
    "react-i18next": "^15.4.0",
    "i18next-http-backend": "^3.0.0"
  },
  "devDependencies": {
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "typescript": "~5.6.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0",
    "prettier": "^3.4.0",
    "eslint": "^9.0.0",
    "eslint-config-next": "^15.1.0"
  }
}
```

### Shared Package — `packages/shared/package.json`

```json
{
  "dependencies": {
    "zod": "^3.24.0",
    "i18next": "^24.2.0"
  },
  "devDependencies": {
    "typescript": "~5.6.0"
  }
}
```

Shared package exports: Zod validation schemas, TypeScript types (database models), i18n translation JSON files, and constants (waste categories, transaction statuses).

### Supabase Edge Functions (Deno)

Edge Functions use Deno runtime with imports from `jsr:` and `npm:` specifiers. No `package.json` — dependencies are imported inline:

```typescript
// Example Edge Function imports
import { createClient } from "jsr:@supabase/supabase-js@2";
import { z } from "npm:zod@3";
```

---

## 9. Review Checklist

- [x] All major technology categories addressed (mobile, web, backend, database, auth, storage, realtime, notifications, i18n, styling, state, forms, navigation)
- [x] Decision matrix used for significant choices (mobile framework, backend/BaaS)
- [x] Rationale documented for each decision
- [x] Stack synergies considered and documented
- [x] Constraints validated (free tier, mobile-first, bilingual, InstaPay)
- [x] Costs estimated and within budget (only Apple Developer $99/year unavoidable)
- [x] `/docs/tech-stack.md` created
- [x] Team reviewed and approved selections

---

## 10. Approval

| Stakeholder   | Date       | Status   | Signature  |
| ------------- | ---------- | -------- | ---------- |
| Product Owner | 2026-03-05 | Approved | Tech Team  |
