import { NextRequest, NextResponse } from 'next/server';
import { i18n } from './lib/i18n'; // Adjusted path if your i18n.ts is elsewhere

import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales;

  // Use negotiator and intl-localematcher to get the best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(locales);

  return matchLocale(languages, locales, i18n.defaultLocale);
}

// Regex to check for common static file extensions or specific files like favicon.ico
const STATIC_FILE_REGEX = /\.(ico|png|jpg|jpeg|gif|svg|webp|webm|mp4|css|js|json|txt|woff|woff2|ttf|eot)(\?.*)?$/;

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip middleware for static files and specific paths like /_next or /api
  if (
    STATIC_FILE_REGEX.test(pathname) ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/images/') || // if you have a public/images folder
    pathname.startsWith('/icons/') ||   // if you have a public/icons folder
    pathname.startsWith('/assets/')    // if you have a public/assets folder
  ) {
    return NextResponse.next();
  }

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        request.url
      )
    );
  }

  return NextResponse.next(); // Important: Ensure non-matched paths proceed
}

export const config = {
  // Matcher is simplified as detailed checks are now in the middleware function
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Commenting out the original more restrictive matcher as we are doing more checks inside.
     * We want the middleware to run for most paths to check for locale.
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 