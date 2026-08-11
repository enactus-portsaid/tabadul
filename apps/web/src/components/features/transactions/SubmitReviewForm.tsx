'use client';

import {
  type CreateReviewInput,
  createReviewSchema,
} from '@tabadul/shared/schemas';
import { Star } from 'lucide-react';
import { useState } from 'react';

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
// Props
// ---------------------------------------------------------------------------
export interface SubmitReviewFormProps {
  transactionId: string;
  reviewedUserId: string;
  /** Display name of the user being reviewed */
  reviewedUserName?: string;
  onSubmit: (data: CreateReviewInput) => void | Promise<void>;
  isLoading?: boolean;
  serverError?: string;
}

// ---------------------------------------------------------------------------
// StarRating — interactive star input
// ---------------------------------------------------------------------------
function StarRating({
  value,
  onChange,
}: {
  value: number;
  onChange: (rating: number) => void;
}) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex gap-1" role="radiogroup" aria-label="Rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          role="radio"
          aria-checked={value === star}
          aria-label={`${star} star${star !== 1 ? 's' : ''}`}
          className="focus-visible:ring-primary rounded-sm p-0.5 transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:outline-none"
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(star)}
        >
          <Star
            className={cn(
              'h-7 w-7 transition-colors',
              (hovered || value) >= star
                ? 'fill-amber-400 text-amber-400'
                : 'fill-none text-gray-300 dark:text-gray-600'
            )}
          />
        </button>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// SubmitReviewForm
// ---------------------------------------------------------------------------
/**
 * Review form with interactive star rating and optional comment.
 *
 * @example
 * <SubmitReviewForm
 *   transactionId={tx.id}
 *   reviewedUserId={tx.seller_id}
 *   reviewedUserName="Ahmed's Steel Factory"
 *   onSubmit={handleReview}
 * />
 */
export function SubmitReviewForm({
  transactionId,
  reviewedUserId,
  reviewedUserName,
  onSubmit,
  isLoading = false,
  serverError,
}: SubmitReviewFormProps) {
  const form = useZodForm(createReviewSchema, {
    defaultValues: {
      transaction_id: transactionId,
      reviewed_user_id: reviewedUserId,
      rating: 0,
      comment: '',
    },
  });

  const commentValue = form.watch('comment') ?? '';

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
        noValidate
      >
        {/* Hidden IDs */}
        <input type="hidden" {...form.register('transaction_id')} />
        <input type="hidden" {...form.register('reviewed_user_id')} />

        {reviewedUserName && (
          <p className="text-text-secondary text-sm">
            Rate your experience with{' '}
            <span className="text-text-primary font-medium">
              {reviewedUserName}
            </span>
          </p>
        )}

        {/* Star Rating */}
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating</FormLabel>
              <FormControl>
                <StarRating value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Comment */}
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comment (optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Share your experience..."
                  maxLength={1000}
                  charCount={commentValue.length}
                  error={form.formState.errors.comment?.message}
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
          isLoading={isLoading}
          disabled={isLoading || form.watch('rating') === 0}
        >
          Submit Review
        </Button>
      </form>
    </Form>
  );
}
