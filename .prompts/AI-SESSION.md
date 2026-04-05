# AI Development Session

> **AI Agent Responsibility:** This file is managed by the AI agent. The human only provides the initial project description—the AI fills in and updates everything else.

---

## 🤖 AI Agent Instructions

**On first session:**

1. Fill in the Project Overview table (name, description, root, date)
2. Document the Project Goals from the user's description
3. Begin with SOP-000 and update the tracker as you progress

**On each SOP completion:**

1. Update the SOP's status in the Progress Tracker (⬚ → ✅)
2. Record the actual output locations
3. Add any notes about deviations or decisions
4. Update the "Current Session" section for the next SOP
5. Update the "Session Prompt Template" with current state
6. Add an entry to the Session Log

**On phase completion:**

1. Update the Checkpoint Tracker with document locations and key decisions
2. Run the checkpoint prompt from `AI-GUIDE.md` → "Checkpoint System"
3. Record checkpoint status and any issues found
4. Await human approval before proceeding to the next phase

**On session resume:**

1. Read this file to recover context
2. Continue from the next incomplete SOP
3. Update all sections as you progress

---

## 📋 Project Overview

| Field            | Value                                                                                                                                               |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Project Name** | Tabadul (تبادل)                                                                                                                                     |
| **Description**  | B2B AI-powered Industrial Symbiosis Platform — digital marketplace connecting factories generating waste with factories needing cheap raw materials |
| **Project Root** | `C:\Tabadul`                                                                                                                                        |
| **Started**      | 2026-03-05                                                                                                                                          |

---

## Project Goals

- Connect factories generating industrial waste (sellers) with factories that can use it as raw materials (buyers) via rule-based AI matching
- Facilitate end-to-end transactions: listing → purchase → deposit → inspection → logistics → delivery approval
- Provide bilingual (Arabic RTL + English LTR) mobile-first native app for Android and iOS
- Enable quality assurance through seller photos, buyer ratings, and middleman inspector verification
- Generate revenue through commission-based model with InstaPay manual payment verification

---

## SOP Progress Tracker

### Phase 0: Initialization

| SOP | Title                  | Status | Output Location                                                                                                                                                                                 | Notes                                                                                       |
| --- | ---------------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| 000 | Requirements Gathering | ✅     | `/docs/requirements.md`                                                                                                                                                                         | 12 sections, 30+ user stories, MoSCoW prioritized                                           |
| 001 | Tech Stack Selection   | ✅     | `/docs/tech-stack.md`                                                                                                                                                                           | RN + Expo (mobile), Next.js 15 (web), Supabase, monorepo                                    |
| 002 | Repository Setup       | ✅     | `README.md`, `.gitignore`, `CONTRIBUTING.md`, `.github/PULL_REQUEST_TEMPLATE.md`                                                                                                                | GitHub Flow branching, Conventional Commits, pushed to github.com/enactus-portsaid/tabadul  |
| 003 | Project Structure      | ✅     | `apps/`, `packages/`, `supabase/`, `/docs/architecture/project-structure.md`, `tsconfig.base.json`                                                                                              | Monorepo: apps/mobile + apps/web + packages/shared + supabase, path aliases, barrel files   |
| 004 | Environment Setup      | ✅     | `.env.example`, `/docs/environment-variables.md`, `/docs/development-setup.md`, `docker-compose.yml`, `.vscode/settings.json`, `.vscode/extensions.json`, `package.json`, `pnpm-workspace.yaml` | Supabase-based local dev (supabase start), root pnpm workspace scripts                      |
| 005 | Design Patterns        | ✅     | `/docs/architecture/design-patterns.md`                                                                                                                                                         | BaaS-Driven Layered Architecture, function-based services, Custom Hooks + Composition       |
| 006 | Code Style Standards   | ✅     | `eslint.config.mjs`, `prettier.config.js`, `lint-staged.config.js`, `.husky/pre-commit`, `.prettierignore`, `.vscode/settings.json`                                                             | ESLint 9 flat config, Prettier, Husky + lint-staged, import sorting, Tailwind class sorting |

### Phase 1: Database

| SOP | Title              | Status | Output Location                                                         | Notes                                                                            |
| --- | ------------------ | ------ | ----------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| 100 | Database Selection | ✅     | `/docs/database/database-decision.md`                                   | PostgreSQL via Supabase                                                          |
| 101 | Schema Design      | ✅     | `/docs/database/schema.md`, `supabase/migrations/00001_init_schema.sql` | 16 tables, 10 enums, Supabase SQL migration (adapted from Prisma per tech stack) |
| 102 | Seed Data          | ✅     | `supabase/seed.sql`, `/docs/database/seed-data.md`                      | 5 test users, 5 categories, 3 listings with full transaction and chat lifecycle  |

