// ---------------------------------------------------------------------------
// Query Client — TanStack Query configuration for Tabadul Web
// ---------------------------------------------------------------------------
// Provides a singleton QueryClient on the browser and a fresh instance per
// SSR request. Integrates with the SOP-205 error handling system for
// retry logic.
//
// Usage:
//   import { getQueryClient } from '@/lib/queryClient';
//   const queryClient = getQueryClient();
// ---------------------------------------------------------------------------

import { isRetryableError } from '@tabadul/shared/lib/errorHandler';
import { QueryClient, type QueryClientConfig } from '@tanstack/react-query';

// ---------------------------------------------------------------------------
// Default Configuration
// ---------------------------------------------------------------------------
const QUERY_CLIENT_CONFIG: QueryClientConfig = {
  defaultOptions: {
    queries: {
      // Data considered fresh for 1 minute — reduces unnecessary refetches
      staleTime: 60_000,
      // Garbage-collect unused cache entries after 5 minutes
      gcTime: 300_000,
      // Custom retry: only retry network/rate-limit/timeout errors (SOP-205)
      retry: (failureCount, error) => {
        if (failureCount >= 2) return false;
        return isRetryableError(error);
      },
      // Don't refetch when browser tab regains focus — Supabase data
      // is already fresh enough within staleTime
      refetchOnWindowFocus: false,
    },
    mutations: {
      // Mutations should not retry by default — they may not be idempotent
      retry: false,
    },
  },
};

// ---------------------------------------------------------------------------
// Singleton (Browser) / Fresh Instance (SSR)
// ---------------------------------------------------------------------------
let browserQueryClient: QueryClient | undefined;

/**
 * Returns a QueryClient instance.
 *
 * - **Browser:** Returns a singleton to preserve cache across navigations.
 * - **Server:** Returns a fresh instance per request to avoid cross-request
 *   cache leaks.
 */
export function getQueryClient(): QueryClient {
  if (typeof window === 'undefined') {
    // Server: always create a new client
    return new QueryClient(QUERY_CLIENT_CONFIG);
  }

  // Browser: reuse singleton
  if (!browserQueryClient) {
    browserQueryClient = new QueryClient(QUERY_CLIENT_CONFIG);
  }
  return browserQueryClient;
}
