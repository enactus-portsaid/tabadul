# Tabadul — Project Structure

> **Status:** Approved  
> **Last Updated:** 2026-03-07  
> **SOP:** SOP-003 (Project Structure)

---

## 1. Monorepo Overview

Tabadul uses a monorepo structure with three workspaces and a Supabase directory:

```
tabadul/
├── apps/
│   ├── mobile/              # React Native + Expo (Android/iOS)
│   └── web/                 # Next.js 15 App Router (website + admin)
├── packages/
│   └── shared/              # Shared types, schemas, constants, translations
├── supabase/                # Edge Functions, migrations, seed data
├── docs/                    # Project documentation
├── tests/                   # Cross-app test suites
├── tsconfig.base.json       # Shared TypeScript configuration
└── package.json             # Root workspace config (future npm workspaces)
```

---

## 2. Directory Map

### Root Level

| Path                   | Purpose                                                  |
| ---------------------- | -------------------------------------------------------- |
| `apps/`                | Application workspaces (mobile + web)                    |
| `packages/`            | Shared library packages                                  |
| `supabase/`            | Supabase project (Edge Functions, DB migrations, seeds)  |
| `docs/`                | All project documentation                                |
| `tests/`               | Cross-app test suites (unit, integration)                |
| `tsconfig.base.json`   | Base TypeScript config inherited by all workspaces       |
| `.github/`             | GitHub templates, workflows                              |

### Mobile App — `apps/mobile/`

| Path                            | Purpose                                          |
| ------------------------------- | ------------------------------------------------ |
| `src/app/`                      | Expo Router file-based routes                    |
| `src/app/(tabs)/`               | Tab navigator screens (dashboard, marketplace)   |
| `src/app/(auth)/`               | Auth screens (login, register)                   |
| `src/components/ui/`            | Reusable UI primitives (Button, Input, Card)     |
| `src/components/forms/`         | Form-specific components                         |
| `src/components/layout/`        | Layout wrappers (SafeArea, TabBar, Header)       |
| `src/components/features/`      | Feature-specific composites (ListingCard, Chat)  |
| `src/hooks/`                    | Custom React hooks                               |
| `src/services/`                 | Business logic and Supabase API calls            |
| `src/lib/`                      | Utility functions, Supabase client init           |
| `src/config/`                   | App configuration (constants, feature flags)     |
| `src/types/`                    | App-specific TypeScript types                    |
| `src/stores/`                   | Zustand stores (client-only state)               |
| `assets/images/`                | Static images, icons                             |
| `assets/fonts/`                 | Custom font files                                |
| `tsconfig.json`                 | Extends Expo's base + path aliases               |

### Web App — `apps/web/`

| Path                                 | Purpose                                           |
| ------------------------------------ | ------------------------------------------------- |
| `src/app/[locale]/`                  | Next.js App Router with i18n locale prefix        |
| `src/app/[locale]/(auth)/`           | Auth pages (login, register)                      |
| `src/app/[locale]/(main)/`           | Public pages (marketplace, listings, profiles)    |
| `src/app/[locale]/admin/`            | Admin panel (role-gated)                          |
| `src/components/ui/`                 | Reusable UI primitives (Button, Input, Card)      |
| `src/components/forms/`              | Form-specific components                          |
| `src/components/layout/`            | Layout wrappers (Navbar, Footer, Sidebar)         |
| `src/components/features/`           | Feature-specific composites (ListingCard, Chat)   |
| `src/hooks/`                         | Custom React hooks                                |
| `src/services/`                      | Business logic and Supabase API calls             |
| `src/lib/`                           | Utility functions, Supabase client init            |
| `src/config/`                        | App configuration (constants, feature flags)      |
| `src/types/`                         | App-specific TypeScript types                     |
| `src/stores/`                        | Zustand stores (client-only state)                |
| `src/middleware/`                     | Next.js middleware helpers (auth, locale)          |
| `public/images/`                     | Static images served by Next.js                   |
| `public/fonts/`                      | Web font files                                    |
| `tsconfig.json`                      | Extends base + Next.js plugin + path aliases      |

### Shared Package — `packages/shared/`

| Path                    | Purpose                                                   |
| ----------------------- | --------------------------------------------------------- |
| `src/types/`            | Database model types, DTOs (shared across apps)           |
| `src/schemas/`          | Zod validation schemas (forms + API)                      |
| `src/constants/`        | Shared constants (waste categories, transaction statuses) |
| `src/locales/`          | i18next translation files (`ar.json`, `en.json`)          |
| `src/utils/`            | Shared utility functions                                  |
| `src/index.ts`          | Barrel export for the package                             |
| `tsconfig.json`         | Extends base, outputs to `dist/`                          |
| `package.json`          | Package manifest for `@tabadul/shared`                    |

### Supabase — `supabase/`

