# Tabadul — Design Patterns

> **Status:** Approved  
> **Last Updated:** 2026-03-07  
> **SOP:** SOP-005 (Design Patterns)

---

## 1. Architectural Pattern — BaaS-Driven Layered Architecture

### Selection

| Pattern              | Best For                    | Complexity | Team Size | Fit |
| -------------------- | --------------------------- | ---------- | --------- | --- |
| **Monolith**         | MVPs, simple domains        | Low        | 1–5       | ⚠️  |
| **Modular Monolith** | Growing apps, clear domains | Medium     | 3–10      | ⚠️  |
| **Microservices**    | Large scale, multiple teams | High       | 10+       | ❌  |
| **Serverless/BaaS**  | Event-driven, variable load | Medium     | Any       | ✅  |

**Chosen: Serverless/BaaS (Supabase) with Layered Frontend Architecture**

### Rationale

The traditional monolith vs. microservices distinction does not apply here because Supabase handles the entire backend:

- **PostgreSQL** — relational data with Row Level Security
- **Supabase Auth** — authentication and session management
- **Supabase Storage** — file uploads (photos, receipts, inspection reports)
- **Supabase Realtime** — WebSocket subscriptions (chat, live bids)
- **Edge Functions** — server-side business logic (matching, moderation, commission calculation)

The application code consists of **two frontend clients** (mobile + web) and a **shared package**, all consuming the same Supabase backend. Each client follows a layered architecture internally.

### Architecture Diagram

```
┌─────────────────────────────┐  ┌─────────────────────────────┐
│       Mobile App            │  │        Web App              │
│   (React Native + Expo)     │  │   (Next.js 15 App Router)   │
│                             │  │                             │
│  ┌───────────────────────┐  │  │  ┌───────────────────────┐  │
│  │  Presentation Layer   │  │  │  │  Presentation Layer   │  │
│  │  components/, app/    │  │  │  │  components/, app/    │  │
│  ├───────────────────────┤  │  │  ├───────────────────────┤  │
│  │  Application Layer    │  │  │  │  Application Layer    │  │
│  │  hooks/, stores/      │  │  │  │  hooks/, stores/      │  │
│  ├───────────────────────┤  │  │  ├───────────────────────┤  │
│  │  Service Layer        │  │  │  │  Service Layer        │  │
│  │  services/            │  │  │  │  services/            │  │
│  ├───────────────────────┤  │  │  ├───────────────────────┤  │
│  │  Infrastructure       │  │  │  │  Infrastructure       │  │
│  │  lib/ (Supabase init) │  │  │  │  lib/, middleware/    │  │
│  └───────────────────────┘  │  │  └───────────────────────┘  │
└──────────────┬──────────────┘  └──────────────┬──────────────┘
               │                                │
               │     ┌─────────────────────┐    │
               │     │  packages/shared/   │    │
               ├────▶│  types, schemas,    │◀───┤
               │     │  constants, locales │    │
               │     └─────────────────────┘    │
               │                                │
               ▼                                ▼
┌─────────────────────────────────────────────────────────────┐
│                       Supabase                              │
│  ┌────────┐ ┌─────────┐ ┌──────────┐ ┌──────────────────┐  │
│  │  Auth  │ │ Storage │ │ Realtime │ │ Edge Functions   │  │
│  └────────┘ └─────────┘ └──────────┘ └──────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐   │
│  │            PostgreSQL (RLS policies)                 │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Application Layer Pattern — Layer-Based with Domain-Grouped Services

### Selection

| Pattern            | Fit | Reason                                                         |
| ------------------ | --- | -------------------------------------------------------------- |
| MVC                | ❌  | Server-rendered paradigm; does not map to React + BaaS         |
| Clean Architecture | ⚠️  | Over-engineered for a BaaS-backed MVP with no custom API layer |
| **Feature-Based**  | ⚠️  | Good for large apps; premature for MVP with shared UI patterns |
| **Layer-Based**    | ✅  | Natural fit for React apps consuming a BaaS backend            |

**Chosen: Layer-Based** (already established by SOP-003)

### Layer Responsibilities

Each app (`apps/mobile/`, `apps/web/`) has the same internal layering:

| Layer              | Directory     | Responsibility                                    | Depends On                        |
| ------------------ | ------------- | ------------------------------------------------- | --------------------------------- |
| **Presentation**   | `components/` | UI rendering — how things look                    | hooks, lib, types, config, shared |
| **Routing**        | `app/`        | Page/screen definitions, layout composition       | All layers                        |
| **Application**    | `hooks/`      | Stateful logic — how things behave                | services, stores, lib, types      |
| **State**          | `stores/`     | Client-only state (Zustand)                       | types, shared                     |
| **Service**        | `services/`   | Business logic + data access (Supabase queries)   | lib, types, shared                |
| **Infrastructure** | `lib/`        | Utility functions, Supabase client initialization | types, shared                     |
| **Configuration**  | `config/`     | Feature flags, app constants                      | shared only                       |
| **Type**           | `types/`      | App-specific TypeScript types                     | shared                            |

### Data Flow

```
User Interaction
      │
      ▼
  Component (components/)
      │  calls
      ▼
  Custom Hook (hooks/)
      │  uses
      ├──────────────┐
      ▼              ▼
  TanStack Query   Zustand Store (stores/)
      │
      ▼
  Service Function (services/)
      │
      ▼
  Supabase Client (lib/)
      │
      ▼
  Supabase Backend
