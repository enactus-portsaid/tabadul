'use client';

// ---------------------------------------------------------------------------
// useMatching — Query hooks for the AI Matching domain
// ---------------------------------------------------------------------------
// Covers recommendation fetching and dismissal (optimistic).
// ---------------------------------------------------------------------------

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useServices } from '@/hooks/useServices';
import { matchingKeys } from '@/lib/queryKeys';
import { normalizeError } from '@tabadul/shared/lib/errorHandler';

// ---------------------------------------------------------------------------
// Queries
// ---------------------------------------------------------------------------

/** Fetch AI match recommendations for a user. */
export function useRecommendations(userId: string) {
  const { matching } = useServices();

  return useQuery({
    queryKey: matchingKeys.recommendations(userId),
    queryFn: async () => {
      const { data, error } = await matching.getRecommendations(userId);
      if (error) throw normalizeError(error);
      return data;
    },
    enabled: !!userId,
  });
}

// ---------------------------------------------------------------------------
// Mutations
// ---------------------------------------------------------------------------

/**
 * Dismiss a recommendation.
 *
 * Uses optimistic update: removes the card from the list immediately.
 */
export function useDismissRecommendation(userId: string) {
  const { matching } = useServices();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (recommendationId: string) => {
      const { data, error } =
        await matching.dismissRecommendation(recommendationId);
      if (error) throw normalizeError(error);
      return data;
    },
    // Optimistic: filter out the dismissed recommendation
    onMutate: async (recommendationId) => {
      await queryClient.cancelQueries({
        queryKey: matchingKeys.recommendations(userId),
      });

      const previousRecs = queryClient.getQueryData(
        matchingKeys.recommendations(userId)
      );

      queryClient.setQueryData(
        matchingKeys.recommendations(userId),
        (old: Array<Record<string, unknown>> | undefined) =>
          old?.filter((r) => r.id !== recommendationId)
      );

      return { previousRecs };
    },
    onError: (_err, _id, context) => {
      if (context?.previousRecs) {
        queryClient.setQueryData(
          matchingKeys.recommendations(userId),
          context.previousRecs
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: matchingKeys.recommendations(userId),
      });
    },
  });
}
