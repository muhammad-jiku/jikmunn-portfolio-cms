import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // This is a placeholder for client-side route protection
  // Actual authentication will be handled by the client-side Redux store
  // and checked in the dashboard component

  const { pathname } = request.nextUrl;

  // Allow auth pages
  if (
    pathname.startsWith('/login') ||
    pathname.startsWith('/register') ||
    pathname.startsWith('/forgot-password')
  ) {
    return NextResponse.next();
  }

  // Allow public routes
  if (pathname === '/') {
    return NextResponse.next();
  }

  // For protected routes like /dashboard, we'll handle the redirect client-side
  // because we need to check the Redux store state
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
