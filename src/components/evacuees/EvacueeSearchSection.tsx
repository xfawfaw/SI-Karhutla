'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Shield, MapPin, AlertCircle, ArrowRight, Phone, HeartPulse, UserCheck } from 'lucide-react';
import { Evacuee, Shelter } from '@/types';

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
    <div id="posko" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Title Header (Muse Group style: description merged with background) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#121212] text-white font-mono text-[11px] uppercase tracking-wider">
              ● REUNI KORBAN & POSKO
            </span>
            <span className="font-mono text-xs text-slate-500 uppercase tracking-wide">
              DATA TERPADU BNPB 2026
            </span>
          </div>
          <h2 className="font-muse text-4xl sm:text-6xl tracking-tight uppercase text-[#121212] leading-none">
            PENCARIAN KORBAN & POSKO EVAKUASI
          </h2>
          <p className="text-base sm:text-lg text-slate-700 font-sans mt-2 max-w-2xl leading-relaxed">
            Direktori pencarian warga yang telah dievakuasi di posko resmi binaan Satgas Penanggulangan Karhutla dan Dinas Sosial.
          </p>
        </div>

        <Link
          href="/lapor"
          className="pill-btn-coral self-start md:self-auto shrink-0"
        >
          <AlertCircle className="w-4 h-4" />
          <span>LAPOR ORANG HILANG</span>
        </Link>
      </div>

      {/* Shelters Overview Cards (Posko A, B, C) - Clean borderless soft cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {shelters.map((s) => {
          const occRatio = Math.round((s.current_occupants / s.capacity) * 100);
          const isSelected = selectedShelterId === String(s.id);
          return (
            <div
              key={s.id}
              onClick={() => setSelectedShelterId(isSelected ? 'ALL' : String(s.id))}
              className={`p-6 rounded-3xl cursor-pointer flex flex-col justify-between transition-all ${
                isSelected
                  ? 'bg-white shadow-xl ring-2 ring-[#20bf6b]'
                  : 'bg-white/80 hover:bg-white shadow-sm hover:shadow-md'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="sticker-badge bg-[#20bf6b] text-white text-xs font-black">
                    {s.code}
                  </span>
                  <span className="font-mono text-sm font-bold text-[#121212]">
                    {occRatio}% KETERISIAN
                  </span>
                </div>

                <h3 className="font-muse text-2xl uppercase text-[#121212] leading-tight">
                  {s.name}
                </h3>
                <p className="text-xs text-slate-600 font-sans mt-1 line-clamp-2">
                  {s.address}
                </p>

                {/* Smooth Progress Bar */}
                <div className="w-full bg-[#f0ede6] rounded-full h-2.5 mt-4 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      occRatio >= 80 ? 'bg-[#dc5645]' : 'bg-[#20bf6b]'
                    }`}
                    style={{ width: `${Math.min(occRatio, 100)}%` }}
                  />
                </div>
                <div className="flex justify-between font-mono text-xs text-slate-600 mt-2 font-medium">
                  <span>Terisi: {s.current_occupants} Jiwa</span>
                  <span>Kapasitas: {s.capacity} Jiwa</span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-black/5 font-sans text-xs flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 font-mono uppercase block">PIC RESMI POSKO:</span>
                  <strong className="text-[#121212] text-xs font-bold">{s.pic_name}</strong>
                  <span className="text-slate-600 block text-[11px] font-mono">{s.pic_phone}</span>
                </div>
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full transition-colors ${
                    isSelected ? 'bg-[#20bf6b] text-white' : 'bg-[#f5f2eb] text-[#121212]'
                  }`}
                >
                  {isSelected ? 'DIPILIH ✓' : 'FILTER'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Instant Search Bar - Clean borderless pill style */}
      <div className="bg-white/90 backdrop-blur-md rounded-3xl p-4 sm:p-5 mb-8 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Cari nama lengkap korban atau desa asal (contoh: Farel Silalahi, Rimbo Panjang)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#f5f2eb] rounded-2xl pl-11 pr-4 py-3 text-sm font-sans text-[#121212] placeholder-slate-500 focus:outline-none focus:bg-white transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-3 text-xs font-mono font-bold bg-[#121212] text-white px-2.5 py-1 rounded-full"
              >
                RESET
              </button>
            )}
          </div>

          <div className="sm:w-64">
            <select
              value={selectedShelterId}
              onChange={(e) => setSelectedShelterId(e.target.value)}
              className="w-full bg-[#121212] text-white rounded-2xl px-4 py-3 text-xs font-mono font-bold tracking-wider uppercase focus:outline-none cursor-pointer"
            >
              <option value="ALL">SEMUA POSKO EVAKUASI</option>
              {shelters.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.code} ({s.current_occupants}/{s.capacity})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Evacuee Results Counter */}
      <div className="flex items-center justify-between mb-5 font-mono text-xs">
        <span className="sticker-badge bg-[#121212] text-white">
          TERDATA: {filtered.length} KORBAN SELAMAT
        </span>
        {searchQuery && (
          <span className="sticker-badge bg-[#dc5645] text-white">
            KATA KUNCI: &ldquo;{searchQuery}&rdquo;
          </span>
        )}
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => {
            const shelterInfo = getShelterPic(item.shelter_id);
            return (
              <div
                key={item.id}
                className="soft-card p-6 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className="sticker-badge bg-[#121212] text-white text-[11px]">
                      {shelterInfo?.code || 'POSKO'}
                    </span>
                    <span className={`sticker-badge text-[10px] ${getHealthBadge(item.health_condition)}`}>
                      {item.health_condition}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-muse text-2xl uppercase text-[#121212] leading-tight">
                      {item.full_name}
                    </h3>
                    <p className="font-mono text-xs text-slate-500 mt-0.5">
                      {item.age} Tahun • {item.gender}
                    </p>
                  </div>

                  <div className="space-y-1.5 font-sans text-xs text-slate-700 bg-[#f5f2eb] p-3 rounded-2xl">
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
                    <p className="font-sans text-xs text-slate-600 italic bg-white p-2 rounded-xl">
                      &ldquo;{item.notes}&rdquo;
                    </p>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-black/5 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-500">{shelterInfo?.pic_phone || '117 BNPB'}</span>
                  <span className="text-[#dc5645] font-bold">TERCATAT RESMI ✓</span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-12 text-center bg-white/70 rounded-3xl space-y-3">
          <AlertCircle className="w-10 h-10 text-[#dc5645] mx-auto" />
          <h4 className="font-muse text-2xl uppercase text-[#121212]">KORBAN TIDAK DITEMUKAN</h4>
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
