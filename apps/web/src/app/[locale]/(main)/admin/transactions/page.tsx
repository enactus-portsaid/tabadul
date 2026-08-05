import type { Metadata } from 'next';

import { AdminTransactionsContent } from './admin-transactions-content';

export const metadata: Metadata = {
  title: 'Admin — Transactions',
  description: 'Monitor and manage platform transactions.',
};

export default function AdminTransactionsPage() {
  return <AdminTransactionsContent />;
}