| Path              | Purpose                                              |
| ----------------- | ---------------------------------------------------- |
| `functions/`      | Edge Functions (Deno/TypeScript)                     |
| `migrations/`     | SQL migration files                                  |
| `seed/`           | Seed data scripts                                    |
| `config.toml`     | Supabase CLI project configuration                   |

### Tests — `tests/`

| Path              | Purpose                              |
| ------------------|--------------------------------------|
| `unit/`           | Unit tests (cross-app)               |
| `integration/`    | Integration tests (cross-app)        |

---

## 3. Naming Conventions

| Type                  | Convention    | Example                          |
| --------------------- | ------------- | -------------------------------- |
| React Components      | PascalCase    | `UserCard.tsx`, `ListingForm.tsx` |
| Hooks                 | camelCase     | `useAuth.ts`, `useListings.ts`   |
| Utilities / Helpers   | camelCase     | `formatDate.ts`, `parsePrice.ts` |
| Routes / Folders      | kebab-case    | `user-profile/`, `my-listings/`  |
| Config files          | kebab-case    | `tailwind.config.ts`             |
| Constants             | SCREAMING_SNAKE | `WASTE_CATEGORIES`, `TX_STATUS`|
| Tests                 | Source + `.test` | `UserCard.test.tsx`           |
| Types / Interfaces    | PascalCase    | `Listing`, `Transaction`         |
| Zod Schemas           | camelCase + `Schema` | `listingSchema`, `userSchema` |
| Translation keys      | dot.notation  | `listing.title`, `auth.login`    |
| Zustand stores        | camelCase + `Store` | `useAuthStore`, `useUIStore` |

---

## 4. Module Organization Principles

### Colocation

Keep related files together. A component's test and styles live in the same directory:

```
components/ui/
├── Button.tsx
├── Button.test.tsx
└── index.ts           # barrel export
```

### Separation of Concerns

| Directory      | Responsibility                                        |
| -------------- | ----------------------------------------------------- |
| `components/`  | UI rendering — how things look                        |
| `hooks/`       | State logic — how things behave                       |
| `services/`    | Business logic — what the app does (Supabase queries) |
| `stores/`      | Client state — Zustand stores for UI state            |
| `types/`       | Type definitions — what data looks like               |
| `lib/`         | Utilities — pure helper functions, client init         |
| `config/`      | Configuration — feature flags, constants              |

### Module Boundaries

| Module             | Can Import From                                       |
| ------------------ | ----------------------------------------------------- |
| `components/`      | `hooks/`, `lib/`, `types/`, `config/`, `@tabadul/shared` |
| `hooks/`           | `services/`, `stores/`, `lib/`, `types/`, `@tabadul/shared` |
| `services/`        | `lib/`, `types/`, `@tabadul/shared`                   |
| `stores/`          | `types/`, `@tabadul/shared`                           |
| `lib/`             | `types/`, `@tabadul/shared`                           |
| `config/`          | `@tabadul/shared` only                                |
| `app/` (routes)    | Everything above                                      |

---

## 5. Path Aliases

All workspaces use `@/*` for local imports and `@tabadul/shared/*` for shared package imports.

### Mobile (`apps/mobile/tsconfig.json`)

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@tabadul/shared/*": ["../../packages/shared/src/*"]
    }
  }
}
```

### Web (`apps/web/tsconfig.json`)

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@tabadul/shared/*": ["../../packages/shared/src/*"]
    }
  }
}
```

### Usage Examples

```typescript
// Local imports (within an app)
import { Button } from "@/components/ui";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";

// Shared package imports (cross-app)
import { listingSchema } from "@tabadul/shared/schemas";
import type { Listing } from "@tabadul/shared/types";
import { WASTE_CATEGORIES } from "@tabadul/shared/constants";
```

---

## 6. Barrel File Strategy

Barrel files (`index.ts`) are placed in shared directories to enable clean imports:

| Directory                          | Has Barrel | Reason                                    |
| ---------------------------------- | ---------- | ----------------------------------------- |
| `components/ui/`                   | ✅          | Frequently imported UI primitives         |
| `components/forms/`               | ✅          | Grouped form component exports            |
| `components/layout/`              | ✅          | Layout wrappers imported by route layouts |
| `components/features/`            | ❌          | Import individual features directly       |
| `packages/shared/src/`            | ✅          | Package entry point                       |
| `packages/shared/src/types/`      | ✅          | Grouped type exports                      |
| `packages/shared/src/schemas/`    | ✅          | Grouped schema exports                    |
| `packages/shared/src/constants/`  | ✅          | Grouped constant exports                  |

---

## 7. Review Checklist

- [x] Folder structure follows framework conventions (Expo Router, Next.js App Router)
- [x] All major directories created on disk
- [x] File naming conventions documented
- [x] Path aliases configured in all `tsconfig.json` files
- [x] Barrel files created in shared directories
- [x] Module boundaries defined
- [x] Monorepo structure matches `/docs/tech-stack.md` §8
