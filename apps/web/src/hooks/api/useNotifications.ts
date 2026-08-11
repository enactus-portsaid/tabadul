'use client';

// ---------------------------------------------------------------------------
// useNotifications — Query hooks for the Notifications domain
// ---------------------------------------------------------------------------
// Covers notification feed, unread count, mark-as-read (optimistic),
// and notification preferences.
// ---------------------------------------------------------------------------

import { normalizeError } from '@tabadul/shared/lib/errorHandler';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useServices } from '@/hooks/useServices';
import { notificationKeys } from '@/lib/queryKeys';

// ---------------------------------------------------------------------------
// Queries
// ---------------------------------------------------------------------------

/** Fetch all notifications for a user. */
export function useNotifications(userId: string) {
  const { notification } = useServices();

  return useQuery({
    queryKey: notificationKeys.lists(),
    queryFn: async () => {
      const { data, error } = await notification.getNotifications(userId);
      if (error) throw normalizeError(error);
      return data;
    },
    enabled: !!userId,
  });
}

/**
 * Fetch unread notification count.
 *
 * Uses a short staleTime (30s) so the badge updates frequently.
 */
export function useUnreadCount(userId: string) {
  const { notification } = useServices();

  return useQuery({
    queryKey: notificationKeys.unreadCount(),
    queryFn: async () => {
      const { count, error } = await notification.getUnreadCount(userId);
      if (error) throw normalizeError(error);
      return count ?? 0;
    },
    enabled: !!userId,
    staleTime: 30_000, // Refresh badge every 30 seconds
    refetchInterval: 30_000,
  });
}

/** Fetch notification preferences for a user. */
export function useNotificationPreferences(userId: string) {
  const { notification } = useServices();

  return useQuery({
    queryKey: notificationKeys.preferences(),
    queryFn: async () => {
      const { data, error } = await notification.getPreferences(userId);
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
 * Mark a notification as read.
 *
 * Uses optimistic update: immediately marks the item as read in the cache.
 */
export function useMarkNotificationAsRead() {
  const { notification } = useServices();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (notificationId: string) => {
      const { data, error } = await notification.markAsRead(notificationId);
      if (error) throw normalizeError(error);
      return data;
    },
    // Optimistic: mark as read in cache immediately
    onMutate: async (notificationId) => {
      await queryClient.cancelQueries({
        queryKey: notificationKeys.lists(),
      });

      const previousNotifications = queryClient.getQueryData(
        notificationKeys.lists()
      );

      queryClient.setQueryData(
        notificationKeys.lists(),
        (old: Array<Record<string, unknown>> | undefined) =>
          old?.map((n) =>
            n.id === notificationId ? { ...n, is_read: true } : n
          )
      );

      return { previousNotifications };
    },
    onError: (_err, _id, context) => {
      if (context?.previousNotifications) {
        queryClient.setQueryData(
          notificationKeys.lists(),
          context.previousNotifications
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: notificationKeys.unreadCount(),
      });
    },
  });
}

/** Update notification preferences. */
export function useUpdateNotificationPreferences() {
  const { notification } = useServices();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      data,
    }: {
      userId: string;
      data: Record<string, unknown>;
    }) => {
      const { data: result, error } = await notification.updatePreferences(
        userId,
        data
      );
      if (error) throw normalizeError(error);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: notificationKeys.preferences(),
      });
    },
  });
}
