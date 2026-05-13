'use client';

// ---------------------------------------------------------------------------
// useChat — Query hooks for the Chat domain
// ---------------------------------------------------------------------------
// Covers thread listing, message fetching, message sending (with optimistic
// append), thread creation, and marking messages as read.
//
// Real-time: Uses refetchInterval (5s) for messages as a polling fallback.
// TODO(SOP-305): Replace refetchInterval with Supabase Realtime subscription
// that updates the TanStack Query cache directly via queryClient.setQueryData.
// ---------------------------------------------------------------------------

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useServices } from '@/hooks/useServices';
import { chatKeys, notificationKeys } from '@/lib/queryKeys';
import { normalizeError } from '@tabadul/shared/lib/errorHandler';

// ---------------------------------------------------------------------------
// Queries
// ---------------------------------------------------------------------------

/** Fetch all chat threads for a user. */
export function useChatThreads(userId: string) {
  const { chat } = useServices();

  return useQuery({
    queryKey: chatKeys.threads(),
    queryFn: async () => {
      const { data, error } = await chat.getThreads(userId);
      if (error) throw normalizeError(error);
      return data;
    },
    enabled: !!userId,
  });
}

/**
 * Fetch messages for a thread.
 *
 * Polls every 5 seconds as a Realtime fallback.
 * TODO(SOP-305): Replace with Supabase Realtime channel subscription.
 */
export function useChatMessages(threadId: string) {
  const { chat } = useServices();

  return useQuery({
    queryKey: chatKeys.messages(threadId),
    queryFn: async () => {
      const { data, error } = await chat.getMessages(threadId);
      if (error) throw normalizeError(error);
      return data;
    },
    enabled: !!threadId,
    refetchInterval: 5_000, // Polling fallback — replaced by Realtime in SOP-305
    staleTime: 2_000, // Messages are very time-sensitive
  });
}

// ---------------------------------------------------------------------------
// Mutations
// ---------------------------------------------------------------------------

/** Get or create a chat thread between buyer and seller. */
export function useGetOrCreateThread() {
  const { chat } = useServices();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      listingId,
      buyerId,
      sellerId,
    }: {
      listingId: string;
      buyerId: string;
      sellerId: string;
    }) => {
      const { data, error } = await chat.getOrCreateThread(
        listingId,
        buyerId,
        sellerId
      );
      if (error) throw normalizeError(error);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: chatKeys.threads() });
    },
  });
}

/**
 * Send a message in a chat thread.
 *
 * Uses optimistic update: appends the message to the cache immediately,
 * rolls back on error.
 */
export function useSendMessage() {
  const { chat } = useServices();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      threadId,
      senderId,
      content,
    }: {
      threadId: string;
      senderId: string;
      content: string;
    }) => {
      const { data, error } = await chat.sendMessage(
        threadId,
        senderId,
        content
      );
      if (error) throw normalizeError(error);
      return data;
    },
    // Optimistic update: append message immediately
    onMutate: async (variables) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: chatKeys.messages(variables.threadId),
      });

      // Snapshot previous messages
      const previousMessages = queryClient.getQueryData(
        chatKeys.messages(variables.threadId)
      );

      // Optimistically add the new message
      queryClient.setQueryData(
        chatKeys.messages(variables.threadId),
        (old: Array<Record<string, unknown>> | undefined) => [
          ...(old ?? []),
          {
            id: `temp-${Date.now()}`,
            thread_id: variables.threadId,
            sender_id: variables.senderId,
            content: variables.content,
            is_read: false,
            created_at: new Date().toISOString(),
          },
        ]
      );

      return { previousMessages };
    },
    // Rollback on error
    onError: (_err, variables, context) => {
      if (context?.previousMessages) {
        queryClient.setQueryData(
          chatKeys.messages(variables.threadId),
          context.previousMessages
        );
      }
    },
    // Always refetch after mutation settles
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: chatKeys.messages(variables.threadId),
      });
      queryClient.invalidateQueries({ queryKey: chatKeys.threads() });
    },
  });
}

/** Mark all messages in a thread as read. */
export function useMarkMessagesAsRead() {
  const { chat } = useServices();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      threadId,
      userId,
    }: {
      threadId: string;
      userId: string;
    }) => {
      const { error } = await chat.markMessagesAsRead(threadId, userId);
      if (error) throw normalizeError(error);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: chatKeys.messages(variables.threadId),
      });
      // Update unread notification count
      queryClient.invalidateQueries({
        queryKey: notificationKeys.unreadCount(),
      });
    },
  });
}
