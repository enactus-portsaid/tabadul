import type { Metadata } from 'next';

import { AdminUsersContent } from './admin-users-content';

export const metadata: Metadata = {
  title: 'Admin — Users',
  description: 'Manage platform users, roles, and verification status.',
};

export default function AdminUsersPage() {
  return <AdminUsersContent />;
}
