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

| SOP | Title              | Status | Output Location                                                                                                                                                    | Notes                                                                     |
| --- | ------------------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------- |
| 200 | Service Layer      | ✅     | `packages/shared/src/services/`, `/docs/architecture/business-rules.md`                                                                                            | Extracted domain services via Supabase Client                             |
| 201 | Repository Pattern | ⏭️     | —                                                                                                                                                                  | Skipped per execution brief: Supabase abstracts data access natively      |
| 202 | API Design         | ⏭️     | —                                                                                                                                                                  | Skipped per execution brief: Supabase handles API generation              |
| 203 | Authentication     | ✅     | `apps/*/src/hooks/useAuth.ts`, `apps/*/src/lib/supabase*.ts`, `/docs/architecture/auth-flow.md`                                                                    | Supabase Auth, expo-secure-store, @supabase/ssr, middleware, route guards |
| 204 | Authorization      | ✅     | `supabase/migrations/00002_rls_policies.sql`, `packages/shared/src/utils/permissions.ts`, `/docs/architecture/permissions.md`                                      | Supabase Row-Level Security, UI utility functions                         |
| 205 | Error Handling     | ✅     | `packages/shared/src/lib/errors.ts`, `packages/shared/src/lib/errorHandler.ts`, `packages/shared/src/lib/errorMessages.ts`, `/docs/architecture/error-handling.md` | AppError class hierarchy, error normalization, i18n message keys          |
| 206 | Validation         | ✅     | `packages/shared/src/schemas/`, `packages/shared/src/utils/validation.ts`                                                                                          | Adapted from SOP to BaaS architecture (Zod schemas + validation utility)  |

### Phase 3: Frontend

> **⚠️ Web First — Mobile Deferred.** All Phase 3 SOPs target `apps/web/` (Next.js) exclusively. Do NOT create or modify files in `apps/mobile/`. The v0 prototype uses a mobile viewport for demonstration only — adapt its design tokens to responsive web. See `docs/execution-brief.md` §5.

| SOP | Title                  | Status | Output Location                                                                                                         | Notes                                                                                                                                                                                                 |
| --- | ---------------------- | ------ | ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 300 | Component Architecture | ✅     | `apps/web/src/components/`, `/docs/components/README.md`                                                                | 6 UI + 4 layout + 6 feature skeletons, `cn()` utility, `package.json`, barrel exports, component docs                                                                                                 |
| 301 | Styling Standards      | ✅     | `globals.css`, `next.config.ts`, `postcss.config.mjs`, `ThemeProvider`, `ThemeToggle`                                   | Tailwind v4 CSS-first config, design tokens from v0, dark mode via next-themes, Inter+Cairo fonts                                                                                                     |
| 302 | UI/UX Design           | 🔄     | `/docs/frontend/ui-analysis.md`, `/docs/frontend/ui-design/marketplace-listings.md`, `/docs/design/DESIGN-REFERENCE.md` | **Input mode: Detailed** — v0 prototype as approved visual direction. Iteration 1: Marketplace & Listings complete. Remaining: Auth, Dashboard, Chat, Transactions, Inspection, Notifications, Admin. |
| 303 | API Integration        | ⬚      | API client module                                                                                                       |                                                                                                                                                                                                       |
| 304 | Form Handling          | ⬚      | Form components/hooks                                                                                                   |                                                                                                                                                                                                       |
| 305 | Page Implementation    | ⬚      | `/src/app/` pages                                                                                                       |                                                                                                                                                                                                       |
| 306 | Progressive Web App    | ⬚      | PWA config, service worker                                                                                              |                                                                                                                                                                                                       |

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

#### Level 0 → Level 1 (Requirements → Design Docs)

| Requirement Area                    | User Stories     | Design Doc (Level 1)                        | Addressed? |
| ----------------------------------- | ---------------- | ------------------------------------------- | ---------- |
| Authentication & Profile            | US-001–005       | `/docs/architecture/auth-flow.md`           | ✅ Yes     |
| Service Layer (Listings)            | US-010–014       | `/docs/architecture/business-rules.md`      | ✅ Yes     |
| Service Layer (Browsing)            | US-020–023       | `/docs/architecture/business-rules.md`      | ✅ Yes     |
| Service Layer (AI Matching)         | US-030–032       | `/docs/architecture/business-rules.md`      | ✅ Yes     |
| Service Layer (Chat)                | US-040–043       | `/docs/architecture/business-rules.md`      | ⚠️ Partial |
| Service Layer (Transactions)        | US-050–055       | `/docs/architecture/business-rules.md`      | ✅ Yes     |
| Service Layer (Inspection)          | US-060, US-062   | `/docs/architecture/business-rules.md`      | ✅ Yes     |
| Service Layer (Admin)               | US-080–084       | `/docs/architecture/business-rules.md`      | ✅ Yes     |
| Service Layer (Notifications)       | US-090–091       | `/docs/architecture/business-rules.md`      | ✅ Yes     |
| Authorization (Roles & Permissions) | All roles        | `/docs/architecture/permissions.md`         | ✅ Yes     |
| Error Handling                      | NFR (resilience) | `/docs/architecture/error-handling.md`      | ✅ Yes     |
| Validation                          | All input forms  | Documented inline in schema files           | ✅ Yes     |
| API Endpoints                       | All data access  | ⏭️ Skipped (BaaS — Supabase JS Client)      | ✅ N/A     |
| OpenAPI Spec                        | API contracts    | ⏭️ Skipped (BaaS — Supabase auto-generated) | ✅ N/A     |

