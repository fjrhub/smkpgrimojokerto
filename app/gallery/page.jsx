"use client";

import { useState, useMemo, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const categories = ["Semua", "Kegiatan", "Fasilitas", "Prestasi"];

const images = [
  {
    id: 1,
    src: "FasilitasKantin.jpg",
    title: "Kantin Sekolah",
    category: "Fasilitas",
  },
  {
    id: 2,
    src: "GedungUtama.jpg",
    title: "Gedung Sekolah – Tampak Depan",
    category: "Fasilitas",
  },
  {
    id: 3,
    src: "LingkunganSekolah.jpg",
    title: "Gedung Sekolah Bertingkat",
    category: "Fasilitas",
  },
  {
    id: 4,
    src: "codingArduino.jpg",
    title: "Setup Arduino Mobil",
    category: "Kegiatan",
  },
  {
    id: 5,
    src: "codingWebSch.jpg",
    title: "Pengembangan Website Sekolah dengan Next.js dan Vercel",
    category: "Kegiatan",
  },
  {
    id: 6,
    src: "codingArduinoMobil.jpg",
    title: "Pengembangan Sistem Kendali Mobil-Mobilan Berbasis Arduino",
    category: "Kegiatan",
  },
  {
    id: 7,
    src: "konfMikrotik.jpg",
    title: "Konfigurasi Jaringan Menggunakan Router MikroTik",
    category: "Kegiatan",
  },
  {
    id: 8,
    src: "konfCisco.jpg",
    title: "Simulasi Jaringan Menggunakan Cisco Packet Tracer",
    category: "Kegiatan",
  },
];

export default function App() {
  const [selected, setSelected] = useState(null);
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [showFilter, setShowFilter] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const filteredImages = useMemo(() => {
    const data =
      activeCategory === "Semua"
        ? images
        : images.filter((img) => img.category === activeCategory);

    return [...data].sort((a, b) => b.id - a.id);
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-background">
      {/* Tambahkan Navbar di sini */}
      <Navbar />

      {/* Gallery Section */}
      <section
        id="galeri"
        className="pt-28 md:pt-32 pb-14 bg-gradient-to-b from-gray-50 to-white"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
              Galeri Kegiatan dan Fasilitas Sekolah
            </h1>
            <p className="mt-3 text-gray-500 max-w-2xl mx-auto text-sm md:text-base">
              Dokumentasi resmi berbagai kegiatan, fasilitas, dan prestasi
              sekolah sebagai bentuk transparansi dan informasi kepada
              masyarakat.
            </p>
          </div>

          {/* Minimal Filter */}
          <div className="flex justify-end mb-6 relative">
            <button
              aria-label="Filter Galeri"
              onClick={() => setShowFilter((p) => !p)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border bg-white shadow-sm hover:shadow transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 text-gray-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 4h18M6 12h12M10 20h4"
                />
              </svg>
              <span className="text-sm font-medium text-gray-700">
                {activeCategory}
              </span>
            </button>

            {showFilter && (
              <div className="absolute top-12 bg-white rounded-lg shadow-md border w-40 overflow-hidden z-10">
                {categories.map((cat) => (
                  <div
                    key={cat}
                    onClick={() => {
                      setActiveCategory(cat);
                      setShowFilter(false);
                    }}
                    className={`px-4 py-2 text-sm cursor-pointer transition-colors
                      ${
                        activeCategory === cat
                          ? "bg-[#0552A2] text-white"
                          : "hover:bg-gray-100"
                      }`}
                  >
                    {cat}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {filteredImages.map((img) => (
              <div
                key={img.id}
                onClick={() => setSelected(img)}
                className="group relative cursor-pointer overflow-hidden rounded-xl shadow-sm hover:shadow-lg transition"
              >
                <img
                  src={img.src}
                  alt={img.title}
                  loading="lazy"
                  className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-end">
                  <p className="text-white font-semibold p-3 text-sm">
                    {img.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal */}
        {selected && (
          <div
            onClick={() => setSelected(null)}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl p-4 max-w-lg w-full mx-4"
            >
              <img
                src={selected.src}
                alt={selected.title}
                className="w-full rounded-lg mb-3"
              />
              <p className="text-center font-semibold">{selected.title}</p>
              <p className="text-center text-sm text-gray-500">
                {selected.category}
              </p>
            </div>
          </div>
        )}
      </section>
      {/* Tambahkan Footer di sini */}
      <Footer />
    </div>
  );
}
