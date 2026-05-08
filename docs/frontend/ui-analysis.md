# Tabadul — UI Analysis

> **SOP:** SOP-302 (UI/UX Design & Planning) — Step 2
> **Design Input:** Detailed (v0 prototype reference)
> **Scope:** All user stories from `/docs/requirements.md`
> **Last Updated:** 2026-05-08

---

## Purpose

This document maps every user story to concrete UI elements, components, interactions,
accessibility requirements, and responsive behavior. It serves as the bridge between
`/docs/requirements.md` (what the app does) and SOP-305 (page implementation).

Each feature group is analyzed independently and will receive its own
`/docs/frontend/ui-design/[feature].md` with wireframes and flows.

---

## Feature Group Index

| Group                        | User Stories                         | Design Doc                                         | Status      |
| ---------------------------- | ------------------------------------ | -------------------------------------------------- | ----------- |
| **Marketplace & Listings**   | US-010–014, US-020–023               | `/docs/frontend/ui-design/marketplace-listings.md` | ✅ Complete |
| **Authentication & Profile** | US-001–005                           | `/docs/frontend/ui-design/auth-profile.md`         | ✅ Complete |
| **Dashboard & Home**         | US-004, US-014 (partial), US-030–032 | `/docs/frontend/ui-design/dashboard-home.md`       | ✅ Complete |
| **Chat & Communication**     | US-040–043                           | `/docs/frontend/ui-design/chat-communication.md`   | ✅ Complete |
| **Transactions & Payment**   | US-050–055                           | `/docs/frontend/ui-design/transactions.md`         | ⬚ Planned   |
| **Quality & Inspection**     | US-060–063                           | `/docs/frontend/ui-design/inspection.md`           | ⬚ Planned   |
| **Notifications**            | US-090–091                           | `/docs/frontend/ui-design/notifications.md`        | ⬚ Planned   |
| **Admin Panel**              | US-080–084                           | `/docs/frontend/ui-design/admin.md`                | ⬚ Planned   |
| **Internationalization**     | US-100–101                           | Cross-cutting (all feature docs)                   | ⬚ Planned   |

---

## 1. Marketplace & Listings (US-010–014, US-020–023)

### US-010 — Create Waste Listing

| Aspect            | Details                                                                                                                                                                                                                          |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Screen**        | Create Listing (multi-step wizard)                                                                                                                                                                                               |
| **UI Elements**   | Stepper/progress indicator, category dropdown (from `waste_categories`), text inputs (title, description), numeric inputs (quantity + unit selector, price), photo uploader with preview, location picker/display, submit button |
| **Components**    | `Input`, `Button`, `Badge` (step indicator), `Card`, file upload component (new), category selector (new), quantity+unit combo input (new)                                                                                       |
| **Interactions**  | Step transitions with validation gates, photo drag-and-drop, inline field validation, success toast on publish                                                                                                                   |
| **Accessibility** | Stepper must announce current step via `aria-current="step"`, file upload needs keyboard support and screen reader labels, required fields marked with `aria-required`                                                           |
| **Responsive**    | Single column on all breakpoints; wizard step indicator horizontal on desktop, compact on mobile                                                                                                                                 |

### US-011 — Fixed-Price vs. Auction Mode

| Aspect            | Details                                                                                                                                      |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **Screen**        | Create Listing — Step 2 (Pricing)                                                                                                            |
| **UI Elements**   | Radio group or segmented toggle (Fixed Price / Auction), conditional fields: price input (fixed) OR minimum bid + auction end date (auction) |
| **Components**    | Segmented toggle (new or reuse Buying/Selling toggle pattern), `Input` (currency), date picker (new)                                         |
| **Interactions**  | Selecting mode shows/hides relevant fields with smooth transition; Zod schema enforces mode-dependent validation                             |
| **Accessibility** | `role="radiogroup"` with `aria-label`, conditional fields use `aria-expanded` on toggle                                                      |
| **Responsive**    | Fields stack vertically; toggle full-width on mobile                                                                                         |

