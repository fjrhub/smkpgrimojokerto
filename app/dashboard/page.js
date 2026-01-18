'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Megaphone, Calendar, Image, Users, Settings } from 'lucide-react'

export default function DashboardPage() {
  const stats = [
    { title: 'Total News', value: '45', icon: FileText, color: 'bg-blue-500' },
    { title: 'Active Announcements', value: '12', icon: Megaphone, color: 'bg-green-500' },
    { title: 'Upcoming Events', value: '8', icon: Calendar, color: 'bg-purple-500' },
    { title: 'Gallery Items', value: '156', icon: Image, color: 'bg-orange-500' },
    { title: 'Teachers & Staff', value: '42', icon: Users, color: 'bg-pink-500' },
    { title: 'Admin Users', value: '5', icon: Settings, color: 'bg-indigo-500' },
  ]

  const recentActivities = [
    { action: 'New announcement published', time: '2 hours ago', user: 'Admin' },
    { action: 'News article updated', time: '5 hours ago', user: 'John Doe' },
    { action: 'Gallery image uploaded', time: '1 day ago', user: 'Jane Smith' },
    { action: 'Event added to agenda', time: '2 days ago', user: 'Admin' },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="text-white" size={24} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
                <div>
                  <p className="font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-500">by {activity.user}</p>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