```

### Why Not Feature-Based

Feature-based organization (e.g., `src/features/listings/`, `src/features/chat/`) is excellent for large apps with independent feature teams. For Tabadul's MVP:

- The team is small (1–5 developers), so cross-cutting visibility matters more than feature isolation.
- Many components are reused across features (e.g., `UserCard` in listings, transactions, and admin).
- The layer-based structure is already established (SOP-003) and provides clear separation of concerns.
- If the app grows, individual services and hooks can be grouped by domain within their layer (e.g., `services/listing.ts`, `services/transaction.ts`).

---

## 3. Code-Level Patterns

### 3.1 Pattern Decision Table

| Area                | Pattern                            | Where Used                                     |
| ------------------- | ---------------------------------- | ---------------------------------------------- |
| Data access         | Service Functions (function-based) | `services/` in both apps                       |
| Business logic      | Domain Service Functions           | `services/`, Edge Functions, `shared/utils/`   |
| Object creation     | Factory Functions                  | Query key factories, form default factories    |
| Algorithm variation | Strategy (via config objects)      | Matching rules, moderation filters             |
| React state         | TanStack Query + Zustand           | `hooks/` (server state) + `stores/` (UI state) |
| React components    | Custom Hooks + Composition         | `hooks/` (logic) + `components/` (rendering)   |
| Validation          | Schema-First (Zod)                 | `shared/schemas/`, form resolvers              |
| Error handling      | Result Pattern (`{ data, error }`) | All service functions                          |
| Authentication      | Auth Hook + Route Guards           | `useAuth()` hook, middleware, layouts          |
| Real-time           | Subscription Hooks                 | Chat, live bids, notifications                 |

---

### 3.2 Data Access — Service Functions

Supabase JS client is the data access layer. No additional Repository pattern is needed — wrapping Supabase in a Repository would add indirection without benefit.

**Pattern:** One service file per domain, exporting async functions that return `{ data, error }`.

```typescript
// services/listing.ts
import { supabase } from '@/lib/supabase';
import type { Listing } from '@tabadul/shared/types';

export async function getListings(filters: ListingFilters) {
  let query = supabase
    .from('listings')
    .select('*, seller:profiles(name, rating)')
    .eq('status', 'active');

  if (filters.wasteType) {
    query = query.eq('waste_type', filters.wasteType);
  }
  if (filters.maxPrice) {
    query = query.lte('price', filters.maxPrice);
  }

  return query.order('created_at', { ascending: false });
}

export async function createListing(data: CreateListingInput) {
  return supabase.from('listings').insert(data).select().single();
}

