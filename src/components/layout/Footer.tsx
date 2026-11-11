import React from 'react';
import Link from 'next/link';
import { Flame, Phone, Shield, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white/80 backdrop-blur-md text-[#121212] text-xs py-12 px-4 sm:px-6 lg:px-8 mt-auto font-sans">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Brand */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#dc5645] flex items-center justify-center text-white">
              <Flame className="w-4 h-4 stroke-[2.5]" />
            </div>
            <span className="font-muse text-xl font-bold tracking-tight text-[#121212]">
              SI-KARHUTLA CLOUD
            </span>
            <span className="sticker-badge bg-[#121212] text-white text-[10px] py-0 px-2 font-mono">
              BNPB 2026
            </span>
          </div>
          <p className="text-slate-600 text-xs font-sans max-w-md">
            Sistem Geoportal Hotspot, Kualitas Udara US EPA AQI & Manajemen Posko Evakuasi Bencana. Berbasis standar BNPB 2026 & UU No. 24 Tahun 2007.
          </p>
        </div>

        {/* 3 Main Pages / Tabs */}
        <div className="flex flex-wrap items-center gap-2 font-muse text-xs font-semibold tracking-wider uppercase">
          <Link
            href="/"
            className="px-4 py-2 rounded-full bg-black/5 hover:bg-[#121212] hover:text-white transition-colors"
          >
            PETA & POSKO UTAMA
          </Link>
          <Link
            href="/lapor"
            className="px-4 py-2 rounded-full bg-black/5 hover:bg-[#dc5645] hover:text-white transition-colors"
          >
            LAPORAN HILANG
          </Link>
          <Link
            href="/petugas"
            className="px-4 py-2 rounded-full bg-black/5 hover:bg-[#121212] hover:text-white transition-colors"
          >
            PORTAL PETUGAS
          </Link>
        </div>

        {/* Emergency Hotline */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#121212] text-white font-mono text-xs font-semibold tracking-wider">
            <Phone className="w-3.5 h-3.5 text-[#dc5645]" />
            <span>HOTLINE BNPB 117</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-black/5 mt-8 pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 font-mono gap-2">
        <p>© 2026 SI-KARHUTLA Cloud • Terinspirasi dari karhutla.cloud & Standar Bencana BNPB.</p>
        <p className="font-bold text-[#121212]">Dynamic Smooth Soft Brutalism • 60 FPS GIS Engine</p>
      </div>
    </footer>
  );
}