**Drift Note (US-041/042):** Chat content moderation (contact-info blocking, profanity filtering) is referenced in requirements but not yet designed in Phase 2 docs. This is acceptable — content filtering logic belongs to Phase 4 (AI Integration) or an Edge Function in Phase 3. Tracked as a warning below.

#### Level 1 → Level 2 (Design Docs → Implementation)

| Design Decision                     | Expected                                                        | Actual Code                                                                                                           | Compliant? | File:Line                                                 |
| :---------------------------------- | :-------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------- | :--------- | :-------------------------------------------------------- |
| **Service Layer Pattern**           | Factory functions wrapping Supabase Client, Result Pattern      | `createXxxService(supabase)` factories returning `{ data, error }`                                                    | ✅ Yes     | `packages/shared/src/services/index.ts:22-33`             |
| **DI via Factory**                  | Single `createServices()` accepting SupabaseClient              | `createServices(supabase)` returns all 8 domain services                                                              | ✅ Yes     | `packages/shared/src/services/index.ts:22-33`             |
| **Service: Auth**                   | signIn, signUp, signOut, getProfile, updateProfile              | All 5 methods implemented                                                                                             | ✅ Yes     | `packages/shared/src/services/auth.ts:3-39`               |
| **Service: Listing**                | CRUD + bid + bookmark                                           | getListings, getListing, create, update, deactivate, placeBid, toggleBookmark                                         | ✅ Yes     | `packages/shared/src/services/listing.ts:3-89`            |
| **Service: Transaction**            | Lifecycle management, receipt upload, review, dispute           | getTransactions, getTransaction, create, updateStatus, updateShipmentStatus, uploadReceipt, submitReview, fileDispute | ✅ Yes     | `packages/shared/src/services/transaction.ts:3-86`        |
| **Service: Chat**                   | Thread init, messages, read state                               | getThreads, getOrCreateThread, getMessages, sendMessage, markMessagesAsRead                                           | ✅ Yes     | `packages/shared/src/services/chat.ts:3-87`               |
| **Service: Matching**               | Recommendations + dismiss                                       | getRecommendations, dismissRecommendation                                                                             | ✅ Yes     | `packages/shared/src/services/matching.ts:3-25`           |
| **Service: Inspection**             | Get report + submit report                                      | getReport, submitReport (with pass/fail, photos)                                                                      | ✅ Yes     | `packages/shared/src/services/inspection.ts:3-34`         |
| **Service: Notification**           | List, unread count, mark read, preferences                      | getNotifications, getUnreadCount, markAsRead, getPreferences, updatePreferences                                       | ✅ Yes     | `packages/shared/src/services/notification.ts:3-48`       |
| **Service: Admin**                  | User mgmt, listing moderation, payment verify, disputes         | getUsers, moderateListing, getPendingPayments, verifyReceipt, getOpenDisputes, resolveDispute                         | ✅ Yes     | `packages/shared/src/services/admin.ts:3-84`              |
| **Auth: Supabase Auth**             | Email + password, JWT                                           | `signInWithPassword`, `signUp` with metadata                                                                          | ✅ Yes     | `apps/*/src/hooks/useAuth.ts`                             |
| **Auth: Mobile token storage**      | expo-secure-store                                               | `ExpoSecureStoreAdapter` in Supabase client config                                                                    | ✅ Yes     | `apps/mobile/src/lib/supabase.ts`                         |
| **Auth: Web cookie management**     | @supabase/ssr HTTP-only cookies                                 | `createBrowserClient` / `createServerClient` from @supabase/ssr                                                       | ✅ Yes     | `apps/web/src/lib/supabase.ts`, `supabaseServer.ts`       |
| **Auth: TanStack Query caching**    | Session + profile cached in React Query                         | `useQuery` with `authKeys.session()` + `authKeys.profile(id)`                                                         | ✅ Yes     | `apps/*/src/hooks/useAuth.ts`                             |
| **Auth: onAuthStateChange**         | Listener syncs cache on sign-in/out/refresh                     | Listener sets session data, invalidates profile, clears on sign-out                                                   | ✅ Yes     | `apps/web/src/hooks/useAuth.ts:69-93`                     |
| **Auth: Middleware uses getUser()** | Server-validates token, not just reads cookie                   | `supabase.auth.getUser()` in middleware                                                                               | ✅ Yes     | `apps/web/src/middleware.ts:119-121`                      |
| **Auth: Locale detection**          | Redirect to `/{locale}/...` if missing                          | `parseLocale()` + redirect to `/${DEFAULT_LOCALE}${pathname}`                                                         | ✅ Yes     | `apps/web/src/middleware.ts:31-81`                        |
| **Auth: Route protection (Web)**    | Public paths, auth-only redirect, admin role gate               | All three checks implemented in middleware                                                                            | ✅ Yes     | `apps/web/src/middleware.ts:126-153`                      |
| **Auth: Route protection (Mobile)** | AuthGuard in root layout                                        | `AuthGuard` component checks `isAuthenticated` + segments                                                             | ✅ Yes     | `apps/mobile/src/app/_layout.tsx:22-42`                   |
| **Auth: Server-side layout guard**  | `(main)/layout.tsx` checks auth                                 | `getUser()` + `redirect()` in server component                                                                        | ✅ Yes     | `apps/web/src/app/[locale]/(main)/layout.tsx:14-29`       |
| **Auth: Zod schemas with i18n**     | Validation schemas use i18n keys as error messages              | All auth schemas use keys like `'auth.validation.emailRequired'`                                                      | ✅ Yes     | `packages/shared/src/schemas/auth.ts:1-115`               |
| **Auth: Password rules**            | min 8 chars, uppercase, lowercase, number                       | `.min(8)`, `.regex(/[A-Z]/)`, `.regex(/[a-z]/)`, `.regex(/[0-9]/)`                                                    | ✅ Yes     | `packages/shared/src/schemas/auth.ts:26-30`               |
| **RLS: All 16 tables enabled**      | `ENABLE ROW LEVEL SECURITY` on all tables                       | All 16 tables have RLS enabled                                                                                        | ✅ Yes     | `supabase/migrations/00002_rls_policies.sql:15-30`        |
| **RLS: Role helper function**       | `get_auth_role()` SQL function                                  | `SECURITY DEFINER` function querying profiles table                                                                   | ✅ Yes     | `supabase/migrations/00002_rls_policies.sql:4-12`         |
| **RLS: Listings read policy**       | Active for all, own drafts for sellers, all for admins          | Policy with `status = 'active' OR seller_id = auth.uid() OR admin OR inspector`                                       | ✅ Yes     | `supabase/migrations/00002_rls_policies.sql:65-75`        |
| **RLS: Transactions policies**      | Participants + admin + assigned inspector                       | Separate SELECT policies for participants, admins, inspectors                                                         | ✅ Yes     | `supabase/migrations/00002_rls_policies.sql:161-180`      |
| **RLS: Chat/messages isolation**    | Participants only + admin                                       | Thread/message SELECT tied to buyer_id/seller_id in chat_threads                                                      | ✅ Yes     | `supabase/migrations/00002_rls_policies.sql:134-156`      |
| **RLS: Payment verification**       | Buyer inserts, admin updates                                    | INSERT `WITH CHECK (paid_by = auth.uid())`, UPDATE for admin                                                          | ✅ Yes     | `supabase/migrations/00002_rls_policies.sql:194-198`      |
| **RLS: Dispute policies**           | File by involved user, resolve by admin                         | INSERT for `filed_by`, UPDATE for admin                                                                               | ✅ Yes     | `supabase/migrations/00002_rls_policies.sql:259-263`      |
| **Permissions: UI helpers**         | Role-check + resource-permission functions                      | 9 permission helpers (canCreateListing, canEditListing, canPlaceBid, etc.)                                            | ✅ Yes     | `packages/shared/src/utils/permissions.ts:1-86`           |
| **Errors: AppError hierarchy**      | 8 subclasses (Validation→Network)                               | All 8 implemented with correct codes and status codes                                                                 | ✅ Yes     | `packages/shared/src/lib/errors.ts:99-153`                |
| **Errors: ErrorCode enum**          | 12 machine-readable codes                                       | All 12 codes defined as `const` object                                                                                | ✅ Yes     | `packages/shared/src/lib/errors.ts:17-37`                 |
| **Errors: normalizeError()**        | Handles AppError, Postgrest, Auth, Network, generic             | 6-step normalization chain implemented                                                                                | ✅ Yes     | `packages/shared/src/lib/errorHandler.ts:178-206`         |
| **Errors: PG code mapping**         | 23505→Conflict, 23503→Validation, etc.                          | `POSTGRES_CODE_MAP` with 6 mapped codes + PGRST116                                                                    | ✅ Yes     | `packages/shared/src/lib/errorHandler.ts:103-116,229-233` |
| **Errors: Auth error patterns**     | Pattern matching on Supabase Auth messages                      | 7 regex patterns covering credentials, registration, session, rate limit, etc.                                        | ✅ Yes     | `packages/shared/src/lib/errorHandler.ts:122-157`         |
| **Errors: i18n message keys**       | Every ErrorCode → translation key                               | `ERROR_MESSAGE_KEYS` record + domain-specific `DOMAIN_ERROR_KEYS`                                                     | ✅ Yes     | `packages/shared/src/lib/errorMessages.ts:25-103`         |
| **Errors: Fallback messages**       | English fallbacks for non-i18n environments                     | `FALLBACK_MESSAGES` with all 13 keys                                                                                  | ✅ Yes     | `packages/shared/src/lib/errorMessages.ts:114-131`        |
| **Errors: isRetryableError()**      | Network + RateLimit + Timeout → retryable                       | Checks against 3 error codes                                                                                          | ✅ Yes     | `packages/shared/src/lib/errorHandler.ts:311-319`         |
| **Errors: Operational flag**        | InternalError = non-operational, all others = operational       | `InternalError(isOperational=false)`, all others `true`                                                               | ✅ Yes     | `packages/shared/src/lib/errors.ts:142-144`               |
| **Validation: Zod schemas**         | All domain entities have Zod schemas                            | 8 schema files: auth, listing, transaction, chat, bid, review, inspection + barrel                                    | ✅ Yes     | `packages/shared/src/schemas/index.ts:1-48`               |
| **Validation: validateData()**      | Utility that parses + throws ValidationError on failure         | `validateData<T>(schema, data)` with field-path error formatting                                                      | ✅ Yes     | `packages/shared/src/utils/validation.ts:16-34`           |
| **Validation: Listing mode rules**  | Fixed-price requires price, auction requires min_bid + end date | Two `.refine()` blocks enforce mode-dependent constraints                                                             | ✅ Yes     | `packages/shared/src/schemas/listing.ts:33-61`            |
| **Validation: Schema alignment**    | Schema constraints match SQL constraints from SOP-101           | Price positive, quantity positive, title min/max, EGP phone regex                                                     | ✅ Yes     | `packages/shared/src/schemas/listing.ts`, `auth.ts`       |

