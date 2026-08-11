'use client';

import {
  Bell,
  ChevronRight,
  Edit,
  Globe,
  HelpCircle,
  LogOut,
  Moon,
  Shield,
  Star,
  User,
} from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { useAuth } from '@/hooks/useAuth';

// ---------------------------------------------------------------------------
// Profile Content
// ---------------------------------------------------------------------------
export function ProfileContent() {
  const { locale } = useParams<{ locale: string }>();
  const router = useRouter();
  const { user, signOut } = useAuth();
  const profile = user?.profile;

  const handleSignOut = async () => {
    await signOut();
    router.push(`/${locale}/login`);
  };

  const menuItems = [
    {
      icon: Bell,
      label: 'Notification Preferences',
      href: `/${locale}/notifications/preferences`,
    },
    {
      icon: Globe,
      label: 'Language',
      href: '#',
      trailing: locale === 'ar' ? 'العربية' : 'English',
    },
    {
      icon: Moon,
      label: 'Dark Mode',
      href: '#',
      trailing: 'System',
    },
    {
      icon: Shield,
      label: 'Privacy & Security',
      href: '#',
    },
    {
      icon: HelpCircle,
      label: 'Help & Support',
      href: '#',
    },
  ];

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Profile Card */}
      <Card>
        <CardContent className="py-6">
          <div className="flex flex-col items-center text-center sm:flex-row sm:gap-6 sm:text-left">
            <Avatar
              src={profile?.avatar_url}
              fallback={profile?.full_name?.charAt(0) ?? 'U'}
              size="lg"
              className="h-20 w-20"
            />
            <div className="mt-4 sm:mt-0">
              <h1 className="text-text-primary text-xl font-bold">
                {profile?.full_name ?? user?.email ?? 'User'}
              </h1>
              <p className="text-text-secondary text-sm">
                {profile?.company_name ?? ''}
              </p>
              <div className="mt-2 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                <Badge variant="accent">
                  {profile?.role === 'seller' ? 'Seller' : 'Buyer'}
                </Badge>
                {profile?.is_verified && (
                  <Badge variant="success">Verified</Badge>
                )}
                <div className="text-text-secondary flex items-center gap-1 text-xs">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  {(profile?.avg_rating ?? 0).toFixed(1)}
                  <span className="text-text-muted">
                    ({profile?.total_reviews ?? 0})
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-auto">
              <Link href={`/${locale}/profile/edit`}>
                <Button variant="outline" className="gap-2">
                  <Edit className="h-4 w-4" />
                  Edit Profile
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bio */}
      {profile?.bio && (
        <Card>
          <CardHeader>
            <CardTitle>About</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-text-secondary text-sm">{profile.bio}</p>
          </CardContent>
        </Card>
      )}

      {/* Settings Menu */}
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent className="divide-border -mt-2 divide-y">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className="hover:bg-surface-muted -mx-4 flex items-center gap-3 px-4 py-3 transition-colors"
              >
                <Icon className="text-text-muted h-5 w-5" />
                <span className="text-text-primary flex-1 text-sm font-medium">
                  {item.label}
                </span>
                {item.trailing && (
                  <span className="text-text-muted text-xs">
                    {item.trailing}
                  </span>
                )}
                <ChevronRight className="text-text-muted h-4 w-4" />
              </Link>
            );
          })}
        </CardContent>
      </Card>

      {/* Sign Out */}
      <Card>
        <CardContent className="py-3">
          <button
            type="button"
            onClick={handleSignOut}
            className="flex w-full items-center gap-3 rounded-lg py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:hover:bg-red-950"
          >
            <LogOut className="h-5 w-5" />
            Sign Out
          </button>
        </CardContent>
      </Card>
    </div>
  );
}
