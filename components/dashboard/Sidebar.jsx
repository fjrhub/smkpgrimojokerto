'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  FileText,
  Megaphone,
  Calendar,
  Image,
  Download,
  Building2,
  Users,
  UserCog,
  Settings,
  ChevronDown,
  ChevronRight,
  LogOut,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const menuItems = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
  },
  {
    title: 'News',
    icon: FileText,
    submenu: [
      { title: 'All News', href: '/dashboard/news' },
      { title: 'Add News', href: '/dashboard/news/add' },
      { title: 'News Categories', href: '/dashboard/news/categories' },
    ],
  },
  {
    title: 'Announcements',
    icon: Megaphone,
    submenu: [
      { title: 'All Announcements', href: '/dashboard/announcements' },
      { title: 'Add Announcement', href: '/dashboard/announcements/add' },
      { title: 'Announcement Categories', href: '/dashboard/announcements/categories' },
    ],
  },
  {
    title: 'Agenda',
    icon: Calendar,
    href: '/dashboard/agenda',
  },
  {
    title: 'Gallery',
    icon: Image,
    href: '/dashboard/gallery',
  },
  {
    title: 'Document Downloads',
    icon: Download,
    href: '/dashboard/downloads',
  },
  {
    title: 'School Profile',
    icon: Building2,
    href: '/dashboard/profile',
  },
  {
    title: 'Teachers & Staff',
    icon: Users,
    href: '/dashboard/teachers',
  },
  {
    title: 'Admin Users',
    icon: UserCog,
    href: '/dashboard/admin-users',
  },
  {
    title: 'Website Settings',
    icon: Settings,
    href: '/dashboard/settings',
  },
]

export default function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname()
  const router = useRouter()
  const [expandedMenus, setExpandedMenus] = useState(['News', 'Announcements'])

  const toggleMenu = (title) => {
    setExpandedMenus((prev) =>
      prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]
    )
  }

  const isActive = (href) => pathname === href

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      if (response.ok) {
        router.push('/login');
      } else {
        console.error('Gagal logout:', response.status, await response.text());
      }
    } catch (err) {
      console.error('Network Error:', err);
    }
  };

  return (
    <aside
      className={cn(
        'fixed top-0 left-0 z-40 h-screen transition-transform',
        'w-64 bg-gradient-to-b from-blue-900 to-blue-800 text-white',
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      )}
    >
      <div className="h-full flex flex-col">
        {/* Logo/Header */}
        <div className="px-6 py-6 border-b border-blue-700">
          <h2 className="text-xl font-bold">School Admin</h2>
          <p className="text-blue-200 text-sm mt-1">Dashboard</p>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon
              const hasSubmenu = item.submenu && item.submenu.length > 0
              const isExpanded = expandedMenus.includes(item.title)

              if (hasSubmenu) {
                return (
                  <li key={item.title}>
                    <button
                      onClick={() => toggleMenu(item.title)}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={20} />
                        <span className="font-medium">{item.title}</span>
                      </div>
                      {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                    </button>
                    {isExpanded && (
                      <ul className="mt-1 ml-4 space-y-1">
                        {item.submenu.map((subItem) => (
                          <li key={subItem.href}>
                            <Link
                              href={subItem.href}
                              onClick={onClose}
                              className={cn(
                                'block px-3 py-2 rounded-lg text-sm transition-colors',
                                isActive(subItem.href)
                                  ? 'bg-blue-600 font-medium'
                                  : 'hover:bg-blue-700 text-blue-100'
                              )}
                            >
                              {subItem.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                )
              }

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
                      isActive(item.href)
                        ? 'bg-blue-600 font-medium'
                        : 'hover:bg-blue-700'
                    )}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.title}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-blue-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold">
              A
            </div>
            <div>
              <p className="font-medium text-sm">Admin User</p>
              <p className="text-blue-200 text-xs">admin@school.edu</p>
            </div>
          </div>
          {/* Tombol Logout */}
          <button
            onClick={handleLogout}
            className="mt-4 w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-200 hover:bg-red-900 transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  )
}