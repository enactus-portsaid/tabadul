# Tabadul — Component Architecture

> **SOP:** SOP-300 (Component Architecture)  
> **Scope:** `apps/web/src/components/` (Next.js web app)  
> **Last Updated:** 2026-05-05

---

## Component Categories

| Category     | Directory                       | Purpose                                         | Knows Business Logic? |
| ------------ | ------------------------------- | ----------------------------------------------- | --------------------- |
| **UI**       | `components/ui/`                | Base building blocks — fully reusable           | No                    |
| **Forms**    | `components/forms/`             | Form inputs tied to Zod schemas                 | Schema validation     |
| **Layout**   | `components/layout/`            | Page structure — header, footer, sidebar        | No                    |
| **Features** | `components/features/<domain>/` | Domain-specific composites combining UI + hooks | Yes (via hooks)       |

### Import Rules

```
ui/       → Only props, @tabadul/shared types, @/lib/cn
forms/    → ui/, Zod schemas, React Hook Form
layout/   → ui/, navigation hooks
features/ → ui/, hooks/, types/
```

> **Rule:** `ui/` and `layout/` components must NEVER import from `services/` or `hooks/`. Only `features/` components connect to business logic via hooks.

---

## Current Components

### UI Components (`components/ui/`)

| Component  | File         | Client? | Props                                                                    |
| ---------- | ------------ | ------- | ------------------------------------------------------------------------ |
| **Button** | `Button.tsx` | Yes     | `variant`, `size`, `isLoading`, `leftIcon`, `rightIcon`                  |
| **Input**  | `Input.tsx`  | Yes     | `label`, `error`, `helperText`, `leftAddon`, `rightAddon`                |
| **Card**   | `Card.tsx`   | No      | Compound: `Card`, `CardHeader`, `CardTitle`, `CardContent`, `CardFooter` |
| **Modal**  | `Modal.tsx`  | Yes     | `isOpen`, `onClose`, `title`, `size`                                     |
| **Badge**  | `Badge.tsx`  | No      | `variant` (default/success/warning/danger/info/accent), `size`           |
| **Avatar** | `Avatar.tsx` | No      | `src`, `alt`, `fallback`, `size`, `showOnline`                           |

### Layout Components (`components/layout/`)

| Component     | File            | Client? | Description                                                 |
| ------------- | --------------- | ------- | ----------------------------------------------------------- |
| **Container** | `Container.tsx` | No      | Responsive max-width wrapper (`max-w-7xl`, responsive px)   |
| **Header**    | `Header.tsx`    | Yes     | Primary green header bar with nav actions                   |
| **Footer**    | `Footer.tsx`    | No      | Minimal footer with copyright and links                     |
| **Sidebar**   | `Sidebar.tsx`   | Yes     | Responsive sidebar nav (desktop persistent, mobile overlay) |

### Feature Skeletons (`components/features/`)

| Domain           | Expected Components                                                 |
| ---------------- | ------------------------------------------------------------------- |
| `listings/`      | ListingCard, ListingCardList, ListingGrid, ListingDetail, MatchCard |
| `transactions/`  | TransactionCard, TransactionTimeline, TransactionDetail             |
| `chat/`          | ChatThreadItem, ChatThreadList, ChatMessage, ChatDetail             |
| `notifications/` | NotificationItem, NotificationList, NotificationFilter              |
| `auth/`          | LoginForm, RegisterForm, ForgotPasswordForm, AuthCard               |
| `admin/`         | AdminTable, ModerationPanel, PaymentVerifier, DisputeResolver       |

---

## How to Create a New Component

### Step 1: Choose the Category

- Is it a generic, reusable UI primitive? → `ui/`
- Is it a form input or field? → `forms/`
- Is it part of the page shell? → `layout/`
- Does it consume domain data via hooks? → `features/<domain>/`

### Step 2: Create the File

```
components/<category>/MyComponent.tsx
```

Use PascalCase for file and component names.

### Step 3: Implement the Component

```tsx
// 1. Add 'use client' ONLY if the component uses hooks, events, or browser APIs
'use client';

// 2. Import types and utilities
import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

// 3. Define and export the Props interface
export interface MyComponentProps extends HTMLAttributes<HTMLDivElement> {
  /** Description of the prop */
  myProp: string;
}

// 4. Use forwardRef for all base UI components
const MyComponent = forwardRef<HTMLDivElement, MyComponentProps>(
  ({ className, myProp, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('base-classes', className)} {...props}>
        {myProp}
      </div>
    );
  }
);

// 5. Set displayName for DevTools
MyComponent.displayName = 'MyComponent';

export { MyComponent };
```

### Step 4: Update the Barrel Export

Add the component to the appropriate `index.ts`:

```ts
export { MyComponent } from './MyComponent';
export type { MyComponentProps } from './MyComponent';
```

---

## Design Principles

1. **Single Responsibility** — Each component does one thing. Split display from data-fetching.
2. **Composition over Props** — Use compound patterns (`<Card.Header>`, `<Card.Content>`) instead of 5+ prop drilling.
3. **Explicit Prop Interfaces** — Always define and export a `[Component]Props` interface. Extend HTML element types where relevant.
4. **`forwardRef`** — Use on all base UI components to support ref forwarding.
5. **`displayName`** — Set on all `forwardRef` components for React DevTools readability.
6. **`cn()` for Classes** — Always use `cn()` from `@/lib/cn` for class composition. Never concatenate class strings manually.

---

## Server vs. Client Components

Next.js App Router defaults to Server Components. Only add `'use client'` when the component needs:

- React hooks (`useState`, `useEffect`, `useRef`, etc.)
- Event handlers (`onClick`, `onChange`, etc.)
- Browser APIs (`window`, `document`, `localStorage`, etc.)
- Third-party client libraries (portals, animation libraries)

### Guidelines

| Scenario                        | Server or Client?                       |
| ------------------------------- | --------------------------------------- |
| Static display (Card, Badge)    | **Server**                              |
| Interactive button with onClick | **Client**                              |
| Form with state                 | **Client**                              |
| Data-fetching wrapper           | **Server** (use async Server Component) |
| Layout/Container                | **Server**                              |
| Navigation with `usePathname`   | **Client**                              |

**Best practice:** Keep Client Components small. Extract the interactive "island" out of a Server Component rather than making the entire page a Client Component.

---

## Variant System (CVA)

Components use [class-variance-authority](https://cva.style/) for variant-based styling:

```tsx
import { cva, type VariantProps } from 'class-variance-authority';

const componentVariants = cva('base-classes', {
  variants: {
    variant: {
      primary: 'bg-primary text-white',
      secondary: 'bg-surface text-primary',
    },
    size: {
      sm: 'h-8 text-sm',
      md: 'h-10 text-base',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

interface Props extends VariantProps<typeof componentVariants> {}
```

---

## Related SOPs

- **SOP-003** — Project Structure (folder conventions)
- **SOP-005** — Design Patterns (component hierarchy rules)
- **SOP-301** — Styling Standards (Tailwind config, design tokens, CSS variables)
- **SOP-302** — UI/UX Design (visual direction from v0 prototype)
- **SOP-304** — Form Handling (React Hook Form + Zod integration)
- **SOP-305** — Page Implementation (feature component implementations)
