'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Plus, Search } from 'lucide-react'

export default function AdminUsersPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [search, setSearch] = useState('')

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    role: 'editor',
  })

  /* =========================
     FETCH USERS
  ========================== */
const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/users', {
        cache: 'no-store',
      })

      if (!res.ok) {
        setUsers([])
        return
      }

      const text = await res.text()
      const data = text ? JSON.parse(text) : []

      // Urutkan berdasarkan role: Super Admin > Admin > Editor
      const sortedData = Array.isArray(data) 
        ? data.sort((a, b) => {
            const roleOrder = { superadmin: 3, admin: 2, editor: 1 }
            return (roleOrder[b.role] || 0) - (roleOrder[a.role] || 0)
          })
        : []

      setUsers(sortedData)
    } catch (err) {
      console.error(err)
      setUsers([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  /* =========================
     CREATE USER
  ========================== */
  const handleSubmit = async () => {
    if (!form.username || !form.email || !form.password) {
      alert('Username, email, dan password wajib diisi')
      return
    }

    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const text = await res.text()
      const data = text ? JSON.parse(text) : null

      if (!res.ok) {
        alert(data?.message || 'Gagal menambah admin')
        return
      }

      // Gabungkan data baru ke list dan urutkan ulang
      const updatedUsers = [...users, data].sort((a, b) => {
        const roleOrder = { superadmin: 3, admin: 2, editor: 1 }
        return (roleOrder[b.role] || 0) - (roleOrder[a.role] || 0)
      })

      setUsers(updatedUsers)
      setForm({ username: '', email: '', password: '', role: 'editor' })
      setShowForm(false)
    } catch (err) {
      console.error(err)
      alert('Terjadi kesalahan')
    }
  }

  /* =========================
     FILTER SEARCH
  ========================== */
  const filteredUsers = users.filter(u =>
    u.username?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">Admin Users</h1>
        <p className="text-muted-foreground">
          Kelola akun administrator website sekolah
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader><CardTitle>Total Admin</CardTitle></CardHeader>
          <CardContent className="text-2xl font-bold">
            {users.length}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Aktif</CardTitle></CardHeader>
          <CardContent className="text-2xl font-bold">
            {users.filter(u => u.isActive !== false).length}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Nonaktif</CardTitle></CardHeader>
          <CardContent className="text-2xl font-bold">
            {users.filter(u => u.isActive === false).length}
          </CardContent>
        </Card>
      </div>

      {/* ACTION */}
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari admin..."
            className="pl-9"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          <Plus className="h-4 w-4" />
          Tambah Admin
        </Button>
      </div>

      {/* FORM */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Tambah Admin Baru</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Username"
              value={form.username}
              onChange={e =>
                setForm({ ...form, username: e.target.value })
              }
            />
            <Input
              placeholder="Email"
              type="email"
              value={form.email}
              onChange={e =>
                setForm({ ...form, email: e.target.value })
              }
            />
            <Input
              placeholder="Password"
              type="password"
              value={form.password}
              onChange={e =>
                setForm({ ...form, password: e.target.value })
              }
            />
            <select
              className="w-full border rounded-md p-2"
              value={form.role}
              onChange={e =>
                setForm({ ...form, role: e.target.value })
              }
            >
              <option value="superadmin">Super Admin</option>
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
            </select>

            <Button onClick={handleSubmit}>Simpan</Button>
          </CardContent>
        </Card>
      )}

      {/* TABLE */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Admin</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-muted-foreground">Memuat data...</p>
          ) : filteredUsers.length === 0 ? (
            <p className="text-muted-foreground">Belum ada data admin</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Username</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map(user => (
                  <TableRow key={user._id}>
                    <TableCell className="font-medium">
                      {user.username}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell className="capitalize">
                      {user.role}
                    </TableCell>
                    <TableCell>
                      {user.isActive === false ? 'Inactive' : 'Active'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}