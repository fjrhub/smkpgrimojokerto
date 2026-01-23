'use client'

import { useState } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function NewsCategoriesPage() {
  const [categories] = useState([
    { id: 1, name: 'Sekolah' },
    { id: 2, name: 'Prestasi' },
    { id: 3, name: 'Kegiatan' },
  ])

  const [news] = useState([
    {
      id: 1,
      title: 'Juara Lomba LKS Tingkat Provinsi',
      categoryId: 2,
      date: '2025-01-12',
    },
    {
      id: 2,
      title: 'Kegiatan Class Meeting',
      categoryId: 3,
      date: '2025-01-18',
    },
    {
      id: 3,
      title: 'Penerimaan Siswa Baru',
      categoryId: 1,
      date: '2025-01-22',
    },
  ])

  const [selectedCategory, setSelectedCategory] = useState(null)

  const filteredNews = selectedCategory
    ? news.filter((n) => n.categoryId === selectedCategory.id)
    : []

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* NEWS CATEGORY LIST */}
      <Card className="col-span-12 md:col-span-4">
        <CardHeader>
          <CardTitle>News Categories</CardTitle>
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

      {/* NEWS TABLE */}
      <Card className="col-span-12 md:col-span-8">
        <CardHeader>
          <CardTitle>
            {selectedCategory
              ? `News: ${selectedCategory.name}`
              : 'Select Category'}
          </CardTitle>
        </CardHeader>

        <CardContent>
          {!selectedCategory && (
            <p className="text-gray-500">
              Pilih kategori untuk melihat news
            </p>
          )}

          {selectedCategory && filteredNews.length === 0 && (
            <p className="text-gray-500">
              Belum ada news di kategori ini
            </p>
          )}

          {filteredNews.length > 0 && (
            <table className="w-full text-sm border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-3 py-2 text-left">Title</th>
                  <th className="border px-3 py-2">Date</th>
                  <th className="border px-3 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredNews.map((item) => (
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
