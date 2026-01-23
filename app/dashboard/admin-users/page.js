'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Plus, Search } from 'lucide-react'

const users = [
  { id: 1, name: 'Super Admin', email: 'admin@example.com', role: 'Super Admin', status: 'Active' },
  { id: 2, name: 'Admin Keuangan', email: 'finance@example.com', role: 'Admin', status: 'Active' },
  { id: 3, name: 'Admin Konten', email: 'content@example.com', role: 'Editor', status: 'Inactive' },
]

export default function AdminUsersPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Dashboard Admin Users</h1>
        <p className="text-muted-foreground">Kelola akun administrator dan hak akses</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Admin</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">{users.length}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Admin Aktif</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {users.filter(u => u.status === 'Active').length}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Nonaktif</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {users.filter(u => u.status === 'Inactive').length}
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Cari admin..." className="pl-9" />
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Tambah Admin
        </Button>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Admin</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map(user => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.status}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="destructive" size="sm">Hapus</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}