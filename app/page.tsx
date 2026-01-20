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

import { ReactNode } from "react";

interface MenuItem {
  label: string;
  href: string;
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [studentData, setStudentData] = useState({
    tkj: 1060,
    tei: 334,
    male: 1029,
    female: 435,
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

  const galleryImages = [
    {
      url: "https://images.pexels.com/photos/8363017/pexels-photo-8363017.jpeg",
      title: "Upacara Kemerdekaan",
      link: "#",
    },
    {
      url: "https://images.pexels.com/photos/5428003/pexels-photo-5428003.jpeg",
      title: "Go international in Thailand",
      link: "#",
    },
    {
      url: "https://images.unsplash.com/photo-1581155250362-73d66954fc01",
      title: "Temu Alumni di Jakarta",
      link: "#",
    },
    {
      url: "https://images.pexels.com/photos/7868892/pexels-photo-7868892.jpeg",
      title: "Robotic",
      link: "#",
    },
    {
      url: "https://images.pexels.com/photos/35545651/pexels-photo-35545651.jpeg",
      title: "MPLS 2025",
      link: "#",
    },
    {
      url: "https://images.pexels.com/photos/35545648/pexels-photo-35545648.jpeg",
      title: "Moklet Youth Digitallent",
      link: "#",
    },
  ];

  const newsItems = [
    {
      image: "IMG-20260119-WA0049.jpg",
      title: "Pelaksanaan Isra mi'raj bersama sama",
      date: "18 December 2025",
    },
    {
      image:
        "https://images.pexels.com/photos/10638070/pexels-photo-10638070.jpeg",
      title: "Class Meet dan Tantangan Membentuk Generasi Pemikir",
      date: "12 December 2025",
    },
    {
      image:
        "https://images.pexels.com/photos/8363017/pexels-photo-8363017.jpeg",
      title: "Rombongan Disdikbud Kabupaten Madiun Kunjungi SMK Telkom Malang",
      date: "05 December 2025",
    },
  ];

  const testimonials = [
    {
      image:
        "https://images.pexels.com/photos/35439332/pexels-photo-35439332.jpeg",
      quote:
        "Kurikulum yang selalu up-to-date dan menyesuaikan kebutuhan pasar industri membuat lulusan SMK Telkom dapat bersaing dan diandalkan oleh perusahaan.",
      name: "Iqbal Wahyu Septian",
      position: "Telkom Akses Malang",
    },
    {
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
      quote:
        "Saya bangga menjadi bagian dari SMK Telkom Malang. Karena selalu mendukung dalam memberikan fasilitas dan kemudahan dalam menunjang pembelajaran serta menerapkan pendidikan attitude yang baik.",
      name: "Dandy Purba Cantaka",
      position: "SIP Jakarta",
    },
  ];

  const partners = [
    "image.png",
    "image.png",
    "image.png",
    "image.png",
    "image.png",
    "image.png",
    "image.png",
    "image.png",
    "image.png",
    "image.png",
    "image.png",
    "image.png",
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
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-lg" : "bg-white/95 backdrop-blur-sm"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="text-2xl font-bold text-orange-600">
              SMK PGRI MOJOKERTO
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              <DropdownMenu
                title="Beranda"
                items={[
                  { label: "Sambutan Kepala Sekolah", href: "#sambutan" },
                  { label: "Video Profil Sekolah", href: "#video" },
                  { label: "Berita Terbaru", href: "#berita" },
                  { label: "Agenda Sekolah", href: "#agenda" },
                  { label: "Galeri Sekolah", href: "#galeri" },
                ]}
              />
              <DropdownMenu
                title="Tentang Kami"
                items={[
                  { label: "Profil Sekolah", href: "#about" },
                  { label: "Visi & Misi", href: "#" },
                  { label: "Fasilitas", href: "#" },
                  { label: "Prestasi", href: "#" },
                ]}
              />
              <DropdownMenu
                title="Program"
                items={[
                  { label: "Profil Jurusan", href: "#program" },
                  { label: "Ekstrakurikuler", href: "#" },
                ]}
              />
              <DropdownMenu
                title="Alumni"
                items={[
                  { label: "Testimoni Alumni", href: "#testmonials" },
                  { label: "Profil Alumni", href: "#" },
                ]}
              />
              <a
                href="#contact"
                className="text-gray-700 hover:text-orange-600 transition-colors"
              >
                Hubungi Kami
              </a>
              <Button className="bg-orange-600 hover:bg-orange-700">
                PPDB
              </Button>
              <div className="flex items-center space-x-3">
                {" "}
                <SocialIcon icon={<Facebook size={18} />} />{" "}
                <SocialIcon icon={<Instagram size={18} />} />{" "}
                <SocialIcon icon={<Twitter size={18} />} />{" "}
                <SocialIcon icon={<Youtube size={18} />} />{" "}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-gray-700 hover:text-orange-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t"
            >
              <div className="container mx-auto px-4 py-4 space-y-4">
                <MobileDropdown
                  title="Beranda"
                  items={[
                    { label: "Sambutan Kepala Sekolah", href: "#sambutan" },
                    { label: "Video Profil Sekolah", href: "#video" },
                    { label: "Berita Terbaru", href: "#berita" },
                  ]}
                />
                <MobileDropdown
                  title="Tentang Kami"
                  items={[
                    { label: "Profil Sekolah", href: "#about" },
                    { label: "Visi & Misi", href: "#" },
                  ]}
                />
                <a
                  href="#program"
                  className="block text-gray-700 hover:text-orange-600"
                >
                  Program
                </a>
                <a
                  href="#testmonials"
                  className="block text-gray-700 hover:text-orange-600"
                >
                  Alumni
                </a>
                <a
                  href="#contact"
                  className="block text-gray-700 hover:text-orange-600"
                >
                  Hubungi Kami
                </a>
                <Button className="w-full bg-orange-600 hover:bg-orange-700">
                  PPDB
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center overflow-hidden pt-20"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-blue-50 -z-10" />
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                The Real
                <br />
                <span className="text-orange-600">Informatics School.</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Pelopor SMK bidang Teknologi dan
                <br />
                Informatika di Indonesia
              </p>
              <Button
                size="lg"
                className="bg-orange-600 hover:bg-orange-700 text-lg px-8"
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
              <img
                src="image_depan_new.png"
                alt="Students"
                className="rounded-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Moklet Section */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            {...fadeInUp}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Kenapa harus moklet?
            </h2>
            <p className="text-gray-600 text-lg">
              Alasan kenapa kalian semua harus bergabung dengan SMK Telkom
              Malang.
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
              description="Penunjang belajar dengan kualitas premium."
              color="bg-blue-500"
            />
            <FeatureCard
              icon={<School className="w-12 h-12" />}
              title="Lingkungan Nyaman"
              description="Berada di lingkungan yang asri, aman, dan kondusif."
              color="bg-yellow-500"
            />
            <FeatureCard
              icon={<Users className="w-12 h-12" />}
              title="Pengajar Kompeten"
              description="Guru yang up-to-date dengan perkembangan industri."
              color="bg-red-500"
            />
            <FeatureCard
              icon={<Building className="w-12 h-12" />}
              title="Kerjasama Luas"
              description="Memperbesar kesempatan bekerja sebelum lulus."
              color="bg-gray-700"
            />
          </motion.div>
        </div>
      </section>

      {/* Headmaster Welcome */}
      <section
        id="sambutan"
        className="py-20 bg-gradient-to-br from-orange-50 to-white"
      >
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeInUp}>
              <span className="text-orange-600 font-semibold text-sm uppercase tracking-wide">
                Sambutan
              </span>
              <h2 className="text-4xl font-bold mt-2 mb-6">Kepala Sekolah</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Selamat datang di website SMK Telkom Malang yang saya tujukan
                  untuk seluruh unsur pimpinan, guru, karyawan dan siswa serta
                  khalayak umum guna dapat mengakses seluruh informasi tentang
                  sekolah kami.
                </p>
                <p>
                  Saya berharap Website ini dapat dijadikan wahana interaksi
                  yang positif baik antar civitas akademika maupun masyarakat
                  pada umumnya, sehingga dapat menjalin silaturahmi yang erat
                  disegala unsur.
                </p>
                <p className="font-semibold text-gray-900">
                  - Rahmat Dwi Djatmiko, S.Kom.
                </p>
              </div>
            </motion.div>
            <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
              <img
                src="image1001.png"
                alt="Headmaster"
                className="rounded-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video Profile */}
      <section
        id="video"
        className="py-20 bg-gradient-to-br from-blue-50 to-white"
      >
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeInUp} className="relative group cursor-pointer">
              <img
                src="https://images.pexels.com/photos/7868892/pexels-photo-7868892.jpeg"
                alt="Video"
                className="rounded-2xl shadow-xl"
              />
              <div className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center group-hover:bg-black/50 transition-colors">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-20 h-20 bg-orange-600 rounded-full flex items-center justify-center"
                >
                  <Play className="w-8 h-8 text-white ml-1" fill="white" />
                </motion.div>
              </div>
            </motion.div>
            <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
              <span className="text-orange-600 font-semibold text-sm uppercase tracking-wide">
                Kuy, nonton!
              </span>
              <h2 className="text-4xl font-bold mt-2 mb-6">
                Video Profil Moklet
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Video profil sekolah memperkenalkan kepada kalian hal-hal
                berkaitan dengan lingkungan sekolah, fasilitas umum sekolah,
                fasilitas pembelajaran, ruang belajar, kegiatan siswa dan masih
                banyak lagi.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Biar kalian tidak penasaran apa saja yang ada di dalam SMK
                Telkom Malang, segera tonton video profilnya.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Student Statistics */}
      <section
        id="numbers"
        className="py-20 bg-gradient-to-br from-orange-600 to-orange-700 text-white"
      >
        <div className="container mx-auto px-4">
          <motion.div
            {...fadeInUp}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Siswa Kami Lebih dari 1000+
            </h2>
            <p className="text-orange-100 text-lg">
              Mayoritas siswa kami tidak hanya dari Malang, namun juga dari
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
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            <StatCard
              number={studentData.tkj}
              label="TKJ"
              color="from-blue-400 to-blue-600"
            />
            <StatCard
              number={studentData.tei}
              label="TEI"
              color="from-yellow-400 to-yellow-600"
            />
            <StatCard
              number={studentData.male}
              label="Laki-Laki"
              color="from-red-400 to-red-600"
            />
            <StatCard
              number={studentData.female}
              label="Perempuan"
              color="from-purple-400 to-purple-600"
            />
          </motion.div>
        </div>
      </section>

