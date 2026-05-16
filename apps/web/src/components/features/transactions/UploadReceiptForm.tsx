'use client';

import {
  uploadReceiptSchema,
  type UploadReceiptInput,
} from '@tabadul/shared/schemas';
import { DollarSign, Upload } from 'lucide-react';

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
import { useZodForm } from '@/hooks/useZodForm';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------
export interface UploadReceiptFormProps {
  onSubmit: (data: UploadReceiptInput) => void | Promise<void>;
  isLoading?: boolean;
  serverError?: string;
  /** Expected deposit/remainder amount for display */
  expectedAmount?: number;
}

// ---------------------------------------------------------------------------
// UploadReceiptForm
// ---------------------------------------------------------------------------
/**
 * Payment receipt upload form for transactions.
 * Users select receipt type (deposit/remainder), enter amount, and provide receipt URL.
 */
export function UploadReceiptForm({
  onSubmit,
  isLoading = false,
  serverError,
  expectedAmount,
}: UploadReceiptFormProps) {
  const form = useZodForm(uploadReceiptSchema, {
    defaultValues: {
      type: undefined,
      amount: expectedAmount ?? undefined,
      receipt_url: '',
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
        noValidate
      >
        {/* Receipt Type */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment Type</FormLabel>
              <FormControl>
                <Select
                  placeholder="Select payment type"
                  options={[
                    { value: 'deposit', label: 'Deposit' },
                    { value: 'remainder', label: 'Remainder' },
                  ]}
                  error={form.formState.errors.type?.message}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Amount */}
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount (EGP)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="1500.00"
                  min={0}
                  step="0.01"
                  leftAddon={<DollarSign className="h-4 w-4" />}
                  error={form.formState.errors.amount?.message}
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
              {expectedAmount && (
                <FormDescription>
                  Expected: {expectedAmount.toLocaleString()} EGP
                </FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Receipt URL */}
        <FormField
          control={form.control}
          name="receipt_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Receipt Image URL</FormLabel>
              <FormControl>
                <Input
                  type="url"
                  placeholder="https://..."
                  leftAddon={<Upload className="h-4 w-4" />}
                  error={form.formState.errors.receipt_url?.message}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Upload your InstaPay screenshot and paste the URL here
              </FormDescription>
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
          Submit Receipt
        </Button>
      </form>
    </Form>
  );
}
