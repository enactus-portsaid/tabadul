# Dashboard & Home — UI Design

> **SOP:** SOP-302 · **Input Mode:** Detailed (v0 prototype)
> **User Stories:** US-004 (mode toggle), US-014 (seller listings, partial), US-030–032 (AI matching)
> **Reference Screens:** `02-home-buyer-scroll.png`, `11-home-seller-toggle.png`, `12-home-seller.png`
> **Updated:** 2026-05-08

---

## 1. User Flows (Step 3)

### Flow 1: Buyer Home — Browse & Discover

```
[Login Success / Sidebar "Home"]
    → [Dashboard Home — Buyer Mode (default)]
        → Header: greeting, time-of-day, notification bell
        → "Matched for You" section
            ├── Horizontal card carousel (MatchCards with score %)
            ├── Click card → [Listing Detail Page]
            └── "See All" → [Recommendations Page — full grid]
        → "Browse Marketplace" CTA banner
            └── Click → [Marketplace Browse Page]
        → "Recent Transactions" section
            ├── Last 3 transaction cards
            ├── Click card → [Transaction Detail Page]
            └── "See All" → [Transaction History Page]
```

### Flow 2: Seller Home — Manage & Create

```
[Toggle to "Selling" mode]
    → [Dashboard Home — Seller Mode]
        → Stats Row: Active (5), Inquiries (43), Completed (12)
            └── Click stat → [My Listings filtered by status]
        → "Create New Listing" CTA banner
            └── Click → [Create Listing Wizard — Step 1]
        → "My Listings" section
            ├── Last 3–5 listing cards (list variant)
            ├── Click card → [Listing Detail Page (own)]
            └── "See All" → [My Listings Page — full list]
```

### Flow 3: Mode Toggle (US-004)

```
[Dashboard Home — either mode]
    → Click "Buying" or "Selling" tab in toggle
        → Active tab animates (spring slide)
        → Content area crossfades:
            Buying → Match cards + Marketplace CTA + Recent Transactions
            Selling → Stats + Create CTA + My Listings
        → Mode persisted in Zustand store (survives page nav)
        → Sidebar nav items unchanged (Dashboard, Marketplace, Messages, etc.)
```

### Flow 4: AI Match Recommendations (US-030–032)

```
[Buyer Home — "Matched for You"]
    → Cards show: category icon, title, factory, price, location, match score %
    → Click card → [Listing Detail]
    → Dismiss match → Card animates out, next card shifts in
    → "See All" → [Recommendations Page]
        → Full grid of match cards
        → Each shows score badge + brief reason ("Same waste type, 15km away")
        → Filter by match score range
        → Dismiss action available per card
```

### Flow 5: Notifications Quick Access

```
[Dashboard Header — Bell Icon]
    → Shows unread count badge (red circle)
    → Click → [Notifications Page]
    (No dropdown preview — navigates directly per prototype)
```

---

## 2. Text-Based Wireframes (Step 4)

### 2.1 Dashboard Home — Buyer Mode

**Desktop (≥1024px):**

