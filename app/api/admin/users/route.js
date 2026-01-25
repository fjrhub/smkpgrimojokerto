import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { connectDB } from '@/lib/mongodb'
import User from '@/models/User'

/* =========================
   GET : Ambil semua admin
========================= */
export async function GET() {
  try {
    await connectDB()

    const users = await User.find()
      .select('-password')
      .sort({ createdAt: -1 })

    return NextResponse.json(users, { status: 200 })
  } catch (error) {
    console.error('GET USERS ERROR:', error)
    return NextResponse.json(
      { message: 'Gagal mengambil data admin' },
      { status: 500 }
    )
  }
}

/* =========================
   POST : Tambah admin baru
========================= */
export async function POST(request) {
  try {
    await connectDB()

    const body = await request.json()
    const { name, email, role } = body

    // Validasi
    if (!name || !email || !role) {
      return NextResponse.json(
        { message: 'Nama, email, dan role wajib diisi' },
        { status: 400 }
      )
    }

    // Cek email duplikat
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json(
        { message: 'Email sudah terdaftar' },
        { status: 409 }
      )
    }

    // Password default
    const hashedPassword = await bcrypt.hash('admin123', 10)

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      isActive: true,
    })

    // Jangan kirim password ke frontend
    const userResponse = {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      isActive: newUser.isActive,
      createdAt: newUser.createdAt,
    }

    return NextResponse.json(userResponse, { status: 201 })
  } catch (error) {
    console.error('CREATE USER ERROR:', error)
    return NextResponse.json(
      { message: 'Gagal menambahkan admin' },
      { status: 500 }
    )
  }
}
