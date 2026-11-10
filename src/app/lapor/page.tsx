'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ShieldAlert, Send, CheckCircle2, Search, Clock, ShieldCheck, MapPin, AlertCircle, Loader2 } from 'lucide-react';
import { MissingReport } from '@/types';

function LaporContent() {
  const searchParams = useSearchParams();
  const initialName = searchParams.get('nama') || '';

  // Form states
  const [reporterName, setReporterName] = useState('');
  const [reporterPhone, setReporterPhone] = useState('');
  const [victimName, setVictimName] = useState(initialName);
  const [victimAge, setVictimAge] = useState('');
  const [lastSeenLocation, setLastSeenLocation] = useState('');
  const [description, setDescription] = useState('');
  
  const [submitting, setSubmitting] = useState(false);
  const [successReport, setSuccessReport] = useState<MissingReport | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Ticket Lookup states
  const [ticketSearch, setTicketSearch] = useState('');
  const [lookupReport, setLookupReport] = useState<MissingReport | null>(null);
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupError, setLookupError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!reporterName || !reporterPhone || !victimName || !lastSeenLocation) {
      setErrorMessage('Harap lengkapi semua kolom wajib bertanda (*)');
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
      setErrorMessage(err.message || 'Terjadi kesalahan sistem saat mengirim laporan.');
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
      setLookupError('Gagal memverifikasi status tiket.');
    } finally {
      setLookupLoading(false);
    }
  };

  const getStatusBadge = (status: MissingReport['status']) => {
    switch (status) {
      case 'PENDING_VERIFICATION':
        return {
          label: 'Menunggu Verifikasi Petugas',
          className: 'bg-amber-950/80 text-amber-400 border-amber-800',
        };
      case 'VERIFIED_MISSING':
        return {
          label: 'Terverifikasi Hilang (Pencarian Lapangan)',
          className: 'bg-red-950/80 text-red-400 border-red-800',
        };
      case 'FOUND_AT_SHELTER':
        return {
          label: 'Ditemukan di Posko Pengungsian',
          className: 'bg-emerald-950/80 text-emerald-400 border-emerald-800',
        };
      case 'REJECTED':
        return {
          label: 'Laporan Ditolak / Duplikat',
          className: 'bg-slate-800 text-slate-400 border-slate-700',
        };
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-600/20 text-red-400 border border-red-500/30 uppercase tracking-wider">
            GERBANG LAPOR DARURAT
          </span>
          <span className="text-xs text-slate-400 font-mono">
            Verifikasi Satu Pintu Satgas Bencana BNPB
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
          Formulir Pengajuan Lapor Orang Hilang
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
          Keluarga yang terpisah akibat kebakaran hutan dapat mengajukan laporan resmi. Demi mencegah misinformasi, seluruh laporan akan divalidasi oleh petugas posko sebelum diumumkan ke publik.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {successReport ? (
            /* Submission Success Card */
            <div className="bg-[#101726] border border-emerald-500/50 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-5 animate-in fade-in">
              <div className="w-14 h-14 rounded-full bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white font-mono">
                  Laporan Berhasil Diajukan!
                </h2>
                <p className="text-xs text-slate-300 mt-1">
                  Laporan Anda telah masuk ke antrean verifikasi petugas posko darurat.
                </p>
              </div>

              {/* Ticket Code Display */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 font-mono space-y-2">
                <span className="text-xs text-slate-400 block">KODE TIKET PELAPORAN ANDA:</span>
                <div className="text-2xl sm:text-3xl font-black text-orange-400 tracking-wider">
                  {successReport.ticket_code}
                </div>
                <p className="text-[11px] text-slate-500">
                  Simpan kode tiket ini untuk memantau status pembaruan laporan Anda.
                </p>
              </div>

              <div className="bg-amber-950/30 border border-amber-900/50 rounded-lg p-3 text-xs text-amber-200 space-y-1">
                <strong className="block font-semibold">ℹ️ Catatan Moderasi:</strong>
                <p className="text-[11px] leading-relaxed text-amber-300/90">
                  Nama korban belum langsung tayang di pencarian publik hingga petugas Posko A, B, atau C mencocokkan identitas fisik korban di lokasi evakuasi.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    setSuccessReport(null);
                    setVictimName('');
                    setVictimAge('');
                    setLastSeenLocation('');
                    setDescription('');
                  }}
                  className="px-5 py-2.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-mono text-xs font-bold transition-colors"
                >
                  Ajukan Laporan Lain
                </button>
                <button
                  onClick={() => {
                    setTicketSearch(successReport.ticket_code);
                  }}
                  className="px-5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs border border-slate-700 transition-colors"
                >
                  Cek Status Tiket Ini
                </button>
              </div>
            </div>
          ) : (
            /* Submission Input Form */
            <form
              onSubmit={handleSubmit}
              className="bg-[#101726] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6"
            >
              {errorMessage && (
                <div className="bg-red-950/60 border border-red-800 rounded-lg p-3.5 flex items-center gap-2.5 text-xs text-red-200">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Reporter Section */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold font-mono text-orange-400 uppercase tracking-wider border-b border-slate-800 pb-2">
                  1. Data Pelapor / Keluarga
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      Nama Lengkap Pelapor *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Surya Silalahi"
                      value={reporterName}
                      onChange={(e) => setReporterName(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      No. WhatsApp / HP Pelapor *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Contoh: 0812-9988-7766"
                      value={reporterPhone}
                      onChange={(e) => setReporterPhone(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>
              </div>

              {/* Victim Section */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold font-mono text-orange-400 uppercase tracking-wider border-b border-slate-800 pb-2">
                  2. Identitas Kerabat yang Hilang
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      Nama Lengkap Korban *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Farel Silalahi"
                      value={victimName}
                      onChange={(e) => setVictimName(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      Perkiraan Usia (Tahun)
                    </label>
                    <input
                      type="number"
                      placeholder="Contoh: 34"
                      value={victimAge}
                      onChange={(e) => setVictimAge(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Lokasi Terakhir Terlihat / Alamat Asal *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Dusun 2 Desa Rimbo Panjang dekat perbatasan kebun gambut"
                    value={lastSeenLocation}
                    onChange={(e) => setLastSeenLocation(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Ciri-ciri Khusus & Pakaian Terakhir
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Contoh: Tinggi 170cm, kaos abu-abu, kacamata hitam, bekas luka di dahi..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-mono text-sm font-bold shadow-lg shadow-orange-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Mendaftarkan Tiket ke Sistem Antrean...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Kirim Laporan Orang Hilang
                    </>
                  )}
                </button>
                <p className="text-[11px] text-slate-500 text-center font-mono mt-2">
                  Data dilindungi oleh kebijakan privasi tanggap darurat BNPB.
                </p>
              </div>
            </form>
          )}
        </div>

        {/* Sidebar: Ticket Status Checker & Security Explainer */}
        <div className="space-y-6">
          {/* Ticket Tracking Widget */}
          <div className="bg-[#101726] border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
              <Search className="w-4 h-4 text-orange-400" />
              <h3 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                Lacak Status Tiket
              </h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Sudah memiliki nomor tiket pelaporan? Masukkan kode tiket untuk mengecek pembaruan verifikasi posko.
            </p>

            <form onSubmit={handleTicketLookup} className="space-y-2">
              <input
                type="text"
                placeholder="Contoh: TKT-2026-8910"
                value={ticketSearch}
                onChange={(e) => setTicketSearch(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white font-mono uppercase focus:outline-none focus:border-orange-500"
              />
              <button
                type="submit"
                disabled={lookupLoading}
                className="w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-mono text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
              >
                {lookupLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Periksa Tiket'}
              </button>
            </form>

            {lookupError && (
              <div className="p-2.5 rounded bg-red-950/60 border border-red-800 text-[11px] text-red-300">
                {lookupError}
              </div>
            )}

            {lookupReport && (
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2 font-mono text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-500">{lookupReport.ticket_code}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${
                      getStatusBadge(lookupReport.status).className
                    }`}
                  >
                    {getStatusBadge(lookupReport.status).label}
                  </span>
                </div>
                <div>
                  <strong className="text-white text-sm block">{lookupReport.victim_name}</strong>
                  <span className="text-slate-400 text-[11px]">
                    Usia {lookupReport.victim_age} Thn • Terakhir: {lookupReport.last_seen_location}
                  </span>
                </div>
                {lookupReport.matched_shelter_name && (
                  <div className="pt-2 border-t border-slate-800 text-emerald-400 text-[11px]">
                    ✓ Berhasil ditemukan di: <strong>{lookupReport.matched_shelter_name}</strong>
                  </div>
                )}
                {lookupReport.officer_notes && (
                  <p className="text-slate-400 text-[10px] italic">
                    Catatan Petugas: {lookupReport.officer_notes}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Privacy & Moderation Gate Explainer */}
          <div className="bg-[#121c2e] border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3 text-xs">
            <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Proses Verifikasi Satu Pintu
            </h4>
            <div className="space-y-2 text-slate-400 leading-relaxed text-[11px]">
              <div className="flex gap-2">
                <span className="text-orange-400 font-mono font-bold">01.</span>
                <p>Masyarakat mengisi formulir lapor kerabat hilang dengan identitas jelas.</p>
              </div>
              <div className="flex gap-2">
                <span className="text-orange-400 font-mono font-bold">02.</span>
                <p>Data tersimpan di antrean tertutup dengan status <code className="text-amber-300">PENDING_VERIFICATION</code>.</p>
              </div>
              <div className="flex gap-2">
                <span className="text-orange-400 font-mono font-bold">03.</span>
                <p>Petugas posko lapangan mencocokkan laporan dengan manifes posko dan mengubah status menjadi <code className="text-emerald-300">FOUND_AT_SHELTER</code>.</p>
              </div>
              <div className="flex gap-2">
                <span className="text-orange-400 font-mono font-bold">04.</span>
                <p>Keluarga dapat langsung menemukan lokasi posko dan nomor PIC di pencarian publik.</p>
              </div>
            </div>
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
        <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-400 font-mono text-sm">
          <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
          <span>Memuat gerbang lapor darurat...</span>
        </div>
      }
    >
      <LaporContent />
    </Suspense>
  );
}
