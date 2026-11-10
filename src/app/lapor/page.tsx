'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Send, CheckCircle2, Search, AlertCircle, Loader2 } from 'lucide-react';
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
        setLookupError(data.error || 'Nomor tiket tidak ditemukan.');
        return;
      }

      setLookupReport(data.data);
    } catch (err: any) {
      setLookupError('Gagal memverifikasi tiket.');
    } finally {
      setLookupLoading(false);
    }
  };

  const getStatusText = (status: MissingReport['status']) => {
    switch (status) {
      case 'PENDING_VERIFICATION':
        return { label: 'Menunggu Verifikasi Petugas', color: 'text-amber-400' };
      case 'VERIFIED_MISSING':
        return { label: 'Terverifikasi Hilang (Pencarian SAR)', color: 'text-red-400' };
      case 'FOUND_AT_SHELTER':
        return { label: 'Ditemukan di Posko Pengungsian', color: 'text-emerald-400' };
      case 'REJECTED':
        return { label: 'Ditolak / Duplikat', color: 'text-slate-400' };
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-white font-mono tracking-tight">
          Lapor Orang Hilang & Cek Tiket
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Laporan diverifikasi petugas posko sebelum diumumkan ke publik untuk mencegah misinformasi.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Column */}
        <div className="lg:col-span-2">
          {successReport ? (
            <div className="bg-[#0f172a] border border-slate-800 rounded-lg p-6 space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-sm font-bold">
                <CheckCircle2 className="w-5 h-5" />
                <span>Laporan Berhasil Diterima</span>
              </div>
              <p className="text-xs text-slate-300">
                Laporan Anda telah terdaftar dalam antrean verifikasi petugas posko lapangan.
              </p>

              <div className="bg-slate-900 border border-slate-800 rounded p-4 font-mono">
                <span className="text-xs text-slate-400 block mb-1">Kode Tiket Pelaporan:</span>
                <span className="text-2xl font-bold text-orange-400">{successReport.ticket_code}</span>
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
                  className="px-4 py-2 rounded bg-orange-600 hover:bg-orange-500 text-white font-mono text-xs font-bold transition-colors"
                >
                  Ajukan Laporan Lain
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-[#0f172a] border border-slate-800 rounded-lg p-6 space-y-5 font-mono text-xs">
              {errorMessage && (
                <div className="bg-red-950/60 border border-red-800 rounded p-3 text-red-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Data Pelapor */}
              <div className="space-y-3">
                <h3 className="font-bold text-slate-200 border-b border-slate-800 pb-1">
                  1. Data Pelapor
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1">Nama Pelapor *</label>
                    <input
                      type="text"
                      required
                      placeholder="Nama lengkap..."
                      value={reporterName}
                      onChange={(e) => setReporterName(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">No. Kontak / HP *</label>
                    <input
                      type="tel"
                      required
                      placeholder="0812-XXXX-XXXX"
                      value={reporterPhone}
                      onChange={(e) => setReporterPhone(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>
              </div>

              {/* Data Korban */}
              <div className="space-y-3">
                <h3 className="font-bold text-slate-200 border-b border-slate-800 pb-1">
                  2. Identitas Kerabat yang Dicari
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-slate-400 mb-1">Nama Korban *</label>
                    <input
                      type="text"
                      required
                      placeholder="Nama kerabat..."
                      value={victimName}
                      onChange={(e) => setVictimName(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Usia (Tahun)</label>
                    <input
                      type="number"
                      placeholder="35"
                      value={victimAge}
                      onChange={(e) => setVictimAge(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Lokasi Terakhir Terlihat *</label>
                  <input
                    type="text"
                    required
                    placeholder="Desa / kecamatan / perkebunan..."
                    value={lastSeenLocation}
                    onChange={(e) => setLastSeenLocation(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Ciri-ciri Fisik / Pakaian Terakhir</label>
                  <textarea
                    rows={2}
                    placeholder="Warna baju, tinggi badan, tanda khusus..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-2.5 rounded bg-orange-600 hover:bg-orange-500 text-white font-bold flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Kirim Laporan
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Sidebar: Ticket Tracking */}
        <div>
          <div className="bg-[#0f172a] border border-slate-800 rounded-lg p-5 space-y-3 font-mono text-xs">
            <h3 className="font-bold text-white flex items-center gap-1.5">
              <Search className="w-4 h-4 text-orange-400" />
              Lacak Status Tiket
            </h3>
            <p className="text-slate-400 text-[11px]">
              Masukkan kode tiket pelaporan untuk memantau status verifikasi posko.
            </p>

            <form onSubmit={handleTicketLookup} className="space-y-2">
              <input
                type="text"
                placeholder="Contoh: TKT-2026-8910"
                value={ticketSearch}
                onChange={(e) => setTicketSearch(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white uppercase focus:outline-none focus:border-orange-500"
              />
              <button
                type="submit"
                disabled={lookupLoading}
                className="w-full py-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold transition-colors"
              >
                {lookupLoading ? 'Memeriksa...' : 'Cek Status'}
              </button>
            </form>

            {lookupError && (
              <div className="p-2.5 rounded bg-red-950/40 border border-red-800 text-[11px] text-red-300">
                {lookupError}
              </div>
            )}

            {lookupReport && (
              <div className="p-3 rounded bg-slate-900 border border-slate-800 space-y-1.5 mt-2 text-[11px]">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">{lookupReport.ticket_code}</span>
                  <span className={`font-bold ${getStatusText(lookupReport.status).color}`}>
                    {getStatusText(lookupReport.status).label}
                  </span>
                </div>
                <div className="text-white font-bold">{lookupReport.victim_name}</div>
                {lookupReport.matched_shelter_name && (
                  <div className="text-emerald-400 pt-1 border-t border-slate-800">
                    Posko: {lookupReport.matched_shelter_name}
                  </div>
                )}
                {lookupReport.officer_notes && (
                  <div className="text-slate-400 italic">
                    Catatan: {lookupReport.officer_notes}
                  </div>
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
        <div className="py-16 flex justify-center text-slate-500 font-mono text-xs">
          <Loader2 className="w-5 h-5 animate-spin text-orange-500" />
        </div>
      }
    >
      <LaporContent />
    </Suspense>
  );
}
