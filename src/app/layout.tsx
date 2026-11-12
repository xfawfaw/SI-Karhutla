import type { Metadata } from 'next';
import 'leaflet/dist/leaflet.css';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

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
    <html lang="id" className="scroll-smooth">
      <body className="min-h-screen bg-[#f5f2eb] text-[#121212] flex flex-col antialiased selection:bg-[#dc5645] selection:text-white font-sans">
        <Header />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
