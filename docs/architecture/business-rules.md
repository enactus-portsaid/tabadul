# Tabadul — Business Rules

This document outlines the core business logic and rules handled by the Tabadul Service Layer.

## Authentication & Profiles (`auth.ts`)

- **Profile Initialization:** A user's profile is automatically created via Supabase Auth triggers when they sign up. The `auth` service fetches and updates profile data based on standard auth tokens.

## Listings (`listing.ts`)

- **Visibility:** Only listings with a status of `active` are visible in the general feed or search results.
- **Deactivation:** Sellers can deactivate listings if they decide not to sell or if it violates terms.

## Transactions (`transaction.ts`)

- **Lifecycle Management:** Transactions proceed through strict status updates: `pending_deposit` -> `deposit_paid` -> `deposit_verified` -> `inspection_scheduled` -> `inspection_passed` (or `inspection_failed`) -> `shipping` -> `delivered` -> `approved`.
- **Payment Receipts:** Buyers upload their InstaPay receipts. Only Admins can officially transition a payment status to `verified`.
- **Disputes:** Users can file disputes on a transaction. This blocks further auto-processing.

## Chats (`chat.ts`)

- **Thread Initialization:** A new chat thread is created between the buyer and listing owner when the buyer sends their first message. If a thread already exists for that specific `(listing_id, buyer_id)`, it is reused.
- **Message Read States:** A user can mark all messages in a thread as read where they are NOT the sender.

## Matching (`matching.ts`)

- **AI Recommendation Filtering:** Users can dismiss specific match recommendations to filter them out of future views.

## Inspections (`inspection.ts`)

- **Verification Trigger:** Only assigned middleman inspectors can post inspection reports (`pass` or `fail`). The report attaches directly to the ongoing transaction and includes inspection photo proofs.

## Notifications (`notification.ts`)

- **Read State:** Notifications have an exact count of unread items, allowing the front-end to show notification badges.
- **Preferences:** Users can toggle individual categories (matches, messages, transactions) to determine what sends push notifications.

## Admin Operations (`admin.ts`)

- **Payment Verification:** Admins check physical / digital bank deposits against uploaded InstaPay receipts and verify them, which progresses the core Transaction lifecycle state.
- **Dispute Resolution:** Admins have tools to investigate and resolve open disputes to either `resolved_buyer` or `resolved_seller`.
- **Moderation:** Admins can enforce deactivation of any listing across the platform upon TOS violation.
