import React from 'react';
import Link from 'next/link';
import HotspotMap from '@/components/map/HotspotMap';
import { getHotspots, getAllShelters } from '@/lib/db';
import { Shield, Search, ArrowRight, AlertCircle, BookOpen } from 'lucide-react';

export default function HomePage() {
  const hotspots = getHotspots();
  const shelters = getAllShelters();

  const totalOccupants = shelters.reduce((acc, s) => acc + s.current_occupants, 0);
  const totalCapacity = shelters.reduce((acc, s) => acc + s.capacity, 0);

  return (
    <div className="flex flex-col flex-1 bg-[#090d16]">
      {/* Hero Strip - Calm, high-signal, zero fluff */}
      <section className="border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1 text-xs font-mono text-slate-400">
              <span className="w-2 h-2 rounded-full bg-orange-500"></span>
              <span>Sistem Informasi Kebakaran Hutan & Posko Bencana</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white font-mono tracking-tight">
              Pemantauan Titik Panas & Evakuasi Posko
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              Geoportal titik api BNPB 2026 dan direktori pencarian pengungsi korban karhutla.
            </p>
          </div>

          {/* Quick Primary Actions */}
          <div className="flex items-center gap-2.5">
            <Link
              href="/posko"
              className="flex items-center gap-2 px-3.5 py-2 rounded bg-orange-600 hover:bg-orange-500 text-white font-mono text-xs font-bold transition-colors"
            >
              <Search className="w-3.5 h-3.5" />
              Cari Nama Pengungsi
            </Link>
            <Link
              href="/lapor"
              className="flex items-center gap-2 px-3.5 py-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-mono text-xs font-medium transition-colors"
            >
              <AlertCircle className="w-3.5 h-3.5 text-orange-400" />
              Lapor Kehilangan
            </Link>
          </div>
        </div>

        {/* 3 Metric Pills - Clean and comfortable */}
        <div className="max-w-7xl mx-auto grid grid-cols-3 gap-3 mt-5">
          <div className="bg-[#0f172a] border border-slate-800 rounded p-3 font-mono">
            <span className="text-[11px] text-slate-400 block">Titik Api Terdeteksi</span>
            <strong className="text-lg text-white font-bold">{hotspots.length}</strong>
            <span className="text-[10px] text-slate-500 ml-1.5">6 Provinsi</span>
          </div>

          <div className="bg-[#0f172a] border border-slate-800 rounded p-3 font-mono">
            <span className="text-[11px] text-slate-400 block">Posko Evakuasi</span>
            <strong className="text-lg text-emerald-400 font-bold">{shelters.length}</strong>
            <span className="text-[10px] text-slate-500 ml-1.5">Posko A, B, C</span>
          </div>

          <div className="bg-[#0f172a] border border-slate-800 rounded p-3 font-mono">
            <span className="text-[11px] text-slate-400 block">Penyintas Terdata</span>
            <strong className="text-lg text-white font-bold">{totalOccupants}</strong>
            <span className="text-[10px] text-slate-500 ml-1.5">/ {totalCapacity} Kapasitas</span>
          </div>
        </div>
      </section>

      {/* Main Interactive Map Section */}
      <section className="relative w-full border-b border-slate-800 bg-[#090d16]">
        <HotspotMap hotspots={hotspots} shelters={shelters} />
      </section>

      {/* Shelters Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold font-mono text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              Direktori Posko Evakuasi Resmi
            </h2>
            <p className="text-xs text-slate-400">
              Kapasitas dan kontak penanggung jawab posko lapangan.
            </p>
          </div>
          <Link
            href="/posko"
            className="text-xs font-mono text-orange-400 hover:text-orange-300 flex items-center gap-1"
          >
            Daftar Pengungsi Lengkap <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {shelters.map((s) => {
            const occRatio = Math.round((s.current_occupants / s.capacity) * 100);
            return (
              <div
                key={s.id}
                className="bg-[#0f172a] border border-slate-800 rounded-lg p-4 flex flex-col justify-between hover:border-slate-700 transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2 py-0.5 rounded">
                      {s.code}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {occRatio}% Keterisian
                    </span>
                  </div>
                  <h3 className="font-bold text-white text-sm">{s.name}</h3>
                  <p className="text-xs text-slate-400 line-clamp-2">{s.address}</p>

                  <div className="w-full bg-slate-900 rounded-full h-1.5 mt-2 overflow-hidden border border-slate-800">
                    <div
                      className={`h-full ${
                        occRatio >= 80 ? 'bg-red-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${Math.min(occRatio, 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] font-mono text-slate-400">
                    <span>Penghuni: <strong className="text-white">{s.current_occupants}</strong></span>
                    <span>Kapasitas: <strong className="text-white">{s.capacity}</strong></span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <div className="text-[11px]">
                    <span className="text-slate-500 block">PIC: {s.pic_name}</span>
                    <span className="text-slate-300 font-mono">{s.pic_phone}</span>
                  </div>
                  <Link
                    href={`/posko?shelterId=${s.id}`}
                    className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-orange-400 font-mono text-[11px] border border-slate-700 transition-colors"
                  >
                    Buka Posko →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Education Link Banner */}
        <div className="bg-[#0f172a] border border-slate-800 rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-4 h-4 text-orange-400 shrink-0" />
            <span className="text-slate-300">
              Pelajari mitigasi <em>Canal Blocking (Rewetting)</em>, embung air, dan sanksi hukum <strong>UU No. 24 Tahun 2007</strong>.
            </span>
          </div>
          <Link
            href="/mitigasi"
            className="whitespace-nowrap font-mono text-orange-400 hover:text-orange-300 font-semibold"
          >
            Buka Panduan Mitigasi →
          </Link>
        </div>
      </section>
    </div>
  );
}
