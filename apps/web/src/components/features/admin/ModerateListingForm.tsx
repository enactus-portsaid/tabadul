'use client';

import { z } from 'zod';

import { Button } from '@/components/ui/Button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { useZodForm } from '@/hooks/useZodForm';

// ---------------------------------------------------------------------------
// Schema — listing moderation
// ---------------------------------------------------------------------------
const moderateListingFormSchema = z.object({
  action: z.enum(['approve', 'reject'], {
    required_error: 'admin.validation.actionRequired',
  }),
  reason: z.string().max(500).optional(),
});

export type ModerateListingFormInput = z.infer<
  typeof moderateListingFormSchema
>;

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------
export interface ModerateListingFormProps {
  /** The listing title for display context */
  listingTitle?: string;
  onSubmit: (data: ModerateListingFormInput) => void | Promise<void>;
  isLoading?: boolean;
  serverError?: string;
}

// ---------------------------------------------------------------------------
// ModerateListingForm
// ---------------------------------------------------------------------------
/**
 * Admin listing moderation form — approve or reject with optional reason.
 */
export function ModerateListingForm({
  listingTitle,
  onSubmit,
  isLoading = false,
  serverError,
}: ModerateListingFormProps) {
  const form = useZodForm(moderateListingFormSchema, {
    defaultValues: {
      action: undefined,
      reason: '',
    },
  });

  const action = form.watch('action');

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
        noValidate
      >
        {listingTitle && (
          <p className="text-text-secondary text-sm">
            Moderating:{' '}
            <span className="text-text-primary font-medium">
              {listingTitle}
            </span>
          </p>
        )}

        <FormField
          control={form.control}
          name="action"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Action</FormLabel>
              <FormControl>
                <Select
                  placeholder="Select action"
                  options={[
                    { value: 'approve', label: '✅ Approve' },
                    { value: 'reject', label: '❌ Reject' },
                  ]}
                  error={form.formState.errors.action?.message}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {action === 'reject' && (
          <FormField
            control={form.control}
            name="reason"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rejection Reason</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Explain why this listing is being rejected..."
                    error={form.formState.errors.reason?.message}
                    {...field}
                    value={field.value ?? ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {serverError && (
          <p role="alert" className="text-sm text-red-600 dark:text-red-400">
            {serverError}
          </p>
        )}

        <Button
          type="submit"
          className="w-full"
          variant={action === 'reject' ? 'danger' : 'primary'}
          isLoading={isLoading}
          disabled={isLoading}
        >
          {action === 'reject' ? 'Reject Listing' : 'Approve Listing'}
        </Button>
      </form>
    </Form>
  );
}