### US-012 — Upload Photos

| Aspect            | Details                                                                                                                                                   |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Screen**        | Create Listing — Step 1 or dedicated step                                                                                                                 |
| **UI Elements**   | Drop zone with dashed border, "Click or drag to upload" text, photo thumbnails with remove (×) button, minimum 1 photo indicator                          |
| **Components**    | File upload zone (new), image preview grid (new), `Button` (remove)                                                                                       |
| **Interactions**  | Drag-and-drop with visual feedback (border color change), click to open file picker, preview appears immediately (client-side), upload progress indicator |
| **Accessibility** | Drop zone focusable with `role="button"`, `aria-label="Upload photos"`, image previews have `alt` from filename, remove buttons labeled per image         |
| **Responsive**    | 2-column preview grid on mobile, 3–4 columns on tablet/desktop                                                                                            |

### US-013 — Edit / Deactivate Listing

| Aspect            | Details                                                                                                                      |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **Screen**        | Listing Edit Page (reuses Create Listing form, pre-filled), My Listings (deactivate action)                                  |
| **UI Elements**   | Same as Create form but with pre-filled data, "Save Changes" CTA, "Deactivate" destructive action button, confirmation modal |
| **Components**    | Reuse Create Listing form, `Modal` (confirmation), `Button` (destructive variant)                                            |
| **Interactions**  | Edit navigates to pre-filled wizard; Deactivate shows confirmation modal; optimistic UI update on deactivate                 |
| **Accessibility** | Confirmation modal traps focus, Escape to cancel, destructive action requires explicit confirmation                          |
| **Responsive**    | Same as Create Listing                                                                                                       |

### US-014 — My Listings Dashboard

| Aspect            | Details                                                                                                                                                                                 |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Screen**        | My Listings (within Seller Home / Dashboard)                                                                                                                                            |
| **UI Elements**   | Tab/filter row (Active, Sold, Deactivated), listing cards (list variant), stat cards (Active count, Total Inquiries, Completed), CTA banner ("Create New Listing"), empty state message |
| **Components**    | `Badge` (status), ListingCard (list variant), `Card` (stat), filter chips, CTA banner component                                                                                         |
| **Interactions**  | Filter chips toggle listing visibility (client-side filter or server refetch), "Create New Listing" navigates to wizard, listing card click → listing detail                            |
| **Accessibility** | Filter chips use `role="tablist"` + `role="tab"`, active tab has `aria-selected="true"`, stat cards are `role="status"`                                                                 |
| **Responsive**    | Cards full-width on mobile, 2-column on tablet, list view on all sizes                                                                                                                  |

### US-020 — Browse Marketplace

| Aspect            | Details                                                                                                                                 |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **Screen**        | Marketplace Browse Page                                                                                                                 |
| **UI Elements**   | Page header ("Marketplace"), search bar, filter area, listing cards (compact grid variant), pagination or infinite scroll, result count |
| **Components**    | `Input` (search), filter panel (new), ListingCard (compact), pagination component (new)                                                 |
| **Interactions**  | Search with debounced input, filter panel toggles on mobile (drawer), cards link to detail page, infinite scroll or "Load more"         |
| **Accessibility** | Search has `role="search"`, results announced via `aria-live="polite"` region, cards are links with descriptive text                    |
| **Responsive**    | 1-col grid on mobile, 2-col on tablet, 3–4 col on desktop; filter panel is sidebar on desktop, bottom sheet/drawer on mobile            |

### US-021 — Filter Listings

