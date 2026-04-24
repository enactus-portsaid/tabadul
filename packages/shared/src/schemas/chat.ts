import { z } from 'zod';

export const createThreadSchema = z.object({
  listing_id: z.string().uuid('chat.validation.invalidListing'),
  seller_id: z.string().uuid('chat.validation.invalidSeller'),
});

export type CreateThreadInput = z.infer<typeof createThreadSchema>;

export const sendMessageSchema = z.object({
  thread_id: z.string().uuid('chat.validation.invalidThread'),
  content: z
    .string()
    .min(1, 'chat.validation.messageRequired')
    .max(2000, 'chat.validation.messageMaxLength'),
});

export type SendMessageInput = z.infer<typeof sendMessageSchema>;
