import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { connectDB } from '@/lib/mongodb'
import User from '@/models/User'

export async function POST(request) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json(
        { message: 'Username dan password wajib diisi' },
        { status: 400 }
      )
    }

    await connectDB()

    const user = await User.findOne({ username })
    if (!user) {
      return NextResponse.json(
        { message: 'Username tidak ditemukan' },
        { status: 401 }
      )
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return NextResponse.json(
        { message: 'Password salah' },
        { status: 401 }
      )
    }

    // ✅ SET COOKIE LOGIN
    const res = NextResponse.json(
      {
        _id: user._id,
        username: user.username,
        role: user.role,
      },
      { status: 200 }
    )

    res.cookies.set('auth', user._id.toString(), {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
    })

    return res
  } catch (error) {
    console.error('LOGIN ERROR:', error)
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    )
  }
}
