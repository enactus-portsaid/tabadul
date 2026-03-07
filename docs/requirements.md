# Tabadul — Requirements Document

> **Status:** Draft — Pending stakeholder sign-off
> **Last Updated:** 2026-02-24
> **SOP:** SOP-000 (Requirements Gathering)

---

## 1. Overview

**Tabadul** (Arabic: تبادل — "exchange") is a B2B, AI-powered Industrial Symbiosis Platform.
It operates as a digital marketplace that automatically connects factories generating industrial
waste (Sellers) with factories that can use that waste as cheap raw materials (Buyers).

The platform uses a rule-based AI matching system to pair supply and demand, handles quality
assurance through seller-provided photos, buyer ratings, and a middleman inspector, and
facilitates logistics through third-party providers.

**Initial target market:** Factories in the Suez Canal Zone (Port Said, Ismailia, Suez).

**Revenue model:** Commission-based — a percentage of each transaction, paid by the buyer.

**Comparable platform:** [MRKOON](https://mrkoon.com) — an Egyptian B2B scrap marketplace
that validates the digital auction model and industrial waste taxonomy.

---

## 2. Stakeholders

| Role                | Description                                         | Involvement            |
| ------------------- | --------------------------------------------------- | ---------------------- |
| Project Sponsor     | Enactus team                                        | Direction & decisions  |
| Product Owner       | User (developer)                                    | Requirements authority |
| Sellers             | Factories generating waste they want to sell        | Core platform user     |
| Buyers              | Factories seeking cheap raw materials (waste)       | Core platform user     |
| Platform Admin      | Manages listings, disputes, users, and transactions | Operations             |
| Middleman Inspector | Third-party quality verifier before shipping        | Quality assurance      |
| Logistics Provider  | Third-party transport companies                     | Fulfillment            |

> **Note:** A single factory can act as both Seller and Buyer, as long as buy/sell
> transactions involve _different_ counterparties.

---

## 3. Problem Statement

Factory managers in the Suez Canal Zone face two compounding problems:

1. **Discovery gap:** They cannot easily find which other factories generate waste they
   could use as raw materials, or which factories would buy their own waste.
2. **Process friction:** Even when parties find each other, the logistics, quality
   verification, pricing negotiation, and payment are fragmented, manual, and unreliable.

This results in usable industrial waste being discarded, factories overpaying for raw materials,
and environmental damage from unnecessary waste disposal.

---

## 4. Goals & Success Metrics

| Goal                          | Success Metric (MVP)                                       |
| ----------------------------- | ---------------------------------------------------------- |
| **Connect supply and demand** | ≥ 1 completed end-to-end transaction                       |
| **Onboard factories**         | ≥ 10 factories registered                                  |
| **Enable price transparency** | Active listings with visible pricing                       |
| **Build trust**               | Rating system operational, inspector verified ≥ 1 shipment |
| **Facilitate logistics**      | ≥ 1 delivery arranged through 3PL                          |

---

## 5. User Stories

### 5.1 Authentication & Profile

| ID     | Priority | User Story                                                                                                 |
| ------ | -------- | ---------------------------------------------------------------------------------------------------------- |
| US-001 | Must     | As a factory owner, I want to register an account so that I can access the platform.                       |
| US-002 | Must     | As a user, I want to log in with my credentials so that I can access my dashboard.                         |
| US-003 | Must     | As a user, I want to set up my factory profile (name, location, industry sector) so that I'm discoverable. |
| US-004 | Should   | As a user, I want to switch between my Seller and Buyer roles so that I can buy and sell from one account. |
| US-005 | Must     | As a user, I want to view and edit my profile so that my information stays current.                        |

**Acceptance Criteria:**

- **US-001:** Given a factory owner visits the registration page, when they provide valid factory details (name, location, email, password, industry sector), then an account is created and an email verification is sent.
- **US-002:** Given a registered user, when they enter valid credentials, then they are redirected to their dashboard.
- **US-003:** Given a logged-in user, when they complete their factory profile with name, location (city within Suez Canal Zone), and industry sector, then the profile is saved and visible to other users.
- **US-004:** Given a user with a complete profile, when they navigate to the dashboard, then they can see both "My Listings" (seller view) and "Browse Materials" (buyer view).
- **US-005:** Given a logged-in user, when they navigate to profile settings, then they can edit all profile fields and save changes.

---

### 5.2 Waste Listing (Seller)

| ID     | Priority | User Story                                                                                                            |
| ------ | -------- | --------------------------------------------------------------------------------------------------------------------- |
| US-010 | Must     | As a seller, I want to create a waste listing with type, quantity, price, photos, and location so buyers can find it. |
| US-011 | Must     | As a seller, I want to choose between fixed-price or auction mode for my listing.                                     |
| US-012 | Must     | As a seller, I want to upload photos of my waste materials so that buyers can assess quality visually.                |
| US-013 | Should   | As a seller, I want to edit or deactivate my listing so that I can manage my inventory.                               |
| US-014 | Should   | As a seller, I want to view all my active and past listings in a dashboard.                                           |

**Acceptance Criteria:**

- **US-010:** Given a logged-in seller, when they fill in waste type (from predefined categories), quantity (with unit), price (EGP), upload ≥ 1 photo, and confirm location, then the listing is published and searchable.
- **US-011:** Given a seller creating a listing, when they select "Auction", then they set a starting bid and auction duration; when they select "Fixed Price", then they set a fixed asking price.
- **US-012:** Given a seller creating a listing, when they upload photos, then the photos are stored and displayed on the listing detail page.
- **US-013:** Given a seller viewing their listing, when they click "Edit", then they can modify any field except type; when they click "Deactivate", then the listing is hidden from search results.
- **US-014:** Given a seller on their dashboard, when they navigate to "My Listings", then they see all listings grouped by status (Active, Sold, Deactivated).

---

### 5.3 Browsing & Discovery (Buyer)

| ID     | Priority | User Story                                                                                                |
| ------ | -------- | --------------------------------------------------------------------------------------------------------- |
| US-020 | Must     | As a buyer, I want to browse available waste listings so that I can find materials I need.                |
| US-021 | Must     | As a buyer, I want to filter listings by waste type, location, price range, and quantity.                 |
| US-022 | Must     | As a buyer, I want to view listing details (photos, seller rating, description, price) before purchasing. |
| US-023 | Should   | As a buyer, I want to save/bookmark listings I'm interested in so I can return to them later.             |

**Acceptance Criteria:**

- **US-020:** Given a logged-in buyer, when they navigate to the marketplace, then they see a paginated list of active listings with thumbnail, type, price, and location.
- **US-021:** Given a buyer on the marketplace, when they apply filters, then only matching listings are displayed.
- **US-022:** Given a buyer clicking a listing, when the detail page loads, then they see all photos, description, seller rating, price (or current bid), quantity, and location.
- **US-023:** Given a buyer viewing a listing, when they click "Save", then the listing appears in their "Saved" section.

---

### 5.4 AI Matching

| ID     | Priority | User Story                                                                                                         |
| ------ | -------- | ------------------------------------------------------------------------------------------------------------------ |
| US-030 | Must     | As a buyer, I want the platform to recommend waste listings that match my material needs so I save time searching. |
| US-031 | Must     | As a seller, I want the platform to notify me when a new buyer matches my waste type so I can reach out.           |
| US-032 | Should   | As a user, I want to see a "match score" explaining why a listing was recommended to me.                           |

**Acceptance Criteria:**

- **US-030:** Given a buyer has set their material preferences (waste types they need), when new listings are created that match those types + are within the Suez Canal Zone, then those listings appear in a "Recommended for You" section.
- **US-031:** Given a seller has active listings, when a buyer registers with matching material needs, then the seller receives a notification.
- **US-032:** Given a user viewing a recommendation, when they see a match, then a compatibility score (%) and brief reason (e.g., "Same waste type, 15km away") are displayed.

---

### 5.5 Communication (Chat)

| ID     | Priority | User Story                                                                                                                       |
| ------ | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| US-040 | Must     | As a buyer, I want to message a seller about a listing so that I can ask questions before purchasing.                            |
| US-041 | Must     | As a user, I want the chat to prevent sharing of phone numbers and external contact info so all communication stays on-platform. |
| US-042 | Must     | As a user, I want the chat to enforce respectful communication and filter spam so the environment stays professional.            |
| US-043 | Should   | As a user, I want to receive a notification when I get a new message.                                                            |

**Acceptance Criteria:**

- **US-040:** Given a buyer on a listing detail page, when they click "Message Seller", then a chat thread is opened linked to that specific listing.
- **US-041:** Given a user typing a message, when the message contains a phone number, email, or social media handle, then the message is blocked and the user is warned.
- **US-042:** Given a user sending a message, when the message contains profanity or spam patterns, then the message is blocked; repeated violations trigger account review.
- **US-043:** Given a user receives a message, when they are not in the chat, then they receive a push/in-app notification.

---

### 5.6 Transactions & Payment

| ID     | Priority | User Story                                                                                                             |
| ------ | -------- | ---------------------------------------------------------------------------------------------------------------------- |
| US-050 | Must     | As a buyer, I want to initiate a purchase (fixed-price or win auction) so that I can acquire the materials.            |
| US-051 | Must     | As a buyer, I want to pay a deposit first, then pay the remaining amount after I approve the delivered materials.      |
| US-052 | Must     | As a buyer, I want to upload my InstaPay transfer receipt so the platform can verify my payment.                       |
| US-053 | Must     | As an admin, I want to verify uploaded payment receipts so that I can approve transactions.                            |
| US-054 | Must     | As a buyer, I want to confirm or dispute the materials upon delivery so the transaction can be completed or escalated. |
| US-055 | Should   | As a user, I want to view my transaction history with status tracking.                                                 |

**Acceptance Criteria:**

- **US-050:** Given a buyer clicks "Buy Now" (fixed-price) or wins an auction, when the system processes the order, then a transaction record is created with status "Pending Deposit".
- **US-051:** Given a transaction is created, when the buyer is prompted for payment, then they first pay a deposit (configurable % of total); after delivery approval, they pay the remainder.
- **US-052:** Given a buyer has transferred funds via InstaPay, when they upload a receipt screenshot, then the receipt is attached to the transaction for admin review.
- **US-053:** Given an admin views pending transactions, when they see an uploaded receipt, then they can mark payment as "Verified" or "Rejected" with notes.
- **US-054:** Given materials have been delivered, when the buyer inspects them, then they can "Approve" (triggering remainder payment prompt) or "Dispute" (triggering admin review).
- **US-055:** Given a user on their dashboard, when they navigate to "Transactions", then they see all transactions with status (Pending Deposit → Deposit Paid → Verified → Inspection → Shipping → Delivered → Approved / Disputed → Completed).

---

### 5.7 Quality Assurance & Inspection

| ID     | Priority | User Story                                                                                                                      |
| ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------- |
| US-060 | Must     | As a seller, I want to provide photos of my materials so buyers can visually assess quality.                                    |
| US-061 | Must     | As a buyer, I want to rate and comment on a seller after a transaction so others can gauge trustworthiness.                     |
| US-062 | Must     | As a middleman inspector, I want to verify the material quality and quantity before shipping so the buyer's trust is protected. |
| US-063 | Should   | As a buyer, I want to see a seller's average rating and past reviews before purchasing.                                         |

**Acceptance Criteria:**

- **US-060:** (Covered by US-012 acceptance criteria)
- **US-061:** Given a completed transaction, when the buyer navigates to the transaction, then they can leave a 1–5 star rating and text review for the seller.
- **US-062:** Given a transaction is verified (deposit confirmed), when the inspector visits the seller's location, then they upload an inspection report (photos + notes + pass/fail) to the platform; only after a "pass" does the system authorize logistics pickup.
- **US-063:** Given a buyer views a listing, when they see the seller's profile, then average rating, number of reviews, and most recent reviews are displayed.

---

### 5.8 Logistics

| ID     | Priority | User Story                                                                                                         |
| ------ | -------- | ------------------------------------------------------------------------------------------------------------------ |
| US-070 | Must     | As an admin, I want to connect verified transactions to a third-party logistics provider so materials get shipped. |
| US-071 | Should   | As a buyer, I want to see an estimated shipping cost before purchasing so I can factor it into my decision.        |
| US-072 | Should   | As a user, I want to track the shipment status so I know when materials will arrive.                               |

**Acceptance Criteria:**

- **US-070:** Given an inspection has passed and deposit is verified, when the admin triggers logistics, then a pickup request is sent to the 3PL provider with seller location, buyer location, and material details.
- **US-071:** Given a buyer views a listing, when the system calculates distance between seller and buyer locations, then an estimated shipping cost is displayed.
- **US-072:** Given a shipment is in transit, when the user views the transaction, then they see the current shipment status (Scheduled → Picked Up → In Transit → Delivered).

---

### 5.9 Admin Panel

| ID     | Priority | User Story                                                                                              |
| ------ | -------- | ------------------------------------------------------------------------------------------------------- |
| US-080 | Must     | As an admin, I want to manage user accounts (approve, suspend, ban) so I can enforce platform policies. |
| US-081 | Must     | As an admin, I want to moderate listings (approve, remove) so only legitimate materials are listed.     |
| US-082 | Must     | As an admin, I want to verify payment receipts and manage transactions so funds flow correctly.         |
| US-083 | Should   | As an admin, I want to view a dashboard with platform metrics (users, listings, transactions, revenue). |
| US-084 | Should   | As an admin, I want to resolve disputes between buyers and sellers.                                     |

**Acceptance Criteria:**

- **US-080:** Given an admin on the user management page, when they select a user, then they can view the full profile and take actions: Approve, Suspend, Ban, with reason notes.
- **US-081:** Given an admin on the listings moderation page, when they review a listing, then they can Approve or Remove it with a reason sent to the seller.
- **US-082:** (Covered by US-053 acceptance criteria)
- **US-083:** Given an admin on the admin dashboard, when the page loads, then they see total users, active listings, completed transactions, total revenue, and commission earned.
- **US-084:** Given a dispute is filed, when the admin reviews the transaction details + chat history + inspection report, then they can rule in favor of buyer or seller and take appropriate action (refund, ban, etc.).

---

### 5.10 Notifications

| ID     | Priority | User Story                                                                                      |
| ------ | -------- | ----------------------------------------------------------------------------------------------- |
| US-090 | Should   | As a user, I want to receive push notifications for matches, messages, and transaction updates. |
| US-091 | Should   | As a user, I want to manage my notification preferences so I only get alerts I care about.      |

**Acceptance Criteria:**

- **US-090:** Given a triggering event (new match, new message, transaction status change), when the event fires, then the relevant user receives an in-app notification and (if enabled) a push notification.
- **US-091:** Given a user in notification settings, when they toggle categories (matches, messages, transactions), then only notifications for enabled categories are sent.

---

### 5.11 Internationalization

| ID     | Priority | User Story                                                                                                 |
| ------ | -------- | ---------------------------------------------------------------------------------------------------------- |
| US-100 | Must     | As a user, I want to switch between Arabic and English so I can use the platform in my preferred language. |
| US-101 | Must     | As a user, I want the UI to dynamically switch between RTL (Arabic) and LTR (English) layout.              |

**Acceptance Criteria:**

- **US-100:** Given a user on any page, when they select a language from the language switcher, then all UI text is translated to the selected language.
- **US-101:** Given a user switches to Arabic, when the page renders, then the layout direction is RTL; switching to English renders LTR.

---

## 6. MoSCoW Prioritization Summary

### Must Have (MVP)

- User registration, login, and factory profile (US-001–003, US-005)
- Waste listing with fixed-price and auction modes (US-010–012)
- Marketplace browsing and filtering (US-020–022)
- Rule-based AI matching with notifications (US-030–031)
- On-platform chat with contact-info blocking and moderation (US-040–042)
- Transaction lifecycle: purchase → deposit → receipt verification → inspection → logistics → delivery approval (US-050–054)
- Middleman inspector flow (US-062)
- Payment via InstaPay with receipt upload and admin verification (US-052–053)
- Admin: user management, listing moderation, payment verification (US-080–082)
- Bilingual UI (Arabic/English) with RTL/LTR support (US-100–101)
- Seller photo uploads and buyer rating system (US-060–061)
- Third-party logistics provider connection (US-070)

### Should Have

- Role-switching UI between seller/buyer (US-004)
- Edit/deactivate listings (US-013)
- Seller dashboard (US-014)
- Save/bookmark listings (US-023)
- AI match score display (US-032)
- Chat notifications (US-043)
- Transaction history view (US-055)
- Seller rating visibility on listings (US-063)
- Estimated shipping cost (US-071)
- Shipment tracking (US-072)
- Admin dashboard with metrics (US-083)
- Dispute resolution (US-084)
- Push notifications with preferences (US-090–091)

### Could Have (Post-MVP)

- LLM-based AI matching (enhanced NLP on waste descriptions)
- Advanced analytics and reporting dashboards
- IoT integration for real-time waste monitoring
- Automated payment verification (OCR on receipts)
- Multi-region expansion (beyond Suez Canal Zone)

### Won't Have (Out of Scope)

- Freemium tier (the platform is commission-based only)
- Internal logistics fleet (3PL only)
- Direct financial transactions (InstaPay transfers only, not card processing)

---

## 7. MVP Scope

### Included in MVP

| Feature Area         | Scope                                                                                                   |
| -------------------- | ------------------------------------------------------------------------------------------------------- |
| Authentication       | Email registration, login, factory profile setup                                                        |
| Listings             | Create with type/quantity/price/photos/location, fixed-price + auction                                  |
| Marketplace          | Browse, filter, listing detail view                                                                     |
| AI Matching          | Rule-based (waste type + location + quantity compatibility), notifications                              |
| Chat                 | Per-listing threads, contact-info blocking, moderation, spam detection                                  |
| Transactions         | Deposit → receipt upload → admin verification → inspection → logistics → delivery approval → completion |
| Quality Assurance    | Seller photos, buyer ratings, middleman inspector verification                                          |
| Logistics            | 3PL provider connection for pickup/delivery                                                             |
| Payments             | InstaPay receipt upload, manual admin verification                                                      |
| Admin                | User/listing/transaction management                                                                     |
| Internationalization | Arabic + English, dynamic RTL/LTR                                                                       |

### Deferred (Post-MVP)

| Feature                | Target Phase                       |
| ---------------------- | ---------------------------------- |
| LLM-based AI matching  | After validating rule-based        |
| Advanced analytics     | After achieving transaction volume |
| Automated receipt OCR  | After manual flow is validated     |
| Multi-region expansion | After Suez Canal Zone traction     |
| IoT waste monitoring   | Long-term roadmap                  |

### Explicitly Out of Scope

- Freemium model / subscription tiers
- Internal logistics fleet
- Card/bank payment processing
- Desktop-only UI (mobile-first is required)

---

## 8. Non-Functional Requirements

| Category          | Requirement            | Target                                        |
| ----------------- | ---------------------- | --------------------------------------------- |
| **Performance**   | Page load time         | < 3 seconds on 3G                             |
| **Performance**   | API response time      | < 500ms for 95th percentile                   |
| **Scalability**   | Concurrent users (MVP) | ~10–50 users                                  |
| **Security**      | Authentication         | Secure session management                     |
| **Security**      | Data protection        | HTTPS, encrypted passwords                    |
| **Security**      | Chat moderation        | Block phone numbers, emails, socials          |
| **Accessibility** | WCAG compliance        | Level AA (where feasible)                     |
| **Localization**  | Languages supported    | Arabic (RTL), English (LTR)                   |
| **Platform**      | Target platform        | Mobile-first web (Android + iOS downloadable) |
| **APIs**          | External services      | Free tier only for MVP                        |
| **Availability**  | Uptime target          | 99% (best-effort for MVP)                     |

---

## 9. Constraints & Assumptions

### Constraints

- **Free-tier APIs only:** All external services must have free tiers for MVP (no paid API subscriptions).
- **Commission-based revenue:** No freemium or subscription model; revenue comes from a % of each transaction, paid by the buyer.
- **InstaPay payments:** No payment gateway integration; manual receipt upload and admin verification.
- **Suez Canal Zone only:** MVP is geographically limited to Port Said, Ismailia, and Suez.
- **Small scale:** MVP targets ~10 factories, not 100s.
- **Mobile-first:** Must work well on mobile devices; downloadable on Android and iOS.

### Assumptions

- Factories in the Suez Canal Zone have basic smartphone access and internet connectivity.
- A middleman inspector can be arranged for each transaction (logistics of inspector availability).
- Third-party logistics providers are available in the Suez Canal Zone.
- InstaPay adoption is sufficient among target factories for payment processing.
- Industrial waste categories can be mapped to a manageable taxonomy (inspired by MRKOON's ~13 categories).

---

## 10. Open Questions

| #   | Question                                                                                              | Status | Resolution                     |
| --- | ----------------------------------------------------------------------------------------------------- | ------ | ------------------------------ |
| 1   | What specific commission percentage should be charged per transaction?                                | Open   |                                |
| 2   | What deposit percentage should buyers pay upfront? (MRKOON reference: configurable)                   | Open   |                                |
| 3   | How are middleman inspectors assigned — platform-employed, freelance, or existing certification body? | Open   |                                |
| 4   | What specific industrial waste categories should the taxonomy include?                                | Open   | To be defined in SOP-101       |
| 5   | Which third-party logistics provider(s) will be integrated?                                           | Open   | To be determined               |
| 6   | What are the auction rules — minimum bid increment, duration, reserve price?                          | Open   |                                |
| 7   | "Downloadable on Android and iOS" — does this mean native apps or a PWA (Progressive Web App)?        | Closed | Native app for Android and iOS |

---

## 11. Transaction Lifecycle

> This section documents the complete transaction flow, which is central to the platform.

```
┌─────────┐     ┌──────────┐     ┌───────────┐     ┌───────────┐     ┌──────────┐
│ LISTING │────▶│ PURCHASE │────▶│  DEPOSIT  │────▶│  RECEIPT  │────▶│  ADMIN   │
│ Created │     │ Initiated│     │   Paid    │     │ Uploaded  │     │ Verified │
└─────────┘     └──────────┘     └───────────┘     └───────────┘     └──────────┘
                                                                          │
                     ┌────────────────────────────────────────────────────┘
                     ▼
              ┌──────────┐     ┌───────────┐     ┌───────────┐     ┌──────────┐
              │INSPECTION│────▶│  LOGISTICS│────▶│ DELIVERED │────▶│  BUYER   │
              │  Passed  │     │  Pickup   │     │           │     │ APPROVAL │
              └──────────┘     └───────────┘     └───────────┘     └──────────┘
                                                                        │
                                                          ┌─────────────┼──────────────┐
                                                          ▼             │              ▼
                                                   ┌───────────┐        │        ┌──────────┐
                                                   │ REMAINDER │        │        │ DISPUTE  │
                                                   │   PAID    │        │        │  Filed   │
                                                   └───────────┘        │        └──────────┘
                                                          │             │
                                                          ▼             │
                                                    ┌───────────┐       │
                                                    │ COMPLETED │       │
                                                    └───────────┘       │
                                                                        ▼
                                                                   ┌──────────┐
                                                                   │  ADMIN   │
                                                                   │ RESOLVES │
                                                                   └──────────┘
```

**Key flow:**

1. Seller creates listing (fixed-price or auction)
2. Buyer purchases (or wins auction) → Transaction created → Status: **Pending Deposit**
3. Buyer transfers deposit via InstaPay → Uploads receipt → Status: **Deposit Paid**
4. Admin verifies receipt → Status: **Verified**
5. Middleman inspector visits seller → Inspects materials → Uploads report → Status: **Inspection Passed** (or failed → cancelled)
6. Admin triggers 3PL pickup → Status: **Shipping**
7. Materials arrive → Buyer inspects → **Approves** or **Disputes**
8. If approved → Buyer pays remainder → Uploads receipt → Admin verifies → **Completed** (commission deducted)
9. If disputed → Admin reviews and resolves

---

## 12. Approval

| Stakeholder   | Date       | Status   | Signature  |
| ------------- | ---------- | -------- | ---------- |
| Product Owner | 2026-03-05 | Approved | Tech Team  |
