'use client';

import { useState } from 'react';
import { CheckCircle, Search, Shield, User, XCircle } from 'lucide-react';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Skeleton } from '@/components/ui/Skeleton';
import { cn } from '@/lib/cn';

// ---------------------------------------------------------------------------
// Placeholder user data
// ---------------------------------------------------------------------------
const MOCK_USERS: Record<string, unknown>[] = [
  { id: '1', full_name: 'Ahmed Mohamed', email: 'ahmed@example.com', role: 'seller', is_verified: true, status: 'active' },
  { id: '2', full_name: 'Sara Hassan', email: 'sara@example.com', role: 'buyer', is_verified: true, status: 'active' },
  { id: '3', full_name: 'Omar Ali', email: 'omar@example.com', role: 'seller', is_verified: false, status: 'pending' },
];

// ---------------------------------------------------------------------------
// Admin Users Content
// ---------------------------------------------------------------------------
export function AdminUsersContent() {
  const [search, setSearch] = useState('');

  const filtered = MOCK_USERS.filter((u) =>
    String(u.full_name).toLowerCase().includes(search.toLowerCase()) ||
    String(u.email).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">User Management</h1>
        <p className="text-sm text-text-secondary">
          View and manage platform users
        </p>
      </div>

      {/* Search */}
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search users by name or email..."
        leftAddon={<Search className="h-4 w-4" />}
        className="max-w-sm"
      />

      {/* Users Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-muted">
                <th className="px-4 py-3 text-left font-medium text-text-secondary">User</th>
                <th className="px-4 py-3 text-left font-medium text-text-secondary">Role</th>
                <th className="px-4 py-3 text-left font-medium text-text-secondary">Verified</th>
                <th className="px-4 py-3 text-left font-medium text-text-secondary">Status</th>
                <th className="px-4 py-3 text-right font-medium text-text-secondary">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((user) => (
                <tr
                  key={String(user.id)}
                  className="transition-colors hover:bg-surface-muted"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-text-primary">
                          {String(user.full_name)}
                        </p>
                        <p className="text-xs text-text-muted">{String(user.email)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      variant={user.role === 'admin' ? 'accent' : 'default'}
                      size="sm"
                    >
                      {String(user.role)}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    {user.is_verified ? (
                      <CheckCircle className="h-4 w-4 text-status-active" />
                    ) : (
                      <XCircle className="h-4 w-4 text-text-muted" />
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      variant={user.status === 'active' ? 'success' : 'warning'}
                      size="sm"
                    >
                      {String(user.status)}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="ghost" size="sm">
                      <Shield className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
