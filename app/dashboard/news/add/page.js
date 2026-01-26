'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { CalendarIcon, Upload, Eye, Save } from 'lucide-react';
import { format } from 'date-fns';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

const QuillEditor = dynamic(
  () => import('react-quill-new').then((mod) => mod.default),
  { ssr: false }
);

export default function AddNewsPage() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    publishDate: undefined,
    status: 'draft',
    attachment: null,
  });

  const [showPreview, setShowPreview] = useState(false);
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);

  const categories = [
    'Breaking News',
    'Politics',
    'Technology',
    'Health',
    'Education',
    'Sports',
    'Entertainment',
    'Business',
    'World',
    'Local',
  ];

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setFormData({ ...formData, attachment: file });
    }
  };

  const handleSave = async () => {
    try {
      if (!formData.title || !formData.content || !formData.category || !formData.publishDate) {
        alert('Title, content, category, and publish date are required');
        return;
      }

      setLoading(true);

      const newsData = {
        title: formData.title,
        content: formData.content,
        category: formData.category,
        publishDate: formData.publishDate,
        status: formData.status,
        ...(formData.attachment && {
          attachment: {
            originalName: formData.attachment.name,
          }
        }),
      };

      const response = await fetch('/api/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newsData),
      });

      const result = await response.json();

      if (response.ok) {
        alert('News saved successfully!');
        console.log('Saved news ID:', result.newsId);
        // Reset form
        setFormData({
          title: '',
          content: '',
          category: '',
          publishDate: undefined,
          status: 'draft',
          attachment: null,
        });
        setFileName('');
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('An error occurred while saving the news.');
    } finally {
      setLoading(false);
    }
  };

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ align: [] }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Add News</h1>
        <p className="text-gray-600 mt-2">Create a new news article</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>News Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">News Title *</Label>
              <Input
                id="title"
                placeholder="Enter news title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
              >
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

            <div className="space-y-2">
              <Label>News Content *</Label>
              <div className="bg-white border rounded-md">
                <QuillEditor
                  theme="snow"
                  value={formData.content}
                  onChange={(value) =>
                    setFormData({ ...formData, content: value })
                  }
                  modules={quillModules}
                  className="min-h-[300px]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Publish Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.publishDate
                      ? format(formData.publishDate, 'PPP')
                      : 'Pick a date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.publishDate}
                    onSelect={(date) =>
                      setFormData({ ...formData, publishDate: date })
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData({ ...formData, status: value })
                }
              >
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
              <Label>Featured Image or Attachment (Optional)</Label>
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
                disabled={loading}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
              >
                <Save size={18} />
                {loading ? 'Saving...' : 'Save News'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>News Preview</DialogTitle>
            <DialogDescription>
              This is how your news article will appear to readers
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                  {formData.category || 'Uncategorized'}
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full">
                  {formData.status === 'publish' ? 'Published' : 'Draft'}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                {formData.title || 'Untitled News'}
              </h2>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                {formData.publishDate && (
                  <span>Publish: {format(formData.publishDate, 'PPP')}</span>
                )}
              </div>
            </div>

            <div className="border-t pt-4">
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{
                  __html: formData.content || '<p>No content yet...</p>',
                }}
              />
            </div>

            {fileName && (
              <div className="border-t pt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Featured Media:
                </p>
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
  );
}