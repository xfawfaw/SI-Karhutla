'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, Shield, MapPin, AlertCircle, ArrowRight, Phone, HeartPulse, UserCheck, Activity } from 'lucide-react';
import { Evacuee, Shelter } from '@/types';
import { TactileHighlight } from '@/components/ui/tactile-highlight';

interface EvacueeSearchSectionProps {
  initialEvacuees: Evacuee[];
  shelters: Shelter[];
}

export default function EvacueeSearchSection({ initialEvacuees, shelters }: EvacueeSearchSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedShelterId, setSelectedShelterId] = useState<string>('ALL');

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return initialEvacuees.filter((item) => {
      const matchQuery =
        !q ||
        item.full_name.toLowerCase().includes(q) ||
        item.origin_village.toLowerCase().includes(q) ||
        (item.shelter_name && item.shelter_name.toLowerCase().includes(q));

      const matchShelter =
        selectedShelterId === 'ALL' || item.shelter_id === Number(selectedShelterId);

      return matchQuery && matchShelter;
    });
  }, [initialEvacuees, searchQuery, selectedShelterId]);

  const getShelterPic = (shelterId: number) => {
    return shelters.find((s) => s.id === shelterId);
  };

  const getHealthBadge = (health: string) => {
    switch (health) {
      case 'Sehat':
        return 'bg-[#20bf6b] text-white';
      case 'Kelelahan Ringan':
      case 'Luka Ringan':
        return 'bg-[#e6a73c] text-[#121212]';
      default:
        return 'bg-[#dc5645] text-white';
    }
  };

  return (
    <div id="posko" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Scroll-Animated Section Title Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-6 border-b border-black/[0.08]"
      >
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#20bf6b] inline-block animate-ping" />
            <span className="font-mono text-xs font-bold text-[#121212] uppercase tracking-wider">
              MODUL 02 • REUNI KELUARGA & POSKO
            </span>
            <span className="text-black/20">•</span>
            <span className="font-mono text-xs text-slate-500 uppercase">
              STANDARISASI DATA BNPB 2026
            </span>
          </div>

          {/* Combined Font Style Title */}
          <h2 className="leading-[0.92] uppercase text-[#121212]">
            <span className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-tight block">
              PENCARIAN KORBAN
            </span>
            <span className="flex flex-wrap items-baseline gap-2 sm:gap-3 mt-1 sm:mt-2">
              <span className="font-serif italic lowercase font-normal text-3xl sm:text-5xl md:text-6xl text-slate-600 tracking-normal select-none">
                direktori
              </span>
              <TactileHighlight direction="left" delay={0.15} trigger="inView">
                <span className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white">
                  POSKO EVAKUASI
                </span>
              </TactileHighlight>
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-sans max-w-2xl leading-relaxed pt-1">
            Direktori pencarian warga yang telah dievakuasi di posko resmi binaan Satgas Penanggulangan Karhutla dan Dinas Sosial, dilengkapi status medis dan kontak penanggung jawab.
          </p>
        </div>

        <Link
          href="/lapor"
          className="pill-btn-coral self-start md:self-auto shrink-0 text-sm"
        >
          <AlertCircle className="w-4 h-4" />
          <span>LAPOR ORANG HILANG</span>
        </Link>
      </motion.div>

      {/* Restyled Shelters Overview: Open Broadsheet Architecture (Replacing Clunky Rounded-3xl Boxes) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="border-y border-black/[0.08] py-8 sm:py-12 my-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-black/[0.08]">
          {shelters.map((s, idx) => {
            const occRatio = Math.round((s.current_occupants / s.capacity) * 100);
            const isSelected = selectedShelterId === String(s.id);
            const paddingClass = idx === 0 ? 'py-6 md:py-0 md:pr-8' : idx === 1 ? 'py-6 md:py-0 md:px-8' : 'py-6 md:py-0 md:pl-8';
            return (
              <div
                key={s.id}
                onClick={() => setSelectedShelterId(isSelected ? 'ALL' : String(s.id))}
                className={`${paddingClass} flex flex-col justify-between group cursor-pointer`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-slate-400 uppercase tracking-widest">
                      POSKO 0{idx + 1} / {s.code}
                    </span>
                    <span
                      className={`font-mono text-xs font-bold px-2.5 py-0.5 rounded-full transition-colors ${
                        isSelected
                          ? 'bg-[#121212] text-white'
                          : occRatio >= 80
                          ? 'bg-[#dc5645]/10 text-[#dc5645]'
                          : 'bg-[#20bf6b]/10 text-[#20bf6b]'
                      }`}
                    >
                      {occRatio}% KETERISIAN
                    </span>
                  </div>

                  <h3 className="leading-tight mb-2">
                    <TactileHighlight direction="left" delay={0.1 * (idx + 1)} trigger="hover">
                      <span className="font-display text-2xl sm:text-3xl font-bold uppercase text-white">
                        {s.name}
                      </span>
                    </TactileHighlight>
                    <span className="font-serif italic text-slate-500 text-xs block mt-1.5 line-clamp-1">
                      {s.address}
                    </span>
                  </h3>

                  {/* Seamless Progress Indicator */}
                  <div className="w-full bg-black/5 rounded-full h-1.5 my-4 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        occRatio >= 80 ? 'bg-[#dc5645]' : 'bg-[#20bf6b]'
                      }`}
                      style={{ width: `${Math.min(occRatio, 100)}%` }}
                    />
                  </div>

                  <div className="flex justify-between font-mono text-xs text-slate-600 mb-4">
                    <span>Terisi: <strong className="text-[#121212]">{s.current_occupants}</strong> Jiwa</span>
                    <span>Kapasitas: <strong className="text-[#121212]">{s.capacity}</strong> Jiwa</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-black/[0.06] flex items-center justify-between font-mono text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block">PIC RESMI POSKO:</span>
                    <span className="text-[#121212] font-bold block">{s.pic_name}</span>
                    <span className="text-slate-500 text-[11px]">{s.pic_phone}</span>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                      isSelected
                        ? 'bg-[#121212] text-white shadow-sm'
                        : 'bg-black/5 text-[#121212] group-hover:bg-[#121212] group-hover:text-white'
                    }`}
                  >
                    {isSelected ? 'TERPILIH ✓' : 'FILTER →'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Filter & Search Bar with Scroll Animation */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col sm:flex-row gap-3 my-8"
      >
        <div className="relative flex-1">
          <Search className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Cari nama korban atau asal desa (contoh: Rahmat Hidayat, Sei Gambut, Kampar)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white rounded-full pl-11 pr-4 py-3 text-xs sm:text-sm font-sans text-[#121212] placeholder-slate-400 border border-black/[0.08] focus:outline-none focus:border-black transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-2.5 text-[11px] font-mono font-bold bg-[#121212] text-white px-2.5 py-1 rounded-full"
            >
              RESET
            </button>
          )}
        </div>

        <div className="sm:w-72">
          <select
            value={selectedShelterId}
            onChange={(e) => setSelectedShelterId(e.target.value)}
            className="w-full bg-[#121212] text-white rounded-full px-4 py-3 text-xs font-mono font-bold tracking-wider uppercase focus:outline-none cursor-pointer border border-black"
          >
            <option value="ALL">SEMUA POSKO EVAKUASI</option>
            {shelters.map((s) => (
              <option key={s.id} value={s.id}>
                {s.code} ({s.current_occupants}/{s.capacity})
              </option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Evacuee Results Counter */}
      <div className="flex items-center justify-between mb-4 font-mono text-xs">
        <span className="font-bold text-[#121212]">
          TERDATA: {filtered.length} KORBAN SELAMAT
        </span>
        {searchQuery && (
          <span className="text-[#dc5645] font-bold">
            KATA KUNCI: &ldquo;{searchQuery}&rdquo;
          </span>
        )}
      </div>

      {/* Restyled Evacuee Results: Open Broadsheet Architecture (Replacing Heavy soft-card Boxes) */}
      {filtered.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="border-y border-black/[0.08] py-8 sm:py-10 my-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-black/[0.08] gap-y-10">
            {filtered.map((item, idx) => {
              const shelterInfo = getShelterPic(item.shelter_id);
              const paddingClass =
                idx % 3 === 0
                  ? 'py-6 md:py-0 md:pr-8'
                  : idx % 3 === 1
                  ? 'py-6 md:py-0 md:px-8'
                  : 'py-6 md:py-0 md:pl-8';
              return (
                <div
                  key={item.id}
                  className={`${paddingClass} flex flex-col justify-between group`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#121212] text-white">
                        {shelterInfo?.code || 'POSKO'}
                      </span>
                      <span className={`font-mono text-[11px] font-bold px-2.5 py-0.5 rounded-full ${getHealthBadge(item.health_condition)}`}>
                        {item.health_condition}
                      </span>
                    </div>

                    <h3 className="leading-tight mb-2">
                      <TactileHighlight direction="left" delay={0.05 * (idx % 6)} trigger="hover">
                        <span className="font-display text-2xl font-bold uppercase text-white">
                          {item.full_name}
                        </span>
                      </TactileHighlight>
                      <span className="font-serif italic text-slate-500 text-xs block mt-1">
                        {item.age} Tahun • {item.gender}
                      </span>
                    </h3>

                    <div className="space-y-1.5 font-mono text-xs text-slate-700 py-3 border-y border-black/[0.06] my-3">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#dc5645] shrink-0" />
                        <span>Asal: <strong>{item.origin_village}</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Shield className="w-3.5 h-3.5 text-[#20bf6b] shrink-0" />
                        <span>{shelterInfo?.name || item.shelter_name}</span>
                      </div>
                    </div>

                    {item.notes && (
                      <p className="font-sans text-xs text-slate-600 italic bg-black/[0.03] p-2.5 rounded-xl border border-black/[0.04]">
                        &ldquo;{item.notes}&rdquo;
                      </p>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-black/[0.06] flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-500">{shelterInfo?.pic_phone || '117 BNPB'}</span>
                    <span className="text-[#dc5645] font-bold">TERCATAT RESMI ✓</span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      ) : (
        <div className="p-12 text-center border-y border-black/[0.08] my-8 space-y-3">
          <AlertCircle className="w-10 h-10 text-[#dc5645] mx-auto" />
          <h4 className="font-display text-2xl font-bold uppercase text-[#121212]">KORBAN TIDAK DITEMUKAN</h4>
          <p className="text-sm text-slate-600 font-sans max-w-md mx-auto">
            Nama tidak ada dalam manifes ketiga posko? Segera buat laporan orang hilang melalui formulir resmi:
          </p>
          <div className="pt-2">
            <Link href={`/lapor?nama=${encodeURIComponent(searchQuery)}`} className="pill-btn-coral text-sm">
              BUAT LAPORAN ORANG HILANG →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
