'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AddNewsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Add News</h1>
        <p className="text-gray-600 mt-2">Create a new news article</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>News Form</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">News form will be similar to announcements (Coming soon)</p>
        </CardContent>
      </Card>
    </div>
  )
}
