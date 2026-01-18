'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function SchoolProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">School Profile</h1>
        <p className="text-gray-600 mt-2">Manage school information</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <p className="text-gray-600">School profile management coming soon</p>
        </CardContent>
      </Card>
    </div>
  )
}
