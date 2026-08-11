'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { AlertCircle } from 'lucide-react';
import {
  forwardRef,
  type InputHTMLAttributes,
  type ReactNode,
  useId,
} from 'react';

import { cn } from '@/lib/cn';

// ---------------------------------------------------------------------------
// Input Variants
// ---------------------------------------------------------------------------
const inputVariants = cva(
  [
    'flex w-full rounded-lg border bg-surface px-3 py-2',
    'text-sm text-text-primary placeholder:text-text-muted',
    'transition-colors',
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
// Input Props
// ---------------------------------------------------------------------------
export interface InputProps
  extends
    Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  /** Label displayed above the input */
  label?: string;
  /** Error message displayed below the input */
  error?: string;
  /** Helper text displayed below the input (hidden when error is present) */
  helperText?: string;
  /** Element rendered inside the input on the left */
  leftAddon?: ReactNode;
  /** Element rendered inside the input on the right */
  rightAddon?: ReactNode;
}

// ---------------------------------------------------------------------------
// Input Component
// ---------------------------------------------------------------------------
/**
 * Text input with label, error state, and addon support.
 *
 * @example
 * <Input label="Email" type="email" error={errors.email?.message} />
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      leftAddon,
      rightAddon,
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
          <label htmlFor={id} className="text-text-primary text-sm font-medium">
            {label}
          </label>
        )}

        <div className="relative">
          {leftAddon && (
            <div className="text-text-muted pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              {leftAddon}
            </div>
          )}

          <input
            ref={ref}
            id={id}
            className={cn(
              inputVariants({ state }),
              leftAddon && 'pl-10',
              rightAddon && 'pr-10',
              className
            )}
            aria-invalid={!!error}
            aria-describedby={
              error ? errorId : helperText ? helperId : undefined
            }
            {...props}
          />

          {rightAddon && (
            <div className="text-text-muted absolute inset-y-0 right-0 flex items-center pr-3">
              {rightAddon}
            </div>
          )}
        </div>

        {error && (
          <p
            id={errorId}
            role="alert"
            className="flex items-center gap-1 text-xs text-red-600"
          >
            <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
            {error}
          </p>
        )}

        {!error && helperText && (
          <p id={helperId} className="text-text-secondary text-xs">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input, inputVariants };
