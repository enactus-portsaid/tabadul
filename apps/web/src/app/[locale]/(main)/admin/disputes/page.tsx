import type { Metadata } from 'next';

import { AdminDisputesContent } from './admin-disputes-content';

export const metadata: Metadata = {
  title: 'Admin — Disputes',
  description: 'Review and resolve transaction disputes on Tabadul.',
};

export default function AdminDisputesPage() {
  return <AdminDisputesContent />;
}
