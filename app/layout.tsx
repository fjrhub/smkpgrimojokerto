import { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SMK PGRI Kota Mojokerto",
  description:
    "SMK PGRI Kota Mojokerto merupakan sekolah menengah kejuruan yang menyediakan berbagai program keahlian seperti Teknik Pemesinan, Teknik dan Bisnis Sepeda Motor, Teknik Elektronika Industri, Teknik Komputer dan Jaringan, serta Teknik Kendaraan Ringan untuk menyiapkan lulusan siap kerja dan berkompetensi.",
  keywords:
    "smk pgri kota mojokerto, smk pgri mojokerto, sekolah kejuruan mojokerto, teknik pemesinan, tp, teknik dan bisnis sepeda motor, tbsm, teknik elektronika industri, tei, teknik komputer dan jaringan, tkj, teknik kendaraan ringan, tkr, smk teknik mojokerto",
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