| Aspect            | Details                                                                                                                                                                             |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Screen**        | Marketplace Browse — Filter Panel                                                                                                                                                   |
| **UI Elements**   | Category multi-select (checkboxes or chips), location dropdown (cities), price range slider or min/max inputs, quantity range, "Apply" + "Clear" buttons, active filter count badge |
| **Components**    | Filter panel (new), chips (active filters summary), `Input` (range), `Button`, `Badge` (filter count)                                                                               |
| **Interactions**  | Desktop: persistent sidebar filter; Mobile: slide-in drawer with "Apply" button; active filters shown as removable chips above results; URL query params sync                       |
| **Accessibility** | Filter panel has `role="form"` with `aria-label="Filter listings"`, each filter group is a `fieldset` with `legend`, clear button announces "All filters cleared"                   |
| **Responsive**    | Desktop: left sidebar (240px); Tablet: collapsible sidebar; Mobile: full-screen drawer overlay                                                                                      |

### US-022 — Listing Detail

| Aspect            | Details                                                                                                                                                                                                                                                                                                                                     |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Screen**        | Listing Detail Page                                                                                                                                                                                                                                                                                                                         |
| **UI Elements**   | Photo gallery (carousel or grid), title, category badge, price (orange, prominent), quantity + unit, description, seller profile card (avatar, name, rating, reviews), location with map placeholder, "Message Seller" CTA, "Bookmark" button, bid section (if auction: current bid, bid input, place bid button), similar listings section |
| **Components**    | Image carousel/gallery (new), `Badge` (category), `Avatar`, `Card` (seller info), `Button` (CTA, bookmark), `Input` (bid amount), StarRating (new), ListingCard (compact, for similar)                                                                                                                                                      |
| **Interactions**  | Image carousel swipe/click, "Message Seller" opens/navigates to chat, bookmark toggle with optimistic UI, bid placement with validation + confirmation, breadcrumb navigation                                                                                                                                                               |
| **Accessibility** | Image gallery: arrow key navigation, alt text per image, screen reader announces "Image X of Y"; seller rating uses `aria-label="4.8 out of 5 stars"`; bid input has associated error messaging via `aria-describedby`                                                                                                                      |
| **Responsive**    | Desktop: 2-column (gallery left, details right); Tablet: 2-column narrower; Mobile: single column, gallery full-width                                                                                                                                                                                                                       |

### US-023 — Bookmark Listings

| Aspect            | Details                                                                                                                          |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **Screen**        | Listing Detail (bookmark button), Saved Listings page                                                                            |
| **UI Elements**   | Bookmark icon button (outline → filled on toggle), "Saved" page with bookmarked listing cards, empty state                       |
| **Components**    | `Button` (icon variant with heart/bookmark icon), ListingCard (compact), empty state component                                   |
| **Interactions**  | Toggle with optimistic UI (instant visual feedback, revert on error), toast notification "Added to saved" / "Removed from saved" |
| **Accessibility** | Bookmark button: `aria-pressed="true/false"`, `aria-label="Save listing"` / `"Remove from saved"`                                |
| **Responsive**    | Bookmark icon same on all breakpoints; Saved page uses same grid as Marketplace                                                  |

---

## 2. Authentication & Profile (US-001–005)

### US-001 — Register

| Aspect            | Details                                                                                                                                 |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **Screen**        | Registration Page                                                                                                                       |
| **UI Elements**   | Form: factory name, email, password, confirm password, location (city dropdown), industry sector dropdown, submit button, link to login |
| **Components**    | `Input`, `Button`, `Card` (auth card wrapper), dropdown/select (new)                                                                    |
| **Interactions**  | Inline validation, password strength indicator, email verification notice on success                                                    |
| **Accessibility** | Form fields with `aria-describedby` for errors, password visibility toggle with `aria-label`                                            |
| **Responsive**    | Centered card on all breakpoints; max-width ~480px                                                                                      |

### US-002 — Login

| Aspect            | Details                                                                                                       |
| ----------------- | ------------------------------------------------------------------------------------------------------------- |
| **Screen**        | Login Page                                                                                                    |
| **UI Elements**   | Email input, password input (with show/hide toggle), "Login" button, "Forgot password?" link, "Register" link |
| **Components**    | `Input`, `Button`, `Card` (auth wrapper)                                                                      |
| **Interactions**  | Form submission with loading state, error message display, redirect on success                                |
| **Accessibility** | Error summary at form top with `role="alert"`, inputs linked to error messages                                |
| **Responsive**    | Same as Register — centered card                                                                              |