```
┌─────────────────────────────────────────────────────────────────────┐
│ [Sidebar]  │                                                        │
│            │  ┌─────────────────────────────────────────────────┐  │
│ Dashboard◄ │  │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ Green Banner ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│  │
│ Marketplace│  │  Good afternoon, Ahmed 👋          🔔(3) [ع]   │  │
│ Messages   │  │  Cairo Steel Works · Port Said                  │  │
│ Saved      │  │                                                 │  │
│ Transactions│ │  ┌──────────────────────────────────────────┐   │  │
│ Profile    │  │  │  [ 🏭 Buying ]  [ 📦 Selling ]          │   │  │
│            │  │  └──────────────────────────────────────────┘   │  │
│            │  └─────────────────────────────────────────────────┘  │
│            │                                                        │
│            │  Matched for You                        [See All →]   │
│            │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐   │
│            │  │  [92%]  │ │  [87%]  │ │  [85%]  │ │  [79%]  │   │
│            │  │ Copper  │ │ Steel   │ │ Plastic │ │ Copper  │   │
│            │  │ Wire    │ │ Scrap   │ │ Pellets │ │ Cable   │   │
│            │  │ Factory │ │ Factory │ │ Factory │ │ Factory │   │
│            │  │ EGP 4.2k│ │ EGP 2.8k│ │ EGP 1.5k│ │ EGP 3.1k│   │
│            │  │ 📍 Cairo│ │ 📍 Suez │ │ 📍 P.S. │ │ 📍 Ism. │   │
│            │  └─────────┘ └─────────┘ └─────────┘ └─────────┘   │
│            │                                                        │
│            │  ┌─────────────────────────────────────────────────┐  │
│            │  │ 🌿→  Browse Marketplace                    [→] │  │
│            │  │      Find materials from verified sellers       │  │
│            │  └─────────────────────────────────────────────────┘  │
│            │                                                        │
│            │  Recent Transactions                    [See All →]   │
│            │  ┌─────────────────────────────────────────────────┐  │
│            │  │ #TXN-2847  ⌈Deposit Paid⌉  EGP 12,500         │  │
│            │  │ Steel Scrap · Nile Steel Co.            Mar 28 │  │
│            │  ├─────────────────────────────────────────────────┤  │
│            │  │ #TXN-2831  ⌈Completed⌉     EGP 8,200          │  │
│            │  │ Copper Wire · Delta Metals             Mar 15 │  │
│            │  └─────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

**Mobile (<640px):**

```
┌──────────────────────────┐
│ ☰  Dashboard          🔔│
├──────────────────────────┤
│▓▓▓▓▓ Green Banner ▓▓▓▓▓▓│
│ Good afternoon, Ahmed 👋 │
│ Cairo Steel · Port Said  │
│                          │
│ [🏭 Buying] [📦 Selling] │
├──────────────────────────┤
│ Matched for You [See All]│
│ ┌──────┐┌──────┐┌──────┐│
│ │[92%] ││[87%] ││[85%] ││ ← Horizontal scroll
│ │Copper││Steel ││Plast.││
│ │Wire  ││Scrap ││Pelle.││
│ │EGP4.2││EGP2.8││EGP1.5││
│ │📍Cai.││📍Suez││📍P.S.││
│ └──────┘└──────┘└──────┘│
│                    ● ○ ○ │ ← Scroll dots
│                          │
│ ┌──────────────────────┐ │
│ │🌿 Browse Marketplace │ │
│ │  Find materials  [→] │ │
│ └──────────────────────┘ │
│                          │
│ Recent Trans. [See All]  │
│ ┌──────────────────────┐ │
│ │#TXN-2847 ⌈Dep.Paid⌉ │ │
│ │Steel Scrap  EGP12.5k │ │
│ ├──────────────────────┤ │
│ │#TXN-2831 ⌈Complete⌉ │ │
│ │Copper Wire  EGP8.2k  │ │
│ └──────────────────────┘ │
└──────────────────────────┘
```

### 2.2 Dashboard Home — Seller Mode

**Desktop (≥1024px):**

```
┌─────────────────────────────────────────────────────────────────────┐
│ [Sidebar]  │                                                        │
│            │  ┌─────────────────────────────────────────────────┐  │
│            │  │▓▓▓▓▓ Green Banner (same as buyer) ▓▓▓▓▓▓▓▓▓▓▓▓│  │
│            │  │  Good afternoon, Ahmed 👋          🔔(3) [ع]   │  │
│            │  │  [ 🏭 Buying ]  [ 📦 Selling ◄ ]              │  │
│            │  └─────────────────────────────────────────────────┘  │
│            │                                                        │
│            │  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ │
│            │  │      5       │ │     43       │ │     12       │ │
│            │  │   Active     │ │  Inquiries   │ │  Completed   │ │
│            │  └──────────────┘ └──────────────┘ └──────────────┘ │
│            │                                                        │
│            │  ┌─────────────────────────────────────────────────┐  │
│            │  │ 📦→  Create New Listing                    [+] │  │
│            │  │      List your waste materials for buyers       │  │
│            │  └─────────────────────────────────────────────────┘  │
│            │                                                        │
│            │  My Listings                            [See All →]   │
│            │  ┌─────────────────────────────────────────────────┐  │
│            │  │ [⚙️] │ ⌈Copper⌉ ⌈Active⌉                      │  │
│            │  │      │ Industrial Copper Cable                  │  │
│            │  │      │ EGP 4,500/ton  · 👁 234  💬 12           │  │
│            │  ├─────────────────────────────────────────────────┤  │
│            │  │ [⚙️] │ ⌈Steel⌉ ⌈Active⌉                       │  │
│            │  │      │ Steel Scrap Bundle                       │  │
│            │  │      │ EGP 2,800/ton  · 👁 156  💬 8            │  │
│            │  └─────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

