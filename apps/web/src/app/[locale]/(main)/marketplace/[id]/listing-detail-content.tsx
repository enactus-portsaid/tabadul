'use client';

import {
  ArrowLeft,
  Bookmark,
  Calendar,
  Clock,
  MapPin,
  MessageCircle,
  Share2,
  ShoppingCart,
  Star,
  Tag,
  Weight,
} from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import {
  useCreateTransaction,
  useListing,
  useToggleBookmark,
} from '@/hooks/api';
import { useAuth } from '@/hooks/useAuth';

// ---------------------------------------------------------------------------
// Listing Detail Content — Client Component
// ---------------------------------------------------------------------------
export function ListingDetailContent() {
  const { locale, id } = useParams<{ locale: string; id: string }>();
  const router = useRouter();
  const { user } = useAuth();
  const { data: listing, isLoading, error } = useListing(id);
  const toggleBookmark = useToggleBookmark();
  const createTransaction = useCreateTransaction();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  if (isLoading) return <ListingDetailLoadingState />;

  if (error || !listing) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Card className="w-full max-w-md text-center">
          <CardContent className="space-y-4 py-12">
            <p className="text-text-primary text-lg font-semibold">
              Listing not found
            </p>
            <Link
              href={`/${locale}/marketplace`}
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground inline-flex items-center gap-2 rounded-lg border-2 px-4 py-2 text-sm font-medium transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Marketplace
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const listingData = listing as Record<string, unknown>;
  const images = Array.isArray(listingData.images) ? listingData.images : [];
  const isOwner = user?.id === listingData.seller_id;

  const handleBookmark = () => {
    if (!user?.id) return;
    toggleBookmark.mutate({ userId: user.id, listingId: id });
    setIsBookmarked(!isBookmarked);
  };

  const handleBuyNow = async () => {
    try {
      const result = await createTransaction.mutateAsync({ listing_id: id });
      const resultData = result as Record<string, unknown> | null;
      if (resultData?.id) {
        router.push(`/${locale}/transactions/${resultData.id}`);
      }
    } catch {
      // Error handled by mutation
    }
  };

  const handleContact = () => {
    router.push(`/${locale}/messages?seller=${listingData.seller_id}`);
  };

  return (
    <div className="space-y-6">
      {/* Back Link */}
      <Link
        href={`/${locale}/marketplace`}
        className="text-text-secondary hover:text-text-primary inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Marketplace
      </Link>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Left Column: Image Gallery */}
        <div className="space-y-4 lg:col-span-3">
          {/* Main Image */}
          <Card className="overflow-hidden">
            <div className="bg-surface-muted aspect-[16/10]">
              {images.length > 0 ? (
                <img
                  src={String(images[selectedImage])}
                  alt={String(listingData.title ?? '')}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <Tag className="text-text-muted h-12 w-12" />
                </div>
              )}
            </div>
          </Card>

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {images.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedImage(i)}
                  className={`h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                    selectedImage === i
                      ? 'border-primary'
                      : 'border-transparent hover:border-gray-200'
                  }`}
                >
                  <img
                    src={String(img)}
                    alt={`${String(listingData.title)} photo ${i + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-text-secondary text-sm leading-relaxed whitespace-pre-line">
                {String(listingData.description ?? 'No description provided.')}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Listing Info + Actions */}
        <div className="space-y-4 lg:col-span-2">
          {/* Listing Info Card */}
          <Card>
            <CardContent className="space-y-4 pt-4">
              {/* Title + Category */}
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h1 className="text-text-primary text-xl font-bold">
                    {String(listingData.title ?? 'Untitled Listing')}
                  </h1>
                  <button
                    type="button"
                    onClick={handleBookmark}
                    className="text-text-muted hover:text-accent shrink-0 rounded-lg p-1.5 transition-colors"
                    aria-label={
                      isBookmarked ? 'Remove bookmark' : 'Bookmark listing'
                    }
                  >
                    <Bookmark
                      className={`h-5 w-5 ${isBookmarked ? 'fill-accent text-accent' : ''}`}
                    />
                  </button>
                </div>
                <div className="mt-1 flex flex-wrap gap-2">
                  <Badge>{String(listingData.category ?? 'Material')}</Badge>
                  <Badge variant="success">
                    {String(listingData.listing_type ?? 'Fixed Price')}
                  </Badge>
                </div>
              </div>

              {/* Price */}
              <div className="bg-accent/10 rounded-xl p-4 text-center">
                <p className="text-text-secondary text-sm">Price</p>
                <p className="text-accent text-3xl font-bold">
                  EGP {Number(listingData.price ?? 0).toLocaleString()}
                </p>
                <p className="text-text-muted text-xs">
                  per {String(listingData.unit ?? 'ton')}
                </p>
              </div>

              {/* Key Details */}
              <div className="divide-y divide-gray-100">
                <DetailRow icon={Weight} label="Quantity">
                  {Number(listingData.quantity ?? 0)}{' '}
                  {String(listingData.unit ?? 'tons')}
                </DetailRow>
                <DetailRow icon={MapPin} label="Location">
                  {String(listingData.location ?? 'Egypt')}
                </DetailRow>
                <DetailRow icon={Calendar} label="Listed">
                  {listingData.created_at
                    ? new Date(
                        String(listingData.created_at)
                      ).toLocaleDateString()
                    : '—'}
                </DetailRow>
                <DetailRow icon={Clock} label="Availability">
                  {String(listingData.availability ?? 'Available')}
                </DetailRow>
              </div>

              {/* Actions */}
              {!isOwner && (
                <div className="space-y-2 pt-2">
                  <Button
                    className="w-full gap-2"
                    size="lg"
                    onClick={handleBuyNow}
                    isLoading={createTransaction.isPending}
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Buy Now
                  </Button>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1 gap-2"
                      onClick={handleContact}
                    >
                      <MessageCircle className="h-4 w-4" />
                      Contact Seller
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      aria-label="Share listing"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Seller Card */}
          <Card>
            <CardHeader>
              <CardTitle>Seller</CardTitle>
            </CardHeader>
            <CardContent>
              <Link
                href={`/${locale}/profile/${listingData.seller_id}`}
                className="hover:bg-surface-muted -m-2 flex items-center gap-3 rounded-lg p-2 transition-colors"
              >
                <Avatar
                  fallback={String(listingData.seller_name ?? 'S').charAt(0)}
                  size="md"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-text-primary truncate text-sm font-semibold">
                    {String(listingData.seller_name ?? 'Seller')}
                  </p>
                  <p className="text-text-secondary truncate text-xs">
                    {String(listingData.seller_location ?? '')}
                  </p>
                  <div className="mt-0.5 flex items-center gap-1">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    <span className="text-text-primary text-xs font-medium">
                      {Number(listingData.seller_rating ?? 0).toFixed(1)}
                    </span>
                    <span className="text-text-muted text-xs">
                      ({Number(listingData.seller_reviews ?? 0)} reviews)
                    </span>
                  </div>
                </div>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Detail Row helper
// ---------------------------------------------------------------------------
function DetailRow({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ElementType;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between py-2.5">
      <div className="text-text-secondary flex items-center gap-2">
        <Icon className="h-4 w-4" />
        <span className="text-sm">{label}</span>
      </div>
      <span className="text-text-primary text-sm font-medium">{children}</span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Inline Loading State
// ---------------------------------------------------------------------------
function ListingDetailLoadingState() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-5 w-40" />
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="space-y-4 lg:col-span-3">
          <Skeleton className="aspect-[16/10] w-full rounded-xl" />
          <Card>
            <CardContent className="space-y-2 p-4">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
          </Card>
        </div>
        <div className="space-y-4 lg:col-span-2">
          <Card>
            <CardContent className="space-y-4 pt-4">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-24 w-full rounded-xl" />
              <div className="space-y-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-8 w-full" />
                ))}
              </div>
              <Skeleton className="h-10 w-full rounded-lg" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
