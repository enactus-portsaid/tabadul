import type { Metadata } from 'next';
import { Suspense } from 'react';

import { Skeleton } from '@/components/ui/Skeleton';

import { EditListingContent } from './edit-listing-content';

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
    title: `Edit Listing #${id.slice(0, 8)}`,
    description: 'Edit your listing details on Tabadul.',
  };
}

// ---------------------------------------------------------------------------
// Edit Listing Page — Server Component
// ---------------------------------------------------------------------------
export default function EditListingPage() {
  return (
    <Suspense fallback={<Skeleton className="h-96 w-full rounded-xl" />}>
      <EditListingContent />
    </Suspense>
  );
}
