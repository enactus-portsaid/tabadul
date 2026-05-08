# Chat & Communication — UI Design

> **SOP:** SOP-302 · **Input Mode:** Detailed (v0 prototype)
> **User Stories:** US-040 (messaging), US-041 (contact-info blocking), US-042 (moderation), US-043 (notifications)
> **Reference Screens:** `07-chat-threads.png`, `08-chat-detail.png`
> **Updated:** 2026-05-08

---

## 1. User Flows (Step 3)

### Flow 1: Buyer Initiates Chat from Listing (US-040)

```
[Listing Detail Page] → Click "Message Seller"
    → API: getOrCreateThread(listingId, buyerId, sellerId)
        ├── Thread exists → Navigate to [Chat Detail] with thread loaded
        └── Thread new → Create thread → Navigate to [Chat Detail] (empty)
    → [Chat Detail Page]
        → Type message → Click Send / Enter
            ├── Message appears instantly (optimistic UI)
            ├── Supabase Realtime delivers to seller
            └── Error → Message shows retry icon
```

### Flow 2: Browsing Chat Threads

```
[Sidebar] → Click "Messages"
    → [Messages Page]
        → Desktop: 2-panel layout (thread list left + chat detail right)
        → Mobile: thread list only
        → Search bar → Filter threads by name/listing
        → Click thread
            ├── Desktop: chat loads in right panel, thread highlighted
            └── Mobile: navigate to [Chat Detail Page]
        → Unread threads: bold name, unread count badge, sorted to top
```

### Flow 3: Real-Time Messaging

```
[Chat Detail — active conversation]
    → User types message → Click Send
        → Message appears in own bubble (right-aligned, green)
        → Sender sees: sent ✓ → delivered ✓✓
    → Other user's message arrives via Realtime
        → Message appears in their bubble (left-aligned, gray)
        → Thread list: last message + timestamp update
        → If not in chat: notification badge increments
    → Typing indicator
        → Other user starts typing → "..." animation in chat
        → Stops after 3s of inactivity
```

### Flow 4: Content Moderation (US-041/042)

```
[Chat Detail] → User types message containing phone/email/social handle
    → Click Send
        → Client-side check (regex pre-filter)
            ├── Blocked → Message NOT sent
            │   → Inline warning: "Contact information cannot be shared"
            │   → Message stays in input (user can edit)
            └── Passed → Sent to server
                → Server-side check (Phase 4 — Edge Function)
                    ├── Blocked → Message hidden, warning shown
                    └── Passed → Delivered normally

[Chat Detail] → Profanity/spam detected (Phase 4)
    → Message blocked → Warning: "Message blocked for policy violation"
    → Repeated violations → Banner: "Your account is under review"
```

### Flow 5: Chat Notifications (US-043)

```
[Any Page — user not in chat]
    → New message arrives via Realtime
        → Sidebar "Messages" nav item: badge count increments
        → If on Messages page (desktop): thread list updates in real-time
        → Browser notification (if permitted): "New message from [name]"

[Chat Detail — reading messages]
    → Messages auto-marked as read
    → Unread count decreases
    → Thread item badge clears
```

---

## 2. Text-Based Wireframes (Step 4)

### 2.1 Messages Page — Desktop 2-Panel Layout

**Desktop (≥1024px):**

```
┌─────────────────────────────────────────────────────────────────────┐
│ [Sidebar]  │  Thread List          │  Chat Detail                  │
│            │───────────────────────│────────────────────────────────│
│ Dashboard  │  [🔍 Search messages] │  ┌────────────────────────┐   │
│ Marketplace│                       │  │ [AH] Ahmed Hassan      │   │
│ Messages◄ │  ┌───────────────────┐ │  │ Re: Industrial Copper  │   │
│ Saved      │  │[AH]Ahmed Hassan  │ │  │ 🟢 Online              │   │
│ Transactions│ │ Copper Cable     │ │  └────────────────────────┘   │
│ Profile    │  │ "Sure, I can..." │ │  ─────────────────────────────│
│            │  │ 2:30 PM     (2) │ │                               │
│            │  ├───────────────────┤ │  ┌──────────────────┐        │
│            │  │[NS]Nile Steel  🟢│ │  │ Is this still     │ 2:15  │
│            │  │ Steel Scrap      │ │  │ available?        │        │
│            │  │ "What quantity..."│ │  └──────────────────┘        │
│            │  │ 1:45 PM          │ │                               │
│            │  ├───────────────────┤ │       ┌──────────────────┐   │
│            │  │[DM]Delta Metals  │ │       │ Yes, we have 50  │   │
│            │  │ Plastic Pellets  │ │       │ tons available.  │   │
│            │  │ "Thanks for..."  │ │       │ 2:20 PM     ✓✓  │   │
│            │  │ Yesterday        │ │       └──────────────────┘   │
│            │  └───────────────────┘ │                               │
│            │                       │  ┌──────────────────┐        │
│            │                       │  │ Sure, I can offer │ 2:28  │
│            │                       │  │ a bulk discount.  │        │
│            │                       │  └──────────────────┘        │
│            │                       │                               │
│            │                       │       ┌──────────────────┐   │
│            │                       │       │ That sounds great│   │
│            │                       │       │ Let me check the │   │
│            │                       │       │ specs.  2:30  ✓  │   │
│            │                       │       └──────────────────┘   │
│            │                       │                               │
│            │                       │  Ahmed is typing...           │
│            │                       │  ─────────────────────────────│
│            │                       │  [📎] [Type a message...] [→]│
└─────────────────────────────────────────────────────────────────────┘
```

