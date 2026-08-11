'use client';

import { type PlaceBidInput, placeBidSchema } from '@tabadul/shared/schemas';
import { DollarSign } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { useZodForm } from '@/hooks/useZodForm';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------
export interface PlaceBidFormProps {
  /** The listing to bid on */
  listingId: string;
  /** Current highest bid or minimum bid (for display) */
  minimumAmount?: number;
  onSubmit: (data: PlaceBidInput) => void | Promise<void>;
  isLoading?: boolean;
  serverError?: string;
}

// ---------------------------------------------------------------------------
// PlaceBidForm
// ---------------------------------------------------------------------------
/**
 * Compact bid placement form for auction listings.
 *
 * @example
 * <PlaceBidForm
 *   listingId={listing.id}
 *   minimumAmount={listing.minimum_bid}
 *   onSubmit={handleBid}
 * />
 */
export function PlaceBidForm({
  listingId,
  minimumAmount,
  onSubmit,
  isLoading = false,
  serverError,
}: PlaceBidFormProps) {
  const form = useZodForm(placeBidSchema, {
    defaultValues: {
      listing_id: listingId,
      amount: undefined,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3"
        noValidate
      >
        {/* Hidden listing_id — already set via defaultValues */}
        <input type="hidden" {...form.register('listing_id')} />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Bid (EGP)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder={
                    minimumAmount
                      ? `Min: ${minimumAmount.toLocaleString()} EGP`
                      : 'Enter bid amount'
                  }
                  min={minimumAmount ?? 0}
                  step="0.01"
                  leftAddon={<DollarSign className="h-4 w-4" />}
                  error={form.formState.errors.amount?.message}
                  {...field}
                  value={field.value ?? ''}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value ? parseFloat(e.target.value) : undefined
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {serverError && (
          <p role="alert" className="text-sm text-red-600 dark:text-red-400">
            {serverError}
          </p>
        )}

        <Button
          type="submit"
          className="w-full"
          isLoading={isLoading}
          disabled={isLoading}
        >
          Place Bid
        </Button>
      </form>
    </Form>
  );
}
