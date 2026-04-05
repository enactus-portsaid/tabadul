# Tabadul — Project Execution Brief

> **Status:** Active
> **Source Documents:** `/docs/requirements.md`, `/docs/tech-stack.md`, `/docs/architecture/design-patterns.md`
> **Purpose:** Adapts generic phase-driven SOP instructions to fit the specific architecture constraints of Tabadul. Must be checked by any AI agent prior to starting Phase 1+ implementations.

---

## 1. Entity Map

Identified from Phase 0 Requirements phase. Entities represent the tables existing inside the Supabase schema.

| Entity                     | Core Relationships                                     | Used in SOPs                       |
| :------------------------- | :----------------------------------------------------- | :--------------------------------- |
| **Profile**                | 1:1 with `auth.users`, 1:M with Listings, Transactions | SOP-101, SOP-200, SOP-305          |
| **WasteCategory**          | 1:M with Listings                                      | SOP-101, SOP-200                   |
| **Listing**                | M:1 with Profile, M:1 with WasteCategory               | SOP-101, SOP-200, SOP-302, SOP-305 |
| **ListingPhoto**           | M:1 with Listing                                       | SOP-101, SOP-200                   |
| **Bid**                    | M:1 with Listing, M:1 with Profile                     | SOP-101, SOP-200                   |
| **Bookmark**               | M:1 with Listing, M:1 with Profile                     | SOP-101, SOP-200                   |
| **ChatThread**             | M:1 with Listing                                       | SOP-101, SOP-200, SOP-305          |
| **Message**                | M:1 with ChatThread, M:1 with Profile                  | SOP-101, SOP-200                   |
| **Transaction**            | M:1 with Listing, M:1 with Profile (Buyer/Seller)      | SOP-101, SOP-200, SOP-305          |
| **Payment**                | M:1 with Transaction                                   | SOP-101, SOP-200                   |
| **InspectionReport**       | 1:1 with Transaction                                   | SOP-101, SOP-200                   |
| **Review**                 | M:1 with Transaction, M:1 with Profile                 | SOP-101, SOP-200                   |
| **Notification**           | M:1 with Profile                                       | SOP-101, SOP-200                   |
| **NotificationPreference** | 1:1 with Profile                                       | SOP-101, SOP-200                   |
| **Dispute**                | 1:1 with Transaction                                   | SOP-101, SOP-200                   |
| **MatchRecommendation**    | M:1 with Profile, M:1 with Listing                     | SOP-101, SOP-200, SOP-400          |

---

## 2. Tech Stack Adaptations

| SOP Area           | Generic SOP Says                | This Project Uses    | Adaptation                                                                                                |
| :----------------- | :------------------------------ | :------------------- | :-------------------------------------------------------------------------------------------------------- |
| **Database setup** | ORM (Prisma) or raw SQL scripts | Supabase PostgreSQL  | Write raw Supabase migration scripts natively, no Prisma bindings.                                        |
| **API Endpoints**  | Build Express/Next.js REST API  | Supabase BaaS Client | The Database _is_ the API. Build frontend Service Functions using the Supabase JS client.                 |
| **Backend Logic**  | Write server controllers        | Deno Edge Functions  | Use Edge Functions only for security-centric automation (e.g. commission calculation, matching triggers). |
| **Mobile Dev**     | Standalone Repo                 | Expo in Monorepo     | Route UI through `apps/mobile` while keeping logic tied to `packages/shared`.                             |

---

## 3. Pattern Overrides

| Pattern              | SOP Default                  | This Project                  | Reason                                                                                                     |
| :------------------- | :--------------------------- | :---------------------------- | :--------------------------------------------------------------------------------------------------------- |
| **Repository Layer** | `SOP-201-repository-pattern` | Data Access Service Functions | Supabase abstracts data access natively. Wrapping Supabase in a traditional Repository class is redundant. |
| **State Management** | Global Redux                 | TanStack Query + Zustand      | Explicit split between server state (fetched data) vs. client state (UI toggles).                          |
| **Error Handling**   | Throw Error Exceptions       | Result Pattern                | Align with Supabase: return `{ data, error }`.                                                             |

---

## 4. Feature Scope (MVP)

| Feature                    | Priority | Relevant SOPs    | Primary Platforms |
| :------------------------- | :------- | :--------------- | :---------------- |
| **Authentication/Config**  | Must     | SOP-203, SOP-305 | Mobile & Web      |
| **Waste Marketplace Feed** | Must     | SOP-200, SOP-305 | Mobile & Web      |
| **Transactions/InstaPay**  | Must     | SOP-200, SOP-305 | Mobile & Web      |
| **Admin Operations**       | Must     | SOP-200, SOP-305 | Web Only          |
| **Platform Chat**          | Must     | SOP-200, SOP-305 | Mobile & Web      |
| **Logistics Integration**  | Must     | SOP-200, SOP-305 | Web               |

---

## 5. Phase & SOP Relevance

_The following overrides apply to standard sequence rules based on our BaaS structure._

- [x] **Phase 0:** ✅ Executed natively.
- [x] **Phase 1:** ✅ Executed natively (Supabase adaptations applied).
- [ ] **Phase 2 (Backend):**
  - **Execute:** SOP-200 (Service Functions), SOP-203 (Auth Hook), SOP-206 (Zod Validations).
  - **⏭️ Skip:** SOP-201 (Repository Pattern), SOP-202 (API REST Design). _Reason: Supabase handles API generation automagically._
- [ ] **Phase 3 (Frontend):** ✅ Execute iteratively across both Mobile and Web platforms.
- [ ] **Phase 4 (AI Integration):** ✅ Execute later (currently focusing on rule-based math matching per requirements).
- [ ] **Phase 5 (Quality):** ✅
- [ ] **Phase 6 (Deploy):** ✅

---

## 6. Project Constraints

- **Bilingual Core:** UI must natively handle Arabic (RTL) and English (LTR) transitions effortlessly.
- **Transactions are manual:** InstaPay necessitates human verification in the admin panel; no Stripe backend setup needed.
- **Multi-app consistency:** UI and functionality should be natively mirrored across React Native and Web whenever referencing user and buyer actions.
- **Edge Deployment:** Deploy web assets securely utilizing Vercel's zero-config system.

---

## 7. Placeholder Resolution

When prompted by generic SOPs for `[Entity]` implementation, infer using the following rules:

- **Entity**: Relates directly to Tabadul Database items (Listing, Transaction).
- **Service**: Matches `src/services/<domain>.ts` files (e.g. `listing.ts`).
- **Endpoint**: Replaced by Supabase query invocation (`supabase.from('listings').select...`).
- **Schema**: Maps directly to `packages/shared/schemas/`.
