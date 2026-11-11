'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Send, CheckCircle2, Search, AlertCircle, Loader2, ShieldAlert, ArrowRight, UserCheck } from 'lucide-react';
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
      setErrorMessage('Harap lengkapi seluruh kolom bertanda (*)');
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
      setErrorMessage(err.message || 'Terjadi gangguan sistem.');
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
        setLookupError(data.error || 'Nomor tiket tidak terdaftar dalam basis data.');
        return;
      }

      setLookupReport(data.data);
    } catch (err: any) {
      setLookupError('Gagal memeriksa status tiket.');
    } finally {
      setLookupLoading(false);
    }
  };

  const getStatusBadge = (status: MissingReport['status']) => {
    switch (status) {
      case 'PENDING_VERIFICATION':
        return { label: 'MENUNGGU VERIFIKASI', bg: 'bg-[#e6a73c] text-[#121212]' };
      case 'VERIFIED_MISSING':
        return { label: 'PENCARIAN TIM SAR', bg: 'bg-[#dc5645] text-white' };
      case 'FOUND_AT_SHELTER':
        return { label: 'DITEMUKAN DI POSKO', bg: 'bg-[#20bf6b] text-white' };
      case 'REJECTED':
        return { label: 'DITOLAK / DUPLIKAT', bg: 'bg-[#121212] text-white' };
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full flex-1 text-[#121212]">
      {/* Hero Header (Muse Group style: description merged with background) */}
      <div className="mb-10">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="sticker-badge bg-[#dc5645] text-white">
            ★ VERIFIKASI SATU PINTU
          </span>
          <span className="sticker-badge bg-[#e6a73c] text-[#121212]">
            ANTI-MISINFORMASI DARURAT
          </span>
          <span className="sticker-badge bg-[#4392f1] text-white">
            POSKO SATGAS 2026
          </span>
        </div>
        <h1 className="font-muse text-5xl sm:text-7xl tracking-tight uppercase text-[#121212] leading-none">
          FORMULIR LAPOR ORANG HILANG & LACAK TIKET
        </h1>
        <p className="text-base sm:text-lg text-slate-700 font-sans mt-3 max-w-3xl leading-relaxed">
          Layanan pelaporan publik untuk membantu pencarian keluarga yang terpisah saat evakuasi kebakaran hutan. Seluruh data diverifikasi langsung oleh petugas posko lapangan sebelum dipublikasikan.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form (2 cols) - Seamless borderless card */}
        <div className="lg:col-span-2">
          {successReport ? (
            <div className="rounded-3xl bg-white p-8 sm:p-12 shadow-md space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#20bf6b] flex items-center justify-center text-white">
                  <CheckCircle2 className="w-6 h-6 stroke-[3]" />
                </div>
                <div>
                  <h2 className="font-muse text-2xl sm:text-3xl tracking-tight uppercase text-[#121212]">
                    LAPORAN BERHASIL TERCATAT!
                  </h2>
                  <p className="text-xs text-slate-500 font-mono">
                    Data telah masuk ke meja moderasi posko lapangan.
                  </p>
                </div>
              </div>

              <p className="text-sm text-slate-700 font-sans leading-relaxed">
                Simpan atau catat kode tiket resmi di bawah ini. Anda dapat menggunakan kode ini sewaktu-waktu untuk mengecek perkembangan pencarian korban di posko penampungan.
              </p>

              <div className="rounded-2xl bg-[#e6a73c] p-6 text-center">
                <span className="text-xs font-mono font-bold block mb-1 text-[#121212] uppercase tracking-wider">
                  KODE TIKET PELAPORAN RESMI
                </span>
                <span className="font-muse text-3xl sm:text-5xl tracking-widest text-[#121212]">
                  {successReport.ticket_code}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[#f5f2eb] text-xs font-mono text-slate-700">
                <strong>Status Saat Ini:</strong>{' '}
                <span className="px-2 py-0.5 rounded-full bg-[#e6a73c] font-bold text-[#121212]">
                  PENDING_VERIFICATION
                </span>{' '}
                • Petugas di Posko A, B, atau C sedang melakukan pencocokan data fisik penyintas di lapangan.
              </div>

              <div className="pt-2 flex gap-4">
                <button
                  onClick={() => {
                    setSuccessReport(null);
                    setVictimName('');
                    setVictimAge('');
                    setLastSeenLocation('');
                    setDescription('');
                  }}
                  className="pill-btn-coral py-3 px-6 text-sm"
                >
                  BUAT LAPORAN LAIN
                </button>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl bg-white p-6 sm:p-10 shadow-sm space-y-6"
            >
              {errorMessage && (
                <div className="rounded-2xl bg-[#dc5645] text-white font-mono font-bold text-xs p-3.5 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 stroke-[3]" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* 1. Pelapor Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#dc5645] text-white flex items-center justify-center font-mono font-bold text-xs">
                    1
                  </span>
                  <h3 className="font-muse text-xl uppercase tracking-wider text-[#121212]">
                    IDENTITAS PELAPOR / KELUARGA
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-sans font-bold text-xs uppercase tracking-wide text-slate-700 mb-1.5">
                      NAMA LENGKAP PELAPOR *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Surya Silalahi"
                      value={reporterName}
                      onChange={(e) => setReporterName(e.target.value)}
                      className="w-full rounded-2xl bg-[#f5f2eb] px-4 py-3 text-sm font-sans focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#dc5645] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block font-sans font-bold text-xs uppercase tracking-wide text-slate-700 mb-1.5">
                      NO. WHATSAPP / TELEPON *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Contoh: 0812-9988-7766"
                      value={reporterPhone}
                      onChange={(e) => setReporterPhone(e.target.value)}
                      className="w-full rounded-2xl bg-[#f5f2eb] px-4 py-3 text-sm font-sans focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#dc5645] transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Victim Info */}
              <div className="space-y-4 pt-4 border-t border-black/5">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#20bf6b] text-white flex items-center justify-center font-mono font-bold text-xs">
                    2
                  </span>
                  <h3 className="font-muse text-xl uppercase tracking-wider text-[#121212]">
                    IDENTITAS KERABAT YANG DICARI
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block font-sans font-bold text-xs uppercase tracking-wide text-slate-700 mb-1.5">
                      NAMA LENGKAP KORBAN *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Farel Silalahi"
                      value={victimName}
                      onChange={(e) => setVictimName(e.target.value)}
                      className="w-full rounded-2xl bg-[#f5f2eb] px-4 py-3 text-sm font-sans focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#dc5645] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block font-sans font-bold text-xs uppercase tracking-wide text-slate-700 mb-1.5">
                      PERKIRAAN USIA (THN)
                    </label>
                    <input
                      type="number"
                      placeholder="Contoh: 34"
                      value={victimAge}
                      onChange={(e) => setVictimAge(e.target.value)}
                      className="w-full rounded-2xl bg-[#f5f2eb] px-4 py-3 text-sm font-sans focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#dc5645] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-sans font-bold text-xs uppercase tracking-wide text-slate-700 mb-1.5">
                    LOKASI TERAKHIR TERLIHAT / DESA ASAL *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Dusun 2 Rimbo Panjang dekat perbatasan kebun gambut"
                    value={lastSeenLocation}
                    onChange={(e) => setLastSeenLocation(e.target.value)}
                    className="w-full rounded-2xl bg-[#f5f2eb] px-4 py-3 text-sm font-sans focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#dc5645] transition-all"
                  />
                </div>

                <div>
                  <label className="block font-sans font-bold text-xs uppercase tracking-wide text-slate-700 mb-1.5">
                    CIRI-CIRI FISIK & PAKAIAN TERAKHIR
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Contoh: Tinggi ~170cm, kaos abu-abu, celana pendek hitam, ada luka di lengan kiri..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full rounded-2xl bg-[#f5f2eb] px-4 py-3 text-sm font-sans focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#dc5645] transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="pill-btn-coral w-full py-4 text-sm font-muse uppercase tracking-wider justify-center disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>MENYIMPAN LAPORAN...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 stroke-[2.5]" />
                    <span>KIRIM LAPORAN RESMI KE POSKO SATGAS</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Sidebar: Lacak Status Tiket (1 col) */}
        <div>
          <div className="rounded-3xl bg-white p-7 shadow-sm space-y-5 sticky top-24">
            <div className="flex items-center gap-2.5 pb-2">
              <div className="w-8 h-8 rounded-xl bg-[#121212] flex items-center justify-center text-white">
                <Search className="w-4 h-4 stroke-[3]" />
              </div>
              <h3 className="font-muse text-2xl tracking-tight uppercase text-[#121212]">
                LACAK STATUS TIKET
              </h3>
            </div>

            <p className="text-xs text-slate-600 font-sans leading-relaxed">
              Ketikkan nomor tiket laporan untuk memantau apakah korban telah diverifikasi tim SAR atau ditemukan di posko:
            </p>

            <form onSubmit={handleTicketLookup} className="space-y-3">
              <input
                type="text"
                placeholder="CONTOH: TKT-2026-8910"
                value={ticketSearch}
                onChange={(e) => setTicketSearch(e.target.value)}
                className="w-full rounded-2xl bg-[#f5f2eb] px-4 py-3 text-xs font-mono font-bold uppercase text-[#121212] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#121212]"
              />
              <button
                type="submit"
                disabled={lookupLoading}
                className="pill-btn-black w-full py-3 text-xs font-muse tracking-wider uppercase justify-center disabled:opacity-50"
              >
                {lookupLoading ? 'MEMERIKSA...' : 'PERIKSA STATUS TIKET'}
              </button>
            </form>

            {lookupError && (
              <div className="p-3 rounded-2xl bg-[#dc5645] text-white font-mono font-bold text-xs">
                {lookupError}
              </div>
            )}

            {lookupReport && (
              <div className="p-4 rounded-2xl bg-[#f5f2eb] space-y-3 text-xs font-mono">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-[#121212]">{lookupReport.ticket_code}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full font-black text-[10px] ${
                      getStatusBadge(lookupReport.status).bg
                    }`}
                  >
                    {getStatusBadge(lookupReport.status).label}
                  </span>
                </div>

                <div className="font-muse text-lg font-bold text-[#121212] uppercase">
                  {lookupReport.victim_name} ({lookupReport.victim_age} Thn)
                </div>

                {lookupReport.matched_shelter_name && (
                  <div className="bg-[#20bf6b] text-white p-2.5 rounded-xl font-bold text-[11px] flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Ditemukan di: {lookupReport.matched_shelter_name}</span>
                  </div>
                )}

                {lookupReport.officer_notes && (
                  <p className="text-[11px] text-slate-700 italic bg-white p-2.5 rounded-xl">
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
        <div className="py-24 flex justify-center items-center gap-3 font-mono font-bold text-sm">
          <Loader2 className="w-6 h-6 animate-spin text-[#dc5645]" />
          <span>MEMUAT GERBANG PELAPORAN...</span>
        </div>
      }
    >
      <LaporContent />
    </Suspense>
  );
}
