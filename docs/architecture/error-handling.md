# Tabadul — Error Handling Architecture

> **Status:** Approved  
> **Last Updated:** 2026-04-14  
> **SOP:** SOP-205 (Error Handling)

---

## 1. Overview

Tabadul uses a **Result Pattern**-based error handling strategy adapted for the BaaS-Driven Layered Architecture. Since there is no Express server, traditional middleware-based error catching is replaced with:

1. **Structured error types** — `AppError` class hierarchy in the shared package
2. **Error normalization** — Functions that convert any Supabase/network/unknown error into a typed `AppError`
3. **i18n-ready messages** — Every error maps to a translation key for bilingual (AR/EN) display

### Defense-in-Depth Error Flow

```
Supabase Response ({ data, error })
        │
        ▼
  Service Layer ──── Returns { data, error } as-is (Result Pattern)
        │
        ▼
  Hook Layer (TanStack Query) ──── queryFn throws on error
        │                          normalizeError() classifies it
        ▼
  Component Layer ──── Renders error via getDisplayMessage()
        │               uses t(key) for i18n translation
        ▼
  Error Boundary ──── Catches unexpected rendering errors (safety net)
```

---

## 2. Standard Error Response Format

All errors, whether from Supabase, Edge Functions, or application code, are normalized to this structure:

```typescript
interface ApiError {
  error: {
    code: string;    // Machine-readable: "NOT_FOUND", "VALIDATION_ERROR"
    message: string; // Human-readable (or i18n key)
    details?: unknown; // Additional context (field errors, entity IDs, etc.)
  };
}
```

This is implemented by `AppError.toJSON()` in `packages/shared/src/lib/errors.ts`.

---

## 3. Error Code Catalog

### Generic Error Codes

| Code | HTTP Status | Description | When to Use |
|:-----|:------------|:------------|:------------|
| `VALIDATION_ERROR` | 400 | Input or business rule violation | Invalid form data, constraint failures |
| `UNAUTHORIZED` | 401 | Missing or invalid authentication | Expired session, bad credentials |
| `FORBIDDEN` | 403 | Authenticated but lacks permission | Wrong role, RLS policy rejection |
| `NOT_FOUND` | 404 | Resource does not exist | Entity lookup returns null |
| `CONFLICT` | 409 | Duplicate or stale resource | Unique constraint violation |
| `RATE_LIMIT` | 429 | Too many requests | Supabase rate limiting |
| `INTERNAL_ERROR` | 500 | Unexpected server error | Programming bugs, unhandled exceptions |
| `NETWORK_ERROR` | 0 | Connectivity failure | Offline device, DNS failure |
| `TIMEOUT` | 0 | Request timed out | Slow network or server |
| `INVALID_STATE_TRANSITION` | 400 | Invalid status change | e.g., paying a cancelled transaction |
| `INSUFFICIENT_PERMISSIONS` | 403 | Missing specific permission | Fine-grained permission failure |
| `DUPLICATE_ENTRY` | 409 | Exact duplicate detected | Re-submitting the same entity |

### Error Class Hierarchy

```
Error (built-in)
 └── AppError (base — code, statusCode, isOperational, details)
      ├── ValidationError    (400, VALIDATION_ERROR)
      ├── UnauthorizedError  (401, UNAUTHORIZED)
      ├── ForbiddenError     (403, FORBIDDEN)
      ├── NotFoundError      (404, NOT_FOUND)
      ├── ConflictError      (409, CONFLICT)
      ├── RateLimitError     (429, RATE_LIMIT)
      ├── InternalError      (500, INTERNAL_ERROR, isOperational=false)
      └── NetworkError       (0,   NETWORK_ERROR)
```

---

## 4. Error Normalization

The `normalizeError(error: unknown): AppError` function in `packages/shared/src/lib/errorHandler.ts` converts any error into a typed `AppError`:

| Input Error Type | Normalization Logic |
|:-----|:-----|
| `AppError` | Pass-through |
| Supabase `PostgrestError` | Map by PostgreSQL error code (e.g., 23505 → `ConflictError`) |
| Supabase `AuthError` | Pattern-match message, fall back to HTTP status |
| `TypeError` (fetch/network) | → `NetworkError` |
| Generic `Error` | → `InternalError` |
| Non-Error (string, etc.) | Stringify → `InternalError` |

### PostgreSQL Error Code Mappings

