# Transactions & Payment — UI Design

> **SOP:** SOP-302 · **Input Mode:** Detailed (v0 prototype)
> **User Stories:** US-050 (initiate purchase), US-051 (upload receipt), US-052 (admin verify), US-053 (seller delivery), US-054 (buyer confirm/dispute), US-055 (history)
> **Reference Patterns:** §3.5 Transaction Card
> **Updated:** 2026-05-08

---

## 1. User Flows (Step 3)

### Flow 1: Buyer Initiates Purchase (US-050)

```
[Listing Detail Page] → Click "Buy Now" (fixed price) or "Win Auction"
    → [Confirm Purchase Modal]
        → Review: material, quantity, price, seller
        → Click "Confirm Purchase"
            ├── Validation fail → Inline error
            └── Success → Transaction created (status: INITIATED)
                → Redirect to [Transaction Detail Page]
                → Toast: "Transaction created — please deposit payment"
                → Notification sent to seller
```

### Flow 2: Buyer Uploads Payment Receipt (US-051)

```
[Transaction Detail — status: INITIATED]
    → "Upload Payment Receipt" section visible
    → Click upload zone / drag receipt image
        → Preview shown, file validated (image type, max size)
    → Click "Submit Receipt"
        ├── Success → Status changes to DEPOSIT_PAID
        │   → Toast: "Receipt submitted for verification"
        │   → Admin notified for review
        └── Error → Inline error, retry option
```

### Flow 3: Admin Verifies Payment (US-052)

```
[Admin Panel — Payment Verification Queue]
    → List of transactions with status DEPOSIT_PAID
    → Click transaction → [Admin Transaction Review]
        → View: receipt image (zoomable), transaction summary, buyer/seller info
        → Click "Verify Payment"
            → Status → PAYMENT_VERIFIED
            → Buyer + seller notified
        → Click "Reject"
            → [Rejection Reason Modal] → Enter reason → Submit
            → Status → PAYMENT_REJECTED
            → Buyer notified with reason
```

### Flow 4: Seller Confirms Delivery (US-053)

```
[Transaction Detail — status: PAYMENT_VERIFIED] (seller view)
    → "Confirm Delivery" section visible
    → Optional: upload delivery photos
    → Enter delivery notes (optional)
    → Click "Confirm Delivery"
        → [Confirmation Modal] → "Are you sure the goods have been delivered?"
            ├── Confirm → Status → SHIPPED / DELIVERED
            │   → Buyer notified to confirm receipt
            └── Cancel → Close modal
```

### Flow 5: Buyer Confirms Receipt or Disputes (US-054)

```
[Transaction Detail — status: DELIVERED] (buyer view)
    → Review: delivery photos, seller notes
    → Option A: Click "Confirm Receipt"
        → [Confirmation Modal] → "Confirm you received the materials?"
            → Status → COMPLETED
            → Toast: "Transaction completed!"
            → Prompt: "Rate your experience" → [Review Form]
    → Option B: Click "Raise Dispute"
        → [Dispute Form]
            → Select reason (dropdown): Quality issue, Wrong material, Short quantity, Other
            → Enter description (textarea, required)
            → Upload evidence photos (optional)
            → Click "Submit Dispute"
                → Status → DISPUTED
                → Admin notified
                → Toast: "Dispute submitted — our team will review"
```

### Flow 6: Transaction History (US-055)

```
[Sidebar] → Click "Transactions"
    → [Transaction History Page]
        → Filter tabs: All | Active | Completed | Disputed
        → Transaction cards (sorted by date, newest first)
        → Click card → [Transaction Detail Page]
        → Empty state if no transactions in category
```

---

## 2. Text-Based Wireframes (Step 4)

### 2.1 Transaction History Page

**Desktop (≥1024px):**

