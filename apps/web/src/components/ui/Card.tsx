import { forwardRef, type HTMLAttributes } from 'react';

import { cn } from '@/lib/cn';

// ---------------------------------------------------------------------------
// Card (Root)
// ---------------------------------------------------------------------------
export interface CardProps extends HTMLAttributes<HTMLDivElement> {}

/**
 * Card container — the root of the compound Card pattern.
 * White surface with rounded corners and subtle shadow on cream background.
 *
 * @example
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Title</CardTitle>
 *   </CardHeader>
 *   <CardContent>Body content</CardContent>
 *   <CardFooter>Actions</CardFooter>
 * </Card>
 */
const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'bg-surface rounded-xl border border-gray-100 shadow-sm',
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';

// ---------------------------------------------------------------------------
// CardHeader
// ---------------------------------------------------------------------------
export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex flex-col gap-1.5 p-4 pb-0', className)}
        {...props}
      />
    );
  }
);

CardHeader.displayName = 'CardHeader';

// ---------------------------------------------------------------------------
// CardTitle
// ---------------------------------------------------------------------------
export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={cn('text-text-primary text-base font-semibold', className)}
        {...props}
      />
    );
  }
);

CardTitle.displayName = 'CardTitle';

// ---------------------------------------------------------------------------
// CardContent
// ---------------------------------------------------------------------------
export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {}

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn('p-4', className)} {...props} />;
  }
);

CardContent.displayName = 'CardContent';

// ---------------------------------------------------------------------------
// CardFooter
// ---------------------------------------------------------------------------
export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {}

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-center gap-2 p-4 pt-0', className)}
        {...props}
      />
    );
  }
);

CardFooter.displayName = 'CardFooter';

export { Card, CardContent, CardFooter, CardHeader, CardTitle };
