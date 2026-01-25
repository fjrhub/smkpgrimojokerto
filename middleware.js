import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret'

export async function middleware(request) {
  const token = request.cookies.get('auth')?.value

  if (!token) {
    if (request.nextUrl.pathname.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    return NextResponse.next()
  }

  try {
    const secret = new TextEncoder().encode(JWT_SECRET)
    await jwtVerify(token, secret)

    if (request.nextUrl.pathname === '/login') {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  } catch (error) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/login']
}