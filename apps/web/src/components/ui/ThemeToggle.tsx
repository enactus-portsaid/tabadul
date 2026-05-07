'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/cn';

// ---------------------------------------------------------------------------
// ThemeToggle Props
// ---------------------------------------------------------------------------
export interface ThemeToggleProps {
  /** Additional class names */
  className?: string;
}

// ---------------------------------------------------------------------------
// ThemeToggle Component
// ---------------------------------------------------------------------------
/**
 * Accessible dark/light mode toggle button.
 *
 * Cycles through: light → dark → system.
 * Hydration-safe — only renders icon after mount to avoid mismatch.
 *
 * @example
 * <ThemeToggle />
 * <ThemeToggle className="ml-auto" />
 */
export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch — theme is unknown on server
  useEffect(() => setMounted(true), []);

  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  const label =
    theme === 'light'
      ? 'Switch to dark mode'
      : theme === 'dark'
        ? 'Switch to system theme'
        : 'Switch to light mode';

  return (
    <button
      type="button"
      onClick={cycleTheme}
      className={cn(
        'inline-flex h-9 w-9 items-center justify-center rounded-lg',
        'text-text-secondary transition-colors',
        'hover:bg-surface-muted hover:text-text-primary',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        className
      )}
      aria-label={mounted ? label : 'Toggle theme'}
    >
      {mounted ? (
        <>
          <Sun className="h-[1.125rem] w-[1.125rem] rotate-0 scale-100 transition-transform dark:rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.125rem] w-[1.125rem] rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
        </>
      ) : (
        // Placeholder during SSR to avoid layout shift
        <span className="h-[1.125rem] w-[1.125rem]" />
      )}
    </button>
  );
}
