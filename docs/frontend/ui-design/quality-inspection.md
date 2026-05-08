# Quality & Inspection — UI Design

> **SOP:** SOP-302 · **Input Mode:** Detailed (v0 prototype)
> **User Stories:** US-060 (request inspection), US-061 (rate/review), US-062 (inspector report), US-063 (view ratings)
> **Updated:** 2026-05-08

---

## 1. User Flows (Step 3)

### Flow 1: Buyer Requests Inspection (US-060)

```
[Transaction Detail — status: PAYMENT_VERIFIED]
    → "Request Quality Inspection" section visible
    → Click "Request Inspection"
        → [Confirmation Modal]
            → "An independent inspector will verify the material quality."
            → Estimated cost: EGP X (if applicable)
            ├── Confirm → Inspection request created
            │   → Transaction substatus: INSPECTION_REQUESTED
            │   → Admin assigns inspector
            │   → Toast: "Inspection requested — you'll be notified when complete"
            └── Cancel → Close modal
```

### Flow 2: Inspector Submits Report (US-062)

```
[Inspector Dashboard — Assigned Inspections]
    → Click inspection assignment
        → [Inspection Report Form]
            → Transaction reference (read-only)
            → Material details (read-only: type, quantity, listing info)
            → Upload inspection photos (≥1 required)
            → Quality assessment
                → Overall result: [Pass] [Fail] [Conditional Pass]
                → Quality score: slider or number input (1–10)
                → Category checks: Purity ✓/✗, Weight accuracy ✓/✗, Condition ✓/✗
            → Inspector notes (textarea, required)
            → Click "Submit Report"
                ├── Validation pass → Report saved
                │   → Transaction substatus: INSPECTION_COMPLETE
                │   → Buyer + seller notified
                │   → Toast: "Report submitted successfully"
                └── Validation fail → Inline errors
```

### Flow 3: Buyer/Seller Views Inspection Report

```
[Transaction Detail — after inspection]
    → "Inspection Report" section visible
        → View: overall result badge (Pass/Fail/Conditional)
        → Quality score (X/10 with visual bar)
        → Category checklist (Purity ✓, Weight ✓, Condition ✗)
        → Inspector photos (gallery)
        → Inspector notes
        → Inspector name + credentials
    → If Pass → Transaction continues normally
    → If Fail → Buyer can raise dispute or cancel
    → If Conditional → Buyer decides to proceed or dispute
```

### Flow 4: Post-Transaction Review (US-061)

```
[Transaction Detail — status: COMPLETED]
    → "Rate Your Experience" prompt visible
    → Click "Write a Review"
        → [Review Form] (inline or modal)
            → Star rating (1–5, click or tap)
            → Comment (textarea, optional but encouraged)
            → Click "Submit Review"
                ├── Success → Review saved
                │   → Prompt disappears, "Thank you" message
                │   → Seller's rating recalculated
                │   → Toast: "Review submitted!"
                └── Error → Inline error
    → One review per transaction per party (buyer reviews seller, seller reviews buyer)
```

### Flow 5: View Ratings on Seller Profile (US-063)

```
[Listing Detail → Seller Card] → Click seller name / "View Profile"
    → [Seller Public Profile]
        → Profile card (name, factory, location, avatar)
        → Overall rating: ★★★★☆ 4.2 (18 reviews)
        → Rating breakdown (5★: 12, 4★: 3, 3★: 2, 2★: 1, 1★: 0)
        → Review list (sorted: newest first)
            → Each: star rating, reviewer name, date, comment
            → "Load more" if >5 reviews
    → [My Profile → Reviews Tab] (own reviews received)
        → Same layout as public profile reviews section
```

---

## 2. Text-Based Wireframes (Step 4)

### 2.1 Inspection Report Form (Inspector View)

**Desktop (≥1024px):**

