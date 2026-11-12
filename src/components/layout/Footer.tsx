'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Flame, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white/80 backdrop-blur-md text-[#121212] text-xs py-14 px-4 sm:px-6 lg:px-8 mt-auto font-sans border-t border-black/[0.08]"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Brand */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#dc5645] flex items-center justify-center text-white">
              <Flame className="w-4 h-4 stroke-[2.5]" />
            </div>
            <span className="font-display font-black text-xl tracking-tight text-[#121212]">
              SI-KARHUTLA CLOUD
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#121212] text-white text-[10px] font-mono font-bold">
              BNPB 2026
            </span>
          </div>
          <p className="text-slate-600 text-xs font-sans max-w-md leading-relaxed">
            Sistem Geoportal Hotspot, Kualitas Udara US EPA AQI & Manajemen Posko Evakuasi Bencana. Berbasis standar BNPB 2026 & UU No. 24 Tahun 2007.
          </p>
        </div>

        {/* 3 Main Pages / Tabs */}
        <div className="flex flex-wrap items-center gap-2 font-display text-xs font-bold tracking-wider uppercase">
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
          <a
            href="tel:117"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#121212] hover:bg-[#dc5645] text-white font-mono text-xs font-semibold tracking-wider transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#e6a73c]" />
            <span>HOTLINE BNPB 117</span>
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-black/5 mt-8 pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 font-mono gap-2">
        <p>© 2026 SI-KARHUTLA Cloud • Terinspirasi dari karhutla.cloud & Standar Bencana BNPB.</p>
        <p className="font-bold text-[#121212]">Project Based Build By Kelompok 6 SIMB UPN &ldquo;Veteran&rdquo; Yogyakarta</p>
      </div>
    </motion.footer>
  );
}
