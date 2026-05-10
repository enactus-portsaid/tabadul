# Admin Panel — UI Design

> **SOP:** SOP-302 · **Input Mode:** Detailed (v0 prototype)
> **User Stories:** US-080 (user mgmt), US-081 (listing moderation), US-082 (payment verify), US-083 (dashboard), US-084 (disputes)
> **Note:** Desktop-first, web-only. Data tables are the primary pattern.
> **Updated:** 2026-05-08

---

## 1. User Flows (Step 3)

### Flow 1: Admin Dashboard (US-083)

```
[Admin Login] → [Admin Dashboard]
    → Stat cards: Total Users, Active Listings, Transactions (month), Revenue (month)
    → Charts: Transactions over time (line), Revenue by category (bar)
    → Quick actions: Pending Verifications (count), Open Disputes (count)
        → Click → Navigate to respective queue
    → Recent activity feed (last 10 events)
```

### Flow 2: User Management (US-080)

```
[Admin Sidebar → Users]
    → [User Management Page]
        → Search bar + status filter (All | Active | Suspended | Banned)
        → Data table: Name, Email, Role, Location, Status, Joined, Actions
        → Click row → [User Detail Drawer/Page]
            → Profile info, transaction history, listings, reviews
        → Actions dropdown per row:
            ├── Approve → Status → Active (toast)
            ├── Suspend → [Reason Modal] → Status → Suspended (toast + email)
            └── Ban → [Confirmation + Reason Modal] → Status → Banned (toast + email)
```

### Flow 3: Listing Moderation (US-081)

```
[Admin Sidebar → Listings]
    → [Listing Moderation Page]
        → Filter: All | Pending Review | Active | Removed
        → Data table: Title, Seller, Category, Price, Status, Created, Actions
        → Click row → [Listing Detail Drawer] (preview listing as user sees it)
        → Actions:
            ├── Approve → Status → Active (seller notified)
            ├── Request Edit → [Reason Modal] → Seller notified with feedback
            └── Remove → [Reason Modal] → Listing hidden (seller notified)
```

### Flow 4: Payment Verification (US-082)

```
[Admin Sidebar → Payments]
    → [Payment Verification Queue]
        → Filter: Pending | Verified | Rejected
        → Table: TXN ID, Buyer, Seller, Amount, Receipt, Submitted, Actions
        → Click row → [Payment Review Panel]
            → Receipt image (zoomable, full-size viewer)
            → Transaction summary (material, quantity, price)
            → Buyer + seller info
            → Actions:
                ├── Verify → [Confirm Modal] → Status → PAYMENT_VERIFIED (both notified)
                └── Reject → [Reason Modal] → Status → PAYMENT_REJECTED (buyer notified)
```

### Flow 5: Dispute Resolution (US-084)

```
[Admin Sidebar → Disputes]
    → [Dispute Queue]
        → Filter: Open | Under Review | Resolved
        → Table: TXN ID, Parties, Reason, Filed, Status, Actions
        → Click row → [Dispute Detail Page]
            → Timeline of events
            → Dispute reason + description + evidence photos
            → Chat history (read-only)
            → Inspection report (if exists)
            → Transaction details
            → Resolution form:
                → Decision: [Favor Buyer] [Favor Seller] [Partial Refund] [Dismiss]
                → Resolution notes (textarea, required)
                → Refund amount (if partial)
                → [Submit Resolution]
                    → Both parties notified
                    → Transaction status updated
```

---

## 2. Text-Based Wireframes (Step 4)

### 2.1 Admin Dashboard

**Desktop (≥1024px):**

