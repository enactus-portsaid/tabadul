'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { AlertCircle } from 'lucide-react';
import {
  forwardRef,
  type ReactNode,
  type TextareaHTMLAttributes,
  useId,
} from 'react';

import { cn } from '@/lib/cn';

// ---------------------------------------------------------------------------
// Textarea Variants
// ---------------------------------------------------------------------------
const textareaVariants = cva(
  [
    'flex w-full rounded-lg border bg-surface px-3 py-2',
    'text-sm text-text-primary placeholder:text-text-muted',
    'transition-colors resize-y min-h-[80px]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ],
  {
    variants: {
      state: {
        default:
          'border-gray-200 focus-visible:border-primary focus-visible:ring-primary/20',
        error:
          'border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20',
      },
    },
    defaultVariants: {
      state: 'default',
    },
  }
);

// ---------------------------------------------------------------------------
// Textarea Props
// ---------------------------------------------------------------------------
export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  /** Label displayed above the textarea */
  label?: string;
  /** Error message displayed below the textarea */
  error?: string;
  /** Helper text displayed below the textarea (hidden when error is present) */
  helperText?: string;
  /** Character count display */
  maxLength?: number;
  /** Current character count (shown when maxLength is provided) */
  charCount?: number;
}

// ---------------------------------------------------------------------------
// Textarea Component
// ---------------------------------------------------------------------------
/**
 * Multi-line text input with label, error state, and character count support.
 *
 * @example
 * <Textarea label="Description" error={errors.description?.message} maxLength={1000} />
 */
const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      maxLength,
      charCount,
      id: externalId,
      ...props
    },
    ref
  ) => {
    const autoId = useId();
    const id = externalId || autoId;
    const errorId = `${id}-error`;
    const helperId = `${id}-helper`;
    const state = error ? 'error' : 'default';

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <div className="flex items-center justify-between">
            <label
              htmlFor={id}
              className={cn(
                'text-sm font-medium text-text-primary',
                error && 'text-red-600 dark:text-red-400'
              )}
            >
              {label}
            </label>
            {maxLength != null && charCount != null && (
              <span
                className={cn(
                  'text-xs text-text-muted',
                  charCount > maxLength && 'text-red-600 dark:text-red-400'
                )}
              >
                {charCount}/{maxLength}
              </span>
            )}
          </div>
        )}

        <textarea
          ref={ref}
          id={id}
          className={cn(textareaVariants({ state }), className)}
          aria-invalid={!!error}
          aria-describedby={
            error ? errorId : helperText ? helperId : undefined
          }
          maxLength={maxLength}
          {...props}
        />

        {error && (
          <p
            id={errorId}
            role="alert"
            className="flex items-center gap-1 text-xs text-red-600 dark:text-red-400"
          >
            <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
            {error}
          </p>
        )}

        {!error && helperText && (
          <p id={helperId} className="text-xs text-text-secondary">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea, textareaVariants };
