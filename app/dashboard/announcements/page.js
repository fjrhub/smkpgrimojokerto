'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'

export default function AllAnnouncementsPage() {
  const announcements = [
    { id: 1, title: 'Exam Schedule Published', category: 'Academic', date: '2024-06-15', status: 'Published', priority: 'Important' },
    { id: 2, title: 'Parent-Teacher Meeting', category: 'Events', date: '2024-06-12', status: 'Published', priority: 'Normal' },
    { id: 3, title: 'Holiday Notice', category: 'Holidays', date: '2024-06-10', status: 'Draft', priority: 'Normal' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">All Announcements</h1>
          <p className="text-gray-600 mt-2">Manage your school announcements</p>
        </div>
        <Link href="/dashboard/announcements/add">
          <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
            <Plus size={18} />
            Add Announcement
          </Button>
        </Link>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {announcements.map((announcement) => (
              <div key={announcement.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900">{announcement.title}</h3>
                    {announcement.priority === 'Important' && (
                      <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                        IMPORTANT
                      </span>
                    )}
                  </div>
                  <div className="flex gap-4 mt-1">
                    <span className="text-sm text-gray-500">{announcement.category}</span>
                    <span className="text-sm text-gray-500">{announcement.date}</span>
                  </div>
                </div>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  announcement.status === 'Published' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {announcement.status}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
