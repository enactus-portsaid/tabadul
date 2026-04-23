// ---------------------------------------------------------------------------
// AppError — Structured error types for the Tabadul platform
// ---------------------------------------------------------------------------
// Provides a consistent error hierarchy used across both apps, hooks, and
// Edge Functions. Replaces traditional Express error middleware with
// portable, serializable error objects that fit the BaaS Result Pattern.
//
// Usage:
//   import { NotFoundError, isAppError } from '@tabadul/shared/lib/errors';
//   throw new NotFoundError('Listing not found', { listingId });
// ---------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// Error Codes — Machine-readable identifiers
// -----------------------------------------------------------------------------

export const ErrorCode = {
  // Client errors (4xx)
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  CONFLICT: 'CONFLICT',
  RATE_LIMIT: 'RATE_LIMIT',

  // Server errors (5xx)
  INTERNAL_ERROR: 'INTERNAL_ERROR',

  // Network / connectivity
  NETWORK_ERROR: 'NETWORK_ERROR',
  TIMEOUT: 'TIMEOUT',

  // Domain-specific
  INVALID_STATE_TRANSITION: 'INVALID_STATE_TRANSITION',
  INSUFFICIENT_PERMISSIONS: 'INSUFFICIENT_PERMISSIONS',
  DUPLICATE_ENTRY: 'DUPLICATE_ENTRY',
} as const;

export type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode];

// -----------------------------------------------------------------------------
// AppError — Base error class
// -----------------------------------------------------------------------------

/**
 * Base error class for all Tabadul application errors.
 *
 * - `code`          — Machine-readable error code (e.g., `NOT_FOUND`)
 * - `statusCode`    — HTTP-equivalent status code for categorization
 * - `isOperational` — `true` if this is an expected error (user input, auth
 *                     failure, etc.). `false` for programming bugs.
 * - `details`       — Optional structured context (field errors, entity IDs, etc.)
 */
export class AppError extends Error {
  public readonly code: ErrorCode;
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly details?: unknown;

  constructor(
    message: string,
    code: ErrorCode,
    statusCode: number,
    isOperational = true,
    details?: unknown
  ) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.details = details;

    // Maintains proper stack trace in V8 (Node / Chrome / RN Hermes)
    if ('captureStackTrace' in Error) {
      (Error as any).captureStackTrace(this, this.constructor);
    }
  }

  /**
   * Serializes the error to a plain object matching the standard API error
   * response format defined in SOP-205.
   */
  toJSON() {
    return {
      error: {
        code: this.code,
        message: this.message,
        ...(this.details !== undefined && { details: this.details }),
      },
    };
  }
}

// -----------------------------------------------------------------------------
// Error Subclasses
// -----------------------------------------------------------------------------

/** 400 — Input/business-rule validation failure */
export class ValidationError extends AppError {
  constructor(message = 'Validation failed', details?: unknown) {
    super(message, ErrorCode.VALIDATION_ERROR, 400, true, details);
  }
}

/** 401 — Missing or invalid authentication */
export class UnauthorizedError extends AppError {
  constructor(message = 'Authentication required', details?: unknown) {
    super(message, ErrorCode.UNAUTHORIZED, 401, true, details);
  }
}

/** 403 — Authenticated but lacks permission */
export class ForbiddenError extends AppError {
  constructor(message = 'Insufficient permissions', details?: unknown) {
    super(message, ErrorCode.FORBIDDEN, 403, true, details);
  }
}

/** 404 — Requested resource does not exist */
export class NotFoundError extends AppError {
  constructor(message = 'Resource not found', details?: unknown) {
    super(message, ErrorCode.NOT_FOUND, 404, true, details);
  }
}

/** 409 — Conflict (duplicate creation, stale update, etc.) */
export class ConflictError extends AppError {
  constructor(message = 'Resource conflict', details?: unknown) {
    super(message, ErrorCode.CONFLICT, 409, true, details);
  }
}

/** 429 — Rate limit exceeded */
export class RateLimitError extends AppError {
  constructor(message = 'Too many requests', details?: unknown) {
    super(message, ErrorCode.RATE_LIMIT, 429, true, details);
  }
}

/** 500 — Unexpected internal error (programming bug) */
export class InternalError extends AppError {
  constructor(message = 'Internal error', details?: unknown) {
    super(message, ErrorCode.INTERNAL_ERROR, 500, false, details);
  }
}

/** 0 — Network / connectivity failure (offline, DNS, CORS, etc.) */
export class NetworkError extends AppError {
  constructor(message = 'Network error', details?: unknown) {
    super(message, ErrorCode.NETWORK_ERROR, 0, true, details);
  }
}

// -----------------------------------------------------------------------------
// Type Guards
// -----------------------------------------------------------------------------

/** Narrows an unknown error to `AppError`. */
export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}

/**
 * Returns `true` if the error is operational (expected user/business error)
 * rather than a programming bug. Useful for deciding whether to show the
 * error message to the user vs. a generic "Something went wrong".
 */
export function isOperationalError(error: unknown): boolean {
  if (isAppError(error)) return error.isOperational;
  return false;
}
