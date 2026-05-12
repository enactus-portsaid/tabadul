// ---------------------------------------------------------------------------
// API Hooks — Barrel export for all domain query hooks
// ---------------------------------------------------------------------------

// Listings
export {
  useCreateListing,
  useDeactivateListing,
  useListing,
  useListings,
  usePlaceBid,
  useToggleBookmark,
  useUpdateListing,
} from './useListings';

// Transactions
export {
  useCreateTransaction,
  useFileDispute,
  useSubmitReview,
  useTransaction,
  useTransactions,
  useUpdateShipmentStatus,
  useUpdateTransactionStatus,
  useUploadReceipt,
} from './useTransactions';

// Chat
export {
  useChatMessages,
  useChatThreads,
  useGetOrCreateThread,
  useMarkMessagesAsRead,
  useSendMessage,
} from './useChat';

// Notifications
export {
  useMarkNotificationAsRead,
  useNotificationPreferences,
  useNotifications,
  useUnreadCount,
  useUpdateNotificationPreferences,
} from './useNotifications';

// Matching
export { useDismissRecommendation, useRecommendations } from './useMatching';

// Inspection
export {
  useInspectionReport,
  useSubmitInspectionReport,
} from './useInspection';

// Admin
export {
  useAdminUsers,
  useModerateListing,
  useOpenDisputes,
  usePendingPayments,
  useResolveDispute,
  useVerifyReceipt,
} from './useAdmin';
