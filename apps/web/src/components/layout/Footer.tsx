import Link from 'next/link';
import { type HTMLAttributes } from 'react';

import { cn } from '@/lib/cn';

import { Container } from './Container';

// ---------------------------------------------------------------------------
// Footer Props
// ---------------------------------------------------------------------------
export interface FooterProps extends HTMLAttributes<HTMLElement> {
  /** Current locale for navigation links */
  locale?: string;
}

// ---------------------------------------------------------------------------
// Footer Component
// ---------------------------------------------------------------------------
/**
 * Minimal site footer with copyright and navigation links.
 *
 * @example
 * <Footer locale="en" />
 */
export function Footer({ className, locale = 'en', ...props }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: 'About', href: `/${locale}/about` },
    { label: 'Privacy', href: `/${locale}/privacy` },
    { label: 'Terms', href: `/${locale}/terms` },
    { label: 'Contact', href: `/${locale}/contact` },
  ];

  return (
    <footer
      className={cn(
        'bg-surface text-text-secondary border-t border-gray-200 py-6',
        className
      )}
      {...props}
    >
      <Container className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        {/* Copyright */}
        <p className="text-xs">
          © {currentYear} Tabadul (تبادل). All rights reserved.
        </p>

        {/* Links */}
        <nav aria-label="Footer navigation">
          <ul className="flex items-center gap-4">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="hover:text-text-primary text-xs transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </footer>
  );
}
