import { type NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

// ---------------------------------------------------------------------------
// Supported locales and default locale
// ---------------------------------------------------------------------------
const SUPPORTED_LOCALES = ['ar', 'en'];
const DEFAULT_LOCALE = 'ar';

// ---------------------------------------------------------------------------
// Public paths that do NOT require authentication (relative to locale prefix)
// ---------------------------------------------------------------------------
const PUBLIC_PATHS = [
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/verify-email',
];

// ---------------------------------------------------------------------------
// Auth-only paths that should redirect TO main app if already authenticated
// ---------------------------------------------------------------------------
const AUTH_ONLY_PATHS = [
  '/login',
  '/register',
  '/forgot-password',
];

/**
 * Extracts the locale and pathname from the URL.
 * e.g., /ar/login → { locale: 'ar', pathname: '/login' }
 * e.g., /marketplace → { locale: 'ar', pathname: '/marketplace' }
 */
function parseLocale(pathname: string): {
  locale: string;
  localePath: string;
} {
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];

  if (firstSegment && SUPPORTED_LOCALES.includes(firstSegment)) {
    return {
      locale: firstSegment,
      localePath: '/' + segments.slice(1).join('/') || '/',
    };
  }

  return {
    locale: DEFAULT_LOCALE,
    localePath: pathname,
  };
}

// ---------------------------------------------------------------------------
// Next.js Middleware
// ---------------------------------------------------------------------------
// Responsibilities:
// 1. Refresh Supabase session (keeps cookies alive)
// 2. Locale detection and redirect
// 3. Auth-based route protection
// ---------------------------------------------------------------------------
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') // Static files (favicon, images, etc.)
  ) {
    return NextResponse.next();
  }

  // -------------------------------------------------------------------------
  // 1. Locale detection — redirect to locale-prefixed URL if missing
  // -------------------------------------------------------------------------
  const { locale, localePath } = parseLocale(pathname);
  const segments = pathname.split('/').filter(Boolean);

  if (!SUPPORTED_LOCALES.includes(segments[0] ?? '')) {
    const url = request.nextUrl.clone();
    url.pathname = `/${DEFAULT_LOCALE}${pathname}`;
    return NextResponse.redirect(url);
  }

  // -------------------------------------------------------------------------
  // 2. Create Supabase client and refresh session via cookies
  // -------------------------------------------------------------------------
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh session — this is critical to keep the session alive.
  // IMPORTANT: Use getUser() not getSession() in middleware for security.
  // getUser() makes a request to the Supabase Auth server to revalidate
  // the token, while getSession() only reads from the cookie (could be stale).
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // -------------------------------------------------------------------------
  // 3. Auth-based route protection
  // -------------------------------------------------------------------------
  const isPublicPath = PUBLIC_PATHS.some((p) =>
    localePath.startsWith(p)
  );
  const isAuthOnlyPath = AUTH_ONLY_PATHS.some((p) =>
    localePath.startsWith(p)
  );
  const isAdminPath = localePath.startsWith('/admin');

  // Not authenticated and trying to access a protected route
  if (!user && !isPublicPath && localePath !== '/') {
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}/login`;
    url.searchParams.set('redirectTo', pathname);
    return NextResponse.redirect(url);
  }

  // Authenticated but trying to access auth-only routes (login/register)
  if (user && isAuthOnlyPath) {
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}/marketplace`;
    return NextResponse.redirect(url);
  }

  // Admin route — check role from user metadata
  if (user && isAdminPath) {
    const role = user.user_metadata?.role;
    if (role !== 'admin') {
      const url = request.nextUrl.clone();
      url.pathname = `/${locale}/marketplace`;
      return NextResponse.redirect(url);
    }
  }

  return response;
}

// ---------------------------------------------------------------------------
// Matcher — run middleware on all pages except static assets
// ---------------------------------------------------------------------------
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - Public file extensions
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
