'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowLeft,
  Building2,
  Calendar,
  MapPin,
  MessageCircle,
  Star,
} from 'lucide-react';

import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { useListings } from '@/hooks/api';

// ---------------------------------------------------------------------------
// Seller Profile Content
// ---------------------------------------------------------------------------
export function SellerProfileContent() {
  const { locale, userId } = useParams<{ locale: string; userId: string }>();
  // TODO: Replace with usePublicProfile(userId) when available
  const { data: listings, isLoading } = useListings();

  // Placeholder seller data (would come from usePublicProfile)
  const seller = {
    full_name: 'Seller',
    company_name: 'Industrial Co.',
    avatar_url: null,
    location: 'Cairo, Egypt',
    bio: 'Industrial waste materials supplier since 2020.',
    avg_rating: 4.5,
    total_reviews: 12,
    is_verified: true,
    member_since: '2024-01-15',
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link
        href={`/${locale}/marketplace`}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Link>

      {/* Profile Header */}
      <Card>
        <CardContent className="py-6">
          <div className="flex flex-col items-center text-center sm:flex-row sm:text-left sm:gap-6">
            <Avatar
              src={seller.avatar_url}
              fallback={seller.full_name.charAt(0)}
              size="lg"
              className="h-20 w-20"
            />
            <div className="mt-4 flex-1 sm:mt-0">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-text-primary">
                  {seller.full_name}
                </h1>
                {seller.is_verified && (
                  <Badge variant="success" size="sm">Verified</Badge>
                )}
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-text-secondary">
                <span className="flex items-center gap-1">
                  <Building2 className="h-3.5 w-3.5" />
                  {seller.company_name}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {seller.location}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  Member since {new Date(seller.member_since).toLocaleDateString()}
                </span>
              </div>

              {/* Rating */}
              <div className="mt-3 flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(seller.avg_rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-text-primary">
                  {seller.avg_rating.toFixed(1)}
                </span>
                <span className="text-xs text-text-muted">
                  ({seller.total_reviews} reviews)
                </span>
              </div>
            </div>

            <Link href={`/${locale}/messages?seller=${userId}`}>
              <Button variant="outline" className="gap-2 mt-4 sm:mt-0">
                <MessageCircle className="h-4 w-4" />
                Contact
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Bio */}
      {seller.bio && (
        <Card>
          <CardHeader>
            <CardTitle>About</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-text-secondary">{seller.bio}</p>
          </CardContent>
        </Card>
      )}

      {/* Seller's Listings */}
      <Card>
        <CardHeader>
          <CardTitle>Active Listings</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : listings && (listings as Array<Record<string, unknown>>).length > 0 ? (
            <div className="divide-y divide-border">
              {(listings as Array<Record<string, unknown>>).slice(0, 5).map((item) => (
                <Link
                  key={String(item.id)}
                  href={`/${locale}/marketplace/${item.id}`}
                  className="flex items-center gap-3 py-3 transition-colors hover:bg-surface-muted -mx-4 px-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-muted">
                    <Star className="h-5 w-5 text-text-muted" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-text-primary">
                      {String(item.title ?? 'Listing')}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {String(item.category ?? '')}
                    </p>
                  </div>
                  <span className="text-sm font-bold text-accent">
                    EGP {Number(item.price ?? 0).toLocaleString()}
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <p className="py-4 text-center text-sm text-text-muted">
              No active listings
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