      {/* Program Keahlian */}
      <section id="program" className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div {...fadeInUp}>
              <h2 className="text-4xl font-bold mb-6">Program Keahlian</h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                SMK Telkom Malang memiliki dua program keahlian yang bisa kalian
                pilih. Kedua program keahlian ini saling berkaitan satu sama
                lain. Sehingga dengan dukungan guru-guru kami yang keren
                nantinya kalian bisa mempelajari keduanya.
              </p>
              <Button
                variant="outline"
                className="border-orange-600 text-orange-600 hover:bg-orange-50"
              >
                Detail
              </Button>
            </motion.div>
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <ProgramTimeline
                icon={<Code />}
                title="Rekayasa Perangkat Lunak (RPL)"
                color="bg-yellow-500"
              />
              <ProgramTimeline
                icon={<Network />}
                title="Teknik Komputer dan Jaringan (TKJ)"
                color="bg-red-500"
              />
              <ProgramTimeline
                icon={<Gamepad2 />}
                title="Pengembangan Gim"
                color="bg-blue-500"
              />
            </motion.div>
          </div>

          {/* RPL Details */}
          <motion.div {...fadeInUp} className="mb-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6">
                  Rekayasa Perangkat Lunak
                </h2>
                <p className="text-gray-600 mb-8">
                  Mempelajari seluruh aspek produksi software
                  <br />
                  seperti aplikasi web dan aplikasi mobile.
                </p>