```
┌─────────────────────────────────────────────────────────────────────┐
│ [Sidebar]  │  Submit Inspection Report                             │
│            │─────────────────────────────────────────────────────────│
│            │                                                        │
│            │  Transaction Reference                                 │
│            │  ┌─────────────────────────────────────────────────┐  │
│            │  │ #TXN-2847 · Industrial Copper Cable             │  │
│            │  │ Buyer: Ahmed Hassan  ·  Seller: Cairo Steel     │  │
│            │  │ Qty: 50 tons  ·  EGP 12,500                    │  │
│            │  └─────────────────────────────────────────────────┘  │
│            │                                                        │
│            │  Inspection Photos * (min 1)                          │
│            │  ┌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┐   │
│            │  ╎  📷 Click or drag to upload photos             ╎   │
│            │  └╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┘   │
│            │  [img1 ×] [img2 ×] [img3 ×]                          │
│            │                                                        │
│            │  Overall Result *                                      │
│            │  ┌──────────┐ ┌──────────┐ ┌──────────────────┐      │
│            │  │  ✓ Pass  │ │  ✗ Fail  │ │ ⚠ Conditional   │      │
│            │  └──────────┘ └──────────┘ └──────────────────┘      │
│            │                                                        │
│            │  Quality Score *                                       │
│            │  [═══════════════●═══] 7/10                            │
│            │                                                        │
│            │  Category Checks                                       │
│            │  ┌─────────────────────────────────────────────────┐  │
│            │  │ [✓] Purity / Composition meets specification   │  │
│            │  │ [✓] Weight accuracy within ±5% tolerance       │  │
│            │  │ [✗] Physical condition (damage, contamination) │  │
│            │  └─────────────────────────────────────────────────┘  │
│            │                                                        │
│            │  Inspector Notes *                                     │
│            │  ┌─────────────────────────────────────────────────┐  │
│            │  │ Material is mostly pure copper wire. Minor      │  │
│            │  │ contamination with plastic coating on ~5% of    │  │
│            │  │ the batch. Weight verified at 48.7 tons.       │  │
│            │  └─────────────────────────────────────────────────┘  │
│            │                                                        │
│            │  [Cancel]                      [Submit Report]        │
└─────────────────────────────────────────────────────────────────────┘
```

**Mobile (<640px):**

```
┌──────────────────────────┐
│ ← Inspection Report    ⋮ │
├──────────────────────────┤
│ #TXN-2847                │
│ Copper Cable · 50 tons   │
│ Cairo Steel → Ahmed H.   │
│                          │
│ Inspection Photos *      │
│ ┌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┐ │
│ ╎ 📷 Upload photos     ╎ │
│ └╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┘ │
│ [img1 ×] [img2 ×]       │
│                          │
│ Overall Result *         │
│ [✓ Pass][✗ Fail][⚠ Cond]│
│                          │
│ Quality Score *          │
│ [════════●══] 7/10       │
│                          │
│ Category Checks          │
│ [✓] Purity              │
│ [✓] Weight accuracy     │
│ [✗] Physical condition  │
│                          │
│ Inspector Notes *        │
│ [                      ] │
│ [                      ] │
│                          │
├──────────────────────────┤
│ [Submit Report         ] │ ← Sticky bottom
└──────────────────────────┘
```

### 2.2 Inspection Report View (Buyer/Seller)

**Within Transaction Detail page:**

```
┌───────────────────────────────────────────────────┐
│ Inspection Report                                 │
│                                                   │
│ Result:  ⌈⚠ Conditional Pass⌉     Score: 7/10   │
│          ┌──────────────────────────────┐         │
│          │ ████████████████████░░░░░░░░ │ 70%     │
│          └──────────────────────────────┘         │
│                                                   │
│ Category Checks                                   │
│ ✅ Purity / Composition                           │
│ ✅ Weight accuracy                                │
│ ❌ Physical condition                             │
│                                                   │
│ Photos                                            │
│ ┌────────┐ ┌────────┐ ┌────────┐                │
│ │ photo1 │ │ photo2 │ │ photo3 │                │
│ └────────┘ └────────┘ └────────┘                │
│                                                   │
│ Inspector Notes                                   │
│ "Material is mostly pure copper wire. Minor       │
│  contamination with plastic coating on ~5%..."    │
│  [Read more]                                      │
│                                                   │
│ Inspector: Mohamed Ibrahim                        │
│ Date: Mar 30, 2026                               │
└───────────────────────────────────────────────────┘
```

