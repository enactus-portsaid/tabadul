'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';

// ---------------------------------------------------------------------------
// Protected Main Layout — Sidebar + Header shell
// ---------------------------------------------------------------------------
// Client component that provides the app shell with sidebar navigation,
// header with notification bell, and responsive layout.
//
// Auth guard is handled by the server layout wrapper (main-guard.tsx).
// This layout purely handles the visual shell.
// ---------------------------------------------------------------------------
export function MainShell({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: string;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleNotificationClick = () => {
    router.push(`/${locale}/notifications`);
  };

  const handleLanguageToggle = () => {
    // Toggle between ar/en — swap locale segment in pathname
    const newLocale = locale === 'ar' ? 'en' : 'ar';
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <div className="bg-background flex min-h-screen">
      {/* Sidebar Navigation */}
      <Sidebar
        locale={locale}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col">
        {/* Header — visible on mobile, hidden on desktop (sidebar has brand) */}
        <Header
          locale={locale}
          onMenuToggle={() => setSidebarOpen(true)}
          onNotificationClick={handleNotificationClick}
          onLanguageToggle={handleLanguageToggle}
          className="lg:hidden"
        />

        {/* Page Content */}
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
