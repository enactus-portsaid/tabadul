'use client';

import {
  resetPasswordSchema,
  type ResetPasswordInput,
} from '@tabadul/shared/schemas';
import { Mail } from 'lucide-react';

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
export interface ResetPasswordFormProps {
  onSubmit: (data: ResetPasswordInput) => void | Promise<void>;
  isLoading?: boolean;
  serverError?: string;
  /** Show success state after email is sent */
  isSuccess?: boolean;
}

// ---------------------------------------------------------------------------
// ResetPasswordForm
// ---------------------------------------------------------------------------
export function ResetPasswordForm({
  onSubmit,
  isLoading = false,
  serverError,
  isSuccess = false,
}: ResetPasswordFormProps) {
  const form = useZodForm(resetPasswordSchema, {
    defaultValues: { email: '' },
  });

  if (isSuccess) {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-center dark:border-green-800 dark:bg-green-950">
        <p className="text-sm font-medium text-green-800 dark:text-green-200">
          Password reset email sent! Check your inbox.
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
        noValidate
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="you@company.com"
                  autoComplete="email"
                  leftAddon={<Mail className="h-4 w-4" />}
                  error={form.formState.errors.email?.message}
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
          size="lg"
          isLoading={isLoading}
          disabled={isLoading}
        >
          Send Reset Link
        </Button>
      </form>
    </Form>
  );
}
