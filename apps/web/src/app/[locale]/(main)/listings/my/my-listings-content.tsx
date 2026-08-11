'use client';

import { Edit, Eye, Package, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useMemo, useState } from 'react';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { useDeactivateListing, useListings } from '@/hooks/api';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/cn';

// ---------------------------------------------------------------------------
// Status filter tabs
// ---------------------------------------------------------------------------
const STATUS_TABS = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'pending', label: 'Pending' },
  { value: 'sold', label: 'Sold' },
  { value: 'inactive', label: 'Inactive' },
] as const;

// ---------------------------------------------------------------------------
// My Listings Content — Client Component
// ---------------------------------------------------------------------------
export function MyListingsContent() {
  const { locale } = useParams<{ locale: string }>();
  const { user } = useAuth();
  const { data: allListings, isLoading } = useListings();
  const deactivateListing = useDeactivateListing();
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Filter to only user's listings (client-side)
  const myListings = useMemo(() => {
    if (!allListings || !user?.id) return [];
    return (allListings as Array<Record<string, unknown>>).filter(
      (item) => item.seller_id === user.id
    );
  }, [allListings, user?.id]);

  const filteredListings = useMemo(() => {
    if (statusFilter === 'all') return myListings;
    return myListings.filter(
      (item) => String(item.status ?? '').toLowerCase() === statusFilter
    );
  }, [myListings, statusFilter]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-text-primary text-2xl font-bold">My Listings</h1>
          <p className="text-text-secondary text-sm">
            Manage your waste material listings
          </p>
        </div>
        <Link href={`/${locale}/listings/new`}>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Listing
          </Button>
        </Link>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1" role="tablist">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={statusFilter === tab.value}
            onClick={() => setStatusFilter(tab.value)}
            className={cn(
              'shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
              statusFilter === tab.value
                ? 'bg-primary text-primary-foreground'
                : 'bg-surface border-border text-text-secondary hover:bg-surface-muted border'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Listings */}
      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="flex items-center gap-4 py-4">
                <Skeleton className="h-16 w-16 rounded-lg" />
                <div className="flex-1 space-y-1">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
                <Skeleton className="h-8 w-20" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredListings.length > 0 ? (
        <div className="space-y-3">
          {filteredListings.map((item) => (
            <Card
              key={String(item.id)}
              className="transition-all hover:shadow-md"
            >
              <CardContent className="flex items-center gap-4 py-4">
                {/* Thumbnail */}
                <div className="bg-surface-muted h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                  {typeof item.image_url === 'string' ? (
                    <img
                      src={item.image_url}
                      alt={String(item.title ?? '')}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <Package className="text-text-muted h-6 w-6" />
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-text-primary truncate text-sm font-semibold">
                      {String(item.title ?? 'Untitled')}
                    </h3>
                    <Badge
                      variant={getStatusVariant(String(item.status ?? ''))}
                      size="sm"
                    >
                      {String(item.status ?? 'Draft')}
                    </Badge>
                  </div>
                  <p className="text-text-secondary text-xs">
                    EGP {Number(item.price ?? 0).toLocaleString()} ·{' '}
                    {Number(item.quantity ?? 0)} {String(item.unit ?? 'tons')}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1">
                  <Link href={`/${locale}/marketplace/${item.id}`}>
                    <Button variant="ghost" size="sm" aria-label="View listing">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href={`/${locale}/listings/${item.id}/edit`}>
                    <Button variant="ghost" size="sm" aria-label="Edit listing">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    aria-label="Deactivate listing"
                    onClick={() => deactivateListing.mutate(String(item.id))}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-16 text-center">
            <Package className="text-text-muted mx-auto h-10 w-10" />
            <p className="text-text-primary mt-3 text-sm font-medium">
              {statusFilter === 'all'
                ? 'No listings yet'
                : `No ${statusFilter} listings`}
            </p>
            <p className="text-text-secondary mt-1 text-xs">
              Create your first listing to start selling
            </p>
            <Link
              href={`/${locale}/listings/new`}
              className="mt-4 inline-block"
            >
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Create Listing
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Status variant helper
// ---------------------------------------------------------------------------
function getStatusVariant(
  status: string
): 'default' | 'success' | 'warning' | 'danger' {
  switch (status.toLowerCase()) {
    case 'active':
      return 'success';
    case 'pending':
      return 'warning';
    case 'sold':
    case 'inactive':
      return 'danger';
    default:
      return 'default';
  }
}
