'use client';

import { Bookmark, Package, Search } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { useListings } from '@/hooks/api';

// ---------------------------------------------------------------------------
// Saved Listings Content
// ---------------------------------------------------------------------------
export function SavedContent() {
  const { locale } = useParams<{ locale: string }>();
  // TODO: Replace with useBookmarks(userId) when available
  const { data: listings, isLoading } = useListings();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-text-primary text-2xl font-bold">Saved Listings</h1>
        <p className="text-text-secondary text-sm">
          Your bookmarked materials for quick access
        </p>
      </div>

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <Skeleton className="aspect-[4/3] w-full" />
              <CardContent className="space-y-2 p-4">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : listings &&
        (listings as Array<Record<string, unknown>>).length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(listings as Array<Record<string, unknown>>)
            .slice(0, 6)
            .map((item) => (
              <Link
                key={String(item.id)}
                href={`/${locale}/marketplace/${item.id}`}
              >
                <Card className="group overflow-hidden transition-all hover:shadow-md">
                  <div className="bg-surface-muted relative aspect-[4/3]">
                    {typeof item.image_url === 'string' ? (
                      <img
                        src={item.image_url}
                        alt={String(item.title ?? '')}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <Package className="text-text-muted h-8 w-8" />
                      </div>
                    )}
                    <div className="absolute top-2 right-2">
                      <Bookmark className="fill-accent text-accent h-5 w-5" />
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-text-primary group-hover:text-primary truncate text-sm font-semibold">
                      {String(item.title ?? 'Untitled')}
                    </h3>
                    <p className="text-text-secondary mt-1 text-xs">
                      {String(item.category ?? '')} ·{' '}
                      {String(item.location ?? '')}
                    </p>
                    <p className="text-accent mt-2 text-sm font-bold">
                      EGP {Number(item.price ?? 0).toLocaleString()}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-16 text-center">
            <Bookmark className="text-text-muted mx-auto h-10 w-10" />
            <p className="text-text-primary mt-3 text-sm font-medium">
              No saved listings
            </p>
            <p className="text-text-secondary mt-1 text-xs">
              Bookmark listings from the marketplace to save them here
            </p>
            <Link href={`/${locale}/marketplace`} className="mt-4 inline-block">
              <Button className="gap-2">
                <Search className="h-4 w-4" />
                Browse Marketplace
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