**Mobile (<640px):**

```
┌──────────────────────────┐
│ ☰  Dashboard          🔔│
├──────────────────────────┤
│▓▓▓▓▓ Green Banner ▓▓▓▓▓▓│
│ Good afternoon, Ahmed 👋 │
│ [🏭 Buying] [📦 Selling◄]│
├──────────────────────────┤
│ ┌──────┐┌──────┐┌──────┐│
│ │  5   ││  43  ││  12  ││
│ │Active││Inq.  ││Done  ││
│ └──────┘└──────┘└──────┘│
│                          │
│ ┌──────────────────────┐ │
│ │📦 Create New Listing │ │
│ │  List materials  [+] │ │
│ └──────────────────────┘ │
│                          │
│ My Listings    [See All] │
│ ┌──────────────────────┐ │
│ │[⚙️]│⌈Copper⌉⌈Active⌉│ │
│ │    │Copper Cable      │ │
│ │    │EGP4.5k ·👁234 💬12│ │
│ ├──────────────────────┤ │
│ │[⚙️]│⌈Steel⌉ ⌈Active⌉│ │
│ │    │Steel Scrap       │ │
│ │    │EGP2.8k ·👁156 💬8│ │
│ └──────────────────────┘ │
└──────────────────────────┘
```

### 2.3 Recommendations Page (See All Matches)

**Desktop (≥1024px):**

