import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { connectDB } from '@/lib/mongodb'
import User from '@/models/User'

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret'

// Gunakan fungsi yang diperbarui
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
      return null
    }
    return { role: user.role, isActive: user.isActive }
  } catch (err) {
    console.error('JWT verification or user lookup failed:', err.message)
    return null
  }
}

/* =========================
   PATCH : Update user status
========================= */
export async function PATCH(request, { params }) {
  try {
    await connectDB()

    const cookies = request.cookies
    const currentUserDetails = await getCurrentUserDetailsFromCookie(cookies)

    if (!currentUserDetails || (currentUserDetails.role !== 'superadmin' && currentUserDetails.role !== 'admin')) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
    }

    const { isActive } = await request.json()
    const { id: userId } = await params

    // Validasi ID (ObjectId MongoDB)
    if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json({ message: 'Invalid user ID' }, { status: 400 })
    }

    const user = await User.findById(userId)
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    // Superadmin tidak bisa dinonaktifkan/dihapus
    if (user.role === 'superadmin' && currentUserDetails.role !== 'superadmin') {
      return NextResponse.json({ message: 'Cannot modify superadmin account' }, { status: 403 })
    }

    await User.findByIdAndUpdate(userId, { isActive })

    return NextResponse.json({ message: 'User status updated successfully' }, { status: 200 })
  } catch (error) {
    console.error('UPDATE USER STATUS ERROR:', error)
    return NextResponse.json({ message: 'Server error' }, { status: 500 })
  }
}

/* =========================
   DELETE : Remove user
========================= */
export async function DELETE(request, { params }) {
  try {
    await connectDB()

    const cookies = request.cookies
    const currentUserDetails = await getCurrentUserDetailsFromCookie(cookies)

    if (!currentUserDetails || (currentUserDetails.role !== 'superadmin' && currentUserDetails.role !== 'admin')) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
    }

    const { id: userId } = await params

    // Validasi ID (ObjectId MongoDB)
    if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json({ message: 'Invalid user ID' }, { status: 400 })
    }

    const user = await User.findById(userId)
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    // Superadmin tidak bisa dihapus kecuali oleh superadmin lain
    if (user.role === 'superadmin' && currentUserDetails.role !== 'superadmin') {
      return NextResponse.json({ message: 'Cannot delete superadmin account' }, { status: 403 })
    }

    // Tidak bisa menghapus diri sendiri
    const token = cookies.get('auth')?.value
    if (token) {
      try {
        const decoded = jwt.verify(token, JWT_SECRET)
        if (decoded.userId === userId) {
          return NextResponse.json({ message: 'Cannot delete your own account' }, { status: 400 })
        }
      } catch {}
    }

    await User.findByIdAndDelete(userId)

    return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 })
  } catch (error) {
    console.error('DELETE USER ERROR:', error)
    return NextResponse.json({ message: 'Server error' }, { status: 500 })
  }
}
// ...