### Phase 2: Backend

| SOP | Title              | Status | Output Location                                                         | Notes                                                                          |
| --- | ------------------ | ------ | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| 200 | Service Layer      | ✅     | `packages/shared/src/services/`, `/docs/architecture/business-rules.md` | Extracted domain services via Supabase Client                                  |
| 201 | Repository Pattern | ⏭️     | —                                                                       | Skipped per execution brief: Supabase abstracts data access natively           |
| 202 | API Design         | ⏭️     | —                                                                       | Skipped per execution brief: Supabase handles API generation                   |
| 203 | Authentication     | ✅     | `apps/*/src/hooks/useAuth.ts`, `apps/*/src/lib/supabase*.ts`, `/docs/architecture/auth-flow.md` | Supabase Auth, expo-secure-store, @supabase/ssr, middleware, route guards |
| 204 | Authorization      | ⬚      | `/docs/authorization.md`, middleware                                    |                                                                                |
| 205 | Error Handling     | ⬚      | Error handler module                                                    |                                                                                |
| 206 | Validation         | ⬚      | Validation schemas                                                      |                                                                                |

### Phase 3: Frontend

| SOP | Title                  | Status | Output Location                | Notes |
| --- | ---------------------- | ------ | ------------------------------ | ----- |
| 300 | Component Architecture | ⬚      | `/src/components/` structure   |       |
| 301 | Styling Standards      | ⬚      | Style configs, design tokens   |       |
| 302 | UI/UX Design           | ⬚      | `/docs/frontend/wireframes.md` |       |
| 303 | API Integration        | ⬚      | API client module              |       |
| 304 | Form Handling          | ⬚      | Form components/hooks          |       |
| 305 | Page Implementation    | ⬚      | `/src/app/` pages              |       |
| 306 | Progressive Web App    | ⬚      | PWA config, service worker     |       |

### Phase 4: AI Integration (If Applicable)

| SOP | Title           | Status | Output Location           | Notes |
| --- | --------------- | ------ | ------------------------- | ----- |
| 400 | AI Feasibility  | ⬚      | `/docs/ai-feasibility.md` |       |
| 401 | LLM Integration | ⬚      | AI service module         |       |
| 402 | AI Testing      | ⬚      | AI test suite             |       |
| 403 | Cost Monitoring | ⬚      | Cost tracking setup       |       |

### Phase 5: Quality

| SOP | Title               | Status | Output Location                    | Notes |
| --- | ------------------- | ------ | ---------------------------------- | ----- |
| 500 | Unit Testing        | ⬚      | Test configuration, `/tests/unit/` |       |
| 501 | Integration Testing | ⬚      | `/tests/integration/`              |       |
| 502 | E2E Testing         | ⬚      | Playwright config, `/tests/e2e/`   |       |
| 503 | Code Review         | ⬚      | PR template, review checklist      |       |
| 504 | Documentation       | ⬚      | README, TSDoc, OpenAPI docs        |       |

### Phase 6: Deployment

| SOP | Title                     | Status | Output Location                        | Notes |
| --- | ------------------------- | ------ | -------------------------------------- | ----- |
| 600 | Environment Configuration | ⬚      | `.env.example`, `/docs/deployment.md`  |       |
| 601 | CI/CD Pipelines           | ⬚      | `.github/workflows/`                   |       |
| 602 | Monitoring & Alerting     | ⬚      | Sentry config, health check routes     |       |
| 603 | Maintenance & Incidents   | ⬚      | Runbooks, `/docs/incident-response.md` |       |

**Status Legend:**

- ⬚ Not Started
- 🔄 In Progress
- ✅ Complete
- ⏭️ Skipped (not applicable)

---

## �️ Checkpoint Tracker

> **AI Agent Responsibility:** Update this section as you complete each phase. Fill in the document locations and key decisions so checkpoints can be run efficiently.
>
> **See:** `AI-GUIDE.md` → "Checkpoint System" for the checkpoint prompt template.

### Source of Truth (Level 0)

These are human-approved and must never be contradicted:

| Document        | Location                   | Last Updated | Key Decisions                                                                               |
| --------------- | -------------------------- | ------------ | ------------------------------------------------------------------------------------------- |
| Requirements    | `/docs/requirements.md`    | 2026-02-24   | 30+ user stories, MVP scope defined, MoSCoW prioritized                                     |
| Tech Stack      | `/docs/tech-stack.md`      | 2026-03-05   | React Native + Expo (mobile), Next.js 15 (web), Supabase, PostgreSQL, TypeScript, monorepo  |
| Execution Brief | `/docs/execution-brief.md` | 2026-04-04   | 16 entities mapped, 3 pattern overrides (BaaS Service Functions), Phase 2 trims SOP-201/202 |

