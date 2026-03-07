# Tabadul — Environment Variables

> **Status:** Approved  
> **Last Updated:** 2026-03-07  
> **SOP:** SOP-004 (Environment Setup)

---

## 1. Overview

Tabadul uses environment variables to configure connections to Supabase, control feature flags, and set application behavior. Variables are managed via `.env` files (never committed) with `.env.example` as the template.

**Key Conventions:**

- `EXPO_PUBLIC_` prefix → exposed to React Native client (Expo)
- `NEXT_PUBLIC_` prefix → exposed to Next.js client (browser)
- No prefix → server-side only (Edge Functions, SSR, scripts)
- **Never commit real secrets** — `.env` is in `.gitignore`

---

## 2. Required Variables

These must be set for the application to function.

| Variable                        | Description                              | Example                     | Used By                             |
| ------------------------------- | ---------------------------------------- | --------------------------- | ----------------------------------- |
| `SUPABASE_URL`                  | Supabase project URL                     | `https://xxxxx.supabase.co` | Server-side (Edge Functions, SSR)   |
| `SUPABASE_ANON_KEY`             | Supabase anonymous (public) API key      | `eyJhbGciOiJI...`           | Server-side fallback                |
| `SUPABASE_SERVICE_ROLE_KEY`     | Supabase service role key (bypasses RLS) | `eyJhbGciOiJI...`           | Server-side only (admin operations) |
| `EXPO_PUBLIC_SUPABASE_URL`      | Supabase URL for mobile app              | `https://xxxxx.supabase.co` | Mobile (Expo)                       |
| `EXPO_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key for mobile app         | `eyJhbGciOiJI...`           | Mobile (Expo)                       |
| `NEXT_PUBLIC_SUPABASE_URL`      | Supabase URL for web app                 | `https://xxxxx.supabase.co` | Web (Next.js)                       |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key for web app            | `eyJhbGciOiJI...`           | Web (Next.js)                       |
| `NEXT_PUBLIC_APP_URL`           | Web application base URL                 | `http://localhost:3000`     | Web (Next.js)                       |

---

## 3. Optional Variables

These have sensible defaults and only need to be set when overriding.

| Variable                     | Description                                     | Default                  |
| ---------------------------- | ----------------------------------------------- | ------------------------ |
| `NODE_ENV`                   | Runtime environment                             | `development`            |
| `PORT`                       | Web app port                                    | `3000`                   |
| `NEXT_PUBLIC_DEFAULT_LOCALE` | Default UI language (`ar` or `en`)              | `ar`                     |
| `DATABASE_URL`               | Direct PostgreSQL connection string (local dev) | Set by `supabase start`  |
| `SUPABASE_STUDIO_URL`        | Local Supabase Studio dashboard URL             | `http://127.0.0.1:54323` |
| `SUPABASE_INBUCKET_URL`      | Local email testing inbox URL                   | `http://127.0.0.1:54324` |

---

## 4. Feature Flags

Toggle features on/off without code changes.

| Variable                                | Description                          | Default |
| --------------------------------------- | ------------------------------------ | ------- |
| `NEXT_PUBLIC_ENABLE_AI_MATCHING`        | Enable rule-based AI matching engine | `false` |
| `NEXT_PUBLIC_ENABLE_CHAT_MODERATION`    | Enable chat moderation Edge Function | `false` |
| `EXPO_PUBLIC_ENABLE_PUSH_NOTIFICATIONS` | Enable push notifications on mobile  | `false` |

---

## 5. How to Obtain Values

### Supabase Cloud (Staging / Production)

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Select the **Tabadul** project
3. Navigate to **Settings → API**
4. Copy:
   - **Project URL** → `SUPABASE_URL`, `EXPO_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `SUPABASE_ANON_KEY`, `EXPO_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY`

### Supabase Local Development

1. Install the Supabase CLI: `npm install -g supabase`
2. Run `supabase start` from the project root
3. The CLI prints all local URLs and keys — copy them into `.env`

Typical local values:

```
SUPABASE_URL=http://127.0.0.1:54321
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...  (printed by CLI)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...  (printed by CLI)
DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:54322/postgres
```

---

## 6. Environment-Specific Values

| Variable              | Development                    | Staging                           | Production                |
| --------------------- | ------------------------------ | --------------------------------- | ------------------------- |
| `SUPABASE_URL`        | `http://127.0.0.1:54321`       | `https://xxx-staging.supabase.co` | `https://xxx.supabase.co` |
| `NEXT_PUBLIC_APP_URL` | `http://localhost:3000`        | `https://staging.tabadul.app`     | `https://tabadul.app`     |
| `NODE_ENV`            | `development`                  | `staging`                         | `production`              |
| Feature flags         | All `false` (enable as needed) | Selectively enabled               | Enabled per release       |

---

## 7. Security Rules

1. **Never commit `.env` files** — they are excluded via `.gitignore`
2. **`SUPABASE_SERVICE_ROLE_KEY`** must only be used server-side (Edge Functions, SSR server actions). Never expose it to the client.
3. **Anon keys are safe for client-side use** — they are rate-limited and governed by RLS policies.
4. **Rotate keys** if a secret is accidentally committed:
   - Supabase Dashboard → Settings → API → Regenerate keys
   - Update all `.env` files and deployment secrets
5. **Production secrets** are set in deployment platform settings (Vercel environment variables, EAS secrets), never in files.

---

## 8. Adding New Variables

When adding a new environment variable:

1. Add it to `.env.example` with a placeholder value and descriptive comment
2. Update this document with its description, example, and whether it's required
3. Update `/docs/development-setup.md` if it affects the setup flow
4. If client-accessible, use the appropriate prefix (`EXPO_PUBLIC_` or `NEXT_PUBLIC_`)
5. Add validation in the app config layer (`src/config/`) to fail fast on missing required vars