                {/* Tambahkan defaultValue="web" di sini */}
                <Accordion
                  type="single"
                  collapsible
                  defaultValue="web"
                  className="space-y-4"
                >
                  <AccordionItem value="web" className="border rounded-lg px-4">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Code className="w-5 h-5 text-blue-600" />
                        </div>
                        <span className="font-semibold">Web Dev.</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 pt-4">
                      Siswa nantinya akan belajar dan dituntut untuk bisa
                      membuat aplikasi berbasis web dengan teknologi pemrograman
                      sesuai standar industri. Back-end menggunakan Node
                      JS/Laravel, dan Front-end menggunakan React JS/Vue JS.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem
                    value="mobile"
                    className="border rounded-lg px-4"
                  >
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                          <Laptop className="w-5 h-5 text-yellow-600" />
                        </div>
                        <span className="font-semibold">Mobile Dev.</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 pt-4">
                      Siswa nantinya akan belajar dan dituntut untuk bisa
                      membuat aplikasi berbasis mobile dengan teknologi
                      pemrograman sesuai standar industri. Bahasa pemrograman
                      yang dipelajari meliputi Java, Kotlin, Swift (iOS), React
                      Native, dan Flutter.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem
                    value="career"
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
                      Lulusan RPL banyak bekerja pada posisi mobile developer,
                      web developer, database engineer, system analyst, UI/UX
                      designer, freelancer/kerja remote, dan berwirausaha
                      dibidang IT.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              <div>
                <img
                  src="https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg"
                  alt="RPL"
                  className="rounded-2xl shadow-xl"
                />
              </div>
            </div>
          </motion.div>

