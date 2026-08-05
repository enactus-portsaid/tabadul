import type { Metadata } from 'next';
import { Suspense } from 'react';

import { Skeleton } from '@/components/ui/Skeleton';

import { TransactionsContent } from './transactions-content';

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------
export const metadata: Metadata = {
  title: 'Transactions',
  description: 'View and manage your buying and selling transactions on Tabadul.',
};

// ---------------------------------------------------------------------------
// Transactions Page — Server Component
// ---------------------------------------------------------------------------
export default function TransactionsPage() {
  return (
    <Suspense fallback={<Skeleton className="h-96 w-full rounded-xl" />}>
      <TransactionsContent />
    </Suspense>
  );
}
