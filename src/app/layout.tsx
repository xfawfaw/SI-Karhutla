import type { Metadata } from 'next';
import { JetBrains_Mono, Geist_Mono, Bebas_Neue, Space_Grotesk } from 'next/font/google';
import 'leaflet/dist/leaflet.css';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SI-KARHUTLA Cloud | Peta Spasial, Indeks Udara AQI & Posko Evakuasi',
  description:
    'Platform Neobrutalisme Pemantauan Titik Panas Karhutla, Indeks Kualitas Udara AQI, Rekam Jejak Korporasi & Reuni Posko Pengungsian BNPB 2026.',
  keywords: ['karhutla cloud', 'neobrutalism', 'hotspot bnpb', 'posko evakuasi', 'indeks aqi', 'sipongi', 'uu 24 2007'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${bebasNeue.variable} ${spaceGrotesk.variable} ${geistMono.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-[#f4f0e8] text-[#0a0a0a] flex flex-col antialiased selection:bg-[#ff4d29] selection:text-white">
        <Header />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
