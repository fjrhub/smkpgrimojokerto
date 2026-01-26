import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { connectDB } from '@/lib/mongodb'
import User from '@/models/User'
import bcrypt from 'bcrypt'

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret'

// Fungsi bantu untuk mendapatkan role dari token dan memverifikasi isActive
async function getCurrentUserDetailsFromCookie(cookies) {
  const token = cookies.get('auth')?.value
  if (!token) {
    console.warn('No auth token found in cookies')
    return null
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    // Cari ulang user dari DB untuk memeriksa isActive
    const user = await User.findById(decoded.userId).select('role isActive')
    if (!user) {
      console.warn('User not found for token')
      return null
    }
    if (user.isActive === false) {
      console.warn('User account is inactive')
      return null // Atau throw error untuk memberi tahu middleware
    }
    return { role: user.role, isActive: user.isActive }
  } catch (err) {
    console.error('JWT verification or user lookup failed:', err.message)
    return null
  }
}

/* =========================
   GET : Fetch all admins
========================= */
export async function GET(req) {
  try {
    await connectDB()

    // Ambil role dan status aktif dari cookie
    const cookies = req.cookies
    const currentUserDetails = await getCurrentUserDetailsFromCookie(cookies)

    if (!currentUserDetails || (currentUserDetails.role !== 'superadmin' && currentUserDetails.role !== 'admin')) {
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

    // Ambil role dan status aktif dari cookie
    const cookies = request.cookies
    const currentUserDetails = await getCurrentUserDetailsFromCookie(cookies)

    if (!currentUserDetails) {
      return NextResponse.json({ message: 'Unauthorized or account inactive' }, { status: 401 })
    }

    if (currentUserDetails.role !== 'superadmin' && currentUserDetails.role !== 'admin') {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const { username, email, password, role } = body

    // Aturan akses berdasarkan role
    const allowedRoles = {
      superadmin: ['superadmin', 'admin', 'editor'],
      admin: ['admin', 'editor'],
      editor: [],
    }

    if (!allowedRoles[currentUserDetails.role]?.includes(role)) {
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
// ...