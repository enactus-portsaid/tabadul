'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ReactNode } from 'react';

// ---------------------------------------------------------------------------
// Theme Provider Props
// ---------------------------------------------------------------------------
export interface ThemeProviderProps {
  children: ReactNode;
}

// ---------------------------------------------------------------------------
// Theme Provider
// ---------------------------------------------------------------------------
/**
 * Wraps the application with next-themes for dark/light/system theme support.
 *
 * Uses `class` strategy to toggle `.dark` on `<html>`, which Tailwind's
 * `@custom-variant dark` selector uses to apply dark-mode styles.
 *
 * Must be used inside a Client Component boundary.
 *
 * @example
 * // In root layout:
 * <ThemeProvider>
 *   {children}
 * </ThemeProvider>
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