export async function updateListing(id: string, data: UpdateListingInput) {
  return supabase.from('listings').update(data).eq('id', id).select().single();
}
```

**Conventions:**

- File naming: `services/<domain>.ts` (e.g., `listing.ts`, `transaction.ts`, `chat.ts`, `auth.ts`, `matching.ts`, `admin.ts`)
- Every function returns the Supabase response shape: `{ data: T | null, error: PostgrestError | null }`
- No `try/catch` inside service functions — let TanStack Query handle errors at the hook layer
- Shared service logic (used by both apps) lives in `packages/shared/utils/`

### Domain Service Files

| Service File      | Responsibility                        | Key Functions                                                 |
| ----------------- | ------------------------------------- | ------------------------------------------------------------- |
| `auth.ts`         | Authentication and profile management | `signIn`, `signUp`, `signOut`, `getProfile`, `updateProfile`  |
| `listing.ts`      | Waste listing CRUD and search         | `getListings`, `getListing`, `createListing`, `updateListing` |
| `transaction.ts`  | Transaction lifecycle management      | `createTransaction`, `uploadReceipt`, `updateStatus`          |
| `chat.ts`         | Chat messaging                        | `getMessages`, `sendMessage`, `getThreads`                    |
| `matching.ts`     | AI matching queries                   | `getRecommendations`, `getMatchScore`                         |
| `inspection.ts`   | Inspector verification flow           | `submitReport`, `getReport`                                   |
| `notification.ts` | Notification management               | `getNotifications`, `markRead`, `updatePreferences`           |
| `admin.ts`        | Admin operations (web only)           | `getUsers`, `moderateListing`, `verifyReceipt`                |

---

### 3.3 Business Logic — Edge Functions

Complex server-side logic that should not run on the client lives in Supabase Edge Functions:

| Edge Function          | Trigger                      | Responsibility                                        |
| ---------------------- | ---------------------------- | ----------------------------------------------------- |
| `match-listings`       | New listing / new buyer pref | Rule-based matching: waste type + location + quantity |
| `moderate-chat`        | New chat message             | Regex filters for phone, email, profanity             |
| `calculate-commission` | Transaction completed        | Compute platform commission on transaction amount     |
| `send-notification`    | Various domain events        | Push notification dispatch via Expo Notifications     |

**Pattern:** Edge Functions receive webhooks (Supabase Database Webhooks or direct invocation) and return JSON responses. They import shared types from a local copy of the shared package types.

---

### 3.4 React Component Patterns

#### Custom Hook Extraction

Separate logic from rendering. Components only deal with UI; hooks handle data fetching, state, and side effects.

```typescript
// hooks/useListings.ts
import { useQuery } from "@tanstack/react-query";
import { getListings } from "@/services/listing";
import { listingKeys } from "@/lib/queryKeys";

export function useListings(filters: ListingFilters) {
  return useQuery({
    queryKey: listingKeys.list(filters),
    queryFn: () => getListings(filters),
  });
}

// components/features/ListingList.tsx
import { useListings } from "@/hooks/useListings";

export function ListingList({ filters }: Props) {
  const { data, isLoading, error } = useListings(filters);

  if (isLoading) return <LoadingSkeleton />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <ListingCard listing={item} />}
    />
  );
}
```

#### Component Hierarchy

```
components/
├── ui/             # Primitives — no business logic, fully reusable
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Card.tsx
│   └── Modal.tsx
├── forms/          # Form components — tied to Zod schemas
│   ├── ListingForm.tsx
│   └── ProfileForm.tsx
├── layout/         # Structural wrappers — app shell, navigation
│   ├── Header.tsx
│   └── TabBar.tsx
└── features/       # Domain composites — combine ui + hooks + services
    ├── ListingCard.tsx
    ├── ChatThread.tsx
    └── TransactionTimeline.tsx
```

**Rules:**

| Component Type | Can Import                             | Knows About Business Logic? |
| -------------- | -------------------------------------- | --------------------------- |
| `ui/`          | Only props and `@tabadul/shared` types | No                          |
| `forms/`       | `ui/`, Zod schemas, React Hook Form    | Schema validation only      |
| `layout/`      | `ui/`, navigation hooks                | No                          |
| `features/`    | `ui/`, `hooks/`, `types/`              | Yes (via hooks)             |

---

### 3.5 State Management Patterns

#### TanStack Query — Server State

All data from Supabase is server state, managed exclusively by TanStack Query.

**Query Key Factory Pattern:**

```typescript
// lib/queryKeys.ts
export const listingKeys = {
  all: ['listings'] as const,
  lists: () => [...listingKeys.all, 'list'] as const,
  list: (filters: ListingFilters) => [...listingKeys.lists(), filters] as const,
  details: () => [...listingKeys.all, 'detail'] as const,
  detail: (id: string) => [...listingKeys.details(), id] as const,
};