```
┌─────────────────────────────────────────────────────────────────────┐
│ [Admin      │  Dashboard                                           │
│  Sidebar]   │─────────────────────────────────────────────────────────│
│             │                                                        │
│ Dashboard◄  │  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐│
│ Users       │  │   1,247    │ │    342     │ │    156     │ │ EGP 2.4M ││
│ Listings    │  │   Users    │ │  Listings  │ │ Transact.  │ │ Revenue  ││
│ Payments    │  │   ↑12%     │ │   ↑8%     │ │   ↑15%    │ │  ↑22%   ││
│ Disputes    │  └────────────┘ └────────────┘ └────────────┘ └────────────┘│
│             │                                                        │
│             │  ┌──────────────────────────┐ ┌──────────────────────┐│
│             │  │ Transactions Over Time   │ │ Revenue by Category  ││
│             │  │ ┌──────────────────────┐ │ │ ┌──────────────────┐ ││
│             │  │ │    📈 Line Chart     │ │ │ │  📊 Bar Chart    │ ││
│             │  │ │                      │ │ │ │                  │ ││
│             │  │ └──────────────────────┘ │ │ └──────────────────┘ ││
│             │  └──────────────────────────┘ └──────────────────────┘│
│             │                                                        │
│             │  Quick Actions                                         │
│             │  ┌──────────────────┐ ┌──────────────────┐            │
│             │  │ 🔴 8 Pending     │ │ 🔴 3 Open        │            │
│             │  │   Verifications  │ │   Disputes       │            │
│             │  └──────────────────┘ └──────────────────┘            │
│             │                                                        │
│             │  Recent Activity                                       │
│             │  ┌─────────────────────────────────────────────────┐  │
│             │  │ • User "Cairo Steel" registered         2h ago │  │
│             │  │ • Payment receipt uploaded for #TXN-2850  3h ago│  │
│             │  │ • Dispute filed on #TXN-2831             5h ago│  │
│             │  └─────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

### 2.2 User Management (Data Table)

**Desktop:**

```
┌─────────────────────────────────────────────────────────────────────┐
│ [Admin      │  User Management                   [+ Invite User]  │
│  Sidebar]   │─────────────────────────────────────────────────────────│
│             │  [🔍 Search users...]  [All ▼] [Role ▼] [Export]    │
│             │                                                        │
│             │  ┌─────────────────────────────────────────────────┐  │
│             │  │ □ │ Name          │ Email        │ Role │Status ││
│             │  │───┼───────────────┼──────────────┼──────┼───────││
│             │  │ □ │ Ahmed Hassan  │ ahmed@...    │ User │⌈Active⌉││
│             │  │ □ │ Cairo Steel   │ info@...     │ User │⌈Active⌉││
│             │  │ □ │ Nile Steel    │ nile@...     │ User │⌈Susp.⌉ ││
│             │  │ □ │ Delta Metals  │ delta@...    │ User │⌈Active⌉││
│             │  │ □ │ Test Factory  │ test@...     │ User │⌈Banned⌉││
│             │  └─────────────────────────────────────────────────┘  │
│             │                                                        │
│             │  Showing 1-10 of 1,247    [← 1 2 3 ... 125 →]       │
└─────────────────────────────────────────────────────────────────────┘
```

### 2.3 Payment Verification

**Desktop:**

```
┌─────────────────────────────────────────────────────────────────────┐
│ [Admin      │  Payment Verification                               │
│  Sidebar]   │─────────────────────────────────────────────────────────│
│             │  [Pending (8)] [Verified] [Rejected]                  │
│             │                                                        │
│             │  ┌─────────────────────────────────────────────────┐  │
│             │  │TXN ID   │Buyer     │Seller    │Amount   │Action ││
│             │  │─────────┼──────────┼──────────┼─────────┼───────││
│             │  │TXN-2847 │Ahmed H.  │Cairo St. │EGP12.5k │[View] ││
│             │  │TXN-2850 │Nile Ind. │Delta M.  │EGP8.2k  │[View] ││
│             │  └─────────────────────────────────────────────────┘  │
│             │                                                        │
│             │  ── Payment Review (slide-in panel) ───────────────── │
│             │  ┌──────────────────────┐ ┌──────────────────────┐  │
│             │  │ [Receipt Image]      │ │ Transaction Summary  │  │
│             │  │ (zoomable)           │ │ #TXN-2847            │  │
│             │  │                      │ │ Copper Cable         │  │
│             │  │                      │ │ 50 tons · EGP 12,500│  │
│             │  │                      │ │                      │  │
│             │  │                      │ │ Buyer: Ahmed Hassan  │  │
│             │  │                      │ │ Seller: Cairo Steel  │  │
│             │  └──────────────────────┘ └──────────────────────┘  │
│             │                                                        │
│             │  [✗ Reject]                        [✓ Verify Payment] │
└─────────────────────────────────────────────────────────────────────┘
```

### 2.4 Dispute Resolution Detail

**Desktop:**

```
┌─────────────────────────────────────────────────────────────────────┐
│ [Admin      │  ← Back to Disputes                                 │
│  Sidebar]   │                                                        │
│             │  Dispute #DSP-042 · #TXN-2831                        │
│             │  ⌈Open⌉  Filed: Mar 28, 2026                        │
│             │                                                        │
│             │  ┌───────────────────────────────────────────────────┐│
│             │  │ Reason: Quality Issue                            ││
│             │  │ "Material does not match listing description.    ││
│             │  │  Expected Grade A steel, received mixed grade."  ││
│             │  │                                                   ││
│             │  │ Evidence: [img1] [img2]                          ││
│             │  └───────────────────────────────────────────────────┘│
│             │                                                        │
│             │  ┌──────────────────────┐ ┌──────────────────────────┐│
│             │  │ Buyer Info           │ │ Seller Info              ││
│             │  │ Ahmed Hassan         │ │ Nile Steel Co.           ││
│             │  │ ★★★★☆ 4.2          │ │ ★★★★★ 4.8               ││
│             │  └──────────────────────┘ └──────────────────────────┘│
│             │                                                        │
│             │  [📋 Inspection Report] [💬 Chat History] [📦 Listing]│
│             │                                                        │
│             │  ── Resolution ──────────────────────────────────────  │
│             │  Decision *                                            │
│             │  [Favor Buyer ▼]                                      │
│             │  Resolution Notes *                                    │
│             │  [                                                   ] │
│             │  [                                                   ] │
│             │                                                        │
│             │  [Cancel]                      [Submit Resolution]    │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 3. Component Hierarchy (Step 5)