```
┌─────────────────────────────────────────────────────────────────────┐
│ [Sidebar]  │  Recommended for You                                  │
│            │─────────────────────────────────────────────────────────│
│            │  Listings matched to your material needs               │
│            │                                                        │
│            │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐   │
│            │  │  [92%]  │ │  [87%]  │ │  [85%]  │ │  [79%]  │   │
│            │  │ Copper  │ │ Steel   │ │ Plastic │ │ Copper  │   │
│            │  │ Wire    │ │ Scrap   │ │ Pellets │ │ Cable   │   │
│            │  │ Factory │ │ Factory │ │ Factory │ │ Factory │   │
│            │  │ EGP 4.2k│ │ EGP 2.8k│ │ EGP 1.5k│ │ EGP 3.1k│   │
│            │  │ 📍 Cairo│ │ 📍 Suez │ │ 📍 P.S. │ │ 📍 Ism. │   │
│            │  │ Same type│ │ Same type│ │ Near you│ │ Same cat│   │
│            │  │ 15km ↗  │ │ 8km ↗   │ │ 3km ↗  │ │ 22km ↗ │   │
│            │  │    [✕]  │ │    [✕]  │ │    [✕]  │ │    [✕]  │   │
│            │  └─────────┘ └─────────┘ └─────────┘ └─────────┘   │
│            │                                                        │
│            │  (more cards below...)                                 │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 3. Component Hierarchy (Step 5)

### Dashboard Home Page

```
DashboardPage (Server Component — fetches user profile)
├── Container
├── DashboardHeader (Client — greeting + actions)
│   ├── GreenBanner (bg-primary)
│   │   ├── Greeting (time-based: "Good morning/afternoon/evening")
│   │   ├── UserName (bold white)
│   │   ├── FactorySubtitle (factory name + location)
│   │   └── HeaderActions
│   │       ├── NotificationBell (Client)
│   │       │   └── Badge (unread count)
│   │       └── LanguageToggle (Client)
│   └── ModeToggle (Client — overlapping banner edge)
│       └── SegmentedToggle ("Buying" | "Selling")
├── DashboardContent (Client — switches on mode)
│   ├── BuyerDashboard (conditional)
│   │   ├── MatchSection
│   │   │   ├── SectionHeader ("Matched for You" + "See All" link)
│   │   │   └── MatchCarousel (horizontal scroll or grid)
│   │   │       └── MatchCard ×N
│   │   │           ├── Card
│   │   │           ├── Badge (score %, accent orange)
│   │   │           ├── CategoryIcon
│   │   │           ├── Title + FactoryName
│   │   │           ├── PriceDisplay
│   │   │           └── LocationDisplay
│   │   ├── CTABanner ("Browse Marketplace")
│   │   │   ├── Gradient background (primary → primary-light)
│   │   │   ├── Title + Subtitle (white text)
│   │   │   └── IconButton (→ arrow)
│   │   └── RecentTransactions
│   │       ├── SectionHeader ("Recent Transactions" + "See All")
│   │       └── TransactionCard ×3
│   │           ├── TxnId + StatusBadge + Amount
│   │           ├── MaterialName
│   │           └── CounterpartyName + Date
│   └── SellerDashboard (conditional)
│       ├── StatsRow
│       │   └── StatCard ×3
│       │       ├── Number (large, primary green, bold)
│       │       └── Label (muted, smaller)
│       ├── CTABanner ("Create New Listing")
│       └── MyListingsPreview
│           ├── SectionHeader ("My Listings" + "See All")
│           └── ListingCardRow ×3–5
│               ├── CategoryIcon
│               ├── Badge (category) + Badge (status)
│               ├── Title + PriceDisplay
│               └── Stats (views, inquiries)
```

### Recommendations Page

```
RecommendationsPage (Server Component)
├── Container
├── PageHeader
│   ├── Title ("Recommended for You")
│   └── Description
├── MatchGrid (Client — for dismiss interactions)
│   └── MatchCardExtended ×N
│       ├── MatchCard (base, from dashboard)
│       ├── MatchReason ("Same waste type, 15km away")
│       └── DismissButton (✕)
└── EmptyState (if no matches)
    ├── Icon (🎯)
    ├── Title ("No matches yet")
    └── Description + CTA ("Set your preferences")
```

### Shared Sub-Components

```
SectionHeader
├── Title (h2, semibold)
└── Link ("See All →", accent orange)

CTABanner
├── Gradient div (primary → primary-light, rounded-xl)
├── Content
│   ├── Icon (left)
│   ├── Title (bold white) + Subtitle (lighter white)
└── IconButton (white circle, → arrow)

