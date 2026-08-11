'use client';

import { Bell, Globe, Menu } from 'lucide-react';
import Link from 'next/link';
import { type HTMLAttributes } from 'react';

import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';

import { Container } from './Container';

// ---------------------------------------------------------------------------
// Header Props
// ---------------------------------------------------------------------------
export interface HeaderProps extends HTMLAttributes<HTMLElement> {
  /** User display name for greeting */
  userName?: string;
  /** User avatar image URL */
  userAvatarUrl?: string | null;
  /** User initials fallback for avatar */
  userInitials?: string;
  /** Current locale ('ar' | 'en') */
  locale?: string;
  /** Unread notification count */
  notificationCount?: number;
  /** Callback when notification bell is clicked */
  onNotificationClick?: () => void;
  /** Callback when language toggle is clicked */
  onLanguageToggle?: () => void;
  /** Callback when mobile menu button is clicked */
  onMenuToggle?: () => void;
}

// ---------------------------------------------------------------------------
// Header Component
// ---------------------------------------------------------------------------
/**
 * App header with primary green background, user greeting, and action buttons.
 * Adapts the design reference §3.1 header banner pattern for responsive web.
 *
 * @example
 * <Header
 *   userName="Ahmed"
 *   userInitials="AE"
 *   notificationCount={3}
 *   locale="en"
 * />
 */
export function Header({
  className,
  userName,
  userAvatarUrl,
  userInitials,
  locale = 'en',
  notificationCount = 0,
  onNotificationClick,
  onLanguageToggle,
  onMenuToggle,
  ...props
}: HeaderProps) {
  return (
    <header
      className={cn('bg-primary text-primary-foreground', className)}
      {...props}
    >
      <Container className="flex h-16 items-center justify-between">
        {/* Left: Menu + Logo */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="text-primary-foreground hover:bg-primary-light lg:hidden"
            onClick={onMenuToggle}
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <Link
            href={`/${locale}`}
            className="text-lg font-bold tracking-tight"
          >
            تبادل
            <span className="ml-1.5 text-sm font-normal opacity-80">
              Tabadul
            </span>
          </Link>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Language Toggle */}
          <Button
            variant="ghost"
            size="sm"
            className="text-primary-foreground hover:bg-primary-light"
            onClick={onLanguageToggle}
            aria-label="Toggle language"
          >
            <Globe className="h-4 w-4" />
            <span className="text-xs font-medium">
              {locale === 'ar' ? 'EN' : 'ع'}
            </span>
          </Button>

          {/* Notification Bell */}
          <Button
            variant="ghost"
            size="sm"
            className="text-primary-foreground hover:bg-primary-light relative"
            onClick={onNotificationClick}
            aria-label={`Notifications${notificationCount > 0 ? ` (${notificationCount} unread)` : ''}`}
          >
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                {notificationCount > 99 ? '99+' : notificationCount}
              </span>
            )}
          </Button>

          {/* User Avatar */}
          {(userAvatarUrl || userInitials) && (
            <Avatar
              src={userAvatarUrl}
              fallback={userInitials}
              size="sm"
              className="border-primary-foreground/20 ml-1 border-2"
            />
          )}
        </div>
      </Container>
    </header>
  );
}
