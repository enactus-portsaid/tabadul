// ---------------------------------------------------------------------------
// Footer — Simple page footer
// ---------------------------------------------------------------------------

export interface FooterProps {
  /** Current year override (defaults to current year) */
  year?: number;
}

export function Footer({ year }: FooterProps) {
  const displayYear = year || new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-gray-100 bg-surface py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs text-text-muted">
          © {displayYear} Tabadul (تبادل) — Enactus Port Said.
        </p>
      </div>
    </footer>
  );
}

Footer.displayName = 'Footer';
