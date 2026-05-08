# Marketplace & Listings — UI Design

> **SOP:** SOP-302 · **Input Mode:** Detailed (v0 prototype)
> **User Stories:** US-010–014 (Seller Listings), US-020–023 (Buyer Browsing)
> **Updated:** 2026-05-08

---

## 1. User Flows (Step 3)

### Flow 1: Buyer Browses & Purchases

```
[Buyer Home] → Click "Browse Marketplace"
    → [Marketplace Page] → Apply filters (type, location, price)
        → Results update (debounced)
        → Click listing card
            → [Listing Detail Page]
                ├── Click "Bookmark" → Toggle saved (optimistic UI)
                ├── Click "Message Seller" → [Chat Thread]
                └── Click "Buy Now" (fixed) or "Place Bid" (auction)
                    ├── Success → [Transaction Created - Pending Deposit]
                    └── Error → Inline validation message
```

### Flow 2: Seller Creates Listing

```
[Seller Home] → Click "Create New Listing" CTA
    → [Create Listing - Step 1: Details]
        → Select category, enter title/description
        → Upload ≥1 photo (drag-drop or click)
        → Click "Next"
            ├── Validation fail → Inline errors, stay on step
            └── Pass → [Step 2: Pricing]
                → Select mode: Fixed Price | Auction
                → Enter price OR min bid + end date
                → Enter quantity + unit
                → Click "Next"
                    → [Step 3: Review & Publish]
                        → Review all fields, location confirmed
                        → Click "Publish"
                            ├── Success → Toast + redirect to My Listings
                            └── Error → Error message, retry
```

### Flow 3: Seller Manages Listings

```
[Seller Home] → "My Listings" section
    → Filter by status (Active | Sold | Deactivated)
    → Click listing card
        → [Listing Detail (own)]
            ├── Click "Edit" → [Edit Listing - pre-filled wizard]
            │   → Modify fields → "Save Changes"
            │       ├── Success → Toast + return to detail
            │       └── Error → Inline errors
            └── Click "Deactivate"
                → [Confirmation Modal]
                    ├── Confirm → Listing hidden, toast
                    └── Cancel → Close modal
```

### Flow 4: Buyer Saves & Reviews Bookmarks

```
[Any Listing Card or Detail] → Click bookmark icon
    → Toggle (filled/outline), optimistic UI
    → Toast: "Saved" / "Removed"

[Sidebar Nav] → "Saved" link
    → [Saved Listings Page]
        → Grid of bookmarked listings (same as marketplace)
        → Empty state if none saved
```

---

## 2. Text-Based Wireframes (Step 4)

### 2.1 Marketplace Browse Page

**Desktop (≥1024px):**

```
┌─────────────────────────────────────────────────────────────────────┐
│ [Sidebar]  │  Marketplace                               [Search 🔍]│
│            │─────────────────────────────────────────────────────────│
│ Dashboard  │  [Category ▼] [Location ▼] [Price ▼] [Clear Filters]  │
│ Marketplace│  Showing 47 results                                    │
│ Messages   │                                                        │
│ Saved      │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐    │
│ Profile    │  │ [Icon]  │ │ [Icon]  │ │ [Icon]  │ │ [Icon]  │    │
│            │  │ Title   │ │ Title   │ │ Title   │ │ Title   │    │
│            │  │ Factory │ │ Factory │ │ Factory │ │ Factory │    │
│            │  │ EGP X   │ │ EGP X   │ │ EGP X   │ │ EGP X   │    │
│            │  │ 📍 City │ │ 📍 City │ │ 📍 City │ │ 📍 City │    │
│            │  └─────────┘ └─────────┘ └─────────┘ └─────────┘    │
│            │                                                        │
│            │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐    │
│            │  │  ...    │ │  ...    │ │  ...    │ │  ...    │    │
│            │  └─────────┘ └─────────┘ └─────────┘ └─────────┘    │
│            │                                                        │
│            │  [← Prev]  Page 1 of 5  [Next →]                      │
└─────────────────────────────────────────────────────────────────────┘
```

