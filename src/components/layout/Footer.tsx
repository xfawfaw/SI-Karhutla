import React from 'react';
import Link from 'next/link';
import { Flame, Shield, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t-3 border-black text-black text-xs py-8 px-4 sm:px-6 lg:px-8 mt-auto font-mono">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Brand */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#ff5722] border-2 border-black flex items-center justify-center text-white">
              <Flame className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
            <span className="font-display text-lg font-black tracking-wider text-black">
              SI-KARHUTLA CLOUD
            </span>
            <span className="bg-[#ffde59] text-black text-[10px] font-black px-1.5 py-0.2 border border-black">
              BNPB 2026
            </span>
          </div>
          <p className="text-slate-700 text-xs font-mono max-w-md">
            Sistem Geoportal Hotspot, Kualitas Udara US EPA AQI & Manajemen Posko Evakuasi Bencana. Berbasis standar BNPB 2026 & UU No. 24 Tahun 2007.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-bold">
          <Link
            href="/"
            className="px-2.5 py-1 bg-[#f4f0e8] hover:bg-[#ffde59] border-2 border-black transition-colors"
          >
            Peta GIS
          </Link>
          <Link
            href="/posko"
            className="px-2.5 py-1 bg-[#f4f0e8] hover:bg-[#ffde59] border-2 border-black transition-colors"
          >
            Direktori Posko
          </Link>
          <Link
            href="/lapor"
            className="px-2.5 py-1 bg-[#f4f0e8] hover:bg-[#ffde59] border-2 border-black transition-colors"
          >
            Lapor Hilang
          </Link>
          <Link
            href="/mitigasi"
            className="px-2.5 py-1 bg-[#f4f0e8] hover:bg-[#ffde59] border-2 border-black transition-colors"
          >
            Mitigasi Gambut
          </Link>
          <Link
            href="/petugas"
            className="px-2.5 py-1 bg-[#f4f0e8] hover:bg-[#ffde59] border-2 border-black transition-colors"
          >
            Portal Petugas
          </Link>
        </div>

        {/* Hotline */}
        <div className="bg-[#ff5722] text-white px-3 py-1.5 border-2 border-black shadow-brutal-sm font-black text-xs">
          CALL CENTER BNPB: 117
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t-2 border-black mt-6 pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-700">
        <p>© 2026 SI-KARHUTLA Cloud • Terinspirasi dari karhutla.cloud & Standar Bencana BNPB.</p>
        <p className="font-bold">Desain Neobrutalisme & GIS Canvas 60 FPS</p>
      </div>
    </footer>
  );
}
