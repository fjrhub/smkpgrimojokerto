'use client'

import { useState } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function TeachersPage() {
  const [members] = useState([
    {
      id: 1,
      name: 'Budi Santoso',
      role: 'Guru',
      subject: 'Matematika',
      type: 'Teacher',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Siti Aminah',
      role: 'Staff TU',
      subject: '-',
      type: 'Staff',
      status: 'Active',
    },
    {
      id: 3,
      name: 'Ahmad Fauzi',
      role: 'Guru',
      subject: 'Produktif TKJ',
      type: 'Teacher',
      status: 'Inactive',
    },
  ])

  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState('All')

  const filteredMembers = members.filter((m) => {
    const matchType =
      filterType === 'All' || m.type === filterType
    const matchSearch = m.name
      .toLowerCase()
      .includes(search.toLowerCase())
    return matchType && matchSearch
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Teachers & Staff
        </h1>
        <p className="text-gray-600 mt-2">
          Manage teachers and staff members
        </p>
      </div>

      {/* ACTION BAR */}
      <Card>
        <CardContent className="flex gap-4">
          <Input
            placeholder="Search name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="border rounded px-3 py-2"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Teacher">Teacher</option>
            <option value="Staff">Staff</option>
          </select>
          <Button>Add Member</Button>
        </CardContent>
      </Card>

      {/* TABLE */}
      <Card>
        <CardHeader>
          <CardTitle>Member List</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-3 py-2">Name</th>
                <th className="border px-3 py-2">Role</th>
                <th className="border px-3 py-2">Subject</th>
                <th className="border px-3 py-2">Type</th>
                <th className="border px-3 py-2">Status</th>
                <th className="border px-3 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((m) => (
                <tr key={m.id}>
                  <td className="border px-3 py-2">{m.name}</td>
                  <td className="border px-3 py-2">{m.role}</td>
                  <td className="border px-3 py-2 text-center">
                    {m.subject}
                  </td>
                  <td className="border px-3 py-2 text-center">
                    {m.type}
                  </td>
                  <td className="border px-3 py-2 text-center">
                    {m.status}
                  </td>
                  <td className="border px-3 py-2 text-center">
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
