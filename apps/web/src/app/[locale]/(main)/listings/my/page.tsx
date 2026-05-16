import type { Metadata } from 'next';
import { Suspense } from 'react';

import { Skeleton } from '@/components/ui/Skeleton';

import { MyListingsContent } from './my-listings-content';

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------
export const metadata: Metadata = {
  title: 'My Listings',
  description: 'Manage your active, pending, and sold listings on Tabadul.',
};

// ---------------------------------------------------------------------------
// My Listings Page — Server Component
// ---------------------------------------------------------------------------
export default function MyListingsPage() {
  return (
    <Suspense fallback={<Skeleton className="h-96 w-full rounded-xl" />}>
      <MyListingsContent />
    </Suspense>
  );
}
