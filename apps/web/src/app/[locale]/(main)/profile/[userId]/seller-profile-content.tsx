'use client';

import {
  ArrowLeft,
  Building2,
  Calendar,
  MapPin,
  MessageCircle,
  Star,
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

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
        className="text-text-secondary hover:text-text-primary inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Link>

      {/* Profile Header */}
      <Card>
        <CardContent className="py-6">
          <div className="flex flex-col items-center text-center sm:flex-row sm:gap-6 sm:text-left">
            <Avatar
              src={seller.avatar_url}
              fallback={seller.full_name.charAt(0)}
              size="lg"
              className="h-20 w-20"
            />
            <div className="mt-4 flex-1 sm:mt-0">
              <div className="flex items-center gap-2">
                <h1 className="text-text-primary text-xl font-bold">
                  {seller.full_name}
                </h1>
                {seller.is_verified && (
                  <Badge variant="success" size="sm">
                    Verified
                  </Badge>
                )}
              </div>
              <div className="text-text-secondary mt-1 flex flex-wrap items-center gap-3 text-sm">
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
                  Member since{' '}
                  {new Date(seller.member_since).toLocaleDateString()}
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
                <span className="text-text-primary text-sm font-medium">
                  {seller.avg_rating.toFixed(1)}
                </span>
                <span className="text-text-muted text-xs">
                  ({seller.total_reviews} reviews)
                </span>
              </div>
            </div>

            <Link href={`/${locale}/messages?seller=${userId}`}>
              <Button variant="outline" className="mt-4 gap-2 sm:mt-0">
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
            <p className="text-text-secondary text-sm">{seller.bio}</p>
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
          ) : listings &&
            (listings as Array<Record<string, unknown>>).length > 0 ? (
            <div className="divide-border divide-y">
              {(listings as Array<Record<string, unknown>>)
                .slice(0, 5)
                .map((item) => (
                  <Link
                    key={String(item.id)}
                    href={`/${locale}/marketplace/${item.id}`}
                    className="hover:bg-surface-muted -mx-4 flex items-center gap-3 px-4 py-3 transition-colors"
                  >
                    <div className="bg-surface-muted flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                      <Star className="text-text-muted h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-text-primary truncate text-sm font-medium">
                        {String(item.title ?? 'Listing')}
                      </p>
                      <p className="text-text-secondary text-xs">
                        {String(item.category ?? '')}
                      </p>
                    </div>
                    <span className="text-accent text-sm font-bold">
                      EGP {Number(item.price ?? 0).toLocaleString()}
                    </span>
                  </Link>
                ))}
            </div>
          ) : (
            <p className="text-text-muted py-4 text-center text-sm">
              No active listings
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
