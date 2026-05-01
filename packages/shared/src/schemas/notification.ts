import { z } from 'zod';

export const notificationTypeSchema = z.enum([
  'match',
  'message',
  'transaction',
  'system',
]);

export const notificationFilterSchema = z.object({
  type: notificationTypeSchema.optional(),
  is_read: z.boolean().optional(),
});

export type NotificationFilterInput = z.infer<
  typeof notificationFilterSchema
>;

export const updateNotificationPreferencesSchema = z.object({
  matches_enabled: z.boolean().optional(),
  messages_enabled: z.boolean().optional(),
  transactions_enabled: z.boolean().optional(),
  push_enabled: z.boolean().optional(),
});

export type UpdateNotificationPreferencesInput = z.infer<
  typeof updateNotificationPreferencesSchema
>;
