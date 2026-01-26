'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default function AllNewsPage() {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('/api/news');
        const data = await response.json();
        
        if (response.ok) {
          setNewsList(data.newsList);
        } else {
          console.error('Failed to fetch news:', data.error);
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">All News</h1>
            <p className="text-gray-600 mt-1">Manage your school news articles</p>
          </div>
          <div className="flex justify-start">
            <Link href="/dashboard/news/add">
              <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 whitespace-nowrap px-3 py-2 rounded-md text-sm">
                <Plus size={16} />
                <span className="hidden sm:inline">Add News</span>
                <span className="sm:hidden">Add News</span>
              </Button>
            </Link>
          </div>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="text-center py-8">Loading...</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header — vertikal, tombol di kiri bawah */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">All News</h1>
          <p className="text-gray-600 mt-1">Manage your school news articles</p>
        </div>

        {/* Tombol Add — di KIRI, di bawah judul & deskripsi */}
        <div className="flex justify-start">
          <Link href="/dashboard/news/add">
            <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 whitespace-nowrap px-3 py-2 rounded-md text-sm">
              <Plus size={16} />
              <span className="hidden sm:inline">Add News</span>
              <span className="sm:hidden">Add News</span>
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {newsList.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No news articles found. Create your first article!
              </div>
            ) : (
              newsList.map((news) => (
                <div key={news._id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div>
                    <h3 className="font-semibold text-gray-900">{news.title}</h3>
                    <div className="flex gap-4 mt-1">
                      <span className="text-sm text-gray-500 capitalize">{news.category}</span>
                      <span className="text-sm text-gray-500">
                        {new Date(news.publishDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    news.status === 'publish' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {news.status.charAt(0).toUpperCase() + news.status.slice(1)}
                  </span>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}