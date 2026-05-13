'use client';

import { z } from 'zod';
import { Bell, Mail, MessageSquare, Package, Truck } from 'lucide-react';
import type { ReactNode } from 'react';

import { Button } from '@/components/ui/Button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/Form';
import { cn } from '@/lib/cn';
import { useZodForm } from '@/hooks/useZodForm';

// ---------------------------------------------------------------------------
// Schema — notification preference toggles
// ---------------------------------------------------------------------------
const notificationPreferencesSchema = z.object({
  email_notifications: z.boolean(),
  push_notifications: z.boolean(),
  new_message: z.boolean(),
  transaction_update: z.boolean(),
  listing_match: z.boolean(),
  bid_received: z.boolean(),
  inspection_update: z.boolean(),
});

export type NotificationPreferencesInput = z.infer<
  typeof notificationPreferencesSchema
>;

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------
export interface NotificationPreferencesFormProps {
  onSubmit: (data: NotificationPreferencesInput) => void | Promise<void>;
  isLoading?: boolean;
  serverError?: string;
  defaultValues?: Partial<NotificationPreferencesInput>;
}

// ---------------------------------------------------------------------------
// Toggle — styled checkbox toggle
// ---------------------------------------------------------------------------
function Toggle({
  checked,
  onChange,
  label,
  description,
  icon,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
  icon?: ReactNode;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-gray-200 p-3 transition-colors hover:bg-surface-muted dark:border-gray-700">
      {icon && (
        <span className="mt-0.5 text-text-muted">{icon}</span>
      )}
      <div className="flex-1">
        <span className="text-sm font-medium text-text-primary">{label}</span>
        {description && (
          <p className="text-xs text-text-secondary">{description}</p>
        )}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
          checked ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'
        )}
      >
        <span
          className={cn(
            'pointer-events-none block h-5 w-5 rounded-full bg-white shadow-sm transition-transform',
            checked ? 'translate-x-5' : 'translate-x-0'
          )}
        />
      </button>
    </label>
  );
}

// ---------------------------------------------------------------------------
// NotificationPreferencesForm
// ---------------------------------------------------------------------------
/**
 * Notification preferences form with toggle switches.
 *
 * @example
 * <NotificationPreferencesForm
 *   defaultValues={preferences}
 *   onSubmit={handleUpdate}
 * />
 */
export function NotificationPreferencesForm({
  onSubmit,
  isLoading = false,
  serverError,
  defaultValues,
}: NotificationPreferencesFormProps) {
  const form = useZodForm(notificationPreferencesSchema, {
    defaultValues: {
      email_notifications: defaultValues?.email_notifications ?? true,
      push_notifications: defaultValues?.push_notifications ?? true,
      new_message: defaultValues?.new_message ?? true,
      transaction_update: defaultValues?.transaction_update ?? true,
      listing_match: defaultValues?.listing_match ?? true,
      bid_received: defaultValues?.bid_received ?? true,
      inspection_update: defaultValues?.inspection_update ?? true,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
        noValidate
      >
        {/* Channels */}
        <fieldset className="space-y-3">
          <legend className="text-base font-semibold text-text-primary">
            Notification Channels
          </legend>

          <FormField
            control={form.control}
            name="email_notifications"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Toggle
                    checked={field.value}
                    onChange={field.onChange}
                    label="Email Notifications"
                    description="Receive notifications via email"
                    icon={<Mail className="h-4 w-4" />}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="push_notifications"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Toggle
                    checked={field.value}
                    onChange={field.onChange}
                    label="Push Notifications"
                    description="Receive browser push notifications"
                    icon={<Bell className="h-4 w-4" />}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </fieldset>

        {/* Event Types */}
        <fieldset className="space-y-3">
          <legend className="text-base font-semibold text-text-primary">
            Event Types
          </legend>

          <FormField
            control={form.control}
            name="new_message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Toggle
                    checked={field.value}
                    onChange={field.onChange}
                    label="New Messages"
                    description="When someone sends you a chat message"
                    icon={<MessageSquare className="h-4 w-4" />}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="transaction_update"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Toggle
                    checked={field.value}
                    onChange={field.onChange}
                    label="Transaction Updates"
                    description="Status changes on your transactions"
                    icon={<Truck className="h-4 w-4" />}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="listing_match"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Toggle
                    checked={field.value}
                    onChange={field.onChange}
                    label="Listing Matches"
                    description="AI-matched listings for your needs"
                    icon={<Package className="h-4 w-4" />}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bid_received"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Toggle
                    checked={field.value}
                    onChange={field.onChange}
                    label="Bids Received"
                    description="When someone bids on your auction listings"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="inspection_update"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Toggle
                    checked={field.value}
                    onChange={field.onChange}
                    label="Inspection Updates"
                    description="Inspection scheduling and results"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </fieldset>

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
          Save Preferences
        </Button>
      </form>
    </Form>
  );
}