### 2.3 Review Form (Post-Transaction)

**Inline within Transaction Detail (status: COMPLETED):**

```
┌───────────────────────────────────────────────────┐
│ Rate Your Experience                              │
│                                                   │
│ How was your transaction with Cairo Steel Works?  │
│                                                   │
│         ☆    ☆    ☆    ☆    ☆                    │
│         1    2    3    4    5                      │
│                                                   │
│ Your review (optional)                            │
│ ┌───────────────────────────────────────────────┐ │
│ │                                               │ │
│ │                                               │ │
│ └───────────────────────────────────────────────┘ │
│                                                   │
│ [Cancel]                   [Submit Review]        │
└───────────────────────────────────────────────────┘

After submission:
┌───────────────────────────────────────────────────┐
│ ✅ Thank you for your review!                     │
│                                                   │
│ ★★★★☆  "Great quality copper, fast delivery.     │
│          Would buy again."                        │
│                                  — You, Today     │
└───────────────────────────────────────────────────┘
```

### 2.4 Seller Public Profile — Reviews Section

**Desktop (≥1024px):**

```
┌─────────────────────────────────────────────────────────────────────┐
│ [Sidebar]  │  Cairo Steel Works                                    │
│            │─────────────────────────────────────────────────────────│
│            │                                                        │
│            │  ┌─────────────────────────────────────────────────┐  │
│            │  │▓▓▓▓▓▓▓▓ Green Banner ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│  │
│            │  │       [CS]  Cairo Steel Works                   │  │
│            │  │             📍 Cairo, Egypt                     │  │
│            │  │       ★★★★☆  4.2  (18 reviews)                 │  │
│            │  └─────────────────────────────────────────────────┘  │
│            │                                                        │
│            │  Rating Breakdown                                      │
│            │  5★ ████████████████████████░░  12                    │
│            │  4★ ██████░░░░░░░░░░░░░░░░░░░  3                     │
│            │  3★ ████░░░░░░░░░░░░░░░░░░░░░  2                     │
│            │  2★ ██░░░░░░░░░░░░░░░░░░░░░░░  1                     │
│            │  1★ ░░░░░░░░░░░░░░░░░░░░░░░░░  0                     │
│            │                                                        │
│            │  Reviews                                 [Newest ▼]   │
│            │  ┌─────────────────────────────────────────────────┐  │
│            │  │ ★★★★★  Ahmed Hassan              Mar 28, 2026  │  │
│            │  │ "Great quality copper, fast delivery.           │  │
│            │  │  Would buy again."                              │  │
│            │  ├─────────────────────────────────────────────────┤  │
│            │  │ ★★★★☆  Nile Industries            Mar 15, 2026 │  │
│            │  │ "Good material but delivery was delayed         │  │
│            │  │  by two days."                                  │  │
│            │  ├─────────────────────────────────────────────────┤  │
│            │  │ ★★★☆☆  Delta Recycling            Feb 28, 2026 │  │
│            │  │ "Quality was acceptable but not as described.   │  │
│            │  │  Some impurities found."                        │  │
│            │  └─────────────────────────────────────────────────┘  │
│            │                                                        │
│            │  [Load more reviews...]                               │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 3. Component Hierarchy (Step 5)

### Inspection Report Form (Inspector)

```
InspectionReportPage (Client Component)
├── Container (max-w-3xl)
├── BackLink ("← Back to Assignments")
├── PageTitle ("Submit Inspection Report")
├── TransactionRefCard (read-only)
│   ├── TxnId + Material name
│   ├── Buyer + Seller names
│   └── Quantity + Amount
├── InspectionForm (Client)
│   ├── FileUpload (photos, min 1)
│   │   ├── DropZone
│   │   └── ImagePreviewGrid
│   ├── ResultSelector
│   │   └── SegmentedToggle (Pass | Fail | Conditional)
│   ├── QualityScoreSlider
│   │   ├── Slider input (1–10)
│   │   └── Score display ("7/10")
│   ├── CategoryChecklist
│   │   └── Checkbox ×3 (Purity, Weight, Condition)
│   ├── Textarea (inspector notes, required)
│   ├── ErrorBanner (conditional)
│   └── ActionBar
│       ├── Button ("Cancel", variant="outline")
│       └── Button ("Submit Report", isLoading)
```

### Inspection Report View (Read-Only)

```
InspectionReportSection (within TransactionDetailPage)
├── SectionHeader ("Inspection Report")
├── ResultRow
│   ├── ResultBadge (Pass/Fail/Conditional)
│   └── QualityScoreBar (visual bar + "7/10")
├── CategoryChecklist (read-only)
│   └── CheckItem ×3 (✅/❌ + label)
├── PhotoGallery
│   └── Thumbnail ×N (clickable → lightbox)
├── NotesSection
│   ├── Quoted text (expandable if long)
│   └── "Read more" toggle
└── InspectorInfo
    ├── Name
    └── Date
