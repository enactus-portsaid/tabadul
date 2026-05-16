import { AdminShell } from './admin-shell';

// ---------------------------------------------------------------------------
// Admin Layout — wraps all /admin/* routes with the admin sidebar
// ---------------------------------------------------------------------------
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // TODO: Add admin role guard — redirect non-admin users
  return <AdminShell>{children}</AdminShell>;
}
