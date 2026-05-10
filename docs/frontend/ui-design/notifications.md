# Notifications — UI Design

> **SOP:** SOP-302 · **Input Mode:** Detailed (v0 prototype)
> **User Stories:** US-090 (receive notifications), US-091 (notification preferences)
> **Reference Screens:** `15-notifications.png`, `16-notifications-filter.png`
> **Reference Patterns:** §3.6 Notification Item, §3.12 Filter Chips
> **Updated:** 2026-05-08

---

## 1. User Flows (Step 3)

### Flow 1: View Notifications

```
[Any Page — Header Bell Icon (🔔 with badge)]
    → Click bell → Navigate to [Notifications Page]
        → All notifications listed, newest first
        → Unread items: bold title + blue dot indicator
        → Types:
            ├── Match: "New match: [listing name] (92%)"
            ├── Message: "[Name] sent you a message"
            ├── Transaction: "Payment verified for #TXN-2847"
            ├── Inspection: "Inspection report submitted"
            ├── Review: "[Name] left a 5-star review"
            └── System: "Welcome to Tabadul!" / "Profile updated"
        → Click notification → Navigate to relevant page + mark read
        → "Mark all as read" action
```

### Flow 2: Filter Notifications

```
[Notifications Page]
    → Filter chips: [All] [Matches] [Messages] [Transactions] [System]
    → Click chip → List filters to that category
    → Active chip highlighted (filled), others outlined
    → Result count updates
    → Filters persisted in URL query params
```

### Flow 3: Notification Preferences (US-091)

```
[Profile → Notification Preferences]
    → [Notification Settings Page]
        → Categories with toggle switches:
            ├── Matches: Push ✓, Email ✓
            ├── Messages: Push ✓, Email ✗
            ├── Transactions: Push ✓, Email ✓
            ├── Inspections: Push ✓, Email ✗
            ├── Reviews: Push ✓, Email ✗
            └── System: Push ✓ (locked), Email ✓
        → Toggle a switch → Immediate save (optimistic)
        → Toast: "Preferences updated"
```

### Flow 4: Real-Time Notification Arrival

```
[Any Page — user is browsing]
    → New event triggers notification
        → Bell badge count increments (bounce animation)
        → If browser notifications enabled:
            → System notification: "[Title] — [preview text]"
            → Click system notification → Focus tab + navigate to source
        → If on Notifications page:
            → New item slides in at top of list with highlight
```

### Flow 5: Empty & Caught-Up States

```
[Notifications Page — no notifications]
    → Empty state:
        → Icon (🔔), "No notifications yet"
        → "You'll see updates about matches, messages, and transactions here."

[Notifications Page — all read]
    → All items normal weight (no bold/dot)
    → Subtle "You're all caught up! ✨" banner at top (dismissible)
```

---

## 2. Text-Based Wireframes (Step 4)

### 2.1 Notifications Page

**Desktop (≥1024px) — matches v0 `15-notifications.png`:**