```

### Review Form

```
ReviewSection (within TransactionDetailPage, Client Component)
├── SectionHeader ("Rate Your Experience")
├── PromptText ("How was your transaction with [name]?")
├── ReviewForm (conditional — shown if no review yet)
│   ├── StarRatingInput (1–5)
│   │   └── Star ×5 (interactive, click/hover)
│   ├── Textarea (comment, optional)
│   └── ActionBar
│       ├── Button ("Cancel", variant="outline")
│       └── Button ("Submit Review", isLoading)
└── ReviewConfirmation (shown after submission)
    ├── SuccessIcon (✅)
    ├── Message ("Thank you for your review!")
    └── ReviewCard (own review displayed)
```

### Reviews Display (Seller Profile)

```
SellerProfilePage (Server Component)
├── Container
├── ProfileCard (same as MyAccount but public)
│   ├── GreenBanner + Avatar + Name + Location
│   └── OverallRating
│       ├── StarRating (display, large)
│       ├── Score ("4.2")
│       └── Count ("18 reviews")
├── RatingBreakdown
│   └── RatingBar ×5
│       ├── Label ("5★")
│       ├── ProgressBar (proportional fill)
│       └── Count ("12")
├── ReviewsSection
│   ├── SectionHeader ("Reviews" + sort dropdown)
│   └── ReviewList
│       └── ReviewCard ×N
│           ├── StarRating (display, small)
│           ├── ReviewerName + Date
│           └── Comment (text)
└── LoadMoreButton (if >5 reviews)

