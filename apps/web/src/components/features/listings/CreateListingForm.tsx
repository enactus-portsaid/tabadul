'use client';

import {
  type CreateListingInput,
  createListingSchema,
} from '@tabadul/shared/schemas';
import { MapPin, Package, Ruler, Tag, Type } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { useZodForm } from '@/hooks/useZodForm';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------
export interface CreateListingFormProps {
  onSubmit: (data: CreateListingInput) => void | Promise<void>;
  isLoading?: boolean;
  serverError?: string;
  /** Available waste categories for the dropdown */
  categories: Array<{ value: string; label: string }>;
}

// ---------------------------------------------------------------------------
// CreateListingForm
// ---------------------------------------------------------------------------
/**
 * Multi-field listing creation form with mode-dependent conditional fields.
 * Fixed-price mode shows price field; auction mode shows minimum bid + end date.
 *
 * @example
 * <CreateListingForm
 *   categories={categories}
 *   onSubmit={handleCreate}
 *   isLoading={isPending}
 * />
 */
export function CreateListingForm({
  onSubmit,
  isLoading = false,
  serverError,
  categories,
}: CreateListingFormProps) {
  const form = useZodForm(createListingSchema, {
    defaultValues: {
      category_id: '',
      title: '',
      description: '',
      mode: 'fixed_price',
      price: undefined,
      minimum_bid: undefined,
      auction_ends_at: undefined,
      quantity: undefined,
      unit: '',
      city: '',
      pickup_address: '',
    },
  });

  const mode = form.watch('mode');
  const descriptionValue = form.watch('description') ?? '';

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
        noValidate
      >
        {/* ── Basic Info ─────────────────────────────────────── */}
        <fieldset className="space-y-4">
          <legend className="text-text-primary text-base font-semibold">
            Basic Information
          </legend>

          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., Steel Scraps — 500kg"
                    leftAddon={<Type className="h-4 w-4" />}
                    error={form.formState.errors.title?.message}
                    {...field}
                  />
                </FormControl>
                <FormDescription>5–100 characters</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Category */}
          <FormField
            control={form.control}
            name="category_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select
                    placeholder="Select waste category"
                    options={categories}
                    error={form.formState.errors.category_id?.message}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe the waste material, condition, and any relevant details..."
                    maxLength={1000}
                    charCount={descriptionValue.length}
                    error={form.formState.errors.description?.message}
                    {...field}
                    value={field.value ?? ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>

        {/* ── Quantity & Location ─────────────────────────────── */}
        <fieldset className="space-y-4">
          <legend className="text-text-primary text-base font-semibold">
            Quantity & Location
          </legend>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Quantity */}
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="500"
                      min={0}
                      step="any"
                      leftAddon={<Package className="h-4 w-4" />}
                      error={form.formState.errors.quantity?.message}
                      {...field}
                      value={field.value ?? ''}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value
                            ? parseFloat(e.target.value)
                            : undefined
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Unit */}
            <FormField
              control={form.control}
              name="unit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="kg, tons, liters..."
                      leftAddon={<Ruler className="h-4 w-4" />}
                      error={form.formState.errors.unit?.message}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* City */}
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Cairo"
                      leftAddon={<MapPin className="h-4 w-4" />}
                      error={form.formState.errors.city?.message}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Pickup Address */}
            <FormField
              control={form.control}
              name="pickup_address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pickup Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Industrial Zone, 10th of Ramadan"
                      error={form.formState.errors.pickup_address?.message}
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </fieldset>

        {/* ── Pricing ─────────────────────────────────────────── */}
        <fieldset className="space-y-4">
          <legend className="text-text-primary text-base font-semibold">
            Pricing
          </legend>

          {/* Mode */}
          <FormField
            control={form.control}
            name="mode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Listing Mode</FormLabel>
                <FormControl>
                  <Select
                    options={[
                      { value: 'fixed_price', label: 'Fixed Price' },
                      { value: 'auction', label: 'Auction' },
                    ]}
                    error={form.formState.errors.mode?.message}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Fixed Price — shown when mode is fixed_price */}
          {mode === 'fixed_price' && (
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price (EGP)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="1500.00"
                      min={0}
                      step="0.01"
                      leftAddon={<Tag className="h-4 w-4" />}
                      error={form.formState.errors.price?.message}
                      {...field}
                      value={field.value ?? ''}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value
                            ? parseFloat(e.target.value)
                            : undefined
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Auction fields — shown when mode is auction */}
          {mode === 'auction' && (
            <>
              <FormField
                control={form.control}
                name="minimum_bid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minimum Bid (EGP)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="500.00"
                        min={0}
                        step="0.01"
                        leftAddon={<Tag className="h-4 w-4" />}
                        error={form.formState.errors.minimum_bid?.message}
                        {...field}
                        value={field.value ?? ''}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value
                              ? parseFloat(e.target.value)
                              : undefined
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="auction_ends_at"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Auction End Date</FormLabel>
                    <FormControl>
                      <Input
                        type="datetime-local"
                        error={form.formState.errors.auction_ends_at?.message}
                        {...field}
                        value={field.value ?? ''}
                      />
                    </FormControl>
                    <FormDescription>
                      When should the auction close?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
        </fieldset>

        {serverError && (
          <p role="alert" className="text-sm text-red-600 dark:text-red-400">
            {serverError}
          </p>
        )}

        <Button
          type="submit"
          className="w-full"
          size="lg"
          isLoading={isLoading}
          disabled={isLoading}
        >
          Create Listing
        </Button>
      </form>
    </Form>
  );
}