### 2.2 Messages Page — Mobile Thread List

**Mobile (<640px):**

```
┌──────────────────────────┐
│ ☰  Messages           🔔│
├──────────────────────────┤
│ [🔍 Search messages...  ]│
├──────────────────────────┤
│                          │
│ ┌──────────────────────┐ │
│ │[AH] Ahmed Hassan   🟢│ │
│ │ Re: Copper Cable     │ │
│ │ "Sure, I can..."     │ │
│ │ 2:30 PM         (2) │ │
│ ├──────────────────────┤ │
│ │[NS] Nile Steel    🟢│ │
│ │ Re: Steel Scrap      │ │
│ │ "What quantity..."   │ │
│ │ 1:45 PM              │ │
│ ├──────────────────────┤ │
│ │[DM] Delta Metals     │ │
│ │ Re: Plastic Pellets  │ │
│ │ "Thanks for the..."  │ │
│ │ Yesterday            │ │
│ ├──────────────────────┤ │
│ │[CS] Cairo Supplies   │ │
│ │ Re: Aluminum Sheets  │ │
│ │ "Can you deliver..." │ │
│ │ Mar 25               │ │
│ └──────────────────────┘ │
│                          │
│ (empty state if no       │
│  threads: illustration + │
│  "No conversations yet") │
└──────────────────────────┘
```

### 2.3 Chat Detail — Mobile

**Mobile (<640px):**

```
┌──────────────────────────┐
│ ← Ahmed Hassan        ⋮ │
│    Re: Copper Cable  🟢  │
├──────────────────────────┤
│                          │
│  ┌────────────────┐      │
│  │ Is this still  │ 2:15 │
│  │ available?     │      │
│  └────────────────┘      │
│                          │
│      ┌────────────────┐  │
│      │ Yes, we have   │  │
│      │ 50 tons avail. │  │
│      │ 2:20 PM    ✓✓  │  │
│      └────────────────┘  │
│                          │
│  ┌────────────────┐      │
│  │ Sure, I can    │ 2:28 │
│  │ offer a bulk   │      │
│  │ discount.      │      │
│  └────────────────┘      │
│                          │
│      ┌────────────────┐  │
│      │ That sounds    │  │
│      │ great! Let me  │  │
│      │ check specs.   │  │
│      │ 2:30 PM    ✓   │  │
│      └────────────────┘  │
│                          │
│  Ahmed is typing...      │
├──────────────────────────┤
│ [📎] [Type a message] [→]│
└──────────────────────────┘
```

### 2.4 Content Moderation Warning (Inline)

```
┌──────────────────────────┐
│                          │
│  (normal messages above) │
│                          │
├──────────────────────────┤
│ ⚠️ Contact information   │
│ cannot be shared on      │
│ the platform.            │
│ [Edit message]           │
├──────────────────────────┤
│ [📎] [My number is 01..] [→]│
│       ↑ blocked content  │
└──────────────────────────┘
```

### 2.5 Empty State — No Conversations

```
┌──────────────────────────┐
│                          │
│         💬               │
│                          │
│   No conversations yet   │
│                          │
│   Start by messaging a   │
│   seller on a listing    │
│   you're interested in.  │
│                          │
│   [Browse Marketplace]   │
│                          │
└──────────────────────────┘
```

---

## 3. Component Hierarchy (Step 5)

### Messages Page (Desktop — 2-Panel)

