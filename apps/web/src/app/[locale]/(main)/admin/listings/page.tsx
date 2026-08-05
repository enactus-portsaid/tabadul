import type { Metadata } from 'next';

import { AdminListingsContent } from './admin-listings-content';

export const metadata: Metadata = {
  title: 'Admin — Listings',
  description: 'Review and moderate marketplace listings.',
};

export default function AdminListingsPage() {
  return <AdminListingsContent />;
}
