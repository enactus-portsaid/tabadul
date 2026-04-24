import { z } from 'zod';

export const createReviewSchema = z.object({
  transaction_id: z.string().uuid('review.validation.invalidTransaction'),
  reviewed_user_id: z.string().uuid('review.validation.invalidReviewedUser'),
  rating: z
    .number()
    .int()
    .min(1, 'review.validation.ratingMin')
    .max(5, 'review.validation.ratingMax'),
  comment: z
    .string()
    .max(1000, 'review.validation.commentMaxLength')
    .optional()
    .nullable(),
});

export type CreateReviewInput = z.infer<typeof createReviewSchema>;
