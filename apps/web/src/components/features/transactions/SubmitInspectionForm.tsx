'use client';

import {
  submitInspectionReportSchema,
  type SubmitInspectionReportInput,
} from '@tabadul/shared/schemas';
import { Camera, CheckCircle, XCircle } from 'lucide-react';

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
import { Textarea } from '@/components/ui/Textarea';
import { cn } from '@/lib/cn';
import { useZodForm } from '@/hooks/useZodForm';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------
export interface SubmitInspectionFormProps {
  transactionId: string;
  onSubmit: (data: SubmitInspectionReportInput) => void | Promise<void>;
  isLoading?: boolean;
  serverError?: string;
}

// ---------------------------------------------------------------------------
// SubmitInspectionForm
// ---------------------------------------------------------------------------
/**
 * Inspection report form for middleman inspectors.
 * Pass/fail result, notes, and photo URLs.
 */
export function SubmitInspectionForm({
  transactionId,
  onSubmit,
  isLoading = false,
  serverError,
}: SubmitInspectionFormProps) {
  const form = useZodForm(submitInspectionReportSchema, {
    defaultValues: {
      transaction_id: transactionId,
      result: undefined,
      notes: '',
      photos: [],
    },
  });

  const result = form.watch('result');
  const notesValue = form.watch('notes') ?? '';

  /** Add a photo URL to the array */
  const addPhoto = (url: string) => {
    const current = form.getValues('photos') ?? [];
    form.setValue('photos', [...current, url], { shouldValidate: true });
  };

  /** Remove a photo URL by index */
  const removePhoto = (index: number) => {
    const current = form.getValues('photos') ?? [];
    form.setValue(
      'photos',
      current.filter((_: string, i: number) => i !== index),
      { shouldValidate: true }
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
        noValidate
      >
        <input type="hidden" {...form.register('transaction_id')} />

        {/* Result — Pass/Fail toggle */}
        <FormField
          control={form.control}
          name="result"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Inspection Result</FormLabel>
              <FormControl>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => field.onChange('pass')}
                    className={cn(
                      'flex flex-1 items-center justify-center gap-2 rounded-lg border-2 px-4 py-3 text-sm font-medium transition-colors',
                      result === 'pass'
                        ? 'border-green-500 bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300'
                        : 'border-gray-200 text-text-secondary hover:border-green-300 dark:border-gray-700'
                    )}
                  >
                    <CheckCircle className="h-5 w-5" />
                    Pass
                  </button>
                  <button
                    type="button"
                    onClick={() => field.onChange('fail')}
                    className={cn(
                      'flex flex-1 items-center justify-center gap-2 rounded-lg border-2 px-4 py-3 text-sm font-medium transition-colors',
                      result === 'fail'
                        ? 'border-red-500 bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300'
                        : 'border-gray-200 text-text-secondary hover:border-red-300 dark:border-gray-700'
                    )}
                  >
                    <XCircle className="h-5 w-5" />
                    Fail
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
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your inspection findings..."
                  maxLength={2000}
                  charCount={notesValue.length}
                  error={form.formState.errors.notes?.message}
                  className="min-h-[100px]"
                  {...field}
                  value={field.value ?? ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Photos */}
        <FormField
          control={form.control}
          name="photos"
          render={() => (
            <FormItem>
              <FormLabel>Photos</FormLabel>
              <FormControl>
                <div className="space-y-2">
                  {/* Photo URL list */}
                  {(form.watch('photos') ?? []).map(
                    (url: string, index: number) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 rounded-md border border-gray-200 bg-surface px-3 py-2 text-sm dark:border-gray-700"
                      >
                        <Camera className="h-4 w-4 text-text-muted" />
                        <span className="flex-1 truncate text-text-secondary">
                          {url}
                        </span>
                        <button
                          type="button"
                          onClick={() => removePhoto(index)}
                          className="text-xs text-red-600 hover:text-red-700 dark:text-red-400"
                        >
                          Remove
                        </button>
                      </div>
                    )
                  )}

                  {/* Add photo URL input */}
                  <div className="flex gap-2">
                    <Input
                      id="photo-url-input"
                      type="url"
                      placeholder="Paste photo URL..."
                      leftAddon={<Camera className="h-4 w-4" />}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          const input = e.currentTarget;
                          if (input.value) {
                            addPhoto(input.value);
                            input.value = '';
                          }
                        }
                      }}
                    />
                    <Button
                      type="button"
                      variant="secondary"
                      size="md"
                      onClick={() => {
                        const input = document.getElementById(
                          'photo-url-input'
                        ) as HTMLInputElement;
                        if (input?.value) {
                          addPhoto(input.value);
                          input.value = '';
                        }
                      }}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </FormControl>
              <FormDescription>
                Add URLs of inspection photos (press Enter or click Add)
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
          disabled={isLoading || !result}
        >
          Submit Report
        </Button>
      </form>
    </Form>
  );
}
