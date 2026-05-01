import { forwardRef } from 'react';

// ---------------------------------------------------------------------------
// Avatar — Circular user avatar with initial fallback
// ---------------------------------------------------------------------------

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Image URL (renders img if provided) */
  src?: string | null;
  /** User's full name (used for alt text and initial fallback) */
  name: string;
  /** Size preset */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Show online indicator dot */
  online?: boolean;
}

const sizeClasses: Record<NonNullable<AvatarProps['size']>, string> = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
  xl: 'h-16 w-16 text-lg',
};

const onlineDotSize: Record<NonNullable<AvatarProps['size']>, string> = {
  sm: 'h-2 w-2',
  md: 'h-2.5 w-2.5',
  lg: 'h-3 w-3',
  xl: 'h-3.5 w-3.5',
};

function getInitial(name: string): string {
  return name.charAt(0).toUpperCase();
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    { src, name, size = 'md', online, className = '', ...props },
    ref
  ) => {
    return (
      <div ref={ref} className={['relative inline-flex', className].join(' ')} {...props}>
        <div
          className={[
            'inline-flex items-center justify-center rounded-full font-semibold',
            'bg-primary text-primary-foreground',
            sizeClasses[size],
          ].join(' ')}
        >
          {src ? (
            <img
              src={src}
              alt={name}
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            <span>{getInitial(name)}</span>
          )}
        </div>
        {online && (
          <span
            className={[
              'absolute bottom-0 end-0 rounded-full bg-status-success ring-2 ring-surface',
              onlineDotSize[size],
            ].join(' ')}
            aria-label="Online"
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';
