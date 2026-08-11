'use client';

import { ArrowRight, Calendar, ChevronRight, Package } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useMemo, useState } from 'react';

import { Badge } from '@/components/ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { useTransactions } from '@/hooks/api';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/cn';

// ---------------------------------------------------------------------------
// Status filter tabs
// ---------------------------------------------------------------------------
const STATUS_TABS = [
  { value: 'all', label: 'All' },
  { value: 'initiated', label: 'Initiated' },
  { value: 'deposit_paid', label: 'Paid' },
  { value: 'in_transit', label: 'In Transit' },
  { value: 'completed', label: 'Completed' },
  { value: 'disputed', label: 'Disputed' },
] as const;

// ---------------------------------------------------------------------------
// Transactions Content — Client Component
// ---------------------------------------------------------------------------
export function TransactionsContent() {
  const { locale } = useParams<{ locale: string }>();
  const { user } = useAuth();
  const userId = user?.id ?? '';
  const role = (user?.profile?.role as 'buyer' | 'seller') ?? 'buyer';

  const { data: transactions, isLoading } = useTransactions(userId, role);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filtered = useMemo(() => {
    if (!transactions) return [];
    const list = transactions as Array<Record<string, unknown>>;
    if (statusFilter === 'all') return list;
    return list.filter(
      (t) => String(t.status ?? '').toLowerCase() === statusFilter
    );
  }, [transactions, statusFilter]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-text-primary text-2xl font-bold">Transactions</h1>
        <p className="text-text-secondary text-sm">
          Track your buying and selling activity
        </p>
      </div>

      {/* Status Filter */}
      <div className="flex gap-2 overflow-x-auto pb-1" role="tablist">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={statusFilter === tab.value}
            onClick={() => setStatusFilter(tab.value)}
            className={cn(
              'shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
              statusFilter === tab.value
                ? 'bg-primary text-primary-foreground'
                : 'bg-surface border-border text-text-secondary hover:bg-surface-muted border'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Transaction List */}
      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="flex items-center gap-4 py-4">
                <Skeleton className="h-12 w-12 rounded-lg" />
                <div className="flex-1 space-y-1">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
                <Skeleton className="h-6 w-20 rounded-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filtered.length > 0 ? (
        <div className="space-y-3">
          {filtered.map((txn) => (
            <Link
              key={String(txn.id)}
              href={`/${locale}/transactions/${txn.id}`}
            >
              <Card className="hover:border-primary/20 transition-all hover:shadow-md">
                <CardContent className="flex items-center gap-4 py-4">
                  {/* Icon */}
                  <div className="bg-surface-muted flex h-12 w-12 shrink-0 items-center justify-center rounded-lg">
                    <Package className="text-text-muted h-6 w-6" />
                  </div>

                  {/* Details */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-text-primary truncate text-sm font-semibold">
                        {typeof txn.material_name === 'string'
                          ? txn.material_name
                          : `Transaction #${String(txn.id).slice(0, 8)}`}
                      </h3>
                    </div>
                    <div className="text-text-secondary flex items-center gap-2 text-xs">
                      <span>
                        {typeof txn.counterparty_name === 'string'
                          ? txn.counterparty_name
                          : role === 'buyer'
                            ? 'Seller'
                            : 'Buyer'}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-0.5">
                        <Calendar className="h-3 w-3" />
                        {txn.created_at
                          ? new Date(
                              String(txn.created_at)
                            ).toLocaleDateString()
                          : '—'}
                      </span>
                    </div>
                  </div>

                  {/* Amount */}
                  <div className="shrink-0 text-right">
                    <p className="text-text-primary text-sm font-bold">
                      EGP{' '}
                      {Number(
                        txn.total_amount ?? txn.amount ?? 0
                      ).toLocaleString()}
                    </p>
                    <Badge
                      variant={getStatusVariant(String(txn.status ?? ''))}
                      size="sm"
                    >
                      {formatStatus(String(txn.status ?? ''))}
                    </Badge>
                  </div>

                  <ChevronRight className="text-text-muted h-4 w-4 shrink-0" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-16 text-center">
            <Package className="text-text-muted mx-auto h-10 w-10" />
            <p className="text-text-primary mt-3 text-sm font-medium">
              {statusFilter === 'all'
                ? 'No transactions yet'
                : `No ${statusFilter.replace('_', ' ')} transactions`}
            </p>
            <p className="text-text-secondary mt-1 text-xs">
              Start by browsing the marketplace
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function getStatusVariant(
  status: string
): 'default' | 'success' | 'warning' | 'danger' | 'info' {
  switch (status.toLowerCase()) {
    case 'completed':
      return 'success';
    case 'initiated':
    case 'deposit_paid':
      return 'warning';
    case 'in_transit':
      return 'info';
    case 'disputed':
    case 'cancelled':
      return 'danger';
    default:
      return 'default';
  }
}

function formatStatus(status: string): string {
  return status
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
