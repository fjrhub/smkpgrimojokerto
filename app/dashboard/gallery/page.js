'use client'

import { useState } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function GalleryPage() {
  const [albums] = useState([
    { id: 1, name: 'Class Meeting' },
    { id: 2, name: 'Lomba LKS' },
    { id: 3, name: 'Kegiatan Sekolah' },
  ])

  const [photos] = useState([
    {
      id: 1,
      albumId: 1,
      url: 'https://via.placeholder.com/300',
    },
    {
      id: 2,
      albumId: 1,
      url: 'https://via.placeholder.com/300',
    },
    {
      id: 3,
      albumId: 2,
      url: 'https://via.placeholder.com/300',
    },
    {
      id: 4,
      albumId: 3,
      url: 'https://via.placeholder.com/300',
    },
  ])

  const [selectedAlbum, setSelectedAlbum] = useState(null)

  const filteredPhotos = selectedAlbum
    ? photos.filter((p) => p.albumId === selectedAlbum.id)
    : []

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* ALBUM LIST */}
      <Card className="col-span-12 md:col-span-3">
        <CardHeader>
          <CardTitle>Albums</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {albums.map((album) => (
            <Button
              key={album.id}
              variant={
                selectedAlbum?.id === album.id
                  ? 'default'
                  : 'outline'
              }
              className="w-full justify-start"
              onClick={() => setSelectedAlbum(album)}
            >
              {album.name}
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* PHOTO GRID */}
      <Card className="col-span-12 md:col-span-9">
        <CardHeader>
          <CardTitle>
            {selectedAlbum
              ? `Photos: ${selectedAlbum.name}`
              : 'Select Album'}
          </CardTitle>
        </CardHeader>

        <CardContent>
          {!selectedAlbum && (
            <p className="text-gray-500">
              Pilih album untuk melihat foto
            </p>
          )}

          {selectedAlbum && filteredPhotos.length === 0 && (
            <p className="text-gray-500">
              Belum ada foto di album ini
            </p>
          )}

          {filteredPhotos.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {filteredPhotos.map((photo) => (
                <div
                  key={photo.id}
                  className="border rounded-lg overflow-hidden"
                >
                  <img
                    src={photo.url}
                    alt="Gallery"
                    className="w-full h-40 object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
