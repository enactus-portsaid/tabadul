// ---------------------------------------------------------------------------
// Server Fetch Helpers — Cached data fetching for Server Components
// ---------------------------------------------------------------------------
// Uses React `cache()` to deduplicate identical requests within the same
// server render pass. Wraps the shared service layer via the server-side
// Supabase client.
//
// Usage in a Server Component:
//   import { fetchListings, fetchListing } from '@/lib/serverFetch';
//
//   export default async function MarketplacePage() {
//     const listings = await fetchListings();
//     return <ListingGrid listings={listings} />;
//   }
// ---------------------------------------------------------------------------

import { cache } from 'react';

import { normalizeError } from '@tabadul/shared/lib/errorHandler';
import { createServices } from '@tabadul/shared/services';

import { createServerSupabaseClient } from './supabaseServer';

// ---------------------------------------------------------------------------
// Helper: get services from server Supabase client
// ---------------------------------------------------------------------------
async function getServerServices() {
  const supabase = await createServerSupabaseClient();
  return createServices(supabase);
}

// ---------------------------------------------------------------------------
// Listings
// ---------------------------------------------------------------------------

/** Fetch active listings with optional filters. Server-side, cached per render. */
export const fetchListings = cache(
  async (filters?: {
    wasteType?: string;
    maxPrice?: number;
    city?: string;
  }) => {
    const services = await getServerServices();
    const { data, error } = await services.listing.getListings(filters);
    if (error) throw normalizeError(error);
    return data;
  }
);

/** Fetch a single listing by ID. Server-side, cached per render. */
export const fetchListing = cache(async (id: string) => {
  const services = await getServerServices();
  const { data, error } = await services.listing.getListing(id);
  if (error) throw normalizeError(error);
  return data;
});

// ---------------------------------------------------------------------------
// User Profile
// ---------------------------------------------------------------------------

/** Fetch a user profile by ID. Server-side, cached per render. */
export const fetchUserProfile = cache(async (userId: string) => {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  if (error) throw normalizeError(error);
  return data;
});

// ---------------------------------------------------------------------------
// Transactions
// ---------------------------------------------------------------------------

/** Fetch transactions for a user. Server-side, cached per render. */
export const fetchTransactions = cache(
  async (userId: string, role: 'buyer' | 'seller') => {
    const services = await getServerServices();
    const { data, error } = await services.transaction.getTransactions(
      userId,
      role
    );
    if (error) throw normalizeError(error);
    return data;
  }
);

/** Fetch a single transaction with full relations. Server-side, cached. */
export const fetchTransaction = cache(async (id: string) => {
  const services = await getServerServices();
  const { data, error } = await services.transaction.getTransaction(id);
  if (error) throw normalizeError(error);
  return data;
});

// ---------------------------------------------------------------------------
// Notifications
// ---------------------------------------------------------------------------

/** Fetch unread notification count. Server-side, cached per render. */
export const fetchUnreadCount = cache(async (userId: string) => {
  const services = await getServerServices();
  const { count, error } = await services.notification.getUnreadCount(userId);
  if (error) throw normalizeError(error);
  return count ?? 0;
});
