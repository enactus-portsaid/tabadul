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

| Field            | Value                                          |
| ---------------- | ---------------------------------------------- |
| **Project Name** | Tabadul (تبادل)                                                  |
| **Description**  | B2B AI-powered Industrial Symbiosis Platform — digital marketplace connecting factories generating waste with factories needing cheap raw materials |
| **Project Root** | `C:\Tabadul`                                                      |
| **Started**      | 2026-03-05                                                         |

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

| SOP | Title                  | Status | Output Location                         | Notes |
| --- | ---------------------- | ------ | --------------------------------------- | ----- |
| 000 | Requirements Gathering | ✅      | `/docs/requirements.md`                 | 12 sections, 30+ user stories, MoSCoW prioritized |
| 001 | Tech Stack Selection   | ✅      | `/docs/tech-stack.md`                   | RN + Expo (mobile), Next.js 15 (web), Supabase, monorepo |
| 002 | Repository Setup       | ⬚      | `README.md`, `.gitignore`               |       |
| 003 | Project Structure      | ⬚      | Folder structure                        |       |
| 004 | Environment Setup      | ⬚      | `.env.example`, `/docs/setup.md`        |       |
| 005 | Design Patterns        | ⬚      | `/docs/architecture/design-patterns.md` |       |
| 006 | Code Style Standards   | ⬚      | Linter/formatter configs                |       |

### Phase 1: Database

| SOP | Title              | Status | Output Location                     | Notes |
| --- | ------------------ | ------ | ----------------------------------- | ----- |
| 100 | Database Selection | ⬚      | `/docs/tech-stack.md`               |       |
| 101 | Schema Design      | ⬚      | `/docs/database/erd.md`, migrations |       |
| 102 | Seed Data          | ⬚      | `/seeds/` or `/fixtures/`           |       |

### Phase 2: Backend

| SOP | Title              | Status | Output Location                                      | Notes |
| --- | ------------------ | ------ | ---------------------------------------------------- | ----- |
| 200 | Service Layer      | ⬚      | `src/services/`, `/docs/backend/services.md`         |       |
| 201 | Repository Pattern | ⬚      | `src/repositories/`, `/docs/backend/repositories.md` |       |
| 202 | API Design         | ⬚      | `/docs/api/openapi.yaml`, `/docs/api/endpoints.md`   |       |
| 203 | Authentication     | ⬚      | Auth module/routes                                   |       |
| 204 | Authorization      | ⬚      | `/docs/authorization.md`, middleware                 |       |
| 205 | Error Handling     | ⬚      | Error handler module                                 |       |
| 206 | Validation         | ⬚      | Validation schemas                                   |       |

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

| Document        | Location                   | Last Updated | Key Decisions                                            |
| --------------- | -------------------------- | ------------ | -------------------------------------------------------- |
| Requirements    | `/docs/requirements.md`    | 2026-02-24    | 30+ user stories, MVP scope defined, MoSCoW prioritized   |
| Tech Stack      | `/docs/tech-stack.md`      | 2026-03-05    | React Native + Expo (mobile), Next.js 15 (web), Supabase, PostgreSQL, TypeScript, monorepo |
| Execution Brief | `/docs/execution-brief.md` | ⬚            | {e.g., "5 entities, 3 tech adaptations, 2 SOPs skipped"} |

### Phase 1 Checkpoint — Database Design

| Design Doc (Level 1) | Location        | Traces to Requirement                           |
| -------------------- | --------------- | ----------------------------------------------- |
| Database Selection   | {location or ⬚} | {e.g., "PostgreSQL for relational data needs"}  |
| Schema/ERD           | {location or ⬚} | {e.g., "All entities from requirements mapped"} |
| Seed Data            | {location or ⬚} | {e.g., "Test data for all user roles"}          |

| Implementation (Level 2) | Location                            | Traces to Design      |
| ------------------------ | ----------------------------------- | --------------------- |
| Prisma Schema            | {e.g., `prisma/schema.prisma` or ⬚} | {e.g., "Matches ERD"} |
| Migrations               | {e.g., `prisma/migrations/` or ⬚}   |                       |
| Seed Script              | {e.g., `prisma/seed.ts` or ⬚}       |                       |

**Checkpoint Status:** ⬚ Not Run / ✅ Passed / ⚠️ Issues Found  
**Last Run:** {date}  
**Issues:** {none or list issues}

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

| Decision        | Value                                        | Source                                  | Set By  |
| --------------- | -------------------------------------------- | --------------------------------------- | ------- |
| Framework       | React Native + Expo SDK 52 (mobile) + Next.js 15 (web) | `/docs/tech-stack.md`                   | SOP-001 |
| Database        | PostgreSQL (via Supabase)                    | `/docs/tech-stack.md`                   | SOP-001 |
| ORM             | Supabase JS Client + @supabase/ssr (web)     | `/docs/tech-stack.md`                   | SOP-001 |
| Auth            | Supabase Auth (email/password, JWT)          | `/docs/tech-stack.md`                   | SOP-001 |
| Styling         | NativeWind (Tailwind CSS for React Native)   | `/docs/tech-stack.md`                   | SOP-001 |
| State Mgmt      | TanStack Query + Zustand                     | `/docs/tech-stack.md`                   | SOP-001 |
| Hosting         | Supabase Cloud + EAS (mobile) + Vercel (web) | `/docs/tech-stack.md`                   | SOP-001 |
| Entities        | {e.g., User, List, Item, ...}                | `/docs/requirements.md`                 | SOP-000 |
| Branching       | {e.g., GitHub Flow}                          | `CONTRIBUTING.md`                       | SOP-002 |
| Design Patterns | {e.g., Service + Repository, function-based} | `/docs/architecture/design-patterns.md` | SOP-005 |

### Cached File Locations

| Artifact        | Path                                      | Last Updated By |
| --------------- | ----------------------------------------- | --------------- |
| Requirements    | `/docs/requirements.md`                   | SOP-000         |
| Tech Stack      | `/docs/tech-stack.md`                     | SOP-001         |
| Execution Brief | `/docs/execution-brief.md`                | Phase 0         |
| Schema / ERD    | {e.g., `prisma/schema.prisma`}            | SOP-101         |
| API Spec        | {e.g., `/docs/api/openapi.yaml`}          | SOP-202         |
| Component Docs  | {e.g., `/docs/frontend/components.md`}    | SOP-300         |
| Visual Design   | {e.g., `/docs/frontend/visual-design.md`} | SOP-302         |
| Page Manifest   | {e.g., `/docs/frontend/page-manifest.md`} | SOP-305         |

---

## 🔄 Current Session

### Active SOP

**SOP:** SOP-002  
**Title:** Repository Setup  
**Status:** ⬚ Not Started

### Context Files to Read

```
.prompts/AI-SESSION.md                                            # This file (context)
/docs/requirements.md                                             # Platform requirements
/docs/tech-stack.md                                               # Tech decisions
.sops/phase-0-initialization/SOP-002-repository-setup.md          # The procedure
```

### Expected Outputs

- [ ] `README.md`
- [ ] `.gitignore`

### Iterative SOP Progress

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
Execute SOP-002 (Repository Setup).

Read:

- `.prompts/AI-SESSION.md` for context
- `/docs/tech-stack.md` for tech decisions
- `.sops/phase-0-initialization/SOP-002-repository-setup.md` for the procedure

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
