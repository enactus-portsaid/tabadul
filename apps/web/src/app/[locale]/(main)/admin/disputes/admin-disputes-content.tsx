'use client';

import { AlertTriangle, ChevronRight, Clock, User } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { Badge } from '@/components/ui/Badge';
import { Card, CardContent } from '@/components/ui/Card';

// ---------------------------------------------------------------------------
// Placeholder dispute data
// ---------------------------------------------------------------------------
const MOCK_DISPUTES = [
  {
    id: 'dp-001',
    transaction_id: 'tx-003',
    filed_by: 'Nadia Khalil',
    against: 'Ahmed Mohamed',
    reason: 'Material quality does not match listing description',
    status: 'open',
    created_at: '2026-05-16T10:30:00Z',
  },
  {
    id: 'dp-002',
    transaction_id: 'tx-005',
    filed_by: 'Omar Ali',
    against: 'Fatima Nour',
    reason: 'Delivery was significantly delayed beyond agreed timeline',
    status: 'under_review',
    created_at: '2026-05-15T08:00:00Z',
  },
  {
    id: 'dp-003',
    transaction_id: 'tx-008',
    filed_by: 'Sara Hassan',
    against: 'Khaled Mahmoud',
    reason: 'Quantity received was less than ordered',
    status: 'resolved',
    created_at: '2026-05-12T14:00:00Z',
  },
];

// ---------------------------------------------------------------------------
// Admin Disputes Content
// ---------------------------------------------------------------------------
export function AdminDisputesContent() {
  const { locale } = useParams<{ locale: string }>();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-text-primary text-2xl font-bold">
          Dispute Resolution
        </h1>
        <p className="text-text-secondary text-sm">
          Review and resolve open disputes between users
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Open" count={1} variant="danger" />
        <StatCard label="Under Review" count={1} variant="warning" />
        <StatCard label="Resolved" count={1} variant="success" />
      </div>

      {/* Dispute List */}
      <div className="space-y-3">
        {MOCK_DISPUTES.map((dispute) => (
          <Link
            key={dispute.id}
            href={`/${locale}/admin/disputes/${dispute.id}`}
          >
            <Card className="hover:border-primary/20 transition-all hover:shadow-md">
              <CardContent className="flex items-center gap-4 py-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-text-primary text-sm font-semibold">
                      Dispute #{dispute.id}
                    </p>
                    <Badge
                      variant={
                        dispute.status === 'open'
                          ? 'danger'
                          : dispute.status === 'under_review'
                            ? 'warning'
                            : 'success'
                      }
                      size="sm"
                    >
                      {dispute.status.replace('_', ' ')}
                    </Badge>
                  </div>
                  <p className="text-text-secondary mt-0.5 line-clamp-1 text-xs">
                    {dispute.reason}
                  </p>
                  <div className="text-text-muted mt-1 flex items-center gap-3 text-[10px]">
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {dispute.filed_by} vs {dispute.against}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {new Date(dispute.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <ChevronRight className="text-text-muted h-4 w-4 shrink-0" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Stat Card
// ---------------------------------------------------------------------------
function StatCard({
  label,
  count,
  variant,
}: {
  label: string;
  count: number;
  variant: 'danger' | 'warning' | 'success';
}) {
  const colors = {
    danger: 'text-red-600 bg-red-50',
    warning: 'text-amber-600 bg-amber-50',
    success: 'text-emerald-600 bg-emerald-50',
  };

  return (
    <Card>
      <CardContent className="flex items-center gap-3 py-4">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${colors[variant]}`}
        >
          <span className="text-lg font-bold">{count}</span>
        </div>
        <span className="text-text-primary text-sm font-medium">{label}</span>
      </CardContent>
    </Card>
  );
}
