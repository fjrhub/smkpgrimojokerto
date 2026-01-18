'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'

export default function AllNewsPage() {
  const newsList = [
    { id: 1, title: 'School Annual Day Celebration', category: 'Events', date: '2024-06-15', status: 'Published' },
    { id: 2, title: 'New Science Lab Inauguration', category: 'Academic', date: '2024-06-10', status: 'Published' },
    { id: 3, title: 'Sports Day Winners Announced', category: 'Sports', date: '2024-06-08', status: 'Published' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">All News</h1>
          <p className="text-gray-600 mt-2">Manage your school news articles</p>
        </div>
        <Link href="/dashboard/news/add">
          <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
            <Plus size={18} />
            Add News
          </Button>
        </Link>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {newsList.map((news) => (
              <div key={news.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div>
                  <h3 className="font-semibold text-gray-900">{news.title}</h3>
                  <div className="flex gap-4 mt-1">
                    <span className="text-sm text-gray-500">{news.category}</span>
                    <span className="text-sm text-gray-500">{news.date}</span>
                  </div>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                  {news.status}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