```
MessagesPage (Server Component — initial thread fetch)
├── Container (full-height, no vertical scroll on outer)
├── ChatLayout (Client — 2-panel flex)
│   ├── ThreadListPanel (flex: 0 0 360px on desktop)
│   │   ├── SearchInput ("Search messages...")
│   │   ├── ThreadList (scrollable)
│   │   │   └── ChatThreadItem ×N
│   │   │       ├── Avatar (initials, online indicator)
│   │   │       ├── ThreadInfo
│   │   │       │   ├── Name (bold if unread)
│   │   │       │   ├── ListingReference (muted, small)
│   │   │       │   └── LastMessage (preview, truncated)
│   │   │       ├── ThreadMeta
│   │   │       │   ├── Timestamp (relative)
│   │   │       │   └── UnreadBadge (orange circle + count)
│   │   │       └── OnlineIndicator (green dot on avatar)
│   │   └── EmptyState (if no threads)
│   │       ├── Icon (💬)
│   │       ├── Title + Description
│   │       └── Button ("Browse Marketplace")
│   └── ChatDetailPanel (flex: 1, hidden on mobile)
│       ├── ChatHeader
│       │   ├── Avatar + Name + OnlineStatus
│       │   ├── ListingReference (linked)
│       │   └── OptionsMenu (⋮)
│       ├── MessageList (scrollable, flex: 1)
│       │   ├── DateDivider ("Today", "Yesterday", "Mar 25")
│       │   └── ChatMessage ×N
│       │       ├── MessageBubble
│       │       │   ├── Text content
│       │       │   ├── Timestamp (small, muted)
│       │       │   └── StatusIcon (✓ sent, ✓✓ delivered)
│       │       └── Position (left = received, right = sent)
│       ├── TypingIndicator ("Ahmed is typing...")
│       ├── ModerationWarning (conditional)
│       │   ├── Icon (⚠️) + Warning text
│       │   └── Link ("Edit message")
│       └── ChatInput
│           ├── AttachButton (📎)
│           ├── TextInput (auto-expanding textarea)
│           └── SendButton (→, disabled when empty)
```

### Chat Detail Page (Mobile — Separate Route)

```
ChatDetailPage (Client Component)
├── ChatHeader (sticky top)
│   ├── BackButton (←)
│   ├── Avatar + Name
│   ├── OnlineStatus + ListingName
│   └── OptionsButton (⋮)
├── MessageList (same as desktop panel)
│   ├── DateDivider ×N
│   └── ChatMessage ×N
├── TypingIndicator
├── ModerationWarning (conditional)
└── ChatInput (sticky bottom)
    ├── AttachButton
    ├── TextInput
    └── SendButton
```

### Sub-Components

```
ChatMessage
├── BubbleWrapper (flex-start for received, flex-end for sent)
│   ├── Avatar (received only, small)
│   └── Bubble
│       ├── bg-surface (received) | bg-primary text-white (sent)
│       ├── Text content
│       ├── Timestamp (bottom-right, small muted)
│       └── StatusIndicator (sent only: ✓/✓✓)

ChatThreadItem
├── Container (hover: bg-surface-muted, active: bg-primary/5)
├── Avatar (with online dot)
├── Content (truncated)
└── Meta (timestamp + badge)

TypingIndicator
├── Avatar (small)
└── Dots animation (3 bouncing dots in gray bubble)

DateDivider
└── Centered line with date label ("Today")

ModerationWarning
├── Alert card (bg-yellow-50 border-yellow-200)
├── Icon (⚠️) + Text
└── Action link
```

---

## 4. Micro-Interactions (Step 6)

