'use client';

import {
  AlertTriangle,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Package,
  Shield,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { useState } from 'react';

import { cn } from '@/lib/cn';

// ---------------------------------------------------------------------------
// Admin Sidebar Navigation
// ---------------------------------------------------------------------------
const ADMIN_NAV = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
  { icon: Users, label: 'Users', path: '/admin/users' },
  { icon: Package, label: 'Listings', path: '/admin/listings' },
  { icon: BarChart3, label: 'Transactions', path: '/admin/transactions' },
  { icon: AlertTriangle, label: 'Disputes', path: '/admin/disputes' },
] as const;

// ---------------------------------------------------------------------------
// Admin Shell
// ---------------------------------------------------------------------------
export function AdminShell({ children }: { children: React.ReactNode }) {
  const { locale } = useParams<{ locale: string }>();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-950">
      {/* Admin Sidebar */}
      <aside
        className={cn(
          'border-border bg-surface flex flex-col border-r transition-[width] duration-200',
          collapsed ? 'w-16' : 'w-56'
        )}
      >
        {/* Logo */}
        <div className="border-border flex h-14 items-center border-b px-4">
          <Shield className="text-primary h-6 w-6 shrink-0" />
          {!collapsed && (
            <span className="text-text-primary ml-2 text-sm font-bold">
              Admin Panel
            </span>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-2">
          {ADMIN_NAV.map(({ icon: Icon, label, path }) => {
            const fullPath = `/${locale}${path}`;
            const isActive =
              path === '/admin'
                ? pathname === fullPath
                : pathname.startsWith(fullPath);

            return (
              <Link
                key={path}
                href={fullPath}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-text-secondary hover:bg-surface-muted hover:text-text-primary'
                )}
                title={collapsed ? label : undefined}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {!collapsed && <span>{label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Collapse toggle */}
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="border-border text-text-muted hover:text-text-primary flex h-10 items-center justify-center border-t transition-colors"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6 lg:p-8">{children}</main>
    </div>
  );
}
