import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Bebas_Neue } from 'next/font/google';
import 'leaflet/dist/leaflet.css';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SI-KARHUTLA | Geoportal Spasial, Indeks AQI & Posko Bencana 2026',
  description:
    'Platform terpadu pemantauan titik panas karhutla BNPB 2026, indeks kualitas udara AQI, dan direktori posko evakuasi pengungsi.',
  keywords: ['karhutla', 'hotspot bnpb', 'posko evakuasi', 'indeks aqi', 'sipongi', 'uu 24 2007', 'reuni keluarga'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${bebasNeue.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[#f5f2eb] text-[#121212] flex flex-col antialiased selection:bg-[#dc5645] selection:text-white">
        <Header />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