```
┌─────────────────────────────────────────────────────────────────────┐
│ [Sidebar]  │  Transactions                                        │
│            │─────────────────────────────────────────────────────────│
│            │  [All] [Active] [Completed] [Disputed]   [🔍 Search] │
│            │                                                        │
│            │  ┌─────────────────────────────────────────────────┐  │
│            │  │ #TXN-2847                     ⌈Deposit Paid⌉   │  │
│            │  │ Industrial Copper Cable                         │  │
│            │  │                                                 │  │
│            │  │ Seller: Cairo Steel Works                       │  │
│            │  │ Qty: 50 tons  ·  EGP 12,500                    │  │
│            │  │ Created: Mar 28, 2026             [View →]      │  │
│            │  └─────────────────────────────────────────────────┘  │
│            │                                                        │
│            │  ┌─────────────────────────────────────────────────┐  │
│            │  │ #TXN-2831                     ⌈Completed⌉      │  │
│            │  │ Steel Scrap Bundle                              │  │
│            │  │                                                 │  │
│            │  │ Seller: Nile Steel Co.                          │  │
│            │  │ Qty: 20 tons  ·  EGP 8,200                     │  │
│            │  │ Created: Mar 15, 2026             [View →]      │  │
│            │  └─────────────────────────────────────────────────┘  │
│            │                                                        │
│            │  [← Prev]  Page 1 of 3  [Next →]                      │
└─────────────────────────────────────────────────────────────────────┘
```

**Mobile (<640px):**

```
┌──────────────────────────┐
│ ☰  Transactions       🔔│
├──────────────────────────┤
│[All][Active][Done][Disp.]│ ← Horizontal scroll
├──────────────────────────┤
│                          │
│ ┌──────────────────────┐ │
│ │#TXN-2847 ⌈Dep.Paid⌉ │ │
│ │Copper Cable          │ │
│ │Cairo Steel · 50 tons │ │
│ │EGP 12,500   Mar 28   │ │
│ └──────────────────────┘ │
│                          │
│ ┌──────────────────────┐ │
│ │#TXN-2831 ⌈Complete⌉ │ │
│ │Steel Scrap           │ │
│ │Nile Steel · 20 tons  │ │
│ │EGP 8,200    Mar 15   │ │
│ └──────────────────────┘ │
│                          │
│ [Load more...]           │
└──────────────────────────┘
```

### 2.2 Transaction Detail Page

**Desktop (≥1024px):**

```
┌─────────────────────────────────────────────────────────────────────┐
│ [Sidebar]  │  ← Back to Transactions                              │
│            │                                                        │
│            │  #TXN-2847 · Industrial Copper Cable                  │
│            │                                                        │
│            │  ┌───────────────────────────────────────────────────┐│
│            │  │           Transaction Status Timeline             ││
│            │  │                                                   ││
│            │  │  ● Initiated ─── ● Deposit ─── ○ Verified ─── ○ ││
│            │  │  Mar 28         Paid           (pending)       D ││
│            │  │                 Mar 29                          e ││
│            │  │                                                l ││
│            │  │                                                iv ││
│            │  │                                                . ││
│            │  └───────────────────────────────────────────────────┘│
│            │                                                        │
│            │  ┌──────────────────────┐ ┌──────────────────────────┐│
│            │  │ Material Details     │ │ Payment Summary          ││
│            │  │                      │ │                          ││
│            │  │ Material: Copper     │ │ Price: EGP 250/ton       ││
│            │  │ Quantity: 50 tons    │ │ Quantity: 50 tons        ││
│            │  │ Type: Fixed Price    │ │ ──────────────────       ││
│            │  │                      │ │ Total: EGP 12,500       ││
│            │  │ Listing: [View →]    │ │                          ││
│            │  └──────────────────────┘ │ Status: ⌈Deposit Paid⌉  ││
│            │                           └──────────────────────────┘│
│            │                                                        │
│            │  ┌──────────────────────┐ ┌──────────────────────────┐│
│            │  │ Buyer Info           │ │ Seller Info              ││
│            │  │ [AH] Ahmed Hassan    │ │ [CS] Cairo Steel Works   ││
│            │  │ Port Said            │ │ Cairo                    ││
│            │  │ ★★★★☆ 4.2           │ │ ★★★★★ 4.8               ││
│            │  └──────────────────────┘ └──────────────────────────┘│
│            │                                                        │
│            │  ┌───────────────────────────────────────────────────┐│
│            │  │ Payment Receipt                                  ││
│            │  │ ┌────────────────┐                                ││
│            │  │ │  [receipt.jpg] │  Uploaded: Mar 29, 2:15 PM    ││
│            │  │ │  (thumbnail)   │  Status: Awaiting verification││
│            │  │ └────────────────┘                                ││
│            │  └───────────────────────────────────────────────────┘│
│            │                                                        │
│            │  ── Actions ──────────────────────────────────────────│
│            │  (context-dependent — see action states below)        │
│            │  [💬 Message Seller]                                  │
└─────────────────────────────────────────────────────────────────────┘
```

