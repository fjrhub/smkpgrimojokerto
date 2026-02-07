"use client"
import { useState } from "react";

const categories = ["Semua", "Kegiatan", "Fasilitas", "Prestasi"];

const images = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1588072432836-e10032774350",
    title: "Upacara Bendera",
    category: "Kegiatan",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b",
    title: "Kegiatan Laboratorium",
    category: "Fasilitas",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178",
    title: "Lomba Antar Kelas",
    category: "Prestasi",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
    title: "Perpustakaan Sekolah",
    category: "Fasilitas",
  },
];

export default function App() {
  const [selected, setSelected] = useState(null);
  const [activeCategory, setActiveCategory] = useState("Semua");

  const filteredImages =
    activeCategory === "Semua"
      ? images
      : images.filter((img) => img.category === activeCategory);

  return (
    <section className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
          Galeri Sekolah
        </h1>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition 
                ${activeCategory === cat
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border hover:bg-blue-50"}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {filteredImages.map((img) => (
            <div
              key={img.id}
              onClick={() => setSelected(img)}
              className="group relative cursor-pointer overflow-hidden rounded-xl shadow"
            >
              <img
                src={img.src}
                alt={img.title}
                className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <p className="text-white font-semibold text-center px-2">
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
            <p className="text-center font-semibold">
              {selected.title}
            </p>
            <p className="text-center text-sm text-gray-500">
              {selected.category}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
