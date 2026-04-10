// ---------------------------------------------------------------------------
// Query Key Factory — Centralized cache key management for TanStack Query
// ---------------------------------------------------------------------------
// Pattern: Each domain has an `all` key and nested keys for specific queries.
// This enables precise cache invalidation (e.g., invalidate all auth queries,
// or just the session query).
//
// Usage:
//   queryClient.invalidateQueries({ queryKey: authKeys.all });
//   queryClient.invalidateQueries({ queryKey: listingKeys.lists() });
// ---------------------------------------------------------------------------

export const authKeys = {
  all: ['auth'] as const,
  session: () => [...authKeys.all, 'session'] as const,
  profile: (userId: string) => [...authKeys.all, 'profile', userId] as const,
};

export const listingKeys = {
  all: ['listings'] as const,
  lists: () => [...listingKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown>) =>
    [...listingKeys.lists(), filters] as const,
  details: () => [...listingKeys.all, 'detail'] as const,
  detail: (id: string) => [...listingKeys.details(), id] as const,
};

export const transactionKeys = {
  all: ['transactions'] as const,
  lists: () => [...transactionKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown>) =>
    [...transactionKeys.lists(), filters] as const,
  detail: (id: string) =>
    [...transactionKeys.all, 'detail', id] as const,
};

export const chatKeys = {
  all: ['chat'] as const,
  threads: () => [...chatKeys.all, 'threads'] as const,
  thread: (threadId: string) =>
    [...chatKeys.threads(), threadId] as const,
  messages: (threadId: string) =>
    [...chatKeys.all, 'messages', threadId] as const,
};

export const notificationKeys = {
  all: ['notifications'] as const,
  lists: () => [...notificationKeys.all, 'list'] as const,
  unreadCount: () =>
    [...notificationKeys.all, 'unreadCount'] as const,
  preferences: () =>
    [...notificationKeys.all, 'preferences'] as const,
};

export const matchingKeys = {
  all: ['matching'] as const,
  recommendations: (userId: string) =>
    [...matchingKeys.all, 'recommendations', userId] as const,
};