### Phase 1 Checkpoint — Database Design

| Design Doc (Level 1) | Location                              | Traces to Requirement                                                    |
| -------------------- | ------------------------------------- | ------------------------------------------------------------------------ |
| Database Selection   | `/docs/database/database-decision.md` | PostgreSQL for relational data needs                                     |
| Schema/ERD           | `/docs/database/schema.md`            | All 16 entities from requirements mapped, 3NF normalized                 |
| Seed Data            | `/docs/database/seed-data.md`         | Test data for all user roles, categories, and full transaction lifecycle |

| Design Decision        | Expected                          | Actual Code                             | Compliant? | File:Line                                   |
| :--------------------- | :-------------------------------- | :-------------------------------------- | :--------- | :------------------------------------------ |
| **Database Selection** | Supabase PostgreSQL natively      | Used Supabase SQL Migration             | ✅ Yes     | `supabase/migrations/00001_init_schema.sql` |
| **Schema Map**         | 16 entities from MVP requirements | All entities natively translated to SQL | ✅ Yes     | `supabase/migrations/00001_init_schema.sql` |
| **Seed Data**          | Full lifecycle users/transactions | Comprehensive test data seed            | ✅ Yes     | `supabase/seed.sql`                         |

**Checkpoint Status:** ✅ Passed
**Last Run:** 2026-04-04
**Issues:** None

---

### Phase 2 Checkpoint — Backend/API

| Design Doc (Level 1) | Location        | Traces to Requirement            |
| -------------------- | --------------- | -------------------------------- |
| API Endpoints        | {location or ⬚} | {e.g., "CRUD for all resources"} |
| OpenAPI Spec         | {location or ⬚} |                                  |
| Auth Strategy        | {location or ⬚} | {e.g., "JWT per tech-stack.md"}  |
| Error Codes          | {location or ⬚} |                                  |

| Implementation (Level 2) | Location                    | Traces to Design |
| ------------------------ | --------------------------- | ---------------- |
| API Routes               | {e.g., `src/app/api/` or ⬚} |                  |
| Auth Module              | {location or ⬚}             |                  |
| Validation Schemas       | {location or ⬚}             |                  |

**Checkpoint Status:** ⬚ Not Run / ✅ Passed / ⚠️ Issues Found  
**Last Run:** {date}  
**Issues:** {none or list issues}

---

### Phase 3 Checkpoint — Frontend

| Design Doc (Level 1)   | Location        | Traces to Requirement              |
| ---------------------- | --------------- | ---------------------------------- |
| Component Architecture | {location or ⬚} | {e.g., "Component per user story"} |
| Styling Standards      | {location or ⬚} |                                    |
| Form Patterns          | {location or ⬚} |                                    |

| Implementation (Level 2) | Location                       | Traces to Design |
| ------------------------ | ------------------------------ | ---------------- |
| Components               | {e.g., `src/components/` or ⬚} |                  |
| Pages/Routes             | {e.g., `src/app/` or ⬚}        |                  |
| API Client               | {location or ⬚}                |                  |

**Checkpoint Status:** ⬚ Not Run / ✅ Passed / ⚠️ Issues Found  
**Last Run:** {date}  
**Issues:** {none or list issues}

---

### Phase 5 Checkpoint — Pre-Deployment Quality

| Validation                     | Status | Notes                |
| ------------------------------ | ------ | -------------------- |
| All user stories implemented   | ⬚      |                      |
| Test coverage meets target     | ⬚      | {e.g., "80% target"} |
| No critical security issues    | ⬚      |                      |
| Tech stack compliance verified | ⬚      |                      |
| Documentation complete         | ⬚      |                      |

**Checkpoint Status:** ⬚ Not Run / ✅ Passed / ⚠️ Issues Found  
**Last Run:** {date}  
**Issues:** {none or list issues}

---

## 📦 Context Cache

> **AI Agent:** After completing each SOP, cache key outputs here so future SOPs
> don't need to re-read full prerequisite files. Update inline as you progress.

### Cached Decisions

