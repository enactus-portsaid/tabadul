'use client';

import {
  AlertTriangle,
  ArrowLeft,
  Calendar,
  Check,
  Clock,
  MapPin,
  Package,
  Truck,
  User,
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { useTransaction } from '@/hooks/api';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/cn';

// ---------------------------------------------------------------------------
// Status Timeline Steps
// ---------------------------------------------------------------------------
const STATUS_STEPS = [
  { key: 'initiated', label: 'Initiated', icon: Clock },
  { key: 'deposit_paid', label: 'Deposit Paid', icon: Check },
  { key: 'in_transit', label: 'In Transit', icon: Truck },
  { key: 'delivered', label: 'Delivered', icon: Package },
  { key: 'completed', label: 'Completed', icon: Check },
] as const;

// ---------------------------------------------------------------------------
// Transaction Detail Content — Client Component
// ---------------------------------------------------------------------------
export function TransactionDetailContent() {
  const { locale, id } = useParams<{ locale: string; id: string }>();
  const { user } = useAuth();
  const { data: transaction, isLoading, error } = useTransaction(id);

  if (isLoading) return <TransactionDetailSkeleton />;

  if (error || !transaction) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Card className="w-full max-w-md text-center">
          <CardContent className="space-y-4 py-12">
            <p className="text-text-primary text-lg font-semibold">
              Transaction not found
            </p>
            <Link
              href={`/${locale}/transactions`}
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground inline-flex items-center gap-2 rounded-lg border-2 px-4 py-2 text-sm font-medium transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Transactions
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const txn = transaction as Record<string, unknown>;
  const status = String(txn.status ?? 'initiated').toLowerCase();
  const isBuyer = user?.id === txn.buyer_id;

  return (
    <div className="space-y-6">
      {/* Back Link */}
      <Link
        href={`/${locale}/transactions`}
        className="text-text-secondary hover:text-text-primary inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Transactions
      </Link>

      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-text-primary text-xl font-bold">
            Transaction #{String(txn.id).slice(0, 8)}
          </h1>
          <p className="text-text-secondary text-sm">
            {txn.created_at
              ? `Created ${new Date(String(txn.created_at)).toLocaleDateString()}`
              : ''}
          </p>
        </div>
        <Badge variant={getStatusVariant(status)} className="self-start">
          {formatStatus(status)}
        </Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column */}
        <div className="space-y-6 lg:col-span-2">
          {/* Status Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Status Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <StatusTimeline currentStatus={status} />
            </CardContent>
          </Card>

          {/* Material Info */}
          <Card>
            <CardHeader>
              <CardTitle>Material Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <InfoRow icon={Package} label="Material">
                  {String(txn.material_name ?? txn.listing_title ?? 'N/A')}
                </InfoRow>
                <InfoRow icon={MapPin} label="Location">
                  {String(txn.location ?? txn.pickup_address ?? 'N/A')}
                </InfoRow>
                <InfoRow icon={Calendar} label="Quantity">
                  {Number(txn.quantity ?? 0)} {String(txn.unit ?? 'tons')}
                </InfoRow>
                <InfoRow icon={Clock} label="Expected Delivery">
                  {txn.expected_delivery
                    ? new Date(
                        String(txn.expected_delivery)
                      ).toLocaleDateString()
                    : 'TBD'}
                </InfoRow>
              </div>
            </CardContent>
          </Card>

          {/* Disputed Banner */}
          {status === 'disputed' && (
            <Card className="border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950">
              <CardContent className="flex items-start gap-3 py-4">
                <AlertTriangle className="h-5 w-5 shrink-0 text-red-500" />
                <div>
                  <p className="text-sm font-semibold text-red-800 dark:text-red-200">
                    This transaction is disputed
                  </p>
                  <p className="mt-0.5 text-xs text-red-600 dark:text-red-300">
                    {String(
                      txn.dispute_reason ??
                        'A dispute has been filed for this transaction.'
                    )}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Payment Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Unit Price</span>
                <span className="text-text-primary font-medium">
                  EGP{' '}
                  {Number(txn.unit_price ?? txn.price ?? 0).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Quantity</span>
                <span className="text-text-primary font-medium">
                  {Number(txn.quantity ?? 0)} {String(txn.unit ?? '')}
                </span>
              </div>
              <div className="border-border border-t pt-2">
                <div className="flex justify-between">
                  <span className="text-text-primary text-sm font-semibold">
                    Total
                  </span>
                  <span className="text-accent text-lg font-bold">
                    EGP{' '}
                    {Number(
                      txn.total_amount ?? txn.amount ?? 0
                    ).toLocaleString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Counterparty */}
          <Card>
            <CardHeader>
              <CardTitle>{isBuyer ? 'Seller' : 'Buyer'}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <Avatar
                  fallback={String(txn.counterparty_name ?? 'U').charAt(0)}
                  size="md"
                />
                <div className="min-w-0">
                  <p className="text-text-primary truncate text-sm font-semibold">
                    {String(txn.counterparty_name ?? 'User')}
                  </p>
                  <p className="text-text-secondary text-xs">
                    {String(txn.counterparty_company ?? '')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Status Timeline Component
// ---------------------------------------------------------------------------
function StatusTimeline({ currentStatus }: { currentStatus: string }) {
  const currentIndex = STATUS_STEPS.findIndex((s) => s.key === currentStatus);
  const activeIndex =
    currentStatus === 'disputed' || currentStatus === 'cancelled'
      ? -1
      : currentIndex;

  return (
    <div className="flex items-center justify-between">
      {STATUS_STEPS.map((step, i) => {
        const Icon = step.icon;
        const isCompleted = activeIndex >= 0 && i <= activeIndex;
        const isCurrent = i === activeIndex;

        return (
          <div key={step.key} className="flex flex-1 items-center">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors',
                  isCompleted
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'bg-surface text-text-muted border-gray-200'
                )}
              >
                <Icon className="h-4 w-4" />
              </div>
              <span
                className={cn(
                  'mt-1.5 max-w-16 text-center text-[10px] font-medium',
                  isCurrent
                    ? 'text-primary'
                    : isCompleted
                      ? 'text-text-primary'
                      : 'text-text-muted'
                )}
              >
                {step.label}
              </span>
            </div>
            {/* Connector line */}
            {i < STATUS_STEPS.length - 1 && (
              <div
                className={cn(
                  'mx-1 h-0.5 flex-1',
                  isCompleted && i < activeIndex ? 'bg-primary' : 'bg-gray-200'
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Info Row
// ---------------------------------------------------------------------------
function InfoRow({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ElementType;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-2">
      <Icon className="text-text-muted mt-0.5 h-4 w-4 shrink-0" />
      <div>
        <p className="text-text-muted text-xs">{label}</p>
        <p className="text-text-primary text-sm font-medium">{children}</p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Skeleton
// ---------------------------------------------------------------------------
function TransactionDetailSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-5 w-40" />
      <div className="flex items-center justify-between">
        <Skeleton className="h-7 w-56" />
        <Skeleton className="h-6 w-24 rounded-full" />
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardContent className="py-8">
              <div className="flex items-center justify-between">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-3 w-12" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="space-y-3 py-6">
              <Skeleton className="h-5 w-32" />
              <div className="grid gap-3 sm:grid-cols-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full" />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-4">
          <Card>
            <CardContent className="space-y-3 py-6">
              <Skeleton className="h-5 w-36" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-6 w-32" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function getStatusVariant(
  status: string
): 'default' | 'success' | 'warning' | 'danger' | 'info' {
  switch (status) {
    case 'completed':
      return 'success';
    case 'initiated':
    case 'deposit_paid':
      return 'warning';
    case 'in_transit':
    case 'delivered':
      return 'info';
    case 'disputed':
    case 'cancelled':
      return 'danger';
    default:
      return 'default';
  }
}

function formatStatus(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}
