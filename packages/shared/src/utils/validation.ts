import type { z } from 'zod';

import { ValidationError } from '../lib/errors';

/**
 * Validates unknown data against a given Zod schema.
 *
 * If validation fails, it throws a standard `ValidationError`
 * containing structured details mapped by field path.
 *
 * @param schema The Zod schema to validate against
 * @param data The input data to validate
 * @returns The parsed and typed data
 * @throws {ValidationError} If validation fails
 */
export function validateData<T>(schema: z.ZodSchema<T>, data: unknown): T {
  const result = schema.safeParse(data);

  if (!result.success) {
    const formattedErrors: Record<string, string> = {};

    for (const issue of result.error.issues) {
      const path = issue.path.join('.') || 'root';
      // Only keep the first message for a given path to avoid overwriting with generic ones
      if (!formattedErrors[path]) {
        formattedErrors[path] = issue.message;
      }
    }

    throw new ValidationError('Input validation failed', formattedErrors);
  }

  return result.data;
}
