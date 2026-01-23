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
import { Textarea } from '@/components/ui/textarea'

export default function SchoolProfilePage() {
  const [profile, setProfile] = useState({
    name: 'SMK PGRI Mojokerto',
    npsn: '20512345',
    address: 'Jl. Contoh No. 123',
    email: 'info@smkpgrimojokerto.sch.id',
    phone: '0321-123456',
    history: '',
    vision: '',
    mission: '',
    principalName: '',
  })

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          School Profile
        </h1>
        <p className="text-gray-600 mt-2">
          Manage school information
        </p>
      </div>

      {/* GENERAL INFO */}
      <Card>
        <CardHeader>
          <CardTitle>General Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            name="name"
            placeholder="School Name"
            value={profile.name}
            onChange={handleChange}
          />
          <Input
            name="npsn"
            placeholder="NPSN"
            value={profile.npsn}
            onChange={handleChange}
          />
          <Input
            name="email"
            placeholder="Email"
            value={profile.email}
            onChange={handleChange}
          />
          <Input
            name="phone"
            placeholder="Phone"
            value={profile.phone}
            onChange={handleChange}
          />
          <Input
            name="address"
            placeholder="Address"
            value={profile.address}
            onChange={handleChange}
            className="md:col-span-2"
          />
        </CardContent>
      </Card>

      {/* ABOUT SCHOOL */}
      <Card>
        <CardHeader>
          <CardTitle>About School</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            name="history"
            placeholder="School History"
            value={profile.history}
            onChange={handleChange}
            rows={4}
          />
        </CardContent>
      </Card>

      {/* VISION & MISSION */}
      <Card>
        <CardHeader>
          <CardTitle>Vision & Mission</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            name="vision"
            placeholder="Vision"
            value={profile.vision}
            onChange={handleChange}
            rows={3}
          />
          <Textarea
            name="mission"
            placeholder="Mission"
            value={profile.mission}
            onChange={handleChange}
            rows={4}
          />
        </CardContent>
      </Card>

      {/* LEADERSHIP */}
      <Card>
        <CardHeader>
          <CardTitle>Leadership</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            name="principalName"
            placeholder="Principal Name"
            value={profile.principalName}
            onChange={handleChange}
          />
        </CardContent>
      </Card>

      {/* ACTION */}
      <div className="flex justify-end">
        <Button>Save Changes</Button>
      </div>
    </div>
  )
}
