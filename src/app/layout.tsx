import type { Metadata } from 'next';
import { JetBrains_Mono, Geist_Mono } from 'next/font/google';
import 'leaflet/dist/leaflet.css';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

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
  title: 'SI-KARHUTLA | Sistem Informasi Karhutla & Manajemen Posko Evakuasi BNPB 2026',
  description:
    'Platform Geoportal Pemantauan Titik Panas Karhutla, Direktori Posko Pengungsian, dan Reuni Keluarga Korban Bencana Binaan BNPB 2026 & UU No. 24 Tahun 2007.',
  keywords: ['karhutla', 'hotspot bnpb', 'posko evakuasi', 'mitigasi karhutla', 'uu 24 2007', 'reuni keluarga bencana'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${geistMono.variable} ${jetbrainsMono.variable} dark`}>
      <body className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col antialiased selection:bg-orange-600 selection:text-white">
        <Header />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