export const transactionKeys = {
  all: ['transactions'] as const,
  lists: () => [...transactionKeys.all, 'list'] as const,
  list: (filters: TransactionFilters) =>
    [...transactionKeys.lists(), filters] as const,
  detail: (id: string) => [...transactionKeys.all, 'detail', id] as const,
};
```

This enables precise cache invalidation:

```typescript
// Invalidate all listing queries after creating a new one
queryClient.invalidateQueries({ queryKey: listingKeys.all });

// Invalidate only the filtered list
queryClient.invalidateQueries({ queryKey: listingKeys.lists() });
```

**Mutation Pattern with Optimistic Updates:**

```typescript
// hooks/useCreateListing.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createListing } from '@/services/listing';
import { listingKeys } from '@/lib/queryKeys';

export function useCreateListing() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createListing,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: listingKeys.lists() });
    },
  });
}
```

#### Zustand — Client State

Client-only state that doesn't come from the server. Keep stores minimal.

```typescript
// stores/useUIStore.ts
import { create } from 'zustand';

interface UIState {
  language: 'ar' | 'en';
  setLanguage: (lang: 'ar' | 'en') => void;
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  language: 'ar',
  setLanguage: (language) => set({ language }),
  sidebarOpen: false,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
}));
```

**What goes where:**

| TanStack Query (Server State)              | Zustand (Client State)             |
| ------------------------------------------ | ---------------------------------- |
| Listings, transactions, messages, profiles | Language preference                |
| User session / auth status                 | Sidebar open/close                 |
| Notifications from server                  | Active filters (before API call)   |
| Any data fetched from Supabase             | Modal visibility, form wizard step |

---

### 3.6 Form Patterns — React Hook Form + Zod

All forms use the same pattern: shared Zod schema → React Hook Form with resolver → service function on submit.

```typescript
// packages/shared/schemas/listing.ts
import { z } from 'zod';

export const createListingSchema = z.object({
  wasteType: z.string().min(1, 'Required'),
  quantity: z.number().positive(),
  unit: z.enum(['kg', 'ton', 'm3', 'piece']),
  price: z.number().positive(),
  mode: z.enum(['fixed', 'auction']),
  description: z.string().min(10).max(1000),
  location: z.string().min(1),
});

export type CreateListingInput = z.infer<typeof createListingSchema>;
```

```typescript
// components/forms/ListingForm.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createListingSchema, type CreateListingInput } from "@tabadul/shared/schemas";
import { useCreateListing } from "@/hooks/useCreateListing";

export function ListingForm() {
  const { mutate, isPending } = useCreateListing();
  const form = useForm<CreateListingInput>({
    resolver: zodResolver(createListingSchema),
  });

  return (
    <form onSubmit={form.handleSubmit((data) => mutate(data))}>
      {/* form fields */}
    </form>
  );
}
```

**Conventions:**

- Zod schemas live in `packages/shared/schemas/` — shared across mobile, web, and Edge Functions
- `z.infer<typeof schema>` derives TypeScript types from schemas (single source of truth)
- Form components live in `components/forms/`; they import `ui/` primitives for fields

---

### 3.7 Error Handling — Result Pattern

All Supabase operations return `{ data, error }`. This project preserves that pattern throughout the service layer rather than throwing exceptions.

**Service layer:** Return the Supabase response as-is. No `try/catch`, no exception throwing.

**Hook layer:** TanStack Query's `error` state handles failed queries. Mutations use `onError` callbacks.

**Component layer:** Render error states based on query/mutation status:

```typescript
function ListingDetail({ id }: Props) {
  const { data, isLoading, error } = useListing(id);

  if (isLoading) return <LoadingSkeleton />;
  if (error) return <ErrorMessage error={error} />;
  if (!data) return <NotFound />;

  return <ListingView listing={data} />;
}
```

**Error Boundaries:** Wrap route-level layouts with React Error Boundaries to catch unexpected rendering errors. These are a safety net, not the primary error handling mechanism.

---

### 3.8 Authentication Pattern

#### Auth Hook

```typescript
// hooks/useAuth.ts
export function useAuth() {
  const { data: session } = useQuery({
    queryKey: ['auth', 'session'],
    queryFn: () => supabase.auth.getSession(),
  });

  return {
    user: session?.data.session?.user ?? null,
    isAuthenticated: !!session?.data.session,
    isLoading: session === undefined,
  };
}
```

#### Route Guards

| Platform | Mechanism                                                            |
| -------- | -------------------------------------------------------------------- |
| Mobile   | Expo Router layout files check `useAuth()` and redirect to `(auth)/` |
| Web      | Next.js middleware checks Supabase session and redirects to `/login` |

#### Authorization

Database-level authorization via Supabase Row Level Security (RLS):

```sql
-- Example: Users can only read their own transactions
CREATE POLICY "Users view own transactions"
  ON transactions FOR SELECT
  USING (buyer_id = auth.uid() OR seller_id = auth.uid());