          {/* TKJ Details */}
          <motion.div {...fadeInUp} className="mb-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <img
                  src="https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg"
                  alt="TKJ"
                  className="rounded-2xl shadow-xl"
                />
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-4xl font-bold mb-6">
                  Teknik Komputer dan Jaringan
                </h2>
                <p className="text-gray-600 mb-8">
                  Mempelajari cara merakit, instalasi, dan perbaikan komputer,
                  <br />
                  instalasi jaringan Local Area Network (LAN) dan Wide Area
                  Network (WAN), serta internet of things (IoT).
                </p>
                <Accordion type="single" collapsible className="space-y-4">
                  <AccordionItem
                    value="cloud"
                    className="border rounded-lg px-4"
                  >
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Network className="w-5 h-5 text-blue-600" />
                        </div>
                        <span className="font-semibold">Cloud Computing</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 pt-4">
                      Siswa nantinya akan belajar dan dituntut untuk bisa
                      menggunakan teknologi komputer atau komputasi yang
                      dimanfaatkan bersama dengan pengembangan berbasis
                      Internet.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem
                    value="security"
                    className="border rounded-lg px-4"
                  >
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                          <Building className="w-5 h-5 text-yellow-600" />
                        </div>
                        <span className="font-semibold">Cyber Security</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 pt-4">
                      Aktivitas yang dilakukan sistem atau seseorang dalam
                      rangka melindungi sistem komputer dari serangan. Biasanya
                      serangan tersebut bersifat ilegal.
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
            </div>
          </motion.div>

