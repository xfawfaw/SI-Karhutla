import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Flame, Scale, Activity } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#070b14] border-t border-slate-800 text-slate-400 text-xs py-8 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Col 1 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-orange-600 flex items-center justify-center">
              <Flame className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-white font-mono text-sm tracking-wide">
              SI-KARHUTLA
            </span>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed">
            Platform Geoportal Pemantauan Titik Panas Karhutla, Direktori Posko Pengungsian, dan Reuni Keluarga Korban Bencana.
          </p>
          <div className="flex items-center gap-2 text-[11px] text-emerald-400">
            <Activity className="w-3.5 h-3.5" />
            <span>GIS Engine: Supercluster Canvas (60 FPS Target)</span>
          </div>
        </div>

        {/* Col 2 */}
        <div className="space-y-2">
          <h4 className="text-slate-200 font-mono font-semibold uppercase tracking-wider text-xs flex items-center gap-1.5">
            <Scale className="w-3.5 h-3.5 text-orange-400" />
            Landasan Hukum
          </h4>
          <ul className="space-y-1.5 text-slate-400 text-xs">
            <li>• UU No. 24 Tahun 2007 (Penanggulangan Bencana)</li>
            <li>• Pasal 40: Hak Pengungsi atas Pemenuhan Kebutuhan Dasar</li>
            <li>• Pasal 75–79: Pidana Kelalaian & Pembakaran Lahan Disengaja</li>
            <li>• Standar Data Geoportal BNPB 2026 Snapshot</li>
          </ul>
        </div>

        {/* Col 3 */}
        <div className="space-y-2">
          <h4 className="text-slate-200 font-mono font-semibold uppercase tracking-wider text-xs flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            Navigasi Cepat
          </h4>
          <ul className="space-y-1 text-slate-400 text-xs">
            <li>
              <Link href="/" className="hover:text-orange-400 transition-colors">
                → Peta Spasial Hotspot GIS
              </Link>
            </li>
            <li>
              <Link href="/posko" className="hover:text-orange-400 transition-colors">
                → Cari Korban & Direktori Posko
              </Link>
            </li>
            <li>
              <Link href="/lapor" className="hover:text-orange-400 transition-colors">
                → Lapor Mandiri Kerabat Hilang
              </Link>
            </li>
            <li>
              <Link href="/mitigasi" className="hover:text-orange-400 transition-colors">
                → Ensiklopedia Mitigasi Gambut
              </Link>
            </li>
            <li>
              <Link href="/petugas" className="hover:text-orange-400 transition-colors">
                → Portal Masuk Petugas Lapangan
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 4 */}
        <div className="space-y-2">
          <h4 className="text-slate-200 font-mono font-semibold uppercase tracking-wider text-xs">
            Kontak Pusdalops Terpadu
          </h4>
          <p className="text-slate-400 text-xs leading-relaxed">
            Pusat Pengendalian Operasi Badan Nasional Penanggulangan Bencana (BNPB) Republik Indonesia.
          </p>
          <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono space-y-1">
            <p className="text-orange-400 font-bold">Emergency Call Center: 117</p>
            <p className="text-slate-400">WhatsApp Lapor: 0812-1234-BNPB</p>
            <p className="text-slate-500 text-[10px]">Posko Satgas: Sumatera & Kalimantan</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-slate-800/80 mt-8 pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500">
        <p>© 2026 SI-KARHUTLA. Mengacu pada Standar Geoportal BNPB 2026 & UU RI No. 24 Tahun 2007.</p>
        <p className="font-mono text-slate-400">Tugas Kelompok SIMB - Karhutla6</p>
      </div>
    </footer>
  );
}