| Decision        | Value                                                                                                                                                                                                                | Source                                    | Set By  |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- | ------- |
| Framework       | React Native + Expo SDK 52 (mobile) + Next.js 15 (web)                                                                                                                                                               | `/docs/tech-stack.md`                     | SOP-001 |
| Database        | PostgreSQL (via Supabase)                                                                                                                                                                                            | `/docs/tech-stack.md`                     | SOP-001 |
| ORM             | Supabase JS Client + @supabase/ssr (web)                                                                                                                                                                             | `/docs/tech-stack.md`                     | SOP-001 |
| Auth            | Supabase Auth (email/password, JWT)                                                                                                                                                                                  | `/docs/tech-stack.md`                     | SOP-001 |
| Styling         | NativeWind (Tailwind CSS for React Native)                                                                                                                                                                           | `/docs/tech-stack.md`                     | SOP-001 |
| State Mgmt      | TanStack Query + Zustand                                                                                                                                                                                             | `/docs/tech-stack.md`                     | SOP-001 |
| Hosting         | Supabase Cloud + EAS (mobile) + Vercel (web)                                                                                                                                                                         | `/docs/tech-stack.md`                     | SOP-001 |
| Entities        | Profile, WasteCategory, Listing, ListingPhoto, Bid, Bookmark, ChatThread, Message, Transaction, Payment, InspectionReport, Review, Notification, NotificationPreference, Dispute, MatchRecommendation (16 total)     | `/docs/requirements.md`                   | SOP-101 |
| Branching       | GitHub Flow (main + feature/fix/chore branches)                                                                                                                                                                      | `CONTRIBUTING.md`                         | SOP-002 |
| Monorepo Layout | apps/mobile + apps/web + packages/shared + supabase                                                                                                                                                                  | `/docs/architecture/project-structure.md` | SOP-003 |
| Local Dev       | Supabase CLI (`supabase start`) for full local stack; pnpm workspaces                                                                                                                                                | `/docs/development-setup.md`              | SOP-004 |
| Design Patterns | BaaS-Driven Layered Architecture; Service Functions (no Repository); Custom Hooks + Composition; TanStack Query + Zustand; React Hook Form + Zod; Result Pattern (`{ data, error }`); Auth Hook + RLS + Route Guards | `/docs/architecture/design-patterns.md`   | SOP-005 |
| Code Style      | ESLint 9 flat config + Prettier + Husky + lint-staged; simple-import-sort; Tailwind class sorting; printWidth 80; singleQuote; trailingComma es5                                                                     | `eslint.config.mjs`, `prettier.config.js` | SOP-006 |

### Cached File Locations

| Artifact        | Path                                                                    | Last Updated By |
| --------------- | ----------------------------------------------------------------------- | --------------- |
| Requirements    | `/docs/requirements.md`                                                 | SOP-000         |
| Tech Stack      | `/docs/tech-stack.md`                                                   | SOP-001         |
| README          | `/README.md`                                                            | SOP-002         |
| CONTRIBUTING    | `/CONTRIBUTING.md`                                                      | SOP-002         |
| PR Template     | `/.github/PULL_REQUEST_TEMPLATE.md`                                     | SOP-002         |
| Structure Doc   | `/docs/architecture/project-structure.md`                               | SOP-003         |
| Shared Package  | `/packages/shared/`                                                     | SOP-003         |
| Env Docs        | `/docs/environment-variables.md`                                        | SOP-004         |
| Design Patterns | `/docs/architecture/design-patterns.md`                                 | SOP-005         |
| DB Decision     | `/docs/database/database-decision.md`                                   | SOP-100         |
| Schema / ERD    | `/docs/database/schema.md`, `supabase/migrations/00001_init_schema.sql` | SOP-101         |
| Seed Data       | `/docs/database/seed-data.md`, `supabase/seed.sql`                      | SOP-102         |
| API Spec        | ⏭️ Skipped (Supabase BaaS)                                               | SOP-202         |
| Auth Flow       | `/docs/architecture/auth-flow.md`                                       | SOP-203         |
| Auth Schemas    | `packages/shared/src/schemas/auth.ts`                                   | SOP-203         |
| Auth Types      | `packages/shared/src/types/auth.ts`                                     | SOP-203         |
| Component Docs  | {e.g., `/docs/frontend/components.md`}                                  | SOP-300         |
| Visual Design   | {e.g., `/docs/frontend/visual-design.md`}                               | SOP-302         |
| Page Manifest   | {e.g., `/docs/frontend/page-manifest.md`}                               | SOP-305         |

---

## 🔄 Current Session

### Active SOP

**SOP:** SOP-204
**Title:** Authorization
**Status:** ⬚ Not Started

### Context Files to Read

```text
.prompts/AI-SESSION.md                                             # This file (context)
.sops/phase-2-api-backend/SOP-204-authorization.md                 # The procedure
/docs/architecture/auth-flow.md                                    # Auth flow (SOP-203 output)
/docs/architecture/design-patterns.md                              # Auth patterns (§3.8)
```

