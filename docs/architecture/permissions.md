# Tabadul — Authorization Model

> **Status:** Approved  
> **Last Updated:** 2026-04-12  
> **SOP:** SOP-204 (Authorization)

---

## 1. Overview

Tabadul uses a BaaS-Driven approach with **Supabase Row Level Security (RLS)** as the primary authorization mechanism. Traditional backend `authorize.ts` middleware validation is replaced by database enforced policies and frontend Route Guards to hide pages/buttons.

### Defense-in-Depth

1. **Frontend / UI**: Buttons are conditionally rendered using `packages/shared/src/utils/permissions.ts`.
2. **Route Guards**: Inaccessible pages redirect users (Next.js Edge Middleware & Expo Router AuthGuard).
3. **Database RLS**: Deepest layer. PostgreSQL prevents unauthorized users from altering records via API manipulation, regardless of frontend UI bugs.

---

## 2. Roles

The `role` is stored in the `profiles` table as a `user_role` Postgres enum:

| Role        | Purpose                                                                |
| ----------- | ---------------------------------------------------------------------- |
| `buyer`     | User looking to acquire waste materials. Can place bids, chat, buy.    |
| `seller`    | Factory generating waste. Can post listings, chat, accept payments.    |
| `inspector` | Middleman who physically visits goods and writes `inspection_reports`. |
| `admin`     | Internal platform administrator. Resolves disputes, verifies payments. |

---

## 3. Permissions Matrix & RLS Mappings

This describes the exact PostgreSQL RLS logic implemented via `00002_rls_policies.sql`.

### Read Policies (SELECT)

| Resource         | Buyers       | Sellers               | Admins | Inspectors                   |
| :--------------- | :----------- | :-------------------- | :----- | :--------------------------- |
| **Listings**     | Active only  | Active + Own Drafts   | All    | Active + explicitly assigned |
| **Transactions** | Involved in  | Involved in           | All    | Only assigned                |
| **Chat Threads** | Participant  | Participant           | All    | 🚫 None                      |
| **Messages**     | Participant  | Participant           | All    | 🚫 None                      |
| **Payments**     | Own payments | Payments for own txns | All    | 🚫 None                      |
| **Disputes**     | Own disputes | Disputes on own txns  | All    | 🚫 None                      |

### Write Policies (INSERT/UPDATE/DELETE)

| Resource               | Operation            | Allowed Actor                                                  |
| :--------------------- | :------------------- | :------------------------------------------------------------- |
| **Listings**           | INSERT/UPDATE/DELETE | The `seller` who owns it. `admin` can UPDATE/DELETE.           |
| **Bids**               | INSERT               | `buyer` only.                                                  |
| **Chat Threads**       | INSERT               | `buyer`.                                                       |
| **Transactions**       | INSERT / UPDATE      | Participants (buyer creates, both can update status). `admin`. |
| **Payments**           | INSERT               | `buyer` who is paying.                                         |
| **Payments**           | UPDATE (verify)      | `admin`.                                                       |
| **Disputes**           | INSERT               | Any user involved in transaction.                              |
| **Disputes**           | UPDATE (resolve)     | `admin`.                                                       |
| **Inspection Reports** | INSERT/UPDATE        | `inspector`. `admin` manages all.                              |

---

## 4. Implementation Helper Functions

For frontend components, do not duplicate conditional `user.role === 'something'` everywhere. Use the shared permissions file `packages/shared/src/utils/permissions.ts`.

### Example Usage:

```tsx
import {
  canEditListing,
  canVerifyPayment,
} from '@tabadul/shared/utils/permissions';
import { useAuth } from '@/hooks/useAuth';

export function ListingCard({ listing }) {
  const { profile } = useAuth(); // profile includes { id, role }

  return (
    <Card>
      <Title>{listing.title}</Title>

      {canEditListing(profile, listing.seller_id) && (
        <Button>Edit Listing</Button>
      )}

      {canVerifyPayment(profile) && <Button>Admin: Verify Funds</Button>}
    </Card>
  );
}
```