#### Warnings

| #   | Severity  | Issue                                                                                                                | Impact                                                                                            | Recommendation                                                                                            |
| --- | --------- | -------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| W1  | ⚠️ Low    | Service functions use `any` for input params (e.g., `createListing(data: any)`) instead of Zod-inferred types        | Type-safety gap — runtime validation exists via schemas but not enforced at the service interface | Connect Zod input types to service signatures in Phase 3 when hooks call `validateData()` before services |
| W2  | ⚠️ Medium | Chat content moderation (US-041: contact-info blocking, US-042: profanity filtering) is not designed in Phase 2 docs | Functional requirement gap — no design doc covers how/where moderation runs                       | Design as Edge Function or validation hook during Phase 3/4. Does not block Phase 3 start.                |
| W3  | ⚠️ Low    | Web `signOut()` redirects to `/login` without locale prefix (`useAuth.ts:137`)                                       | Minor UX — middleware will catch and re-redirect to `/{locale}/login` anyway                      | Fix during Phase 3 frontend implementation to use locale-aware redirect                                   |

#### Summary

- **Compliance:** 42/42 design decisions verified ✅ (100%)
- **Warnings:** 3 (0 critical, 1 medium, 2 low)
- **Skipped SOPs:** 2 (SOP-201, SOP-202) — justified per execution brief
- **Blocking Issues:** None