**Mobile (<640px):**

```
┌──────────────────────────┐
│ ☰  Marketplace      🔍 🔔│
├──────────────────────────┤
│ [Filter] [Category] [▼+] │  ← Horizontal scroll chips
├──────────────────────────┤
│ 47 results               │
│                          │
│ ┌──────────┐┌──────────┐│
│ │ [Icon]   ││ [Icon]   ││
│ │ Title    ││ Title    ││
│ │ Factory  ││ Factory  ││
│ │ EGP X    ││ EGP X    ││
│ │ 📍 City  ││ 📍 City  ││
│ └──────────┘└──────────┘│
│ ┌──────────┐┌──────────┐│
│ │  ...     ││  ...     ││
│ └──────────┘└──────────┘│
│                          │
│ [Load more...]           │
└──────────────────────────┘
```

### 2.2 Listing Detail Page

**Desktop (≥1024px):**

```
┌─────────────────────────────────────────────────────────────────────┐
│ [Sidebar]  │  ← Back to Marketplace  /  Copper Wire                │
│            │─────────────────────────────────────────────────────────│
│            │                                                        │
│            │  ┌─────────────────────┐  ┌─────────────────────────┐ │
│            │  │                     │  │ ⌈Copper⌉  ⌈Fixed Price⌉│ │
│            │  │   Photo Gallery     │  │                         │ │
│            │  │   [1] [2] [3] [4]   │  │ EGP 4,500/ton          │ │
│            │  │   (carousel dots)   │  │ Quantity: 50 tons       │ │
│            │  │                     │  │ 📍 6th October City     │ │
│            │  └─────────────────────┘  │                         │ │
│            │                           │ ──────────────────────  │ │
│            │                           │ 📝 Description text...  │ │
│            │                           │                         │ │
│            │                           │ ──────────────────────  │ │
│            │                           │ Seller Info             │ │
│            │                           │ [Avatar] Cairo Steel    │ │
│            │                           │ ★★★★☆ 4.2 (18 reviews) │ │
│            │                           │                         │ │
│            │                           │ [💬 Message] [♡ Save]   │ │
│            │                           │ [🛒 Buy Now        ]    │ │
│            │                           └─────────────────────────┘ │
│            │                                                        │
│            │  Similar Listings         [See All →]                  │
│            │  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐         │
│            │  │ card   │ │ card   │ │ card   │ │ card   │         │
│            │  └────────┘ └────────┘ └────────┘ └────────┘         │
└─────────────────────────────────────────────────────────────────────┘
```

**Mobile (<640px):**

```
┌──────────────────────────┐
│ ← Back            ♡  ⋮  │
├──────────────────────────┤
│ ┌──────────────────────┐ │
│ │   Photo Gallery      │ │
│ │   (full-width)       │ │
│ │   ● ○ ○ ○            │ │
│ └──────────────────────┘ │
│                          │
│ ⌈Copper⌉ ⌈Fixed Price⌉ │
│ Industrial Copper Cable  │
│ EGP 4,500/ton            │
│ Qty: 50 tons · 📍 Cairo  │
│                          │
│ ─────────────────────    │
│ Description text here... │
│                          │
│ ─────────────────────    │
│ [Avatar] Cairo Steel Co. │
│ ★★★★☆ 4.2 · 18 reviews  │
│                          │
│ [💬 Message Seller     ] │
│ [🛒 Buy Now            ] │
│                          │
│ Similar Listings         │
│ ┌──────┐ ┌──────┐       │
│ │ card │ │ card │ →      │
│ └──────┘ └──────┘       │
└──────────────────────────┘
```

### 2.3 Create Listing Wizard

**All Breakpoints (single-column centered, max-w-2xl):**

