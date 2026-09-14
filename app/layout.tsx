import type { Metadata } from "next";
import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "RoastLink — Setiap Cangkir Punya Cerita yang Bisa Dibuktikan",
  description:
    "RoastLink melacak perjalanan kopi dari petani hingga cangkir menggunakan blockchain. Transparansi harga, jejak on-chain, dan keaslian yang terverifikasi.",
  keywords: [
    "kopi",
    "blockchain",
    "rantai pasok",
    "petani kopi",
    "traceability",
    "RoastLink",
  ],
  openGraph: {
    title: "RoastLink — Setiap Cangkir Punya Cerita yang Bisa Dibuktikan",
    description:
      "Pelacakan rantai pasok kopi berbasis blockchain dari petani hingga cangkir.",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      data-scroll-behavior="smooth"
      className={`${playfair.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