-- Example: Only admins can verify payments
CREATE POLICY "Admins verify payments"
  ON transactions FOR UPDATE
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');
```

**Three-tier authorization model:**

1. **Route-level** — middleware/layout redirects (Can the user access this page?)
2. **RLS policies** — database-level enforcement (Can the user read/write this row?)
3. **Edge Function checks** — business rule validation (Is this action valid in the current state?)

---

### 3.9 Real-Time Pattern — Subscription Hooks

Chat and live auction bids use Supabase Realtime subscriptions, wrapped in custom hooks that integrate with TanStack Query's cache:

```typescript
// hooks/useRealtimeMessages.ts
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export function useRealtimeMessages(threadId: string) {
  const queryClient = useQueryClient();

  useEffect(() => {
    const channel = supabase
      .channel(`chat:${threadId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `thread_id=eq.${threadId}`,
        },
        (payload) => {
          queryClient.setQueryData(
            ['messages', threadId],
            (old: Message[] = []) => [...old, payload.new as Message]
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [threadId, queryClient]);
}
```

**Convention:** Realtime hooks update the TanStack Query cache directly. Components consume data through standard `useQuery` hooks and don't need to know whether data came from an initial fetch or a real-time event.

---

### 3.10 Internationalization Pattern

```
User selects language
       │
       ▼
  useUIStore (stores language pref)
       │
       ▼
  i18next.changeLanguage()
       │
       ├──▶ Mobile: I18nManager.forceRTL() + app reload
       └──▶ Web: Next.js locale route redirect (/ar/... ↔ /en/...)
```

**Conventions:**

- Translation files: `packages/shared/locales/ar.json`, `en.json`
- Translation hook: `const { t } = useTranslation();`
- RTL-aware styling: Use Tailwind/NativeWind `rtl:` and `ltr:` variants (e.g., `rtl:mr-4 ltr:ml-4`)
- Component text: Never hardcode strings — always use `t("key")`

---

## 4. File Organization Diagram

```
apps/mobile/src/                    apps/web/src/
├── app/                            ├── app/[locale]/
│   ├── (tabs)/                     │   ├── (auth)/
│   └── (auth)/                     │   ├── (main)/
│                                   │   └── admin/
├── components/                     ├── components/
│   ├── ui/          ← shared       │   ├── ui/          ← shared
│   │   design       │   ├── forms/        design
│   ├── forms/       │   ├── layout/
│   ├── layout/      tokens         │   └── features/
│   └── features/                   │
│                                   ├── middleware/      ← web only
├── hooks/                          ├── hooks/
│   ├── useAuth.ts                  │   ├── useAuth.ts
│   ├── useListings.ts              │   ├── useListings.ts
│   └── useChat.ts                  │   └── useChat.ts
│                                   │
├── services/                       ├── services/
│   ├── auth.ts                     │   ├── auth.ts
│   ├── listing.ts                  │   ├── listing.ts
│   ├── transaction.ts              │   ├── transaction.ts
│   ├── chat.ts                     │   ├── chat.ts
│   └── matching.ts                 │   ├── matching.ts
│                                   │   └── admin.ts     ← web only
├── stores/                         ├── stores/
│   └── useUIStore.ts               │   └── useUIStore.ts
│                                   │
├── lib/                            ├── lib/
│   ├── supabase.ts                 │   ├── supabase.ts
│   └── queryKeys.ts                │   └── queryKeys.ts
│                                   │
├── config/                         ├── config/
├── types/                          └── types/
│
packages/shared/src/
├── types/          Shared TypeScript types (DB models, DTOs)
├── schemas/        Shared Zod validation schemas
├── constants/      Shared constants (waste categories, statuses)
├── locales/        Translation files (ar.json, en.json)
└── utils/          Shared pure utility functions

supabase/
├── functions/      Edge Functions (matching, moderation, etc.)
├── migrations/     SQL schema migrations
└── seed/           Seed data scripts
```

---

## 5. Project-Specific Constraints

These constraints drove the pattern choices above:

| Constraint                                         | Impact on Patterns                                                                                |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Supabase BaaS (no custom API server)               | No Repository pattern needed — Supabase client IS the data access layer                           |
| Two frontend apps sharing one backend              | Shared package for types, schemas, constants; identical service/hook layer structure in both apps |
| Small team (1–5 developers)                        | Layer-based over feature-based (cross-cutting visibility more valuable than feature isolation)    |
| MVP scale (~10–50 users)                           | No caching infrastructure, no message queues — Supabase handles everything                        |
| Bilingual RTL/LTR requirement                      | RTL-aware component patterns; Tailwind `rtl:`/`ltr:` variants; shared locale files                |
| InstaPay manual verification (no gateway)          | Transaction state machine pattern in services + Edge Functions                                    |
| Multiple user roles (buyer/seller/admin/inspector) | RLS-driven authorization; role-gated routes; middleware guards                                    |
| Real-time features (chat, live bids)               | Supabase Realtime subscriptions integrated into TanStack Query cache                              |

---

## 6. Anti-Patterns to Avoid

| Anti-Pattern                              | Why It's Harmful                               | What to Do Instead                              |
| ----------------------------------------- | ---------------------------------------------- | ----------------------------------------------- |
| Direct Supabase calls in components       | Mixes data fetching with rendering             | Call services from hooks, hooks from components |
| Zustand for server data                   | Duplicates TanStack Query's caching            | Use TanStack Query for all Supabase data        |
| Throwing exceptions in service functions  | Breaks Supabase's `{ data, error }` convention | Return `{ data, error }`, handle in hooks       |
| Shared component importing `services/`    | Breaks layer boundaries                        | Components depend on hooks, not services        |
| Hardcoded strings in JSX                  | Breaks i18n                                    | Always use `t("key")` from `useTranslation()`   |
| Fat components (logic + rendering)        | Hard to test, hard to reuse                    | Extract logic into custom hooks                 |
| App-specific types in `packages/shared/`  | Pollutes shared package with platform concerns | Only share types needed by both apps            |
| Inline Supabase queries in Edge Functions | No type safety, hard to maintain               | Use typed Supabase client in Edge Functions     |

---

## 7. Review Checklist

- [x] Architectural pattern selected and documented (BaaS-Driven Layered Architecture)
- [x] Application layer pattern chosen (Layer-Based with Domain-Grouped Services)
- [x] Data access pattern defined (Service Functions wrapping Supabase client)
- [x] Business logic organization planned (Domain services + Edge Functions)
- [x] React/component patterns documented (Custom Hooks + Composition)
- [x] State management patterns defined (TanStack Query + Zustand)
- [x] Form patterns documented (React Hook Form + Zod, shared schemas)
- [x] Error handling pattern defined (Result Pattern)
- [x] Authentication/authorization pattern documented (Auth Hook + RLS + Route Guards)
- [x] Real-time pattern documented (Subscription Hooks → Query Cache)
- [x] i18n pattern documented (i18next + shared locales + RTL variants)
- [x] Anti-patterns listed
- [x] File organization diagram included
- [x] Project-specific constraints documented
