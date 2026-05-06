'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';

import { cn } from '@/lib/cn';

// ---------------------------------------------------------------------------
// Button Variants
// ---------------------------------------------------------------------------
const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2',
    'rounded-lg font-medium transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-primary-foreground hover:bg-primary-light focus-visible:ring-primary',
        secondary:
          'bg-surface text-text-primary border border-gray-200 hover:bg-surface-muted focus-visible:ring-primary',
        outline:
          'border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground focus-visible:ring-primary',
        ghost:
          'text-text-primary hover:bg-surface-muted focus-visible:ring-primary',
        danger:
          'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

// ---------------------------------------------------------------------------
// Button Props
// ---------------------------------------------------------------------------
export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Show a loading spinner and disable the button */
  isLoading?: boolean;
  /** Icon element rendered before the label */
  leftIcon?: ReactNode;
  /** Icon element rendered after the label */
  rightIcon?: ReactNode;
}

// ---------------------------------------------------------------------------
// Button Component
// ---------------------------------------------------------------------------
/**
 * Primary interactive element for user actions.
 *
 * @example
 * <Button variant="primary" size="md" isLoading={isPending}>
 *   Submit
 * </Button>
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
