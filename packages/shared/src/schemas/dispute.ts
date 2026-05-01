import { z } from 'zod';

export const disputeStatusSchema = z.enum([
  'open',
  'under_review',
  'resolved_buyer',
  'resolved_seller',
]);

export const fileDisputeSchema = z.object({
  transaction_id: z.string().uuid('dispute.validation.invalidTransaction'),
  reason: z
    .string()
    .min(10, 'dispute.validation.reasonMinLength')
    .max(2000, 'dispute.validation.reasonMaxLength'),
});

export type FileDisputeInput = z.infer<typeof fileDisputeSchema>;

export const resolveDisputeSchema = z.object({
  status: z.enum(['resolved_buyer', 'resolved_seller'], {
    required_error: 'dispute.validation.resolutionRequired',
  }),
  admin_resolution: z
    .string()
    .min(5, 'dispute.validation.resolutionMinLength')
    .max(2000, 'dispute.validation.resolutionMaxLength'),
});

export type ResolveDisputeInput = z.infer<typeof resolveDisputeSchema>;
