// ---------------------------------------------------------------------------
// Error Handler — Centralized error normalization for the Tabadul platform
// ---------------------------------------------------------------------------
// Replaces Express-style error-handling middleware with portable functions
// that convert any error (Supabase PostgrestError, AuthError, network
// failures, unknown throws) into a structured AppError.
//
// Usage (in a hook):
//   import { normalizeError } from '@tabadul/shared/lib/errorHandler';
//
//   const { data, error } = await services.listing.getListing(id);
//   if (error) throw normalizeError(error);
//
// Usage (in a component):
//   import { getDisplayMessage } from '@tabadul/shared/lib/errorHandler';
//   <Text>{t(getDisplayMessage(queryError))}</Text>
// ---------------------------------------------------------------------------

import {
  AppError,
  ConflictError,
  ErrorCode,
  ForbiddenError,
  InternalError,
  isAppError,
  NetworkError,
  NotFoundError,
  RateLimitError,
  UnauthorizedError,
  ValidationError,
} from './errors';
import {
  FALLBACK_ERROR_KEY,
  getErrorMessageKey,
  getFallbackMessage,
} from './errorMessages';

// -----------------------------------------------------------------------------
// Supabase Error Shape Interfaces
// -----------------------------------------------------------------------------
// These mirror Supabase's error objects without importing the full SDK,
// keeping this module dependency-free.

/** Shape of `@supabase/postgrest-js` PostgrestError */
interface PostgrestErrorLike {
  message: string;
  code: string;
  details: string;
  hint: string;
}

/** Shape of `@supabase/supabase-js` AuthError */
interface AuthErrorLike {
  message: string;
  status?: number;
  name?: string;
}

// -----------------------------------------------------------------------------
// Type Guards for Supabase Errors
// -----------------------------------------------------------------------------

function isPostgrestError(error: unknown): error is PostgrestErrorLike {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    'details' in error &&
    'hint' in error &&
    'message' in error
  );
}

function isAuthError(error: unknown): error is AuthErrorLike {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    ('status' in error || (error as any)?.name === 'AuthApiError')
  );
}

function isNetworkError(error: unknown): boolean {
  if (error instanceof TypeError) {
    // Fetch API throws TypeError for network failures
    const msg = error.message.toLowerCase();
    return (
      msg.includes('fetch') ||
      msg.includes('network') ||
      msg.includes('failed') ||
      msg.includes('aborted')
    );
  }
  return false;
}

// -----------------------------------------------------------------------------
// PostgreSQL Error Code Mappings
// -----------------------------------------------------------------------------
// See: https://www.postgresql.org/docs/current/errcodes-appendix.html

const POSTGRES_CODE_MAP: Record<string, () => AppError> = {
  // Unique violation
  '23505': () => new ConflictError('A duplicate entry was detected.'),
  // Foreign key violation
  '23503': () =>
    new ValidationError('Referenced resource does not exist.'),
  // Not null violation
  '23502': () => new ValidationError('A required field is missing.'),
  // Check constraint violation
  '23514': () => new ValidationError('A value constraint was violated.'),
  // Insufficient privilege
  '42501': () => new ForbiddenError('Insufficient database privileges.'),
  // RLS violation (Supabase returns this for policy failures)
  'PGRST301': () => new NotFoundError(),
};

// -----------------------------------------------------------------------------
// Auth Error Message Mappings
// -----------------------------------------------------------------------------

const AUTH_MESSAGE_MAP: Array<{
  pattern: RegExp;
  factory: (msg: string) => AppError;
}> = [
  {
    pattern: /invalid.*credentials|invalid.*password|invalid.*email/i,
    factory: () =>
      new UnauthorizedError('Invalid email or password.'),
  },
  {
    pattern: /email.*already.*registered|user.*already.*registered/i,
    factory: () =>
      new ConflictError('An account with this email already exists.'),
  },
  {
    pattern: /email.*not.*confirmed/i,
    factory: () =>
      new UnauthorizedError('Please confirm your email address.'),
  },
  {
    pattern: /session.*expired|token.*expired|jwt.*expired/i,
    factory: () =>
      new UnauthorizedError('Your session has expired. Please sign in again.'),
  },
  {
    pattern: /too.*many.*requests|rate.*limit/i,
    factory: () => new RateLimitError(),
  },
  {
    pattern: /weak.*password|password.*too.*short/i,
    factory: (msg) => new ValidationError(msg),
  },
  {
    pattern: /signup.*disabled|signups.*not.*allowed/i,
    factory: () =>
      new ForbiddenError('New registrations are currently disabled.'),
  },
];

// -----------------------------------------------------------------------------
// Core: normalizeError
// -----------------------------------------------------------------------------

