'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Bell } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import {
  useNotificationPreferences,
  useUpdateNotificationPreferences,
} from '@/hooks/api';
import { useAuth } from '@/hooks/useAuth';

// ---------------------------------------------------------------------------
// Preference categories
// ---------------------------------------------------------------------------
const PREF_ITEMS = [
  { key: 'messages', label: 'Messages', description: 'When you receive a new chat message' },
  { key: 'transactions', label: 'Transactions', description: 'Status updates on your transactions' },
  { key: 'listings', label: 'Listings', description: 'When someone bids on or bookmarks your listing' },
  { key: 'recommendations', label: 'AI Recommendations', description: 'New AI-matched materials for you' },
  { key: 'system', label: 'System Updates', description: 'Platform announcements and updates' },
] as const;

// ---------------------------------------------------------------------------
// Preferences Content
// ---------------------------------------------------------------------------
export function PreferencesContent() {
  const { locale } = useParams<{ locale: string }>();
  const { user } = useAuth();
  const userId = user?.id ?? '';
  const { data: prefs, isLoading } = useNotificationPreferences(userId);
  const updatePrefs = useUpdateNotificationPreferences();

  const [localPrefs, setLocalPrefs] = useState<Record<string, boolean>>({});

  // Merge remote + local state
  const getChecked = (key: string) => {
    if (key in localPrefs) return localPrefs[key];
    if (prefs && typeof prefs === 'object') {
      return Boolean((prefs as Record<string, unknown>)[key] ?? true);
    }
    return true;
  };

  const handleToggle = (key: string) => {
    const newValue = !getChecked(key);
    setLocalPrefs((prev) => ({ ...prev, [key]: newValue }));
    updatePrefs.mutate({
      userId,
      data: { [key]: newValue },
    });
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Link
        href={`/${locale}/notifications`}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Notifications
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-text-primary">Notification Preferences</h1>
        <p className="text-sm text-text-secondary">
          Choose which notifications you want to receive
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y divide-border">
          {isLoading
            ? Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between py-4">
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-56" />
                  </div>
                  <Skeleton className="h-6 w-11 rounded-full" />
                </div>
              ))
            : PREF_ITEMS.map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between py-4"
                >
                  <div>
                    <p className="text-sm font-medium text-text-primary">
                      {item.label}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {item.description}
                    </p>
                  </div>
                  {/* Toggle Switch */}
                  <button
                    type="button"
                    role="switch"
                    aria-checked={getChecked(item.key)}
                    onClick={() => handleToggle(item.key)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${
                      getChecked(item.key)
                        ? 'bg-primary'
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
                        getChecked(item.key) ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              ))}
        </CardContent>
      </Card>
    </div>
  );
}
