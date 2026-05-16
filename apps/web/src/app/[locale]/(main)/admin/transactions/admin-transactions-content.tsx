'use client';

import { BarChart3, Search } from 'lucide-react';

import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';

// ---------------------------------------------------------------------------
// Placeholder data
// ---------------------------------------------------------------------------
const MOCK_TXNS = [
  { id: 'tx-001', buyer: 'Sara Hassan', seller: 'Ahmed Mohamed', amount: 15000, status: 'completed', date: '2026-05-14' },
  { id: 'tx-002', buyer: 'Omar Ali', seller: 'Fatima Nour', amount: 8500, status: 'in_transit', date: '2026-05-15' },
  { id: 'tx-003', buyer: 'Nadia Khalil', seller: 'Ahmed Mohamed', amount: 23000, status: 'disputed', date: '2026-05-16' },
];

// ---------------------------------------------------------------------------
// Admin Transactions Content
// ---------------------------------------------------------------------------
export function AdminTransactionsContent() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Transaction Monitor</h1>
        <p className="text-sm text-text-secondary">
          Track and manage all platform transactions
        </p>
      </div>

      <Input
        placeholder="Search transactions..."
        leftAddon={<Search className="h-4 w-4" />}
        className="max-w-sm"
      />

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-muted">
                <th className="px-4 py-3 text-left font-medium text-text-secondary">ID</th>
                <th className="px-4 py-3 text-left font-medium text-text-secondary">Buyer</th>
                <th className="px-4 py-3 text-left font-medium text-text-secondary">Seller</th>
                <th className="px-4 py-3 text-left font-medium text-text-secondary">Amount</th>
                <th className="px-4 py-3 text-left font-medium text-text-secondary">Status</th>
                <th className="px-4 py-3 text-left font-medium text-text-secondary">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {MOCK_TXNS.map((txn) => (
                <tr key={txn.id} className="transition-colors hover:bg-surface-muted">
                  <td className="px-4 py-3 font-mono text-xs text-text-muted">
                    {txn.id}
                  </td>
                  <td className="px-4 py-3 text-text-primary">{txn.buyer}</td>
                  <td className="px-4 py-3 text-text-primary">{txn.seller}</td>
                  <td className="px-4 py-3 font-medium text-text-primary">
                    EGP {txn.amount.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      variant={
                        txn.status === 'completed' ? 'success' :
                        txn.status === 'disputed' ? 'danger' : 'info'
                      }
                      size="sm"
                    >
                      {txn.status.replace('_', ' ')}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-text-muted">{txn.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
