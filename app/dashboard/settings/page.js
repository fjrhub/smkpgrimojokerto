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
import { Switch } from '@/components/ui/switch'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    siteTitle: 'SMK PGRI Mojokerto',
    tagline: 'Sekolah Unggul & Berkarakter',
    metaTitle: '',
    metaDescription: '',
    footerText: '© 2025 SMK PGRI Mojokerto',
    enableNews: true,
    enableGallery: true,
    enableDocuments: true,
    maintenanceMode: false,
  })

  const handleChange = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value,
    })
  }

  const toggleChange = (key) => {
    setSettings({
      ...settings,
      [key]: !settings[key],
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Website Settings
        </h1>
        <p className="text-gray-600 mt-2">
          Manage website configuration
        </p>
      </div>

      {/* GENERAL SETTINGS */}
      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            name="siteTitle"
            placeholder="Website Title"
            value={settings.siteTitle}
            onChange={handleChange}
          />
          <Input
            name="tagline"
            placeholder="Tagline"
            value={settings.tagline}
            onChange={handleChange}
          />
        </CardContent>
      </Card>

      {/* SEO SETTINGS */}
      <Card>
        <CardHeader>
          <CardTitle>SEO Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            name="metaTitle"
            placeholder="Meta Title"
            value={settings.metaTitle}
            onChange={handleChange}
          />
          <Textarea
            name="metaDescription"
            placeholder="Meta Description"
            value={settings.metaDescription}
            onChange={handleChange}
            rows={3}
          />
        </CardContent>
      </Card>

      {/* FOOTER SETTINGS */}
      <Card>
        <CardHeader>
          <CardTitle>Footer Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            name="footerText"
            placeholder="Footer Text"
            value={settings.footerText}
            onChange={handleChange}
          />
        </CardContent>
      </Card>

      {/* FEATURE TOGGLE */}
      <Card>
        <CardHeader>
          <CardTitle>Feature Toggle</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Enable News</span>
            <Switch
              checked={settings.enableNews}
              onCheckedChange={() =>
                toggleChange('enableNews')
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <span>Enable Gallery</span>
            <Switch
              checked={settings.enableGallery}
              onCheckedChange={() =>
                toggleChange('enableGallery')
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <span>Enable Documents</span>
            <Switch
              checked={settings.enableDocuments}
              onCheckedChange={() =>
                toggleChange('enableDocuments')
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* MAINTENANCE MODE */}
      <Card>
        <CardHeader>
          <CardTitle>Maintenance Mode</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <span>Enable Maintenance Mode</span>
          <Switch
            checked={settings.maintenanceMode}
            onCheckedChange={() =>
              toggleChange('maintenanceMode')
            }
          />
        </CardContent>
      </Card>

      {/* SAVE BUTTON */}
      <div className="flex justify-end">
        <Button>Save Settings</Button>
      </div>
    </div>
  )
}
