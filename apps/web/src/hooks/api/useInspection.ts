'use client';

// ---------------------------------------------------------------------------
// useInspection — Query hooks for the Inspection domain
// ---------------------------------------------------------------------------
// Covers inspection report fetching and submission.
// ---------------------------------------------------------------------------

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useServices } from '@/hooks/useServices';
import { inspectionKeys, transactionKeys } from '@/lib/queryKeys';
import { normalizeError } from '@tabadul/shared/lib/errorHandler';

// ---------------------------------------------------------------------------
// Queries
// ---------------------------------------------------------------------------

/** Fetch the inspection report for a transaction. */
export function useInspectionReport(transactionId: string) {
  const { inspection } = useServices();

  return useQuery({
    queryKey: inspectionKeys.report(transactionId),
    queryFn: async () => {
      const { data, error } = await inspection.getReport(transactionId);
      if (error) throw normalizeError(error);
      return data;
    },
    enabled: !!transactionId,
    // Don't retry 404 — report may not exist yet
    retry: false,
  });
}

// ---------------------------------------------------------------------------
// Mutations
// ---------------------------------------------------------------------------

/** Submit an inspection report (inspector role). */
export function useSubmitInspectionReport() {
  const { inspection } = useServices();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      transactionId,
      inspectorId,
      result,
      notes,
      photos,
    }: {
      transactionId: string;
      inspectorId: string;
      result: 'pass' | 'fail';
      notes: string;
      photos?: string[];
    }) => {
      const { data, error } = await inspection.submitReport(
        transactionId,
        inspectorId,
        result,
        notes,
        photos
      );
      if (error) throw normalizeError(error);
      return data;
    },
    onSuccess: (_data, variables) => {
      // Refresh both the inspection report and the parent transaction
      queryClient.invalidateQueries({
        queryKey: inspectionKeys.report(variables.transactionId),
      });
      queryClient.invalidateQueries({
        queryKey: transactionKeys.detail(variables.transactionId),
      });
    },
  });
}
