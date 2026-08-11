'use client';

import {
  ArrowRight,
  Boxes,
  ChevronRight,
  Package,
  Plus,
  ShoppingCart,
  TrendingUp,
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { useListings } from '@/hooks/api';
import { useRecommendations } from '@/hooks/api';
import { useAuth } from '@/hooks/useAuth';

// ---------------------------------------------------------------------------
// Dashboard Content — Client Component
// ---------------------------------------------------------------------------
export function DashboardContent() {
  const { locale } = useParams<{ locale: string }>();
  const { user } = useAuth();
  const profileName =
    user?.profile?.full_name ?? user?.email?.split('@')[0] ?? 'User';
  const isSeller = user?.profile?.role === 'seller';

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-40 w-full rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Green Welcome Banner */}
      <div className="from-primary to-primary-light text-primary-foreground rounded-2xl bg-gradient-to-r px-6 py-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm opacity-80">{getGreeting()},</p>
            <h1 className="text-2xl font-bold">{profileName}</h1>
            <p className="text-sm opacity-80">
              {isSeller
                ? 'Manage your listings and track your sales'
                : 'Find the materials your business needs'}
            </p>
          </div>
          <div className="hidden sm:block">
            <Boxes className="h-16 w-16 opacity-20" />
          </div>
        </div>
      </div>

      {/* CTA + Recommendations */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            {isSeller ? (
              <>
                <QuickAction
                  href={`/${locale}/listings/new`}
                  icon={Plus}
                  label="New Listing"
                  description="List materials for sale"
                  color="primary"
                />
                <QuickAction
                  href={`/${locale}/listings/my`}
                  icon={Package}
                  label="My Listings"
                  description="Manage active listings"
                  color="accent"
                />
              </>
            ) : (
              <>
                <QuickAction
                  href={`/${locale}/marketplace`}
                  icon={ShoppingCart}
                  label="Browse Marketplace"
                  description="Find materials to buy"
                  color="primary"
                />
                <QuickAction
                  href={`/${locale}/recommendations`}
                  icon={TrendingUp}
                  label="AI Matches"
                  description="View recommendations"
                  color="accent"
                />
              </>
            )}
          </CardContent>
        </Card>

        {/* Top Recommendations Preview */}
        <RecommendationsPreview locale={locale} userId={user?.id ?? ''} />
      </div>

      {/* Recent Activity */}
      <RecentListings locale={locale} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

function QuickAction({
  href,
  icon: Icon,
  label,
  description,
  color,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  description: string;
  color: 'primary' | 'accent';
}) {
  return (
    <Link
      href={href}
      className="bg-surface hover:border-primary/20 flex items-center gap-3 rounded-xl border border-gray-100 p-4 transition-all hover:shadow-md"
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
          color === 'primary'
            ? 'bg-primary/10 text-primary'
            : 'bg-accent/10 text-accent'
        }`}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <p className="text-text-primary text-sm font-semibold">{label}</p>
        <p className="text-text-secondary text-xs">{description}</p>
      </div>
    </Link>
  );
}

function RecommendationsPreview({
  locale,
  userId,
}: {
  locale: string;
  userId: string;
}) {
  const { data: recommendations, isLoading } = useRecommendations(userId);

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="text-primary h-4 w-4" />
          AI Recommendations
        </CardTitle>
        <Link
          href={`/${locale}/recommendations`}
          className="text-primary hover:text-primary/80 text-xs font-medium transition-colors"
        >
          View All
          <ArrowRight className="ml-1 inline h-3 w-3" />
        </Link>
      </CardHeader>
      <CardContent className="space-y-3">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-lg" />
              <div className="flex-1 space-y-1">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))
        ) : recommendations && recommendations.length > 0 ? (
          recommendations
            .slice(0, 3)
            .map((rec: Record<string, unknown>, i: number) => (
              <Link
                key={i}
                href={`/${locale}/marketplace/${rec.listing_id}`}
                className="hover:bg-surface-muted flex items-center gap-3 rounded-lg p-2 transition-colors"
              >
                <div className="bg-accent/10 flex h-10 w-10 items-center justify-center rounded-lg">
                  <span className="text-accent text-sm font-bold">
                    {typeof rec.match_score === 'number'
                      ? `${rec.match_score}%`
                      : '—'}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-text-primary truncate text-sm font-medium">
                    {typeof rec.listing_title === 'string'
                      ? rec.listing_title
                      : 'Material Match'}
                  </p>
                  <p className="text-text-secondary truncate text-xs">
                    {typeof rec.seller_name === 'string'
                      ? rec.seller_name
                      : 'Seller'}
                  </p>
                </div>
                <ChevronRight className="text-text-muted h-4 w-4" />
              </Link>
            ))
        ) : (
          <div className="py-4 text-center">
            <p className="text-text-secondary text-sm">
              No recommendations yet. Browse the marketplace to get started.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function RecentListings({ locale }: { locale: string }) {
  const { data: listings, isLoading } = useListings();

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Recent Listings</CardTitle>
        <Link
          href={`/${locale}/marketplace`}
          className="text-primary hover:text-primary/80 text-xs font-medium transition-colors"
        >
          View All
          <ArrowRight className="ml-1 inline h-3 w-3" />
        </Link>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-lg" />
                <div className="flex-1 space-y-1">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
            ))}
          </div>
        ) : listings && listings.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {listings.slice(0, 5).map((item: Record<string, unknown>) => (
              <Link
                key={String(item.id)}
                href={`/${locale}/marketplace/${item.id}`}
                className="hover:bg-surface-muted -mx-4 flex items-center gap-3 px-4 py-3 transition-colors first:pt-0 last:pb-0"
              >
                <div className="bg-surface-muted flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                  <Package className="text-text-muted h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-text-primary truncate text-sm font-medium">
                    {typeof item.title === 'string' ? item.title : 'Listing'}
                  </p>
                  <p className="text-text-secondary truncate text-xs">
                    {typeof item.category === 'string' ? item.category : ''} ·{' '}
                    {typeof item.location === 'string' ? item.location : ''}
                  </p>
                </div>
                <Badge variant="accent">
                  EGP {Number(item.price ?? 0).toLocaleString()}
                </Badge>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center">
            <Package className="text-text-muted mx-auto h-8 w-8" />
            <p className="text-text-secondary mt-2 text-sm">
              No listings available yet
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
