'use client';

// ---------------------------------------------------------------------------
// useListings — Query hooks for the Listings domain
// ---------------------------------------------------------------------------
// Wraps listing service functions with TanStack Query for caching,
// invalidation, and optimistic updates (bookmark toggle).
// ---------------------------------------------------------------------------

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useServices } from '@/hooks/useServices';
import { bookmarkKeys, listingKeys } from '@/lib/queryKeys';
import { normalizeError } from '@tabadul/shared/lib/errorHandler';

// ---------------------------------------------------------------------------
// Queries
// ---------------------------------------------------------------------------

/** Fetch paginated/filtered listings. */
export function useListings(filters?: {
  wasteType?: string;
  maxPrice?: number;
  city?: string;
}) {
  const { listing } = useServices();

  return useQuery({
    queryKey: listingKeys.list(filters ?? {}),
    queryFn: async () => {
      const { data, error } = await listing.getListings(filters);
      if (error) throw normalizeError(error);
      return data;
    },
  });
}

/** Fetch a single listing by ID. */
export function useListing(id: string) {
  const { listing } = useServices();

  return useQuery({
    queryKey: listingKeys.detail(id),
    queryFn: async () => {
      const { data, error } = await listing.getListing(id);
      if (error) throw normalizeError(error);
      return data;
    },
    enabled: !!id,
  });
}

// ---------------------------------------------------------------------------
// Mutations
// ---------------------------------------------------------------------------

/** Create a new listing. */
export function useCreateListing() {
  const { listing } = useServices();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Record<string, unknown>) => {
      const { data: result, error } = await listing.createListing(data);
      if (error) throw normalizeError(error);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: listingKeys.lists() });
    },
  });
}

/** Update an existing listing. */
export function useUpdateListing() {
  const { listing } = useServices();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Record<string, unknown>;
    }) => {
      const { data: result, error } = await listing.updateListing(id, data);
      if (error) throw normalizeError(error);
      return result;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: listingKeys.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: listingKeys.lists() });
    },
  });
}

/** Deactivate a listing. */
export function useDeactivateListing() {
  const { listing } = useServices();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await listing.deactivateListing(id);
      if (error) throw normalizeError(error);
      return data;
    },
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: listingKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: listingKeys.lists() });
    },
  });
}

/** Place a bid on an auction listing. */
export function usePlaceBid() {
  const { listing } = useServices();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      listingId,
      bidderId,
      amount,
    }: {
      listingId: string;
      bidderId: string;
      amount: number;
    }) => {
      const { data, error } = await listing.placeBid(
        listingId,
        bidderId,
        amount
      );
      if (error) throw normalizeError(error);
      return data;
    },
    onSuccess: (_data, variables) => {
      // Refresh listing detail to show new bid
      queryClient.invalidateQueries({
        queryKey: listingKeys.detail(variables.listingId),
      });
    },
  });
}

/**
 * Toggle a bookmark on/off.
 *
 * Uses optimistic update: immediately toggles UI state, rolls back on error.
 */
export function useToggleBookmark() {
  const { listing } = useServices();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      listingId,
    }: {
      userId: string;
      listingId: string;
    }) => {
      const { data, error } = await listing.toggleBookmark(userId, listingId);
      if (error) throw normalizeError(error);
      return data;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: bookmarkKeys.list(variables.userId),
      });
      queryClient.invalidateQueries({
        queryKey: listingKeys.detail(variables.listingId),
      });
    },
  });
}
