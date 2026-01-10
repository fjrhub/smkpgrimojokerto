'use client'

import { Calendar, User, ChevronRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function HomePage() {
  const blogPosts = [
    {
      id: 1,
      image: 'https://images.pexels.com/photos/8728559/pexels-photo-8728559.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: { day: '18', month: 'Dec' },
      title: 'Kunjungan BoC dan BoD Telkom Indonesia di Malang, SMK Telkom Malang Teguhkan Peran School of Global Digitalent',
      fullDate: '18 December 2025',
      author: 'Editor Website',
      excerpt: 'SMK Telkom Malang kembali menjadi pusat perhatian dalam rangkaian kunjungan Dewan Komisaris (BoC) dan Direksi (BoD) PT Telkom Indonesia (Persero) Tbk ke Kota Malang. Kunjungan tersebut dirangkai dengan kegiatan Cybersecurity Talent Development yang digelar di kampus SMK Telkom Malang, Jal...'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1660644808219-1f103401bc85?auto=format&fit=crop&w=800',
      date: { day: '12', month: 'Dec' },
      title: 'Class Meet dan Tantangan Membentuk Generasi Pemikir',
      fullDate: '12 December 2025',
      author: 'Editor Website',
      excerpt: 'Menjelang akhir semester, hampir semua sekolah di Indonesia memiliki satu tradisi yang selalu muncul seperti musim: class meet. Sebuah ritual tahunan yang bagi sebagian siswa menjadi alasan untuk bangun lebih pagi dengan semangat, tetapi bagi sebagian lainnya hanyalah jeda yang panjang sebelum pembagian rapor...'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1530825894095-9c184b068fcb?auto=format&fit=crop&w=800',
      date: { day: '05', month: 'Dec' },
      title: 'Rombongan Disdikbud Kabupaten Madiun Kunjungi SMK Telkom Malang, Siswa Berprestasi Ikuti Seminar dan School Tour Teknologi',
      fullDate: '05 December 2025',
      author: 'Editor Website',
      excerpt: 'SMK Telkom Malang kembali menerima kunjungan istimewa dari tamu luar daerah. Pada Kamis (4/12) pagi, rombongan dari Dinas Pendidikan dan Kebudayaan (Disdikbud) Kabupaten Madiun yang terdiri atas 32 siswa SMP berprestasi, guru pendamping, serta tim dari dinas t...'
    }
  ]

  const categories = [
    'Informasi Umum',
    'Prestasi',
    'Agenda Sekolah',
    'Pengumuman Siswa',
    'Pengumuman Pegawai',
    'Pengumuman Orang Tua Siswa',
    'Karya Siswa'
  ]

  const recentPosts = [
    {
      image: 'https://images.pexels.com/photos/8728559/pexels-photo-8728559.jpeg?auto=compress&cs=tinysrgb&w=200',
      title: 'Kunjungan BoC dan BoD Telkom Indonesia di Malang, SMK Telkom Malang Teguhkan Peran School of Global Digitalent',
      date: '18 December 2025'
    },
    {
      image: 'https://images.unsplash.com/photo-1660644808219-1f103401bc85?auto=format&fit=crop&w=200',
      title: 'Class Meet dan Tantangan Membentuk Generasi Pemikir',
      date: '12 December 2025'
    },
    {
      image: 'https://images.unsplash.com/photo-1530825894095-9c184b068fcb?auto=format&fit=crop&w=200',
      title: 'Rombongan Disdikbud Kabupaten Madiun Kunjungi SMK Telkom Malang',
      date: '05 December 2025'
    },
    {
      image: 'https://images.pexels.com/photos/16053029/pexels-photo-16053029.jpeg?auto=compress&cs=tinysrgb&w=200',
      title: 'SMK Telkom Malang Jadi Satu-Satunya Sekolah Menengah yang Terlibat dalam Pusat Riset AI-RAN',
      date: '23 November 2025'
    },
    {
      image: 'https://images.pexels.com/photos/1635927/pexels-photo-1635927.jpeg?auto=compress&cs=tinysrgb&w=200',
      title: 'SMK Telkom Malang Ikut Pameran Teknologi AI dan Penganugerahan di ICCF 2025',
      date: '10 November 2025'
    }
  ]

  const sponsors = [
    { name: 'Lenovo', logo: '🖥️' },
    { name: 'Alibaba', logo: '🛒' },
    { name: 'Sevima', logo: '📱' },
    { name: 'Merkle', logo: '💼' },
    { name: 'Jagoan Hosting', logo: '🌐' },
    { name: 'Mandiri', logo: '🏦' },
    { name: 'Boxhill', logo: '🎓' },
    { name: 'Globalxtreme', logo: '📡' },
    { name: 'Fortinet', logo: '🔒' },
    { name: 'ITC', logo: '🏢' }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#20c46e] to-[#18a558] text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Berita Terbaru</h1>
            <nav className="flex justify-center items-center gap-2 text-sm">
              <a href="#" className="hover:underline">Beranda</a>
              <ChevronRight className="w-4 h-4" />
              <span className="opacity-80">Berita</span>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Blog Content - Main Area */}
          <div className="lg:col-span-2 space-y-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-64 object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-[#20c46e] hover:bg-[#18a558] text-white border-none flex flex-col items-center py-3 px-4">
                    <span className="text-2xl font-bold">{post.date.day}</span>
                    <span className="text-xs">{post.date.month}</span>
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-3 text-foreground hover:text-[#20c46e] transition-colors">
                    <a href="#">{post.title}</a>
                  </h2>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{post.fullDate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <Button variant="link" className="text-[#20c46e] hover:text-[#18a558] p-0 font-semibold">
                    Read More →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Categories */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Kategori Berita</h3>
                <ul className="space-y-2">
                  {categories.map((category, index) => (
                    <li key={index}>
                      <a
                        href="#"
                        className="flex items-center justify-between py-2 px-3 rounded hover:bg-[#20c46e]/10 hover:text-[#20c46e] transition-colors group"
                      >
                        <span>{category}</span>
                        <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Recent Posts */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Info Terbaru</h3>
                <div className="space-y-4">
                  {recentPosts.map((post, index) => (
                    <a
                      key={index}
                      href="#"
                      className="flex gap-3 group hover:bg-muted/50 p-2 rounded transition-colors"
                    >
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-20 h-20 object-cover rounded flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold mb-1 line-clamp-2 group-hover:text-[#20c46e] transition-colors">
                          {post.title}
                        </h4>
                        <p className="text-xs text-muted-foreground">{post.date}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="border-t bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-6 items-center">
            {sponsors.map((sponsor, index) => (
              <div
                key={index}
                className="flex items-center justify-center p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="text-4xl">{sponsor.logo}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">SMK Telkom Malang</h3>
            <p className="text-sm text-slate-400">The Real Informatics School</p>
            <p className="text-xs text-slate-500 mt-4">
              © 2025 SMK Telkom Malang. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-[#20c46e] hover:bg-[#18a558] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110"
        aria-label="WhatsApp"
      >
        <svg
          className="w-8 h-8"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </a>
    </div>
  )
}
