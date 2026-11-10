'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search, Shield, MapPin, AlertCircle, ArrowRight, Loader2, Phone, HeartPulse } from 'lucide-react';
import { Evacuee, Shelter } from '@/types';

function PoskoContent() {
  const searchParams = useSearchParams();
  const initialShelter = searchParams.get('shelterId') || 'ALL';

  const [evacuees, setEvacuees] = useState<Evacuee[]>([]);
  const [shelters, setShelters] = useState<Shelter[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedShelterId, setSelectedShelterId] = useState<string>(initialShelter);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [resEvac, resShelter] = await Promise.all([
          fetch('/api/evacuees').then((r) => r.json()),
          fetch('/api/shelters').then((r) => r.json()),
        ]);

        if (resEvac.success) setEvacuees(resEvac.data);
        if (resShelter.success) setShelters(resShelter.data);
      } catch (err) {
        console.error('Failed to load evacuee directory', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return evacuees.filter((item) => {
      const matchQuery =
        !q ||
        item.full_name.toLowerCase().includes(q) ||
        item.origin_village.toLowerCase().includes(q) ||
        (item.shelter_name && item.shelter_name.toLowerCase().includes(q));

      const matchShelter =
        selectedShelterId === 'ALL' || item.shelter_id === Number(selectedShelterId);

      return matchQuery && matchShelter;
    });
  }, [evacuees, searchQuery, selectedShelterId]);

  const getShelterPic = (shelterId: number) => {
    return shelters.find((s) => s.id === shelterId);
  };

  const getHealthBadgeStyle = (health: string) => {
    switch (health) {
      case 'Sehat':
        return 'bg-[#20bf6b] text-black';
      case 'Kelelahan Ringan':
      case 'Luka Ringan':
        return 'bg-[#ffde59] text-black';
      default:
        return 'bg-[#eb3b5a] text-white';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1 font-mono text-black">
      {/* Page Title Banner */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="bg-[#20bf6b] text-black font-mono font-bold text-xs uppercase px-2.5 py-0.5 border-2 border-black shadow-brutal-sm">
            ★ SISTEM REUNI KELUARGA KORBAN
          </span>
          <span className="bg-[#ffde59] text-black font-mono font-bold text-xs uppercase px-2.5 py-0.5 border-2 border-black shadow-brutal-sm">
            MANIFES RESMI POSKO A, B, C
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight uppercase text-black">
          PENCARIAN KORBAN & DIREKTORI POSKO
        </h1>
        <p className="text-xs sm:text-sm text-slate-800 mt-1 max-w-2xl font-mono">
          Ketik nama kerabat atau desa asal untuk menemukan lokasi penampungan posko evakuasi dan kondisi medis penyintas.
        </p>
      </div>

      {/* Neobrutalist Search Bar */}
      <div className="bg-white border-3 border-black p-4 sm:p-5 shadow-brutal mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-black stroke-[3]" />
            <input
              type="text"
              placeholder="Cari nama lengkap korban atau asal desa (contoh: Farel Silalahi, Rimbo Panjang)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#f4f0e8] border-2 border-black px-10 py-3 text-xs sm:text-sm font-bold text-black placeholder-slate-500 focus:outline-none focus:bg-white"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-3.5 font-bold text-xs bg-black text-white px-2 py-0.5"
              >
                RESET
              </button>
            )}
          </div>

          <div className="sm:w-64">
            <select
              value={selectedShelterId}
              onChange={(e) => setSelectedShelterId(e.target.value)}
              className="w-full bg-[#ffde59] border-2 border-black px-3 py-3 text-xs sm:text-sm font-black text-black focus:outline-none cursor-pointer"
            >
              <option value="ALL">SEMUA POSKO EVAKUASI</option>
              {shelters.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.code} ({s.current_occupants}/{s.capacity} Jiwa)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Shelter Pills Filter */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t-2 border-black">
          {shelters.map((s) => {
            const isSelected = selectedShelterId === String(s.id);
            return (
              <button
                key={s.id}
                onClick={() => setSelectedShelterId(isSelected ? 'ALL' : String(s.id))}
                className={`p-2.5 border-2 border-black text-left transition-all ${
                  isSelected
                    ? 'bg-[#20bf6b] shadow-brutal font-black'
                    : 'bg-[#f4f0e8] hover:bg-white hover:shadow-brutal-sm'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono font-bold">
                  <span>{s.code}</span>
                  <span className="bg-black text-white px-1.5 py-0.2 text-[10px]">{s.current_occupants} Jiwa</span>
                </div>
                <div className="text-xs font-bold truncate mt-1">{s.name}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-4 text-xs font-mono font-bold">
        <span className="bg-white border-2 border-black px-2.5 py-1 shadow-brutal-sm">
          TOTAL PENYINTAS DITEMUKAN: <strong>{filtered.length}</strong> JIWA
        </span>
        {searchQuery && (
          <span className="bg-[#ffde59] border-2 border-black px-2.5 py-1 shadow-brutal-sm">
            KATA KUNCI: &ldquo;{searchQuery}&rdquo;
          </span>
        )}
      </div>

      {/* Evacuee Cards Grid in Neobrutalism Style */}
      {loading ? (
        <div className="py-20 flex justify-center items-center gap-2 font-mono font-bold text-sm">
          <Loader2 className="w-6 h-6 animate-spin text-black" />
          <span>MEMUAT DIREKTORI POSKO...</span>
        </div>
      ) : filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filtered.map((item) => {
            const shelterInfo = getShelterPic(item.shelter_id);
            return (
              <div
                key={item.id}
                className="bg-white border-2 sm:border-3 border-black p-4 sm:p-5 shadow-brutal flex flex-col justify-between hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal-lg transition-all"
              >
                <div className="space-y-3">
                  {/* Top Badges */}
                  <div className="flex items-start justify-between gap-2">
                    <span className="bg-black text-white px-2 py-0.5 text-[11px] font-black border border-black">
                      {shelterInfo?.code || 'POSKO'}
                    </span>
                    <span
                      className={`px-2 py-0.5 text-[10px] font-black border-2 border-black shadow-brutal-sm uppercase ${getHealthBadgeStyle(
                        item.health_condition
                      )}`}
                    >
                      {item.health_condition}
                    </span>
                  </div>

                  {/* Victim Identity */}
                  <div>
                    <h3 className="text-xl font-black font-display uppercase tracking-wide text-black">
                      {item.full_name}
                    </h3>
                    <div className="text-xs text-slate-700 font-bold mt-0.5">
                      Usia: {item.age} Tahun • {item.gender}
                    </div>
                  </div>

                  {/* Origin & Shelter */}
                  <div className="bg-[#f4f0e8] border-2 border-black p-3 space-y-1.5 text-xs">
                    <div className="flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#ff5722] shrink-0 mt-0.5 stroke-[2.5]" />
                      <span><strong>Asal:</strong> {item.origin_village}</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-[#20bf6b] shrink-0 mt-0.5 stroke-[2.5]" />
                      <span><strong>Lokasi:</strong> {item.shelter_name}</span>
                    </div>
                    {item.notes && (
                      <p className="text-[11px] text-slate-700 italic pt-1 border-t border-black/30">
                        &ldquo;{item.notes}&rdquo;
                      </p>
                    )}
                  </div>
                </div>

                {/* Footer with Shelter Hotline */}
                <div className="mt-4 pt-3 border-t-2 border-black flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-slate-600 block">KONTAK PIC POSKO:</span>
                    <strong className="text-black font-bold">{shelterInfo?.pic_phone || '117 (BNPB)'}</strong>
                  </div>
                  <Link
                    href={`/?lat=${shelterInfo?.latitude}&lng=${shelterInfo?.longitude}`}
                    className="px-2.5 py-1 bg-[#ffde59] text-black font-bold border-2 border-black shadow-brutal-sm hover:shadow-none transition-all flex items-center gap-1 text-[11px]"
                  >
                    PETA <ArrowRight className="w-3 h-3 stroke-[3]" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white border-3 border-black p-8 sm:p-12 text-center max-w-xl mx-auto shadow-brutal space-y-4">
          <div className="w-16 h-16 bg-[#eb3b5a] text-white border-2 border-black shadow-brutal flex items-center justify-center mx-auto text-2xl font-bold">
            ?
          </div>
          <div>
            <h3 className="text-2xl font-black font-display uppercase">
              DATA BELUM DITEMUKAN DI POSKO
            </h3>
            <p className="text-xs text-slate-700 mt-2 leading-relaxed font-mono">
              Nama &ldquo;<strong>{searchQuery}</strong>&rdquo; belum tercatat di Posko A, B, maupun C. Segera buat laporan orang hilang resmi agar petugas lapangan dan relawan segera melakukan pencarian.
            </p>
          </div>
          <div className="pt-2">
            <Link
              href={`/lapor?nama=${encodeURIComponent(searchQuery)}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#ff5722] text-white font-black text-xs sm:text-sm border-2 border-black shadow-brutal brutal-btn"
            >
              <AlertCircle className="w-4 h-4 stroke-[3]" />
              AJUKAN LAPORAN ORANG HILANG SEKARANG
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PoskoPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 flex justify-center items-center gap-2 font-mono font-bold text-sm">
          <Loader2 className="w-6 h-6 animate-spin text-black" />
          <span>MEMUAT PENCARIAN POSKO...</span>
        </div>
      }
    >
      <PoskoContent />
    </Suspense>
  );
}
