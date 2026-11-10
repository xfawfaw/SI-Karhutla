import React from 'react';
import Link from 'next/link';
import { Flame } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#090d16] border-t border-slate-800/80 text-slate-500 text-xs py-6 px-4 sm:px-6 lg:px-8 mt-auto font-mono">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left */}
        <div className="flex items-center gap-2 text-slate-400">
          <div className="w-5 h-5 rounded bg-orange-600 flex items-center justify-center text-white">
            <Flame className="w-3 h-3" />
          </div>
          <span className="font-bold text-slate-200">SI-KARHUTLA</span>
          <span>•</span>
          <span>Standar Data BNPB 2026 & UU No. 24/2007</span>
        </div>

        {/* Center / Nav */}
        <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400">
          <Link href="/" className="hover:text-white transition-colors">Peta GIS</Link>
          <Link href="/posko" className="hover:text-white transition-colors">Direktori Posko</Link>
          <Link href="/lapor" className="hover:text-white transition-colors">Lapor Hilang</Link>
          <Link href="/mitigasi" className="hover:text-white transition-colors">Mitigasi</Link>
          <Link href="/petugas" className="hover:text-white transition-colors">Portal Petugas</Link>
        </div>

        {/* Right */}
        <div className="text-[11px] text-slate-500">
          Pusdalops BNPB: <strong className="text-orange-400">117</strong>
        </div>
      </div>
    </footer>
  );
}
