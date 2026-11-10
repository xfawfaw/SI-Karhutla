'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search, Shield, HeartPulse, UserX, AlertCircle, Phone, MapPin, UserCheck, ArrowRight, Loader2 } from 'lucide-react';
import { Evacuee, Shelter } from '@/types';

function PoskoContent() {
  const searchParams = useSearchParams();
  const initialShelter = searchParams.get('shelterId') || 'ALL';

  const [evacuees, setEvacuees] = useState<Evacuee[]>([]);
  const [shelters, setShelters] = useState<Shelter[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedShelterId, setSelectedShelterId] = useState<string>(initialShelter);
  const [loading, setLoading] = useState(true);

  // Fetch initial data
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

  // Filtered evacuees
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

  // Find PIC details for selected shelter
  const getShelterPic = (shelterId: number) => {
    return shelters.find((s) => s.id === shelterId);
  };

  const getHealthBadge = (health: string) => {
    switch (health) {
      case 'Sehat':
        return 'bg-emerald-950/80 text-emerald-400 border-emerald-800';
      case 'Kelelahan Ringan':
      case 'Luka Ringan':
        return 'bg-amber-950/80 text-amber-400 border-amber-800';
      default:
        return 'bg-red-950/80 text-red-400 border-red-800 animate-pulse';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 uppercase tracking-wider">
            SISTEM REUNI KELUARGA KORBAN
          </span>
          <span className="text-xs text-slate-400 font-mono">
            Direktori Resmi Posko BNPB & Satgas
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
          Pencarian Korban & Direktori Pengungsi
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
          Gunakan mesin pencarian cepat ini untuk memeriksa apakah keluarga atau kerabat Anda telah dievakuasi di Posko A, Posko B, atau Posko C.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-[#101726] border border-slate-800 rounded-xl p-4 shadow-xl mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Main Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Ketik nama lengkap korban atau desa asal (contoh: Farel Silalahi, Rimbo Panjang)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 font-mono focus:outline-none focus:border-orange-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3.5 text-xs text-slate-400 hover:text-white font-mono"
              >
                Clear
              </button>
            )}
          </div>

          {/* Shelter Filter Selector */}
          <div className="md:w-64">
            <select
              value={selectedShelterId}
              onChange={(e) => setSelectedShelterId(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-3 text-sm text-slate-200 font-mono focus:outline-none focus:border-orange-500"
            >
              <option value="ALL">Semua Posko Evakuasi</option>
              {shelters.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.code} - {s.name.split(' - ')[1] || s.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Shelter Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-slate-800/80">
          {shelters.map((s) => {
            const isSelected = selectedShelterId === String(s.id);
            return (
              <button
                key={s.id}
                onClick={() => setSelectedShelterId(isSelected ? 'ALL' : String(s.id))}
                className={`p-2 rounded-lg border text-left transition-all ${
                  isSelected
                    ? 'bg-emerald-950/40 border-emerald-500 text-white'
                    : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-emerald-400">{s.code}</span>
                  <span>{s.current_occupants}/{s.capacity} Jiwa</span>
                </div>
                <div className="text-[11px] font-semibold text-slate-200 truncate mt-0.5">
                  {s.name}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-mono text-slate-400">
          Menampilkan <strong className="text-white">{filtered.length}</strong> data korban terdata
        </span>
        {searchQuery && (
          <span className="text-xs font-mono text-orange-400">
            Kata Kunci: &ldquo;{searchQuery}&rdquo;
          </span>
        )}
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-400 font-mono text-sm">
          <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
          <span>Mengambil data manifes posko...</span>
        </div>
      ) : filtered.length > 0 ? (
        /* Evacuee Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item) => {
            const shelterInfo = getShelterPic(item.shelter_id);
            return (
              <div
                key={item.id}
                className="bg-[#101726] border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-slate-700 transition-all shadow-lg group"
              >
                <div className="space-y-3">
                  {/* Top Bar: Shelter code & Condition Badge */}
                  <div className="flex items-start justify-between gap-2">
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-slate-800 text-slate-300 border border-slate-700">
                      {shelterInfo?.code || 'POSKO'}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold border ${getHealthBadge(
                        item.health_condition
                      )}`}
                    >
                      {item.health_condition}
                    </span>
                  </div>

                  {/* Victim Identity */}
                  <div>
                    <h3 className="text-base font-bold text-white font-mono group-hover:text-orange-400 transition-colors">
                      {item.full_name}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-400 font-mono mt-0.5">
                      <span>{item.age} Tahun</span>
                      <span>•</span>
                      <span>{item.gender}</span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="bg-slate-900/80 rounded-lg p-2.5 border border-slate-800 space-y-1.5 text-xs">
                    <div className="flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0 mt-0.5" />
                      <span className="text-slate-300">
                        <strong className="text-slate-400">Asal:</strong> {item.origin_village}
                      </span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-slate-300">
                        <strong className="text-slate-400">Lokasi:</strong> {item.shelter_name}
                      </span>
                    </div>
                    {item.notes && (
                      <p className="text-[11px] text-slate-400 italic pt-1 border-t border-slate-800">
                        &ldquo;{item.notes}&rdquo;
                      </p>
                    )}
                  </div>
                </div>

                {/* Footer with Shelter Hotline */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <div className="text-[11px]">
                    <span className="text-slate-500 block">Kontak PIC Posko:</span>
                    <span className="font-mono text-orange-300 font-bold">
                      {shelterInfo?.pic_phone || '117 (BNPB)'}
                    </span>
                  </div>
                  <Link
                    href={`/?lat=${shelterInfo?.latitude}&lng=${shelterInfo?.longitude}`}
                    className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 hover:text-emerald-300 font-semibold"
                  >
                    Lihat Peta <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State / Not Found Call-to-Action */
        <div className="bg-[#121c2e] border border-orange-950/60 rounded-2xl p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-4 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-red-600/20 border border-red-500/30 flex items-center justify-center mx-auto text-red-400">
            <UserX className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white font-mono">
              Data Belum Ditemukan di Posko Pengungsian
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1.5 leading-relaxed">
              Nama &ldquo;<strong className="text-orange-400">{searchQuery}</strong>&rdquo; belum tercatat di manifes Posko A, B, maupun C. Mohon segera daftarkan laporan orang hilang agar tim SAR dan relawan posko dapat melakukan pencarian terpadu.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href={`/lapor?nama=${encodeURIComponent(searchQuery)}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold shadow-lg shadow-red-600/30 transition-all hover:scale-105"
            >
              <AlertCircle className="w-4 h-4" />
              Ajukan Laporan Orang Hilang Sekarang
            </Link>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedShelterId('ALL');
              }}
              className="px-5 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs font-medium border border-slate-700"
            >
              Reset Pencarian
            </button>
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
        <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-400 font-mono text-sm">
          <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
          <span>Memuat antarmuka pencarian...</span>
        </div>
      }
    >
      <PoskoContent />
    </Suspense>
  );
}
