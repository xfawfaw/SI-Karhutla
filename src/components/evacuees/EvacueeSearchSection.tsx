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
        return 'bg-[#20bf6b] text-black';
      case 'Kelelahan Ringan':
      case 'Luka Ringan':
        return 'bg-[#e6a73c] text-black';
      default:
        return 'bg-[#dc5645] text-white';
    }
  };

  return (
    <div id="posko" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t-2 border-[#121212]">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="sticker-badge bg-[#20bf6b] text-black text-xs font-bold">
              ★ SISTEM REUNI KORBAN
            </span>
            <span className="sticker-badge bg-[#e6a73c] text-black text-xs font-bold">
              POSKO A, B, C
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight uppercase text-[#121212]">
            PENCARIAN KORBAN & DIREKTORI POSKO
          </h2>
          <p className="font-mono text-xs sm:text-sm text-slate-700 mt-1 max-w-2xl">
            Cari kerabat atau keluarga yang telah dievakuasi di posko resmi binaan Satgas Karhutla & Dinas Sosial.
          </p>
        </div>

        <Link
          href="/lapor"
          className="pill-btn-coral text-xs self-start md:self-auto shrink-0"
        >
          <AlertCircle className="w-4 h-4" />
          <span>LAPOR BELUM DITEMUKAN</span>
        </Link>
      </div>

      {/* Shelters Overview Cards (Posko A, B, C) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {shelters.map((s) => {
          const occRatio = Math.round((s.current_occupants / s.capacity) * 100);
          const isSelected = selectedShelterId === String(s.id);
          return (
            <div
              key={s.id}
              onClick={() => setSelectedShelterId(isSelected ? 'ALL' : String(s.id))}
              className={`soft-card p-5 cursor-pointer flex flex-col justify-between transition-all ${
                isSelected ? 'ring-4 ring-[#20bf6b] bg-[#fbf9f4]' : 'bg-white'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="sticker-badge bg-[#20bf6b] text-black text-xs font-black">
                    {s.code}
                  </span>
                  <span className="font-mono text-xs font-bold text-[#121212]">
                    {occRatio}% KETERISIAN
                  </span>
                </div>
                <h3 className="font-display text-xl font-black uppercase text-black leading-tight">
                  {s.name}
                </h3>
                <p className="font-mono text-xs text-slate-600 line-clamp-2 mt-1">
                  {s.address}
                </p>

                {/* Progress bar */}
                <div className="w-full bg-[#f5f2eb] border border-[#121212] rounded-full h-2.5 mt-3 overflow-hidden">
                  <div
                    className={`h-full ${occRatio >= 80 ? 'bg-[#dc5645]' : 'bg-[#20bf6b]'}`}
                    style={{ width: `${Math.min(occRatio, 100)}%` }}
                  />
                </div>
                <div className="flex justify-between font-mono text-[11px] text-slate-700 mt-1.5 font-bold">
                  <span>Terisi: {s.current_occupants} Jiwa</span>
                  <span>Kapasitas: {s.capacity} Jiwa</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t-2 border-[#121212] font-mono text-xs flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 block">PIC POSKO:</span>
                  <strong className="text-black text-[11px]">{s.pic_name}</strong>
                  <span className="text-slate-700 block text-[10px]">{s.pic_phone}</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-1 rounded-full border border-black bg-[#e6a73c]">
                  {isSelected ? 'DIPILIH ✓' : 'FILTER'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Instant Search Bar */}
      <div className="soft-card p-4 sm:p-5 mb-8">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-3.5 w-4 h-4 text-black stroke-[3]" />
            <input
              type="text"
              placeholder="Ketik nama lengkap korban atau desa asal (contoh: Farel Silalahi, Rimbo Panjang)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#f5f2eb] border-2 border-[#121212] rounded-2xl pl-11 pr-4 py-3 text-xs sm:text-sm font-mono font-bold text-black placeholder-slate-500 focus:outline-none focus:bg-white"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-3.5 font-mono text-xs font-bold bg-[#121212] text-white px-2 py-0.5 rounded-full"
              >
                RESET
              </button>
            )}
          </div>

          <div className="sm:w-64">
            <select
              value={selectedShelterId}
              onChange={(e) => setSelectedShelterId(e.target.value)}
              className="w-full bg-[#e6a73c] border-2 border-[#121212] rounded-2xl px-4 py-3 text-xs sm:text-sm font-display font-black text-black uppercase focus:outline-none cursor-pointer tracking-wider"
            >
              <option value="ALL">SEMUA POSKO</option>
              {shelters.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.code} ({s.current_occupants}/{s.capacity})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Evacuee Results */}
      <div className="flex items-center justify-between mb-4 font-mono text-xs font-bold">
        <span className="sticker-badge bg-white text-black">
          TERDATA: {filtered.length} KORBAN
        </span>
        {searchQuery && (
          <span className="sticker-badge bg-[#e6a73c] text-black">
            KATA KUNCI: &ldquo;{searchQuery}&rdquo;
          </span>
        )}
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item) => {
            const shelterInfo = getShelterPic(item.shelter_id);
            return (
              <div
                key={item.id}
                className="soft-card p-5 flex flex-col justify-between hover:scale-[1.01] transition-transform"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className="sticker-badge bg-black text-white text-[11px]">
                      {shelterInfo?.code || 'POSKO'}
                    </span>
                    <span
                      className={`sticker-badge text-[10px] font-bold ${getHealthBadge(
                        item.health_condition
                      )}`}
                    >
                      {item.health_condition}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-2xl font-black font-display uppercase tracking-wide text-black">
                      {item.full_name}
                    </h4>
                    <p className="font-mono text-xs text-slate-600 font-bold">
                      Usia {item.age} Tahun • {item.gender}
                    </p>
                  </div>

                  <div className="bg-[#f5f2eb] rounded-2xl border-2 border-[#121212] p-3 space-y-1.5 font-mono text-xs">
                    <div className="flex items-start gap-1.5 text-slate-800">
                      <MapPin className="w-3.5 h-3.5 text-[#dc5645] shrink-0 mt-0.5 stroke-[2.5]" />
                      <span><strong>Asal:</strong> {item.origin_village}</span>
                    </div>
                    <div className="flex items-start gap-1.5 text-slate-800">
                      <Shield className="w-3.5 h-3.5 text-[#20bf6b] shrink-0 mt-0.5 stroke-[2.5]" />
                      <span><strong>Lokasi:</strong> {item.shelter_name}</span>
                    </div>
                    {item.notes && (
                      <p className="text-[11px] text-slate-600 italic pt-1 border-t border-black/20">
                        &ldquo;{item.notes}&rdquo;
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t-2 border-[#121212] flex items-center justify-between font-mono text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 block">KONTAK POSKO:</span>
                    <strong className="text-black">{shelterInfo?.pic_phone || '117 (BNPB)'}</strong>
                  </div>
                  <button
                    onClick={() => {
                      const mapSection = document.getElementById('peta');
                      if (mapSection) mapSection.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="pill-btn-black text-[11px] py-1 px-3"
                  >
                    LOKASI PETA →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="soft-card p-8 sm:p-12 text-center max-w-lg mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#dc5645] text-white border-2 border-black flex items-center justify-center mx-auto text-2xl font-bold">
            ?
          </div>
          <div>
            <h4 className="text-2xl font-black font-display uppercase">
              BELUM TERCATAT DI POSKO
            </h4>
            <p className="font-mono text-xs text-slate-700 mt-2 leading-relaxed">
              Nama &ldquo;<strong>{searchQuery}</strong>&rdquo; belum ditemukan di manifes Posko A, B, atau C. Silakan daftarkan laporan orang hilang agar relawan posko dapat memverifikasinya.
            </p>
          </div>
          <Link
            href={`/lapor?nama=${encodeURIComponent(searchQuery)}`}
            className="pill-btn-coral text-xs"
          >
            <AlertCircle className="w-4 h-4" />
            <span>AJUKAN LAPORAN ORANG HILANG SEKARANG</span>
          </Link>
        </div>
      )}
    </div>
  );
}
