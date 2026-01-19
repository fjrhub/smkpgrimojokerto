"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import { Menu, X } from "lucide-react";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showMenuButton, setShowMenuButton] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Logika scroll yang lebih sensitif
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDifference = currentScrollY - lastScrollY;

      // Jika discroll ke bawah (bahkan sedikit), sembunyikan tombol
      if (scrollDifference > 0) {
        setShowMenuButton(false);
      }
      // Jika discroll ke atas (bahkan sedikit), tampilkan tombol
      else if (scrollDifference < 0) {
        setShowMenuButton(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content */}
      <div className="lg:ml-64">
        <main className="p-4 lg:p-8 pt-4 lg:pt-8">{children}</main>
      </div>

      {/* Tombol menu yang muncul/hilang saat discroll */}
      {showMenuButton && (
        <div className="lg:hidden fixed top-3 right-3 z-40">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md bg-white text-gray-600 hover:bg-gray-100 shadow-sm transition-colors"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      )}

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
