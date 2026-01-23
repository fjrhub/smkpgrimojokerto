'use client'

import { useState } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function AnnouncementCategoriesPage() {
  const [categories] = useState([
    { id: 1, name: 'Akademik' },
    { id: 2, name: 'Ujian' },
    { id: 3, name: 'Libur' },
  ])

  const [announcements] = useState([
    {
      id: 1,
      title: 'UTS Semester Ganjil',
      categoryId: 2,
      date: '2025-01-10',
    },
    {
      id: 2,
      title: 'Libur Nasional',
      categoryId: 3,
      date: '2025-01-20',
    },
    {
      id: 3,
      title: 'Pembagian Raport',
      categoryId: 1,
      date: '2025-01-25',
    },
  ])

  const [selectedCategory, setSelectedCategory] = useState(null)

  const filteredAnnouncements = selectedCategory
    ? announcements.filter(
        (a) => a.categoryId === selectedCategory.id
      )
    : []

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* CATEGORY LIST */}
      <Card className="col-span-12 md:col-span-4">
        <CardHeader>
          <CardTitle>Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={
                selectedCategory?.id === cat.id
                  ? 'default'
                  : 'outline'
              }
              className="w-full justify-start"
              onClick={() => setSelectedCategory(cat)}
            >
              {cat.name}
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* ANNOUNCEMENT TABLE */}
      <Card className="col-span-12 md:col-span-8">
        <CardHeader>
          <CardTitle>
            {selectedCategory
              ? `Announcements: ${selectedCategory.name}`
              : 'Select Category'}
          </CardTitle>
        </CardHeader>

        <CardContent>
          {!selectedCategory && (
            <p className="text-gray-500">
              Pilih kategori untuk melihat announcement
            </p>
          )}

          {selectedCategory && filteredAnnouncements.length === 0 && (
            <p className="text-gray-500">
              Belum ada announcement di kategori ini
            </p>
          )}

          {filteredAnnouncements.length > 0 && (
            <table className="w-full text-sm border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-3 py-2 text-left">Title</th>
                  <th className="border px-3 py-2">Date</th>
                  <th className="border px-3 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredAnnouncements.map((item) => (
                  <tr key={item.id}>
                    <td className="border px-3 py-2">
                      {item.title}
                    </td>
                    <td className="border px-3 py-2 text-center">
                      {item.date}
                    </td>
                    <td className="border px-3 py-2 text-center">
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