### US-003 — Factory Profile Setup

| Aspect            | Details                                                                                    |
| ----------------- | ------------------------------------------------------------------------------------------ |
| **Screen**        | Profile Setup (onboarding wizard or profile page)                                          |
| **UI Elements**   | Factory name, location (city), industry sector dropdown, optional description, save button |
| **Components**    | `Input`, select/dropdown, `Button`, `Card`                                                 |
| **Interactions**  | Save with success toast, redirect to dashboard on completion                               |
| **Accessibility** | Required fields marked, progress indication if multi-step                                  |
| **Responsive**    | Single column form, centered                                                               |

### US-004 — Buying/Selling Toggle

| Aspect            | Details                                                                                          |
| ----------------- | ------------------------------------------------------------------------------------------------ |
| **Screen**        | Dashboard Home (persistent toggle)                                                               |
| **UI Elements**   | Pill-shaped segmented control with icons (warehouse + package)                                   |
| **Components**    | Segmented toggle (Buying/Selling) — matches v0 prototype pattern §3.2                            |
| **Interactions**  | Immediate mode switch — entire dashboard content changes; persisted to user preference (Zustand) |
| **Accessibility** | `role="tablist"` with `role="tab"` for each option, `aria-selected` on active                    |
| **Responsive**    | Full width on mobile, auto-width on desktop                                                      |

### US-005 — View/Edit Profile

| Aspect            | Details                                                                                                                                                                       |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Screen**        | My Account page (matches v0 `09-profile.png`)                                                                                                                                 |
| **UI Elements**   | Profile card (green banner, avatar, name, factory, location), stats row (transactions, rating, months), settings menu items (Account Info, Location, Notifications, Settings) |
| **Components**    | Profile card (new), stat card, settings menu item (icon + title + chevron) — per v0 §3.8, §3.10, §3.11                                                                        |
| **Interactions**  | Settings items navigate to sub-pages, edit button opens edit form                                                                                                             |
| **Accessibility** | Settings items are links with descriptive text, stats use `aria-label` for context                                                                                            |
| **Responsive**    | Single column on mobile, profile card spans full-width; desktop may use 2-column layout                                                                                       |

---

## 3. Dashboard & Home (US-004, US-014, US-030–032)

### Buyer Home

| Aspect           | Details                                                                                                                                                                                          |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Screen**       | Home (Buyer Mode) — matches v0 `02-home-buyer-scroll.png`                                                                                                                                        |
| **UI Elements**  | Header banner (greeting, notification bell, language toggle), Buying/Selling toggle, "Matched for You" carousel (horizontal scroll), "Browse Marketplace" CTA banner, "Recent Transactions" list |
| **Components**   | Header banner, toggle, MatchCard carousel, CTA banner (§3.9), TransactionCard (§3.5)                                                                                                             |
| **Interactions** | Match cards horizontally scrollable, "See All" navigates to full view, CTA banner navigates to marketplace                                                                                       |
| **Responsive**   | Desktop: 3-column match cards; Tablet: 2-column; Mobile: horizontal scroll                                                                                                                       |

### Seller Home

| Aspect           | Details                                                                                                                         |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **Screen**       | Home (Seller Mode) — matches v0 `12-home-seller.png`                                                                            |
| **UI Elements**  | Stat cards row (Active, Inquiries, Completed), "Create New Listing" CTA banner, "My Listings" with listing cards (list variant) |
| **Components**   | StatCard (§3.10), CTA banner (§3.9), ListingCard list variant (§3.4)                                                            |
| **Interactions** | Stat cards may link to filtered views, CTA navigates to create form, listing cards navigate to detail                           |
| **Responsive**   | Desktop: 3 stat cards in row; Mobile: stack or horizontal scroll                                                                |

