import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { connectDB } from '@/lib/mongodb'
import User from '@/models/User'

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret'

// Fungsi bantu untuk mendapatkan role dari token
async function getCurrentUserRoleFromCookie(cookies) {
  const token = cookies.get('auth')?.value
  if (!token) {
    console.warn('No auth token found in cookies')
    return null
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    const user = await User.findById(decoded.userId).select('role')
    if (!user) {
      console.warn('User not found for token')
      return null
    }
    return user?.role || null
  } catch (err) {
    console.error('JWT verification failed:', err.message)
    return null
  }
}

/* =========================
   GET : Fetch all admins
========================= */
export async function GET(req) {
  try {
    await connectDB()

    // Ambil role dari cookie
    const cookies = req.cookies
    const currentUserRole = await getCurrentUserRoleFromCookie(cookies)

    if (!currentUserRole || (currentUserRole !== 'superadmin' && currentUserRole !== 'admin')) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
    }

    const users = await User.find()
      .select('-password')
      .sort({ role: -1, createdAt: -1 })

    return NextResponse.json(users, { status: 200 })
  } catch (error) {
    console.error('GET USERS ERROR:', error)
    return NextResponse.json(
      { message: 'Failed to fetch admin data' },
      { status: 500 }
    )
  }
}

/* =========================
   POST : Create new admin
========================= */
export async function POST(request) {
  try {
    await connectDB()

    // Ambil role dari cookie
    const cookies = request.cookies
    const currentUserRole = await getCurrentUserRoleFromCookie(cookies)

    if (!currentUserRole) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { username, email, password, role } = body

    // Aturan akses berdasarkan role
    const allowedRoles = {
      superadmin: ['superadmin', 'admin', 'editor'],
      admin: ['admin', 'editor'],
      editor: [],
    }

    if (!allowedRoles[currentUserRole]?.includes(role)) {
      return NextResponse.json(
        { message: `You cannot assign the role: ${role}` },
        { status: 403 }
      )
    }

    // Validasi
    if (!username || !email || !password || !role) {
      return NextResponse.json(
        { message: 'Username, email, password, and role are required' },
        { status: 400 }
      )
    }

    // Cek email duplikat
    const existingEmail = await User.findOne({ email })
    if (existingEmail) {
      return NextResponse.json(
        { message: 'Email already registered' },
        { status: 409 }
      )
    }

    // Cek username duplikat
    const existingUsername = await User.findOne({ username })
    if (existingUsername) {
      return NextResponse.json(
        { message: 'Username already in use' },
        { status: 409 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
      isActive: true,
    })

    return NextResponse.json(
      {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
        isActive: newUser.isActive,
        createdAt: newUser.createdAt,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('CREATE USER ERROR:', error)
    return NextResponse.json(
      { message: 'Failed to add admin' },
      { status: 500 }
    )
  }
}