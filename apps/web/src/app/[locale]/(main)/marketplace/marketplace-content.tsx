'use client';

import {
  ChevronLeft,
  ChevronRight,
  Grid3X3,
  List,
  Plus,
  Search,
  SlidersHorizontal,
} from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Skeleton } from '@/components/ui/Skeleton';
import { useListings } from '@/hooks/api';
import { cn } from '@/lib/cn';

// ---------------------------------------------------------------------------
// Filter chip categories
// ---------------------------------------------------------------------------
const CATEGORIES = [
  { value: 'all', label: 'All Materials' },
  { value: 'metals', label: 'Metals' },
  { value: 'plastics', label: 'Plastics' },
  { value: 'chemicals', label: 'Chemicals' },
  { value: 'textiles', label: 'Textiles' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'wood', label: 'Wood' },
  { value: 'other', label: 'Other' },
] as const;

// ---------------------------------------------------------------------------
// Marketplace Content — Client Component
// ---------------------------------------------------------------------------
export function MarketplaceContent() {
  const { locale } = useParams<{ locale: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();

  const category = searchParams.get('category') ?? 'all';
  const search = searchParams.get('q') ?? '';

  const [searchInput, setSearchInput] = useState(search);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Build filter params matching the hook's signature
  const filterParams = category !== 'all' ? { wasteType: category } : undefined;
  const { data: listings, isLoading } = useListings(filterParams);

  // URL state updater
  const updateParams = useCallback(
    (updates: Record<string, string | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value === undefined || value === '' || value === 'all') {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [searchParams, router]
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateParams({ q: searchInput });
  };

  // Filter listings client-side by search term (hooks don't support search)
  const filteredListings = listings
    ? (listings as Array<Record<string, unknown>>).filter((item) => {
        if (!search) return true;
        const title = String(item.title ?? '').toLowerCase();
        const cat = String(item.category ?? '').toLowerCase();
        return (
          title.includes(search.toLowerCase()) ||
          cat.includes(search.toLowerCase())
        );
      })
    : [];

  const resultCount = filteredListings.length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-text-primary text-2xl font-bold">Marketplace</h1>
          <p className="text-text-secondary text-sm">
            Browse available industrial waste materials
          </p>
        </div>
        <Link href={`/${locale}/listings/new`}>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Listing
          </Button>
        </Link>
      </div>

      {/* Search + Filters Bar */}
      <div className="space-y-4">
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search materials..."
            leftAddon={<Search className="h-4 w-4" />}
            className="flex-1"
          />
          <Button type="submit" variant="outline" size="sm">
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </form>

        {/* Category Chips */}
        <div
          className="scrollbar-none flex gap-2 overflow-x-auto pb-1"
          role="tablist"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              type="button"
              role="tab"
              aria-selected={category === cat.value}
              onClick={() => updateParams({ category: cat.value })}
              className={cn(
                'shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
                category === cat.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-surface border-border text-text-secondary hover:bg-surface-muted border'
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Sort + View Toggle */}
        <div className="flex items-center justify-between">
          <span className="text-text-muted text-xs">{resultCount} results</span>
          <div className="hidden gap-1 sm:flex">
            <Button
              variant={viewMode === 'grid' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              aria-label="Grid view"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              aria-label="List view"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Listings Grid / List */}
      {isLoading ? (
        <div
          className={cn(
            'grid gap-4',
            viewMode === 'grid'
              ? 'sm:grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-1'
          )}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <ListingCardSkeleton key={i} viewMode={viewMode} />
          ))}
        </div>
      ) : filteredListings.length > 0 ? (
        <div
          className={cn(
            'grid gap-4',
            viewMode === 'grid'
              ? 'sm:grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-1'
          )}
        >
          {filteredListings.map((listing) => (
            <ListingCard
              key={String(listing.id)}
              listing={listing}
              locale={locale}
              viewMode={viewMode}
            />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-16 text-center">
            <Search className="text-text-muted mx-auto h-10 w-10" />
            <p className="text-text-primary mt-3 text-sm font-medium">
              No listings found
            </p>
            <p className="text-text-secondary mt-1 text-xs">
              Try adjusting your filters or search terms
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Listing Card
// ---------------------------------------------------------------------------
function ListingCard({
  listing,
  locale,
  viewMode,
}: {
  listing: Record<string, unknown>;
  locale: string;
  viewMode: 'grid' | 'list';
}) {
  const isGrid = viewMode === 'grid';

  return (
    <Link href={`/${locale}/marketplace/${listing.id}`}>
      <Card
        className={cn(
          'group hover:border-primary/20 overflow-hidden transition-all hover:shadow-md',
          !isGrid && 'flex'
        )}
      >
        {/* Image */}
        <div
          className={cn(
            'bg-surface-muted',
            isGrid ? 'aspect-[4/3]' : 'h-28 w-28 shrink-0 sm:h-32 sm:w-32'
          )}
        >
          {typeof listing.image_url === 'string' ? (
            <img
              src={listing.image_url}
              alt={String(listing.title ?? '')}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <Search className="text-text-muted h-8 w-8" />
            </div>
          )}
        </div>

        {/* Details */}
        <CardContent className={cn('flex-1', isGrid ? 'p-4' : 'py-3')}>
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-text-primary group-hover:text-primary line-clamp-1 text-sm font-semibold transition-colors">
              {String(listing.title ?? 'Untitled')}
            </h3>
            <Badge variant="default" className="shrink-0 text-xs">
              {String(listing.listing_type ?? 'Fixed')}
            </Badge>
          </div>
          <p className="text-text-secondary mt-1 line-clamp-1 text-xs">
            {String(listing.category ?? '')} · {String(listing.location ?? '')}
          </p>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-accent text-sm font-bold">
              EGP {Number(listing.price ?? 0).toLocaleString()}
            </span>
            <span className="text-text-muted text-xs">
              {Number(listing.quantity ?? 0)} {String(listing.unit ?? 'tons')}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

// ---------------------------------------------------------------------------
// Listing Card Skeleton
// ---------------------------------------------------------------------------
function ListingCardSkeleton({ viewMode }: { viewMode: 'grid' | 'list' }) {
  const isGrid = viewMode === 'grid';

  return (
    <Card className={cn(!isGrid && 'flex')}>
      <Skeleton
        className={cn(
          isGrid ? 'aspect-[4/3] w-full' : 'h-28 w-28 sm:h-32 sm:w-32'
        )}
      />
      <CardContent className={cn('flex-1 space-y-2', isGrid ? 'p-4' : 'py-3')}>
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
      </CardContent>
    </Card>
  );
}
