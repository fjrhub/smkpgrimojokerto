'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { CalendarIcon, Upload, Eye, Save } from 'lucide-react'
import { format } from 'date-fns'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

export default function AddAnnouncementPage() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    startDate: undefined,
    endDate: undefined,
    status: 'draft',
    priority: 'normal',
    attachment: null,
  })
  
  const [showPreview, setShowPreview] = useState(false)
  const [fileName, setFileName] = useState('')

  const categories = [
    'Academic',
    'Events',
    'Holidays',
    'Exam Schedule',
    'Sports',
    'Cultural',
    'Administrative',
    'General',
  ]

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
      setFormData({ ...formData, attachment: file })
    }
  }

  const handleSave = () => {
    console.log('Saving announcement:', formData)
    alert('Announcement saved successfully! (This is a demo - no backend connected)')
  }

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ align: [] }],
      ['link', 'image'],
      ['clean'],
    ],
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Add New Announcement</h1>
        <p className="text-gray-600 mt-2">Create and publish announcements for your school</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Announcement Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Announcement Title *</Label>
              <Input
                id="title"
                placeholder="Enter announcement title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full"
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat.toLowerCase()}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Rich Text Editor */}
            <div className="space-y-2">
              <Label>Announcement Content *</Label>
              <div className="bg-white border rounded-md">
                <ReactQuill
                  theme="snow"
                  value={formData.content}
                  onChange={(value) => setFormData({ ...formData, content: value })}
                  modules={quillModules}
                  className="min-h-[300px]"
                />
              </div>
            </div>

            {/* Date Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.startDate ? format(formData.startDate, 'PPP') : 'Pick a date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.startDate}
                      onSelect={(date) => setFormData({ ...formData, startDate: date })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>End Date (Optional)</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.endDate ? format(formData.endDate, 'PPP') : 'Pick a date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.endDate}
                      onSelect={(date) => setFormData({ ...formData, endDate: date })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Status and Priority */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="publish">Publish</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Priority</Label>
                <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="important">Important</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* File Upload */}
            <div className="space-y-2">
              <Label>Attachment (PDF / Image)</Label>
              <div className="flex items-center gap-4">
                <label
                  htmlFor="file-upload"
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <Upload size={18} />
                  <span className="text-sm">Choose File</span>
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  className="hidden"
                />
                {fileName && (
                  <span className="text-sm text-gray-600">{fileName}</span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                onClick={() => setShowPreview(true)}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Eye size={18} />
                Preview
              </Button>
              <Button
                type="button"
                onClick={handleSave}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
              >
                <Save size={18} />
                Save Announcement
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Preview Modal */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Announcement Preview</DialogTitle>
            <DialogDescription>
              This is how your announcement will appear to users
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            {/* Preview Header */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                {formData.priority === 'important' && (
                  <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                    IMPORTANT
                  </span>
                )}
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                  {formData.category || 'Uncategorized'}
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full">
                  {formData.status === 'publish' ? 'Published' : 'Draft'}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                {formData.title || 'Untitled Announcement'}
              </h2>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                {formData.startDate && (
                  <span>Start: {format(formData.startDate, 'PPP')}</span>
                )}
                {formData.endDate && (
                  <span>End: {format(formData.endDate, 'PPP')}</span>
                )}
              </div>
            </div>

            {/* Preview Content */}
            <div className="border-t pt-4">
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: formData.content || '<p>No content yet...</p>' }}
              />
            </div>

            {/* Preview Attachment */}
            {fileName && (
              <div className="border-t pt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Attachment:</p>
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-md">
                  <Upload size={16} className="text-gray-500" />
                  <span className="text-sm text-gray-700">{fileName}</span>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
