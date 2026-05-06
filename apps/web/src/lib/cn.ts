import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges class names with Tailwind CSS conflict resolution.
 *
 * Combines `clsx` (conditional class joining) with `tailwind-merge`
 * (intelligent Tailwind class deduplication). Use this everywhere
 * instead of raw string concatenation.
 *
 * @example
 * cn('px-4 py-2', isActive && 'bg-primary', className)
 * cn('text-sm font-bold', 'text-lg') // → 'text-lg font-bold'
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