### Expected Outputs

- [ ] RLS policies implemented
- [ ] Authorization documentation updated

> **AI Agent:** If the current SOP is iterative (SOP-200, 201, 202, or 305), track per-unit progress here. Copy this template for each iterative SOP you execute.

<!--
### Iterative SOP: SOP-{XXX} — {Title}

**Manifest Approved:** ⬚ / ✅

| # | Work Unit | Status | Output Files | Checkpoint |
|---|-----------|--------|--------------|------------|
| 1 | {Unit A}  | ⬚     | {files}      | ⬚         |
| 2 | {Unit B}  | ⬚     | {files}      | ⬚         |
| 3 | {Unit C}  | ⬚     | {files}      | ⬚         |

**Coverage:** 0/{total} units complete
**Status Legend:** ⬚ Not Started · 🔄 In Progress · ✅ Complete
-->

---

## 📝 Session Prompt Template

> **AI Agent:** When updating this section, select the correct **Prompt Pattern** from `AI-GUIDE.md` → "Prompt Patterns" based on the current situation:
>
> | Situation                                       | Pattern to Use                               |
> | ----------------------------------------------- | -------------------------------------------- |
> | Executing a single non-iterative SOP            | **Pattern 1:** Execute a Single SOP          |
> | Resuming from a previous session                | **Pattern 2:** Continue From Last Session    |
> | Executing multiple related SOPs in sequence     | **Pattern 3:** Execute Multiple Related SOPs |
> | Reviewing/verifying completed SOP outputs       | **Pattern 4:** Review and Verify             |
> | Starting a brand new session (context recovery) | **Pattern 5:** Recover Context               |
> | Executing an iterative SOP (200, 201, 202, 305) | **Pattern 6:** Execute Iterative SOP         |
>
> Copy the matching pattern template from `AI-GUIDE.md`, fill in the project-specific values, and replace the prompt below.

```markdown
Execute SOP-204 (Authorization).

Read:

- `.prompts/AI-SESSION.md` for context
- `/docs/architecture/auth-flow.md` for authentication architecture (SOP-203 output)
- `/docs/architecture/design-patterns.md` for auth patterns (§3.8)
- `/docs/database/schema.md` for table structure and RLS needs
- `.sops/phase-2-api-backend/SOP-204-authorization.md` for the procedure

Follow the SOP's Procedure section step by step.
Create all outputs listed in the SOP's Outputs section.
Update `.prompts/AI-SESSION.md` when complete.
Update `.sops/templates/project-checklist.md` when complete.
```

---

## 📓 Session Log

### Session 1 — 2026-03-05

**SOPs Completed:** SOP-000 (pre-existing), SOP-001  
**Files Created:**

- `/docs/requirements.md` (copied from root `requirements.md`)
- `/docs/tech-stack.md` (tech stack decisions with decision matrices)

**Notes:**

- Q7 (Open Questions) resolved as "Native app for Android and iOS" → selected React Native + Expo for mobile.
- Website also required → added Next.js 15 (App Router) for web frontend. Monorepo structure (`apps/mobile`, `apps/web`, `packages/shared`) enables code sharing.
- Supabase chosen as BaaS over Firebase (PostgreSQL relational model fits marketplace data better than NoSQL) and custom Node.js (too much overhead for MVP).
- Admin panel lives in the Next.js web app (role-gated routes) — natural fit for data-heavy admin workflows.
- Only unavoidable costs: Apple Developer Program ($99/year) for iOS + Google Play ($25 one-time).

### Session 2 — 2026-03-06

**SOPs Completed:** SOP-002  
**Files Created:**

- `.gitignore` (Node.js/TypeScript/Expo/Next.js/Supabase ignores)
- `README.md` (project overview, tech stack table, setup instructions, monorepo structure)
- `CONTRIBUTING.md` (GitHub Flow branching, Conventional Commits, PR process)
- `.github/PULL_REQUEST_TEMPLATE.md` (type-of-change checkboxes, self-review checklist, RTL/LTR testing reminder)

**Notes:**

- Branching strategy: GitHub Flow (`main` + short-lived `feature/xxx`, `fix/xxx`, `chore/xxx` branches).
- Commit convention: Conventional Commits with scopes for app/module (`mobile`, `web`, `shared`, `supabase`).
- Repository pushed to `https://github.com/enactus-portsaid/tabadul.git`.

### Session 3 — 2026-03-07

**SOPs Completed:** SOP-003, SOP-004  
**Files Created:**

