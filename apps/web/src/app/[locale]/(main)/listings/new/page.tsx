import type { Metadata } from 'next';

import { CreateListingContent } from './create-listing-content';

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------
export const metadata: Metadata = {
  title: 'Create Listing',
  description: 'List your industrial waste materials for sale on Tabadul.',
};

// ---------------------------------------------------------------------------
// Create Listing Page — Server Component
// ---------------------------------------------------------------------------
export default function CreateListingPage() {
  return <CreateListingContent />;
}
