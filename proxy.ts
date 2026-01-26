// proxy.ts
import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import { connectDB } from '@/lib/mongodb'
import User from '@/models/User'

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret'

export async function proxy(request: Request) {
  const token = (request as any).cookies.get('auth')?.value

  if (!token) {
    if (request.url.includes('/dashboard')) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    return NextResponse.next()
  }

  try {
    const secret = new TextEncoder().encode(JWT_SECRET)
    const verified = await jwtVerify(token, secret)

    // Connect to database and check if user still exists and is active
    await connectDB()
    const user = await User.findById(verified.payload.userId).select('isActive')

    if (!user || user.isActive === false) {
      // User doesn't exist or account is inactive, force logout
      const response = NextResponse.redirect(new URL('/login', request.url))
      response.cookies.delete('auth')
      return response
    }

    if (request.url.includes('/login')) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  } catch (error) {
    const response = NextResponse.redirect(new URL('/login', request.url))
    response.cookies.delete('auth')
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/login']
}