- `apps/mobile/` — Expo Router structure (`src/app/(tabs)`, `src/app/(auth)`, `src/components/{ui,forms,layout,features}`, `src/hooks`, `src/services`, `src/lib`, `src/config`, `src/types`, `src/stores`)
- `apps/web/` — Next.js App Router structure (`src/app/[locale]/(auth)`, `src/app/[locale]/(main)`, `src/app/[locale]/admin`, same component/service layout as mobile + `src/middleware`)
- `packages/shared/` — Shared package with `src/{types,schemas,constants,locales,utils}`, `package.json`, barrel `index.ts`, and translation stubs (`ar.json`, `en.json`)
- `supabase/` — `functions/`, `migrations/`, `seed/`, `config.toml`
- `tests/unit/`, `tests/integration/` — Cross-app test directories
- `tsconfig.base.json` — Root TypeScript config (strict, ES2022, bundler resolution)
- `apps/mobile/tsconfig.json` — Extends Expo base, `@/*` and `@tabadul/shared/*` aliases
- `apps/web/tsconfig.json` — Extends base, Next.js plugin, `@/*` and `@tabadul/shared/*` aliases
- `packages/shared/tsconfig.json` — Extends base, outputs to `dist/`
- `docs/architecture/project-structure.md` — Directory map, naming conventions, module boundaries, path aliases, barrel file strategy
- Barrel files in `components/{ui,forms,layout}/index.ts` for both apps and `packages/shared/src/{types,schemas,constants}/index.ts`
- `.env.example` — Environment variable template (Supabase, app config, feature flags)
- `/docs/environment-variables.md` — Full variable reference (required/optional, how to obtain, security rules)
- `/docs/development-setup.md` — Prerequisites, quick start, step-by-step, scripts reference, troubleshooting
- `docker-compose.yml` — Standalone PostgreSQL fallback for local dev
- `package.json` — Root workspace config with 20+ scripts (dev, build, db:_, docker:_, etc.)
- `pnpm-workspace.yaml` — pnpm workspace definition (`apps/*`, `packages/*`)
- `.vscode/settings.json` — Updated with editor, TypeScript, Tailwind CSS, and search exclusions
- `.vscode/extensions.json` — Recommended VS Code extensions (Prettier, ESLint, Tailwind CSS, etc.)

**Notes:**

- SOP-003: Monorepo structure follows `/docs/tech-stack.md` §8 exactly: `apps/mobile`, `apps/web`, `packages/shared`, `supabase`.
- SOP-003: Path alias `@/*` maps to `./src/*` in both apps; `@tabadul/shared/*` maps to `../../packages/shared/src/*`.
- SOP-003: Web app uses `[locale]` dynamic segment for i18n routing (`/ar/...`, `/en/...`) with route groups `(auth)`, `(main)`, and `admin`.
- SOP-003: Mobile app uses Expo Router route groups `(tabs)` and `(auth)`.
- SOP-003: Naming conventions: PascalCase (components), camelCase (hooks/utils), kebab-case (routes/configs), SCREAMING_SNAKE (constants).
- SOP-003: `.gitkeep` files placed in empty directories to ensure Git tracks them.
- SOP-004: Local development uses Supabase CLI (`supabase start`) for the full stack (PostgreSQL, Auth, Storage, Realtime, Studio, Edge Functions). Docker Compose provides a standalone PostgreSQL fallback.
- SOP-004: Root `package.json` defines pnpm workspace scripts. `pnpm setup` does install + `.env` copy. `pnpm db:start/stop/reset/migrate/seed` wraps Supabase CLI commands.
- SOP-004: Environment variables grouped into Supabase, Mobile (EXPO*PUBLIC*), Web (NEXT*PUBLIC*), App Config, and Feature Flags. No real secrets committed.
- SOP-004: VS Code settings include format-on-save (Prettier), ESLint auto-fix, Tailwind CSS IntelliSense, and search exclusions for build artifacts.

### Session 4 — 2026-03-07

**SOPs Completed:** SOP-005  
**Files Created:**

- `/docs/architecture/design-patterns.md` — Architectural pattern, application layer pattern, 10 code-level patterns with examples

**Notes:**