### Admin Layout

```
AdminLayout
├── AdminSidebar (persistent, narrower than user sidebar)
│   ├── Logo ("Tabadul Admin")
│   ├── NavItem ×5 (Dashboard, Users, Listings, Payments, Disputes)
│   │   └── Badge (pending count on Payments + Disputes)
│   └── AdminProfile (bottom: avatar, name, "Log Out")
└── AdminContent
    └── {children} — page slot
```

### Admin Dashboard

```
AdminDashboardPage (Server Component)
├── PageHeader ("Dashboard")
├── StatsGrid (4-column)
│   └── AdminStatCard ×4
│       ├── Metric (large number)
│       ├── Label
│       └── TrendIndicator (↑12% green or ↓5% red)
├── ChartsGrid (2-column)
│   ├── LineChart ("Transactions Over Time")
│   └── BarChart ("Revenue by Category")
├── QuickActions (2-column)
│   └── ActionCard ×2
│       ├── Badge (count, red)
│       └── Label + Link
└── ActivityFeed
    └── ActivityItem ×10
        ├── Dot (color by type)
        ├── Description
        └── Timestamp
```

### Data Table (Shared)

```
DataTable (Client Component — sorting, filtering, pagination)
├── TableToolbar
│   ├── SearchInput
│   ├── FilterDropdowns ×N
│   ├── BulkActions (if rows selected)
│   └── ExportButton
├── Table
│   ├── TableHeader
│   │   └── TableHeaderCell ×N (sortable: click to sort, arrow indicator)
│   ├── TableBody
│   │   └── TableRow ×N
│   │       ├── Checkbox (bulk select)
│   │       ├── TableCell ×N (data)
│   │       └── ActionsCell
│   │           └── ActionsDropdown (⋮ menu)
│   └── TableFooter
│       ├── RowCount ("Showing 1-10 of 1,247")
│       ├── PageSizeSelector ([10] [25] [50])
│       └── Pagination (← 1 2 3 ... N →)
```

### Dispute Detail

```
DisputeDetailPage (Server Component)
├── BackLink
├── PageHeader (Dispute ID + TXN ID + StatusBadge)
├── DisputeInfoCard
│   ├── Reason (bold)
│   ├── Description (quoted text)
│   └── EvidenceGallery (photos)
├── PartiesGrid (2-column)
│   ├── BuyerCard (Avatar, name, rating)
│   └── SellerCard
├── RelatedDocsTabs
│   ├── Tab: Inspection Report (embedded view)
│   ├── Tab: Chat History (read-only message thread)
│   └── Tab: Listing (original listing preview)
├── ResolutionForm (Client)
│   ├── Select (decision: Favor Buyer | Favor Seller | Partial Refund | Dismiss)
│   ├── Input (refund amount — conditional on Partial Refund)
│   ├── Textarea (resolution notes, required)
│   └── ActionBar (Cancel + Submit Resolution)
```