```
┌─────────────────────────────────────────────────────────────────────┐
│ [Sidebar]  │  Notifications                    [Mark all as read] │
│            │─────────────────────────────────────────────────────────│
│            │                                                        │
│            │  [All] [Matches] [Messages] [Transactions] [System]   │
│            │                                                        │
│            │  Today                                                 │
│            │  ┌─────────────────────────────────────────────────┐  │
│            │  │ 🔵 🎯  New match: Industrial Copper Wire       │  │
│            │  │       92% match score · Cairo Steel Works       │  │
│            │  │       2 hours ago                               │  │
│            │  ├─────────────────────────────────────────────────┤  │
│            │  │ 🔵 💬  Ahmed Hassan sent you a message         │  │
│            │  │       "Sure, I can offer a bulk discount..."    │  │
│            │  │       3 hours ago                               │  │
│            │  ├─────────────────────────────────────────────────┤  │
│            │  │    💰  Payment verified for #TXN-2847          │  │
│            │  │       Industrial Copper Cable · EGP 12,500     │  │
│            │  │       5 hours ago                               │  │
│            │  └─────────────────────────────────────────────────┘  │
│            │                                                        │
│            │  Yesterday                                             │
│            │  ┌─────────────────────────────────────────────────┐  │
│            │  │    📦  Delivery confirmed for #TXN-2831        │  │
│            │  │       Steel Scrap Bundle                       │  │
│            │  │       Yesterday at 4:30 PM                     │  │
│            │  ├─────────────────────────────────────────────────┤  │
│            │  │    ⭐  Nile Steel left a 5-star review         │  │
│            │  │       "Great quality copper, fast delivery."    │  │
│            │  │       Yesterday at 2:15 PM                     │  │
│            │  └─────────────────────────────────────────────────┘  │
│            │                                                        │
│            │  Earlier                                               │
│            │  ┌─────────────────────────────────────────────────┐  │
│            │  │    🔔  Welcome to Tabadul!                     │  │
│            │  │       Complete your profile to get started.     │  │
│            │  │       Mar 15                                   │  │
│            │  └─────────────────────────────────────────────────┘  │
│            │                                                        │
│            │  [Load more...]                                       │
└─────────────────────────────────────────────────────────────────────┘
```

**Mobile (<640px):**

```
┌──────────────────────────┐
│ ☰  Notifications      ⋮ │
├──────────────────────────┤
│[All][Match][Msg][Txn][Sys│ ← Horizontal scroll
├──────────────────────────┤
│ Today                    │
│ ┌──────────────────────┐ │
│ │🔵🎯 New match:      │ │
│ │  Copper Wire (92%)   │ │
│ │  Cairo Steel · 2h    │ │
│ ├──────────────────────┤ │
│ │🔵💬 Ahmed Hassan     │ │
│ │  "Sure, I can off..."│ │
│ │  3h ago              │ │
│ ├──────────────────────┤ │
│ │  💰 Payment verified │ │
│ │  #TXN-2847 EGP12.5k │ │
│ │  5h ago              │ │
│ └──────────────────────┘ │
│                          │
│ Yesterday                │
│ ┌──────────────────────┐ │
│ │  📦 Delivery confirm.│ │
│ │  Steel Scrap Bundle  │ │
│ │  Yesterday 4:30 PM   │ │
│ ├──────────────────────┤ │
│ │  ⭐ 5-star review    │ │
│ │  from Nile Steel     │ │
│ │  Yesterday 2:15 PM   │ │
│ └──────────────────────┘ │
│                          │
│ [Load more...]           │
└──────────────────────────┘
```

### 2.2 Filtered View (Matches Only)

**Desktop — matches v0 `16-notifications-filter.png`:**