```
┌──────────────────────────────────────────┐
│ [Sidebar] │  Create New Listing          │
│           │                              │
│           │  Step 1 ── Step 2 ── Step 3  │
│           │  ●━━━━━━━━○━━━━━━━━○         │
│           │  Details    Pricing  Review   │
│           │                              │
│           │  ┌────────────────────────┐   │
│           │  │ Category *             │   │
│           │  │ [Select category  ▼]   │   │
│           │  │                        │   │
│           │  │ Title *                │   │
│           │  │ [                    ] │   │
│           │  │                        │   │
│           │  │ Description            │   │
│           │  │ [                    ] │   │
│           │  │ [                    ] │   │
│           │  │                        │   │
│           │  │ Photos * (min 1)       │   │
│           │  │ ┌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┐   │   │
│           │  │ ╎  📷 Click or    ╎   │   │
│           │  │ ╎  drag to upload ╎   │   │
│           │  │ └╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┘   │   │
│           │  │ [img1 ×] [img2 ×]     │   │
│           │  │                        │   │
│           │  │         [Next →]       │   │
│           │  └────────────────────────┘   │
└──────────────────────────────────────────┘
```

### 2.4 My Listings (Seller Dashboard)

**Desktop:**

```
┌─────────────────────────────────────────────────────────────────────┐
│ [Sidebar]  │  My Listings                                          │
│            │─────────────────────────────────────────────────────────│
│            │  ┌──────────┐ ┌──────────┐ ┌──────────┐              │
│            │  │ 5 Active │ │ 43 Inq.  │ │ 12 Done  │              │
│            │  └──────────┘ └──────────┘ └──────────┘              │
│            │                                                        │
│            │  [Active] [Sold] [Deactivated]     [+ New Listing]    │
│            │                                                        │
│            │  ┌─────────────────────────────────────────────────┐  │
│            │  │ [Icon] │ ⌈Copper⌉ ⌈Active⌉                    │  │
│            │  │        │ Industrial Copper Cable                │  │
│            │  │        │ EGP 4,500/ton  · 👁 234  💬 12         │  │
│            │  └─────────────────────────────────────────────────┘  │
│            │  ┌─────────────────────────────────────────────────┐  │
│            │  │ [Icon] │ ⌈Steel⌉ ⌈Active⌉                     │  │
│            │  │        │ Steel Scrap Bundle                     │  │
│            │  │        │ EGP 2,800/ton  · 👁 156  💬 8          │  │
│            │  └─────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 3. Component Hierarchy (Step 5)

### Marketplace Browse Page

```
MarketplacePage (Server Component)
├── Container
├── PageHeader (title + search)
│   └── SearchInput
├── FilterBar
│   ├── FilterChip (Category)
│   ├── FilterChip (Location)
│   ├── FilterChip (Price Range)
│   └── Button (Clear)
├── ResultsInfo ("47 results")
├── ListingGrid
│   └── ListingCard (compact) ×N
│       ├── Card
│       ├── Badge (category)
│       ├── PriceDisplay
│       └── BookmarkButton
└── Pagination
```

### Listing Detail Page

```
ListingDetailPage (Server Component — data fetch)
├── Breadcrumb
├── ListingDetailLayout (2-col desktop, 1-col mobile)
│   ├── ImageGallery (Client)
│   │   ├── Main image display
│   │   └── Thumbnail strip
│   └── ListingInfo
│       ├── Badge (category) + Badge (listing mode)
│       ├── Title (h1)
│       ├── PriceDisplay
│       ├── QuantityDisplay
│       ├── LocationDisplay
│       ├── Description
│       ├── SellerCard
│       │   ├── Avatar
│       │   ├── Factory name + location
│       │   └── StarRating (display)
│       ├── ActionBar
│       │   ├── Button ("Message Seller")
│       │   ├── BookmarkButton
│       │   └── Button ("Buy Now") OR BidSection
│       └── BidSection (if auction, Client)
│           ├── Current bid display
│           ├── Input (bid amount)
│           ├── Auction countdown
│           └── Button ("Place Bid")
└── SimilarListings
    └── ListingCard (compact) ×4