**Mobile (<640px):**

```
┌──────────────────────────┐
│ ← #TXN-2847           ⋮ │
├──────────────────────────┤
│ Industrial Copper Cable  │
│                          │
│ ● Init ── ● Paid ── ○── │
│ Mar28    Mar29    Verif. │
│                          │
│ ┌──────────────────────┐ │
│ │ Material Details     │ │
│ │ Copper · 50 tons     │ │
│ │ Fixed Price          │ │
│ └──────────────────────┘ │
│                          │
│ ┌──────────────────────┐ │
│ │ Payment Summary      │ │
│ │ EGP 250/ton × 50     │ │
│ │ Total: EGP 12,500    │ │
│ │ ⌈Deposit Paid⌉       │ │
│ └──────────────────────┘ │
│                          │
│ ┌──────────────────────┐ │
│ │ Payment Receipt      │ │
│ │ [receipt thumbnail]  │ │
│ │ Awaiting verification│ │
│ └──────────────────────┘ │
│                          │
│ Buyer: Ahmed Hassan      │
│ Seller: Cairo Steel      │
│                          │
├──────────────────────────┤
│ [💬 Message Seller     ] │  ← Sticky bottom
└──────────────────────────┘
```

### 2.3 Upload Payment Receipt

**Within Transaction Detail (status: INITIATED):**

```
┌───────────────────────────────────────────────────┐
│ Upload Payment Receipt                            │
│                                                   │
│ Please upload your bank transfer receipt or       │
│ payment proof.                                    │
│                                                   │
│ ┌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┐ │
│ ╎                                               ╎ │
│ ╎     📷 Click or drag to upload receipt        ╎ │
│ ╎     Accepted: JPG, PNG, PDF (max 5MB)         ╎ │
│ ╎                                               ╎ │
│ └╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┘ │
│                                                   │
│ [receipt_preview.jpg ×]   ← After upload          │
│                                                   │
│ [Submit Receipt]                                  │
└───────────────────────────────────────────────────┘
```

### 2.4 Dispute Form

**Within Transaction Detail (status: DELIVERED, buyer view):**

```
┌───────────────────────────────────────────────────┐
│ Raise a Dispute                                   │
│                                                   │
│ Reason *                                          │
│ [Select reason                              ▼]   │
│                                                   │
│ Description *                                     │
│ [                                               ] │
│ [                                               ] │
│ [                                               ] │
│                                                   │
│ Evidence Photos (optional)                        │
│ ┌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┐ │
│ ╎  📷 Upload evidence photos                   ╎ │
│ └╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┘ │
│                                                   │
│ [Cancel]                    [Submit Dispute]      │
└───────────────────────────────────────────────────┘
```

### 2.5 Contextual Action States

```
Status: INITIATED (Buyer View)
├── [Upload Payment Receipt]    ← Primary CTA
└── [Cancel Transaction]        ← Destructive secondary

Status: DEPOSIT_PAID (Buyer View)
└── "Receipt submitted. Awaiting admin verification." (info banner)

Status: PAYMENT_VERIFIED (Seller View)
├── [Confirm Delivery]          ← Primary CTA
└── [💬 Message Buyer]          ← Secondary

Status: DELIVERED (Buyer View)
├── [Confirm Receipt]           ← Primary CTA (green)
├── [Raise Dispute]             ← Destructive secondary (red outline)
└── [💬 Message Seller]

Status: COMPLETED
├── [Rate Transaction]          ← Primary (if no review yet)
└── "Transaction completed" (success banner)

Status: DISPUTED
└── "Dispute under review by admin team." (warning banner)
```

---

## 3. Component Hierarchy (Step 5)

### Transaction History Page