```
┌─────────────────────────────────────────────────────────────────────┐
│ [Sidebar]  │  Notifications                    [Mark all as read] │
│            │─────────────────────────────────────────────────────────│
│            │                                                        │
│            │  [All] [Matches ◄] [Messages] [Transactions] [System] │
│            │  ↑ filled/active                                       │
│            │                                                        │
│            │  Showing 4 match notifications                        │
│            │                                                        │
│            │  ┌─────────────────────────────────────────────────┐  │
│            │  │ 🔵 🎯  New match: Industrial Copper Wire       │  │
│            │  │       92% match score · Cairo Steel Works       │  │
│            │  │       2 hours ago                               │  │
│            │  ├─────────────────────────────────────────────────┤  │
│            │  │    🎯  New match: Steel Scrap Grade A          │  │
│            │  │       87% match score · Nile Steel              │  │
│            │  │       Yesterday                                │  │
│            │  ├─────────────────────────────────────────────────┤  │
│            │  │    🎯  New match: Plastic Pellets HD           │  │
│            │  │       85% match score · Delta Recycling         │  │
│            │  │       Mar 26                                   │  │
│            │  └─────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

### 2.3 Notification Preferences Page

**Desktop (≥1024px):**

```
┌─────────────────────────────────────────────────────────────────────┐
│ [Sidebar]  │  ← Back to Settings                                  │
│            │                                                        │
│            │  Notification Preferences                              │
│            │  Choose how you want to be notified.                   │
│            │                                                        │
│            │  ┌─────────────────────────────────────────────────┐  │
│            │  │                         Push        Email       │  │
│            │  │                                                 │  │
│            │  │ 🎯 Matches              [●━━]       [━━●]      │  │
│            │  │    New AI match          On          On         │  │
│            │  │    recommendations                              │  │
│            │  ├─────────────────────────────────────────────────┤  │
│            │  │ 💬 Messages             [●━━]       [━●━]      │  │
│            │  │    New chat messages     On          Off        │  │
│            │  ├─────────────────────────────────────────────────┤  │
│            │  │ 💰 Transactions         [●━━]       [●━━]      │  │
│            │  │    Status updates,       On          On         │  │
│            │  │    payment verifications                        │  │
│            │  ├─────────────────────────────────────────────────┤  │
│            │  │ 🔍 Inspections          [●━━]       [━●━]      │  │
│            │  │    Report submissions    On          Off        │  │
│            │  ├─────────────────────────────────────────────────┤  │
│            │  │ ⭐ Reviews              [●━━]       [━●━]      │  │
│            │  │    New ratings and       On          Off        │  │
│            │  │    reviews received                             │  │
│            │  ├─────────────────────────────────────────────────┤  │
│            │  │ 🔔 System               [●━━] 🔒    [●━━]      │  │
│            │  │    Platform updates,     On (locked)  On        │  │
│            │  │    security alerts                              │  │
│            │  └─────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

**Mobile (<640px):**

```
┌──────────────────────────┐
│ ← Notification Prefs.  ⋮ │
├──────────────────────────┤
│ Choose how you want to   │
│ be notified.             │
│                          │
│ ┌──────────────────────┐ │
│ │🎯 Matches            │ │
│ │  Push  [●━━] On      │ │
│ │  Email [━━●] On      │ │
│ ├──────────────────────┤ │
│ │💬 Messages           │ │
│ │  Push  [●━━] On      │ │
│ │  Email [━●━] Off     │ │
│ ├──────────────────────┤ │
│ │💰 Transactions       │ │
│ │  Push  [●━━] On      │ │
│ │  Email [●━━] On      │ │
│ ├──────────────────────┤ │
│ │🔍 Inspections        │ │
│ │  Push  [●━━] On      │ │
│ │  Email [━●━] Off     │ │
│ ├──────────────────────┤ │
│ │⭐ Reviews            │ │
│ │  Push  [●━━] On      │ │
│ │  Email [━●━] Off     │ │
│ ├──────────────────────┤ │
│ │🔔 System             │ │
│ │  Push  [●━━] 🔒      │ │
│ │  Email [●━━] On      │ │
│ └──────────────────────┘ │
└──────────────────────────┘
```

### 2.4 Empty & Caught-Up States

```
Empty State:
┌───────────────────────────────────────────────────┐
│                                                   │
│                    🔔                             │
│                                                   │
│          No notifications yet                     │
│                                                   │
│    You'll see updates about matches,              │
│    messages, and transactions here.               │
│                                                   │
└───────────────────────────────────────────────────┘

Caught-Up Banner (dismissible, top of list):
┌───────────────────────────────────────────────────┐
│ ✨ You're all caught up!                     [×] │
└───────────────────────────────────────────────────┘
```

---

## 3. Component Hierarchy (Step 5)

### Notifications Page

