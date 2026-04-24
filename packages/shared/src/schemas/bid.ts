import { z } from 'zod';

export const placeBidSchema = z.object({
  listing_id: z.string().uuid('bid.validation.invalidListing'),
  amount: z.number().positive('bid.validation.amountPositive'),
});

export type PlaceBidInput = z.infer<typeof placeBidSchema>;