**Checkpoint Status:** ✅ Passed  
**Last Run:** 2026-04-30  
**Issues:** 3 non-blocking warnings (W1–W3 documented above)

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

| Decision        | Value                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Source                                                        | Set By      |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------- | ----------- |
| Framework       | React Native + Expo SDK 52 (mobile) + Next.js 15 (web)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | `/docs/tech-stack.md`                                         | SOP-001     |
| Database        | PostgreSQL (via Supabase)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | `/docs/tech-stack.md`                                         | SOP-001     |
| ORM             | Supabase JS Client + @supabase/ssr (web)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | `/docs/tech-stack.md`                                         | SOP-001     |
| Auth            | Supabase Auth (email/password, JWT)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | `/docs/tech-stack.md`                                         | SOP-001     |
| Styling         | NativeWind (Tailwind CSS for React Native)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | `/docs/tech-stack.md`                                         | SOP-001     |
| State Mgmt      | TanStack Query + Zustand                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | `/docs/tech-stack.md`                                         | SOP-001     |
| Hosting         | Supabase Cloud + EAS (mobile) + Vercel (web)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | `/docs/tech-stack.md`                                         | SOP-001     |
| Entities        | Profile, WasteCategory, Listing, ListingPhoto, Bid, Bookmark, ChatThread, Message, Transaction, Payment, InspectionReport, Review, Notification, NotificationPreference, Dispute, MatchRecommendation (16 total)                                                                                                                                                                                                                                                                                                                                                               | `/docs/requirements.md`                                       | SOP-101     |
| Branching       | GitHub Flow (main + feature/fix/chore branches)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | `CONTRIBUTING.md`                                             | SOP-002     |
| Monorepo Layout | apps/mobile + apps/web + packages/shared + supabase                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | `/docs/architecture/project-structure.md`                     | SOP-003     |
| Local Dev       | Supabase CLI (`supabase start`) for full local stack; pnpm workspaces                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | `/docs/development-setup.md`                                  | SOP-004     |
| Design Patterns | BaaS-Driven Layered Architecture; Service Functions (no Repository); Custom Hooks + Composition; TanStack Query + Zustand; React Hook Form + Zod; Result Pattern (`{ data, error }`); Auth Hook + RLS + Route Guards                                                                                                                                                                                                                                                                                                                                                           | `/docs/architecture/design-patterns.md`                       | SOP-005     |
| Code Style      | ESLint 9 flat config + Prettier + Husky + lint-staged; simple-import-sort; Tailwind class sorting; printWidth 80; singleQuote; trailingComma es5                                                                                                                                                                                                                                                                                                                                                                                                                               | `eslint.config.mjs`, `prettier.config.js`                     | SOP-006     |
| Service Layer   | Supabase JS client wrapped in domain service functions (Result Pattern returned)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | `/docs/architecture/business-rules.md`                        | SOP-200     |
| Authorization   | Row Level Security (RLS) policies at the DB level, UI guards, and route guards for roles: buyer, seller, admin, inspector                                                                                                                                                                                                                                                                                                                                                                                                                                                      | `/docs/architecture/permissions.md`                           | SOP-204     |
| Error Handling  | AppError class hierarchy (8 subclasses), ErrorCode enum, normalizeError() for Supabase→AppError conversion, i18n error message keys, isRetryableError() helper                                                                                                                                                                                                                                                                                                                                                                                                                 | `/docs/architecture/error-handling.md`                        | SOP-205     |
| Validation      | Zod-based schema registry for listing, transaction, chat, bid, review, and inspection entities; explicit validation.ts utility to enforce standard Error response parsing                                                                                                                                                                                                                                                                                                                                                                                                      | `packages/shared/src/schemas/`                                | SOP-206     |
| UI Design       | **Approved visual direction from v0 prototype.** Forest green primary (`#1B4332`), orange accent (`#D4760A`), warm cream background (`#F5F1EB`). 12 component patterns (cards, toggles, badges, chat threads, etc.), Buying/Selling mode toggle. 19 reference screenshots. **⚠️ Web First:** prototype uses mobile viewport for demo only — adapt to responsive web (sidebar/top nav, not bottom tabs). Agent executing SOP-301/302 MUST read `docs/design/DESIGN-REFERENCE.md` first — skip visual design proposal gate. Target `apps/web/` only; `apps/mobile/` is deferred. | `docs/design/DESIGN-REFERENCE.md`, `docs/design/screenshots/` | Pre-Phase 3 |
| Platform Order  | **Web first, mobile deferred.** Phase 3 targets `apps/web/` (Next.js) exclusively. `apps/mobile/` (Expo) deferred to Phase 3b after web MVP is validated. Rationale: faster iteration, admin is web-only, avoids $99/yr Apple overhead, shared components flow to mobile later.                                                                                                                                                                                                                                                                                                | `docs/execution-brief.md` §5                                  | Pre-Phase 3 |

