import { forwardRef } from 'react';

import { cn } from '@/lib/cn';

// ---------------------------------------------------------------------------
// Skeleton — Animated loading placeholder
// ---------------------------------------------------------------------------
// A simple pulse-animated placeholder for loading states. Compose multiple
// Skeletons to build content-shaped loading UIs.
//
// Usage:
//   <Skeleton className="h-4 w-32" />                 // Text line
//   <Skeleton className="h-12 w-12 rounded-full" />   // Avatar
//   <Skeleton className="h-48 w-full rounded-lg" />   // Card
// ---------------------------------------------------------------------------

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('bg-surface-muted animate-pulse rounded-md', className)}
        aria-hidden="true"
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';

export { Skeleton };
