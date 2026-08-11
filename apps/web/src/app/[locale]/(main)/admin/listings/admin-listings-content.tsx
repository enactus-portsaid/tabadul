'use client';

import { Eye, Package, Search, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { useListings } from '@/hooks/api';

// ---------------------------------------------------------------------------
// Admin Listings Content
// ---------------------------------------------------------------------------
export function AdminListingsContent() {
  const { locale } = useParams<{ locale: string }>();
  const { data: listings, isLoading } = useListings();
  const [search, setSearch] = useState('');

  const allListings = (listings ?? []) as Array<Record<string, unknown>>;
  const filtered = allListings.filter((l) =>
    String(l.title ?? '')
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-text-primary text-2xl font-bold">
          Listing Moderation
        </h1>
        <p className="text-text-secondary text-sm">
          Review, approve, and moderate marketplace listings
        </p>
      </div>

      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search listings..."
        leftAddon={<Search className="h-4 w-4" />}
        className="max-w-sm"
      />

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-border bg-surface-muted border-b">
                <th className="text-text-secondary px-4 py-3 text-left font-medium">
                  Listing
                </th>
                <th className="text-text-secondary px-4 py-3 text-left font-medium">
                  Category
                </th>
                <th className="text-text-secondary px-4 py-3 text-left font-medium">
                  Price
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
              {isLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <tr key={i}>
                    <td colSpan={5} className="px-4 py-3">
                      <div className="bg-surface-muted h-6 w-full animate-pulse rounded" />
                    </td>
                  </tr>
                ))
              ) : filtered.length > 0 ? (
                filtered.map((item) => (
                  <tr
                    key={String(item.id)}
                    className="hover:bg-surface-muted transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="bg-surface-muted flex h-8 w-8 items-center justify-center rounded-lg">
                          <Package className="text-text-muted h-4 w-4" />
                        </div>
                        <span className="text-text-primary max-w-40 truncate font-medium">
                          {String(item.title ?? 'Untitled')}
                        </span>
                      </div>
                    </td>
                    <td className="text-text-secondary px-4 py-3">
                      {String(item.category ?? '—')}
                    </td>
                    <td className="text-text-primary px-4 py-3 font-medium">
                      EGP {Number(item.price ?? 0).toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        variant={
                          String(item.status) === 'active'
                            ? 'success'
                            : String(item.status) === 'pending'
                              ? 'warning'
                              : 'default'
                        }
                        size="sm"
                      >
                        {String(item.status ?? 'Draft')}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-1">
                        <Link href={`/${locale}/marketplace/${item.id}`}>
                          <Button variant="ghost" size="sm" aria-label="View">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          aria-label="Remove"
                          className="text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="text-text-muted px-4 py-8 text-center"
                  >
                    No listings found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
