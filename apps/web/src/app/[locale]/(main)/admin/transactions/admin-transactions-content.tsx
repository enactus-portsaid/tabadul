'use client';

import { BarChart3, Search } from 'lucide-react';

import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';

// ---------------------------------------------------------------------------
// Placeholder data
// ---------------------------------------------------------------------------
const MOCK_TXNS = [
  {
    id: 'tx-001',
    buyer: 'Sara Hassan',
    seller: 'Ahmed Mohamed',
    amount: 15000,
    status: 'completed',
    date: '2026-05-14',
  },
  {
    id: 'tx-002',
    buyer: 'Omar Ali',
    seller: 'Fatima Nour',
    amount: 8500,
    status: 'in_transit',
    date: '2026-05-15',
  },
  {
    id: 'tx-003',
    buyer: 'Nadia Khalil',
    seller: 'Ahmed Mohamed',
    amount: 23000,
    status: 'disputed',
    date: '2026-05-16',
  },
];

// ---------------------------------------------------------------------------
// Admin Transactions Content
// ---------------------------------------------------------------------------
export function AdminTransactionsContent() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-text-primary text-2xl font-bold">
          Transaction Monitor
        </h1>
        <p className="text-text-secondary text-sm">
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
              <tr className="border-border bg-surface-muted border-b">
                <th className="text-text-secondary px-4 py-3 text-left font-medium">
                  ID
                </th>
                <th className="text-text-secondary px-4 py-3 text-left font-medium">
                  Buyer
                </th>
                <th className="text-text-secondary px-4 py-3 text-left font-medium">
                  Seller
                </th>
                <th className="text-text-secondary px-4 py-3 text-left font-medium">
                  Amount
                </th>
                <th className="text-text-secondary px-4 py-3 text-left font-medium">
                  Status
                </th>
                <th className="text-text-secondary px-4 py-3 text-left font-medium">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-border divide-y">
              {MOCK_TXNS.map((txn) => (
                <tr
                  key={txn.id}
                  className="hover:bg-surface-muted transition-colors"
                >
                  <td className="text-text-muted px-4 py-3 font-mono text-xs">
                    {txn.id}
                  </td>
                  <td className="text-text-primary px-4 py-3">{txn.buyer}</td>
                  <td className="text-text-primary px-4 py-3">{txn.seller}</td>
                  <td className="text-text-primary px-4 py-3 font-medium">
                    EGP {txn.amount.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      variant={
                        txn.status === 'completed'
                          ? 'success'
                          : txn.status === 'disputed'
                            ? 'danger'
                            : 'info'
                      }
                      size="sm"
                    >
                      {txn.status.replace('_', ' ')}
                    </Badge>
                  </td>
                  <td className="text-text-muted px-4 py-3">{txn.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
