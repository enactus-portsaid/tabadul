import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type UseFormProps } from 'react-hook-form';
import type { z } from 'zod';

/**
 * Pre-configured useForm with Zod schema validation.
 *
 * @example
 * const form = useZodForm(signInSchema, {
 *   defaultValues: { email: '', password: '' },
 * });
 */
export function useZodForm<TOutput extends Record<string, unknown>>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema: z.ZodType<TOutput, any, any>,
  options?: Omit<UseFormProps<TOutput>, 'resolver'>
) {
  return useForm<TOutput>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(schema as any),
    ...options,
  });
}