ModeToggle (SegmentedToggle)
├── Container (white pill, shadow, rounded-full)
├── Tab "Buying" (icon + label)
├── Tab "Selling" (icon + label)
└── ActiveIndicator (sliding white bg with shadow)
```

---

## 4. Micro-Interactions (Step 6)

| Interaction                | Trigger                 | Animation                                                                  | Duration                    | Feedback                              |
| -------------------------- | ----------------------- | -------------------------------------------------------------------------- | --------------------------- | ------------------------------------- |
| **Mode toggle**            | Click tab               | Active indicator slides to target tab (spring physics), content crossfades | 300ms spring + 200ms fade   | Dashboard content swaps entirely      |
| **Match card hover**       | Mouse enter             | Scale 1→1.03, shadow elevates, score badge pulses once                     | 200ms ease-out              | Cursor pointer                        |
| **Match carousel scroll**  | Swipe / arrow click     | Cards slide smoothly, scroll-snap to card edges                            | 300ms ease                  | Scroll dots update position           |
| **Match dismiss**          | Click ✕ on card         | Card scales down + fades out, remaining cards reflow                       | 300ms ease-out              | Toast "Match dismissed"               |
| **CTA banner hover**       | Mouse enter             | Gradient subtly shifts lighter, arrow icon slides right 4px                | 200ms ease                  | Cursor pointer                        |
| **Stat card count-up**     | Page load / mode switch | Numbers animate from 0 to value (count-up)                                 | 600ms ease-out              | Staggered: 0ms, 100ms, 200ms per card |
| **Transaction card hover** | Mouse enter             | Left border accent appears (4px primary green), slight lift                | 200ms ease                  | Cursor pointer                        |
| **See All hover**          | Mouse enter link        | Underline slides in from left, arrow nudges right                          | 200ms ease                  | Orange text maintained                |
| **Notification badge**     | New notification        | Badge scales 1→1.3→1 bounce, count increments                              | 400ms spring                | Red badge with white number           |
| **Greeting transition**    | Page load               | Text fades in + slides up from 8px below                                   | 300ms ease-out, 100ms delay | Time-appropriate greeting             |

---

## 5. Responsive Breakpoints (Step 7)

### Dashboard Home (Both Modes)

| Element        | Mobile (<640)            | Tablet (640–1023)     | Desktop (≥1024)                 |
| -------------- | ------------------------ | --------------------- | ------------------------------- |
| Sidebar        | Hidden (hamburger)       | Hidden (hamburger)    | Persistent (240px)              |
| Header banner  | Full-width, 140px tall   | Full-width, 160px     | Full-width in content, 180px    |
| Mode toggle    | Full-width, below banner | Auto-width, centered  | Auto-width, centered            |
| Greeting       | Name + location stacked  | Inline                | Inline                          |
| Header actions | Bell + lang in banner    | Bell + lang in banner | Bell + lang in banner top-right |

### Buyer Mode Sections

| Element           | Mobile (<640)                   | Tablet (640–1023)               | Desktop (≥1024)                  |
| ----------------- | ------------------------------- | ------------------------------- | -------------------------------- |
| Match cards       | Horizontal scroll (2.5 visible) | Horizontal scroll (3.5 visible) | 4-column CSS Grid, no scroll     |
| Scroll indicators | Dot indicators below            | Dot indicators                  | None (all visible)               |
| CTA banner        | Full-width, stacked text        | Full-width, inline text + icon  | Full-width, inline               |
| Transaction cards | Full-width, compact             | Full-width                      | Full-width, slightly more detail |
| Section headers   | Title left, "See All" right     | Same                            | Same                             |

### Seller Mode Sections

| Element       | Mobile (<640)          | Tablet (640–1023)       | Desktop (≥1024)              |
| ------------- | ---------------------- | ----------------------- | ---------------------------- |
| Stat cards    | 3-column row (compact) | 3-column row (spacious) | 3-column row (large numbers) |
| Stat numbers  | text-xl                | text-2xl                | text-3xl                     |
| CTA banner    | Full-width             | Full-width              | Full-width                   |
| Listing cards | Full-width vertical    | Full-width vertical     | Full-width vertical (list)   |

### Recommendations Page

| Element        | Mobile (<640)            | Tablet (640–1023) | Desktop (≥1024) |
| -------------- | ------------------------ | ----------------- | --------------- |
| Match grid     | 1-column                 | 2-column          | 3–4 column      |
| Match reason   | Below card, smaller text | Inline in card    | Inline in card  |
| Dismiss button | Top-right of card        | Top-right         | Top-right       |

---

## 6. Accessibility Requirements (Step 8)

### Dashboard Home

| Element           | Requirement                                                                                 |
| ----------------- | ------------------------------------------------------------------------------------------- |
| Page              | `<main>` landmark, `<h1>` = "Dashboard" (visually hidden if greeting is primary)            |
| Greeting          | Decorative — not the page heading; `aria-hidden` if h1 is separate                          |
| Mode toggle       | `role="tablist"`, each tab `role="tab"` + `aria-selected`, controls `role="tabpanel"`       |
| Dashboard panels  | Each mode's content wrapped in `role="tabpanel"` with `aria-labelledby` pointing to its tab |
| Notification bell | `aria-label="Notifications, 3 unread"`, updates via `aria-live="polite"`                    |
| Language toggle   | `aria-label="Switch language"`, current language announced                                  |

### Match Section (Buyer)

| Element            | Requirement                                                                                                  |
| ------------------ | ------------------------------------------------------------------------------------------------------------ |
| Carousel container | `role="region"`, `aria-label="Recommended listings"`                                                         |
| Match cards        | Each is `<a>` with `aria-label` combining title + price + score: "Copper Wire, EGP 4,200 per ton, 92% match" |
| Score badge        | Score in card's `aria-label` (not `aria-hidden`)                                                             |
| Scroll controls    | Arrow buttons: `aria-label="Next matches"` / `"Previous matches"`                                            |
| Scroll dots        | `role="tablist"` with individual dot `role="tab"`, `aria-label="Page 1 of 3"`                                |
| Dismiss button     | `aria-label="Dismiss Copper Wire recommendation"`                                                            |

### CTA Banners

| Element | Requirement                                                                   |
| ------- | ----------------------------------------------------------------------------- |
| Banner  | `<a>` or `<button>`, `role="link"` if navigating                              |
| Content | Title and subtitle readable by screen reader; icon decorative (`aria-hidden`) |

### Stats Section (Seller)

| Element            | Requirement                                                                 |
| ------------------ | --------------------------------------------------------------------------- |
| Stats row          | `role="group"`, `aria-label="Listing statistics"`                           |
| Each stat          | `aria-label="5 active listings"` / `"43 inquiries"` / `"12 completed"`      |
| Count-up animation | Final value available immediately to assistive tech (animate visually only) |

### Transaction Cards / Listing Cards

| Element      | Requirement                                                            |
| ------------ | ---------------------------------------------------------------------- |
| Card         | `<a>` wrapping entire card, `aria-label` with TXN ID + status + amount |
| Status badge | Text always present (not color-only); included in card's `aria-label`  |

### Keyboard Navigation

| Screen          | Tab Order                                                                                                                                                |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Buyer Home      | Skip link → Sidebar → Banner actions (bell, lang) → Mode toggle tabs → Match cards (left→right) → "See All" → CTA banner → Transaction cards → "See All" |
| Seller Home     | Skip link → Sidebar → Banner actions → Mode toggle → Stat cards → CTA banner → Listing cards → "See All"                                                 |
| Recommendations | Skip link → Sidebar → Page header → Match cards (left→right, top→bottom, dismiss per card)                                                               |

### RTL Behavior

- Mode toggle: tabs visually flip (Selling left, Buying right)
- Match carousel: scrolls right-to-left
- CTA banner arrow: points left (←) instead of right
- Section headers: title right-aligned, "See All" left-aligned
- Stat cards: order maintained but text alignment flips

---

## 7. Design Token Mapping

| Visual Element     | Token                                                       | Notes                     |
| ------------------ | ----------------------------------------------------------- | ------------------------- |
| Header banner bg   | `bg-primary`                                                | Forest green `#1B4332`    |
| Greeting text      | `text-primary-foreground font-bold`                         | White on green            |
| Location subtitle  | `text-primary-foreground/80`                                | Semi-transparent white    |
| Toggle container   | `bg-surface shadow-elevated rounded-full`                   | White pill                |
| Active tab         | `bg-surface shadow-card font-semibold`                      | White with shadow         |
| Inactive tab       | `text-text-secondary font-normal`                           | Gray text, transparent bg |
| Match score badge  | `bg-accent text-white font-bold rounded-lg`                 | Orange badge              |
| Match card         | `bg-surface shadow-card rounded-xl`                         | White card                |
| CTA banner         | `bg-gradient-to-r from-primary to-primary-light rounded-xl` | Green gradient            |
| CTA text           | `text-primary-foreground`                                   | White                     |
| CTA icon circle    | `border-primary-foreground/30 text-primary-foreground`      | White outline circle      |
| Stat number        | `text-primary font-bold text-2xl`                           | Green number              |
| Stat label         | `text-text-secondary text-sm`                               | Gray label                |
| Section title      | `text-text-primary font-semibold text-lg`                   | Dark text                 |
| "See All" link     | `text-accent font-medium`                                   | Orange link               |
| Transaction card   | `bg-surface shadow-card rounded-xl`                         | White card                |
| TXN status badge   | Per status token (active/pending/success)                   | Color-coded pill          |
| Notification badge | `bg-red-500 text-white`                                     | Red circle                |
