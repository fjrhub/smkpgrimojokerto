"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Facebook, Instagram, Youtube, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import TikTokIcon from "@/public/tiktok";

interface MenuItem {
  label: string;
  href: string;
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

interface SocialIconProps {
  icon: React.ReactNode; // Gunakan ReactNode untuk tipis yang benar
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

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-lg" : "bg-white/95 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* LOGO */}
          <div className="flex items-center gap-3">
            <img
              src="logo-smk.png"
              alt="Logo SMK PGRI KOTA MOJOKERTO"
              className="w-11 h-11 md:w-10 md:h-10 object-contain"
            />
            <span className="text-base md:text-xl font-bold text-[#0552A2]">
              SMK PGRI KOTA MOJOKERTO
            </span>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center space-x-5">
            <DropdownMenu
              title="Beranda"
              items={[
                { label: "Sambutan Kepala Sekolah", href: "/#sambutan" },
                { label: "Video Profil Sekolah", href: "/#video" },
                { label: "Berita Terbaru", href: "/#berita" },
                { label: "Agenda Sekolah", href: "/#agenda" },
                { label: "Galeri Sekolah", href: "/#galeri" },
              ]}
            />
            <DropdownMenu
              title="Tentang Kami"
              items={[
                { label: "Profil Sekolah", href: "/#about" },
                { label: "Visi & Misi", href: "/#visimisi" },
                { label: "Fasilitas", href: "/#" },
                { label: "Prestasi", href: "/#" },
              ]}
            />
            <DropdownMenu
              title="Program"
              items={[
                { label: "Profil Jurusan", href: "/#program" },
                { label: "Ekstrakurikuler", href: "/#" },
              ]}
            />
            <DropdownMenu
              title="Alumni"
              items={[
                { label: "Testimoni Alumni", href: "/#testmonials" },
                { label: "Profil Alumni", href: "/#" },
              ]}
            />
            <a
              href="/#contact"
              className="text-gray-700 hover:text-[#0552A2] transition-colors"
            >
              Hubungi Kami
            </a>
            <Button className="bg-[#0552A2] hover:bg-[#003164]">PPDB</Button>
            <div className="flex items-center space-x-3">
              <SocialIcon
                icon={<Facebook size={18} />}
                url="https://facebook.com/skagrimo"
              />
              <SocialIcon
                icon={<Instagram size={18} />}
                url="https://www.instagram.com/skagrimo"
              />
              <SocialIcon
                icon={<TikTokIcon className="w-5 h-5" />}
                url="https://tiktok.com/@skagrimo"
              />
              <SocialIcon
                icon={<Youtube size={18} />}
                url="https://www.youtube.com/@skagrimo"
              />
            </div>
          </div>

          {/* MOBILE BUTTON */}
          <button
            className="lg:hidden text-gray-700 hover:text-[#0552A2]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden"
          >
            <div className="bg-white border-t pt-4">
              <div className="container mx-auto px-4 py-4 space-y-4">
                <MobileDropdown
                  title="Beranda"
                  items={[
                    { label: "Sambutan Kepala Sekolah", href: "/#sambutan" },
                    { label: "Video Profil Sekolah", href: "/#video" },
                    { label: "Berita Terbaru", href: "/#berita" },
                  ]}
                />
                <MobileDropdown
                  title="Tentang Kami"
                  items={[
                    { label: "Profil Sekolah", href: "/#about" },
                    { label: "Visi & Misi", href: "/#" },
                  ]}
                />
                <a
                  href="/#program"
                  className="block text-gray-700 hover:text-[#0552A2]"
                >
                  Program
                </a>
                <a
                  href="/#testmonials"
                  className="block text-gray-700 hover:text-[#0552A2]"
                >
                  Alumni
                </a>
                <a
                  href="/#contact"
                  className="block text-gray-700 hover:text-[#0552A2]"
                >
                  Hubungi Kami
                </a>
                <Button className="w-full mb-3 bg-[#0552A2] hover:bg-[#003164]">
                  PPDB
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}