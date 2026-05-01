# Tabadul — Component Architecture

> **Status:** Approved
> **Last Updated:** 2026-05-01
> **SOP:** SOP-300 (Component Architecture)

---

## 1. Component Category Overview

| Category      | Directory              | Purpose                                          | Business Logic? |
| ------------- | ---------------------- | ------------------------------------------------ | --------------- |
| **UI**        | `components/ui/`       | Primitive, reusable building blocks               | No              |
| **Forms**     | `components/forms/`    | Form components tied to Zod schemas               | Schema only     |
| **Layout**    | `components/layout/`   | Structural wrappers and navigation                | No              |
| **Features**  | `components/features/` | Domain-specific composites combining UI + hooks   | Yes (via hooks) |

---

## 2. Component Inventory

### 2.1 UI Components (`components/ui/`)

| Component   | Platform | Props Interface    | Key Features                                         |
| ----------- | -------- | ------------------ | ---------------------------------------------------- |
| `Button`    | Both     | `ButtonProps`      | 5 variants, 3 sizes, loading spinner, icon slots     |
| `Input`     | Both     | `InputProps`       | Label, error/hint, start/end icons (web), ARIA       |
| `Card`      | Both     | `CardProps`        | Compound: CardHeader, CardTitle, CardContent, CardFooter |
| `Modal`     | Web      | `ModalProps`       | Backdrop blur, Escape close, body scroll lock, sizes |
| `Badge`     | Web      | `BadgeProps`       | 5 color variants, 2 sizes, pill shape                |
| `Avatar`    | Web      | `AvatarProps`      | Initial fallback, image, online dot, 4 sizes         |

### 2.2 Layout Components (`components/layout/`)

| Component   | Platform | Props Interface    | Key Features                                         |
| ----------- | -------- | ------------------ | ---------------------------------------------------- |
| `Header`    | Web      | `HeaderProps`      | Green banner, greeting, notifications, language toggle |
| `Footer`    | Web      | `FooterProps`      | Copyright bar                                        |
| `Container` | Web      | `ContainerProps`   | Responsive max-width, centered, padding              |

> **Mobile note:** The mobile app uses Expo Router's `_layout.tsx` files for navigation structure (tabs, stacks) rather than explicit Header/Footer components. Mobile layout is managed by the router.

### 2.3 Feature Component Folders (Planned)

| Feature Folder       | Contains                                          | Related Service        |
| -------------------- | ------------------------------------------------- | ---------------------- |
| `features/listings/` | `ListingCard`, `ListingGrid`, `ListingDetail`     | `services/listing.ts`  |
| `features/chat/`     | `ChatThread`, `ChatBubble`, `ThreadList`           | `services/chat.ts`     |
| `features/transactions/` | `TransactionCard`, `TransactionTimeline`       | `services/transaction.ts` |
| `features/matching/` | `MatchCard`, `MatchCarousel`                       | `services/matching.ts` |
| `features/profile/`  | `ProfileCard`, `StatsRow`, `SettingsMenuItem`      | `services/auth.ts`     |
| `features/notifications/` | `NotificationItem`, `FilterChips`             | `services/notification.ts` |

---

## 3. How to Create a New Component

### Step 1: Choose the Category

| Question                                         | Category     |
| ------------------------------------------------ | ------------ |
| Is it a generic UI primitive (button, input)?    | `ui/`        |
| Is it a form field or form section?              | `forms/`     |
| Is it a page wrapper or navigation element?      | `layout/`    |
| Does it fetch data or use domain hooks?          | `features/`  |

### Step 2: Create the Component File

```
components/<category>/<ComponentName>.tsx
```

For feature components with multiple related files:

```
components/features/<feature>/
├── <ComponentName>.tsx
├── <ComponentName>.test.tsx      # (Phase 5)
└── index.ts                     # barrel export
```

### Step 3: Follow the Component Template

```tsx
// For web: add 'use client' if the component uses hooks, events, or state
'use client';

import { forwardRef } from 'react';

export interface ExampleProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Prop description */
  variant?: 'a' | 'b';
}

export const Example = forwardRef<HTMLDivElement, ExampleProps>(
  ({ variant = 'a', className = '', children, ...props }, ref) => {
    return (
      <div ref={ref} className={className} {...props}>
        {children}
      </div>
    );
  }
);

Example.displayName = 'Example';
```

### Step 4: Export from Barrel

Add to the appropriate `index.ts`:

```ts
export { Example } from './Example';
export type { ExampleProps } from './Example';
```

---

## 4. Naming Conventions

| Item               | Convention     | Example                |
| ------------------ | -------------- | ---------------------- |
| Component file     | PascalCase     | `Button.tsx`           |
| Props interface    | PascalCase     | `ButtonProps`          |
| Test file          | PascalCase     | `Button.test.tsx`      |
| Barrel file        | lowercase      | `index.ts`             |
| Hook file          | camelCase      | `useAuth.ts`           |
| Feature folder     | kebab-case     | `features/listings/`   |

---

## 5. Component Design Principles

1. **Single Responsibility** — Each component does one thing. Split display from data-fetching.
2. **Composition over Props** — Prefer compound patterns (`<Card.Header>`) over 5+ prop drilling.
3. **Explicit Prop Interfaces** — Always define and export a `[ComponentName]Props` interface. Extend HTML element types where relevant.
4. **`forwardRef`** — Use on all base UI components to support ref forwarding.
5. **`displayName`** — Set on all `forwardRef` components for DevTools readability.
6. **RTL-Aware** — Use CSS logical properties (`start`/`end` instead of `left`/`right`).

---

## 6. Server vs Client Components (Next.js)

| Condition                          | Component Type    |
| ---------------------------------- | ----------------- |
| Static display, no interactivity   | Server Component  |
| Uses `useState` or `useEffect`     | Client Component  |
| Handles user events (onClick etc.) | Client Component  |
| Uses browser APIs (window, etc.)   | Client Component  |
| Fetches data server-side           | Server Component  |

**Rule:** Default to Server Components. Add `'use client'` only when needed. Split interactive islands out of Server Components.

---

## 7. Import Rules by Category

| Component Type | Can Import                              | Cannot Import            |
| -------------- | --------------------------------------- | ------------------------ |
| `ui/`          | Props, `@tabadul/shared` types          | hooks, services, stores  |
| `forms/`       | `ui/`, Zod schemas, React Hook Form     | services, stores         |
| `layout/`      | `ui/`, navigation hooks                 | services, domain hooks   |
| `features/`    | `ui/`, `hooks/`, `types/`               | other features directly  |

---

## 8. Related SOPs

- **SOP-003:** Project Structure (folder conventions)
- **SOP-005:** Design Patterns (component hierarchy rules)
- **SOP-301:** Styling Standards (design tokens, Tailwind config)
- **SOP-304:** Form Handling (form component integration)
