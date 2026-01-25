import { NextResponse } from 'next/server'

export function middleware(request) {
  const auth = request.cookies.get('auth')

  const isDashboard = request.nextUrl.pathname.startsWith('/dashboard')

  if (isDashboard && !auth) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: ['/dashboard/:path*'],
}
