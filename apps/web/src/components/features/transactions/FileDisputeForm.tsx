'use client';

import { z } from 'zod';
import { AlertTriangle } from 'lucide-react';

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
// Schema (not in shared schemas — specific to the dispute filing form)
// ---------------------------------------------------------------------------
const fileDisputeFormSchema = z.object({
  reason: z.enum(
    [
      'quality_mismatch',
      'quantity_mismatch',
      'delivery_issue',
      'payment_issue',
      'other',
    ],
    { required_error: 'dispute.validation.reasonRequired' }
  ),
  description: z
    .string()
    .min(10, 'dispute.validation.descriptionMinLength')
    .max(2000, 'dispute.validation.descriptionMaxLength'),
});

export type FileDisputeFormInput = z.infer<typeof fileDisputeFormSchema>;

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------
export interface FileDisputeFormProps {
  onSubmit: (data: FileDisputeFormInput) => void | Promise<void>;
  isLoading?: boolean;
  serverError?: string;
}

// ---------------------------------------------------------------------------
// FileDisputeForm
// ---------------------------------------------------------------------------
/**
 * Dispute filing form for transaction issues.
 * Captures reason category and detailed description.
 */
export function FileDisputeForm({
  onSubmit,
  isLoading = false,
  serverError,
}: FileDisputeFormProps) {
  const form = useZodForm(fileDisputeFormSchema, {
    defaultValues: {
      reason: undefined,
      description: '',
    },
  });

  const descriptionValue = form.watch('description');

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
        noValidate
      >
        <div className="flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 dark:border-amber-800 dark:bg-amber-950">
          <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          <p className="text-sm text-amber-800 dark:text-amber-200">
            Filing a dispute will pause the transaction until resolved by an
            admin.
          </p>
        </div>

        {/* Reason */}
        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reason</FormLabel>
              <FormControl>
                <Select
                  placeholder="Select dispute reason"
                  options={[
                    {
                      value: 'quality_mismatch',
                      label: 'Quality doesn\'t match description',
                    },
                    {
                      value: 'quantity_mismatch',
                      label: 'Quantity doesn\'t match',
                    },
                    { value: 'delivery_issue', label: 'Delivery problem' },
                    { value: 'payment_issue', label: 'Payment issue' },
                    { value: 'other', label: 'Other' },
                  ]}
                  error={form.formState.errors.reason?.message}
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
                  placeholder="Describe the issue in detail..."
                  maxLength={2000}
                  charCount={descriptionValue.length}
                  error={form.formState.errors.description?.message}
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
          variant="danger"
          className="w-full"
          isLoading={isLoading}
          disabled={isLoading}
        >
          File Dispute
        </Button>
      </form>
    </Form>
  );
}
