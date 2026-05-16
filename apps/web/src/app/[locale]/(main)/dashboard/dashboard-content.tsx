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

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { useAuth } from '@/hooks/useAuth';
import { useListings } from '@/hooks/api';
import { useRecommendations } from '@/hooks/api';

// ---------------------------------------------------------------------------
// Dashboard Content — Client Component
// ---------------------------------------------------------------------------
export function DashboardContent() {
  const { locale } = useParams<{ locale: string }>();
  const { user } = useAuth();
  const profileName = user?.profile?.full_name ?? user?.email?.split('@')[0] ?? 'User';
  const isSeller = user?.profile?.role === 'seller';

  return (
    <div className="space-y-6">
      {/* Green Welcome Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-primary to-primary-light px-6 py-8 text-primary-foreground">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm opacity-80">
              {getGreeting()}, 
            </p>
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
      className="flex items-center gap-3 rounded-xl border border-gray-100 bg-surface p-4 transition-all hover:border-primary/20 hover:shadow-md"
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
          color === 'primary' ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent'
        }`}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-text-primary">{label}</p>
        <p className="text-xs text-text-secondary">{description}</p>
      </div>
    </Link>
  );
}

function RecommendationsPreview({ locale, userId }: { locale: string; userId: string }) {
  const { data: recommendations, isLoading } = useRecommendations(userId);

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-primary" />
          AI Recommendations
        </CardTitle>
        <Link
          href={`/${locale}/recommendations`}
          className="text-xs font-medium text-primary hover:text-primary/80 transition-colors"
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
          recommendations.slice(0, 3).map((rec: Record<string, unknown>, i: number) => (
            <Link
              key={i}
              href={`/${locale}/marketplace/${rec.listing_id}`}
              className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-surface-muted"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                <span className="text-sm font-bold text-accent">
                  {typeof rec.match_score === 'number' ? `${rec.match_score}%` : '—'}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-text-primary">
                  {typeof rec.listing_title === 'string' ? rec.listing_title : 'Material Match'}
                </p>
                <p className="truncate text-xs text-text-secondary">
                  {typeof rec.seller_name === 'string' ? rec.seller_name : 'Seller'}
                </p>
              </div>
              <ChevronRight className="h-4 w-4 text-text-muted" />
            </Link>
          ))
        ) : (
          <div className="py-4 text-center">
            <p className="text-sm text-text-secondary">
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
          className="text-xs font-medium text-primary hover:text-primary/80 transition-colors"
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
                className="flex items-center gap-3 py-3 transition-colors hover:bg-surface-muted -mx-4 px-4 first:pt-0 last:pb-0"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-muted">
                  <Package className="h-5 w-5 text-text-muted" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-text-primary">
                    {typeof item.title === 'string' ? item.title : 'Listing'}
                  </p>
                  <p className="truncate text-xs text-text-secondary">
                    {typeof item.category === 'string' ? item.category : ''} · {typeof item.location === 'string' ? item.location : ''}
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
            <Package className="mx-auto h-8 w-8 text-text-muted" />
            <p className="mt-2 text-sm text-text-secondary">
              No listings available yet
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
