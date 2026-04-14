// ---------------------------------------------------------------------------
// Error Messages — i18n-ready user-friendly error message mappings
// ---------------------------------------------------------------------------
// Maps ErrorCode values to i18n translation keys. These keys correspond to
// entries in packages/shared/locales/{ar,en}.json and follow the same
// key-naming pattern used in auth schemas (e.g., 'auth.validation.emailRequired').
//
// Usage:
//   import { getErrorMessageKey } from '@tabadul/shared/lib/errorMessages';
//   const key = getErrorMessageKey('NOT_FOUND');
//   // => 'errors.notFound'
//   const text = t(key); // via i18next
// ---------------------------------------------------------------------------

import type { ErrorCode } from './errors';

// -----------------------------------------------------------------------------
// Generic Error Message Keys
// -----------------------------------------------------------------------------

/**
 * Maps each `ErrorCode` to a generic i18n translation key.
 * Components should use `t(key)` to display the translated message.
 */
export const ERROR_MESSAGE_KEYS: Record<ErrorCode, string> = {
  VALIDATION_ERROR: 'errors.validationError',
  UNAUTHORIZED: 'errors.unauthorized',
  FORBIDDEN: 'errors.forbidden',
  NOT_FOUND: 'errors.notFound',
  CONFLICT: 'errors.conflict',
  RATE_LIMIT: 'errors.rateLimit',
  INTERNAL_ERROR: 'errors.internalError',
  NETWORK_ERROR: 'errors.networkError',
  TIMEOUT: 'errors.timeout',
  INVALID_STATE_TRANSITION: 'errors.invalidStateTransition',
  INSUFFICIENT_PERMISSIONS: 'errors.insufficientPermissions',
  DUPLICATE_ENTRY: 'errors.duplicateEntry',
};

/**
 * Fallback i18n key used when the error code is unknown or unmapped.
 */
export const FALLBACK_ERROR_KEY = 'errors.unknown';

/**
 * Returns the i18n key for a given error code.
 * Falls back to `errors.unknown` for unrecognized codes.
 */
export function getErrorMessageKey(code: ErrorCode | string): string {
  return (
    ERROR_MESSAGE_KEYS[code as ErrorCode] ?? FALLBACK_ERROR_KEY
  );
}

// -----------------------------------------------------------------------------
// Domain-Specific Error Message Keys
// -----------------------------------------------------------------------------

/**
 * Domain-scoped i18n keys for more specific error messages.
 * Use these in service functions and hooks when the generic message
 * is too vague (e.g., "Not found" → "Listing not found").
 *
 * Example:
 *   throw new NotFoundError(DOMAIN_ERROR_KEYS.listing.notFound);
 *   // In the component: t(error.message) → "Listing not found"
 */
export const DOMAIN_ERROR_KEYS = {
  listing: {
    notFound: 'errors.listing.notFound',
    alreadyDeactivated: 'errors.listing.alreadyDeactivated',
    cannotBidOwnListing: 'errors.listing.cannotBidOwnListing',
    auctionEnded: 'errors.listing.auctionEnded',
  },
  transaction: {
    notFound: 'errors.transaction.notFound',
    invalidTransition: 'errors.transaction.invalidTransition',
    alreadyPaid: 'errors.transaction.alreadyPaid',
    cannotReviewSelf: 'errors.transaction.cannotReviewSelf',
  },
  payment: {
    notFound: 'errors.payment.notFound',
    alreadyVerified: 'errors.payment.alreadyVerified',
    invalidAmount: 'errors.payment.invalidAmount',
  },
  chat: {
    threadNotFound: 'errors.chat.threadNotFound',
    cannotChatSelf: 'errors.chat.cannotChatSelf',
  },
  inspection: {
    notAssigned: 'errors.inspection.notAssigned',
    alreadySubmitted: 'errors.inspection.alreadySubmitted',
  },
  dispute: {
    notFound: 'errors.dispute.notFound',
    alreadyResolved: 'errors.dispute.alreadyResolved',
  },
  auth: {
    invalidCredentials: 'errors.auth.invalidCredentials',
    emailAlreadyRegistered: 'errors.auth.emailAlreadyRegistered',
    weakPassword: 'errors.auth.weakPassword',
    sessionExpired: 'errors.auth.sessionExpired',
    emailNotConfirmed: 'errors.auth.emailNotConfirmed',
  },
} as const;

// -----------------------------------------------------------------------------
// Fallback Messages (English) — used when i18n is not available
// -----------------------------------------------------------------------------

/**
 * Plain English fallback messages for environments where i18n is not
 * initialized (e.g., Edge Functions, server logs, early app boot).
 * These are NOT shown to end-users in the normal flow.
 */
export const FALLBACK_MESSAGES: Record<string, string> = {
  // Generic
  'errors.validationError': 'The provided data is invalid.',
  'errors.unauthorized': 'You must be signed in to perform this action.',
  'errors.forbidden': 'You do not have permission to perform this action.',
  'errors.notFound': 'The requested resource was not found.',
  'errors.conflict': 'This resource already exists or has been modified.',
  'errors.rateLimit': 'Too many requests. Please try again later.',
  'errors.internalError': 'Something went wrong. Please try again.',
  'errors.networkError':
    'Unable to connect. Please check your internet connection.',
  'errors.timeout': 'The request timed out. Please try again.',
  'errors.invalidStateTransition':
    'This action is not allowed in the current state.',
  'errors.insufficientPermissions':
    'You do not have the required permissions.',
  'errors.duplicateEntry': 'A duplicate entry was detected.',
  'errors.unknown': 'An unexpected error occurred.',
};

/**
 * Returns a plain English fallback message for a given i18n key.
 * Used when the i18n system is unavailable.
 */
export function getFallbackMessage(i18nKey: string): string {
  return FALLBACK_MESSAGES[i18nKey] ?? FALLBACK_MESSAGES['errors.unknown']!;
}
