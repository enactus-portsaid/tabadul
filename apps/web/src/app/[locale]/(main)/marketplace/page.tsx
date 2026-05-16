import type { Metadata } from 'next';
import { Suspense } from 'react';

import { MarketplaceContent } from './marketplace-content';
import { MarketplaceSkeleton } from './marketplace-skeleton';

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------
export const metadata: Metadata = {
  title: 'Marketplace',
  description:
    'Browse and discover industrial waste materials. Filter by category, location, and price.',
};

// ---------------------------------------------------------------------------
// Marketplace Browse Page — Server Component
// ---------------------------------------------------------------------------
export default function MarketplacePage() {
  return (
    <Suspense fallback={<MarketplaceSkeleton />}>
      <MarketplaceContent />
    </Suspense>
  );
}
