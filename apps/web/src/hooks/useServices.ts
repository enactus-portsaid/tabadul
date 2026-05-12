'use client';

// ---------------------------------------------------------------------------
// useServices — Service layer bridge for Client Components
// ---------------------------------------------------------------------------
// Replaces the SOP-303 REST API client with the BaaS-adapted pattern:
// instantiates the shared Supabase service factories with the browser
// Supabase client.
//
// This is the single dependency-injection point for all domain hooks.
//
// Usage:
//   const { listing, chat, transaction } = useServices();
// ---------------------------------------------------------------------------

import { createServices } from '@tabadul/shared/services';
import { useMemo } from 'react';

import { createClient } from '@/lib/supabase';

/**
 * Returns all domain service objects, memoized around the Supabase client.
 *
 * Each service wraps Supabase queries and returns `{ data, error }` results
 * per the Result Pattern (design-patterns.md §3.7).
 */
export function useServices() {
  const supabase = useMemo(() => createClient(), []);
  return useMemo(() => createServices(supabase), [supabase]);
}