| PG Code | AppError Class | Description |
|:--------|:---------------|:------------|
| `23505` | `ConflictError` | Unique violation |
| `23503` | `ValidationError` | Foreign key violation |
| `23502` | `ValidationError` | Not-null violation |
| `23514` | `ValidationError` | Check constraint violation |
| `42501` | `ForbiddenError` | Insufficient privilege |
| `PGRST301` | `NotFoundError` | RLS policy denial |
| `PGRST116` | `NotFoundError` | `.single()` returned no rows |

---

## 5. Usage Patterns

### Service Layer — No Changes Required

Services continue to return `{ data, error }` as-is (Result Pattern). They do **not** normalize errors — that's the hook's responsibility.

```typescript
// packages/shared/src/services/listing.ts — unchanged
async getListing(id: string) {
  return supabase.from('listings').select('*').eq('id', id).single();
}
```

### Hook Layer — Normalize in queryFn

```typescript
// hooks/useListing.ts
import { useQuery } from '@tanstack/react-query';
import { normalizeError } from '@tabadul/shared/lib/errorHandler';
import { listingKeys } from '@/lib/queryKeys';

export function useListing(id: string) {
  return useQuery({
    queryKey: listingKeys.detail(id),
    queryFn: async () => {
      const { data, error } = await services.listing.getListing(id);
      if (error) throw normalizeError(error);
      return data;
    },
  });
}
```

### Mutation — Normalize in onError

```typescript
// hooks/useCreateListing.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { normalizeError, isRetryableError } from '@tabadul/shared/lib/errorHandler';

export function useCreateListing() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateListingInput) => {
      const { data, error } = await services.listing.createListing(input);
      if (error) throw normalizeError(error);
      return data;
    },
    retry: (failureCount, error) =>
      failureCount < 3 && isRetryableError(error),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: listingKeys.lists() });
    },
  });
}
```

### Component Layer — Display Translated Messages

```tsx
// components/features/ListingDetail.tsx
import { getDisplayMessage } from '@tabadul/shared/lib/errorHandler';
import { isAppError, NotFoundError } from '@tabadul/shared/lib/errors';
import { useTranslation } from 'react-i18next';

export function ListingDetail({ id }: Props) {
  const { t } = useTranslation();
  const { data, isLoading, error } = useListing(id);

  if (isLoading) return <LoadingSkeleton />;

  if (error) {
    // Specific handling for known error types
    if (isAppError(error) && error instanceof NotFoundError) {
      return <EmptyState message={t('errors.listing.notFound')} />;
    }
    // Generic error display
    return <ErrorMessage message={t(getDisplayMessage(error))} />;
  }

  return <ListingView listing={data} />;
}
```

### Edge Functions — Structured JSON Responses

```typescript
// supabase/functions/match-listings/index.ts
import { AppError, ValidationError, InternalError } from '../../shared/errors';

Deno.serve(async (req) => {
  try {
    const body = await req.json();
    if (!body.listing_id) {
      throw new ValidationError('listing_id is required');
    }

    // ... matching logic ...

    return new Response(JSON.stringify({ data: matches }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    const appError =
      error instanceof AppError
        ? error
        : new InternalError('Matching failed');

    return new Response(JSON.stringify(appError.toJSON()), {
      status: appError.statusCode || 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});
```

---

## 6. Operational vs. Programming Errors

| Category | `isOperational` | User Sees | Action |
|:---------|:----------------|:----------|:-------|
| **Operational** (expected) | `true` | Translated error message | User can retry or fix input |
| **Programming** (bug) | `false` | Generic "Something went wrong" | Log/report, don't expose details |

All error subclasses except `InternalError` default to `isOperational = true`. Use `isOperationalError(error)` to check.

---

## 7. File Manifest

| File | Purpose |
|:-----|:--------|
| `packages/shared/src/lib/errors.ts` | `AppError` class hierarchy, `ErrorCode` enum, type guards |
| `packages/shared/src/lib/errorMessages.ts` | i18n key mappings, domain-specific keys, English fallbacks |
| `packages/shared/src/lib/errorHandler.ts` | `normalizeError()`, `getDisplayMessage()`, `isRetryableError()` |
| `docs/architecture/error-handling.md` | This document |

---

## 8. Review Checklist

- [x] Standard error response format defined (`AppError.toJSON()`)
- [x] All `AppError` subclasses created (8 subclasses)
- [x] Error handler normalizes all error sources (Postgrest, Auth, network, unknown)
- [x] Programming errors do not expose internal details (`isOperational` flag)
- [x] Error codes documented with HTTP status mappings
- [x] User-friendly i18n messages mapped for all error codes
- [x] Domain-specific error keys defined for all entities
- [x] Usage examples provided for every layer (service, hook, component, Edge Function)
