import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

// ---------------------------------------------------------------------------
// Server Client — for use in Server Components, Route Handlers, Server Actions
// ---------------------------------------------------------------------------
/**
 * Creates a Supabase client for server-side usage (RSC, Route Handlers, Server Actions).
 * Reads and writes session cookies via Next.js `cookies()` API.
 *
 * IMPORTANT: This must be called within a request context (not at module scope).
 *
 * Usage:
 * ```ts
 * // In a Server Component or Route Handler
 * const supabase = await createServerSupabaseClient();
 * const { data: { user } } = await supabase.auth.getUser();
 * ```
 */
export async function createServerSupabaseClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
}
