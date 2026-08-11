import type { Metadata } from 'next';
import { Suspense } from 'react';

import { ListingDetailContent } from './listing-detail-content';
import { ListingDetailSkeleton } from './listing-detail-skeleton';

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Listing #${id.slice(0, 8)}`,
    description:
      'View listing details, place bids, and contact the seller on Tabadul.',
  };
}

// ---------------------------------------------------------------------------
// Listing Detail Page — Server Component
// ---------------------------------------------------------------------------
export default function ListingDetailPage() {
  return (
    <Suspense fallback={<ListingDetailSkeleton />}>
      <ListingDetailContent />
    </Suspense>
  );
}
