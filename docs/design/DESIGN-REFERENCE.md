# Tabadul — UI Design Reference Guide

> **Source:** v0 prototype ([deployed app](https://v0-tabadul-prototype-bkd85j8cm-imalwaysforlife-5769s-projects.vercel.app/) · [GitHub](https://github.com/eima40x4c/v0-tabadul-prototype))
>
> **Purpose:** This document distills the visual design decisions from the v0 prototype into an actionable reference for SOP-302 (UI/UX Design) execution. It defines the **approved visual direction** — agents executing Phase 3 should treat this as the "Detailed" design input, skipping the "Propose Visual Design Direction" approval gate.
>
> **Authority:** This guide is authoritative for _how the app looks_. The SOPs and `/docs/requirements.md` remain authoritative for _what the app does_. When in conflict, functional requirements win.

> [!CAUTION]
> **Web First — Mobile Deferred.** The v0 prototype uses a mobile viewport (~390×844px) for demonstration purposes only. **Phase 3 targets `apps/web/` (Next.js) exclusively.** Do NOT build a mobile app layout. Instead:
>
> - **Adopt** the design tokens below (colors, typography, component patterns) — they are platform-agnostic.
> - **Adapt** the layouts to responsive web (desktop + tablet + mobile breakpoints via Tailwind CSS).
> - **Ignore** mobile-specific patterns (bottom tab bar, native navigation gestures, Expo Router).
>
> The bottom navigation from the prototype should become a responsive **sidebar or top navigation** on web. See `docs/execution-brief.md` §5 for the full rationale.

---

## 1. Color Palette

### Primary Colors

| Token                        | Hex       | HSL (approx)    | Usage                                               |
| ---------------------------- | --------- | --------------- | --------------------------------------------------- |
| `--color-primary`            | `#1B4332` | `153, 41%, 18%` | Headers, nav active state, CTAs, avatar backgrounds |
| `--color-primary-light`      | `#2D6A4F` | `153, 41%, 30%` | Hover states, secondary surfaces                    |
| `--color-primary-foreground` | `#FFFFFF` | `0, 0%, 100%`   | Text on primary backgrounds                         |

### Accent Colors

| Token                  | Hex       | HSL (approx)   | Usage                                                                                      |
| ---------------------- | --------- | -------------- | ------------------------------------------------------------------------------------------ |
| `--color-accent`       | `#D4760A` | `33, 90%, 44%` | Prices (EGP values), "See All" links, match scores, notification dots, active filter chips |
| `--color-accent-light` | `#E8890C` | `33, 90%, 48%` | Hover on accent elements, gradient end on CTA banners                                      |

### Surface Colors

| Token                   | Hex       | HSL (approx)   | Usage                                                 |
| ----------------------- | --------- | -------------- | ----------------------------------------------------- |
| `--color-background`    | `#F5F1EB` | `33, 25%, 94%` | Page background — warm cream/beige, NOT cold gray     |
| `--color-surface`       | `#FFFFFF` | `0, 0%, 100%`  | Cards, input fields, elevated surfaces                |
| `--color-surface-muted` | `#FAF7F2` | `33, 40%, 96%` | Slightly elevated sections (e.g., notification items) |

### Status Colors

| Token                    | Hex       | Usage                          |
| ------------------------ | --------- | ------------------------------ |
| `--color-status-active`  | `#2D6A4F` | "Active" badge (green)         |
| `--color-status-pending` | `#D4760A` | "Pending" badge (amber)        |
| `--color-status-success` | `#22C55E` | Online indicators, unread dots |
| `--color-status-deposit` | `#22C55E` | "Deposit Paid" badge           |

### Text Colors

| Token                    | Hex       | Usage                                |
| ------------------------ | --------- | ------------------------------------ |
| `--color-text-primary`   | `#1A1A1A` | Headings, primary text               |
| `--color-text-secondary` | `#6B7280` | Secondary text, timestamps, metadata |
| `--color-text-muted`     | `#9CA3AF` | Placeholder text, disabled state     |

### Design Philosophy

- **Warm, not cold.** The cream `#F5F1EB` background gives an earthy, industrial feel. Avoid cold grays (`#F3F4F6` etc.).
- **Green = authority/trust.** Deep forest green conveys professionalism for B2B.
- **Orange = action/attention.** Used sparingly for prices, CTAs, and highlights.

---

## 2. Typography

| Element         | Weight         | Size (approx) | Notes                                                      |
| --------------- | -------------- | ------------- | ---------------------------------------------------------- |
| Page title      | Bold (700)     | 24px          | "Messages", "My Account", "Notifications"                  |
| Section heading | Semibold (600) | 18px          | "Matched for You", "My Listings", "Recent Transactions"    |
| Card title      | Semibold (600) | 16px          | "Industrial Copper Cable", "Copper Wire"                   |
| Price           | Bold (700)     | 16px          | In accent orange, with `/ton` or `/unit` in regular weight |
| Body text       | Regular (400)  | 14px          | Descriptions, chat messages                                |
| Label / meta    | Regular (400)  | 12–13px       | Timestamps, location pins, view/inquiry counts             |
| Badge text      | Medium (500)   | 11–12px       | "Active", "Pending", "Copper", category badges             |

**Font family:** Sans-serif stack. Recommend **Inter** for Latin text, with system Arabic fallback for Arabic content. Consider **Cairo** or **IBM Plex Arabic** for dedicated Arabic typography.

---

## 3. Component Patterns

### 3.1 Header Banner

- **Background:** Solid `--color-primary` (forest green)
- **Content:** Greeting text ("Good afternoon"), user name (bold white), location subtitle
- **Actions:** Notification bell (with red count badge), Arabic toggle button (ع)
- **Height:** ~180px including the Buying/Selling toggle that overlaps the bottom edge

### 3.2 Buying / Selling Toggle

- **Style:** Pill-shaped segmented control, white background with rounded corners
- **Active tab:** White background with subtle shadow, bold text
- **Inactive tab:** Transparent background, regular weight text
- **Icons:** Each tab has a small icon (warehouse for Buying, package for Selling)
- **Position:** Overlapping the header-to-content transition

### 3.3 Listing Card (Compact — for grids/recommendations)

```
┌──────────────────────────┐
│  [Category Icon]   [92%] │  ← Score badge (orange, top-right)
│                          │
│  Copper Wire             │  ← Title (semibold)
│  Cairo Steel Works       │  ← Factory name (muted)
│                          │
│  EGP 4,200/ton           │  ← Price (orange bold) + unit (regular)
│  📍 6th October          │  ← Location (muted, with pin icon)
└──────────────────────────┘
```

- White card with rounded corners (`border-radius: 12–16px`)
- Subtle shadow
- Category icon in center (not a photo in this compact variant)

### 3.4 Listing Card (List — for "My Listings")

```
┌─────────────────────────────────────────┐
│ [Icon]  | ⌈Copper⌉    ⌈Active⌉         │  ← Category badge + Status badge
│         | Industrial Copper Cable       │  ← Title
│         | EGP 4,500/ton                 │  ← Price (orange)
│         | 👁 234  💬 12                  │  ← View count + inquiry count
└─────────────────────────────────────────┘
```

- Horizontal layout with icon on left, content on right
- Category badge: small pill with green background
- Status badge: "Active" (green) or "Pending" (amber) pill

### 3.5 Transaction Card

```
┌──────────────────────────────────────────┐
│ #TXN-2847  ⌈Deposit Paid⌉  EGP 12,500  │
│ Steel Scrap                              │
│ Nile Steel Co.                    Mar 28 │
└──────────────────────────────────────────┘
```

### 3.6 Notification Item

- Left: Type-specific icon in circular colored background
  - 🎯 Match → red/orange circle
  - 💳 Payment → yellow/gold circle
  - 💬 Message → gray circle
  - 📋 Listing → green circle
  - 📉 Price Alert → red circle
- Center: Title (bold) + description (regular) + timestamp (muted)
- Right: Unread indicator dot (orange)

### 3.7 Chat Thread Item

- Left: User initial in dark green circle avatar
- Center: Name (bold) + listing name (muted, small) + last message preview
- Right: Timestamp + unread count badge (orange circle with white number)
- Online indicator: Small green dot on avatar

### 3.8 Profile Card

- Green banner background with profile card overlay
- Avatar: Large circle with initial letter, light gray background
- Below avatar: Full name, factory name, location
- Edit button: Small icon button in top-right of card
- Stats row: Three items (Transactions, Rating, Months) with numbers in accent green

### 3.9 CTA Banner

- Gradient background: primary green → slightly lighter green
- Text: Title (bold white) + subtitle (regular, lighter white)
- Right side: Circular icon button (white outline, → arrow or + icon)
- Full-width, rounded corners (~16px)

### 3.10 Stat Card (Dashboard)

- White background, rounded corners
- Large number in primary green (bold)
- Label below (muted, smaller)
- Used in seller dashboard: "5 Active", "43 Inquiries", "12 Completed"
- Used in profile: "23 Transactions", "4.8 Rating", "12 Months"

### 3.11 Settings Menu Item

- White card with rounded corners
- Left: Icon in muted green circle
- Center: Title (semibold) + subtitle (muted)
- Right: Chevron (>)

### 3.12 Filter Chips

- Horizontal scrollable row
- Active chip: `--color-primary` background, white text
- Inactive chip: White/transparent background, dark text, subtle border
- Used in: Notifications (All, Matches, Messages, Transactions)

---

## 4. Navigation Structure

### Bottom Tab Bar (4 tabs)

| Tab | Icon                   | Screen                                             |
| --- | ---------------------- | -------------------------------------------------- |
| 1   | Document/Listings icon | Home / Dashboard                                   |
| 2   | Chat bubble icon       | Messages                                           |
| 3   | —                      | (appears to be Notifications based on screenshots) |
| 4   | Person outline         | My Account / Profile                               |

- Active tab: Dark green icon
- Inactive tab: Gray icon
- No labels visible (icon-only)
- White background with subtle top border

### Screen Map (from prototype)

```
Home (Buyer Mode)
├── Matched for You → [Match Cards Grid]
├── Browse Marketplace → [Marketplace Page]
└── Recent Transactions → [Transaction List]

Home (Seller Mode)
├── Stats Row (Active / Inquiries / Completed)
├── Create New Listing → [Create Listing Form]
└── My Listings → [Listing List]

Messages
├── Search Bar
└── Thread List → [Chat Detail] (not seen in prototype)

Notifications
├── Filter Chips (All / Matches / Messages / Transactions)
└── Notification List

My Account
├── Profile Card
├── Stats Row (Transactions / Rating / Months)
├── Account Info → [Edit Profile]
├── Location & Address → [Edit Location]
├── Notifications → [Notification Preferences]
└── Settings → [App Settings]
```

---

## 5. Layout Patterns

### Screen Structure

```
┌─────────────────────────┐
│    Green Header Banner   │  ← Primary green bg, ~120-180px
│   (Title / Greeting)     │
├─────────────────────────┤
│                         │
│    Cream Background     │  ← --color-background
│    Content Area         │
│                         │
│    [Cards / Lists]      │  ← White cards on cream
│                         │
├─────────────────────────┤
│    Bottom Tab Bar       │  ← White, icon-only, 4 tabs
└─────────────────────────┘
```

### Spacing

- Page horizontal padding: `16px`
- Card padding: `16px`
- Card gap (vertical): `12px`
- Section heading margin-bottom: `12px`
- Card border-radius: `12–16px`
- Header banner border-radius (bottom): `0` (flush with edges)

### RTL Support

- The prototype includes an Arabic toggle (ع button)
- All layouts should support `dir="rtl"`
- The Arabic text visible in the prototype title "تبادل" confirms bilingual support

---

## 6. Interaction Patterns

| Pattern              | Behavior                                                                      |
| -------------------- | ----------------------------------------------------------------------------- |
| Buying ↔ Selling     | Immediate mode switch — Home screen content changes entirely                  |
| "See All" links      | Section headers have "See All" in accent orange → navigates to full list view |
| Match cards          | Horizontal scrollable carousel                                                |
| Notification filters | Horizontal chip bar, single-select, filters list in-place                     |
| Chat search          | Top of messages page, search bar with placeholder                             |
| Settings items       | Tap → navigate to sub-page (not modal)                                        |

---

## 7. What to Adopt vs. Adapt vs. Ignore

### ✅ Adopt As-Is

- Color palette (forest green + orange accent + cream backgrounds)
- Card-based layout pattern
- Buying/Selling toggle concept
- Bottom tab navigation (4 tabs)
- Notification grouping by type
- Match score percentage badges
- Profile page stats row pattern
- Settings menu item pattern (icon + title + subtitle + chevron)

### ⚠️ Adapt (Improve During Implementation)

- **Category icons** — prototype uses generic icons; real app should use consistent icon set (e.g., Lucide or Phosphor)
- **Match card carousel** — consider adding swipe gestures for mobile
- **Arabic support** — prototype has a toggle button; real app uses `[locale]` routing (SOP-302 should use proper i18n, not a toggle)
- **Chat detail view** — not shown in prototype; will need to be designed from scratch
- **Listing detail page** — not shown; will need full design
- **Transaction detail/flow** — not shown; complex multi-step flow needs proper UX design
- **Create Listing form** — not shown; needs SOP-304 (Form Handling) integration
- **Admin panel** — not shown; entirely separate design needed

### ❌ Ignore (Prototype Bugs / Limitations)

- Any layout glitches or overflow issues
- Hardcoded/placeholder data
- Missing pages (the prototype doesn't cover all user stories)
- Any accessibility gaps (the real app must meet WCAG 2.1 AA)
- The prototype's internal code/structure (it was a v0 throwaway)

---

## 8. Reference Screenshots

Screenshots of the prototype are stored in `docs/design/screenshots/` and are the visual ground truth for the design system above.

| Screenshot                    | Screen                   | Key Patterns Shown                                   |
| ----------------------------- | ------------------------ | ---------------------------------------------------- |
| `01-home-buyer.png`           | Home (loading)           | Initial page load state                              |
| `02-home-buyer-scroll.png`    | Home (Buyer mode)        | Header, greeting, match cards, marketplace CTA       |
| `03-marketplace.png`          | Marketplace              | Browse listings, search, filters                     |
| `04-marketplace-detail.png`   | Marketplace (detail)     | Listing detail view                                  |
| `05-marketplace-browse.png`   | Marketplace (browse)     | Grid/list view of listings                           |
| `06-marketplace-listing.png`  | Listing card             | Listing card expanded view                           |
| `07-chat-threads.png`         | Messages                 | Chat thread list, avatars, unread badges, search bar |
| `08-chat-detail.png`          | Chat detail              | Individual chat conversation                         |
| `09-profile.png`              | My Account               | Profile card, stats row, settings menu items         |
| `10-profile-scroll.png`       | My Account (scrolled)    | Additional settings options                          |
| `11-home-seller-toggle.png`   | Buying → Selling toggle  | Mode switch interaction                              |
| `12-home-seller.png`          | Home (Seller mode)       | Seller stats, create listing CTA, listing cards      |
| `13-create-listing.png`       | Create Listing (Step 1)  | 3-step wizard form, waste type dropdown              |
| `14-create-listing-step2.png` | Create Listing (Step 2)  | Pricing and quantity fields                          |
| `15-notifications.png`        | Notifications            | Notification list with type icons                    |
| `16-notifications-filter.png` | Notifications (filtered) | Filter chips active state                            |
| `17-arabic-rtl.png`           | Arabic RTL mode          | Full RTL layout reversal                             |
| `18-arabic-scroll.png`        | Arabic RTL (scrolled)    | Arabic content below fold                            |
| `19-final.png`                | Final state              | End state of exploration                             |

---

## 9. Mapping to SOP Execution

When executing **SOP-302 (UI/UX Design)**, use this document as follows:

1. **Step 1 (Assess Input Level):** → Select **"Detailed"**
2. **Step 2 (Analyze User Stories):** → Cross-reference requirements with this design reference
3. **Steps 3-4 (Flows & Wireframes):** → Use the screen map and layout patterns above as starting wireframes
4. **Step 5 (Component Hierarchy):** → The component patterns in Section 3 map directly to the `src/components/` architecture
5. **Step 9 (Visual Design Direction):** → **SKIP** — this document IS the approved visual direction

When executing **SOP-301 (Styling Standards):**

1. Use the color palette (Section 1) to populate `tailwind.config.ts` and `globals.css`
2. Use the typography scale (Section 2) for font configuration
3. Use the spacing values (Section 5) for design tokens
