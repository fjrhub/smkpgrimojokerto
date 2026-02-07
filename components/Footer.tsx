import { Facebook, Instagram, Youtube, MessageSquare, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import TikTokIcon from "@/public/tiktok";

export default function Footer() {
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

  // Carousel untuk Partners
  const [emblaRefPartners] = useEmblaCarousel({ loop: true, align: "start" }, [
    Autoplay({ delay: 2000 }),
  ]);

  interface SocialIconProps {
    icon: React.ReactNode; // Gunakan ReactNode untuk tipis yang benar
    dark?: boolean;
    url?: string;
  }

  function SocialIcon({ icon, dark = false, url }: SocialIconProps) {
    const href = url || "#";

    return (
      <a
        href={href}
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
      </a>
    );
  }

  return (
    <>
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
      <a
        href="https://api.whatsapp.com/send?phone=6282272222804"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg z-50 transition-colors"
      >
        <MessageSquare className="w-6 h-6 text-white" />
      </a>
    </>
  );
}