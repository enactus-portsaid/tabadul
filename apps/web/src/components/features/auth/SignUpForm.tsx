'use client';

import { signUpSchema, type SignUpInput } from '@tabadul/shared/schemas';
import { Building2, Lock, Mail, Phone, User } from 'lucide-react';

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
export interface SignUpFormProps {
  /** Called with validated form data */
  onSubmit: (data: SignUpInput) => void | Promise<void>;
  /** External loading state */
  isLoading?: boolean;
  /** Server/API error message */
  serverError?: string;
}

// ---------------------------------------------------------------------------
// SignUpForm
// ---------------------------------------------------------------------------
/**
 * Registration form with full profile fields and Zod validation.
 * Includes password strength requirements and confirm-password match.
 *
 * @example
 * <SignUpForm onSubmit={handleSignUp} isLoading={isPending} />
 */
export function SignUpForm({
  onSubmit,
  isLoading = false,
  serverError,
}: SignUpFormProps) {
  const form = useZodForm(signUpSchema, {
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      fullName: '',
      companyName: '',
      role: undefined,
      phone: '',
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
        noValidate
      >
        {/* Full Name */}
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ahmed Mohamed"
                  autoComplete="name"
                  leftAddon={<User className="h-4 w-4" />}
                  error={form.formState.errors.fullName?.message}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Company Name */}
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Cairo Steel Industries"
                  autoComplete="organization"
                  leftAddon={<Building2 className="h-4 w-4" />}
                  error={form.formState.errors.companyName?.message}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
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

        {/* Phone */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder="01012345678"
                  autoComplete="tel"
                  leftAddon={<Phone className="h-4 w-4" />}
                  error={form.formState.errors.phone?.message}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Egyptian mobile number (e.g., 01012345678)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Role */}
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>I want to</FormLabel>
              <FormControl>
                <Select
                  placeholder="Select your role"
                  options={[
                    { value: 'buyer', label: 'Buy materials (Buyer)' },
                    { value: 'seller', label: 'Sell waste (Seller)' },
                  ]}
                  error={form.formState.errors.role?.message}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password */}
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
                  autoComplete="new-password"
                  leftAddon={<Lock className="h-4 w-4" />}
                  error={form.formState.errors.password?.message}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                At least 8 characters with uppercase, lowercase, and a number
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Confirm Password */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="••••••••"
                  autoComplete="new-password"
                  leftAddon={<Lock className="h-4 w-4" />}
                  error={form.formState.errors.confirmPassword?.message}
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
          Create Account
        </Button>
      </form>
    </Form>
  );
}