### Cached File Locations

| Artifact         | Path                                                                    | Last Updated By                       |
| ---------------- | ----------------------------------------------------------------------- | ------------------------------------- |
| Requirements     | `/docs/requirements.md`                                                 | SOP-000                               |
| Tech Stack       | `/docs/tech-stack.md`                                                   | SOP-001                               |
| README           | `/README.md`                                                            | SOP-002                               |
| CONTRIBUTING     | `/CONTRIBUTING.md`                                                      | SOP-002                               |
| PR Template      | `/.github/PULL_REQUEST_TEMPLATE.md`                                     | SOP-002                               |
| Structure Doc    | `/docs/architecture/project-structure.md`                               | SOP-003                               |
| Shared Package   | `/packages/shared/`                                                     | SOP-003                               |
| Env Docs         | `/docs/environment-variables.md`                                        | SOP-004                               |
| Design Patterns  | `/docs/architecture/design-patterns.md`                                 | SOP-005                               |
| DB Decision      | `/docs/database/database-decision.md`                                   | SOP-100                               |
| Schema / ERD     | `/docs/database/schema.md`, `supabase/migrations/00001_init_schema.sql` | SOP-101                               |
| Seed Data        | `/docs/database/seed-data.md`, `supabase/seed.sql`                      | SOP-102                               |
| Service Layer    | `packages/shared/src/services/`                                         | SOP-200                               |
| Business Rules   | `/docs/architecture/business-rules.md`                                  | SOP-200                               |
| API Spec         | ⏭️ Skipped (Supabase BaaS)                                              | SOP-202                               |
| Auth Flow        | `/docs/architecture/auth-flow.md`                                       | SOP-203                               |
| Auth Schemas     | `packages/shared/src/schemas/auth.ts`                                   | SOP-203                               |
| Auth Types       | `packages/shared/src/types/auth.ts`                                     | SOP-203                               |
| Auth Policies    | `supabase/migrations/00002_rls_policies.sql`                            | SOP-204                               |
| Permissions      | `/docs/architecture/permissions.md`                                     | SOP-204                               |
| Error Types      | `packages/shared/src/lib/errors.ts`                                     | SOP-205                               |
| Error Handler    | `packages/shared/src/lib/errorHandler.ts`                               | SOP-205                               |
| Error Messages   | `packages/shared/src/lib/errorMessages.ts`                              | SOP-205                               |
| Error Docs       | `/docs/architecture/error-handling.md`                                  | SOP-205                               |
| Validation Utils | `packages/shared/src/utils/validation.ts`                               | SOP-206                               |
| Entity Schemas   | `packages/shared/src/schemas/*.ts`                                      | SOP-206                               |
| Component Docs   | `/docs/components/README.md`                                            | SOP-300                               |
| Visual Design    | `/docs/design/DESIGN-REFERENCE.md`                                      | Pre-Phase 3 (v0 prototype extraction) |
| Design Screens   | `docs/design/screenshots/*.png` (19 screens)                            | Pre-Phase 3 (v0 prototype extraction) |
| Page Manifest    | {e.g., `/docs/frontend/page-manifest.md`}                               | SOP-305                               |