```
NotificationsPage (Server Component — initial fetch)
├── Container
├── PageHeader
│   ├── Title ("Notifications")
│   └── MarkAllReadButton (Client)
│       └── Button ("Mark all as read", variant="ghost")
├── FilterBar (Client)
│   └── FilterChip ×5 (All | Matches | Messages | Transactions | System)
│       ├── Active: bg-primary text-primary-foreground
│       └── Inactive: bg-surface border text-text-secondary
├── CaughtUpBanner (Client — conditional, dismissible)
│   ├── Sparkle icon + "You're all caught up!"
│   └── DismissButton (×)
├── NotificationList (Client — real-time updates)
│   ├── DateGroup ×N ("Today", "Yesterday", "Mar 26")
│   │   ├── DateLabel (sticky, muted text)
│   │   └── NotificationItem ×N
│   │       ├── UnreadDot (blue, conditional)
│   │       ├── TypeIcon (🎯💬💰📦⭐🔔)
│   │       ├── Content
│   │       │   ├── Title (bold if unread, normal if read)
│   │       │   ├── Preview (secondary text, 1–2 lines, truncated)
│   │       │   └── Timestamp (relative: "2h ago", "Yesterday 4:30 PM")
│   │       └── HoverAction (optional: dismiss ×, desktop only)
│   └── LoadMoreButton
└── EmptyState (conditional)
    ├── Icon (🔔)
    ├── Title + Description
```

### Notification Preferences Page

```
NotificationPrefsPage (Client Component)
├── Container (max-w-2xl)
├── BackLink ("← Back to Settings")
├── PageTitle ("Notification Preferences")
├── Description
├── PreferencesCard
│   └── PreferenceRow ×6
│       ├── RowIcon (emoji in muted circle)
│       ├── RowInfo
│       │   ├── CategoryName (semibold)
│       │   └── Description (muted, small)
│       └── Toggles
│           ├── ToggleSwitch (Push — with lock icon if required)
│           └── ToggleSwitch (Email)
```

### Sub-Components

```
NotificationItem
├── Container (<a> or <button>, hover: bg-surface-muted)
├── LeftSection
│   ├── UnreadDot (6px blue circle, absolute positioned)
│   └── TypeIcon (in colored circle matching category)
├── Content (flex-1)
│   ├── Title (font-medium if unread, font-normal if read)
│   ├── Preview (text-text-secondary, text-sm, line-clamp-2)
│   └── Timestamp (text-text-muted, text-xs)
└── RightSection (desktop only)
    └── DismissButton (×, visible on hover)

FilterChip
├── Button (pill shape, rounded-full)
├── Active: bg-primary text-primary-foreground font-medium
└── Inactive: bg-surface border-border text-text-secondary hover:bg-surface-muted

ToggleSwitch
├── Track (bg-text-muted → bg-primary when on)
├── Thumb (white circle, slides left↔right)
├── Props: checked, onChange, disabled, locked
└── Lock icon overlay (if locked/required)
```

---

## 4. Micro-Interactions (Step 6)

| Interaction                  | Trigger                        | Animation                                                 | Duration                        | Feedback                                 |
| ---------------------------- | ------------------------------ | --------------------------------------------------------- | ------------------------------- | ---------------------------------------- |
| **New notification arrive**  | Real-time event                | Item slides in from top, brief golden highlight           | 300ms slide + 1s highlight fade | Pushes existing items down               |
| **Mark as read (single)**    | Click/navigate to notification | Blue dot fades out, title weight normal→regular           | 200ms ease                      | Item stays in list                       |
| **Mark all as read**         | Click "Mark all as read"       | All blue dots fade out simultaneously, titles un-bold     | 300ms ease                      | Toast "All notifications marked as read" |
| **Filter chip switch**       | Click chip                     | Active chip fills (bg-primary slides in), list crossfades | 200ms chip + 150ms list         | Smooth category swap                     |
| **Notification hover**       | Mouse enter item               | Background subtly darkens, dismiss × appears (desktop)    | 200ms ease                      | Cursor pointer                           |
| **Dismiss notification**     | Click × on item                | Item slides right + fades out, list reflows               | 250ms ease-out                  | Item removed permanently                 |
| **Caught-up banner dismiss** | Click × on banner              | Banner collapses upward                                   | 200ms ease                      | Not shown again this session             |
| **Toggle switch**            | Click toggle                   | Thumb slides with spring physics, track color transitions | 300ms spring                    | Immediate save (optimistic)              |
| **Toggle locked**            | Click locked toggle            | Subtle shake animation, tooltip "This cannot be disabled" | 300ms shake                     | No state change                          |
| **Bell badge**               | New notification               | Badge bounces (scale 1→1.3→1), count increments           | 400ms spring                    | Red badge on bell icon                   |
| **Load more**                | Click button                   | Skeleton items appear, then real items fade in            | 200ms skeleton + 200ms fade     | Button text → "Loading..."               |