```
TransactionHistoryPage (Server Component)
├── Container
├── PageHeader ("Transactions")
├── FilterBar
│   ├── FilterChips (All | Active | Completed | Disputed)
│   └── SearchInput (optional — search by TXN ID or material)
├── TransactionList
│   └── TransactionCard ×N
│       ├── Card (bg-surface, shadow-card)
│       ├── TxnHeader
│       │   ├── TxnId ("#TXN-2847", monospace)
│       │   └── StatusBadge
│       ├── MaterialName (semibold)
│       ├── TxnDetails
│       │   ├── CounterpartyName (buyer or seller)
│       │   ├── Quantity + Unit
│       │   └── PriceDisplay (accent)
│       ├── TxnDate (muted)
│       └── ViewLink ("View →")
├── Pagination (desktop) / LoadMore (mobile)
└── EmptyState (per tab)
```

### Transaction Detail Page

```
TransactionDetailPage (Server Component — fetches transaction)
├── Container (max-w-4xl)
├── BackLink ("← Back to Transactions")
├── TxnPageHeader
│   ├── TxnId + MaterialTitle (h1)
│   └── StatusBadge (large)
├── StatusTimeline (Client)
│   └── Stepper (horizontal)
│       └── TimelineStep ×5
│           ├── StepDot (filled = complete, outlined = pending, pulsing = current)
│           ├── StepLabel ("Initiated", "Deposit Paid", etc.)
│           └── StepDate (if completed)
├── DetailGrid (2-col desktop, 1-col mobile)
│   ├── MaterialCard
│   │   ├── Material type, quantity, listing mode
│   │   └── Link to original listing
│   ├── PaymentSummaryCard
│   │   ├── Unit price, quantity, total (bold)
│   │   └── StatusBadge
│   ├── BuyerCard
│   │   ├── Avatar + Name + Location
│   │   └── StarRating
│   └── SellerCard (same structure)
├── ReceiptSection (conditional — after INITIATED)
│   ├── Uploaded receipt thumbnail (clickable → full view)
│   ├── Upload date + verification status
│   └── FileUpload (if status = INITIATED, buyer view)
├── DeliverySection (conditional — after PAYMENT_VERIFIED)
│   ├── Delivery photos grid (if provided)
│   └── Delivery notes
├── ActionBar (Client — context-dependent per status/role)
│   ├── PrimaryAction (Upload Receipt / Confirm Delivery / Confirm Receipt / Rate)
│   ├── SecondaryAction (Cancel / Message / Dispute)
│   └── InfoBanner (waiting states)
└── DisputeForm (Client — conditional, expandable)
    ├── Select (reason)
    ├── Textarea (description)
    ├── FileUpload (evidence)
    └── ActionBar (Cancel + Submit)
```

### Status Timeline Sub-Component

```
StatusTimeline
├── Container (flex, horizontal)
└── TimelineStep ×N
    ├── StepConnector (line: solid green if passed, dashed gray if pending)
    ├── StepDot
    │   ├── Complete: filled green circle + checkmark
    │   ├── Current: green circle + pulse animation
    │   └── Pending: gray outlined circle
    ├── StepLabel (text below dot)
    └── StepDate (small muted, below label)
```

---

## 4. Micro-Interactions (Step 6)

| Interaction                | Trigger                        | Animation                                                          | Duration                                | Feedback                               |
| -------------------------- | ------------------------------ | ------------------------------------------------------------------ | --------------------------------------- | -------------------------------------- |
| **Timeline progress**      | Page load / status change      | Steps fill in sequentially left→right, connectors draw             | 600ms total (150ms per step, staggered) | Current step pulses gently             |
| **Current step pulse**     | Ongoing (current status)       | Dot scales 1→1.3→1, subtle glow ring                               | 2s loop, ease-in-out                    | Draws attention to current state       |
| **Receipt upload**         | Drop/select file               | Drop zone border → green, thumbnail fades in with progress         | 300ms + progress bar                    | File size shown, remove button appears |
| **Submit receipt**         | Click submit                   | Button loading spinner, then success checkmark morph               | Until response + 300ms morph            | Toast "Receipt submitted"              |
| **Confirm action**         | Click Confirm Delivery/Receipt | Modal slides up, confirm button requires 2s hold or explicit click | 300ms slide                             | Prevents accidental confirmation       |
| **Status badge change**    | Status transition              | Old badge fades out, new badge scales in with color                | 400ms crossfade                         | Status text + color both change        |
| **Transaction card hover** | Mouse enter                    | Left accent border appears (4px primary), card lifts               | 200ms ease                              | Cursor pointer                         |
| **Filter tab switch**      | Click tab                      | Active underline slides to new tab, cards crossfade                | 200ms slide + 150ms fade                | Result count updates                   |
| **Dispute form expand**    | Click "Raise Dispute"          | Form section slides down + fades in                                | 300ms ease-out                          | Scroll to form                         |
| **Cancel transaction**     | Click cancel → confirm         | Card/page fades, status badge → "Cancelled" with red               | 300ms fade                              | Toast "Transaction cancelled"          |

