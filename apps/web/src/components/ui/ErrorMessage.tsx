'use client';

import {
  getDisplayMessage,
  isRetryableError,
} from '@tabadul/shared/lib/errorHandler';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { forwardRef, useCallback } from 'react';

import { cn } from '@/lib/cn';

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

export interface ErrorMessageProps extends React.HTMLAttributes<HTMLDivElement> {
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
          className={cn('text-status-pending text-sm', className)}
          {...props}
        >
          <span>{messageKey}</span>
          {(canRetry || onRetry) && (
            <button
              type="button"
              onClick={handleRetry}
              className="text-accent hover:text-accent-light ml-2 underline"
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
          'border-status-pending/20 bg-status-pending/5 flex flex-col items-center gap-3 rounded-lg border px-6 py-8 text-center',
          className
        )}
        {...props}
      >
        <AlertCircle className="text-status-pending h-10 w-10" />
        <p className="text-text-primary text-sm font-medium">{messageKey}</p>
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
