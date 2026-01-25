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
  const [currentUserRole, setCurrentUserRole] = useState(null)

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    role: 'editor',
  })

  /* =========================
     FETCH CURRENT USER & USERS
  ========================== */
  const fetchCurrentUser = async () => {
    try {
      // Ambil role dari cookie userData (non-httpOnly)
      const cookies = document.cookie.split('; ')
      const userDataCookie = cookies.find(c => c.startsWith('userData='))
      if (userDataCookie) {
        const userData = JSON.parse(decodeURIComponent(userDataCookie.split('=')[1]))
        setCurrentUserRole(userData.role)
      } else {
        console.warn('userData cookie not found')
      }
    } catch (err) {
      console.error('Error parsing userData cookie:', err)
    }
  }

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
    fetchCurrentUser()
    fetchUsers()
  }, [])

  /* =========================
     CREATE USER
  ========================== */
  const handleSubmit = async () => {
    if (!form.username || !form.email || !form.password) {
      alert('Username, email, and password are required')
      return
    }

    // Cegah penambahan role yang lebih tinggi dari pengguna saat ini
    const allowedRoles = {
      superadmin: ['superadmin', 'admin', 'editor'],
      admin: ['admin', 'editor'],
      editor: [],
    }

    if (!allowedRoles[currentUserRole]?.includes(form.role)) {
      alert(`You cannot assign the role: ${form.role}`)
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
        alert(data?.message || 'Failed to add admin')
        return
      }

      const updatedUsers = [...users, data].sort((a, b) => {
        const roleOrder = { superadmin: 3, admin: 2, editor: 1 }
        return (roleOrder[b.role] || 0) - (roleOrder[a.role] || 0)
      })

      setUsers(updatedUsers)
      setForm({ username: '', email: '', password: '', role: 'editor' })
      setShowForm(false)
    } catch (err) {
      console.error(err)
      alert('An error occurred')
    }
  }

  /* =========================
     UPDATE USER STATUS
  ========================== */
  const toggleUserStatus = async (userId, currentStatus) => {
    const newStatus = !currentStatus
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: newStatus }),
      })

      const result = await res.json()

      if (!res.ok) {
        alert(result.message || 'Gagal mengubah status pengguna')
        return
      }

      // Update state lokal
      setUsers(prev => prev.map(u => 
        u._id === userId ? { ...u, isActive: newStatus } : u
      ))
    } catch (err) {
      console.error('Toggle status error:', err)
      alert('Terjadi kesalahan saat mengubah status')
    }
  }

  /* =========================
     DELETE USER
  ========================== */
  const deleteUser = async (userId) => {
    if (!confirm('Apakah Anda yakin ingin menghapus pengguna ini?')) return

    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
      })

      const result = await res.json()

      if (!res.ok) {
        alert(result.message || 'Gagal menghapus pengguna')
        return
      }

      // Hapus dari state lokal
      setUsers(prev => prev.filter(u => u._id !== userId))
    } catch (err) {
      console.error('Delete user error:', err)
      alert('Terjadi kesalahan saat menghapus pengguna')
    }
  }

  /* =========================
     FILTER SEARCH
  ========================== */
  const filteredUsers = users.filter(u =>
    u.username?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  )

  // Tampilkan tombol hanya jika role adalah superadmin atau admin
  const canAddAdmin = currentUserRole === 'superadmin' || currentUserRole === 'admin'

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">Admin Users</h1>
        <p className="text-muted-foreground">
          Manage school website administrator accounts
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
          <CardHeader><CardTitle>Active</CardTitle></CardHeader>
          <CardContent className="text-2xl font-bold">
            {users.filter(u => u.isActive !== false).length}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Inactive</CardTitle></CardHeader>
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
            placeholder="Search admin..."
            className="pl-9"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {canAddAdmin && (
          <Button onClick={() => setShowForm(!showForm)} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Admin
          </Button>
        )}
      </div>

      {/* FORM */}
      {showForm && canAddAdmin && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Admin</CardTitle>
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
              {currentUserRole === 'superadmin' && (
                <option value="superadmin">Super Admin</option>
              )}
              {(currentUserRole === 'superadmin' || currentUserRole === 'admin') && (
                <option value="admin">Admin</option>
              )}
              {(currentUserRole === 'superadmin' || currentUserRole === 'admin') && (
                <option value="editor">Editor</option>
              )}
            </select>

            <Button onClick={handleSubmit}>Save</Button>
          </CardContent>
        </Card>
      )}

      {/* TABLE */}
      <Card>
        <CardHeader>
          <CardTitle>Admin List</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-muted-foreground">Loading data...</p>
          ) : filteredUsers.length === 0 ? (
            <p className="text-muted-foreground">No admin data available</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Username</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead> {/* Kolom baru */}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map(user => (
                  <TableRow key={user._id}>
                    <TableCell className="font-medium">{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell className="capitalize">{user.role}</TableCell>
                    <TableCell>{user.isActive === false ? 'Inactive' : 'Active'}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => toggleUserStatus(user._id, user.isActive)}>
                          {user.isActive ? 'Disable' : 'Enable'}
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => deleteUser(user._id)}>
                          Delete
                        </Button>
                      </div>
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