---

## 5. Responsive Breakpoints (Step 7)

### Transaction History Page

| Element      | Mobile (<640)           | Tablet (640–1023)  | Desktop (≥1024)          |
| ------------ | ----------------------- | ------------------ | ------------------------ |
| Sidebar      | Hidden                  | Hidden             | Persistent (240px)       |
| Filter tabs  | Horizontal scroll chips | Inline row         | Inline row               |
| Search       | Hidden (filter icon)    | Inline with tabs   | Inline with tabs         |
| Card layout  | Full-width, compact     | Full-width, medium | Full-width, detailed     |
| TXN ID       | Smaller text            | Normal             | Normal + monospace       |
| Counterparty | Name only               | Name + location    | Name + location + rating |
| Pagination   | "Load more" button      | "Load more"        | Numbered pagination      |

### Transaction Detail Page

| Element            | Mobile (<640)           | Tablet (640–1023)       | Desktop (≥1024)                   |
| ------------------ | ----------------------- | ----------------------- | --------------------------------- |
| Timeline           | Vertical (left-aligned) | Horizontal (full-width) | Horizontal (full-width)           |
| Timeline labels    | Icon + label stacked    | Icon + label + date     | Icon + label + date + description |
| Detail cards       | Single column, stacked  | 2-column grid           | 2-column grid                     |
| Buyer/Seller cards | Stacked                 | Side by side            | Side by side                      |
| Receipt image      | Full-width thumbnail    | Medium thumbnail        | Medium thumbnail + zoom           |
| Action buttons     | Sticky bottom bar       | Inline at bottom        | Inline at bottom                  |
| Dispute form       | Full-width              | max-w-lg                | max-w-lg                          |
| Back link          | ← icon only             | ← icon + text           | ← icon + text                     |

### Receipt Upload Section

| Element           | Mobile (<640)       | Tablet (640–1023) | Desktop (≥1024) |
| ----------------- | ------------------- | ----------------- | --------------- |
| Drop zone         | Full-width, shorter | Full-width        | max-w-md        |
| Preview thumbnail | 80px                | 120px             | 160px           |
| Submit button     | Full-width          | Auto-width        | Auto-width      |

---

## 6. Accessibility Requirements (Step 8)

### Transaction History

| Element           | Requirement                                                                                                       |
| ----------------- | ----------------------------------------------------------------------------------------------------------------- |
| Filter tabs       | `role="tablist"` + `role="tab"`, `aria-selected` on active                                                        |
| Result region     | `aria-live="polite"`, announces "Showing 12 active transactions"                                                  |
| Transaction cards | Each is `<a>`, `aria-label="Transaction TXN-2847, Industrial Copper Cable, Deposit Paid, 12,500 Egyptian Pounds"` |
| Status badge      | Text always present (not color-only); part of card's `aria-label`                                                 |
| Empty state       | `role="status"`, descriptive message                                                                              |
| Pagination        | `nav` with `aria-label="Pagination"`, current page `aria-current="page"`                                          |

### Transaction Detail

| Element         | Requirement                                                                                         |
| --------------- | --------------------------------------------------------------------------------------------------- |
| Timeline        | `role="list"`, each step `role="listitem"`                                                          |
| Step status     | `aria-label` includes state: "Deposit Paid — completed on March 29" / "Verification — pending"      |
| Current step    | `aria-current="step"` on the active step                                                            |
| Pulse animation | Decorative; state conveyed via text and ARIA, not animation alone                                   |
| Detail cards    | `role="region"` with `aria-labelledby` pointing to card heading                                     |
| Receipt image   | `alt="Payment receipt uploaded March 29"`, clickable for zoom with `aria-label="View full receipt"` |
| Amount display  | `aria-label="Total amount: 12,500 Egyptian Pounds"`                                                 |

