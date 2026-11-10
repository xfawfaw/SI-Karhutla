import React from 'react';
import Link from 'next/link';
import HotspotMap from '@/components/map/HotspotMap';
import {
  getHotspots,
  getAllShelters,
  getAirQualityStations,
  getCorporateConcessions
} from '@/lib/db';
import {
  Shield,
  Search,
  ArrowRight,
  AlertCircle,
  Wind,
  Flame,
  Building2,
  Users,
  Compass,
  FileCheck2
} from 'lucide-react';

export default function HomePage() {
  const hotspots = getHotspots();
  const shelters = getAllShelters();
  const aqiStations = getAirQualityStations();
  const corporateConcessions = getCorporateConcessions();

  const totalOccupants = shelters.reduce((acc, s) => acc + s.current_occupants, 0);
  const totalCapacity = shelters.reduce((acc, s) => acc + s.capacity, 0);

  return (
    <div className="flex flex-col flex-1 bg-[#f4f0e8] text-black">
      {/* 1. Neobrutalist Hero Section (Inspired by Muse Group reference) */}
      <section className="border-b-3 border-black bg-[#faf8f5] px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Top Pill Stickers */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="bg-[#ffde59] text-black font-mono font-bold text-xs uppercase px-3 py-1 border-2 border-black shadow-brutal-sm">
              ★ STANDAR GEOPORTAL BNPB 2026
            </span>
            <span className="bg-[#20bf6b] text-black font-mono font-bold text-xs uppercase px-3 py-1 border-2 border-black shadow-brutal-sm">
              6 PROVINSI PRIORITAS
            </span>
            <span className="bg-[#ff5722] text-white font-mono font-bold text-xs uppercase px-3 py-1 border-2 border-black shadow-brutal-sm">
              SISTEM TANGGAP DARURAT RESMI
            </span>
          </div>

          {/* Giant Condensed Headline with Overlapping Brutalist Badges */}
          <div className="relative mb-6">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-display tracking-tight leading-[0.9] uppercase text-black">
              TANGGAP DARURAT <br />
              <span className="text-[#ff5722]">KARHUTLA</span> & POSKO
            </h1>

            {/* Overlapping Sticker Badge (like the blue/yellow pills in the reference) */}
            <div className="mt-3 sm:mt-0 sm:absolute sm:right-0 sm:bottom-2 inline-flex flex-col items-start sm:items-end">
              <span className="bg-[#3867d6] text-white font-mono font-bold text-xs sm:text-sm px-3.5 py-1.5 border-2 border-black shadow-brutal">
                SISTEM INFORMASI KORBAN & KUALITAS UDARA
              </span>
            </div>
          </div>

          {/* Subtitle & Action Row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-4 border-t-2 border-black">
            <p className="font-mono text-xs sm:text-sm text-slate-800 max-w-2xl leading-relaxed">
              Platform spasial terpadu pemantauan <strong>2.400 titik panas satelit</strong>, pengukuran indeks kualitas udara <strong>US EPA AQI</strong>, rekam jejak konsesi korporasi, serta direktori pencarian pengungsi korban kebakaran hutan di Sumatera & Kalimantan.
            </p>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="/posko"
                className="px-5 py-3 bg-[#ff5722] text-white font-mono font-bold text-xs sm:text-sm border-2 border-black shadow-brutal brutal-btn flex items-center gap-2"
              >
                <Search className="w-4 h-4 stroke-[3]" />
                CARI NAMA KORBAN DI POSKO
              </Link>
              <Link
                href="/lapor"
                className="px-5 py-3 bg-[#ffffff] text-black font-mono font-bold text-xs sm:text-sm border-2 border-black shadow-brutal brutal-btn flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4 text-[#eb3b5a] stroke-[3]" />
                LAPOR KERABAT HILANG
              </Link>
            </div>
          </div>

          {/* 4 Brutalist Key Metric Blocks */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-8">
            <div className="bg-[#ffffff] border-2 sm:border-3 border-black p-3.5 sm:p-4 shadow-brutal">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-600 mb-1">
                <span>TITIK API AKTIF</span>
                <span className="bg-[#ff5722] text-white px-1.5 py-0.5 border border-black text-[10px]">
                  HOTSPOT
                </span>
              </div>
              <div className="text-3xl sm:text-4xl font-black font-display text-black">
                {hotspots.length}
              </div>
              <p className="text-[11px] font-mono text-slate-600 mt-1">
                NASA NOAA20, VIIRS, Aqua
              </p>
            </div>

            <div className="bg-[#ffffff] border-2 sm:border-3 border-black p-3.5 sm:p-4 shadow-brutal">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-600 mb-1">
                <span>POSKO PENAMPUNGAN</span>
                <span className="bg-[#20bf6b] text-black px-1.5 py-0.5 border border-black text-[10px]">
                  AKTIF
                </span>
              </div>
              <div className="text-3xl sm:text-4xl font-black font-display text-[#20bf6b]">
                {shelters.length} POSKO
              </div>
              <p className="text-[11px] font-mono text-slate-600 mt-1">
                Posko A, B, dan C Siaga
              </p>
            </div>

            <div className="bg-[#ffffff] border-2 sm:border-3 border-black p-3.5 sm:p-4 shadow-brutal">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-600 mb-1">
                <span>PENYINTAS TERDATA</span>
                <span className="bg-[#3867d6] text-white px-1.5 py-0.5 border border-black text-[10px]">
                  REUNI
                </span>
              </div>
              <div className="text-3xl sm:text-4xl font-black font-display text-black">
                {totalOccupants} JIWA
              </div>
              <p className="text-[11px] font-mono text-slate-600 mt-1">
                Kapasitas {totalCapacity} Manifes
              </p>
            </div>

            <div className="bg-[#ffffff] border-2 sm:border-3 border-black p-3.5 sm:p-4 shadow-brutal">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-600 mb-1">
                <span>KUALITAS UDARA AQI</span>
                <span className="bg-[#eb3b5a] text-white px-1.5 py-0.5 border border-black text-[10px]">
                  BAHAYA
                </span>
              </div>
              <div className="text-3xl sm:text-4xl font-black font-display text-[#eb3b5a]">
                278 AQI
              </div>
              <p className="text-[11px] font-mono text-slate-600 mt-1">
                Tertinggi di Kotim / Sampit
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Hotspot Geoportal Map Section (Neobrutalist Frame) */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-black pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-[#ff5722] border border-black inline-block"></span>
              <h2 className="text-2xl sm:text-3xl font-black font-display uppercase tracking-wide">
                PETA SPASIAL SEBARAN TITIK PANAS (GIS 2026)
              </h2>
            </div>
            <p className="font-mono text-xs text-slate-700">
              Data snapshot terkurasi BNPB 2026 • 60 FPS Supercluster • OpenStreetMap Tanpa Watermark
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="bg-white border-2 border-black px-2 py-1 shadow-brutal-sm font-bold">
              Kordinat Prioritas: Sumatera & Kalimantan
            </span>
          </div>
        </div>

        {/* Map Container */}
        <HotspotMap hotspots={hotspots} shelters={shelters} />
      </section>

      {/* 3. Karhutla.cloud Reference: Indeks Kualitas Udara (US EPA AQI) */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t-3 border-black">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <Wind className="w-5 h-5 text-[#3867d6] stroke-[3]" />
              <h2 className="text-2xl sm:text-3xl font-black font-display uppercase tracking-wide">
                INDEKS KUALITAS UDARA (US EPA AQI)
              </h2>
            </div>
            <p className="font-mono text-xs text-slate-700">
              Pemantauan polutan partikulat PM2.5 akibat kabut asap karhutla di 6 stasiun pengamatan wilayah terdampak.
            </p>
          </div>
          <span className="bg-[#ffde59] text-black font-mono font-bold text-xs px-3 py-1 border-2 border-black shadow-brutal-sm self-start sm:self-auto">
            STANDAR US EPA & ISPU KLHK
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {aqiStations.map((station) => (
            <div
              key={station.id}
              className="bg-white border-2 sm:border-3 border-black p-4 shadow-brutal flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold text-slate-500">{station.province}</span>
                  <span
                    className="font-mono text-[10px] font-bold px-2 py-0.5 border-2 border-black shadow-brutal-sm"
                    style={{ backgroundColor: station.color, color: station.category === 'SEDANG' ? '#000' : '#fff' }}
                  >
                    {station.category}
                  </span>
                </div>
                <h3 className="font-bold text-base text-black mb-1 font-display uppercase tracking-wide">
                  {station.city}
                </h3>
                <div className="flex items-baseline gap-2 my-2">
                  <span className="text-3xl font-black font-display" style={{ color: station.color }}>
                    {station.aqi} AQI
                  </span>
                  <span className="font-mono text-xs text-slate-600">
                    PM2.5: <strong>{station.pm25} µg/m³</strong>
                  </span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t-2 border-black font-mono text-[11px] text-slate-800 bg-[#f4f0e8] p-2 border border-black">
                <strong className="block text-black">Rekomendasi Medis:</strong>
                {station.recommendation}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Active Shelters Section (Posko A, B, C) */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t-3 border-black">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#20bf6b] stroke-[3]" />
              <h2 className="text-2xl sm:text-3xl font-black font-display uppercase tracking-wide">
                DIREKTORI POSKO EVAKUASI TERPADU (A, B, C)
              </h2>
            </div>
            <p className="font-mono text-xs text-slate-700">
              Posko pengungsian binaan Satgas Karhutla & Dinas Sosial dengan manifes penyintas terverifikasi.
            </p>
          </div>
          <Link
            href="/posko"
            className="px-4 py-2 bg-[#ffde59] text-black font-mono font-bold text-xs border-2 border-black shadow-brutal brutal-btn flex items-center gap-1.5 self-start sm:self-auto"
          >
            LIHAT SEMUA PENGUNGSI <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {shelters.map((s) => {
            const occRatio = Math.round((s.current_occupants / s.capacity) * 100);
            return (
              <div
                key={s.id}
                className="bg-white border-2 sm:border-3 border-black p-5 shadow-brutal flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="bg-[#20bf6b] text-black font-mono font-black text-xs px-2.5 py-0.5 border-2 border-black shadow-brutal-sm">
                      {s.code}
                    </span>
                    <span className="font-mono text-xs font-bold text-black">
                      {occRatio}% KETERISIAN
                    </span>
                  </div>

                  <h3 className="font-bold text-lg text-black font-display uppercase leading-tight">
                    {s.name}
                  </h3>
                  <p className="font-mono text-xs text-slate-700 line-clamp-2">
                    {s.address}
                  </p>

                  {/* Brutalist Progress Bar */}
                  <div className="w-full bg-[#e5e2da] border-2 border-black h-3 overflow-hidden">
                    <div
                      className={`h-full border-r border-black ${
                        occRatio >= 80 ? 'bg-[#eb3b5a]' : 'bg-[#20bf6b]'
                      }`}
                      style={{ width: `${Math.min(occRatio, 100)}%` }}
                    />
                  </div>

                  <div className="flex justify-between font-mono text-xs text-slate-800">
                    <span>Penghuni: <strong>{s.current_occupants} Jiwa</strong></span>
                    <span>Kapasitas: <strong>{s.capacity} Jiwa</strong></span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t-2 border-black flex items-center justify-between font-mono text-xs">
                  <div>
                    <span className="text-slate-600 block text-[10px]">PENANGGUNG JAWAB:</span>
                    <strong className="text-black">{s.pic_name}</strong>
                    <span className="text-slate-700 block">{s.pic_phone}</span>
                  </div>
                  <Link
                    href={`/posko?shelterId=${s.id}`}
                    className="px-3 py-1.5 bg-[#f4f0e8] hover:bg-[#ffde59] text-black font-bold border-2 border-black shadow-brutal-sm transition-colors text-xs"
                  >
                    BUKA POSKO →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Karhutla.cloud Reference: Rekam Jejak Akuntabilitas Korporasi */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t-3 border-black">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#ff5722] stroke-[3]" />
              <h2 className="text-2xl sm:text-3xl font-black font-display uppercase tracking-wide">
                TRANSPARANSI KONSESI KORPORASI DI LAHAN GAMBUT
              </h2>
            </div>
            <p className="font-mono text-xs text-slate-700">
              Data pengawasan izin perkebunan sawit (HGU) dan kehutanan (PBPH-HTI) di sekitar koordinat titik api aktif (Sesuai rujukan karhutla.cloud & UU No. 24/2007).
            </p>
          </div>
          <Link
            href="/mitigasi"
            className="px-4 py-2 bg-white text-black font-mono font-bold text-xs border-2 border-black shadow-brutal brutal-btn self-start sm:self-auto"
          >
            LIHAT SANKSI HUKUM →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {corporateConcessions.map((corp) => (
            <div
              key={corp.id}
              className="bg-white border-2 sm:border-3 border-black p-4 shadow-brutal flex flex-col justify-between font-mono text-xs"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="bg-[#f4f0e8] text-black px-2 py-0.5 border border-black text-[10px] font-bold">
                    {corp.sector}
                  </span>
                  <span className="bg-[#eb3b5a] text-white px-2 py-0.5 border border-black text-[10px] font-bold">
                    {corp.gakkum_status}
                  </span>
                </div>
                <h3 className="font-bold text-base text-black font-display uppercase">
                  {corp.company_name}
                </h3>
                <p className="text-slate-600 text-[11px]">
                  Grup Induk: <strong>{corp.group_name}</strong> • Wilayah: <strong>{corp.regency}, {corp.province}</strong>
                </p>
                <div className="bg-[#f4f0e8] p-2 border border-black text-[11px] space-y-1">
                  <div>🔥 Titik Api 2026 di Konsesi: <strong className="text-[#ff5722]">{corp.hotspots_count_2026} Hotspot</strong></div>
                  <div>🌱 Kedalaman Gambut: <strong>{corp.peat_depth}</strong></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Law & Mitigation Callout Banner */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t-3 border-black">
        <div className="bg-[#ffde59] border-3 border-black p-6 sm:p-8 shadow-brutal flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="bg-black text-white px-2 py-0.5 font-mono text-xs font-bold">
                PASAL 40 & PASAL 75-79
              </span>
              <span className="font-mono text-xs font-bold text-black uppercase">
                UU No. 24 Tahun 2007 Penanggulangan Bencana
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black font-display uppercase tracking-wide text-black">
              HAK PENUH PENGUNGSI & SANKSI MUTLAK (STRICT LIABILITY)
            </h3>
            <p className="font-mono text-xs text-slate-800 leading-relaxed">
              Negara menjamin pemenuhan kebutuhan dasar penyintas karhutla (pangan, oksigen, masker N95, serta reuni keluarga). Pelaku pembakaran hutan terancam hukuman pidana 10 tahun penjara dan denda perdata hingga Rp10 Miliar.
            </p>
          </div>
          <Link
            href="/mitigasi"
            className="px-6 py-3.5 bg-black text-white font-mono font-black text-xs sm:text-sm border-2 border-black shadow-brutal brutal-btn shrink-0"
          >
            BACA REGULASI & ENSIKLOPEDIA MITIGASI →
          </Link>
        </div>
      </section>
    </div>
  );
}