| Interaction            | Trigger                         | Animation                                                             | Duration                  | Feedback                                                             |
| ---------------------- | ------------------------------- | --------------------------------------------------------------------- | ------------------------- | -------------------------------------------------------------------- |
| **Message send**       | Click Send / Enter              | Bubble slides up from input area + fades in                           | 200ms ease-out            | Input clears, scroll to bottom                                       |
| **Message receive**    | Realtime event                  | Bubble slides in from left + subtle scale                             | 250ms ease-out            | Scroll to bottom if near bottom; otherwise show "New message ↓" pill |
| **Typing indicator**   | Other user typing               | 3 dots bounce sequentially (0ms, 150ms, 300ms offset)                 | 1.2s loop                 | Appears/disappears with 200ms fade                                   |
| **Thread select**      | Click thread item               | Desktop: active thread bg highlight slides in; right panel crossfades | 200ms ease                | Thread item stays highlighted                                        |
| **Unread badge**       | New message                     | Badge scales 1→1.2→1 bounce                                           | 300ms spring              | Count increments                                                     |
| **Mark as read**       | Open thread / scroll to message | Badge fades out, thread name un-bolds                                 | 200ms ease                | Sidebar count decrements                                             |
| **Search filter**      | Typing in search                | Thread list filters with fade transition                              | 150ms per item            | "No results" if empty                                                |
| **Send button enable** | First character typed           | Button color transitions from muted → primary                         | 200ms ease                | `aria-disabled` toggles                                              |
| **Moderation warning** | Blocked message                 | Warning slides down below input, shake on input                       | 300ms slide + 200ms shake | Message stays in input for editing                                   |
| **Online status**      | User connects/disconnects       | Green dot fades in/out                                                | 300ms ease                | Status text updates                                                  |
| **New message pill**   | Receive msg while scrolled up   | Pill slides in from bottom center                                     | 200ms ease                | Click → scroll to bottom                                             |

---

## 5. Responsive Breakpoints (Step 7)

### Messages Page Layout

| Element            | Mobile (<640)                         | Tablet (640–1023)            | Desktop (≥1024)                          |
| ------------------ | ------------------------------------- | ---------------------------- | ---------------------------------------- |
| Layout             | Thread list only (full page)          | Thread list only (full page) | 2-panel: threads (360px) + chat (flex-1) |
| Chat detail        | Separate route `/messages/[threadId]` | Separate route               | Inline panel (no navigation)             |
| Thread panel width | 100%                                  | 100%                         | 360px fixed                              |
| Chat panel         | Hidden                                | Hidden                       | Visible, flex-1                          |
| Divider            | None                                  | None                         | 1px vertical border                      |

### Thread List

| Element              | Mobile (<640)          | Tablet (640–1023)      | Desktop (≥1024)          |
| -------------------- | ---------------------- | ---------------------- | ------------------------ |
| Search bar           | Full-width, sticky top | Full-width, sticky top | Full-width within panel  |
| Thread item height   | ~80px                  | ~80px                  | ~72px (slightly compact) |
| Avatar size          | 48px                   | 48px                   | 40px                     |
| Last message preview | 1 line, truncated      | 1 line                 | 1 line                   |
| Timestamp            | Relative ("2:30 PM")   | Relative               | Relative                 |

### Chat Detail

| Element           | Mobile (<640)             | Tablet (640–1023)      | Desktop (≥1024)                  |
| ----------------- | ------------------------- | ---------------------- | -------------------------------- |
| Header            | Sticky top, back arrow    | Sticky top, back arrow | Sticky top within panel, no back |
| Message bubbles   | max-width: 80%            | max-width: 75%         | max-width: 65%                   |
| Input bar         | Sticky bottom, full-width | Sticky bottom          | Sticky bottom within panel       |
| Attach button     | Icon only                 | Icon only              | Icon + "Attach" label            |
| Sent bubble color | `bg-primary`              | `bg-primary`           | `bg-primary`                     |
| Received bubble   | `bg-surface` border       | `bg-surface` border    | `bg-surface-muted`               |

### Empty State

| Element    | Mobile (<640)    | Tablet (640–1023) | Desktop (≥1024)         |
| ---------- | ---------------- | ----------------- | ----------------------- |
| Position   | Centered in page | Centered          | Centered in right panel |
| Icon size  | 48px             | 64px              | 64px                    |
| CTA button | Full-width       | Auto-width        | Auto-width              |

---

## 6. Accessibility Requirements (Step 8)

### Thread List

| Element          | Requirement                                                                         |
| ---------------- | ----------------------------------------------------------------------------------- |
| Search           | `role="search"`, `aria-label="Search conversations"`                                |
| Thread list      | `role="listbox"`, `aria-label="Conversations"`                                      |
| Thread item      | `role="option"`, `aria-selected` on active thread (desktop)                         |
| Unread thread    | `aria-label` includes unread count: "Ahmed Hassan, Copper Cable, 2 unread messages" |
| Online indicator | `aria-label` on avatar: "Ahmed Hassan, online" or "offline"                         |
| Empty state      | `role="status"`, CTA button focusable                                               |

### Chat Detail

