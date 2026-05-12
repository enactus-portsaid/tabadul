'use client';

// ---------------------------------------------------------------------------
// useAdmin — Query hooks for the Admin domain
// ---------------------------------------------------------------------------
// Covers user management, listing moderation, payment verification,
// and dispute resolution. All hooks assume the current user has 'admin' role.
// ---------------------------------------------------------------------------

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useServices } from '@/hooks/useServices';
import { adminKeys, listingKeys, transactionKeys } from '@/lib/queryKeys';
import { normalizeError } from '@tabadul/shared/lib/errorHandler';

// ---------------------------------------------------------------------------
// Queries
// ---------------------------------------------------------------------------

/** Fetch all users (admin view), with optional role/status filters. */
export function useAdminUsers(filters?: {
  role?: string;
  isActive?: boolean;
}) {
  const { admin } = useServices();

  return useQuery({
    queryKey: adminKeys.users(filters),
    queryFn: async () => {
      const { data, error } = await admin.getUsers(filters);
      if (error) throw normalizeError(error);
      return data;
    },
  });
}

/** Fetch payments pending admin verification. */
export function usePendingPayments() {
  const { admin } = useServices();

  return useQuery({
    queryKey: adminKeys.pendingPayments(),
    queryFn: async () => {
      const { data, error } = await admin.getPendingPayments();
      if (error) throw normalizeError(error);
      return data;
    },
  });
}

/** Fetch open disputes awaiting resolution. */
export function useOpenDisputes() {
  const { admin } = useServices();

  return useQuery({
    queryKey: adminKeys.openDisputes(),
    queryFn: async () => {
      const { data, error } = await admin.getOpenDisputes();
      if (error) throw normalizeError(error);
      return data;
    },
  });
}

// ---------------------------------------------------------------------------
// Mutations
// ---------------------------------------------------------------------------

/** Moderate a listing (activate/deactivate). */
export function useModerateListing() {
  const { admin } = useServices();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      listingId,
      status,
    }: {
      listingId: string;
      status: 'active' | 'deactivated';
    }) => {
      const { data, error } = await admin.moderateListing(listingId, status);
      if (error) throw normalizeError(error);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: listingKeys.lists() });
    },
  });
}

/** Verify or reject a payment receipt. */
export function useVerifyReceipt() {
  const { admin } = useServices();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      paymentId,
      adminId,
      status,
      notes,
    }: {
      paymentId: string;
      adminId: string;
      status: 'verified' | 'rejected';
      notes?: string;
    }) => {
      const { data, error } = await admin.verifyReceipt(
        paymentId,
        adminId,
        status,
        notes
      );
      if (error) throw normalizeError(error);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: adminKeys.pendingPayments(),
      });
      // Also refresh transaction lists since payment status affects them
      queryClient.invalidateQueries({ queryKey: transactionKeys.all });
    },
  });
}

/** Resolve an open dispute. */
export function useResolveDispute() {
  const { admin } = useServices();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      disputeId,
      adminId,
      adminResolution,
      resolutionStatus,
    }: {
      disputeId: string;
      adminId: string;
      adminResolution: string;
      resolutionStatus: 'resolved_buyer' | 'resolved_seller';
    }) => {
      const { data, error } = await admin.resolveDispute(
        disputeId,
        adminId,
        adminResolution,
        resolutionStatus
      );
      if (error) throw normalizeError(error);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: adminKeys.openDisputes(),
      });
      queryClient.invalidateQueries({ queryKey: transactionKeys.all });
    },
  });
}