- SOP-005: Selected **BaaS-Driven Layered Architecture** — Supabase handles the entire backend; frontend apps follow layer-based internal organization.
- SOP-005: Application layer uses **Layer-Based** organization (not Feature-Based) to match SOP-003's established structure. Cross-cutting visibility prioritized over feature isolation for small team.
- SOP-005: Data access uses **Service Functions** (function-based, one file per domain) wrapping Supabase JS client directly — no Repository pattern needed since Supabase client IS the data access abstraction.
- SOP-005: React patterns: **Custom Hooks** for logic extraction, **Composition** for UI, component hierarchy (ui → forms → layout → features).
- SOP-005: State split: **TanStack Query** for all server state (Supabase data), **Zustand** for client-only state (language pref, UI toggles).
- SOP-005: **Query Key Factory** pattern for consistent TanStack Query cache management and invalidation.
- SOP-005: **Result Pattern** (`{ data, error }`) preserved from Supabase throughout service layer — no exception throwing.
- SOP-005: Three-tier authorization: route-level guards (middleware/layouts) → RLS policies (database) → Edge Function business rule checks.
- SOP-005: Real-time data (chat, bids) handled via Supabase Realtime subscription hooks that update TanStack Query cache directly.
- SOP-005: Anti-patterns documented (direct Supabase calls in components, Zustand for server data, hardcoded strings, fat components, etc.).

### Session 5 — 2026-03-08

**SOPs Completed:** SOP-006
**Files Created/Updated:**

- `eslint.config.mjs` — ESLint 9 flat config for monorepo (TypeScript, React, Next.js web-only rules, import sorting, Prettier compat)
- `prettier.config.js` — Prettier config (semi, singleQuote, tabWidth 2, trailingComma es5, printWidth 80, endOfLine lf, Tailwind class sorting plugin)
- `lint-staged.config.js` — Lint-staged config (ESLint + Prettier on staged TS/JS files, Prettier on JSON/MD/YAML/CSS)
- `.husky/pre-commit` — Husky pre-commit hook running `pnpm lint-staged`
- `.prettierignore` — Ignore patterns for Prettier (node_modules, .next, .expo, dist, pnpm-lock.yaml, supabase/functions)
- `.vscode/settings.json` — Updated: ESLint flat config enabled, ESLint validate languages added, ruler changed to 80
- `package.json` — Updated: added `lint:fix`, `format`, `format:check`, `type-check` scripts; `lint` now runs ESLint directly at root

**Notes:**

- SOP-006: **ESLint 9** flat config (`eslint.config.mjs`) chosen over legacy `.eslintrc` — modern standard, better monorepo support.
- SOP-006: ESLint pinned to v9 (not v10) due to peer dependency incompatibility with `eslint-plugin-react`, `eslint-plugin-react-hooks`, and `eslint-config-next`.
- SOP-006: Next.js-specific rules (`@next/next` plugin with `recommended` + `core-web-vitals`) scoped to `apps/web/**` only — doesn't affect mobile app files.
- SOP-006: Import order enforced by `simple-import-sort` — automatic sorting: React/framework → external → internal (`@/`) → relative.
- SOP-006: Tailwind CSS class sorting via `prettier-plugin-tailwindcss` — works for both NativeWind (mobile) and Tailwind CSS (web).
- SOP-006: Naming conventions from SOP-003 already documented: PascalCase (components/types), camelCase (variables/functions/hooks), SCREAMING_SNAKE (constants), kebab-case (utility files).
- SOP-006: Comment standards: `// TODO(name): reason (target date)` format; JSDoc for exported public functions; explain "why" not "what".
- SOP-006: Component hierarchy documentation not created here, as it belongs to frontend phase.
- SOP-006: Pre-commit workflow: staged files → ESLint --fix → Prettier --write → commit (via Husky + lint-staged).

### Session 8 — 2026-03-17

**SOPs Completed:** SOP-102  
**Files Created:**

- `supabase/seed.sql` (Comprehensive seed script with 5 auth users, profiles, categories, listings, bids, chat, and full transaction lifecycle)
- `/docs/database/seed-data.md` (Documentation on test credentials and seeded data topologies)

**Notes:**

- Adapted SOP-102's Prisma instruction to Supabase's native `seed.sql`.
- Inserted users into `auth.users` directly in the seed script using `pgcrypto` to hash standard passwords (`password123`) to streamline local development testing across roles.

### Session 6 — 2026-03-09

**SOPs Completed:** SOP-100  
**Files Created:**

- `/docs/database/database-decision.md`

**Notes:**

- Evaluated data requirements from `/docs/requirements.md`.
- Confirmed PostgreSQL hosted on Supabase as the best fit for relational marketplace interactions and robust transactions.
- Confirmed Supabase JS Client as the ORM approach without abstraction layers to maintain alignment with the chosen layered BaaS architecture.

### Session 7 — 2026-03-13

**SOPs Completed:** SOP-101
**Files Created:**

- `/docs/database/schema.md` — Complete schema documentation (Mermaid ERD, 16 table definitions, 10 enums, 29 indexes, normalization notes, design decisions)
- `supabase/migrations/00001_init_schema.sql` — PostgreSQL init migration (enums, tables, indexes, triggers, check constraints)

