import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type HTMLAttributes, type ImgHTMLAttributes } from 'react';

import { cn } from '@/lib/cn';

// ---------------------------------------------------------------------------
// Avatar Variants
// ---------------------------------------------------------------------------
const avatarVariants = cva(
  'relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary font-semibold text-primary-foreground',
  {
    variants: {
      size: {
        sm: 'h-8 w-8 text-xs',
        md: 'h-10 w-10 text-sm',
        lg: 'h-14 w-14 text-lg',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

// ---------------------------------------------------------------------------
// Avatar Props
// ---------------------------------------------------------------------------
export interface AvatarProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  /** Image URL for the avatar photo */
  src?: string | null;
  /** Alt text for the avatar image */
  alt?: string;
  /** Fallback text (typically user initials) shown when no image */
  fallback?: string;
  /** Show a green online indicator dot */
  showOnline?: boolean;
}

// ---------------------------------------------------------------------------
// Avatar Component
// ---------------------------------------------------------------------------
/**
 * User avatar with image, initials fallback, and optional online indicator.
 * Uses dark green circle with white initials per design reference §3.7.
 *
 * @example
 * <Avatar src={user.avatarUrl} fallback="AS" showOnline />
 * <Avatar fallback="MK" size="lg" />
 */
const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, size, src, alt, fallback, showOnline, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(avatarVariants({ size }), className)}
        {...props}
      >
        {src ? (
          <img
            src={src}
            alt={alt || fallback || 'User avatar'}
            className="h-full w-full object-cover"
          />
        ) : (
          <span aria-hidden="true">{fallback}</span>
        )}

        {showOnline && (
          <span
            className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full border-2 border-surface bg-status-success"
            aria-label="Online"
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

export { Avatar, avatarVariants };
