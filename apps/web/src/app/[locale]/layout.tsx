import type { Metadata } from 'next';

// ---------------------------------------------------------------------------
// Supported Locales
// ---------------------------------------------------------------------------
const SUPPORTED_LOCALES = ['ar', 'en'] as const;
type Locale = (typeof SUPPORTED_LOCALES)[number];

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

// ---------------------------------------------------------------------------
// Dynamic Metadata — locale-aware
// ---------------------------------------------------------------------------
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: {
      default:
        locale === 'ar'
          ? 'تبادل — منصة التكافل الصناعي'
          : 'Tabadul — B2B Industrial Symbiosis',
      template:
        locale === 'ar' ? '%s | تبادل' : '%s | Tabadul',
    },
  };
}

// ---------------------------------------------------------------------------
// Locale Layout
// ---------------------------------------------------------------------------
/**
 * Sets `lang` and `dir` attributes based on the current locale segment.
 *
 * The root layout (`app/layout.tsx`) defaults to `lang="ar" dir="rtl"`.
 * This layout overrides those attributes for the specific locale.
 *
 * @note Next.js App Router propagates the closest layout's attributes,
 * so child pages within /en/ will correctly get `dir="ltr"`.
 */
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <div lang={locale} dir={dir}>
      {children}
    </div>
  );
}
