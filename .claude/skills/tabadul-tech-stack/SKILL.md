---
name: tabadul-tech-stack
description: Technical mastery for Tabadul. Use this skill whenever writing, modifying, debugging, or reviewing code for full-stack Tabadul apps (Next.js, Expo React Native, Supabase). It ensures architectural compliance with the project's monorepo BaaS constraints and specific library choices.
---

# Tabadul Tech Stack Guidelines

You are developing for **Tabadul**, a bilingual B2B Industrial Symbiosis Platform. Follow these technical patterns strictly to maintain architectural consistency.

## Tech Stack Overview

1. **Frontend Web (Admin & App):** Next.js 15 (App Router), Tailwind CSS.
2. **Frontend Mobile:** React Native + Expo (SDK 52), NativeWind.
3. **Backend:** Supabase (PostgreSQL, Auth, Edge Functions).
4. **Tooling:** pnpm monorepo schema (`apps/web`, `apps/mobile`, `packages/shared`).

## Key Architectural Rules

### 1. BaaS-Driven Layered Architecture

This project uses Supabase as a Backend-as-a-Service (BaaS). We do NOT build traditional custom backend monolithic APIs or use heavy abstractions like Repository patterns on the frontend.

- **Service Functions:** All Supabase data access should reside in standalone Service functions containing direct Supabase JS Client `.select()` / `.insert()` calls.
- **Result Pattern:** Always return responses matching Supabase's signature: `{ data, error }`. Never use `throw new Error()` for expected operational failures; return the error object.

### 2. State Management Demarcation

You must split state into two distinct spheres:

- **Server State:** Use `TanStack Query` exclusively for fetching, caching, and synchronizing data from Supabase. Ensure you abide by a Query Key Factory pattern for standardized cache keys.
- **Client State:** Use `Zustand` exclusively for UI-specific variables (e.g., active tabs, language preferences, modal toggles). Do not store backend data here.

### 3. Component Hierarchy

Organize your components rigorously under their respective app component paths (`/src/components/`):

- `ui/`: "Dumb" components, highly reusable, style-only (buttons, inputs).
- `features/`: Thematic chunks containing business logic / hooks integrations.
- `layout/`: Wrappers and page scafolding.

## Reference Files

- When in doubt about code implementation strategy, read the central repository's design patterns found at: `/docs/architecture/design-patterns.md` and `/docs/tech-stack.md`.
- Ensure bilingual compliance for UI implementations (RTL vs LTR styles using Tailwind classes like `ltr:`, `rtl:`, `ms-2`, `marginStart`).
