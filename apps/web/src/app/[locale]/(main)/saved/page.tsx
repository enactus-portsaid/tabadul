import type { Metadata } from 'next';

import { SavedContent } from './saved-content';

export const metadata: Metadata = {
  title: 'Saved Listings',
  description: 'View your bookmarked and saved listings on Tabadul.',
};

export default function SavedPage() {
  return <SavedContent />;
}