**Notes:**

- SOP-101: **Adapted SOP output from Prisma to Supabase SQL migration** — SOP template references `prisma/schema.prisma`, but approved tech stack (SOP-001, SOP-100) uses Supabase JS Client. Output changed to `supabase/migrations/00001_init_schema.sql`.
- SOP-101: 16 entities extracted from requirements: Profile, WasteCategory, Listing, ListingPhoto, Bid, Bookmark, ChatThread, Message, Transaction, Payment, InspectionReport, Review, Notification, NotificationPreference, Dispute, MatchRecommendation.
- SOP-101: `profiles` table references `auth.users(id)` — standard Supabase pattern where Auth manages credentials and `profiles` stores app-specific data.
- SOP-101: Monetary fields use `numeric(12,2)` for exact EGP arithmetic. Timestamps use `timestamptz` for timezone-aware storage.
- SOP-101: Check constraints enforce business rules: fixed-price listings require `price`, auction listings require `minimum_bid` + `auction_ends_at`, buyer ≠ seller on transactions/chats/reviews.
- SOP-101: `avg_rating` / `total_reviews` on `profiles` are intentionally denormalized (3NF violation) for read performance, maintained by a database trigger on `reviews` insert.
- SOP-101: `updated_at` auto-maintained by trigger function `update_updated_at_column()` on 5 tables.

### Session 9 — 2026-04-05

**SOPs Completed:** SOP-203 (Authentication)  
**SOPs Skipped:** SOP-201 (Repository Pattern), SOP-202 (API Design) — per execution brief  
**Files Created:**

- `packages/shared/src/schemas/auth.ts` (Zod schemas: signIn, signUp, updateProfile, resetPassword, updatePassword)
- `packages/shared/src/types/auth.ts` (TypeScript types: Profile, AuthUser, AuthState, AuthActions, route constants)
- `apps/mobile/src/lib/supabase.ts` (Supabase client with expo-secure-store adapter)
- `apps/web/src/lib/supabase.ts` (Browser Supabase client via @supabase/ssr)
- `apps/web/src/lib/supabaseServer.ts` (Server Supabase client for RSC/Route Handlers)
- `apps/mobile/src/hooks/useAuth.ts` (Auth hook: session, profile, signIn/signUp/signOut/resetPassword)
- `apps/web/src/hooks/useAuth.ts` (Web auth hook with Next.js router integration)
- `apps/mobile/src/lib/queryKeys.ts` (Query key factory: auth, listings, transactions, chat, notifications, matching)
- `apps/web/src/lib/queryKeys.ts` (Query key factory: identical to mobile)
- `apps/mobile/src/app/_layout.tsx` (Root layout: QueryClientProvider + AuthGuard)
- `apps/mobile/src/app/(auth)/_layout.tsx` (Auth route group: headerless Stack)
- `apps/mobile/src/app/(tabs)/_layout.tsx` (Protected tabs: Home, Marketplace, Chat, Profile)
- `apps/web/src/middleware.ts` (Next.js middleware: locale detection + session refresh + auth redirect + admin role gate)
- `apps/web/src/app/[locale]/(auth)/layout.tsx` (Auth pages: centered form container)
- `apps/web/src/app/[locale]/(main)/layout.tsx` (Protected pages: server-side auth check)
- `/docs/architecture/auth-flow.md` (Auth documentation: sequence diagrams, security model, file manifest)

**Files Updated:**

- `packages/shared/src/schemas/index.ts` (Added auth schema exports)
- `packages/shared/src/types/index.ts` (Added auth type exports)

**Notes:**

- SOP-203: **Auth strategy confirmed as Supabase Auth** per tech-stack.md — email/password with JWT tokens.
- SOP-203: **Mobile tokens stored in expo-secure-store** (iOS Keychain / Android Keystore). Web uses HTTP-only cookies via `@supabase/ssr`.
- SOP-203: **useAuth hook** pattern follows design-patterns.md §3.8 — TanStack Query for session + profile caching, `onAuthStateChange` listener keeps cache synced.
- SOP-203: **Three-tier route protection**: (1) Middleware/AuthGuard redirects, (2) Server-side layout auth check, (3) RLS policies at DB level.
- SOP-203: **Web middleware uses `getUser()` not `getSession()`** — server-validates the token with Supabase Auth to prevent forgery (official Supabase recommendation).
- SOP-203: **Zod schemas use i18n keys** as error messages (e.g., `'auth.validation.emailRequired'`) — ready for Arabic/English translation in Phase 3.
- SOP-203: **SOP-201 and SOP-202 marked as skipped** per execution brief §5 — Supabase handles API generation and data access natively.
