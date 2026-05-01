import { forwardRef } from 'react';

// ---------------------------------------------------------------------------
// Container — Responsive max-width content wrapper
// ---------------------------------------------------------------------------

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Maximum width constraint */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Centers the content horizontally */
  centered?: boolean;
}

const maxWidthClasses: Record<
  NonNullable<ContainerProps['maxWidth']>,
  string
> = {
  sm: 'max-w-2xl',
  md: 'max-w-4xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  full: 'max-w-full',
};

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      maxWidth = 'xl',
      centered = true,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={[
          'px-4 sm:px-6 lg:px-8',
          centered ? 'mx-auto' : '',
          maxWidthClasses[maxWidth],
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = 'Container';
