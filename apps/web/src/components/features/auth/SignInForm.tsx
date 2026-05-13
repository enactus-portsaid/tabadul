'use client';

import { signInSchema, type SignInInput } from '@tabadul/shared/schemas';
import { Mail, Lock } from 'lucide-react';

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
export interface SignInFormProps {
  /** Called with validated form data */
  onSubmit: (data: SignInInput) => void | Promise<void>;
  /** External loading state (e.g., from mutation) */
  isLoading?: boolean;
  /** Server/API error message to display at form level */
  serverError?: string;
}

// ---------------------------------------------------------------------------
// SignInForm
// ---------------------------------------------------------------------------
/**
 * Email + password sign-in form with Zod validation.
 *
 * @example
 * <SignInForm onSubmit={handleSignIn} isLoading={isPending} />
 */
export function SignInForm({
  onSubmit,
  isLoading = false,
  serverError,
}: SignInFormProps) {
  const form = useZodForm(signInSchema, {
    defaultValues: {
      email: '',
      password: '',
    },
  });

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

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  leftAddon={<Lock className="h-4 w-4" />}
                  error={form.formState.errors.password?.message}
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
          Sign In
        </Button>
      </form>
    </Form>
  );
}