/**
 * Converts any error into a structured `AppError`.
 *
 * This is the central error normalization function — the BaaS equivalent
 * of SOP-205's "centralized error handler middleware". Call it wherever
 * you need to classify an unknown error.
 *
 * Handles:
 * - `AppError` instances (pass-through)
 * - Supabase `PostgrestError` (mapped via PostgreSQL error codes)
 * - Supabase `AuthError` (mapped via message pattern matching)
 * - Network/fetch errors (`TypeError`)
 * - Generic `Error` objects (wrapped as `InternalError`)
 * - Non-Error throws (stringified and wrapped)
 */
export function normalizeError(error: unknown): AppError {
  // 1. Already an AppError — pass through
  if (isAppError(error)) {
    return error;
  }

  // 2. Supabase Postgrest error
  if (isPostgrestError(error)) {
    return normalizePostgrestError(error);
  }

  // 3. Supabase Auth error
  if (isAuthError(error)) {
    return normalizeAuthError(error);
  }

  // 4. Network / fetch failure
  if (isNetworkError(error)) {
    return new NetworkError((error as TypeError).message);
  }

  // 5. Generic Error
  if (error instanceof Error) {
    return new InternalError(error.message);
  }

  // 6. Non-Error throw (string, number, etc.)
  return new InternalError(String(error));
}

// -----------------------------------------------------------------------------
// Postgrest Error Normalization
// -----------------------------------------------------------------------------

function normalizePostgrestError(error: PostgrestErrorLike): AppError {
  // Check known PostgreSQL error codes
  const factory = POSTGRES_CODE_MAP[error.code];
  if (factory) {
    const appError = factory();
    // Preserve original details for debugging
    return new (appError.constructor as new (
      m: string,
      d?: unknown
    ) => AppError)(appError.message, {
      postgrestCode: error.code,
      postgrestDetails: error.details,
      postgrestHint: error.hint,
    });
  }

  // Supabase returns PGRST116 when .single() finds no rows
  if (error.code === 'PGRST116') {
    return new NotFoundError('Resource not found', {
      postgrestDetails: error.details,
    });
  }

  // Default: treat as internal error
  return new InternalError(error.message, {
    postgrestCode: error.code,
    postgrestDetails: error.details,
    postgrestHint: error.hint,
  });
}

// -----------------------------------------------------------------------------
// Auth Error Normalization
// -----------------------------------------------------------------------------

function normalizeAuthError(error: AuthErrorLike): AppError {
  const msg = error.message;

  // Try pattern matching on the message
  for (const { pattern, factory } of AUTH_MESSAGE_MAP) {
    if (pattern.test(msg)) {
      return factory(msg);
    }
  }

  // Fall back by HTTP status
  const status = error.status ?? 500;
  if (status === 401) return new UnauthorizedError(msg);
  if (status === 403) return new ForbiddenError(msg);
  if (status === 404) return new NotFoundError(msg);
  if (status === 422) return new ValidationError(msg);
  if (status === 429) return new RateLimitError(msg);

  return new InternalError(msg);
}

// -----------------------------------------------------------------------------
// UI Helper: getDisplayMessage
// -----------------------------------------------------------------------------

/**
 * Returns the i18n translation key for displaying an error message in the UI.
 *
 * Use with `useTranslation()`:
 * ```tsx
 * const { t } = useTranslation();
 * if (error) return <Text>{t(getDisplayMessage(error))}</Text>;
 * ```
 *
 * For non-operational errors (programming bugs), returns a generic
 * "Something went wrong" key to avoid leaking internal details.
 */
export function getDisplayMessage(error: unknown): string {
  const normalized = isAppError(error) ? error : normalizeError(error);

  // Never expose internal error details to the user
  if (!normalized.isOperational) {
    return FALLBACK_ERROR_KEY;
  }

  return getErrorMessageKey(normalized.code);
}

// -----------------------------------------------------------------------------
// Retry Helper
// -----------------------------------------------------------------------------

/**
 * Determines whether an error is worth retrying.
 *
 * Retryable errors:
 * - Network failures (device is offline, DNS, CORS)
 * - Rate limiting (429 — retry after backoff)
 * - Timeouts
 *
 * Non-retryable errors:
 * - Validation (400), Auth (401), Forbidden (403), Not Found (404),
 *   Conflict (409), Internal (500)
 */
export function isRetryableError(error: unknown): boolean {
  const normalized = isAppError(error) ? error : normalizeError(error);

  return (
    normalized.code === ErrorCode.NETWORK_ERROR ||
    normalized.code === ErrorCode.RATE_LIMIT ||
    normalized.code === ErrorCode.TIMEOUT
  );
}
