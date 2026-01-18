'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function TeachersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Teachers & Staff</h1>
        <p className="text-gray-600 mt-2">Manage teachers and staff members</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <p className="text-gray-600">Teachers management coming soon</p>
        </CardContent>
      </Card>
    </div>
  )
}
