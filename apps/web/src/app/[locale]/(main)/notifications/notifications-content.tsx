'use client';

import {
  Bell,
  Check,
  CheckCheck,
  MessageCircle,
  Package,
  Settings,
  ShoppingCart,
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useMemo, useState } from 'react';

import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { useMarkNotificationAsRead, useNotifications } from '@/hooks/api';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/cn';

// ---------------------------------------------------------------------------
// Notification type → icon mapping
// ---------------------------------------------------------------------------
function getNotificationIcon(type: string) {
  switch (type) {
    case 'message':
      return MessageCircle;
    case 'transaction':
      return ShoppingCart;
    case 'listing':
      return Package;
    default:
      return Bell;
  }
}

// ---------------------------------------------------------------------------
// Filter tabs
// ---------------------------------------------------------------------------
const FILTER_TABS = [
  { value: 'all', label: 'All' },
  { value: 'unread', label: 'Unread' },
  { value: 'message', label: 'Messages' },
  { value: 'transaction', label: 'Transactions' },
  { value: 'listing', label: 'Listings' },
] as const;

// ---------------------------------------------------------------------------
// Notifications Content
// ---------------------------------------------------------------------------
export function NotificationsContent() {
  const { locale } = useParams<{ locale: string }>();
  const { user } = useAuth();
  const userId = user?.id ?? '';
  const { data: notifications, isLoading } = useNotifications(userId);
  const markAsRead = useMarkNotificationAsRead();
  const [filter, setFilter] = useState<string>('all');

  const filtered = useMemo(() => {
    if (!notifications) return [];
    const list = notifications as Array<Record<string, unknown>>;
    if (filter === 'all') return list;
    if (filter === 'unread') return list.filter((n) => !n.is_read);
    return list.filter((n) => String(n.type ?? '') === filter);
  }, [notifications, filter]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-text-primary text-2xl font-bold">
            Notifications
          </h1>
          <p className="text-text-secondary text-sm">
            Stay updated with your activity
          </p>
        </div>
        <Link href={`/${locale}/notifications/preferences`}>
          <Button variant="ghost" size="sm" className="gap-1.5">
            <Settings className="h-4 w-4" />
            Preferences
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-1" role="tablist">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={filter === tab.value}
            onClick={() => setFilter(tab.value)}
            className={cn(
              'shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
              filter === tab.value
                ? 'bg-primary text-primary-foreground'
                : 'bg-surface border-border text-text-secondary hover:bg-surface-muted border'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notification List */}
      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="flex items-start gap-3 py-3">
                <Skeleton className="h-8 w-8 rounded-lg" />
                <div className="flex-1 space-y-1">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filtered.length > 0 ? (
        <div className="space-y-2">
          {filtered.map((notif) => {
            const Icon = getNotificationIcon(String(notif.type ?? ''));
            const isRead = Boolean(notif.is_read);

            return (
              <Card
                key={String(notif.id)}
                className={cn(
                  'transition-all',
                  !isRead && 'border-primary/20 bg-primary/5'
                )}
              >
                <CardContent className="flex items-start gap-3 py-3">
                  <div
                    className={cn(
                      'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg',
                      isRead
                        ? 'bg-surface-muted text-text-muted'
                        : 'bg-primary/10 text-primary'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p
                      className={cn(
                        'text-sm',
                        isRead
                          ? 'text-text-secondary'
                          : 'text-text-primary font-medium'
                      )}
                    >
                      {String(notif.title ?? notif.message ?? '')}
                    </p>
                    {typeof notif.body === 'string' && notif.body && (
                      <p className="text-text-muted mt-0.5 line-clamp-2 text-xs">
                        {notif.body}
                      </p>
                    )}
                    <p className="text-text-muted mt-1 text-[10px]">
                      {notif.created_at
                        ? formatTimeAgo(String(notif.created_at))
                        : ''}
                    </p>
                  </div>
                  {!isRead && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => markAsRead.mutate(String(notif.id))}
                      aria-label="Mark as read"
                      className="shrink-0"
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}

          {/* Caught-up banner */}
          {filter === 'unread' && filtered.length === 0 && (
            <div className="py-8 text-center">
              <CheckCheck className="text-primary mx-auto h-8 w-8" />
              <p className="text-text-primary mt-2 text-sm font-medium">
                You&apos;re all caught up!
              </p>
            </div>
          )}
        </div>
      ) : (
        <Card>
          <CardContent className="py-16 text-center">
            <Bell className="text-text-muted mx-auto h-10 w-10" />
            <p className="text-text-primary mt-3 text-sm font-medium">
              No notifications
            </p>
            <p className="text-text-secondary mt-1 text-xs">
              We&apos;ll notify you about important updates
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Time formatting
// ---------------------------------------------------------------------------
function formatTimeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString();
}
