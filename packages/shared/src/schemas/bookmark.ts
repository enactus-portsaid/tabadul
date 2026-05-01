import { z } from 'zod';

export const toggleBookmarkSchema = z.object({
  listing_id: z.string().uuid('bookmark.validation.invalidListing'),
});

export type ToggleBookmarkInput = z.infer<typeof toggleBookmarkSchema>;
