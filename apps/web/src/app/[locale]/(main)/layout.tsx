import { redirect } from 'next/navigation';

import { createServerSupabaseClient } from '@/lib/supabaseServer';

import { MainShell } from './main-shell';

// ---------------------------------------------------------------------------
// Protected Main Layout — requires authentication
// ---------------------------------------------------------------------------
// Server Component layout that checks the user's session on the server side.
// If not authenticated, redirects to login. This is a secondary guard in
// addition to the middleware (defense in depth).
//
// Child pages can safely assume the user is authenticated.
// ---------------------------------------------------------------------------
export default async function MainLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/${locale}/login`);
  }

  return <MainShell locale={locale}>{children}</MainShell>;
}
