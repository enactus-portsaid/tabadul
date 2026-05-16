'use client';

import {
  updateProfileSchema,
  type UpdateProfileInput,
} from '@tabadul/shared/schemas';
import { Building2, MapPin, Phone, User } from 'lucide-react';

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
import { Textarea } from '@/components/ui/Textarea';
import { useZodForm } from '@/hooks/useZodForm';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------
export interface UpdateProfileFormProps {
  onSubmit: (data: UpdateProfileInput) => void | Promise<void>;
  isLoading?: boolean;
  serverError?: string;
  /** Pre-fill with existing profile data */
  defaultValues?: Partial<UpdateProfileInput>;
}

// ---------------------------------------------------------------------------
// UpdateProfileForm
// ---------------------------------------------------------------------------
/**
 * Profile edit form — all fields optional (partial update).
 *
 * @example
 * <UpdateProfileForm
 *   defaultValues={{ full_name: profile.full_name }}
 *   onSubmit={handleUpdate}
 * />
 */
export function UpdateProfileForm({
  onSubmit,
  isLoading = false,
  serverError,
  defaultValues,
}: UpdateProfileFormProps) {
  const form = useZodForm(updateProfileSchema, {
    defaultValues: {
      full_name: defaultValues?.full_name ?? '',
      company_name: defaultValues?.company_name ?? '',
      phone: defaultValues?.phone ?? '',
      location: defaultValues?.location ?? '',
      bio: defaultValues?.bio ?? '',
      avatar_url: defaultValues?.avatar_url ?? null,
    },
  });

  const bioValue = form.watch('bio') ?? '';

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
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ahmed Mohamed"
                  leftAddon={<User className="h-4 w-4" />}
                  error={form.formState.errors.full_name?.message}
                  {...field}
                  value={field.value ?? ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Company Name */}
        <FormField
          control={form.control}
          name="company_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Cairo Steel Industries"
                  leftAddon={<Building2 className="h-4 w-4" />}
                  error={form.formState.errors.company_name?.message}
                  {...field}
                  value={field.value ?? ''}
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
                  leftAddon={<Phone className="h-4 w-4" />}
                  error={form.formState.errors.phone?.message}
                  {...field}
                  value={field.value ?? ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Location */}
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input
                  placeholder="Cairo, Egypt"
                  leftAddon={<MapPin className="h-4 w-4" />}
                  error={form.formState.errors.location?.message}
                  {...field}
                  value={field.value ?? ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Bio */}
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell others about your business..."
                  maxLength={500}
                  charCount={bioValue.length}
                  error={form.formState.errors.bio?.message}
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
          size="lg"
          isLoading={isLoading}
          disabled={isLoading}
        >
          Save Changes
        </Button>
      </form>
    </Form>
  );
}
