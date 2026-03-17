# Tabadul — Seed Data

> **Status:** Approved
> **Last Updated:** 2026-03-17
> **SOP:** SOP-102 (Seed Data)

---

## 1. Overview

This document describes the seed data used for local development and testing. 
The seed data provides a realistic representation of the Tabadul platform, including test users, waste categories, listings, transactions, and chat threads.

## 2. How to Run

The seed data is automatically applied whenever the database is reset. You can also run it explicitly. Ensure the Supabase local stack is running first (`pnpm db:start`).

- **Reset DB and Seed:** `pnpm db:reset`
- **Seed Only (after a reset):** `pnpm db:seed`

---

## 3. Test Accounts

All test accounts use the same password for convenience in local development.

**Default Password:** `password123`

| User | Email | Role | Purpose |
|------|-------|------|---------|
| **Admin** | `admin@tabadul.com` | `admin` | Test admin dashboard, verify receipts, moderate listings and users |
| **Inspector** | `inspector@tabadul.com` | `inspector` | Test quality assurance flow (upload inspection reports) |
| **Seller** | `seller@factory.com` | `seller` | Test listing creation, auction management, chatting with buyers |
| **Buyer** | `buyer@factory.com` | `buyer` | Test marketplace browsing, bidding, and making deposits |
| **Hybrid** | `mixed@factory.com` | `buyer` (can both buy/sell) | Test mixed roles (a factory that buys some waste and sells other waste) |

---

## 4. Seed Data Topology

The seed script (`supabase/seed.sql`) generates the following records:

| Entity | Count | Notes |
|--------|-------|-------|
| `auth.users` | 5 | One for each test account |
| `profiles` | 5 | Maps to `auth.users`, includes `avg_rating` and `total_reviews` for one |
| `notification_preferences` | 5 | Enabled by default for all users |
| `waste_categories` | 5 | 3 Top-level (Metals, Plastics, Textiles), 2 Sub-categories (Copper, PET) |
| `listings` | 3 | 1 Fixed Price, 1 Auction, 1 Sold |
| `bids` | 2 | Bids placed on the active auction listing |
| `bookmarks` | 2 | Buyer bookmarked two listings |
| `chat_threads` | 1 | Buyer inquiring about Copper wire |
| `messages` | 2 | One read, one unread message in the thread |
| `transactions` | 2 | 1 Pending Deposit, 1 Completed |
| `payments` | 2 | Both deposit and remainder paid for the completed transaction |
| `inspection_reports`| 1 | Passed inspection for the completed transaction |
| `reviews` | 1 | 5-star review left by buyer for seller |
| `match_recommendations` | 1 | High score recommendation for the buyer |

## 5. Edge Cases Covered

- **Auction vs Fixed Price:** `mode` constraints strictly tested.
- **Completed Lifecycle:** A transaction that went all the way from purchase to completed, with payments, inspection, and review.
- **Unread Messages:** Testing the `is_read` flag.
- **Denormalized Review Counters:** Database triggers automatically maintain `avg_rating` and `total_reviews` on `profiles`.
