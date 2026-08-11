import type { Metadata } from 'next';
import { Suspense } from 'react';

import { Skeleton } from '@/components/ui/Skeleton';

import { TransactionDetailContent } from './transaction-detail-content';

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
    title: `Transaction #${id.slice(0, 8)}`,
    description:
      'View transaction details, upload receipts, and manage delivery status.',
  };
}

// ---------------------------------------------------------------------------
// Transaction Detail Page — Server Component
// ---------------------------------------------------------------------------
export default function TransactionDetailPage() {
  return (
    <Suspense fallback={<Skeleton className="h-96 w-full rounded-xl" />}>
      <TransactionDetailContent />
    </Suspense>
  );
}
