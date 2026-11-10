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

      setActionMessage(`Laporan ${data.data.ticket_code} berhasil diverifikasi!`);
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
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-8 font-mono text-black">
        <div className="w-full max-w-sm bg-white border-3 border-black p-6 sm:p-8 shadow-brutal space-y-5">
          <div className="text-center space-y-1">
            <div className="w-12 h-12 bg-[#ffde59] border-2 border-black shadow-brutal-sm flex items-center justify-center mx-auto text-black">
              <Lock className="w-6 h-6 stroke-[3]" />
            </div>
            <h1 className="text-2xl font-black font-display uppercase tracking-wider">
              PORTAL PETUGAS POSKO
            </h1>
            <p className="text-xs text-slate-700 font-bold">Kredensial Bersama Relawan Lapangan</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-xs font-mono">
            {authError && (
              <div className="bg-[#eb3b5a] text-white font-bold border-2 border-black p-2.5 shadow-brutal-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 stroke-[3]" />
                <span>{authError}</span>
              </div>
            )}

            <div>
              <label className="block font-bold text-black mb-1">PASSWORD POSKO:</label>
              <input
                type="password"
                required
                placeholder="Masukkan kata sandi..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#f4f0e8] border-2 border-black px-3 py-2.5 font-bold text-black focus:outline-none focus:bg-white"
              />
              <span className="text-[11px] text-slate-600 mt-1 block">
                Default: <strong className="bg-[#ffde59] px-1 border border-black">poskosiaga2026</strong>
              </span>
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-3 bg-[#ff5722] text-white font-black text-sm border-2 border-black shadow-brutal brutal-btn uppercase"
            >
              {authLoading ? 'MEMVALIDASI...' : 'MASUK KE PANEL OPERATOR'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1 space-y-6 font-mono text-black">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-black pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-[#20bf6b] text-black font-mono font-black text-[10px] px-2 py-0.5 border border-black shadow-brutal-sm">
              AUTHORIZED OPERATOR
            </span>
            <span className="font-bold text-xs text-slate-700">Satgas Gabungan Lapangan</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black font-display uppercase tracking-wide">
            PANEL MODERASI LAPORAN & MANIFES POSKO
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadDashboardData}
            className="px-3 py-2 bg-white text-black font-bold border-2 border-black shadow-brutal-sm brutal-btn flex items-center gap-1 text-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loadingData ? 'animate-spin' : ''}`} />
            REFRESH
          </button>
          <button
            onClick={handleLogout}
            className="px-3 py-2 bg-[#eb3b5a] text-white font-bold border-2 border-black shadow-brutal-sm brutal-btn flex items-center gap-1 text-xs"
          >
            <LogOut className="w-3.5 h-3.5" />
            KELUAR
          </button>
        </div>
      </div>

      {actionMessage && (
        <div className="p-3 bg-[#20bf6b] text-black font-bold border-2 border-black shadow-brutal-sm flex items-center justify-between text-xs">
          <span>✓ {actionMessage}</span>
          <button onClick={() => setActionMessage('')} className="font-black">✕</button>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Antrean Verifikasi (2 cols) */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between border-b-2 border-black pb-2">
            <h2 className="font-display text-xl font-black uppercase flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#ff5722] stroke-[3]" />
              ANTEAN VERIFIKASI WARGA ({pendingReports.length} TIKET)
            </h2>
          </div>

          {loadingData ? (
            <div className="py-12 flex justify-center text-black font-bold">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          ) : pendingReports.length === 0 ? (
            <div className="bg-white border-3 border-black p-8 text-center shadow-brutal space-y-2">
              <CheckCircle2 className="w-8 h-8 text-[#20bf6b] mx-auto stroke-[3]" />
              <p className="font-black text-sm uppercase">SEMUA LAPORAN BERHASIL DIMODERASI</p>
              <p className="text-xs text-slate-700">Tidak ada tiket tertahan dalam antrean.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingReports.map((report) => (
                <div
                  key={report.id}
                  className="bg-white border-3 border-black p-4 sm:p-5 shadow-brutal space-y-3 text-xs"
                >
                  <div className="flex items-start justify-between gap-2 border-b-2 border-black pb-2">
                    <div>
                      <span className="bg-[#ff5722] text-white font-bold px-1.5 py-0.5 border border-black text-[10px]">
                        {report.ticket_code}
                      </span>
                      <h3 className="text-lg font-black font-display uppercase mt-1">
                        {report.victim_name} (Usia ~{report.victim_age} Thn)
                      </h3>
                    </div>
                    <span className="bg-[#ffde59] text-black font-black px-2 py-0.5 border border-black text-[10px]">
                      PENDING VERIFIKASI
                    </span>
                  </div>

                  <div className="bg-[#f4f0e8] p-3 border border-black space-y-1 text-slate-800">
                    <div><strong>Lokasi Terakhir:</strong> {report.last_seen_location}</div>
                    <div><strong>Pelapor:</strong> {report.reporter_name} ({report.reporter_phone})</div>
                    {report.description && (
                      <div className="text-slate-700 italic pt-1 border-t border-black/20">
                        &ldquo;{report.description}&rdquo;
                      </div>
                    )}
                  </div>

                  {/* One-click moderation buttons */}
                  <div className="flex flex-wrap items-center gap-2 pt-1 font-bold">
                    <button
                      onClick={() => handleModerate(report.id, 'FOUND_AT_SHELTER', 1, 'Tiba di Posko A')}
                      className="px-3 py-1.5 bg-[#20bf6b] text-black border-2 border-black shadow-brutal-sm brutal-btn text-xs"
                    >
                      DITEMUKAN DI POSKO A
                    </button>
                    <button
                      onClick={() => handleModerate(report.id, 'FOUND_AT_SHELTER', 2, 'Tiba di Posko B')}
                      className="px-3 py-1.5 bg-[#20bf6b] text-black border-2 border-black shadow-brutal-sm brutal-btn text-xs"
                    >
                      POSKO B
                    </button>
                    <button
                      onClick={() => handleModerate(report.id, 'FOUND_AT_SHELTER', 3, 'Tiba di Posko C')}
                      className="px-3 py-1.5 bg-[#20bf6b] text-black border-2 border-black shadow-brutal-sm brutal-btn text-xs"
                    >
                      POSKO C
                    </button>
                    <button
                      onClick={() => handleModerate(report.id, 'VERIFIED_MISSING', undefined, 'Pencarian aktif tim TRC')}
                      className="px-3 py-1.5 bg-[#ffde59] text-black border-2 border-black shadow-brutal-sm brutal-btn text-xs"
                    >
                      VERIFIKASI HILANG (SAR)
                    </button>
                    <button
                      onClick={() => handleModerate(report.id, 'REJECTED', undefined, 'Laporan duplikat')}
                      className="px-2.5 py-1.5 bg-black text-white border-2 border-black shadow-brutal-sm brutal-btn text-xs"
                    >
                      TOLAK
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Form Intake Korban Baru */}
        <div>
          <div className="bg-white border-3 border-black p-5 shadow-brutal space-y-4 text-xs font-mono">
            <h3 className="font-display text-xl font-black uppercase flex items-center gap-1.5 border-b-2 border-black pb-2">
              <PlusCircle className="w-5 h-5 text-[#20bf6b] stroke-[3]" />
              CATAT PENYINTAS TIBA DI POSKO
            </h3>

            <form onSubmit={handleIntakeSubmit} className="space-y-3 font-mono">
              <div>
                <label className="block font-bold text-black mb-1">NAMA LENGKAP *</label>
                <input
                  type="text"
                  required
                  placeholder="Nama pengungsi..."
                  value={intakeName}
                  onChange={(e) => setIntakeName(e.target.value)}
                  className="w-full bg-[#f4f0e8] border-2 border-black px-2.5 py-2 font-bold text-black focus:outline-none focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-black mb-1">USIA</label>
                  <input
                    type="number"
                    placeholder="30"
                    value={intakeAge}
                    onChange={(e) => setIntakeAge(e.target.value)}
                    className="w-full bg-[#f4f0e8] border-2 border-black px-2.5 py-2 font-bold text-black focus:outline-none focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-black mb-1">GENDER</label>
                  <select
                    value={intakeGender}
                    onChange={(e) => setIntakeGender(e.target.value as any)}
                    className="w-full bg-[#f4f0e8] border-2 border-black px-2 py-2 font-bold text-black focus:outline-none cursor-pointer"
                  >
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-black mb-1">DESA / WILAYAH ASAL *</label>
                <input
                  type="text"
                  required
                  placeholder="Desa / RT..."
                  value={intakeVillage}
                  onChange={(e) => setIntakeVillage(e.target.value)}
                  className="w-full bg-[#f4f0e8] border-2 border-black px-2.5 py-2 font-bold text-black focus:outline-none focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-black mb-1">LOKASI POSKO PENAMPUNGAN</label>
                <select
                  value={intakeShelterId}
                  onChange={(e) => setIntakeShelterId(Number(e.target.value))}
                  className="w-full bg-[#ffde59] border-2 border-black px-2.5 py-2 font-bold text-black focus:outline-none cursor-pointer"
                >
                  {shelters.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.code} ({s.name.split(' - ')[1] || s.name})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-black mb-1">STATUS MEDIS</label>
                <select
                  value={intakeHealth}
                  onChange={(e) => setIntakeHealth(e.target.value as HealthCondition)}
                  className="w-full bg-[#f4f0e8] border-2 border-black px-2.5 py-2 font-bold text-black focus:outline-none cursor-pointer"
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
                <label className="block font-bold text-black mb-1">CATATAN KHUSUS</label>
                <textarea
                  rows={2}
                  placeholder="Kebutuhan obat / pendamping..."
                  value={intakeNotes}
                  onChange={(e) => setIntakeNotes(e.target.value)}
                  className="w-full bg-[#f4f0e8] border-2 border-black px-2.5 py-2 font-bold text-black focus:outline-none focus:bg-white"
                />
              </div>

              <button
                type="submit"
                disabled={intakeLoading}
                className="w-full py-2.5 bg-[#20bf6b] text-black font-black text-xs border-2 border-black shadow-brutal brutal-btn uppercase"
              >
                {intakeLoading ? 'MENYIMPAN...' : 'SIMPAN KE MANIFES RESMI'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