StarRating (shared sub-component)
├── Mode: "input" (interactive) | "display" (read-only)
├── Stars ×5
│   ├── Input: hover preview (fill on hover), click to select
│   └── Display: filled/half/empty based on value
├── Props: value, onChange (input), size (sm/md/lg)
└── ARIA: role="radiogroup" (input) | aria-label (display)
```

---

## 4. Micro-Interactions (Step 6)

| Interaction              | Trigger                     | Animation                                                                         | Duration                             | Feedback                                |
| ------------------------ | --------------------------- | --------------------------------------------------------------------------------- | ------------------------------------ | --------------------------------------- |
| **Star hover (input)**   | Mouse over star             | Stars fill progressively to hovered position (gold color)                         | Instant fill, 150ms color transition | Stars 1–N fill based on position        |
| **Star click**           | Click star                  | Selected stars scale 1→1.15→1 pulse, color locks to gold                          | 200ms spring                         | Haptic-like visual feedback             |
| **Star display load**    | Page render                 | Stars fill left-to-right with staggered delay                                     | 400ms total (80ms per star)          | Visual delight on profile view          |
| **Quality score slider** | Drag slider                 | Score number updates in real-time, color shifts (red→yellow→green based on value) | Continuous                           | Score badge color reflects value        |
| **Result toggle**        | Click Pass/Fail/Conditional | Active option scales slightly + color fills, others desaturate                    | 200ms ease                           | Green=Pass, Red=Fail, Amber=Conditional |
| **Category check**       | Click checkbox              | Checkmark draws in (stroke animation), row tints green/red                        | 250ms ease                           | ✅ green or ❌ red tint                 |
| **Report submit**        | Click submit                | Button → spinner → success checkmark morph                                        | Until response + 300ms               | Toast "Report submitted"                |
| **Review submit**        | Click submit                | Form collapses upward, thank-you card fades in                                    | 300ms collapse + 200ms fade          | Confetti-like particle effect (subtle)  |
| **Rating bar fill**      | Page load (profile)         | Bars fill from left with staggered animation                                      | 600ms total (120ms per bar)          | Progressive reveal                      |
| **Photo lightbox**       | Click inspection photo      | Photo scales up from thumbnail position to centered overlay                       | 300ms ease-out                       | Dark overlay, arrow nav, close (×)      |

---

## 5. Responsive Breakpoints (Step 7)

### Inspection Report Form

| Element         | Mobile (<640)                  | Tablet (640–1023) | Desktop (≥1024)       |
| --------------- | ------------------------------ | ----------------- | --------------------- |
| Form width      | Full-width (px-4)              | max-w-xl centered | max-w-3xl centered    |
| Transaction ref | Compact (1 line)               | Full card         | Full card             |
| Photo grid      | 2-column                       | 3-column          | 4-column              |
| Result toggle   | Full-width, stacked vertically | Inline horizontal | Inline horizontal     |
| Score slider    | Full-width                     | Full-width        | 60% width             |
| Category checks | Full-width list                | Full-width list   | 2-column grid         |
| Submit button   | Sticky bottom bar              | Inline            | Inline, right-aligned |

### Inspection Report View

| Element        | Mobile (<640)            | Tablet (640–1023) | Desktop (≥1024)      |
| -------------- | ------------------------ | ----------------- | -------------------- |
| Result + Score | Stacked                  | Side by side      | Side by side         |
| Photo gallery  | 2-column grid            | 3-column          | 3–4 column           |
| Notes          | Full text, expand toggle | Full text         | Full text            |
| Inspector info | Below notes              | Inline with notes | Inline right-aligned |

### Review Form

| Element          | Mobile (<640)      | Tablet (640–1023)  | Desktop (≥1024)    |
| ---------------- | ------------------ | ------------------ | ------------------ |
| Stars            | Large (32px each)  | Large (32px)       | Medium (28px)      |
| Comment textarea | Full-width, 3 rows | Full-width, 3 rows | Full-width, 4 rows |
| Submit button    | Full-width         | Auto-width         | Auto-width         |

### Seller Profile Reviews

| Element          | Mobile (<640)            | Tablet (640–1023) | Desktop (≥1024)          |
| ---------------- | ------------------------ | ----------------- | ------------------------ |
| Overall rating   | Below banner, centered   | Below banner      | Right of banner or below |
| Rating breakdown | Full-width, compact bars | Full-width        | max-w-md                 |
| Review cards     | Full-width, stacked      | Full-width        | max-w-2xl                |
| Sort dropdown    | Full-width               | Auto-width        | Auto-width               |

---

## 6. Accessibility Requirements (Step 8)

### Inspection Report Form

| Element         | Requirement                                                                                                   |
| --------------- | ------------------------------------------------------------------------------------------------------------- |
| Form            | `role="form"`, `aria-label="Inspection report"`                                                               |
| Photo upload    | `role="button"`, `aria-label="Upload inspection photos, minimum 1 required"`                                  |
| Result selector | `role="radiogroup"`, `aria-label="Overall inspection result"`, each option `role="radio"` with `aria-checked` |
| Quality slider  | `role="slider"`, `aria-valuemin="1"`, `aria-valuemax="10"`, `aria-valuenow`, `aria-label="Quality score"`     |
| Category checks | Each: `role="checkbox"`, `aria-checked`, descriptive `aria-label`                                             |
| Notes textarea  | `aria-label="Inspector notes"`, `aria-required="true"`                                                        |
| Submit          | `aria-busy` during loading                                                                                    |

### Inspection Report View

| Element        | Requirement                                                                                                              |
| -------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Result badge   | `aria-label="Inspection result: Conditional Pass"` (text not color-only)                                                 |
| Score bar      | `role="meter"`, `aria-valuemin="0"`, `aria-valuemax="10"`, `aria-valuenow="7"`, `aria-label="Quality score 7 out of 10"` |
| Category items | `aria-label` includes result: "Purity: passed" / "Condition: failed"                                                     |
| Photos         | Each has `alt="Inspection photo [N]"`, gallery navigable by keyboard                                                     |
| Lightbox       | Focus trapped, Escape closes, arrow keys navigate, `role="dialog"`                                                       |

### Star Rating (Input Mode)

| Element   | Requirement                                                |
| --------- | ---------------------------------------------------------- |
| Container | `role="radiogroup"`, `aria-label="Rating"`                 |
| Each star | `role="radio"`, `aria-checked`, `aria-label="[N] star[s]"` |
| Keyboard  | Arrow keys navigate between stars, Enter/Space selects     |
| Feedback  | Selected value announced: "4 out of 5 stars selected"      |

### Star Rating (Display Mode)

| Element          | Requirement                                                 |
| ---------------- | ----------------------------------------------------------- |
| Container        | `aria-label="Rated 4.2 out of 5 stars based on 18 reviews"` |
| Individual stars | `aria-hidden="true"` (label covers it)                      |

### Rating Breakdown

| Element   | Requirement                                      |
| --------- | ------------------------------------------------ |
| Bar chart | `role="img"`, `aria-label="Rating distribution"` |
| Each bar  | `aria-label="5 stars: 12 reviews"` etc.          |

### Reviews List

| Element       | Requirement                                                |
| ------------- | ---------------------------------------------------------- |
| List          | `role="list"`, `aria-label="Customer reviews"`             |
| Review card   | `role="listitem"`, contains star display + reviewer + text |
| Sort dropdown | `aria-label="Sort reviews by"`                             |
| Load more     | `aria-label="Load more reviews"`                           |

### Keyboard Navigation

| Screen         | Tab Order                                                                                                                                |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Report Form    | Back link → Transaction ref (read-only) → Photo upload → Result selector (←→) → Score slider → Category checks → Notes → Cancel → Submit |
| Review Form    | Stars (←→ arrow keys) → Comment textarea → Cancel → Submit                                                                               |
| Seller Profile | Profile card → Overall rating → Breakdown (read-only) → Sort → Review cards → Load more                                                  |

### RTL Behavior

- Star rating: fills right-to-left (star 1 on right)
- Rating breakdown bars: fill from right
- Quality score slider: value increases right-to-left
- Review cards: name/date alignment flips
- Category checklist: checkbox on right, label on left

---

## 7. Design Token Mapping

| Visual Element        | Token                                           | Notes                |
| --------------------- | ----------------------------------------------- | -------------------- |
| Result: Pass          | `bg-status-success/10 text-status-success`      | Green badge          |
| Result: Fail          | `bg-red-100 text-red-700`                       | Red badge            |
| Result: Conditional   | `bg-amber-100 text-amber-700`                   | Amber badge          |
| Score bar bg          | `bg-surface-muted`                              | Gray track           |
| Score bar fill (high) | `bg-status-success`                             | Green for 7–10       |
| Score bar fill (mid)  | `bg-status-pending`                             | Amber for 4–6        |
| Score bar fill (low)  | `bg-red-500`                                    | Red for 1–3          |
| Star (filled)         | `text-amber-400`                                | Gold star            |
| Star (empty)          | `text-text-muted`                               | Gray star            |
| Star (hover)          | `text-amber-300`                                | Lighter gold preview |
| Category ✅           | `text-status-success`                           | Green check          |
| Category ❌           | `text-red-500`                                  | Red cross            |
| Category row (pass)   | `bg-status-success/5`                           | Subtle green tint    |
| Category row (fail)   | `bg-red-50`                                     | Subtle red tint      |
| Inspector notes       | `bg-surface-muted text-text-primary italic`     | Quoted style         |
| Review card           | `bg-surface shadow-card rounded-xl`             | White card           |
| Rating bar track      | `bg-surface-muted rounded-full`                 | Gray track           |
| Rating bar fill       | `bg-accent rounded-full`                        | Orange fill          |
| Thank-you card        | `bg-status-success/10 border-status-success/20` | Green tint           |
