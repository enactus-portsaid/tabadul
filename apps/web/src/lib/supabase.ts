import { createBrowserClient } from '@supabase/ssr';

// ---------------------------------------------------------------------------
// Environment Variables
// ---------------------------------------------------------------------------
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. ' +
      'Ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY ' +
      'are set in your .env.local file.'
  );
}

// ---------------------------------------------------------------------------
// Browser Client — for use in Client Components
// ---------------------------------------------------------------------------
/**
 * Creates a Supabase client for browser-side (Client Component) usage.
 * Uses cookie-based session management via @supabase/ssr.
 *
 * Usage:
 * ```ts
 * const supabase = createClient();
 * const { data } = await supabase.from('listings').select();
 * ```
 */
export function createClient() {
  return createBrowserClient(supabaseUrl!, supabaseAnonKey!);
}
