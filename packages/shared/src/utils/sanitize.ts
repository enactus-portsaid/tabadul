import { z } from 'zod';

// ---------------------------------------------------------------------------
// Input Sanitization Utilities
// ---------------------------------------------------------------------------
// Use these as Zod `.transform()` or `.pipe()` steps to sanitize user input
// before it reaches the service layer. Designed for the BaaS architecture
// where there is no Express middleware to sanitize requests globally.
// ---------------------------------------------------------------------------

/**
 * Trims leading/trailing whitespace and collapses internal runs of
 * whitespace to a single space. Use for single-line text fields.
 *
 * @example
 * ```ts
 * z.string().transform(trimWhitespace)
 * ```
 */
export function trimWhitespace(value: string): string {
  return value.trim().replace(/\s+/g, ' ');
}

/**
 * Trims leading/trailing whitespace but preserves intentional internal
 * line breaks. Use for multi-line fields like descriptions and comments.
 *
 * @example
 * ```ts
 * z.string().transform(trimPreserveNewlines)
 * ```
 */
export function trimPreserveNewlines(value: string): string {
  return value
    .split('\n')
    .map((line) => line.trim())
    .join('\n')
    .trim();
}

/**
 * Escapes HTML special characters to prevent XSS when rendering
 * user-generated content. This is a defense-in-depth measure —
 * React/RN auto-escape JSX, but Edge Functions and server-rendered
 * contexts may not.
 *
 * @example
 * ```ts
 * z.string().transform(escapeHtml)
 * ```
 */
export function escapeHtml(value: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
  };
  return value.replace(/[&<>"']/g, (char) => map[char] ?? char);
}

/**
 * Zod preprocessor that coerces `null` and `undefined` to `undefined`,
 * and trims strings. Useful for optional fields that may arrive as empty
 * strings from form inputs.
 *
 * @example
 * ```ts
 * z.preprocess(emptyToUndefined, z.string().optional())
 * ```
 */
export function emptyToUndefined(value: unknown): unknown {
  if (value === null || value === undefined) return undefined;
  if (typeof value === 'string' && value.trim() === '') return undefined;
  return value;
}

/**
 * Creates a sanitized string schema that trims whitespace and enforces
 * min/max length. A convenient shorthand for the most common case.
 *
 * @param fieldKey i18n key prefix for error messages
 * @param min     minimum length (default: 1)
 * @param max     maximum length (default: 255)
 */
export function sanitizedString(
  fieldKey: string,
  min = 1,
  max = 255
): z.ZodPipeline<z.ZodEffects<z.ZodString, string, string>, z.ZodString> {
  return z
    .string()
    .transform(trimWhitespace)
    .pipe(
      z
        .string()
        .min(min, `${fieldKey}.minLength`)
        .max(max, `${fieldKey}.maxLength`)
    );
}
