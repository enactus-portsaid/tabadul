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
// Schema — dispute resolution
// ---------------------------------------------------------------------------
const resolveDisputeFormSchema = z.object({
  resolution: z.enum(['resolved_buyer', 'resolved_seller', 'cancelled'], {
    required_error: 'admin.validation.resolutionRequired',
  }),
  notes: z
    .string()
    .min(10, 'admin.validation.resolutionNotesMinLength')
    .max(2000, 'admin.validation.resolutionNotesMaxLength'),
});

export type ResolveDisputeFormInput = z.infer<typeof resolveDisputeFormSchema>;

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------
export interface ResolveDisputeFormProps {
  /** Dispute ID for context */
  disputeId?: string;
  /** Brief description of the dispute */
  disputeSummary?: string;
  onSubmit: (data: ResolveDisputeFormInput) => void | Promise<void>;
  isLoading?: boolean;
  serverError?: string;
}

// ---------------------------------------------------------------------------
// ResolveDisputeForm
// ---------------------------------------------------------------------------
/**
 * Admin dispute resolution form — select outcome and provide rationale.
 */
export function ResolveDisputeForm({
  disputeSummary,
  onSubmit,
  isLoading = false,
  serverError,
}: ResolveDisputeFormProps) {
  const form = useZodForm(resolveDisputeFormSchema, {
    defaultValues: {
      resolution: undefined,
      notes: '',
    },
  });

  const notesValue = form.watch('notes');

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
        noValidate
      >
        {disputeSummary && (
          <div className="rounded-lg border border-gray-200 bg-surface-muted p-3 dark:border-gray-700">
            <p className="text-sm text-text-secondary">{disputeSummary}</p>
          </div>
        )}

        {/* Resolution */}
        <FormField
          control={form.control}
          name="resolution"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Resolution</FormLabel>
              <FormControl>
                <Select
                  placeholder="Select resolution"
                  options={[
                    {
                      value: 'resolved_buyer',
                      label: 'Resolve in favor of Buyer',
                    },
                    {
                      value: 'resolved_seller',
                      label: 'Resolve in favor of Seller',
                    },
                    {
                      value: 'cancelled',
                      label: 'Cancel Transaction',
                    },
                  ]}
                  error={form.formState.errors.resolution?.message}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Notes */}
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Resolution Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Explain the rationale for this decision..."
                  maxLength={2000}
                  charCount={notesValue.length}
                  error={form.formState.errors.notes?.message}
                  className="min-h-[120px]"
                  {...field}
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
          Submit Resolution
        </Button>
      </form>
    </Form>
  );
}
