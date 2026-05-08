import { Cairo, Inter } from 'next/font/google';
import type { Metadata } from 'next';

import { ThemeProvider } from '@/components/ThemeProvider';

import './globals.css';

// ---------------------------------------------------------------------------
// Font Configuration
// ---------------------------------------------------------------------------
// Inter — primary font for Latin text (design reference §2)
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// Cairo — Arabic typography (design reference §2)
const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  display: 'swap',
  variable: '--font-cairo',
});

// ---------------------------------------------------------------------------
// Metadata — SEO defaults
// ---------------------------------------------------------------------------
export const metadata: Metadata = {
  title: {
    default: 'Tabadul (تبادل) — B2B Industrial Symbiosis',
    template: '%s | Tabadul',
  },
  description:
    'AI-powered B2B platform connecting industrial waste generators with buyers. Turn your waste into opportunity.',
  keywords: [
    'industrial symbiosis',
    'B2B marketplace',
    'waste trading',
    'circular economy',
    'تبادل',
  ],
};

// ---------------------------------------------------------------------------
// Root Layout
// ---------------------------------------------------------------------------
/**
 * Application root layout.
 *
 * Responsibilities:
 * - Load Inter + Cairo fonts as CSS variables
 * - Import global CSS (Tailwind v4 tokens + base styles)
 * - Wrap tree with ThemeProvider (next-themes)
 * - Set `suppressHydrationWarning` on <html> for theme class injection
 *
 * This layout does NOT handle locale — that's delegated to
 * `[locale]/layout.tsx` which sets `dir` and `lang` attributes.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${inter.variable} ${cairo.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background font-sans text-text-primary antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