### Action Buttons

| Element             | Requirement                                                                 |
| ------------------- | --------------------------------------------------------------------------- |
| Primary CTA         | Descriptive label (not just "Submit"), `aria-busy` during loading           |
| Destructive actions | Confirmation modal with `role="alertdialog"`, focus trapped, Escape cancels |
| Cancel transaction  | Double confirmation (modal) with clear warning text                         |
| Info banners        | `role="status"`, announced on page load                                     |

### Dispute Form

| Element         | Requirement                                                                                       |
| --------------- | ------------------------------------------------------------------------------------------------- |
| Form            | `role="form"`, `aria-label="Raise a dispute"`                                                     |
| Reason select   | `aria-label="Dispute reason"`, `aria-required="true"`                                             |
| Description     | `aria-label="Describe the issue"`, `aria-required="true"`, `aria-describedby` for character limit |
| Evidence upload | Same accessibility as listing photo upload                                                        |
| Error summary   | `role="alert"` at form top                                                                        |

### Keyboard Navigation

| Screen  | Tab Order                                                                                                                           |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| History | Skip link → Sidebar → Filter tabs (←→) → Search → Transaction cards (↓) → Pagination                                                |
| Detail  | Skip link → Back link → Timeline (read-only) → Material card → Payment card → Buyer/Seller cards → Receipt section → Action buttons |
| Dispute | Reason select → Description textarea → Evidence upload → Cancel → Submit                                                            |

### RTL Behavior

- Timeline reads right-to-left (first step on right)
- Timeline connector direction flips
- Card layouts mirror (TXN ID right-aligned, status badge left)
- Action buttons: primary on left, secondary on right (flipped)
- Back arrow → right-pointing

---

## 7. Design Token Mapping

| Visual Element               | Token                                                 | Notes              |
| ---------------------------- | ----------------------------------------------------- | ------------------ |
| Page bg                      | `bg-background`                                       | Warm cream         |
| Transaction card             | `bg-surface shadow-card rounded-xl`                   | White card         |
| Card hover accent            | `border-l-4 border-primary`                           | Green left border  |
| TXN ID                       | `text-text-secondary font-mono text-sm`               | Monospace gray     |
| Material title               | `text-text-primary font-semibold`                     | Bold dark          |
| Amount                       | `text-accent font-bold`                               | Orange, prominent  |
| Status: Initiated            | `bg-gray-100 text-gray-700`                           | Neutral gray       |
| Status: Deposit Paid         | `bg-status-pending/10 text-status-pending`            | Amber              |
| Status: Verified             | `bg-primary/10 text-primary`                          | Green tint         |
| Status: Delivered            | `bg-blue-100 text-blue-700`                           | Blue               |
| Status: Completed            | `bg-status-success/10 text-status-success`            | Green              |
| Status: Disputed             | `bg-red-100 text-red-700`                             | Red                |
| Status: Cancelled            | `bg-gray-100 text-gray-500`                           | Muted gray         |
| Timeline dot (complete)      | `bg-primary`                                          | Filled green       |
| Timeline dot (current)       | `bg-primary ring-4 ring-primary/20`                   | Green + pulse ring |
| Timeline dot (pending)       | `border-2 border-text-muted`                          | Gray outline       |
| Timeline connector (done)    | `bg-primary h-0.5`                                    | Solid green line   |
| Timeline connector (pending) | `border-t-2 border-dashed border-text-muted`          | Dashed gray        |
| Info banner                  | `bg-blue-50 border-blue-200 text-blue-800`            | Blue info          |
| Warning banner               | `bg-amber-50 border-amber-200 text-amber-800`         | Amber              |
| Success banner               | `bg-status-success/10 text-status-success`            | Green              |
| Upload zone                  | `border-2 border-dashed border-text-muted rounded-xl` | Dashed border      |
| Upload zone active           | `border-primary bg-primary/5`                         | Green highlight    |
