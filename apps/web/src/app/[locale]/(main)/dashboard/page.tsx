import type { Metadata } from 'next';
import { Suspense } from 'react';

import { DashboardContent } from './dashboard-content';
import { DashboardSkeleton } from './dashboard-skeleton';

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------
export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Your Tabadul dashboard — view your listings, transactions, and AI-powered recommendations.',
};

// ---------------------------------------------------------------------------
// Dashboard Page — Server Component
// ---------------------------------------------------------------------------
export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent />
    </Suspense>
  );
}
