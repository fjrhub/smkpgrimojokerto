"use client";
import { useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  Play,
  Laptop,
  School,
  Users,
  Building,
  Code,
  Network,
  Gamepad2,
  Calendar,
  MessageSquare,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Phone,
  Cog,
  Car,
  Bike,
  Cpu,
  Wrench,
  Zap,
  Settings,
  Thermometer,
  Droplet,
  Store,
  Eye,
  Target,
  Lightbulb,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import TikTokIcon from "@/public/tiktok";
import { ReactNode } from "react";
import Testimonials from "@/components/Testimonial";
import AgendaHome from "@/components/Agenda";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface MenuItem {
  label: string;
  href: string;
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [studentData, setStudentData] = useState({
    tkj: 160,
    tei: 108,
    tp: 150,
    tkr: 103,
    tbsm: 200,
  });

  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // State untuk jumlah gambar yang ditampilkan di galeri
  const [visibleCount, setVisibleCount] = useState(2); // default mobile

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth >= 1024) {
        setVisibleCount(3); // lg+
      } else if (window.innerWidth >= 768) {
        setVisibleCount(2); // md+
      } else {
        setVisibleCount(2); // sm-
      }
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  // Carousel untuk Gallery
  const [emblaRefGallery] = useEmblaCarousel({ loop: true, align: "center" }, [
    Autoplay({ delay: 3000 }),
  ]);

  // Carousel untuk Testimonials
  const [emblaRefTestimonials] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000 }),
  ]);

  // Carousel untuk Partners
  const [emblaRefPartners] = useEmblaCarousel({ loop: true, align: "start" }, [
    Autoplay({ delay: 2000 }),
  ]);

  const facilityImages = [
    {
      url: "lab1.png",
      title: "Lingkungan Belajar yang Nyaman ",
      link: "#",
    },
    {
      url: "GedungUtama.jpg",
      title: "Gedung Utama Sekolah",
      link: "#",
    },
    {
      url: "lab2.png",
      title: "Fasilitas Kantin Sekolah",
      link: "#",
    },
  ];

  const newsItems = [
    {
      image: "spmb.jpg",
      title: "Pendaftaran SPMB SMK PGRI Kota Mojokerto 2026/2027",
      date: "23 Januari 2026",
    },
    {
      image: "israMiraj.jpg",
      title: "Peringatan Isra’ Mi’raj Nabi Muhammad SAW 1447 H",
      date: "21 December 2026",
    },
    {
      image: "backtoschool.jpg",
      title: "Waktunya Kembali ke Sekolah: Semester Genap 2025/2026",
      date: "05 Januari 2026",
    },
  ];

  const partners = [
    "nale.png",
    "tjiwi.png",
    "ahm.png",
    "bsi.png",
    "unesa.png",
    "digiware.png",
    "dutaasia.png",
    "imm.png",
    "st.png",
    "tam.png",
    "plc.png",
    "maxx.png",
    "mitsubishi.png",
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    initial: {},
    whileInView: { transition: { staggerChildren: 0.1 } },
    viewport: { once: true },
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section
        id="home"
        className="relative flex items-center overflow-hidden pt-20 md:pt-0"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-50 -z-10" />
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                The Real
                <br />
                <span className="text-[#0552A2]">Informatics School.</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Pelopor SMK bidang Teknologi dan
                <br />
                Informatika di Indonesia
              </p>
              <Button
                size="lg"
                className="bg-[#0552A2] hover:bg-[#003164] text-lg px-8"
              >
                Join Now
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <img src="page.png" alt="Students" className="rounded-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section id="about" className="py-8 bg-white scroll-mt-24">
        <div className="container mx-auto px-4">
          <motion.div
            {...fadeInUp}
            className="text-center max-w-3xl mx-auto mb-8"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Kenapa Harus SMK PGRI Kota Mojokerto?
            </h2>
            <p className="text-gray-600 text-lg">
              Alasan kenapa kalian semua harus bergabung dengan SMK PGRI KOTA
              MOJOKERTO
            </p>
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            <FeatureCard
              icon={<Laptop className="w-12 h-12" />}
              title="Fasilitas Lengkap"
              description="Mendukung kegiatan belajar dan praktik siswa."
              color="bg-blue-500"
            />
            <FeatureCard
              icon={<School className="w-12 h-12" />}
              title="Lingkungan Nyaman"
              description="Lingkungan sekolah aman dan kondusif."
              color="bg-yellow-500"
            />
            <FeatureCard
              icon={<Users className="w-12 h-12" />}
              title="Pengajar Kompeten"
              description="Didukung guru berpengalaman di bidangnya."
              color="bg-red-500"
            />
            <FeatureCard
              icon={<Building className="w-12 h-12" />}
              title="Kerjasama Luas"
              description="Memiliki relasi dengan dunia industri."
              color="bg-gray-700"
            />
          </motion.div>
        </div>
      </section>

      {/* Headmaster Welcome */}
      <section id="sambutan" className="py-20 from-orange-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeInUp}>
              <span className="text-[#0552A2] font-semibold text-sm uppercase tracking-wide">
                Sambutan
              </span>
              <h2 className="text-4xl font-bold mt-2 mb-6">Kepala Sekolah</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Selamat datang di website SMK PGRI KOTA MOJOKERTO yang saya
                  tujukan untuk seluruh unsur pimpinan, guru, karyawan dan siswa
                  serta khalayak umum guna dapat mengakses seluruh informasi
                  tentang sekolah kami.
                </p>
                <p>
                  Saya berharap Website ini dapat dijadikan wahana interaksi
                  yang positif baik antar civitas akademika maupun masyarakat
                  pada umumnya, sehingga dapat menjalin silaturahmi yang erat
                  disegala unsur.
                </p>
                <p className="font-semibold text-gray-900">
                  - Khoirul Anwar, M.Pd
                </p>
              </div>
            </motion.div>
            <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
              <img src="kepala.jpg" alt="Headmaster" className="rounded-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video Profile */}
      <section
        id="video"
        className="py-20 bg-gradient-to-br from-blue-50 to-white scroll-mt-20"
      >
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.2 }}
              className="lg:order-first lg:col-span-1"
            >
              <span className="text-[#0552A2] font-semibold text-sm uppercase tracking-wide">
                Kuy, nonton!
              </span>
              <h2 className="text-4xl font-bold mt-2 mb-6">
                Video Profil Skagrimo
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Video profil sekolah memperkenalkan kepada kalian hal-hal
                berkaitan dengan lingkungan sekolah, fasilitas umum sekolah,
                fasilitas pembelajaran, ruang belajar, kegiatan siswa dan masih
                banyak lagi.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Biar kalian tidak penasaran apa saja yang ada di dalam SMK PGRI
                KOTA MOJOKERTO, segera tonton video profilnya.
              </p>
            </motion.div>
            <motion.div
              {...fadeInUp}
              className="relative group cursor-pointer lg:order-last lg:col-span-1"
              onClick={() =>
                window.open(
                  "https://www.youtube.com/watch?v=Kde6NvpPtJg  ",
                  "_blank",
                )
              }
            >
              <img
                src="tubnail.webp"
                alt="Video"
                className="rounded-2xl shadow-xl"
              />
              <div className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center group-hover:bg-black/50 transition-colors">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-20 h-20 text-[#0552A2] rounded-full flex items-center justify-center"
                >
                  <Play className="w-8 h-8 text-white ml-1" fill="white" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Visi Misi */}
      <section
        id="visimisi"
        className="py-20 bg-gradient-to-br from-blue-50 to-white scroll-mt-20"
      >
        <div className="container mx-auto px-4">
          {/* Judul Utama */}
          <motion.div
            {...fadeInUp}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-800">
              Visi & Misi Kami
            </h2>
            <p className="text-gray-600 text-lg">
              Menjadi pondasi dalam membentuk generasi penerus bangsa yang
              unggul, religius, dan berdaya saing tinggi.
            </p>
          </motion.div>

          {/* Kontainer Grid untuk Visi dan Misi */}
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Kartu Visi */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="h-full bg-gradient-to-br from-blue-50 to-blue-100 border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-[#0552A2] rounded-xl flex items-center justify-center">
                      <Eye className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">
                      Visi Kami
                    </h3>
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed italic">
                    "Menjadi pusat pendidikan terdepan dalam bidang Teknik
                    Komputer dan Jaringan, menghasilkan lulusan yang kompeten,
                    inovatif, dan siap menghadapi tantangan era digital."
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Kartu Misi */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="h-full bg-gradient-to-br from-blue-50 to-blue-100 border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-[#0552A2] rounded-xl flex items-center justify-center">
                      <Target className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">
                      Misi Kami
                    </h3>
                  </div>
                  <ul className="space-y-4 text-gray-700">
                    <li className="flex items-start gap-3">
                      <div className="mt-1 w-6 h-6 bg-[#0552A2] rounded-full flex items-center justify-center flex-shrink-0">
                        <Lightbulb className="w-3 h-3 text-white" />
                      </div>
                      <span>
                        Menyediakan pendidikan bertkualitas tinggi di bidang
                        TKJ.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1 w-6 h-6 bg-[#0552A2] rounded-full flex items-center justify-center flex-shrink-0">
                        <Users className="w-3 h-3 text-white" />
                      </div>
                      <span>
                        Meningkatkan ketrampilan praktis siswa sesuai kebutuhan
                        industri.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1 w-6 h-6 bg-[#0552A2] rounded-full flex items-center justify-center flex-shrink-0">
                        <GraduationCap className="w-3 h-3 text-white" />
                      </div>
                      <span>
                        Membentuk lulusan yang berakhlak mulia dan siap kerja.
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Student Statistics */}
      <section
        id="numbers"
        className="py-20 bg-gradient-to-br from-[#0552A2] to-[#003164] text-white"
      >
        <div className="container mx-auto px-4">
          <motion.div
            {...fadeInUp}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Siswa Kami Lebih dari 700+
            </h2>
            <p className="text-orange-100 text-lg">
              Mayoritas siswa kami tidak hanya dari Mojokerto, namun juga dari
              berbagai daerah.
              <br />
              Semuanya berkesempatan bergabung dengan kami.
            </p>
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-5 gap-8" /* Mengubah menjadi 5 kolom */
          >
            <StatCard
              number={studentData.tkj}
              label="TKJ"
              color="from-blue-400 to-blue-600"
            />
            <StatCard
              number={studentData.tp} /* Pastikan data ini ada di studentData */
              label="TP"
              color="from-green-400 to-green-600"
            />
            <StatCard
              number={studentData.tei}
              label="TEI"
              color="from-yellow-400 to-yellow-600"
            />
            <StatCard
              number={
                studentData.tkr
              } /* Pastikan data ini ada di studentData */
              label="TKR"
              color="from-red-400 to-red-600"
            />
            <StatCard
              number={
                studentData.tbsm
              } /* Pastikan data ini ada di studentData */
              label="TBSM"
              color="from-purple-400 to-purple-600"
            />
          </motion.div>
        </div>
      </section>

      {/* Program Keahlian */}
      <section id="program" className="py-20 scroll-mt-10">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div {...fadeInUp}>
              <h2 className="text-4xl font-bold mb-6">Program Keahlian</h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                SMK PGRI KOTA MOJOKERTO memiliki lima program keahlian unggulan
                yang bisa kalian pilih. Setiap program dirancang untuk
                mempersiapkan siswa dengan keterampilan praktis dan teori yang
                relevan dengan industri.
              </p>
              <a href="#tkj">
                {" "}
                {/* 🔑 Sekarang mengarah ke #tkj */}
                <Button
                  variant="outline"
                  className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition"
                >
                  Detail
                </Button>
              </a>
            </motion.div>
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <ProgramTimeline
                icon={<Cog />}
                title="Teknik Pemesinan"
                color="bg-yellow-500"
              />
              <ProgramTimeline
                icon={<Car />}
                title="Teknik Kendaraan Ringan"
                color="bg-red-500"
              />
              <ProgramTimeline
                icon={<Bike />}
                title="Teknik Sepeda Motor"
                color="bg-green-500"
              />
              <ProgramTimeline
                icon={<Network />}
                title="Teknik Komputer dan Jaringan"
                color="bg-blue-500"
              />
              <ProgramTimeline
                icon={<Cpu />}
                title="Teknik Elektronika Industri"
                color="bg-purple-500"
              />
            </motion.div>
          </div>

          {/* Teknik Komputer dan Jaringan - Gambar di KANAN, konten di KIRI */}
          <motion.div {...fadeInUp} className="mb-20">
            <div
              className="grid lg:grid-cols-2 gap-12 items-center"
              id="tkj"
              style={{ scrollMarginTop: "80px" }}
            >
              <div>
                <h2 className="text-4xl font-bold mb-6">
                  Teknik Komputer dan Jaringan
                </h2>
                <p className="text-gray-600 mb-8">
                  Mempelajari cara merakit dan memelihara PC, menginstalasi
                  serta mengonfigurasi jaringan LAN/WAN menggunakan perangkat
                  seperti MikroTik, serta mensimulasikan topologi jaringan
                  dengan Cisco Packet Tracer. Materi juga mencakup dasar
                  Internet of Things (IoT) dan keamanan jaringan.
                </p>
                <Accordion type="single" collapsible className="space-y-4">
                  <AccordionItem
                    value="networking"
                    className="border rounded-lg px-4"
                  >
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Network className="w-5 h-5 text-blue-600" />
                        </div>
                        <span className="font-semibold">Jaringan Komputer</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 pt-4">
                      Siswa belajar merancang, membangun, dan mengelola jaringan
                      lokal (LAN) maupun luas (WAN), termasuk konfigurasi router
                      MikroTik dan simulasi jaringan menggunakan Cisco Packet
                      Tracer.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem
                    value="pc-assembly"
                    className="border rounded-lg px-4"
                  >
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Cpu className="w-5 h-5 text-purple-600" />
                        </div>
                        <span className="font-semibold">
                          Perakitan & Perawatan PC
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 pt-4">
                      Mempelajari komponen hardware komputer, teknik perakitan,
                      instalasi sistem operasi, troubleshooting, serta perawatan
                      berkala untuk menjaga performa PC.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem
                    value="career-tkj"
                    className="border rounded-lg px-4"
                  >
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <Users className="w-5 h-5 text-green-600" />
                        </div>
                        <span className="font-semibold">Kesempatan Kerja</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 pt-4">
                      Lulusan TKJ banyak bekerja pada posisi network designer,
                      network engineer, network operating center (NOC), DevOps,
                      dan berwirausaha dibidang IT.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              <div>
                <img
                  src="codingArduino.jpg"
                  alt="TKJ"
                  className="rounded-2xl shadow-xl"
                />
              </div>
            </div>
          </motion.div>

          {/* Teknik Elektronika Industri - Gambar di KIRI (desktop), di BAWAH teks (mobile) */}
          <motion.div {...fadeInUp} className="mb-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* TEKS */}
              <div className="order-1 lg:order-2">
                <h2 className="text-4xl font-bold mb-6">
                  Teknik Elektronika Industri
                </h2>
                <p className="text-gray-600 mb-8">
                  Mempelajari instalasi, perbaikan, dan pemeliharaan sistem
                  elektronika industri,
                  <br />
                  termasuk PLC, sensor, dan sistem kontrol otomatis.
                </p>

                <Accordion type="single" collapsible className="space-y-4">
                  <AccordionItem value="plc" className="border rounded-lg px-4">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Cpu className="w-5 h-5 text-purple-600" />
                        </div>
                        <span className="font-semibold">
                          PLC dan Otomatisasi
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 pt-4">
                      Siswa akan belajar memprogram dan mengoperasikan PLC
                      (Programmable Logic Controller) untuk mengendalikan mesin
                      dan proses industri.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="sensor"
                    className="border rounded-lg px-4"
                  >
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Thermometer className="w-5 h-5 text-purple-600" />
                        </div>
                        <span className="font-semibold">
                          Sensor dan Instrumentasi
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 pt-4">
                      Mempelajari berbagai jenis sensor, aktuator, dan sistem
                      instrumentasi untuk monitoring dan kontrol proses
                      industri.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="career-tei"
                    className="border rounded-lg px-4"
                  >
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <Users className="w-5 h-5 text-green-600" />
                        </div>
                        <span className="font-semibold">Kesempatan Kerja</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 pt-4">
                      Lulusan TEI banyak bekerja sebagai teknisi elektronika,
                      engineer kontrol, atau berwirausaha di bidang instalasi
                      dan perawatan sistem otomatisasi.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              {/* GAMBAR */}
              <div className="order-2 lg:order-1">
                <img
                  src="praktekTei.jpg"
                  alt="Teknik Elektronika Industri"
                  className="rounded-2xl shadow-xl"
                />
              </div>
            </div>
          </motion.div>

          {/* Praktek TBSM - Gambar di KANAN, konten di KIRI */}
          <motion.div {...fadeInUp} className="mb-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6">
                  Praktek Teknik & Bisnis Sepeda Motor
                </h2>
                <p className="text-gray-600 mb-8">
                  Kegiatan praktek TBSM dilaksanakan untuk membekali siswa
                  <br />
                  dengan keterampilan sesuai standar bengkel profesional.
                </p>
                <Accordion type="single" collapsible className="space-y-4">
                  <AccordionItem
                    value="servis"
                    className="border rounded-lg px-4"
                  >
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <Wrench className="w-5 h-5 text-green-600" />
                        </div>
                        <span className="font-semibold">
                          Servis & Perawatan Berkala
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 pt-4">
                      Praktek ganti oli, penyetelan rem, rantai, kopling, serta
                      pemeriksaan kondisi sepeda motor secara menyeluruh.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem
                    value="kelistrikan"
                    className="border rounded-lg px-4"
                  >
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <Zap className="w-5 h-5 text-green-600" />
                        </div>
                        <span className="font-semibold">
                          Sistem Kelistrikan Sepeda Motor
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 pt-4">
                      Pemeriksaan sistem pengapian, starter elektrik, sistem
                      pengisian, serta instalasi dan perawatan lampu.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem
                    value="karir"
                    className="border rounded-lg px-4"
                  >
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <Store className="w-5 h-5 text-green-600" />
                        </div>
                        <span className="font-semibold">Kesempatan Kerja</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 pt-4">
                      Lulusan TBSM memiliki peluang kerja sebagai mekanik
                      bengkel, teknisi sepeda motor, service advisor, hingga
                      membuka usaha bengkel secara mandiri.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              <div>
                <img
                  src="praktekTbsm.png"
                  alt="Praktek TBSM"
                  className="rounded-2xl shadow-xl"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Fasilitas (Minimalist) */}
      <section
        id="galeri"
        className="py-12 text-white text-center scroll-mt-20"
      >
        <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-black">
          Fasilitas & Lab Komputer
        </h2>
        <p className="text-gray-600 text-lg mb-4">
          Fasilitas lab komputer lengkap untuk pembelajaran praktis siswa.
        </p>

        {/* PERFECT SIZED BUTTON - Minimal but Usable */}
        <a
          href="/gallery"
          className="inline-flex items-center text-sm font-medium text-[#0552A2] bg-[#0552A2]/10 hover:bg-[#0552A2]/15 px-4 py-1.5 rounded-md transition-all duration-200 hover:shadow-[0_1px_2px_rgba(5,82,162,0.15)] hover:translate-y-[-0.5px] group"
        >
          <span className="tracking-wide">Lihat semua galeri</span>
          <span className="ml-2 text-[0.85em] transition-transform group-hover:translate-x-1">
            →
          </span>
        </a>
      </section>

      {/* Fasilitas (Minimalist) - MODIFIED */}
      <section className="py-0 bg-gray-900">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
          {facilityImages.slice(0, visibleCount).map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={image.url}
                alt={image.title}
                loading="lazy"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-white text-lg font-medium">
                  {image.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Latest News */}
      <section id="berita" className="py-20 scroll-mt-20">
        <div className="container mx-auto px-4">
          <motion.div
            {...fadeInUp}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Berita Terbaru
            </h2>
            <p className="text-gray-600 text-lg">
              Ikuti terus informasi dan berita-berita terbaru tentang SMK PGRI
              Kota Mojokerto.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsItems.map((item, index) => (
              <motion.div
                key={index}
                {...fadeInUp}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden group cursor-pointer hover:shadow-xl transition-shadow">
                  <div className="relative overflow-hidden aspect-video">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-3 line-clamp-3 group-hover:text-[#0552A2] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500 flex items-center gap-2">
                      <Calendar size={16} />
                      {item.date}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* School Agenda */}
      <AgendaHome />

      {/* Testimonials */}
      <Testimonials id="testmonials" />

      <section className="py-10 bg-gray-50">
        <div className="w-full px-4">
          <div className="overflow-hidden" ref={emblaRefPartners}>
            <div className="flex gap-12 px-8">
              {partners.map((partner, index) => (
                <div key={index} className="flex-[0_0_auto]">
                  <div className="w-40 h-24 rounded-lg flex items-center justify-center p-4 hover:shadow-md transition-shadow">
                    <img
                      src={partner}
                      alt="Partner"
                      className="max-w-full max-h-full object-contain opacity-60 hover:opacity-100 transition-opacity"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white pt-20 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-orange-500">
                SMK PGRI KOTA MOJOKERTO
              </h3>
              <p className="text-gray-400 leading-relaxed">
                SMK PGRI Kota Mojokerto adalah SMK swasta terakreditasi A di
                Kota Mojokerto yang berdiri sejak 1987 dan menyelenggarakan
                pendidikan kejuruan di berbagai bidang teknik, termasuk TKJ.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Menu Utama</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-blue-500 transition-colors">
                    Beranda
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="hover:text-blue-500 transition-colors"
                  >
                    Tentang Kami
                  </a>
                </li>
                <li>
                  <a
                    href="#program"
                    className="hover:text-blue-500 transition-colors"
                  >
                    Profil Jurusan
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500 transition-colors">
                    PPDB
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Hubungi Kami</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-blue-500 transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500 transition-colors">
                    Layanan Orang Tua
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500 transition-colors">
                    Kotak Pertanyaan
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500 transition-colors">
                    Pusat Bantuan
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Alamat</h4>
              <p className="text-gray-400 leading-relaxed mb-4">
                Jl. Ketidur No.55, Mergelo, Surodinawan, Kec. Prajurit Kulon,
                Kota Mojokerto, Jawa Timur 61328
              </p>
              <div className="flex gap-3">
                <SocialIcon
                  icon={<Facebook size={18} />}
                  dark
                  url="https://facebook.com/skagrimo"
                />
                <SocialIcon
                  icon={<Instagram size={18} />}
                  dark
                  url="https://www.instagram.com/skagrimo"
                />
                <SocialIcon
                  icon={<TikTokIcon className="w-5 h-5" />}
                  dark
                  url="https://tiktok.com/@skagrimo"
                />
                <SocialIcon
                  icon={<Youtube size={18} />}
                  dark
                  url="https://www.youtube.com/@skagrimo"
                />
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>2026 © Copyright Skagrimo All rights Reserved.</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <motion.a
        href="https://api.whatsapp.com/send?phone=6282272222804"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg z-50 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
      >
        <MessageSquare className="w-6 h-6 text-white" />
      </motion.a>
    </div>
  );
}

interface DropdownMenuProps {
  title: string;
  items: MenuItem[];
}

function DropdownMenu({ title, items }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="flex items-center gap-1 text-gray-700 hover:text-[#0552A2] transition-colors">
        {title}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 mt-2 w-64 bg-white shadow-xl rounded-lg overflow-hidden z-50"
          >
            {items.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-[#0552A2] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface MobileDropdownProps {
  title: string;
  items: MenuItem[];
}

function MobileDropdown({ title, items }: MobileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-gray-700 hover:text-[#0552A2]"
      >
        {title}
        <ChevronDown
          size={16}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="overflow-hidden pl-4 mt-2 space-y-2"
          >
            {items.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="block text-sm text-gray-600 hover:text-[#0552A2]"
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  color: string;
}

function FeatureCard({ icon, title, description, color }: FeatureCardProps) {
  return (
    <motion.div
      variants={{
        initial: { opacity: 0, y: 60 },
        whileInView: { opacity: 1, y: 0 },
      }}
      whileHover={{ y: -10 }}
      className="text-center"
    >
      <Card className="p-8 hover:shadow-xl transition-shadow">
        <div
          className={`w-20 h-20 ${color} rounded-2xl flex items-center justify-center text-white mx-auto mb-6`}
        >
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </Card>
    </motion.div>
  );
}

interface StatCardProps {
  number: string | number;
  label: string;
  color: string;
}

function StatCard({ number, label, color }: StatCardProps) {
  return (
    <motion.div
      variants={{
        initial: { opacity: 0, scale: 0.8 },
        whileInView: { opacity: 1, scale: 1 },
      }}
      whileHover={{ scale: 1.05 }}
      className={`bg-gradient-to-br ${color} rounded-2xl p-8 text-center shadow-xl`}
    >
      <div className="text-5xl font-bold mb-2">{number}</div>
      <div className="text-lg opacity-90">{label}</div>
    </motion.div>
  );
}

interface ProgramTimelineProps {
  icon: ReactNode;
  title: string;
  color: string;
}

function ProgramTimeline({ icon, title, color }: ProgramTimelineProps) {
  return (
    <div className="flex items-start gap-4">
      <div
        className={`w-14 h-14 ${color} rounded-xl flex items-center justify-center text-white flex-shrink-0`}
      >
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
    </div>
  );
}

interface SocialIconProps {
  icon: ReactNode;
  dark?: boolean;
  url?: string;
}

function SocialIcon({ icon, dark = false, url }: SocialIconProps) {
  const href = url || "#";

  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.2, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
      className={`w-10 h-10 ${
        dark
          ? "bg-gray-800 hover:bg-[#0552A2]"
          : "bg-gray-100 hover:bg-[#0552A2]"
      } rounded-full flex items-center justify-center ${
        dark
          ? "text-gray-400 hover:text-white"
          : "text-gray-600 hover:text-white"
      } transition-colors`}
      target={url ? "_blank" : undefined}
      rel={url ? "noopener noreferrer" : undefined}
    >
      {icon}
    </motion.a>
  );
}
