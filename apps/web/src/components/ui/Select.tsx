'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { AlertCircle, ChevronDown } from 'lucide-react';
import { forwardRef, type SelectHTMLAttributes, useId } from 'react';

import { cn } from '@/lib/cn';

// ---------------------------------------------------------------------------
// Select Variants
// ---------------------------------------------------------------------------
const selectVariants = cva(
  [
    'flex w-full appearance-none rounded-lg border bg-surface px-3 py-2 pe-9',
    'text-sm text-text-primary',
    'transition-colors cursor-pointer',
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
// Select Props
// ---------------------------------------------------------------------------
export interface SelectProps
  extends
    SelectHTMLAttributes<HTMLSelectElement>,
    VariantProps<typeof selectVariants> {
  /** Label displayed above the select */
  label?: string;
  /** Error message displayed below the select */
  error?: string;
  /** Helper text displayed below the select (hidden when error is present) */
  helperText?: string;
  /** Placeholder option text */
  placeholder?: string;
  /** Options to render */
  options: Array<{ value: string; label: string }>;
}

// ---------------------------------------------------------------------------
// Select Component
// ---------------------------------------------------------------------------
/**
 * Styled native select with label, error state, and option support.
 *
 * @example
 * <Select
 *   label="Role"
 *   options={[{ value: 'buyer', label: 'Buyer' }, { value: 'seller', label: 'Seller' }]}
 *   error={errors.role?.message}
 * />
 */
const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      placeholder,
      options,
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
          <label
            htmlFor={id}
            className={cn(
              'text-text-primary text-sm font-medium',
              error && 'text-red-600 dark:text-red-400'
            )}
          >
            {label}
          </label>
        )}

        <div className="relative">
          <select
            ref={ref}
            id={id}
            className={cn(selectVariants({ state }), className)}
            aria-invalid={!!error}
            aria-describedby={
              error ? errorId : helperText ? helperId : undefined
            }
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown
            className="text-text-muted pointer-events-none absolute end-3 top-1/2 h-4 w-4 -translate-y-1/2"
            aria-hidden="true"
          />
        </div>

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
          <p id={helperId} className="text-text-secondary text-xs">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export { Select, selectVariants };
