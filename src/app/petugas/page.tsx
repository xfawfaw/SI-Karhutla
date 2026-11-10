'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, CheckCircle2, AlertCircle, RefreshCw, Loader2, LogOut, PlusCircle } from 'lucide-react';
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
        setAuthError(data.error || 'Password salah.');
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

      setActionMessage(`Laporan ${data.data.ticket_code} berhasil diperbarui.`);
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

      setActionMessage(`Pengungsi "${intakeName}" berhasil dicatat.`);
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
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-sm bg-[#0f172a] border border-slate-800 rounded-lg p-6 space-y-4 font-mono text-xs">
          <div className="text-center space-y-1">
            <div className="w-10 h-10 rounded bg-slate-800 flex items-center justify-center mx-auto text-orange-400">
              <Lock className="w-5 h-5" />
            </div>
            <h1 className="text-base font-bold text-white">Portal Petugas Posko</h1>
            <p className="text-slate-400 text-[11px]">Kredensial Bersama Satgas Lapangan</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-3">
            {authError && (
              <div className="bg-red-950/40 border border-red-800 rounded p-2 text-red-300 flex items-center gap-2">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <div>
              <label className="block text-slate-400 mb-1">Password Akses:</label>
              <input
                type="password"
                required
                placeholder="Password posko..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white focus:outline-none focus:border-orange-500"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                Default: <code className="text-orange-400">poskosiaga2026</code>
              </span>
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-2.5 rounded bg-orange-600 hover:bg-orange-500 text-white font-bold transition-colors disabled:opacity-50"
            >
              {authLoading ? 'Memeriksa...' : 'Masuk'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1 space-y-6 font-mono text-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">
            Panel Petugas & Verifikasi Laporan
          </h1>
          <p className="text-slate-400 text-[11px]">
            Moderasi laporan masyarakat dan registrasi pengungsi masuk posko.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadDashboardData}
            className="px-2.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center gap-1"
          >
            <RefreshCw className={`w-3 h-3 ${loadingData ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button
            onClick={handleLogout}
            className="px-2.5 py-1.5 rounded bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-800 flex items-center gap-1 font-bold"
          >
            <LogOut className="w-3 h-3" />
            Keluar
          </button>
        </div>
      </div>

      {actionMessage && (
        <div className="p-2.5 rounded bg-emerald-950/40 border border-emerald-800 text-emerald-300 flex items-center justify-between">
          <span>{actionMessage}</span>
          <button onClick={() => setActionMessage('')} className="text-slate-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Grid: 2 cols moderation queue, 1 col intake */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Moderation Queue */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-orange-400" />
              Antrean Verifikasi ({pendingReports.length})
            </h2>
          </div>

          {loadingData ? (
            <div className="py-12 flex justify-center text-slate-500">
              <Loader2 className="w-5 h-5 animate-spin text-orange-500" />
            </div>
          ) : pendingReports.length === 0 ? (
            <div className="bg-[#0f172a] border border-slate-800 rounded-lg p-6 text-center text-slate-400 space-y-1">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
              <p className="text-slate-200 font-bold">Semua Laporan Selesai Dimoderasi</p>
              <p className="text-slate-500 text-[11px]">Tidak ada tiket berstatus PENDING.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {pendingReports.map((report) => (
                <div
                  key={report.id}
                  className="bg-[#0f172a] border border-slate-800 rounded-lg p-3.5 space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-2 border-b border-slate-800 pb-2">
                    <div>
                      <span className="text-[10px] text-orange-400 font-bold">{report.ticket_code}</span>
                      <h3 className="font-bold text-white text-sm">{report.victim_name} ({report.victim_age} thn)</h3>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-amber-950/80 text-amber-300 border border-amber-800">
                      PENDING
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-300 space-y-0.5">
                    <div><span className="text-slate-500">Terakhir terlihat:</span> {report.last_seen_location}</div>
                    <div><span className="text-slate-500">Pelapor:</span> {report.reporter_name} ({report.reporter_phone})</div>
                    {report.description && (
                      <div className="text-slate-400 italic pt-1 border-t border-slate-800">
                        &ldquo;{report.description}&rdquo;
                      </div>
                    )}
                  </div>

                  {/* One-click moderation actions */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <button
                      onClick={() => handleModerate(report.id, 'FOUND_AT_SHELTER', 1, 'Tiba di Posko A')}
                      className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-colors"
                    >
                      Posko A
                    </button>
                    <button
                      onClick={() => handleModerate(report.id, 'FOUND_AT_SHELTER', 2, 'Tiba di Posko B')}
                      className="px-2.5 py-1 rounded bg-emerald-700 hover:bg-emerald-600 text-white font-bold transition-colors"
                    >
                      Posko B
                    </button>
                    <button
                      onClick={() => handleModerate(report.id, 'FOUND_AT_SHELTER', 3, 'Tiba di Posko C')}
                      className="px-2.5 py-1 rounded bg-emerald-800 hover:bg-emerald-700 text-white font-bold transition-colors"
                    >
                      Posko C
                    </button>
                    <button
                      onClick={() => handleModerate(report.id, 'VERIFIED_MISSING', undefined, 'Pencarian aktif tim TRC')}
                      className="px-2.5 py-1 rounded bg-amber-800 hover:bg-amber-700 text-amber-100 font-bold transition-colors"
                    >
                      Verifikasi Hilang
                    </button>
                    <button
                      onClick={() => handleModerate(report.id, 'REJECTED', undefined, 'Laporan duplikat')}
                      className="px-2 py-1 rounded bg-slate-800 hover:bg-red-950 text-slate-400 hover:text-red-300 border border-slate-700 transition-colors"
                    >
                      Tolak
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Intake Form */}
        <div>
          <div className="bg-[#0f172a] border border-slate-800 rounded-lg p-4 space-y-3">
            <h3 className="font-bold text-white flex items-center gap-1.5 border-b border-slate-800 pb-2">
              <PlusCircle className="w-4 h-4 text-emerald-400" />
              Catat Korban Tiba di Posko
            </h3>

            <form onSubmit={handleIntakeSubmit} className="space-y-2.5">
              <div>
                <label className="block text-slate-400 mb-0.5">Nama Lengkap *</label>
                <input
                  type="text"
                  required
                  placeholder="Nama pengungsi..."
                  value={intakeName}
                  onChange={(e) => setIntakeName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-0.5">Usia</label>
                  <input
                    type="number"
                    placeholder="30"
                    value={intakeAge}
                    onChange={(e) => setIntakeAge(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-0.5">Gender</label>
                  <select
                    value={intakeGender}
                    onChange={(e) => setIntakeGender(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1.5 text-white focus:outline-none focus:border-orange-500"
                  >
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-0.5">Desa Asal *</label>
                <input
                  type="text"
                  required
                  placeholder="Desa / RT..."
                  value={intakeVillage}
                  onChange={(e) => setIntakeVillage(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-0.5">Posko</label>
                <select
                  value={intakeShelterId}
                  onChange={(e) => setIntakeShelterId(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1.5 text-white focus:outline-none focus:border-orange-500"
                >
                  {shelters.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.code} ({s.name.split(' - ')[1] || s.name})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-0.5">Kondisi Medis</label>
                <select
                  value={intakeHealth}
                  onChange={(e) => setIntakeHealth(e.target.value as HealthCondition)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1.5 text-white focus:outline-none focus:border-orange-500"
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
                <label className="block text-slate-400 mb-0.5">Catatan</label>
                <textarea
                  rows={2}
                  placeholder="Catatan bantuan..."
                  value={intakeNotes}
                  onChange={(e) => setIntakeNotes(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <button
                type="submit"
                disabled={intakeLoading}
                className="w-full py-2 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-colors disabled:opacity-50"
              >
                {intakeLoading ? 'Menyimpan...' : 'Simpan ke Manifes Posko'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
