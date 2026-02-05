import React from "react";
import { Calendar } from "lucide-react";

// =====================================
// Agenda Home Page (Simple but Polished)
// SMK PGRI Kota Mojokerto
// Fokus: rapi, modern, tidak berlebihan
// =====================================

const DUMMY_AGENDAS = [
  {
    id: 1,
    title: "Pendaftaran SPMB SMK PGRI Kota Mojokerto 2026/2027",
    date: "2026-02-04", // tanggal MULAI pendaftaran
    time: "Periode Maret – 11 Juli 2026", // periode, bukan jam
    location: "Online & Sekolah", // cara / tempat pendaftaran
  },
  {
    id: 2,
    title: "Penilaian Sumatif Akhir Jenjang Kelas XII",
    date: "2026-02-10",
    time: "PSAJ - 14 Februari Tahun Ajaran 2025/2026",
    location: "SMK PGRI Kota Mojokerto",
  },

  {
    id: 3,
    title: "UKK Teori & Praktik Kejuruan Kelas XII",
    date: "2026-02-04",
    time: "Pelaksanaan UKK Tahun Ajaran 2025/2026",
    location: "SMK PGRI Kota Mojokerto",
  },
];

function formatDate(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("id-ID", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

export default function AgendaHome() {
  return (
    <section id="agenda" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Agenda Sekolah
            </h2>
            <p className="text-slate-600 mb-8 max-w-md">
              Kegiatan dan jadwal penting SMK PGRI Kota Mojokerto dalam beberapa
              hari ke depan.
            </p>

            {/* Agenda list */}
            <div className="space-y-4">
              {DUMMY_AGENDAS.map((agenda) => (
                <div
                  key={agenda.id}
                  className="flex items-start gap-4 p-4 border rounded-xl hover:border-blue-600 transition"
                >
                  <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900">
                      {agenda.title}
                    </p>
                    <p className="text-sm text-slate-500">
                      {formatDate(agenda.date)} • {agenda.time}
                    </p>
                    <p className="text-sm text-slate-500">{agenda.location}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href="#"
              className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition"
            >
              <Calendar className="w-5 h-5" />
              Lihat Semua Agenda
            </a>
          </div>

          {/* Right image */}
          <div className="hidden lg:block">
            <img
              src="Agenda.jpg"
              alt="Agenda Sekolah"
              className="rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