---

## 4. Micro-Interactions (Step 6)

| Interaction            | Trigger             | Animation                                        | Duration        | Feedback                        |
| ---------------------- | ------------------- | ------------------------------------------------ | --------------- | ------------------------------- |
| **Stat card count-up** | Page load           | Numbers animate from 0, trend arrows fade in     | 600ms staggered | Staggered left→right            |
| **Chart render**       | Page load           | Line draws progressively, bars grow upward       | 800ms ease-out  | Progressive reveal              |
| **Table row hover**    | Mouse enter         | Row background subtly highlights                 | 150ms ease      | Cursor pointer                  |
| **Sort column**        | Click header        | Arrow rotates (↑↓), rows reorder with brief fade | 200ms fade      | Active column highlighted       |
| **Bulk select**        | Check rows          | Toolbar slides down with bulk action buttons     | 200ms slide     | Selected count shown            |
| **Action dropdown**    | Click ⋮             | Menu fades in + scales from anchor point         | 150ms ease      | Focus trapped in menu           |
| **Verify/Approve**     | Click action        | Row status badge crossfades to new color + text  | 300ms crossfade | Toast confirmation              |
| **Reject/Remove**      | Confirm in modal    | Row fades to muted, status updates               | 300ms fade      | Toast with undo option (5s)     |
| **Receipt zoom**       | Click receipt image | Image scales from thumbnail to full overlay      | 300ms ease-out  | Dark overlay, pinch/scroll zoom |
| **Quick action badge** | Count changes       | Badge pulses (scale bounce)                      | 300ms spring    | Red badge draws attention       |

---

## 5. Responsive Breakpoints (Step 7)

> **Admin Panel is desktop-first.** Tablet support is secondary; mobile shows simplified views.

### Admin Dashboard

| Element       | Tablet (640–1023)            | Desktop (≥1024)     |
| ------------- | ---------------------------- | ------------------- |
| Sidebar       | Collapsed (icons only, 64px) | Expanded (220px)    |
| Stat cards    | 2×2 grid                     | 4-column row        |
| Charts        | Stacked (1 column)           | 2-column grid       |
| Quick actions | Stacked                      | 2-column row        |
| Activity feed | Below charts                 | Below quick actions |

### Data Tables (Users, Listings, Payments)

| Element          | Mobile (<640)          | Tablet (640–1023)          | Desktop (≥1024)       |
| ---------------- | ---------------------- | -------------------------- | --------------------- |
| Table            | Card list (stacked)    | Horizontal scroll table    | Full table, no scroll |
| Columns shown    | Name + Status + Action | Name + Key fields + Action | All columns           |
| Bulk select      | Hidden                 | Available                  | Available             |
| Search + Filters | Stacked, collapsible   | Inline row                 | Inline row            |
| Pagination       | "Load more"            | Compact pagination         | Full pagination       |
| Row actions      | Inline buttons         | Dropdown ⋮                 | Dropdown ⋮            |

### Dispute Detail

| Element         | Mobile (<640) | Tablet (640–1023) | Desktop (≥1024) |
| --------------- | ------------- | ----------------- | --------------- |
| Parties         | Stacked       | Side by side      | Side by side    |
| Related docs    | Accordion     | Tabs              | Tabs            |
| Evidence photos | 2-column      | 3-column          | 3-column        |
| Resolution form | Full-width    | max-w-lg          | max-w-lg        |

---

## 6. Accessibility Requirements (Step 8)

### Data Tables

