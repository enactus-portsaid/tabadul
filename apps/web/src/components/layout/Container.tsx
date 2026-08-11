import { type ElementType, forwardRef, type HTMLAttributes } from 'react';

import { cn } from '@/lib/cn';

// ---------------------------------------------------------------------------
// Container Props
// ---------------------------------------------------------------------------
export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  /** Render as a different HTML element (default: `div`) */
  as?: ElementType;
}

// ---------------------------------------------------------------------------
// Container Component
// ---------------------------------------------------------------------------
/**
 * Responsive max-width wrapper for page content.
 * Centers content horizontally with responsive padding.
 *
 * @example
 * <Container>
 *   <h1>Page Title</h1>
 *   <p>Page content...</p>
 * </Container>
 *
 * <Container as="section" className="py-8">
 *   <CardGrid />
 * </Container>
 */
const Container = forwardRef<HTMLElement, ContainerProps>(
  ({ as: Tag = 'div', className, ...props }, ref) => {
    return (
      <Tag
        ref={ref}
        className={cn(
          'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8',
          className
        )}
        {...props}
      />
    );
  }
);

Container.displayName = 'Container';

export { Container };
