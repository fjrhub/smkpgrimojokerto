// app/api/news/route.js
import { connectDB } from '@/lib/mongodb';
import { News } from '@/models/newsModel';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'; // Import cookies

// Fungsi untuk mendapatkan user dari cookie
async function getCurrentUser() {
  // Karena cookies() sekarang async, kita harus await
  const cookieStore = await cookies(); // Tambahkan await di sini
  
  // Ambil cookie userData
  const userDataCookie = cookieStore.get('userData')?.value;
  
  if (!userDataCookie) {
    return null;
  }

  try {
    // Decode URI component dan parse JSON
    const decodedUserData = decodeURIComponent(userDataCookie);
    const userData = JSON.parse(decodedUserData);
    
    // Return data user
    return {
      username: userData.username,
      email: userData.email,
      role: userData.role,
    };
  } catch (error) {
    console.error('Error parsing userData cookie:', error);
    return null;
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { title, content, category, publishDate, status, attachment } = body;

    if (!title || !content || !category || !publishDate) {
      return NextResponse.json(
        { error: 'Title, content, category, and publish date are required' },
        { status: 400 }
      );
    }

    // Ambil user yang sedang login
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json(
        { error: 'Unauthorized - User not authenticated' },
        { status: 401 }
      );
    }

    // Buat dokumen berita baru
    const newsData = {
      title,
      content,
      category,
      publishDate: new Date(publishDate),
      status: status || 'draft',
      ...(attachment && { attachment }), // Hanya masukkan attachment jika ada
      author: {
        username: currentUser.username,
      },
    };

    const news = new News(newsData);
    await news.save();

    return NextResponse.json(
      { 
        message: 'News created successfully', 
        newsId: news._id,
        data: {
          id: news._id,
          title: news.title,
          status: news.status,
          createdAt: news.createdAt,
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating news:', error);
    return NextResponse.json(
      { error: 'Failed to create news', details: error.message },
      { status: 500 }
    );
  }
}

// Optional: Handler untuk GET semua berita
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const statusFilter = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit')) || 10;
    const page = parseInt(searchParams.get('page')) || 1;

    let filter = {};
    if (statusFilter) {
      filter.status = statusFilter;
    }

    const newsList = await News.find(filter)
      .sort({ createdAt: -1 }) // Terbaru dulu
      .limit(limit)
      .skip((page - 1) * limit)
      .select('-__v'); // Hilangkan field internal

    const total = await News.countDocuments(filter);

    return NextResponse.json({
      newsList,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news', details: error.message },
      { status: 500 }
    );
  }
}