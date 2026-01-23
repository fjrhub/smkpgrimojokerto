'use client'

import { useState } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function DownloadDocumentPage() {
  const [categories] = useState([
    { id: 1, name: 'Akademik' },
    { id: 2, name: 'Administrasi' },
    { id: 3, name: 'Siswa' },
  ])

  const [documents] = useState([
    {
      id: 1,
      title: 'Kalender Akademik 2025',
      categoryId: 1,
      fileType: 'PDF',
      size: '1.2 MB',
      url: '#',
    },
    {
      id: 2,
      title: 'Formulir Pendaftaran',
      categoryId: 2,
      fileType: 'DOCX',
      size: '320 KB',
      url: '#',
    },
    {
      id: 3,
      title: 'Tata Tertib Siswa',
      categoryId: 3,
      fileType: 'PDF',
      size: '850 KB',
      url: '#',
    },
  ])

  const [selectedCategory, setSelectedCategory] = useState(null)

  const filteredDocuments = selectedCategory
    ? documents.filter(
        (doc) => doc.categoryId === selectedCategory.id
      )
    : []

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* CATEGORY LIST */}
      <Card className="col-span-12 md:col-span-3">
        <CardHeader>
          <CardTitle>Document Categories</CardTitle>
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

      {/* DOCUMENT TABLE */}
      <Card className="col-span-12 md:col-span-9">
        <CardHeader>
          <CardTitle>
            {selectedCategory
              ? `Documents: ${selectedCategory.name}`
              : 'Select Category'}
          </CardTitle>
        </CardHeader>

        <CardContent>
          {!selectedCategory && (
            <p className="text-gray-500">
              Pilih kategori untuk melihat dokumen
            </p>
          )}

          {selectedCategory && filteredDocuments.length === 0 && (
            <p className="text-gray-500">
              Belum ada dokumen di kategori ini
            </p>
          )}

          {filteredDocuments.length > 0 && (
            <table className="w-full text-sm border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-3 py-2 text-left">
                    Document Name
                  </th>
                  <th className="border px-3 py-2">Type</th>
                  <th className="border px-3 py-2">Size</th>
                  <th className="border px-3 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredDocuments.map((doc) => (
                  <tr key={doc.id}>
                    <td className="border px-3 py-2">
                      {doc.title}
                    </td>
                    <td className="border px-3 py-2 text-center">
                      {doc.fileType}
                    </td>
                    <td className="border px-3 py-2 text-center">
                      {doc.size}
                    </td>
                    <td className="border px-3 py-2 text-center">
                      <Button size="sm">
                        Download
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
