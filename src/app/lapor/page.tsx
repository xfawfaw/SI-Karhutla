'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Send, CheckCircle2, Search, AlertCircle, Loader2, ShieldAlert } from 'lucide-react';
import { MissingReport } from '@/types';

function LaporContent() {
  const searchParams = useSearchParams();
  const initialName = searchParams.get('nama') || '';

  const [reporterName, setReporterName] = useState('');
  const [reporterPhone, setReporterPhone] = useState('');
  const [victimName, setVictimName] = useState(initialName);
  const [victimAge, setVictimAge] = useState('');
  const [lastSeenLocation, setLastSeenLocation] = useState('');
  const [description, setDescription] = useState('');
  
  const [submitting, setSubmitting] = useState(false);
  const [successReport, setSuccessReport] = useState<MissingReport | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const [ticketSearch, setTicketSearch] = useState('');
  const [lookupReport, setLookupReport] = useState<MissingReport | null>(null);
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupError, setLookupError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!reporterName || !reporterPhone || !victimName || !lastSeenLocation) {
      setErrorMessage('Harap isi seluruh kolom wajib bertanda (*)');
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reporter_name: reporterName,
          reporter_phone: reporterPhone,
          victim_name: victimName,
          victim_age: victimAge ? Number(victimAge) : 0,
          last_seen_location: lastSeenLocation,
          description,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Gagal mengirim laporan');
      }

      setSuccessReport(data.data);
    } catch (err: any) {
      setErrorMessage(err.message || 'Terjadi kesalahan sistem.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleTicketLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSearch.trim()) return;

    try {
      setLookupLoading(true);
      setLookupError('');
      setLookupReport(null);

      const res = await fetch(`/api/reports?ticket=${encodeURIComponent(ticketSearch.trim())}`);
      const data = await res.json();

      if (!res.ok || !data.success) {
        setLookupError(data.error || 'Nomor tiket tidak ditemukan dalam sistem.');
        return;
      }

      setLookupReport(data.data);
    } catch (err: any) {
      setLookupError('Gagal memverifikasi tiket.');
    } finally {
      setLookupLoading(false);
    }
  };

  const getStatusBadge = (status: MissingReport['status']) => {
    switch (status) {
      case 'PENDING_VERIFICATION':
        return { label: 'MENUNGGU VERIFIKASI', bg: 'bg-[#ffde59] text-black' };
      case 'VERIFIED_MISSING':
        return { label: 'DALAM PENCARIAN SAR', bg: 'bg-[#eb3b5a] text-white' };
      case 'FOUND_AT_SHELTER':
        return { label: 'DITEMUKAN DI POSKO', bg: 'bg-[#20bf6b] text-black' };
      case 'REJECTED':
        return { label: 'DITOLAK / DUPLIKAT', bg: 'bg-black text-white' };
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1 font-mono text-black">
      {/* Title */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="bg-[#eb3b5a] text-white font-mono font-bold text-xs uppercase px-2.5 py-0.5 border-2 border-black shadow-brutal-sm">
            ★ VERIFIKASI SATU PINTU
          </span>
          <span className="bg-[#ffde59] text-black font-mono font-bold text-xs uppercase px-2.5 py-0.5 border-2 border-black shadow-brutal-sm">
            ANTI-MISINFORMASI DARURAT
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight uppercase text-black">
          FORMULIR LAPOR ORANG HILANG & LACAK TIKET
        </h1>
        <p className="text-xs sm:text-sm text-slate-800 mt-1 max-w-2xl font-mono">
          Seluruh laporan akan diverifikasi langsung oleh petugas posko lapangan sebelum ditayangkan secara publik.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form (2 cols) */}
        <div className="lg:col-span-2">
          {successReport ? (
            <div className="bg-white border-3 border-black p-6 sm:p-8 shadow-brutal space-y-5">
              <div className="flex items-center gap-2 text-black font-display text-2xl font-black">
                <span className="w-8 h-8 bg-[#20bf6b] border-2 border-black shadow-brutal-sm flex items-center justify-center text-black">
                  ✓
                </span>
                <span>LAPORAN BERHASIL DISIMPAN!</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-800">
                Laporan Anda telah tercatat di antrean moderasi posko darurat. Simpan kode tiket berikut:
              </p>

              <div className="bg-[#ffde59] border-3 border-black p-5 text-center shadow-brutal">
                <span className="text-xs font-bold block mb-1 text-black uppercase">KODE TIKET PELAPORAN RESMI:</span>
                <span className="text-3xl sm:text-4xl font-black font-display tracking-wider text-black">
                  {successReport.ticket_code}
                </span>
              </div>

              <div className="p-3 bg-[#f4f0e8] border-2 border-black text-xs text-slate-800">
                <strong>Catatan Alur:</strong> Status laporan saat ini adalah <span className="bg-[#ffde59] font-bold px-1 border border-black">PENDING_VERIFICATION</span>. Petugas Posko A, B, atau C akan mencocokkan identitas penyintas di lapangan.
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  onClick={() => {
                    setSuccessReport(null);
                    setVictimName('');
                    setVictimAge('');
                    setLastSeenLocation('');
                    setDescription('');
                  }}
                  className="px-5 py-2.5 bg-[#ff5722] text-white font-bold border-2 border-black shadow-brutal brutal-btn text-xs"
                >
                  BUAT LAPORAN LAIN
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white border-3 border-black p-6 sm:p-8 shadow-brutal space-y-6 text-xs">
              {errorMessage && (
                <div className="bg-[#eb3b5a] text-white font-bold border-2 border-black p-3 shadow-brutal-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 stroke-[3]" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Pelapor Section */}
              <div className="space-y-3">
                <h3 className="font-black text-sm uppercase bg-[#ffde59] text-black px-2 py-1 border-2 border-black inline-block shadow-brutal-sm">
                  1. IDENTITAS PELAPOR / KELUARGA
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-black mb-1">NAMA LENGKAP PELAPOR *</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Surya Silalahi"
                      value={reporterName}
                      onChange={(e) => setReporterName(e.target.value)}
                      className="w-full bg-[#f4f0e8] border-2 border-black px-3 py-2.5 font-bold text-black focus:outline-none focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-black mb-1">NO. WHATSAPP / TELEPON *</label>
                    <input
                      type="tel"
                      required
                      placeholder="Contoh: 0812-9988-7766"
                      value={reporterPhone}
                      onChange={(e) => setReporterPhone(e.target.value)}
                      className="w-full bg-[#f4f0e8] border-2 border-black px-3 py-2.5 font-bold text-black focus:outline-none focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Korban Section */}
              <div className="space-y-3">
                <h3 className="font-black text-sm uppercase bg-[#20bf6b] text-black px-2 py-1 border-2 border-black inline-block shadow-brutal-sm">
                  2. IDENTITAS KERABAT YANG DICARI
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block font-bold text-black mb-1">NAMA LENGKAP KORBAN *</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Farel Silalahi"
                      value={victimName}
                      onChange={(e) => setVictimName(e.target.value)}
                      className="w-full bg-[#f4f0e8] border-2 border-black px-3 py-2.5 font-bold text-black focus:outline-none focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-black mb-1">PERKIRAAN USIA (THN)</label>
                    <input
                      type="number"
                      placeholder="Contoh: 34"
                      value={victimAge}
                      onChange={(e) => setVictimAge(e.target.value)}
                      className="w-full bg-[#f4f0e8] border-2 border-black px-3 py-2.5 font-bold text-black focus:outline-none focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-black mb-1">LOKASI TERAKHIR TERLIHAT / DESA ASAL *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Dusun 2 Rimbo Panjang dekat batas kebun gambut"
                    value={lastSeenLocation}
                    onChange={(e) => setLastSeenLocation(e.target.value)}
                    className="w-full bg-[#f4f0e8] border-2 border-black px-3 py-2.5 font-bold text-black focus:outline-none focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-black mb-1">CIRI-CIRI FISIK & PAKAIAN TERAKHIR</label>
                  <textarea
                    rows={2}
                    placeholder="Tinggi 170cm, kaos abu-abu, celana pendek..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-[#f4f0e8] border-2 border-black px-3 py-2.5 font-bold text-black focus:outline-none focus:bg-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 bg-[#ff5722] text-white font-display text-lg tracking-wider font-black border-2 border-black shadow-brutal brutal-btn flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    MENYIMPAN TIKET...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 stroke-[2.5]" />
                    KIRIM LAPORAN RESMI
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Sidebar: Lacak Tiket */}
        <div>
          <div className="bg-white border-3 border-black p-5 shadow-brutal space-y-4">
            <h3 className="font-display text-xl font-black uppercase flex items-center gap-2 border-b-2 border-black pb-2">
              <Search className="w-5 h-5 text-[#ff5722] stroke-[3]" />
              LACAK STATUS TIKET
            </h3>
            <p className="text-xs text-slate-700">
              Masukkan nomor tiket yang Anda dapatkan saat melapor untuk memeriksa status verifikasi posko:
            </p>

            <form onSubmit={handleTicketLookup} className="space-y-2">
              <input
                type="text"
                placeholder="CONTOH: TKT-2026-8910"
                value={ticketSearch}
                onChange={(e) => setTicketSearch(e.target.value)}
                className="w-full bg-[#f4f0e8] border-2 border-black px-3 py-2.5 text-xs font-black uppercase text-black focus:outline-none focus:bg-white"
              />
              <button
                type="submit"
                disabled={lookupLoading}
                className="w-full py-2.5 bg-[#ffde59] text-black font-black border-2 border-black shadow-brutal-sm brutal-btn transition-colors text-xs"
              >
                {lookupLoading ? 'MEMERIKSA...' : 'CEK STATUS TIKET'}
              </button>
            </form>

            {lookupError && (
              <div className="p-2.5 bg-[#eb3b5a] text-white font-bold border-2 border-black text-xs">
                {lookupError}
              </div>
            )}

            {lookupReport && (
              <div className="p-3.5 bg-[#f4f0e8] border-2 border-black space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-black">{lookupReport.ticket_code}</span>
                  <span className={`px-2 py-0.5 border border-black font-black text-[10px] ${getStatusBadge(lookupReport.status).bg}`}>
                    {getStatusBadge(lookupReport.status).label}
                  </span>
                </div>
                <div className="font-bold text-sm text-black uppercase">
                  {lookupReport.victim_name} ({lookupReport.victim_age} Thn)
                </div>
                {lookupReport.matched_shelter_name && (
                  <div className="bg-[#20bf6b] text-black p-2 border border-black font-bold text-[11px]">
                    ✓ Berada di: {lookupReport.matched_shelter_name}
                  </div>
                )}
                {lookupReport.officer_notes && (
                  <p className="text-[11px] text-slate-700 italic">
                    Catatan: {lookupReport.officer_notes}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LaporPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 flex justify-center items-center gap-2 font-mono font-bold text-sm">
          <Loader2 className="w-6 h-6 animate-spin text-black" />
          <span>MEMUAT GERBANG LAPOR...</span>
        </div>
      }
    >
      <LaporContent />
    </Suspense>
  );
}
