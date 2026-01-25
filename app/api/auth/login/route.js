import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { connectDB } from '@/lib/mongodb'
import User from '@/models/User'

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret'

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

    // Buat token JWT yang menyertakan username dan email
    const payload = {
      userId: user._id.toString(),
      username: user.username,
      email: user.email,
      role: user.role,
    }
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })

    // Set cookie dengan token JWT (httpOnly)
    const res = NextResponse.json(
      {
        username: user.username,
        email: user.email,
        role: user.role,
      },
      { status: 200 }
    )

    // Set cookie JWT dengan httpOnly
    res.cookies.set('auth', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60, // 7 hari
      path: '/',
      sameSite: 'strict',
    })

    // Set cookie tambahan untuk data publik (bisa diakses JS) - PERHATIKAN BARIS INI
    res.cookies.set('userData', JSON.stringify({
      username: user.username,
      email: user.email,
      role: user.role, // <-- TAMBAHKAN BARIS INI
    }), {
      httpOnly: false, // Agar bisa diakses JavaScript
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60, // Harus sama dengan JWT
      path: '/',
      sameSite: 'strict',
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