| Element          | Requirement                                                                    |
| ---------------- | ------------------------------------------------------------------------------ |
| Table            | `role="table"`, `aria-label="User management"` etc.                            |
| Sortable headers | `aria-sort="ascending"` / `"descending"` / `"none"`                            |
| Row checkbox     | `aria-label="Select [user name]"`                                              |
| Select all       | `aria-label="Select all users"`, indeterminate state                           |
| Actions dropdown | `aria-label="Actions for [user name]"`, keyboard navigable (↑↓, Enter, Escape) |
| Pagination       | `nav` with `aria-label="Table pagination"`, `aria-current="page"`              |
| Status badges    | Text always present (not color-only)                                           |
| Row count        | `aria-live="polite"` announces on filter/page change                           |
| Mobile card view | Cards are `role="article"`, contain same data as table row                     |

### Admin Dashboard

| Element       | Requirement                                                                           |
| ------------- | ------------------------------------------------------------------------------------- |
| Stat cards    | `role="group"` with `aria-label`, each card: `aria-label="1,247 total users, up 12%"` |
| Charts        | `role="img"`, `aria-label` with data summary; data table alternative available        |
| Activity feed | `role="feed"`, `aria-label="Recent activity"`                                         |
| Quick actions | Each `<a>`, `aria-label="8 pending payment verifications"`                            |

### Dispute Resolution

| Element           | Requirement                                                                 |
| ----------------- | --------------------------------------------------------------------------- |
| Evidence images   | `alt` text, lightbox with `role="dialog"` and focus trap                    |
| Related docs tabs | `role="tablist"` + `role="tabpanel"`, keyboard navigable                    |
| Resolution form   | `role="form"`, required fields marked, `role="alertdialog"` on confirmation |
| Decision select   | `aria-label="Resolution decision"`, `aria-required`                         |

### Modals (Reason / Confirmation)

| Element             | Requirement                                                   |
| ------------------- | ------------------------------------------------------------- |
| Modal               | `role="dialog"` or `role="alertdialog"`, focus trapped        |
| Escape              | Closes modal, returns focus to trigger element                |
| Reason textarea     | `aria-label`, `aria-required`                                 |
| Destructive confirm | Clear warning text, requires explicit action (not just Enter) |

### Keyboard Navigation

| Screen     | Tab Order                                                                                                              |
| ---------- | ---------------------------------------------------------------------------------------------------------------------- |
| Dashboard  | Sidebar nav → Stat cards → Charts (skip, non-interactive) → Quick actions → Activity items                             |
| Data Table | Sidebar → Search → Filters → Select-all → Header cells (Enter to sort) → Row checkboxes + cells → Actions → Pagination |
| Dispute    | Back link → Status → Dispute info → Parties → Tabs (←→) → Tab content → Form fields → Submit                           |

---

## 7. Design Token Mapping

| Visual Element      | Token                                                    | Notes                    |
| ------------------- | -------------------------------------------------------- | ------------------------ |
| Admin sidebar bg    | `bg-surface` (light) / `bg-[#111827]` (dark)             | Darker than user sidebar |
| Sidebar active item | `bg-primary/10 text-primary font-medium`                 | Green tint               |
| Sidebar badge       | `bg-red-500 text-white text-xs`                          | Alert red                |
| Stat card           | `bg-surface shadow-card rounded-xl`                      | White card               |
| Stat number         | `text-text-primary font-bold text-3xl`                   | Large bold               |
| Trend ↑             | `text-status-success`                                    | Green                    |
| Trend ↓             | `text-red-500`                                           | Red                      |
| Table header        | `bg-surface-muted text-text-secondary text-xs uppercase` | Gray header row          |
| Table row hover     | `bg-surface-muted/50`                                    | Subtle highlight         |
| Table row selected  | `bg-primary/5`                                           | Green tint               |
| Status: Active      | `bg-status-success/10 text-status-success`               | Green badge              |
| Status: Suspended   | `bg-amber-100 text-amber-700`                            | Amber                    |
| Status: Banned      | `bg-red-100 text-red-700`                                | Red                      |
| Verify button       | `bg-status-success text-white`                           | Green                    |
| Reject button       | `bg-red-600 text-white`                                  | Red                      |
| Receipt viewer bg   | `bg-black/80`                                            | Dark overlay             |
| Activity dot        | Per type: `bg-primary`, `bg-accent`, `bg-red-500`        | Color-coded              |
| Resolution form     | `bg-surface shadow-card rounded-xl p-6`                  | Elevated card            |
