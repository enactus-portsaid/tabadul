'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  AlertTriangle,
  ArrowLeft,
  Calendar,
  CheckCircle,
  User,
} from 'lucide-react';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

// ---------------------------------------------------------------------------
// Dispute Detail Content
// ---------------------------------------------------------------------------
export function DisputeDetailContent() {
  const { locale, id } = useParams<{ locale: string; id: string }>();

  // Placeholder — integrate with admin dispute API
  const dispute = {
    id,
    transaction_id: 'tx-003',
    filed_by: 'Nadia Khalil',
    against: 'Ahmed Mohamed',
    reason: 'Material quality does not match listing description. The steel scraps received contained significant rust and impurities not mentioned in the listing.',
    status: 'open',
    created_at: '2026-05-16T10:30:00Z',
    evidence_urls: [],
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link
        href={`/${locale}/admin/disputes`}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Disputes
      </Link>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AlertTriangle className="h-6 w-6 text-red-500" />
          <div>
            <h1 className="text-xl font-bold text-text-primary">
              Dispute #{dispute.id}
            </h1>
            <p className="text-xs text-text-muted">
              Filed on {new Date(dispute.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
        <Badge
          variant={dispute.status === 'open' ? 'danger' : dispute.status === 'under_review' ? 'warning' : 'success'}
        >
          {dispute.status.replace('_', ' ')}
        </Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4">
          {/* Reason */}
          <Card>
            <CardHeader>
              <CardTitle>Dispute Reason</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-text-secondary leading-relaxed">
                {dispute.reason}
              </p>
            </CardContent>
          </Card>

          {/* Admin Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Resolution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <textarea
                placeholder="Enter resolution notes..."
                className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20"
                rows={4}
              />
              <div className="flex gap-2">
                <Button className="gap-2" variant="primary">
                  <CheckCircle className="h-4 w-4" />
                  Resolve Dispute
                </Button>
                <Button variant="outline">
                  Escalate
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Parties */}
          <Card>
            <CardHeader>
              <CardTitle>Parties</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-text-muted" />
                <div>
                  <p className="text-xs text-text-muted">Filed by</p>
                  <p className="text-sm font-medium text-text-primary">
                    {dispute.filed_by}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-text-muted" />
                <div>
                  <p className="text-xs text-text-muted">Against</p>
                  <p className="text-sm font-medium text-text-primary">
                    {dispute.against}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Transaction */}
          <Card>
            <CardHeader>
              <CardTitle>Related Transaction</CardTitle>
            </CardHeader>
            <CardContent>
              <Link
                href={`/${locale}/transactions/${dispute.transaction_id}`}
                className="text-sm font-medium text-primary hover:underline"
              >
                View Transaction #{dispute.transaction_id}
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
