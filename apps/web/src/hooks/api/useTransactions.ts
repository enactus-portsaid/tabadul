'use client';

// ---------------------------------------------------------------------------
// useTransactions — Query hooks for the Transactions domain
// ---------------------------------------------------------------------------
// Covers the full transaction lifecycle: list, detail, create,
// status updates, receipt upload, review submission, and dispute filing.
// ---------------------------------------------------------------------------

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useServices } from '@/hooks/useServices';
import { transactionKeys } from '@/lib/queryKeys';
import { normalizeError } from '@tabadul/shared/lib/errorHandler';

// ---------------------------------------------------------------------------
// Queries
// ---------------------------------------------------------------------------

/** Fetch transactions for a user by role. */
export function useTransactions(userId: string, role: 'buyer' | 'seller') {
  const { transaction } = useServices();

  return useQuery({
    queryKey: transactionKeys.list({ userId, role }),
    queryFn: async () => {
      const { data, error } = await transaction.getTransactions(userId, role);
      if (error) throw normalizeError(error);
      return data;
    },
    enabled: !!userId,
  });
}

/** Fetch a single transaction with full relations. */
export function useTransaction(id: string) {
  const { transaction } = useServices();

  return useQuery({
    queryKey: transactionKeys.detail(id),
    queryFn: async () => {
      const { data, error } = await transaction.getTransaction(id);
      if (error) throw normalizeError(error);
      return data;
    },
    enabled: !!id,
  });
}

// ---------------------------------------------------------------------------
// Mutations
// ---------------------------------------------------------------------------

/** Create a new transaction (buy-now or accept-bid). */
export function useCreateTransaction() {
  const { transaction } = useServices();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Record<string, unknown>) => {
      const { data: result, error } = await transaction.createTransaction(data);
      if (error) throw normalizeError(error);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: transactionKeys.lists() });
    },
  });
}

/** Update transaction status (e.g., pending → in_progress). */
export function useUpdateTransactionStatus() {
  const { transaction } = useServices();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { data, error } = await transaction.updateStatus(id, status);
      if (error) throw normalizeError(error);
      return data;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: transactionKeys.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: transactionKeys.lists() });
    },
  });
}

/** Update shipment/delivery status. */
export function useUpdateShipmentStatus() {
  const { transaction } = useServices();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      shipmentStatus,
    }: {
      id: string;
      shipmentStatus: string;
    }) => {
      const { data, error } = await transaction.updateShipmentStatus(
        id,
        shipmentStatus
      );
      if (error) throw normalizeError(error);
      return data;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: transactionKeys.detail(variables.id),
      });
    },
  });
}

/** Upload a payment receipt. */
export function useUploadReceipt() {
  const { transaction } = useServices();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      transactionId,
      paidBy,
      type,
      amount,
      receiptUrl,
    }: {
      transactionId: string;
      paidBy: string;
      type: string;
      amount: number;
      receiptUrl: string;
    }) => {
      const { data, error } = await transaction.uploadReceipt(
        transactionId,
        paidBy,
        type,
        amount,
        receiptUrl
      );
      if (error) throw normalizeError(error);
      return data;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: transactionKeys.detail(variables.transactionId),
      });
    },
  });
}

/** Submit a review for a completed transaction. */
export function useSubmitReview() {
  const { transaction } = useServices();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Record<string, unknown>) => {
      const { data: result, error } = await transaction.submitReview(data);
      if (error) throw normalizeError(error);
      return result;
    },
    onSuccess: (_data, _variables) => {
      // Invalidate all transaction caches — review affects multiple views
      queryClient.invalidateQueries({ queryKey: transactionKeys.all });
    },
  });
}

/** File a dispute on a transaction. */
export function useFileDispute() {
  const { transaction } = useServices();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      transactionId,
      filedBy,
      reason,
    }: {
      transactionId: string;
      filedBy: string;
      reason: string;
    }) => {
      const { data, error } = await transaction.fileDispute(
        transactionId,
        filedBy,
        reason
      );
      if (error) throw normalizeError(error);
      return data;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: transactionKeys.detail(variables.transactionId),
      });
    },
  });
}
