'use client'

import Link from 'next/link'

/* ======================
   DUMMY DATA AGENDA
====================== */
const dummyAgenda = [
  {
    id: '1',
    title: 'Ujian Tengah Semester',
    description: 'Pelaksanaan UTS semester genap',
    date: '2026-02-10',
    startTime: '08:00',
    endTime: '12:00',
    location: 'Ruang Kelas',
    category: 'Akademik',
    status: 'upcoming',
  },
  {
    id: '2',
    title: 'Latihan Paskibra',
    description: 'Latihan rutin mingguan',
    date: '2026-02-05',
    startTime: '15:00',
    endTime: '17:00',
    location: 'Lapangan Sekolah',
    category: 'Ekstrakurikuler',
    status: 'ongoing',
  },
  {
    id: '3',
    title: 'Rapat OSIS',
    description: 'Evaluasi kegiatan bulanan',
    date: '2026-01-28',
    startTime: '09:00',
    endTime: '11:00',
    location: 'Aula Sekolah',
    category: 'OSIS',
    status: 'finished',
  },
]

/* ======================
   STATUS BADGE
====================== */
function StatusBadge({ status }) {
  const styles = {
    upcoming: 'bg-blue-100 text-blue-700',
    ongoing: 'bg-green-100 text-green-700',
    finished: 'bg-gray-100 text-gray-700',
    canceled: 'bg-red-100 text-red-700',
  }

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}
    >
      {status.toUpperCase()}
    </span>
  )
}

/* ======================
   AGENDA CARD
====================== */
function AgendaCard({ agenda }) {
  return (
    <Link href={`/agenda/${agenda.id}`}>
      <div className="rounded-xl border p-4 hover:shadow-md transition cursor-pointer">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg">{agenda.title}</h3>
          <StatusBadge status={agenda.status} />
        </div>

        <p className="text-sm text-gray-500 mt-2">
          {agenda.date} • {agenda.startTime} - {agenda.endTime}
        </p>

        <p className="text-sm text-gray-500">{agenda.location}</p>
        <p className="text-xs text-gray-400 mt-1">{agenda.category}</p>
      </div>
    </Link>
  )
}

/* ======================
   MAIN PAGE
====================== */
export default function AgendaPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Agenda Sekolah
        </h1>
        <p className="text-gray-600 mt-1">
          Daftar kegiatan dan jadwal sekolah
        </p>
      </div>

      {/* Agenda List */}
      {dummyAgenda.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg font-medium">Belum ada agenda</p>
          <p className="text-sm">Agenda akan tampil di sini</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {dummyAgenda.map(item => (
            <AgendaCard key={item.id} agenda={item} />
          ))}
        </div>
      )}
    </div>
  )
}