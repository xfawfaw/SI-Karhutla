import React from 'react';
import Link from 'next/link';
import HotspotMap from '@/components/map/HotspotMap';
import { getHotspots, getAllShelters, getAllEvacuees } from '@/lib/db';
import { Flame, Shield, Search, ArrowRight, Activity, BookOpen, AlertCircle, HeartHandshake } from 'lucide-react';

export default function HomePage() {
  const hotspots = getHotspots();
  const shelters = getAllShelters();
  const evacuees = getAllEvacuees();

  const totalOccupants = shelters.reduce((acc, s) => acc + s.current_occupants, 0);
  const totalCapacity = shelters.reduce((acc, s) => acc + s.capacity, 0);

  return (
    <div className="flex flex-col flex-1">
      {/* Hero Header & Quick Metric Strip */}
      <section className="bg-gradient-to-b from-[#0b1220] to-[#090d16] border-b border-slate-800 px-4 sm:px-6 lg:px-8 py-5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-orange-600/20 text-orange-400 border border-orange-500/30 uppercase tracking-wider">
                GEOPORTAL BNPB 2026 STANDAR
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Pusat Tanggap Darurat Bencana Karhutla
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
              Pemantauan Titik Panas & Evakuasi Posko
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl">
              Visualisasi spasial 60 FPS titik kebakaran hutan di 6 provinsi prioritas serta pelacakan pengungsi terpadu berbasis UU No. 24 Tahun 2007.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/posko"
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-mono text-xs font-bold shadow-lg shadow-orange-600/20 transition-all hover:translate-y-[-1px]"
            >
              <Search className="w-4 h-4" />
              Cari Nama Kerabat di Posko
            </Link>
            <Link
              href="/lapor"
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-mono text-xs font-bold transition-all hover:translate-y-[-1px]"
            >
              <AlertCircle className="w-4 h-4 text-red-400" />
              Lapor Kerabat Hilang
            </Link>
          </div>
        </div>

        {/* BNPB-Style Emergency Stat Cards */}
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
          <div className="bg-[#121c2e] border border-slate-800 rounded-lg p-3 flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-red-600/20 border border-red-500/30 text-red-400">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono text-slate-400 block">Total Hotspot Terdeteksi</span>
              <strong className="text-xl font-mono text-white font-bold">{hotspots.length}</strong>
              <span className="text-[10px] text-red-400 ml-1.5 font-mono">6 Provinsi</span>
            </div>
          </div>

          <div className="bg-[#121c2e] border border-slate-800 rounded-lg p-3 flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-emerald-600/20 border border-emerald-500/30 text-emerald-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono text-slate-400 block">Posko Evakuasi Aktif</span>
              <strong className="text-xl font-mono text-white font-bold">{shelters.length}</strong>
              <span className="text-[10px] text-emerald-400 ml-1.5 font-mono">Posko A, B, C</span>
            </div>
          </div>

          <div className="bg-[#121c2e] border border-slate-800 rounded-lg p-3 flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-blue-600/20 border border-blue-500/30 text-blue-400">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono text-slate-400 block">Penyintas Terdata</span>
              <strong className="text-xl font-mono text-white font-bold">{totalOccupants}</strong>
              <span className="text-[10px] text-slate-400 ml-1.5 font-mono">dari {totalCapacity} Kapasitas</span>
            </div>
          </div>

          <div className="bg-[#121c2e] border border-slate-800 rounded-lg p-3 flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-orange-600/20 border border-orange-500/30 text-orange-400">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono text-slate-400 block">GIS Engine Indexing</span>
              <strong className="text-xl font-mono text-white font-bold">60 FPS</strong>
              <span className="text-[10px] text-emerald-400 ml-1.5 font-mono">Supercluster</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Map Section */}
      <section className="relative w-full h-[620px] bg-slate-950 flex flex-col border-b border-slate-800">
        <HotspotMap hotspots={hotspots} shelters={shelters} />
      </section>

      {/* Secondary Information & Shelter Highlights */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-8">
        {/* Active Shelters Overview */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold font-mono text-white flex items-center gap-2">
                <Shield className="w-5 h-5 text-emerald-400" />
                Direktori Posko Evakuasi Terpadu (Posko A, B, C)
              </h2>
              <p className="text-xs text-slate-400">
                Data penampungan resmi binaan Satgas Karhutla dan Dinas Sosial dengan pembaruan logistik berkala.
              </p>
            </div>
            <Link
              href="/posko"
              className="text-xs font-mono text-orange-400 hover:text-orange-300 flex items-center gap-1 font-semibold"
            >
              Lihat Manifes Korban Lengkap <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {shelters.map((s) => {
              const occRatio = Math.round((s.current_occupants / s.capacity) * 100);
              return (
                <div
                  key={s.id}
                  className="bg-[#101726] border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-slate-700 transition-colors shadow-lg"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-2 py-0.5 rounded">
                        {s.code}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">
                        {occRatio}% Keterisian
                      </span>
                    </div>
                    <h3 className="font-bold text-white text-sm leading-tight">{s.name}</h3>
                    <p className="text-xs text-slate-400 line-clamp-2">{s.address}</p>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-900 rounded-full h-2 mt-2 overflow-hidden border border-slate-800">
                      <div
                        className={`h-full ${
                          occRatio >= 85 ? 'bg-red-500' : occRatio >= 60 ? 'bg-amber-500' : 'bg-emerald-500'
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
                      <span className="text-slate-500 block">Penanggung Jawab:</span>
                      <span className="text-slate-300 font-semibold">{s.pic_name}</span>
                    </div>
                    <Link
                      href={`/posko?shelterId=${s.id}`}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-orange-400 font-mono text-[11px] border border-slate-700 transition-colors"
                    >
                      Buka Posko →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Education & Legal Highlight Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-orange-950/20 to-slate-900 border border-orange-900/30 rounded-xl p-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-orange-400" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-orange-300">
                Pusat Edukasi & Regulasi Mitigasi
              </span>
            </div>
            <h3 className="text-base font-bold text-white font-mono">
              Mitigasi Lahan Gambut Berkelanjutan & Ketentuan UU No. 24 Tahun 2007
            </h3>
            <p className="text-xs text-slate-400 max-w-3xl leading-relaxed">
              Pelajari teknologi <em>Canal Blocking (Rewetting)</em>, pembuatan sekat bakar, serta sanksi pidana ketat (<em>strict liability</em>) atas pembakaran konsesi lahan.
            </p>
          </div>
          <Link
            href="/mitigasi"
            className="whitespace-nowrap px-4 py-2 rounded-lg bg-orange-600/30 hover:bg-orange-600 text-orange-200 hover:text-white border border-orange-500/40 font-mono text-xs font-bold transition-colors"
          >
            Buka Ensiklopedia Mitigasi →
          </Link>
        </div>
      </section>
    </div>
  );
}