### AI Match Section (US-030–032)

| Aspect            | Details                                                                                   |
| ----------------- | ----------------------------------------------------------------------------------------- |
| **Screen**        | Buyer Home — "Matched for You" section                                                    |
| **UI Elements**   | Match cards with score badge (percentage), horizontal scroll carousel, "See All" link     |
| **Components**    | MatchCard (compact listing card with score badge — §3.3)                                  |
| **Interactions**  | Scroll horizontally, click navigates to listing detail, dismiss action (swipe or X)       |
| **Accessibility** | Carousel: `role="region"` with `aria-label`, cards are links, score badge in `aria-label` |
| **Responsive**    | Carousel on mobile/tablet, grid on desktop                                                |

---

## 4. Chat & Communication (US-040–043)

### US-040 — Message Seller

| Aspect            | Details                                                                                                                                        |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| **Screen**        | Chat Thread List + Chat Detail                                                                                                                 |
| **UI Elements**   | Thread list (avatar, name, listing, last message, timestamp, unread badge), chat detail (message bubbles, input bar, listing reference header) |
| **Components**    | ChatThreadItem (§3.7), ChatMessage (new), ChatInput (new), `Avatar`                                                                            |
| **Interactions**  | Real-time messages via Supabase Realtime, "Message Seller" from listing detail creates/opens thread, typing indicator                          |
| **Accessibility** | Messages use `role="log"` with `aria-live="polite"`, input has `aria-label="Type a message"`                                                   |
| **Responsive**    | Desktop: 2-panel (thread list + chat detail side-by-side); Mobile: separate pages                                                              |

### US-041/042 — Content Moderation

| Aspect           | Details                                                                            |
| ---------------- | ---------------------------------------------------------------------------------- |
| **UI Elements**  | Warning inline message when blocked content detected, repeated violation notice    |
| **Interactions** | Message blocked before sending, warning toast/inline, no message appears in thread |
| **Note**         | Moderation logic deferred to Phase 4 (AI) — UI should support showing warnings     |

### US-043 — Chat Notifications

| Aspect          | Details                                                                                    |
| --------------- | ------------------------------------------------------------------------------------------ |
| **UI Elements** | Unread badge on Messages nav item, unread count on thread item, push notification (system) |
| **Components**  | `Badge` (unread count), notification dot                                                   |

---

## 5. Transactions & Payment (US-050–055)

### Transaction Flow Screens

| Screen                 | UI Elements                                                     | Key Components                            |
| ---------------------- | --------------------------------------------------------------- | ----------------------------------------- |
| **Transaction List**   | Cards with status, amount, date, counterparty                   | TransactionCard (§3.5), filter chips      |
| **Transaction Detail** | Status timeline, material info, payment section, action buttons | Timeline stepper (new), `Button`, `Card`  |
| **Receipt Upload**     | File upload, transaction summary, submit                        | File upload, `Button`                     |
| **Delivery Approval**  | Material photos, approve/dispute buttons, notes input           | `Button` (primary + destructive), `Input` |

### US-055 — Transaction History

| Aspect          | Details                                                                        |
| --------------- | ------------------------------------------------------------------------------ |
| **Screen**      | Transaction History page                                                       |
| **UI Elements** | Filter tabs (All, Active, Completed, Disputed), transaction cards, empty state |
| **Responsive**  | Card list on all sizes; desktop may show more detail inline                    |

---

## 6. Quality & Inspection (US-060–063)

### US-062 — Inspector Flow

| Aspect          | Details                                                                                   |
| --------------- | ----------------------------------------------------------------------------------------- |
| **Screen**      | Inspection Report Page                                                                    |
| **UI Elements** | Transaction reference, photo upload grid, notes textarea, pass/fail toggle, submit button |
| **Responsive**  | Single column form; photo grid 2-col mobile, 3-col desktop                                |