---

## 5. Responsive Breakpoints (Step 7)

### Notifications Page

| Element           | Mobile (<640)                           | Tablet (640–1023)                  | Desktop (≥1024)                                  |
| ----------------- | --------------------------------------- | ---------------------------------- | ------------------------------------------------ |
| Sidebar           | Hidden                                  | Hidden                             | Persistent (240px)                               |
| Page header       | Title + overflow menu (⋮ with mark-all) | Title + "Mark all" button          | Title + "Mark all" button                        |
| Filter chips      | Horizontal scroll, no labels            | Horizontal scroll                  | Inline row, all visible                          |
| Date group label  | Sticky, 12px text                       | Sticky, 14px                       | Sticky, 14px                                     |
| Notification item | Compact: icon + 2-line content          | Medium: icon + content + timestamp | Full: icon + content + timestamp + hover dismiss |
| Type icon         | 20px in 32px circle                     | 24px in 36px circle                | 24px in 40px circle                              |
| Dismiss action    | Swipe left to dismiss                   | Swipe left                         | Hover → show × button                            |
| Pagination        | "Load more" button                      | "Load more"                        | "Load more"                                      |
| Caught-up banner  | Full-width                              | Full-width                         | Full-width                                       |

### Notification Preferences

| Element       | Mobile (<640)                      | Tablet (640–1023)                   | Desktop (≥1024)                     |
| ------------- | ---------------------------------- | ----------------------------------- | ----------------------------------- |
| Layout        | Category stacked, toggles below    | Category left, toggles right in row | Category left, toggles right in row |
| Toggle labels | "Push" / "Email" above each toggle | Inline labels                       | Column headers at top               |
| Card width    | Full-width                         | Full-width                          | max-w-2xl centered                  |
| Description   | Hidden on row, visible on expand   | Visible, smaller                    | Visible                             |

---

## 6. Accessibility Requirements (Step 8)

### Notifications Page

| Element           | Requirement                                                                                                                                             |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Page              | `<main>`, `<h1>` = "Notifications"                                                                                                                      |
| Filter chips      | `role="tablist"`, each `role="tab"` + `aria-selected`, controls list region                                                                             |
| Notification list | `role="feed"`, `aria-label="Notifications"`                                                                                                             |
| Notification item | `role="article"`, `aria-label` combining: type + title + time + unread: "Unread match notification: New match Industrial Copper Wire, 92%, 2 hours ago" |
| Unread dot        | Decorative (`aria-hidden`); unread state conveyed in item's `aria-label`                                                                                |
| Type icon         | `aria-hidden="true"` (type in `aria-label`)                                                                                                             |
| Mark all read     | `aria-label="Mark all notifications as read"`                                                                                                           |
| Dismiss           | `aria-label="Dismiss notification: [title]"`                                                                                                            |
| Date group        | `role="separator"`, `aria-label="Today"` or date                                                                                                        |
| Empty state       | `role="status"`                                                                                                                                         |
| Caught-up banner  | `role="status"`, dismiss button `aria-label="Dismiss"`                                                                                                  |
| Load more         | `aria-label="Load more notifications"`                                                                                                                  |

