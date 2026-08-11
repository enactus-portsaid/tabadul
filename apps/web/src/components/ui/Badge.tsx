import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type HTMLAttributes } from 'react';

import { cn } from '@/lib/cn';

// ---------------------------------------------------------------------------
// Badge Variants
// ---------------------------------------------------------------------------
const badgeVariants = cva(
  'inline-flex items-center rounded-full font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-gray-100 text-text-primary',
        success: 'bg-emerald-50 text-status-active',
        warning: 'bg-amber-50 text-status-pending',
        danger: 'bg-red-50 text-red-700',
        info: 'bg-blue-50 text-blue-700',
        accent: 'bg-accent/10 text-accent',
      },
      size: {
        sm: 'px-2 py-0.5 text-[11px]',
        md: 'px-2.5 py-0.5 text-xs',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

// ---------------------------------------------------------------------------
// Badge Props
// ---------------------------------------------------------------------------
export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

// ---------------------------------------------------------------------------
// Badge Component
// ---------------------------------------------------------------------------
/**
 * Small label for status, category, or metadata display.
 *
 * @example
 * <Badge variant="success">Active</Badge>
 * <Badge variant="warning" size="sm">Pending</Badge>
 */
const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';

export { Badge, badgeVariants };
