'use client';

import { CheckCircle, Search, Shield, User, XCircle } from 'lucide-react';
import { useState } from 'react';

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
  {
    id: '1',
    full_name: 'Ahmed Mohamed',
    email: 'ahmed@example.com',
    role: 'seller',
    is_verified: true,
    status: 'active',
  },
  {
    id: '2',
    full_name: 'Sara Hassan',
    email: 'sara@example.com',
    role: 'buyer',
    is_verified: true,
    status: 'active',
  },
  {
    id: '3',
    full_name: 'Omar Ali',
    email: 'omar@example.com',
    role: 'seller',
    is_verified: false,
    status: 'pending',
  },
];

// ---------------------------------------------------------------------------
// Admin Users Content
// ---------------------------------------------------------------------------
export function AdminUsersContent() {
  const [search, setSearch] = useState('');

  const filtered = MOCK_USERS.filter(
    (u) =>
      String(u.full_name).toLowerCase().includes(search.toLowerCase()) ||
      String(u.email).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-text-primary text-2xl font-bold">
          User Management
        </h1>
        <p className="text-text-secondary text-sm">
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
              <tr className="border-border bg-surface-muted border-b">
                <th className="text-text-secondary px-4 py-3 text-left font-medium">
                  User
                </th>
                <th className="text-text-secondary px-4 py-3 text-left font-medium">
                  Role
                </th>
                <th className="text-text-secondary px-4 py-3 text-left font-medium">
                  Verified
                </th>
                <th className="text-text-secondary px-4 py-3 text-left font-medium">
                  Status
                </th>
                <th className="text-text-secondary px-4 py-3 text-right font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-border divide-y">
              {filtered.map((user) => (
                <tr
                  key={String(user.id)}
                  className="hover:bg-surface-muted transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full">
                        <User className="text-primary h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-text-primary font-medium">
                          {String(user.full_name)}
                        </p>
                        <p className="text-text-muted text-xs">
                          {String(user.email)}
                        </p>
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
                      <CheckCircle className="text-status-active h-4 w-4" />
                    ) : (
                      <XCircle className="text-text-muted h-4 w-4" />
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
