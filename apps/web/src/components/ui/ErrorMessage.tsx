'use client';

import { AlertCircle, RefreshCw } from 'lucide-react';
import { forwardRef, useCallback } from 'react';

import { cn } from '@/lib/cn';
import {
  getDisplayMessage,
  isRetryableError,
} from '@tabadul/shared/lib/errorHandler';

import { Button } from './Button';

// ---------------------------------------------------------------------------
// ErrorMessage — Error display with optional retry
// ---------------------------------------------------------------------------
// Integrates with the SOP-205 error handling system:
// - Uses `getDisplayMessage()` for i18n-ready error keys
// - Uses `isRetryableError()` to conditionally show the retry button
//
// Usage:
//   <ErrorMessage error={error} onRetry={refetch} />
// ---------------------------------------------------------------------------

export interface ErrorMessageProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** The error object from a TanStack Query or service call. */
  error: unknown;
  /** Optional retry callback (e.g., `refetch` from `useQuery`). */
  onRetry?: () => void;
  /** Compact mode — inline, no icon. */
  compact?: boolean;
}

const ErrorMessage = forwardRef<HTMLDivElement, ErrorMessageProps>(
  ({ error, onRetry, compact = false, className, ...props }, ref) => {
    const messageKey = getDisplayMessage(error);
    const canRetry = isRetryableError(error);

    const handleRetry = useCallback(() => {
      onRetry?.();
    }, [onRetry]);

    if (compact) {
      return (
        <div
          ref={ref}
          role="alert"
          className={cn('text-sm text-status-pending', className)}
          {...props}
        >
          <span>{messageKey}</span>
          {(canRetry || onRetry) && (
            <button
              type="button"
              onClick={handleRetry}
              className="ml-2 text-accent underline hover:text-accent-light"
            >
              Retry
            </button>
          )}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          'flex flex-col items-center gap-3 rounded-lg border border-status-pending/20 bg-status-pending/5 px-6 py-8 text-center',
          className
        )}
        {...props}
      >
        <AlertCircle className="h-10 w-10 text-status-pending" />
        <p className="text-sm font-medium text-text-primary">{messageKey}</p>
        {(canRetry || onRetry) && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleRetry}
            className="mt-1"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        )}
      </div>
    );
  }
);

ErrorMessage.displayName = 'ErrorMessage';

export { ErrorMessage };