```

### Create Listing Wizard

```
CreateListingPage (Client Component)
├── Container (max-w-2xl, centered)
├── Stepper (3 steps)
├── Step1Details (conditional render)
│   ├── Select (category)
│   ├── Input (title)
│   ├── Textarea (description)
│   ├── FileUpload (photos)
│   │   ├── DropZone
│   │   └── ImagePreviewGrid
│   └── Button ("Next")
├── Step2Pricing (conditional render)
│   ├── SegmentedToggle (Fixed / Auction)
│   ├── Input (price) — if fixed
│   ├── Input (min bid) — if auction
│   ├── DatePicker (auction end) — if auction
│   ├── Input (quantity)
│   ├── Select (unit)
│   └── Button ("Next" / "Back")
└── Step3Review (conditional render)
    ├── ReviewSummaryCard
    │   ├── Photo preview
    │   ├── All field values
    │   └── Location display
    ├── Button ("Back")
    └── Button ("Publish Listing")
```

### My Listings

```
MyListingsPage (Server Component)
├── Container
├── StatsRow
│   └── StatCard ×3 (Active, Inquiries, Completed)
├── ActionBar
│   ├── FilterChips (Active | Sold | Deactivated)
│   └── Button ("+ New Listing")
└── ListingList
    └── ListingCardRow ×N
        ├── Category icon
        ├── Badge (category) + Badge (status)
        ├── Title + Price
        └── Stats (views, inquiries)
