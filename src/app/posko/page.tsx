'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search, Shield, MapPin, AlertCircle, ArrowRight, Loader2 } from 'lucide-react';
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

  const getHealthBadge = (health: string) => {
    switch (health) {
      case 'Sehat':
        return 'bg-emerald-950/60 text-emerald-400 border-emerald-800';
      case 'Kelelahan Ringan':
      case 'Luka Ringan':
        return 'bg-amber-950/60 text-amber-400 border-amber-800';
      default:
        return 'bg-red-950/60 text-red-400 border-red-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-white font-mono tracking-tight">
          Pencarian Korban & Direktori Pengungsi
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Cari nama keluarga atau kerabat yang dievakuasi di posko penampungan resmi.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-[#0f172a] border border-slate-800 rounded-lg p-3.5 mb-6 space-y-3">
        <div className="flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Cari nama lengkap korban atau asal desa..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 font-mono focus:outline-none focus:border-orange-500"
            />
          </div>

          <div className="sm:w-56">
            <select
              value={selectedShelterId}
              onChange={(e) => setSelectedShelterId(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-xs text-slate-200 font-mono focus:outline-none focus:border-orange-500"
            >
              <option value="ALL">Semua Posko</option>
              {shelters.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.code} ({s.current_occupants} Jiwa)
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-3 text-xs font-mono text-slate-400">
        <span>Ditemukan: <strong className="text-white">{filtered.length}</strong> jiwa</span>
        {searchQuery && <span>Filter: &ldquo;{searchQuery}&rdquo;</span>}
      </div>

      {/* Results Grid */}
      {loading ? (
        <div className="py-16 flex justify-center text-slate-500 font-mono text-xs">
          <Loader2 className="w-5 h-5 animate-spin text-orange-500" />
        </div>
      ) : filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filtered.map((item) => {
            const shelterInfo = getShelterPic(item.shelter_id);
            return (
              <div
                key={item.id}
                className="bg-[#0f172a] border border-slate-800 rounded-lg p-3.5 flex flex-col justify-between hover:border-slate-700 transition-colors"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-slate-300">
                      {shelterInfo?.code || 'POSKO'}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono border ${getHealthBadge(
                        item.health_condition
                      )}`}
                    >
                      {item.health_condition}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white font-mono">
                      {item.full_name}
                    </h3>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                      {item.age} Tahun • {item.gender}
                    </div>
                  </div>

                  <div className="space-y-1 text-xs text-slate-300 font-mono pt-1 border-t border-slate-800">
                    <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                      <MapPin className="w-3 h-3 text-orange-400 shrink-0" />
                      <span>{item.origin_village}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                      <Shield className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span>{item.shelter_name}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Kontak: {shelterInfo?.pic_phone || '117'}</span>
                  <Link
                    href={`/?lat=${shelterInfo?.latitude}&lng=${shelterInfo?.longitude}`}
                    className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                  >
                    Lokasi <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-[#0f172a] border border-slate-800 rounded-lg p-8 text-center max-w-lg mx-auto space-y-3">
          <p className="text-xs text-slate-300">
            Nama &ldquo;<strong className="text-white">{searchQuery}</strong>&rdquo; belum tercatat di posko pengungsian.
          </p>
          <Link
            href={`/lapor?nama=${encodeURIComponent(searchQuery)}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-orange-600 hover:bg-orange-500 text-white font-mono text-xs font-bold transition-colors"
          >
            <AlertCircle className="w-3.5 h-3.5" />
            Ajukan Laporan Orang Hilang
          </Link>
        </div>
      )}
    </div>
  );
}

export default function PoskoPage() {
  return (
    <Suspense
      fallback={
        <div className="py-16 flex justify-center text-slate-500 font-mono text-xs">
          <Loader2 className="w-5 h-5 animate-spin text-orange-500" />
        </div>
      }
    >
      <PoskoContent />
    </Suspense>
  );
}
