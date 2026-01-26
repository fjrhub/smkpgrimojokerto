// app/api/news/route.js
import { connectDB } from '@/lib/mongodb';
import { News } from '@/models/newsModel';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Fungsi untuk mendapatkan user dari cookie
async function getCurrentUser() {
  const cookieStore = await cookies();
  const userDataCookie = cookieStore.get('userData')?.value;
  
  if (!userDataCookie) {
    return null;
  }

  try {
    const decodedUserData = decodeURIComponent(userDataCookie);
    const userData = JSON.parse(decodedUserData);
    
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
    
    // Coba hapus index slug jika masih ada (ini hanya perlu dilakukan sekali)
    try {
      await News.collection.dropIndex('slug_1');
      console.log('Removed slug index successfully');
    } catch (indexError) {
      // Index mungkin tidak ada, abaikan error
      if (indexError.code !== 27) { // 27 = IndexNotFound
        console.error('Error dropping slug index:', indexError);
      }
    }
    
    const body = await request.json();
    const { title, content, category, publishDate, status, attachment } = body;

    if (!title || !content || !category || !publishDate) {
      return NextResponse.json(
        { error: 'Title, content, category, and publish date are required' },
        { status: 400 }
      );
    }

    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json(
        { error: 'Unauthorized - User not authenticated' },
        { status: 401 }
      );
    }

    const newsData = {
      title,
      content,
      category,
      publishDate: new Date(publishDate),
      status: status || 'draft',
      ...(attachment && { attachment }),
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
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .select('-__v');

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