```

---

## 4. Micro-Interactions (Step 6)

| Interaction            | Trigger                    | Animation                                             | Duration       | Feedback                                    |
| ---------------------- | -------------------------- | ----------------------------------------------------- | -------------- | ------------------------------------------- |
| **Card hover**         | Mouse enter on ListingCard | Scale 1→1.02, shadow elevates                         | 200ms ease-out | Cursor pointer                              |
| **Bookmark toggle**    | Click bookmark icon        | Icon morphs outline↔filled, brief scale pulse 1→1.2→1 | 300ms spring   | Toast "Saved"/"Removed"                     |
| **Filter apply**       | Select filter option       | Results fade out (150ms) → fade in (200ms)            | 350ms total    | Result count updates                        |
| **Photo upload**       | Drop file on zone          | Drop zone border pulses green, thumbnail fades in     | 300ms          | Progress bar if large file                  |
| **Wizard step**        | Click "Next"               | Current step slides left, next slides in from right   | 300ms ease     | Stepper dot fills                           |
| **Buy Now click**      | Click CTA                  | Button shows loading spinner                          | Until response | Success → redirect; Error → shake + message |
| **Bid placement**      | Submit bid                 | Input border → green flash, amount animates up        | 400ms          | Success toast with new bid amount           |
| **Listing deactivate** | Confirm in modal           | Card fades out + slides up, list reflows              | 300ms ease-out | Toast "Listing deactivated"                 |
| **Search typing**      | Keystrokes in search       | Debounce 300ms, then skeleton shimmer while loading   | 300ms debounce | Result count updates via aria-live          |
| **Image gallery**      | Click thumbnail / arrows   | Crossfade between images                              | 250ms ease     | Active thumbnail highlighted                |

---

## 5. Responsive Breakpoints (Step 7)

### Breakpoint Definitions

| Name    | Range      | Tailwind      | Layout                              |
| ------- | ---------- | ------------- | ----------------------------------- |
| Mobile  | <640px     | default       | Single column, hamburger menu       |
| Tablet  | 640–1023px | `sm:` / `md:` | 2-column grids, collapsible sidebar |
| Desktop | ≥1024px    | `lg:` / `xl:` | Persistent sidebar, 3–4 col grids   |

### Per-Screen Breakpoint Behavior

#### Marketplace Browse

| Element      | Mobile (<640)                                    | Tablet (640–1023)       | Desktop (≥1024)           |
| ------------ | ------------------------------------------------ | ----------------------- | ------------------------- |
| Sidebar      | Hidden (hamburger)                               | Hidden (hamburger)      | Persistent (240px)        |
| Search       | Full-width below header                          | Full-width below header | Inline in header          |
| Filters      | Horizontal scroll chips + "Filter" drawer button | Dropdown chips row      | Inline dropdown row       |
| Listing grid | 2 columns                                        | 2–3 columns             | 3–4 columns               |
| Card size    | Compact (no description)                         | Compact                 | Compact with hover detail |
| Pagination   | "Load more" button                               | "Load more" button      | Numbered pagination       |

#### Listing Detail

| Element          | Mobile (<640)              | Tablet (640–1023)   | Desktop (≥1024)            |
| ---------------- | -------------------------- | ------------------- | -------------------------- |
| Layout           | Single column              | Single column       | 2 columns (gallery + info) |
| Photo gallery    | Full-width carousel, swipe | Full-width carousel | Left column, ~55% width    |
| Action buttons   | Fixed bottom bar           | Fixed bottom bar    | Inline in info column      |
| Similar listings | Horizontal scroll          | 2-column grid       | 4-column grid              |
| Breadcrumb       | Hidden (back arrow only)   | Shown               | Shown                      |

#### Create Listing Wizard

| Element            | Mobile (<640)          | Tablet (640–1023) | Desktop (≥1024)                 |
| ------------------ | ---------------------- | ----------------- | ------------------------------- |
| Form width         | Full width (px-4)      | max-w-lg centered | max-w-2xl centered              |
| Stepper            | Icons only, horizontal | Icons + labels    | Icons + labels + connector line |
| Photo grid         | 2 columns              | 3 columns         | 4 columns                       |
| Navigation buttons | Full-width stacked     | Side by side      | Side by side, right-aligned     |

#### My Listings

| Element         | Mobile (<640)       | Tablet (640–1023)   | Desktop (≥1024)                 |
| --------------- | ------------------- | ------------------- | ------------------------------- |
| Stat cards      | Horizontal scroll   | 3-column row        | 3-column row                    |
| Filter + action | Stacked             | Inline row          | Inline row                      |
| Listing cards   | Full-width vertical | Full-width vertical | Full-width vertical (list view) |

---

## 6. Accessibility Requirements (Step 8)

### Global Requirements (All Screens)

- **Skip link:** "Skip to main content" as first focusable element
- **Landmarks:** `<nav>` (sidebar), `<main>` (content), `<header>`, `<footer>`
- **Focus management:** Visible focus ring (2px solid `--ring`), tab order follows visual order
- **Color contrast:** All text meets WCAG 2.1 AA (4.5:1 for body, 3:1 for large text)
- **Reduced motion:** `prefers-reduced-motion` disables all animations (already in globals.css)
- **RTL support:** All layouts use logical properties (`ms-`, `me-`, `ps-`, `pe-`, `start`, `end`)

### Marketplace Browse

| Element          | Requirement                                                                             |
| ---------------- | --------------------------------------------------------------------------------------- |
| Search input     | `role="search"`, `aria-label="Search listings"`                                         |
| Filter dropdowns | Each has `aria-label`, selected state announced                                         |
| Active filters   | Removable chips have `aria-label="Remove [filter] filter"`                              |
| Results region   | `aria-live="polite"` announces count changes: "Showing 47 results"                      |
| Listing cards    | Each is an `<a>` or has `role="link"`, descriptive `aria-label` combining title + price |
| Pagination       | `nav` with `aria-label="Pagination"`, current page `aria-current="page"`                |
| Empty state      | `role="status"` with descriptive message                                                |

### Listing Detail

| Element         | Requirement                                                                                       |
| --------------- | ------------------------------------------------------------------------------------------------- |
| Image gallery   | `role="region"` + `aria-label="Product photos"`, arrow keys navigate, `aria-label="Image X of Y"` |
| Price display   | `aria-label="Price: 4,500 Egyptian Pounds per ton"`                                               |
| Star rating     | `aria-label="Rated 4.2 out of 5 stars based on 18 reviews"`                                       |
| Bookmark button | `aria-pressed="true/false"`, `aria-label="Save listing"`                                          |
| Buy Now button  | Descriptive label, loading state announced via `aria-busy`                                        |
| Bid input       | `aria-describedby` linking to current bid + min increment info                                    |
| Breadcrumb      | `nav` with `aria-label="Breadcrumb"`, current page `aria-current="page"`                          |

### Create Listing Wizard

| Element          | Requirement                                                                  |
| ---------------- | ---------------------------------------------------------------------------- |
| Stepper          | `aria-label="Listing creation progress"`, current step `aria-current="step"` |
| Required fields  | `aria-required="true"`, error linked via `aria-describedby`                  |
| Category select  | `aria-label="Waste category"`, options navigable by arrow keys               |
| File upload zone | `role="button"`, `aria-label="Upload photos, minimum 1 required"`            |
| Photo previews   | Each has `alt` text, remove button `aria-label="Remove photo [name]"`        |
| Mode toggle      | `role="radiogroup"` + `role="radio"`, `aria-checked` on selected             |
| Form errors      | `role="alert"` for error summary, individual errors via `aria-describedby`   |
| Step navigation  | Focus moves to first field of new step on transition                         |

### My Listings

| Element          | Requirement                                                                      |
| ---------------- | -------------------------------------------------------------------------------- |
| Stat cards       | `role="status"`, `aria-label="5 active listings"` etc.                           |
| Status filters   | `role="tablist"` + `role="tab"`, `aria-selected` on active                       |
| Deactivate modal | Focus trapped, `role="alertdialog"`, `aria-describedby` for warning text         |
| Listing cards    | `role="link"`, status badge color not sole indicator (text label always present) |

### Keyboard Navigation

| Screen         | Tab Order                                                                                             |
| -------------- | ----------------------------------------------------------------------------------------------------- |
| Marketplace    | Skip link → Sidebar nav → Search → Filter chips → Listing cards (left→right, top→bottom) → Pagination |
| Listing Detail | Skip link → Breadcrumb → Gallery controls → Listing info → Action buttons → Similar listings          |
| Create Listing | Skip link → Stepper (read-only) → Form fields (top→bottom) → Navigation buttons                       |
| My Listings    | Skip link → Stat cards → Filter tabs → "+ New Listing" button → Listing cards                         |

---

## 7. Design Token Mapping

All marketplace screens use the tokens defined in `globals.css` (SOP-301):

| Visual Element    | Token                                      | Example              |
| ----------------- | ------------------------------------------ | -------------------- |
| Page background   | `bg-background`                            | Warm cream `#F5F1EB` |
| Cards             | `bg-surface`                               | White `#FFFFFF`      |
| Card shadow       | `shadow-card`                              | Subtle elevation     |
| Card hover shadow | `shadow-elevated`                          | Increased elevation  |
| Card radius       | `rounded-xl`                               | 16px                 |
| Price text        | `text-accent font-bold`                    | Orange `#D4760A`     |
| Category badge    | `bg-primary text-primary-foreground`       | Green pill           |
| Status: Active    | `bg-status-active/10 text-status-active`   | Green tint           |
| Status: Pending   | `bg-status-pending/10 text-status-pending` | Amber tint           |
| Primary CTA       | `bg-primary text-primary-foreground`       | Green button         |
| Secondary action  | `bg-surface border text-text-primary`      | Outlined button      |
| Muted text        | `text-text-secondary`                      | Gray metadata        |
