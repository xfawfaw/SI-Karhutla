'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, CheckCircle2, AlertCircle, RefreshCw, Loader2, LogOut, PlusCircle, UserCheck } from 'lucide-react';
import { MissingReport, Shelter, HealthCondition } from '@/types';

export default function PetugasPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');
  const [authLoading, setAuthLoading] = useState<boolean>(false);

  // Dashboard Data
  const [reports, setReports] = useState<MissingReport[]>([]);
  const [shelters, setShelters] = useState<Shelter[]>([]);
  const [loadingData, setLoadingData] = useState<boolean>(false);
  const [actionMessage, setActionMessage] = useState<string>('');

  // Evacuee Intake Form
  const [intakeName, setIntakeName] = useState<string>('');
  const [intakeAge, setIntakeAge] = useState<string>('');
  const [intakeGender, setIntakeGender] = useState<'Laki-laki' | 'Perempuan'>('Laki-laki');
  const [intakeVillage, setIntakeVillage] = useState<string>('');
  const [intakeShelterId, setIntakeShelterId] = useState<number>(1);
  const [intakeHealth, setIntakeHealth] = useState<HealthCondition>('Sehat');
  const [intakeNotes, setIntakeNotes] = useState<string>('');
  const [intakeLoading, setIntakeLoading] = useState<boolean>(false);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (document.cookie.includes('si_karhutla_officer=authenticated')) {
        setIsAuthenticated(true);
      }
    }
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoadingData(true);
      const [resReports, resShelters] = await Promise.all([
        fetch('/api/reports').then((r) => r.json()),
        fetch('/api/shelters').then((r) => r.json()),
      ]);

      if (resReports.success) setReports(resReports.data);
      if (resShelters.success) setShelters(resShelters.data);
    } catch (err) {
      console.error('Error fetching dashboard data', err);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadDashboardData();
    }
  }, [isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setAuthError(data.error || 'Kata sandi tidak sesuai.');
        return;
      }

      setIsAuthenticated(true);
      setPassword('');
    } catch (err) {
      setAuthError('Gagal menghubungkan ke server.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth', { method: 'DELETE' });
    setIsAuthenticated(false);
  };

  const handleModerate = async (
    reportId: number,
    status: MissingReport['status'],
    shelterId?: number,
    notes?: string
  ) => {
    try {
      setActionMessage('');
      const res = await fetch(`/api/reports/${reportId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status,
          matched_shelter_id: shelterId,
          officer_notes: notes || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Gagal memverifikasi');
      }

      setActionMessage(`Laporan ${data.data.ticket_code} berhasil diperbarui!`);
      loadDashboardData();
    } catch (err: any) {
      setActionMessage(`Error: ${err.message}`);
    }
  };

  const handleIntakeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!intakeName || !intakeVillage) return;

    try {
      setIntakeLoading(true);
      const res = await fetch('/api/evacuees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: intakeName,
          age: Number(intakeAge) || 0,
          gender: intakeGender,
          origin_village: intakeVillage,
          shelter_id: intakeShelterId,
          health_condition: intakeHealth,
          notes: intakeNotes,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Gagal menyimpan');
      }

      setActionMessage(`Penyintas "${intakeName}" berhasil dicatat di manifes posko.`);
      setIntakeName('');
      setIntakeAge('');
      setIntakeVillage('');
      setIntakeNotes('');
      loadDashboardData();
    } catch (err: any) {
      setActionMessage(`Error: ${err.message}`);
    } finally {
      setIntakeLoading(false);
    }
  };

  const pendingReports = reports.filter((r) => r.status === 'PENDING_VERIFICATION');

  if (!isAuthenticated) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-12 text-[#121212]">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 sm:p-12 shadow-md space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-[#e6a73c] flex items-center justify-center mx-auto text-[#121212]">
              <Lock className="w-7 h-7 stroke-[2.5]" />
            </div>
            <h1 className="font-bebas text-4xl sm:text-5xl tracking-wider uppercase text-[#121212]">
              PORTAL PETUGAS POSKO
            </h1>
            <p className="text-xs text-slate-500 font-sans">
              Akses khusus petugas verifikasi darurat BNPB & relawan posko
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {authError && (
              <div className="rounded-2xl bg-[#dc5645] text-white font-mono font-bold text-xs p-3.5 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 stroke-[3]" />
                <span>{authError}</span>
              </div>
            )}

            <div>
              <label className="block font-sans font-bold text-xs uppercase tracking-wide text-slate-700 mb-1.5">
                KATA SANDI BERSAMA:
              </label>
              <input
                type="password"
                required
                placeholder="Masukkan kata sandi posko..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-2xl bg-[#f5f2eb] px-4 py-3 text-sm font-sans focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#dc5645] transition-all"
              />
              <span className="text-[11px] text-slate-500 mt-2 block font-mono">
                Sandi Bawaan: <strong className="bg-[#e6a73c] px-2 py-0.5 rounded-full text-[#121212]">poskosiaga2026</strong>
              </span>
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="pill-btn-coral w-full py-3.5 text-base font-bebas tracking-wider justify-center uppercase disabled:opacity-50"
            >
              {authLoading ? 'MEMVERIFIKASI...' : 'MASUK KE MEJA MODERASI'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full flex-1 space-y-8 text-[#121212]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="sticker-badge bg-[#20bf6b] text-white">
              AUTHORIZED OPERATOR
            </span>
            <span className="sticker-badge bg-[#e6a73c] text-[#121212]">
              SATGAS DARURAT 2026
            </span>
          </div>
          <h1 className="font-bebas text-5xl sm:text-7xl tracking-wider uppercase text-[#121212] leading-none">
            PANEL MODERASI LAPORAN & MANIFES POSKO
          </h1>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={loadDashboardData}
            className="pill-btn-black text-sm py-2 px-4"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loadingData ? 'animate-spin' : ''}`} />
            <span>SEGARKA DATA</span>
          </button>
          <button
            onClick={handleLogout}
            className="pill-btn-coral text-sm py-2 px-4"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>KELUAR</span>
          </button>
        </div>
      </div>

      {actionMessage && (
        <div className="p-4 rounded-2xl bg-[#20bf6b] text-white font-mono font-bold text-xs shadow-sm flex items-center justify-between">
          <span>✓ {actionMessage}</span>
          <button onClick={() => setActionMessage('')} className="font-black hover:opacity-80">
            ✕
          </button>
        </div>
      )}

      {/* Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Antrean Verifikasi (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bebas text-3xl sm:text-4xl tracking-wider uppercase flex items-center gap-2 text-[#121212]">
              <ShieldCheck className="w-6 h-6 text-[#dc5645]" />
              ANTEAN VERIFIKASI WARGA ({pendingReports.length} TIKET)
            </h2>
          </div>

          {loadingData ? (
            <div className="py-16 flex justify-center text-[#121212]">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
          ) : pendingReports.length === 0 ? (
            <div className="rounded-3xl bg-white p-12 text-center shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#20bf6b] text-white flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7 stroke-[3]" />
              </div>
              <h3 className="font-bebas text-3xl tracking-wider uppercase text-[#121212]">
                SEMUA LAPORAN BERHASIL DIMODERASI
              </h3>
              <p className="text-sm text-slate-600 font-sans">
                Tidak ada tiket tertahan dalam antrean verifikasi satgas.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingReports.map((report) => (
                <div
                  key={report.id}
                  className="rounded-3xl bg-white p-6 shadow-sm space-y-4"
                >
                  <div className="flex items-start justify-between gap-3 border-b border-black/5 pb-3">
                    <div>
                      <span className="sticker-badge bg-[#dc5645] text-white text-[10px] py-0 px-2">
                        {report.ticket_code}
                      </span>
                      <h3 className="font-bebas text-3xl uppercase mt-1 text-[#121212]">
                        {report.victim_name} (Usia ~{report.victim_age} Thn)
                      </h3>
                    </div>
                    <span className="sticker-badge bg-[#e6a73c] text-[#121212] text-[10px]">
                      PENDING VERIFIKASI
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#f5f2eb] space-y-1.5 text-xs font-mono text-slate-800">
                    <div>
                      <strong>Lokasi Terakhir Terlihat:</strong> {report.last_seen_location}
                    </div>
                    <div>
                      <strong>Pelapor:</strong> {report.reporter_name} ({report.reporter_phone})
                    </div>
                    {report.description && (
                      <div className="text-slate-600 italic pt-1.5 border-t border-black/5">
                        &ldquo;{report.description}&rdquo;
                      </div>
                    )}
                  </div>

                  {/* 1-Click Moderation Buttons */}
                  <div className="flex flex-wrap items-center gap-2 pt-1 font-bebas text-sm">
                    <button
                      onClick={() => handleModerate(report.id, 'FOUND_AT_SHELTER', 1, 'Tiba di Posko A')}
                      className="pill-btn-green py-1.5 px-3.5 text-xs"
                    >
                      DITEMUKAN DI POSKO A
                    </button>
                    <button
                      onClick={() => handleModerate(report.id, 'FOUND_AT_SHELTER', 2, 'Tiba di Posko B')}
                      className="pill-btn-green py-1.5 px-3.5 text-xs"
                    >
                      POSKO B
                    </button>
                    <button
                      onClick={() => handleModerate(report.id, 'FOUND_AT_SHELTER', 3, 'Tiba di Posko C')}
                      className="pill-btn-green py-1.5 px-3.5 text-xs"
                    >
                      POSKO C
                    </button>
                    <button
                      onClick={() => handleModerate(report.id, 'VERIFIED_MISSING', undefined, 'Pencarian aktif tim SAR')}
                      className="pill-btn-yellow py-1.5 px-3.5 text-xs"
                    >
                      VERIFIKASI TIM SAR
                    </button>
                    <button
                      onClick={() => handleModerate(report.id, 'REJECTED', undefined, 'Laporan duplikat')}
                      className="pill-btn-black py-1.5 px-3.5 text-xs"
                    >
                      TOLAK
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Form Intake Korban Baru (1 col) */}
        <div>
          <div className="rounded-3xl bg-white p-7 shadow-sm space-y-5 sticky top-24">
            <div className="flex items-center gap-2 border-b border-black/5 pb-3">
              <div className="w-8 h-8 rounded-xl bg-[#20bf6b] flex items-center justify-center text-white">
                <PlusCircle className="w-4 h-4 stroke-[2.5]" />
              </div>
              <h3 className="font-bebas text-3xl tracking-wider uppercase text-[#121212]">
                CATAT KEDATANGAN PENYINTAS
              </h3>
            </div>

            <p className="text-xs text-slate-600 font-sans leading-relaxed">
              Catat identitas warga yang baru tiba di posko untuk langsung dimutakhirkan ke database publik.
            </p>

            <form onSubmit={handleIntakeSubmit} className="space-y-3.5">
              <div>
                <label className="block font-sans font-bold text-xs uppercase tracking-wide text-slate-700 mb-1">
                  NAMA LENGKAP PENYINTAS *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Siti Aisyah"
                  value={intakeName}
                  onChange={(e) => setIntakeName(e.target.value)}
                  className="w-full rounded-2xl bg-[#f5f2eb] px-3.5 py-2.5 text-xs font-sans focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#20bf6b]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-sans font-bold text-xs uppercase tracking-wide text-slate-700 mb-1">
                    USIA (THN)
                  </label>
                  <input
                    type="number"
                    placeholder="25"
                    value={intakeAge}
                    onChange={(e) => setIntakeAge(e.target.value)}
                    className="w-full rounded-2xl bg-[#f5f2eb] px-3.5 py-2.5 text-xs font-sans focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#20bf6b]"
                  />
                </div>
                <div>
                  <label className="block font-sans font-bold text-xs uppercase tracking-wide text-slate-700 mb-1">
                    GENDER
                  </label>
                  <select
                    value={intakeGender}
                    onChange={(e) => setIntakeGender(e.target.value as any)}
                    className="w-full rounded-2xl bg-[#f5f2eb] px-3.5 py-2.5 text-xs font-sans focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#20bf6b]"
                  >
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-sans font-bold text-xs uppercase tracking-wide text-slate-700 mb-1">
                  DESA / ASAL PENGUNGSIAN *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Rimbo Panjang, Kampar"
                  value={intakeVillage}
                  onChange={(e) => setIntakeVillage(e.target.value)}
                  className="w-full rounded-2xl bg-[#f5f2eb] px-3.5 py-2.5 text-xs font-sans focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#20bf6b]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-sans font-bold text-xs uppercase tracking-wide text-slate-700 mb-1">
                    LOKASI POSKO
                  </label>
                  <select
                    value={intakeShelterId}
                    onChange={(e) => setIntakeShelterId(Number(e.target.value))}
                    className="w-full rounded-2xl bg-[#f5f2eb] px-2 py-2.5 text-xs font-sans focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#20bf6b]"
                  >
                    <option value={1}>Posko A (Riau)</option>
                    <option value={2}>Posko B (Sumsel)</option>
                    <option value={3}>Posko C (Kalteng)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-sans font-bold text-xs uppercase tracking-wide text-slate-700 mb-1">
                    KONDISI MEDIS
                  </label>
                  <select
                    value={intakeHealth}
                    onChange={(e) => setIntakeHealth(e.target.value as any)}
                    className="w-full rounded-2xl bg-[#f5f2eb] px-2 py-2.5 text-xs font-sans focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#20bf6b]"
                  >
                    <option value="Sehat">Sehat</option>
                    <option value="Kelelahan Ringan">Kelelahan Ringan</option>
                    <option value="Gangguan Saluran Pernapasan (ISPA Ringan)">ISPA Ringan</option>
                    <option value="Gangguan Saluran Pernapasan (ISPA Berat)">ISPA Berat</option>
                    <option value="Luka Ringan">Luka Ringan</option>
                    <option value="Butuh Perawatan Khusus">Perawatan Khusus</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-sans font-bold text-xs uppercase tracking-wide text-slate-700 mb-1">
                  CATATAN TAMBAHAN
                </label>
                <input
                  type="text"
                  placeholder="Kebutuhan khusus obat atau lansia..."
                  value={intakeNotes}
                  onChange={(e) => setIntakeNotes(e.target.value)}
                  className="w-full rounded-2xl bg-[#f5f2eb] px-3.5 py-2.5 text-xs font-sans focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#20bf6b]"
                />
              </div>

              <button
                type="submit"
                disabled={intakeLoading}
                className="pill-btn-green w-full py-3.5 text-sm font-bebas tracking-wider justify-center disabled:opacity-50"
              >
                {intakeLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>MENYIMPAN...</span>
                  </>
                ) : (
                  <span>+ CATAT KE MANIFES RESMI</span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
