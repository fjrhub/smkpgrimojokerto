import { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SMK PGRI Mojokerto",
  description:
    "SMK Telkom Malang adalah pelopor Sekolah menengah kejuruan pertama di Indonesia di bidang Teknologi dan Informatika. Berpengalaman dari tahun 1992 yang telah terakreditasi A dan mempunyai standart mutu ISO 9001:2015.",
  keywords:
    "moklet, smk telkom malang, sekolah it, teknik komputer dan jaringan, tkj, rekayasa perangkat lunak, rpl, pengembangan gim, coding, smk coding, programmer",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
