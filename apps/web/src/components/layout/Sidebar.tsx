'use client';

import {
  Bell,
  Home,
  LayoutDashboard,
  LogOut,
  MessageCircle,
  Settings,
  ShieldCheck,
  User,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type HTMLAttributes } from 'react';

import { cn } from '@/lib/cn';

// ---------------------------------------------------------------------------
// Sidebar Props
// ---------------------------------------------------------------------------
export interface SidebarProps extends HTMLAttributes<HTMLElement> {
  /** Current locale for link generation */
  locale?: string;
  /** Whether the sidebar is open on mobile */
  isOpen?: boolean;
  /** Callback to close the sidebar (mobile overlay) */
  onClose?: () => void;
  /** Current user role — shows admin section when 'admin' */
  userRole?: 'buyer' | 'seller' | 'admin' | 'inspector';
}

// ---------------------------------------------------------------------------
// Navigation Item Type
// ---------------------------------------------------------------------------
interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

// ---------------------------------------------------------------------------
// Sidebar Component
// ---------------------------------------------------------------------------
/**
 * Responsive sidebar navigation replacing the mobile bottom tab bar.
 * Persistent on desktop (lg+), overlay on mobile/tablet.
 *
 * Maps the 4 prototype tabs (Home, Messages, Notifications, Profile) to a
 * vertical sidebar with an additional admin section for admin users.
 *
 * @example
 * <Sidebar locale="en" isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
 */
export function Sidebar({
  className,
  locale = 'en',
  isOpen = false,
  onClose,
  userRole,
  ...props
}: SidebarProps) {
  const pathname = usePathname();

  const mainNavItems: NavItem[] = [
    { label: 'Home', href: `/${locale}`, icon: Home },
    { label: 'Marketplace', href: `/${locale}/marketplace`, icon: LayoutDashboard },
    { label: 'Messages', href: `/${locale}/messages`, icon: MessageCircle },
    { label: 'Notifications', href: `/${locale}/notifications`, icon: Bell },
    { label: 'Profile', href: `/${locale}/profile`, icon: User },
  ];

  const adminNavItems: NavItem[] = [
    { label: 'Admin Panel', href: `/${locale}/admin`, icon: ShieldCheck },
    { label: 'Settings', href: `/${locale}/admin/settings`, icon: Settings },
  ];

  const isActive = (href: string) => {
    // Exact match for home, prefix match for other routes
    if (href === `/${locale}`) return pathname === href;
    return pathname.startsWith(href);
  };

  const navContent = (
    <>
      {/* Logo / Brand */}
      <div className="flex h-16 items-center justify-between px-4 lg:px-6">
        <Link
          href={`/${locale}`}
          className="text-lg font-bold text-primary"
        >
          تبادل
          <span className="ml-1 text-sm font-normal text-text-secondary">
            Tabadul
          </span>
        </Link>

        {/* Close button — mobile only */}
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-1.5 text-text-secondary transition-colors hover:bg-surface-muted hover:text-text-primary lg:hidden"
          aria-label="Close sidebar"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4" aria-label="Main navigation">
        {mainNavItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                active
                  ? 'bg-primary text-primary-foreground'
                  : 'text-text-secondary hover:bg-surface-muted hover:text-text-primary'
              )}
              aria-current={active ? 'page' : undefined}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Admin Section */}
      {userRole === 'admin' && (
        <div className="border-t border-gray-100 px-3 py-4">
          <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-text-muted">
            Admin
          </p>
          {adminNavItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  active
                    ? 'bg-primary text-primary-foreground'
                    : 'text-text-secondary hover:bg-surface-muted hover:text-text-primary'
                )}
                aria-current={active ? 'page' : undefined}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </div>
      )}

      {/* Bottom: Sign Out */}
      <div className="border-t border-gray-100 px-3 py-4">
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-red-50 hover:text-red-600"
        >
          <LogOut className="h-5 w-5 shrink-0" />
          Sign Out
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Overlay Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
          role="presentation"
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={cn(
          // Base styles
          'flex h-screen flex-col border-r border-gray-100 bg-surface',
          // Desktop: static in layout
          'hidden lg:flex lg:w-64 lg:shrink-0',
          // Mobile: overlay from left
          isOpen &&
            'fixed inset-y-0 left-0 z-50 flex w-72 shadow-xl lg:relative lg:z-auto lg:w-64 lg:shadow-none',
          className
        )}
        {...props}
      >
        {navContent}
      </aside>
    </>
  );
}
