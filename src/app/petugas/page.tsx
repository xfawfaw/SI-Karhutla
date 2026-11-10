'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, UserCheck, CheckCircle2, XCircle, PlusCircle, AlertCircle, RefreshCw, Loader2, LogOut, Phone } from 'lucide-react';
import { MissingReport, Shelter, Evacuee, HealthCondition } from '@/types';

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

  // Selected action targets for moderation modal/inline
  const [selectedReport, setSelectedReport] = useState<MissingReport | null>(null);
  const [moderationShelterId, setModerationShelterId] = useState<number>(1);
  const [officerNotes, setOfficerNotes] = useState<string>('');

  // Evacuee Intake Form
  const [intakeName, setIntakeName] = useState<string>('');
  const [intakeAge, setIntakeAge] = useState<string>('');
  const [intakeGender, setIntakeGender] = useState<'Laki-laki' | 'Perempuan'>('Laki-laki');
  const [intakeVillage, setIntakeVillage] = useState<string>('');
  const [intakeShelterId, setIntakeShelterId] = useState<number>(1);
  const [intakeHealth, setIntakeHealth] = useState<HealthCondition>('Sehat');
  const [intakeNotes, setIntakeNotes] = useState<string>('');
  const [intakeLoading, setIntakeLoading] = useState<boolean>(false);

  // Check initial cookie session
  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (document.cookie.includes('si_karhutla_officer=authenticated')) {
        setIsAuthenticated(true);
      }
    }
  }, []);

  // Fetch pending reports and shelters once authenticated
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

  // Handle Login
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
        setAuthError(data.error || 'Password salah. Akses ditolak.');
        return;
      }

      setIsAuthenticated(true);
      setPassword('');
    } catch (err) {
      setAuthError('Gagal menghubungi server autentikasi.');
    } finally {
      setAuthLoading(false);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    await fetch('/api/auth', { method: 'DELETE' });
    setIsAuthenticated(false);
  };

  // Handle Moderation Action
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

      setActionMessage(`Laporan ${data.data.ticket_code} berhasil diperbarui menjadi ${status}`);
      setSelectedReport(null);
      loadDashboardData();
    } catch (err: any) {
      setActionMessage(`Error: ${err.message}`);
    }
  };

  // Handle New Evacuee Intake
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
        throw new Error(data.error || 'Gagal menyimpan pengungsi baru');
      }

      setActionMessage(`Penyintas "${intakeName}" berhasil dicatat di ${shelters.find(s => s.id === intakeShelterId)?.code}`);
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
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-[#101726] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-orange-600/20 border border-orange-500/40 flex items-center justify-center mx-auto text-orange-400">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold font-mono text-white">
              Akses Portal Petugas Posko
            </h1>
            <p className="text-xs text-slate-400 leading-relaxed">
              Autentikasi Terpadu Relawan Lapangan BNPB & Satgas Karhutla (Single Shared Credential).
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {authError && (
              <div className="bg-red-950/60 border border-red-800 rounded-lg p-3 text-xs text-red-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5">
                Kredensial / Password Petugas Bersama:
              </label>
              <input
                type="password"
                required
                placeholder="Masukkan kata sandi posko..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-orange-500"
              />
              <p className="text-[11px] text-slate-500 mt-1 font-mono">
                Kata sandi standar penugasan: <code className="text-orange-400">poskosiaga2026</code>
              </p>
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-3 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-mono text-xs font-bold transition-all shadow-lg shadow-orange-600/20 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {authLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Memvalidasi Kredensial...
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  Masuk ke Panel Petugas
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1 space-y-8">
      {/* Top Officer Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 uppercase tracking-wider">
              OPERATOR AUTHORIZED
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Satgas Lapangan Gabungan
            </span>
          </div>
          <h1 className="text-2xl font-black text-white font-mono tracking-tight">
            Panel Moderasi & Registrasi Posko
          </h1>
          <p className="text-xs text-slate-400">
            Validasi laporan kehilangan warga serta pencatatan kedatangan pengungsi baru di Posko A, B, atau C.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={loadDashboardData}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-mono flex items-center gap-1.5"
            title="Refresh Data"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loadingData ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button
            onClick={handleLogout}
            className="px-3 py-2 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-800 text-xs font-mono font-bold flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            Keluar
          </button>
        </div>
      </div>

      {actionMessage && (
        <div className="p-3.5 rounded-lg bg-emerald-950/60 border border-emerald-800 text-xs text-emerald-300 flex items-center justify-between">
          <span>{actionMessage}</span>
          <button onClick={() => setActionMessage('')} className="text-slate-400 hover:text-white">
            ✕
          </button>
        </div>
      )}

      {/* Main Grid: Left = Moderation Queue (2 cols), Right = New Intake (1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Moderation Queue */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold font-mono text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-orange-400" />
              Antrean Verifikasi Laporan Warga
              <span className="ml-1 px-2 py-0.5 rounded-full text-xs bg-red-600 text-white font-mono">
                {pendingReports.length} Menunggu
              </span>
            </h2>
          </div>

          {loadingData ? (
            <div className="py-12 flex justify-center text-slate-400 font-mono text-xs">
              <Loader2 className="w-6 h-6 animate-spin text-orange-500" />
            </div>
          ) : pendingReports.length === 0 ? (
            <div className="bg-[#101726] border border-slate-800 rounded-xl p-8 text-center text-slate-400 font-mono text-xs space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <p className="text-slate-300 font-bold">Semua Laporan Telah Dimoderasi</p>
              <p className="text-slate-500 text-[11px]">
                Tidak ada tiket warga yang tertahan dalam status PENDING_VERIFICATION.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {pendingReports.map((report) => (
                <div
                  key={report.id}
                  className="bg-[#101726] border border-slate-800 rounded-xl p-4 shadow-lg space-y-3"
                >
                  <div className="flex items-start justify-between gap-2 border-b border-slate-800 pb-2">
                    <div>
                      <span className="text-[11px] font-mono text-orange-400 font-bold">
                        {report.ticket_code}
                      </span>
                      <h3 className="text-base font-bold text-white font-mono">
                        {report.victim_name} (Usia ~{report.victim_age} thn)
                      </h3>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-950/80 text-amber-300 border border-amber-800 font-semibold">
                      PENDING VERIFIKASI
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                    <div>
                      <span className="text-slate-500 block text-[10px]">Lokasi Terakhir:</span>
                      <span className="text-slate-200">{report.last_seen_location}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">Pelapor:</span>
                      <span className="text-slate-200">
                        {report.reporter_name} ({report.reporter_phone})
                      </span>
                    </div>
                    {report.description && (
                      <div className="sm:col-span-2 pt-1 border-t border-slate-800 text-[11px] text-slate-400">
                        <strong>Ciri Fisik:</strong> {report.description}
                      </div>
                    )}
                  </div>

                  {/* Inline Verification Action */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <button
                      onClick={() =>
                        handleModerate(report.id, 'FOUND_AT_SHELTER', 1, 'Ditemukan di Posko A')
                      }
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold transition-colors flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Tetapkan di Posko A
                    </button>
                    <button
                      onClick={() =>
                        handleModerate(report.id, 'FOUND_AT_SHELTER', 2, 'Ditemukan di Posko B')
                      }
                      className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-mono text-xs font-bold transition-colors"
                    >
                      Posko B
                    </button>
                    <button
                      onClick={() =>
                        handleModerate(report.id, 'FOUND_AT_SHELTER', 3, 'Ditemukan di Posko C')
                      }
                      className="px-3 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white font-mono text-xs font-bold transition-colors"
                    >
                      Posko C
                    </button>
                    <button
                      onClick={() =>
                        handleModerate(report.id, 'VERIFIED_MISSING', undefined, 'Dalam pencarian regu SAR')
                      }
                      className="px-3 py-1.5 rounded-lg bg-amber-700 hover:bg-amber-600 text-white font-mono text-xs font-bold transition-colors"
                    >
                      Verifikasi Hilang
                    </button>
                    <button
                      onClick={() => handleModerate(report.id, 'REJECTED', undefined, 'Laporan duplikat')}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-red-950 text-slate-400 hover:text-red-300 font-mono text-xs border border-slate-700 transition-colors"
                    >
                      Tolak
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Evacuee Intake Form */}
        <div className="space-y-4">
          <div className="bg-[#101726] border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <h3 className="text-sm font-bold font-mono text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <PlusCircle className="w-4 h-4 text-emerald-400" />
              Pencatatan Korban Tiba di Posko
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Input data pengungsi baru yang dievakuasi langsung oleh tim darat ke penampungan resmi.
            </p>

            <form onSubmit={handleIntakeSubmit} className="space-y-3 font-mono text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Nama Lengkap Korban *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Siti Fatimah"
                  value={intakeName}
                  onChange={(e) => setIntakeName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-300 mb-1">Usia</label>
                  <input
                    type="number"
                    placeholder="Contoh: 28"
                    value={intakeAge}
                    onChange={(e) => setIntakeAge(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Jenis Kelamin</label>
                  <select
                    value={intakeGender}
                    onChange={(e) => setIntakeGender(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-2 text-white focus:outline-none focus:border-orange-500"
                  >
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Desa / Wilayah Asal *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Dusun Karya Baru, OKI"
                  value={intakeVillage}
                  onChange={(e) => setIntakeVillage(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Lokasi Posko Penampungan</label>
                <select
                  value={intakeShelterId}
                  onChange={(e) => setIntakeShelterId(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-orange-500"
                >
                  {shelters.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.code} - {s.name.split(' - ')[1] || s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Status Kesehatan Awal</label>
                <select
                  value={intakeHealth}
                  onChange={(e) => setIntakeHealth(e.target.value as HealthCondition)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-orange-500"
                >
                  <option value="Sehat">Sehat</option>
                  <option value="Kelelahan Ringan">Kelelahan Ringan</option>
                  <option value="Luka Ringan">Luka Ringan</option>
                  <option value="Gangguan Saluran Pernapasan (ISPA Ringan)">ISPA Ringan</option>
                  <option value="Gangguan Saluran Pernapasan (ISPA Berat)">ISPA Berat</option>
                  <option value="Perawatan Intensif">Perawatan Intensif</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Catatan Tambahan</label>
                <textarea
                  rows={2}
                  placeholder="Kebutuhan obat / alergi / pendamping..."
                  value={intakeNotes}
                  onChange={(e) => setIntakeNotes(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <button
                type="submit"
                disabled={intakeLoading}
                className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                {intakeLoading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <PlusCircle className="w-3.5 h-3.5" />
                )}
                Simpan ke Manifes Posko
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