| Element              | Requirement                                                                                         |
| -------------------- | --------------------------------------------------------------------------------------------------- |
| Message list         | `role="log"`, `aria-live="polite"`, `aria-label="Conversation with Ahmed Hassan"`                   |
| Individual message   | `aria-label` combining sender + content + time: "Ahmed, 2:28 PM: Sure, I can offer a bulk discount" |
| Sent status          | Screen reader: "Sent" (✓) or "Delivered" (✓✓) via `aria-label` on icon                              |
| Date divider         | `role="separator"`, `aria-label="Today"`                                                            |
| Typing indicator     | `role="status"`, `aria-live="polite"`, `aria-label="Ahmed is typing"`                               |
| Chat input           | `aria-label="Type a message"`, Enter to send, Shift+Enter for newline                               |
| Send button          | `aria-label="Send message"`, `aria-disabled` when input empty                                       |
| Attach button        | `aria-label="Attach file"`                                                                          |
| Back button (mobile) | `aria-label="Back to conversations"`                                                                |

### Moderation Warning

| Element      | Requirement                                                                  |
| ------------ | ---------------------------------------------------------------------------- |
| Warning card | `role="alert"`, auto-announced by screen reader                              |
| Warning text | Clear, non-technical: "Contact information cannot be shared on the platform" |
| Edit action  | Focusable link, `aria-label="Edit your message"`                             |

### Keyboard Navigation

| Screen               | Tab Order                                                                                                 |
| -------------------- | --------------------------------------------------------------------------------------------------------- |
| Thread List (mobile) | Skip link → Sidebar → Search → Thread items (↑↓ arrow keys within listbox)                                |
| Messages (desktop)   | Skip link → Sidebar → Search → Thread items (↑↓) → Chat header → Message list (scrollable) → Input → Send |
| Chat Detail (mobile) | Back button → Header info → Message list (scroll) → Attach → Input → Send                                 |

### Screen Reader Announcements

| Event                | Announcement                                                              |
| -------------------- | ------------------------------------------------------------------------- |
| New message received | "[Name] says: [message preview]" via `aria-live`                          |
| Message sent         | "Message sent" (status indicator)                                         |
| Thread opened        | "Conversation with [Name] about [Listing], [N] messages"                  |
| Moderation block     | "Warning: your message was blocked. Contact information cannot be shared" |
| Typing started       | "[Name] is typing" (debounced, not spammy)                                |

### RTL Behavior

- Sent messages: aligned to left (instead of right in LTR)
- Received messages: aligned to right (instead of left in LTR)
- Input bar: send button on left, attach on right
- Thread list: avatar on right, meta on left
- Back arrow: flipped to right-pointing arrow (→)

---

## 7. Design Token Mapping

| Visual Element       | Token                                                              | Notes                    |
| -------------------- | ------------------------------------------------------------------ | ------------------------ |
| Thread list bg       | `bg-surface`                                                       | White panel              |
| Thread hover         | `bg-surface-muted`                                                 | Subtle cream             |
| Active thread        | `bg-primary/5 border-l-2 border-primary`                           | Green tint + left accent |
| Thread name (unread) | `text-text-primary font-semibold`                                  | Bold when unread         |
| Thread name (read)   | `text-text-primary font-normal`                                    | Regular weight           |
| Last message preview | `text-text-secondary text-sm truncate`                             | Gray, single line        |
| Timestamp            | `text-text-muted text-xs`                                          | Light gray               |
| Unread badge         | `bg-accent text-white text-xs rounded-full`                        | Orange circle            |
| Online dot           | `bg-status-success`                                                | Green dot `#22C55E`      |
| Sent bubble          | `bg-primary text-primary-foreground rounded-2xl`                   | Green bubble             |
| Received bubble      | `bg-surface-muted text-text-primary rounded-2xl`                   | Gray/cream bubble        |
| Bubble timestamp     | `text-primary-foreground/60` (sent) / `text-text-muted` (received) | Muted within bubble      |
| Status icon (✓✓)     | `text-primary-foreground/60` (sent bubble)                         | Inside sent bubble       |
| Chat input bg        | `bg-surface border rounded-full`                                   | White pill input         |
| Send button          | `bg-primary text-primary-foreground rounded-full`                  | Green circle             |
| Send disabled        | `bg-text-muted/20 text-text-muted`                                 | Grayed out               |
| Typing dots          | `bg-text-muted`                                                    | Gray animated dots       |
| Moderation warning   | `bg-amber-50 border-amber-200 text-amber-800`                      | Yellow alert             |
| Date divider         | `text-text-muted text-xs`                                          | Centered with lines      |
| Header divider       | `border-border`                                                    | Subtle separator         |
