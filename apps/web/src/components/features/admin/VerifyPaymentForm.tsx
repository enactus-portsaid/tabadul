'use client';

import { CheckCircle, XCircle } from 'lucide-react';
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
import { Textarea } from '@/components/ui/Textarea';
import { useZodForm } from '@/hooks/useZodForm';
import { cn } from '@/lib/cn';

// ---------------------------------------------------------------------------
// Schema — payment verification
// ---------------------------------------------------------------------------
const verifyPaymentFormSchema = z.object({
  action: z.enum(['verify', 'reject'], {
    required_error: 'admin.validation.actionRequired',
  }),
  notes: z.string().max(500).optional(),
});

export type VerifyPaymentFormInput = z.infer<typeof verifyPaymentFormSchema>;

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------
export interface VerifyPaymentFormProps {
  /** Amount on the receipt */
  amount?: number;
  /** Receipt type (deposit/remainder) */
  type?: string;
  onSubmit: (data: VerifyPaymentFormInput) => void | Promise<void>;
  isLoading?: boolean;
  serverError?: string;
}

// ---------------------------------------------------------------------------
// VerifyPaymentForm
// ---------------------------------------------------------------------------
/**
 * Admin payment verification form — verify or reject with optional notes.
 */
export function VerifyPaymentForm({
  amount,
  type,
  onSubmit,
  isLoading = false,
  serverError,
}: VerifyPaymentFormProps) {
  const form = useZodForm(verifyPaymentFormSchema, {
    defaultValues: {
      action: undefined,
      notes: '',
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
        {(amount || type) && (
          <div className="bg-surface-muted rounded-lg border border-gray-200 p-3 dark:border-gray-700">
            <div className="flex items-center justify-between text-sm">
              {type && (
                <span className="text-text-secondary capitalize">{type}</span>
              )}
              {amount && (
                <span className="text-text-primary font-semibold">
                  {amount.toLocaleString()} EGP
                </span>
              )}
            </div>
          </div>
        )}

        {/* Action — Verify/Reject toggle */}
        <FormField
          control={form.control}
          name="action"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Decision</FormLabel>
              <FormControl>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => field.onChange('verify')}
                    className={cn(
                      'flex flex-1 items-center justify-center gap-2 rounded-lg border-2 px-4 py-3 text-sm font-medium transition-colors',
                      action === 'verify'
                        ? 'border-green-500 bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300'
                        : 'text-text-secondary border-gray-200 hover:border-green-300 dark:border-gray-700'
                    )}
                  >
                    <CheckCircle className="h-5 w-5" />
                    Verify
                  </button>
                  <button
                    type="button"
                    onClick={() => field.onChange('reject')}
                    className={cn(
                      'flex flex-1 items-center justify-center gap-2 rounded-lg border-2 px-4 py-3 text-sm font-medium transition-colors',
                      action === 'reject'
                        ? 'border-red-500 bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300'
                        : 'text-text-secondary border-gray-200 hover:border-red-300 dark:border-gray-700'
                    )}
                  >
                    <XCircle className="h-5 w-5" />
                    Reject
                  </button>
                </div>
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
              <FormLabel>Notes (optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={
                    action === 'reject'
                      ? 'Explain the rejection reason...'
                      : 'Add any verification notes...'
                  }
                  error={form.formState.errors.notes?.message}
                  {...field}
                  value={field.value ?? ''}
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
          variant={action === 'reject' ? 'danger' : 'primary'}
          isLoading={isLoading}
          disabled={isLoading || !action}
        >
          {action === 'reject' ? 'Reject Payment' : 'Verify Payment'}
        </Button>
      </form>
    </Form>
  );
}
