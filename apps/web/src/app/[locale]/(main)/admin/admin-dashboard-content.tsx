'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Package,
  TrendingUp,
  Users,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

// ---------------------------------------------------------------------------
// Admin Dashboard Content
// ---------------------------------------------------------------------------
export function AdminDashboardContent() {
  const { locale } = useParams<{ locale: string }>();

  // Placeholder stats — integrate with admin API hooks later
  const stats = [
    { label: 'Total Users', value: '1,247', icon: Users, change: '+12%', color: 'text-blue-600 bg-blue-50' },
    { label: 'Active Listings', value: '384', icon: Package, change: '+5%', color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Transactions', value: '156', icon: BarChart3, change: '+8%', color: 'text-amber-600 bg-amber-50' },
    { label: 'Open Disputes', value: '7', icon: AlertTriangle, change: '-2', color: 'text-red-600 bg-red-50' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Admin Dashboard</h1>
        <p className="text-sm text-text-secondary">
          Platform overview and management
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardContent className="flex items-center gap-4 py-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-medium text-text-muted">{stat.label}</p>
                  <p className="text-xl font-bold text-text-primary">{stat.value}</p>
                  <p className="text-[10px] font-medium text-status-active flex items-center gap-0.5">
                    <TrendingUp className="h-3 w-3" />
                    {stat.change}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Links */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <QuickLink
          href={`/${locale}/admin/users`}
          title="User Management"
          description="View, verify, and manage user accounts"
          icon={Users}
        />
        <QuickLink
          href={`/${locale}/admin/listings`}
          title="Listing Moderation"
          description="Review and moderate marketplace listings"
          icon={Package}
        />
        <QuickLink
          href={`/${locale}/admin/disputes`}
          title="Dispute Resolution"
          description="Handle open disputes and escalations"
          icon={AlertTriangle}
        />
      </div>
    </div>
  );
}

function QuickLink({
  href,
  title,
  description,
  icon: Icon,
}: {
  href: string;
  title: string;
  description: string;
  icon: React.ElementType;
}) {
  return (
    <Link href={href}>
      <Card className="group transition-all hover:shadow-md hover:border-primary/20">
        <CardContent className="flex items-center gap-4 py-4">
          <Icon className="h-8 w-8 text-text-muted group-hover:text-primary transition-colors" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-text-primary group-hover:text-primary transition-colors">
              {title}
            </p>
            <p className="text-xs text-text-secondary">{description}</p>
          </div>
          <ArrowRight className="h-4 w-4 text-text-muted group-hover:text-primary transition-colors" />
        </CardContent>
      </Card>
    </Link>
  );
}
