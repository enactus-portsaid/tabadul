# Database Decision

> **Status:** Approved
> **Last Updated:** 2026-03-09
> **SOP:** SOP-100 (Database Selection)

## 1. Selected Stack

- **Database Engine:** PostgreSQL (Version 15+)
- **Hosting Provider:** Supabase
- **ORM / Client:** Supabase JS Client (`@supabase/supabase-js` & `@supabase/ssr`)

## 2. Requirements Analysis

The Tabadul platform requires a database that supports:
- **Relational Data:** Complex relationships between factories (users), waste listings, transactions, payments, inspections, and reviews.
- **ACID Transactions:** Financial integrity for deposit payments, remainders, and commissions.
- **Real-time Capabilities:** For the auction system (live bids) and chat messaging.
- **Flexible Metadata:** Storing variable attributes for waste categories and inspection reports (JSONB).

## 3. Rationale

**Why PostgreSQL?**
The B2B marketplace model is inherently relational. A factory can act as both buyer and seller, connected through transactions involving specific listings. PostgreSQL natively enforces referential integrity, supports robust querying (including full-text search for discovery), and offers JSONB for flexible data when needed.

**Why Supabase for Hosting?**
Supabase provides a complete backend-as-a-service centered around PostgreSQL. It offers:
- A generous free tier (500 MB DB, 50K MAU) suitable for the MVP.
- Row Level Security (RLS) directly in the database for access control.
- Built-in Auth, Storage (for photos and receipts), and Realtime (for chat and auctions).

**Why Supabase JS Client?**
Using the native Supabase client avoids the overhead of a heavy ORM like Prisma or TypeORM. It integrates seamlessly into both React Native and Next.js, allowing the same queries to be run on edge functions and client applications natively, aligning with the BaaS-driven architecture.

## 4. Alternatives Considered and Rejected

- **Internal / Dedicated PostgreSQL (e.g., Railway, Neon):** While these are excellent SQL hosts, they lack the integrated Auth, Storage, and Realtime features that Supabase provides out-of-the-box, which would require significant additional development time.
- **Firebase / Firestore (NoSQL):** The NoSQL document model is a poor fit for highly relational marketplace data with complex joins (e.g., matching users to transactions to listings). It also loses referential integrity and requires complex security rules compared to PostgreSQL's native RLS.
- **MongoDB:** Flexible schema, but lacks ACID compliance assurances for the complex financial workflows and referential integrity needed for order management.