### US-061/063 — Ratings & Reviews

| Aspect          | Details                                                                    |
| --------------- | -------------------------------------------------------------------------- |
| **Screen**      | Review form (post-transaction), seller profile (display)                   |
| **UI Elements** | Star rating input (1–5), text comment, submit; Star display, review list   |
| **Components**  | StarRating (new — input and display modes), `Card` (review item), `Avatar` |

---

## 7. Notifications (US-090–091)

| Aspect          | Details                                                                                                   |
| --------------- | --------------------------------------------------------------------------------------------------------- |
| **Screen**      | Notifications page — matches v0 `15-notifications.png`                                                    |
| **UI Elements** | Filter chips (All, Matches, Messages, Transactions), notification items with type icons, unread indicator |
| **Components**  | NotificationItem (§3.6), filter chips (§3.12), `Badge`                                                    |
| **Responsive**  | Single column list on all breakpoints; filter chips horizontal scroll on mobile                           |

---

## 8. Admin Panel (US-080–084)

### Screens

| Screen                   | User Stories | UI Elements                                                        |
| ------------------------ | ------------ | ------------------------------------------------------------------ |
| **Admin Dashboard**      | US-083       | Stat cards (users, listings, transactions, revenue), charts/graphs |
| **User Management**      | US-080       | Data table with search, action dropdown (Approve, Suspend, Ban)    |
| **Listing Moderation**   | US-081       | Listing cards with approve/remove actions, reason input modal      |
| **Payment Verification** | US-082       | Receipt image viewer, transaction summary, verify/reject buttons   |
| **Dispute Resolution**   | US-084       | Dispute details, chat history, inspection report, ruling form      |

**Note:** Admin panel is web-only with desktop-first design. Uses data tables extensively.

---

## 9. Internationalization (US-100–101)

### Cross-Cutting Requirements

| Requirement       | Implementation                                                                                                 |
| ----------------- | -------------------------------------------------------------------------------------------------------------- |
| Language switcher | Global nav element (header), persisted via `[locale]` route segment                                            |
| RTL layout        | `dir="rtl"` on `<html>`, Tailwind logical properties (`ms-`, `me-`, `ps-`, `pe-`), `[dir='rtl']` CSS overrides |
| Translated text   | i18n dictionary files in `packages/shared/src/locales/`                                                        |
| Number formatting | `Intl.NumberFormat` for EGP currency, quantities                                                               |
| Date formatting   | `Intl.DateTimeFormat` with Arabic/English locale                                                               |

---

## New Components Identified

Components not yet created in SOP-300 that will be needed:

| Component            | Category             | Used By                                           |
| -------------------- | -------------------- | ------------------------------------------------- |
| FileUpload           | `ui/`                | Create Listing, Receipt Upload, Inspection Report |
| ImageCarousel        | `ui/`                | Listing Detail                                    |
| FilterPanel          | `features/listings/` | Marketplace Browse                                |
| FilterChip           | `ui/`                | Marketplace, Notifications, Transactions          |
| Stepper              | `ui/`                | Create Listing wizard, Transaction timeline       |
| Select / Dropdown    | `ui/`                | Category, Location, Industry                      |
| DatePicker           | `ui/`                | Auction end date                                  |
| StarRating           | `ui/`                | Reviews (input + display)                         |
| Pagination           | `ui/`                | Marketplace, Admin tables                         |
| Toast / Notification | `ui/`                | Success/error feedback                            |
| EmptyState           | `ui/`                | Empty lists/grids                                 |
| DataTable            | `features/admin/`    | Admin user/listing/transaction management         |
| SegmentedToggle      | `ui/`                | Buying/Selling, Fixed/Auction                     |
| SearchInput          | `ui/`                | Marketplace, Chat, Admin                          |
| Breadcrumb           | `ui/`                | Listing Detail, Transaction Detail                |
| PriceDisplay         | `ui/`                | Listings (formatted EGP with accent color)        |
