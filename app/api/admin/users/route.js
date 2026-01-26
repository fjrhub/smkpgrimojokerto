// api/admin/user/route.js
import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import { connectDB } from '@/lib/mongodb'
import User from '@/models/User'
import bcrypt from 'bcrypt'

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret'

// Fungsi bantu untuk mendapatkan role dari token dan memverifikasi isActive
async function getCurrentUserDetailsFromToken(token) {
  if (!token) {
    console.warn('No auth token provided')
    return null
  }

  try {
    const secret = new TextEncoder().encode(JWT_SECRET)
    const decoded = await jwtVerify(token, secret)
    
    // Connect to database and check user status
    await connectDB()
    const user = await User.findById(decoded.payload.userId).select('role isActive')
    if (!user) {
      console.warn('User not found for token')
      return null
    }
    if (user.isActive === false) {
      console.warn('User account is inactive')
      return null
    }
    return { role: user.role, isActive: user.isActive, userId: decoded.payload.userId }
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

    // Ambil token dari cookie
    const token = req.cookies.get('auth')?.value
    const currentUserDetails = await getCurrentUserDetailsFromToken(token)

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

    // Ambil token dari cookie
    const token = request.cookies.get('auth')?.value
    const currentUserDetails = await getCurrentUserDetailsFromToken(token)

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

/* =========================
   PATCH : Update user status
========================= */
export async function PATCH(request, { params }) {
  try {
    await connectDB()

    // Ambil token dari cookie
    const token = request.cookies.get('auth')?.value
    const currentUserDetails = await getCurrentUserDetailsFromToken(token)

    if (!currentUserDetails) {
      return NextResponse.json({ message: 'Unauthorized or account inactive' }, { status: 401 })
    }

    if (currentUserDetails.role !== 'superadmin' && currentUserDetails.role !== 'admin') {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
    }

    const url = new URL(request.url)
    const pathParts = url.pathname.split('/')
    const userId = pathParts[pathParts.length - 1]

    const body = await request.json()
    const { isActive } = body

    if (typeof isActive !== 'boolean') {
      return NextResponse.json(
        { message: 'isActive must be a boolean value' },
        { status: 400 }
      )
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { isActive },
      { new: true, select: '-password' }
    )

    if (!updatedUser) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      {
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        role: updatedUser.role,
        isActive: updatedUser.isActive,
        updatedAt: updatedUser.updatedAt,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('UPDATE USER STATUS ERROR:', error)
    return NextResponse.json(
      { message: 'Failed to update user status' },
      { status: 500 }
    )
  }
}

/* =========================
   DELETE : Remove user
========================= */
export async function DELETE(request, { params }) {
  try {
    await connectDB()

    // Ambil token dari cookie
    const token = request.cookies.get('auth')?.value
    const currentUserDetails = await getCurrentUserDetailsFromToken(token)

    if (!currentUserDetails) {
      return NextResponse.json({ message: 'Unauthorized or account inactive' }, { status: 401 })
    }

    if (currentUserDetails.role !== 'superadmin' && currentUserDetails.role !== 'admin') {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
    }

    const url = new URL(request.url)
    const pathParts = url.pathname.split('/')
    const userId = pathParts[pathParts.length - 1]

    const deletedUser = await User.findByIdAndDelete(userId)

    if (!deletedUser) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { message: 'User deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('DELETE USER ERROR:', error)
    return NextResponse.json(
      { message: 'Failed to delete user' },
      { status: 500 }
    )
  }
}