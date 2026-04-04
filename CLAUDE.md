# Tabadul (تبادل) - AI Agent Guidelines & Codebase Audit

This file provides crucial context for AI coding agents (Claude Code, Gemini Antigravity, etc.) interacting with the Tabadul codebase.

## 🏗️ Project Overview & Architecture

Tabadul is a B2B AI-powered Industrial Symbiosis Platform connecting industrial waste generators with buyers.
The system employs a **BaaS-Driven Layered Architecture** leveraging Supabase as the backend.

### Tech Stack

- **Web Framework**: Next.js 15 (App Router) + Tailwind CSS
- **Mobile Framework**: React Native + Expo (SDK 52) + NativeWind
- **Backend (BaaS)**: Supabase (PostgreSQL, Auth, Edge Functions, Storage, Realtime)
- **Language**: TypeScript 5.x
- **State Management**: TanStack Query (Server State) + Zustand (Client State)
- **Validation**: Zod + React Hook Form
- **Package Manager**: pnpm workspaces (Monorepo)

### Directory Structure Boundaries

- `apps/mobile/`: Expo app. Uses Expo Router for navigation inside `src/app/(tabs)` and `src/app/(auth)`.
- `apps/web/`: Next.js web app + Admin panel. Uses `[locale]` dynamic routing for i18n support.
- `packages/shared/`: Shared business logic, types, Zod schemas, translation dictionaries.
- `supabase/`: DB migrations (`migrations/`), seed scripts (`seed.sql`), and Edge Functions.
- `.sops/`: The standard operating procedures guiding the development lifecycle.
- `.prompts/`: AI session tracker and guidelines.

## 📖 SOP Framework Execution (CRITICAL)

Tabadul is entirely driven by an internal **Standard Operating Procedures (SOP)** framework located in `.sops/` and `.prompts/`.

**As an AI agent, you MUST adhere to the following when planning or writing code:**

1.  **AI Workspace Context**: Always read `.prompts/AI-GUIDE.md` to understand your operational constraints.
2.  **Session Tracking**: Maintain `.prompts/AI-SESSION.md` diligently. It is your single source of truth for the current state, cached contexts, and progress.
3.  **Checkpoints & Drift**: Do not deviate from the execution brief and checkpoint validations without human approval. Ensure design docs trace to code gracefully.
4.  **No Monolithic Commits**: You must make Git commits upon completing each SOP step using conventional commits formats (e.g., `feat(sop-X): ...`, `wip(sop-X): ...`).

## 🛠️ Code Conventions & Design Patterns

### Best Practices to Enforce

- **Service Functions over Classes**: Data access encapsulates Supabase JS client inside independent service functions (No need for Repository pattern classes).
- **Use Result Pattern**: Return `{ data, error }` instead of throwing exceptions.
- **Strict UI Separation**: Use `ui` folder for dumb components, `features` for domain-specific context-aware chunks, and `layout` for page wrappers.
- **Query Key Factories**: Rely on structured Query Key factories for cache management and invalidation via TanStack Query.
- **ESLint/Prettier**: Enforced strictly with ESLint 9 Flat Config + Prettier Tailwind sorting. Do not ignore them. Use `pnpm lint:fix` and `pnpm format` to correct.

### Forbidden Behaviors / Anti-Patterns

- DO NOT use Zustand to store server data fetched from Supabase (Use TanStack Query).
- DO NOT directly embed raw Supabase `.select()` / `.insert()` statements inside React components. Put them in the `src/services` layer.
- DO NOT commit sensitive keys into `.env`. Rely on `.env.example`.
- DO NOT deviate from the naming conventions: PascalCase for components (`Button.tsx`), camelCase for hooks (`useAuth.ts`), and SCREAMING_SNAKE for constants.

## 🏃‍♂️ Useful Commands

- **Dev Servers**:
  - Web: `pnpm dev:web`
  - Mobile: `pnpm dev:mobile`
- **Local Database**: `pnpm db:start` (Ensure Supabase CLI is installed and running Docker).
- **Linting/Formatting**: `pnpm lint`, `pnpm format`, `pnpm type-check`
- **DB Reset/Seed**: `pnpm db:reset` / `pnpm db:seed`