          {/* Game Dev Details */}
          <motion.div {...fadeInUp}>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6">Pengembangan Gim</h2>
                <p className="text-gray-600 mb-8">
                  Mempelajari seluruh aspek pengembangan gim
                  <br />
                  seperti desain, pengembangan, dan perilisan game.
                </p>
                <Accordion type="single" collapsible className="space-y-4">
                  <AccordionItem
                    value="career-game"
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
                      Lulusan Pengembangan Gim banyak bekerja pada posisi game
                      developer, game designer, game artist, game audio
                      engineer, game producer, quality assurance tester,
                      freelancer/kerja remote, dan berwirausaha dibidang IT.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              <div>
                <img
                  src="https://images.pexels.com/photos/682933/pexels-photo-682933.jpeg"
                  alt="Game Dev"
                  className="rounded-2xl shadow-xl"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Gallery (Minimalist) */}
      <section className="py-12 bg-orange-600 text-white text-center">
        <h2 className="text-3xl font-bold">Galeri Mokleter</h2>
      </section>

      {/* Gallery (Minimalist) */}
      <section id="galeri" className="py-0 bg-gray-900">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
          {galleryImages.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={image.url}
                alt={image.title}
                loading="lazy"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <h3 className="text-white text-lg font-medium">
                  {image.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Latest News */}
      <section id="berita" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            {...fadeInUp}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Berita Terbaru
            </h2>
            <p className="text-gray-600 text-lg">
              Ikuti terus informasi dan berita-berita terbaru tentang SMK Telkom
              Malang.
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
                    <h3 className="font-semibold text-lg mb-3 line-clamp-3 group-hover:text-orange-600 transition-colors">
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
      <section
        id="agenda"
        className="py-20 bg-gradient-to-br from-blue-50 to-white"
      >
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeInUp}>
              <h2 className="text-4xl font-bold mb-6">Agenda Sekolah</h2>
              <p className="text-gray-600 mb-8">
                Kegiatan SMK Telkom Malang selama beberapa hari kedepan.
              </p>
              <div className="bg-blue-100 border-l-4 border-blue-500 p-4 rounded">
                <p className="text-blue-800 text-center">
                  Tidak ada agenda mendatang!
                </p>
              </div>
              <div className="mt-8 flex items-start gap-4 p-6 border rounded-lg hover:border-orange-600 transition-colors cursor-pointer">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Semua Agenda</h3>
                  <p className="text-gray-600 text-sm">
                    Tampilkan semua agenda
                  </p>
                </div>
              </div>
            </motion.div>
            <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
              <img
                src="IMG-20260119-WA0034.jpg"
                alt="Agenda"
                className="rounded-2xl shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testmonials" className="py-20">
        <div className="container mx-auto px-4">
          <div className="overflow-hidden" ref={emblaRefTestimonials}>
            <div className="flex">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="flex-[0_0_100%] min-w-0 px-4">
                  <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div {...fadeInUp} className="order-2 lg:order-1">
                      <div className="relative">
                        <svg
                          className="w-16 h-16 text-orange-200 mb-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                        <p className="text-xl text-gray-600 leading-relaxed mb-6">
                          {testimonial.quote}
                        </p>
                        <p className="font-semibold text-gray-900">
                          - {testimonial.name}
                        </p>
                        <p className="text-gray-500 text-sm">
                          ({testimonial.position})
                        </p>
                      </div>
                    </motion.div>
                    <motion.div
                      {...fadeInUp}
                      transition={{ delay: 0.2 }}
                      className="order-1 lg:order-2"
                    >
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="rounded-2xl shadow-xl"
                      />
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

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
                SMK Telkom Malang
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Pelopor SMK bidang Teknologi dan Informatika di Indonesia sejak
                tahun 1992.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Menu Utama</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-500 transition-colors"
                  >
                    Beranda
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="hover:text-orange-500 transition-colors"
                  >
                    Tentang Kami
                  </a>
                </li>
                <li>
                  <a
                    href="#program"
                    className="hover:text-orange-500 transition-colors"
                  >
                    Profil Jurusan
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-500 transition-colors"
                  >
                    PPDB
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Hubungi Kami</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-500 transition-colors"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-500 transition-colors"
                  >
                    Layanan Orang Tua
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-500 transition-colors"
                  >
                    Kotak Pertanyaan
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-500 transition-colors"
                  >
                    Pusat Bantuan
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Alamat</h4>
              <p className="text-gray-400 leading-relaxed mb-4">
                Jl. Danau Ranau, Sawojajar, Kec. Kedungkandang, Kota Malang,
                Jawa Timur 65139
              </p>
              <div className="flex gap-3">
                <SocialIcon icon={<Facebook size={20} />} dark />
                <SocialIcon icon={<Instagram size={20} />} dark />
                <SocialIcon icon={<Twitter size={20} />} dark />
                <SocialIcon icon={<Youtube size={20} />} dark />
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>2026 © Copyright Moklet All rights Reserved.</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <motion.a
        href="https://api.whatsapp.com/send?phone=6281223488999"
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
      <button className="flex items-center gap-1 text-gray-700 hover:text-orange-600 transition-colors">
        {title}
        <ChevronDown
          size={16}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
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
                className="block px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
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
        className="flex items-center justify-between w-full text-gray-700 hover:text-orange-600"
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
                className="block text-sm text-gray-600 hover:text-orange-600"
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
}

function SocialIcon({ icon, dark = false }: SocialIconProps) {
  return (
    <motion.a
      href="#"
      whileHover={{ scale: 1.2, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
      className={`w-10 h-10 ${
        dark
          ? "bg-gray-800 hover:bg-orange-600"
          : "bg-gray-100 hover:bg-orange-600"
      } rounded-full flex items-center justify-center ${
        dark
          ? "text-gray-400 hover:text-white"
          : "text-gray-600 hover:text-white"
      } transition-colors`}
    >
      {icon}
    </motion.a>
  );
}
