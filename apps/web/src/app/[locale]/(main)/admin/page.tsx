import type { Metadata } from 'next';

import { AdminDashboardContent } from './admin-dashboard-content';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Tabadul admin overview — users, listings, transactions, and disputes.',
};

export default function AdminDashboardPage() {
  return <AdminDashboardContent />;
}
