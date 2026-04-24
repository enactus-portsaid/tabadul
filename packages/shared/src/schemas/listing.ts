import { z } from 'zod';

export const listingModeSchema = z.enum(['fixed_price', 'auction']);

const baseListingSchema = z.object({
  category_id: z.string().uuid('listing.validation.invalidCategory'),
  title: z
    .string()
    .min(5, 'listing.validation.titleMinLength')
    .max(100, 'listing.validation.titleMaxLength'),
  description: z
    .string()
    .max(1000, 'listing.validation.descriptionMaxLength')
    .optional(),
  mode: listingModeSchema,
  price: z
    .number()
    .positive('listing.validation.pricePositive')
    .optional()
    .nullable(),
  minimum_bid: z
    .number()
    .positive('listing.validation.minimumBidPositive')
    .optional()
    .nullable(),
  auction_ends_at: z.string().datetime().optional().nullable(),
  quantity: z.number().positive('listing.validation.quantityPositive'),
  unit: z.string().min(1, 'listing.validation.unitRequired'),
  city: z.string().min(1, 'listing.validation.cityRequired'),
  pickup_address: z.string().max(255).optional(),
});

export const createListingSchema = baseListingSchema
  .refine(
    (data) => {
      if (data.mode === 'fixed_price') {
        return data.price != null && data.price > 0;
      }
      return true;
    },
    {
      message: 'listing.validation.priceRequiredForFixedMode',
      path: ['price'],
    }
  )
  .refine(
    (data) => {
      if (data.mode === 'auction') {
        return (
          data.minimum_bid != null &&
          data.minimum_bid > 0 &&
          data.auction_ends_at != null
        );
      }
      return true;
    },
    {
      message: 'listing.validation.auctionDetailsRequired',
      path: ['minimum_bid'],
    }
  );

export type CreateListingInput = z.infer<typeof createListingSchema>;

export const updateListingSchema = baseListingSchema
  .partial()
  .extend({
    status: z.enum(['draft', 'active', 'sold', 'deactivated']).optional(),
  })
  .refine(
    (data: any) => {
      // If we're updating mode to fixed_price, we must have price provided or already exist,
      // but full validation is tough on partial updates if we don't know existing state.
      // We will do a basic check for now.
      if (data.mode === 'fixed_price' && data.price !== undefined) {
        return data.price != null && data.price > 0;
      }
      return true;
    },
    {
      message: 'listing.validation.priceRequiredForFixedMode',
      path: ['price'],
    }
  );

export type UpdateListingInput = z.infer<typeof updateListingSchema>;

export const listingFilterSchema = z.object({
  category_id: z.string().uuid().optional(),
  status: z.enum(['draft', 'active', 'sold', 'deactivated']).optional(),
  mode: listingModeSchema.optional(),
  min_price: z.number().positive().optional(),
  max_price: z.number().positive().optional(),
  city: z.string().optional(),
  search: z.string().optional(),
});

export type ListingFilterInput = z.infer<typeof listingFilterSchema>;