### Notification Preferences

| Element       | Requirement                                                                   |
| ------------- | ----------------------------------------------------------------------------- |
| Form          | `role="form"`, `aria-label="Notification preferences"`                        |
| Category row  | `role="group"`, `aria-labelledby` pointing to category name                   |
| Toggle switch | `role="switch"`, `aria-checked`, `aria-label="[Category] push notifications"` |
| Locked toggle | `aria-disabled="true"`, `aria-label` includes "required, cannot be disabled"  |
| Save feedback | Changes auto-saved; `aria-live="polite"` region announces "Preferences saved" |

### Real-Time Updates

| Event            | Announcement                                                      |
| ---------------- | ----------------------------------------------------------------- |
| New notification | `aria-live="polite"` region: "New notification: [title]"          |
| Mark all read    | `aria-live="polite"`: "All notifications marked as read"          |
| Filter change    | `aria-live="polite"`: "Showing 4 match notifications"             |
| Toggle change    | `aria-live="polite"`: "Match push notifications enabled/disabled" |

### Keyboard Navigation

| Screen        | Tab Order                                                                                                    |
| ------------- | ------------------------------------------------------------------------------------------------------------ |
| Notifications | Skip link → Sidebar → "Mark all" → Filter chips (←→) → Notification items (↓, Enter to navigate) → Load more |
| Preferences   | Skip link → Back link → Toggle rows (Tab between rows, ←→ between Push/Email in row)                         |

### RTL Behavior

- Unread dot: right side of item (instead of left)
- Type icon: right side
- Timestamp: left side
- Dismiss × : left side (swipe right on mobile)
- Filter chips: maintain order but scroll from right
- Toggle switches: track direction reversed (on position = left)

---

## 7. Design Token Mapping

| Visual Element         | Token                                                          | Notes               |
| ---------------------- | -------------------------------------------------------------- | ------------------- |
| Page bg                | `bg-background`                                                | Warm cream          |
| Notification item      | `bg-surface hover:bg-surface-muted`                            | White, subtle hover |
| Unread dot             | `bg-blue-500`                                                  | Blue circle, 6px    |
| Unread title           | `text-text-primary font-medium`                                | Slightly bolder     |
| Read title             | `text-text-primary font-normal`                                | Normal weight       |
| Preview text           | `text-text-secondary text-sm`                                  | Gray, smaller       |
| Timestamp              | `text-text-muted text-xs`                                      | Light gray          |
| Type icon: Match       | `bg-accent/10 text-accent`                                     | Orange circle       |
| Type icon: Message     | `bg-primary/10 text-primary`                                   | Green circle        |
| Type icon: Transaction | `bg-amber-100 text-amber-700`                                  | Amber circle        |
| Type icon: Review      | `bg-yellow-100 text-yellow-700`                                | Yellow circle       |
| Type icon: System      | `bg-gray-100 text-gray-600`                                    | Gray circle         |
| Active filter chip     | `bg-primary text-primary-foreground`                           | Green filled pill   |
| Inactive filter chip   | `bg-surface border-border text-text-secondary`                 | Outlined pill       |
| Date group label       | `text-text-muted text-xs font-medium uppercase tracking-wider` | Sticky label        |
| Caught-up banner       | `bg-primary/5 border-primary/10 text-primary`                  | Subtle green        |
| Toggle track (on)      | `bg-primary`                                                   | Green               |
| Toggle track (off)     | `bg-text-muted`                                                | Gray                |
| Toggle thumb           | `bg-white shadow-sm`                                           | White circle        |
| Locked icon            | `text-text-muted`                                              | 🔒 on toggle        |
| Bell badge             | `bg-red-500 text-white text-xs`                                | Red circle          |
| New item highlight     | `bg-accent/5`                                                  | Brief golden tint   |