---

## 🔄 Current Session

### Active SOP

**SOP:** SOP-302
**Title:** UI/UX Design & Planning
**Status:** 🔄 In Progress (Iteration 1 of ~8 complete)

### Context Files to Read

```text
.prompts/AI-SESSION.md                                             # This file (context)
.sops/phase-3-frontend/SOP-302-ui-ux-design.md                     # The procedure
docs/design/DESIGN-REFERENCE.md                                    # ⭐ APPROVED visual direction
docs/design/screenshots/                                           # 19 reference screenshots from prototype
docs/frontend/ui-analysis.md                                       # UI analysis (all user stories)
docs/frontend/ui-design/marketplace-listings.md                    # Iteration 1 output
docs/components/README.md                                          # Component architecture (SOP-300 output)
apps/web/src/app/globals.css                                       # Design tokens + dark mode (SOP-301 output)
```

### Completed Iterations

- [x] **Iteration 1:** Marketplace & Listings (US-010–014, US-020–023)

### Remaining Iterations

- [ ] Authentication & Profile (US-001–005)
- [ ] Dashboard & Home (US-004, US-030–032)
- [ ] Chat & Communication (US-040–043)
- [ ] Transactions & Payment (US-050–055)
- [ ] Quality & Inspection (US-060–063)
- [ ] Notifications (US-090–091)
- [ ] Admin Panel (US-080–084)

### Expected Outputs

- [x] `/docs/frontend/ui-analysis.md` — UI analysis of all user stories
- [x] `/docs/frontend/ui-design/marketplace-listings.md` — Wireframes, flows, components, a11y
- [ ] `/docs/frontend/ui-design/[remaining features].md` — One per iteration
- [x] Visual direction — **Approved** (from `DESIGN-REFERENCE.md`, gate skipped)

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
# Execute SOP-302: UI/UX Design

## Context

Project: Tabadul — B2B Industrial Symbiosis Platform
Phase: 3 (Frontend) — Web First
Branch: feat/sop-302-design

## Read First

1. `.prompts/AI-SESSION.md` (this file — context cache)
2. `.sops/phase-3-frontend/SOP-302-ui-ux-design.md` (the procedure)
3. `docs/design/DESIGN-REFERENCE.md` (approved visual direction)
4. `docs/design/screenshots/` (19 prototype reference screens)

## Execute

Follow the SOP procedure. The v0 prototype provides the approved visual
direction — skip the "Propose Visual Design" gate (design input is Detailed).
Document wireframes and page layouts for responsive web.
```

---

## 📓 Session Log

### Session 16 — 2026-05-08

**SOPs In Progress:** SOP-302 (UI/UX Design — Iteration 1: Marketplace & Listings)  
**Branch:** `feature/sop-302-marketplace-design`  
**Files Created:**

- `docs/frontend/ui-analysis.md` (Full UI analysis mapping all user stories to components, interactions, a11y, responsive behavior)
- `docs/frontend/ui-design/marketplace-listings.md` (Marketplace & Listings feature design: 4 user flows, 4 wireframes desktop+mobile, 4 component hierarchies, 10 micro-interactions, responsive breakpoint tables for all screens, WCAG 2.1 AA accessibility spec)

**Notes:**

- SOP-302 Step 1: Design input mode = **Detailed** (v0 prototype provides approved visual direction per `DESIGN-REFERENCE.md`). Visual design gate (Step 9) skipped.
- SOP-302 Step 2: Created comprehensive `ui-analysis.md` covering all 30+ user stories across 9 feature groups. Identified 16 new components needed beyond SOP-300 output.
- SOP-302 Steps 3–8 (Iteration 1 — Marketplace & Listings):
  - **User Flows:** 4 flows (Browse & Purchase, Create Listing, Manage Listings, Bookmarks)
  - **Wireframes:** 4 screens × 2 breakpoints (Marketplace Browse, Listing Detail, Create Listing Wizard, My Listings) — all adapted from mobile prototype to responsive web with persistent sidebar nav
  - **Component Hierarchy:** 4 full component trees mapping Page → Layout → Feature → UI components per SOP-300 architecture
  - **Micro-Interactions:** 10 interactions specified (card hover, bookmark toggle, filter apply, photo upload, wizard steps, buy/bid, deactivate, search, image gallery)
  - **Responsive Breakpoints:** 3 breakpoints (mobile <640, tablet 640–1023, desktop ≥1024) with per-element behavior tables for all 4 screens
  - **Accessibility:** WCAG 2.1 AA requirements per screen (ARIA roles, keyboard navigation flow, live regions, focus management, color contrast, RTL support)
- Web First adaptation: bottom tab bar → sidebar nav, mobile viewport → desktop-first responsive grid, mobile swipe → click/keyboard interactions
- Design token mapping verified against `globals.css` (SOP-301 output)

### Session 15 — 2026-05-06

**SOPs Completed:** SOP-301 (Styling Standards)  
**Files Created:**

- `apps/web/postcss.config.mjs` (Tailwind v4 PostCSS plugin)
- `apps/web/next.config.ts` (Next.js 15 config, image patterns, optimized imports)
- `apps/web/src/app/globals.css` (Tailwind v4 @theme inline, :root + .dark CSS vars, base styles, keyframes, RTL support, reduced motion)
- `apps/web/src/app/layout.tsx` (Root layout, Inter + Cairo fonts via next/font, ThemeProvider, SEO metadata)
- `apps/web/src/app/[locale]/layout.tsx` (Locale layout, sets lang/dir, generates static params for ar/en)
- `apps/web/src/components/ThemeProvider.tsx` (next-themes wrapper, class-based dark mode)
- `apps/web/src/components/ui/ThemeToggle.tsx` (Light/dark/system cycle, hydration-safe, Lucide icons)

**Files Updated:**

- `apps/web/package.json` (added next-themes, @tailwindcss/postcss)
- `apps/web/src/components/ui/index.ts` (added ThemeToggle export)

**Notes:**

- Adapted SOP-301 from Tailwind v3 (`tailwind.config.ts`) to Tailwind v4 CSS-first approach (`@theme inline` in globals.css). This is analogous to the Prisma→Supabase adaptation in Phase 1.
- `@theme inline` makes token values resolve at runtime via CSS custom properties, enabling light/dark switching without build-time duplication.
- `@custom-variant dark` scoped with `:where(.dark, .dark *)` avoids specificity inflation.
- Dark mode colors: surfaces shift to warm dark (#0F1419), primary green lightens (#2D6A4F→#40916C) for contrast, accent orange brightens.
- SOP-301 references `src/lib/utils.ts` for cn() — already created as `src/lib/cn.ts` in SOP-300. No duplicate created.
- Build verified: Tailwind compiled successfully. Pre-existing TS errors in supabaseServer.ts blocked full build (not SOP-301 related).

### Session 14 — 2026-05-05

**SOPs Completed:** SOP-300 (Component Architecture)  
**Files Created:**

- `apps/web/package.json` (Next.js 15, React 19, Supabase, TanStack Query, Zustand, cva, clsx, tailwind-merge, Lucide)
- `apps/web/src/lib/cn.ts` (class merge utility: clsx + tailwind-merge)
- `apps/web/src/components/ui/Button.tsx` (5 variants, 3 sizes, loading state, icon slots)
- `apps/web/src/components/ui/Input.tsx` (label, error, helper text, addons, a11y)
- `apps/web/src/components/ui/Card.tsx` (compound: Card, CardHeader, CardTitle, CardContent, CardFooter)
- `apps/web/src/components/ui/Modal.tsx` (portal, escape key, backdrop click, scroll lock)
- `apps/web/src/components/ui/Badge.tsx` (6 variants: default/success/warning/danger/info/accent)
- `apps/web/src/components/ui/Avatar.tsx` (image, initials fallback, online indicator)
- `apps/web/src/components/layout/Container.tsx` (polymorphic max-w-7xl wrapper)
- `apps/web/src/components/layout/Header.tsx` (green header bar, notification bell, language toggle)
- `apps/web/src/components/layout/Footer.tsx` (copyright, navigation links)
- `apps/web/src/components/layout/Sidebar.tsx` (responsive sidebar, admin section, mobile overlay)
- `apps/web/src/components/features/listings/index.ts` (skeleton)
- `apps/web/src/components/features/transactions/index.ts` (skeleton)
- `apps/web/src/components/features/chat/index.ts` (skeleton)
- `apps/web/src/components/features/notifications/index.ts` (skeleton)
- `apps/web/src/components/features/auth/index.ts` (skeleton)
- `apps/web/src/components/features/admin/index.ts` (skeleton)
- `docs/components/README.md` (component architecture documentation)

**Files Updated:**

- `apps/web/src/components/ui/index.ts` (barrel: 6 components + prop types)
- `apps/web/src/components/layout/index.ts` (barrel: 4 layout components)

**Notes:**

- Created `apps/web/package.json` — was missing from SOP-003 scaffold. Added Next.js 15, React 19, and all component utility deps.
- All UI components use `forwardRef` + `displayName` per SOP-300 spec.
- Used `class-variance-authority` (cva) for variant management — establishes the pattern for SOP-301 token integration.
- Components reference design token class names (e.g., `bg-primary`, `text-accent`) that will resolve once SOP-301 configures Tailwind.
- Sidebar replaces mobile bottom tabs per design reference §7 — persistent on desktop (lg+), overlay on mobile.
- Feature skeletons document expected components per domain, mapped to design reference sections.
- Pre-existing TS errors in `supabaseServer.ts` and `middleware.ts` (implicit `any`) are from SOP-203 — not introduced by SOP-300.

### Session 13 — 2026-04-24

**SOPs Completed:** SOP-206 (Validation)  
**Files Created:**

- `packages/shared/src/schemas/listing.ts`
- `packages/shared/src/schemas/transaction.ts`
- `packages/shared/src/schemas/chat.ts`
- `packages/shared/src/schemas/bid.ts`
- `packages/shared/src/schemas/review.ts`
- `packages/shared/src/schemas/inspection.ts`
- `packages/shared/src/utils/validation.ts`

**Files Updated:**

- `packages/shared/src/schemas/index.ts`
- `packages/shared/src/index.ts`

**Notes:**

- Pivoted from the SOP's Express middleware pattern to a tailored BaaS architectural pattern that uses Zod schemas within `shared` and a `validateData()` utility.
- Preserved alignment with `AppError` architecture from SOP-205 by throwing `ValidationError` configured with precise issue traces when parsing fails.
- Schema rules align directly with constraints implemented in SQL within SOP-101.

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

### Session 10 — 2026-04-05

**SOPs Completed:** SOP-200 (Service Layer)  
**Files Created:**

- `packages/shared/src/services/**` (Domain service functions)
- `/docs/architecture/business-rules.md` (Core business rules documentation)

**Notes:**

- SOP-200: Implemented Backend Service Layer wraps Supabase JS client.
- SOP-200: Adopted the standardized Result Pattern (`{ data, error }`) instead of throwing exceptions.

### Session 11 — 2026-04-12

**SOPs Completed:** SOP-204 (Authorization)  
**Files Created:**

- `supabase/migrations/00002_rls_policies.sql` (Row-Level Security configurations)
- `packages/shared/src/utils/permissions.ts` (UI permission utility functions)
- `/docs/architecture/permissions.md` (Permissions matrix documenting roles)

**Notes:**

- SOP-204: Implemented platform authorization layer with RLS policies defining data ownership rules.
- SOP-204: Defined roles and authorization middleware following the BaaS-Driven Layered Architecture.

### Session 12 — 2026-04-14

**SOPs Completed:** SOP-205 (Error Handling)  
**Files Created:**

- `packages/shared/src/lib/errors.ts` (AppError base class, 8 error subclasses, ErrorCode enum, type guards)
- `packages/shared/src/lib/errorMessages.ts` (i18n error message key mappings, domain-specific keys, English fallbacks)
- `packages/shared/src/lib/errorHandler.ts` (normalizeError, getDisplayMessage, isRetryableError — Supabase→AppError conversion)
- `/docs/architecture/error-handling.md` (Error architecture: flow diagram, code catalog, usage patterns per layer)

**Files Updated:**

- `packages/shared/src/index.ts` (Added barrel exports for lib/errors, lib/errorHandler, lib/errorMessages)

**Notes:**

- SOP-205: **Adapted from Express middleware to BaaS architecture** — SOP template references `src/middleware/error-handler.ts` (Express catch-all). Replaced with portable `normalizeError()` function callable from hooks/components.
- SOP-205: **Preserved Result Pattern** — Services continue returning `{ data, error }` as-is. Error normalization happens at the hook layer via `normalizeError()`.
- SOP-205: **AppError class hierarchy** — 8 subclasses covering all HTTP error categories plus network/timeout. Each stores `code`, `statusCode`, `isOperational`, `details` and serializes via `toJSON()`.
- SOP-205: **Supabase error mapping** — PostgrestError mapped by PostgreSQL error codes (23505→Conflict, 23503→Validation, PGRST116→NotFound, etc.). AuthError mapped by message pattern matching + HTTP status fallback.
- SOP-205: **i18n-ready messages** — Every ErrorCode maps to an i18n key (e.g., `errors.notFound`). Domain-specific keys defined for all entities (listing, transaction, payment, chat, inspection, dispute, auth).
- SOP-205: **Operational vs. programming errors** — `isOperational` flag distinguishes user-facing errors from bugs. Non-operational errors display generic "Something went wrong" to avoid leaking internals.
- SOP-205: **Retry logic** — `isRetryableError()` identifies network, rate-limit, and timeout errors for TanStack Query retry configuration.

```

```
