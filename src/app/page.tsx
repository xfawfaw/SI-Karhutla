import React from 'react';
import Link from 'next/link';
import HotspotMap from '@/components/map/HotspotMap';
import EvacueeSearchSection from '@/components/evacuees/EvacueeSearchSection';
import {
  getHotspots,
  getAllShelters,
  getAllEvacuees,
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
  Droplets,
  Trees,
  Scale,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

export default function HomePage() {
  const hotspots = getHotspots();
  const shelters = getAllShelters();
  const evacuees = getAllEvacuees();
  const aqiStations = getAirQualityStations();
  const corporateConcessions = getCorporateConcessions();

  const totalOccupants = shelters.reduce((acc, s) => acc + s.current_occupants, 0);
  const totalCapacity = shelters.reduce((acc, s) => acc + s.capacity, 0);

  return (
    <div className="flex flex-col flex-1 bg-[#f5f2eb] text-[#121212]">
      {/* 1. Dynamic Soft Brutalist Hero (Muse Group Style: Giant condensed typography, floating angled cards, sticker badges) */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-10 pb-16 sm:pb-24 overflow-hidden border-b-2 border-[#121212]">
        <div className="max-w-7xl mx-auto">
          {/* Top Pill Badges */}
          <div className="flex flex-wrap items-center gap-2.5 mb-6">
            <span className="sticker-badge bg-[#e6a73c] text-black">
              ★ TANGGAP DARURAT BNPB 2026
            </span>
            <span className="sticker-badge bg-[#20bf6b] text-black">
              6 PROVINSI PRIORITAS SUMATERA & KALIMANTAN
            </span>
            <span className="sticker-badge bg-[#4392f1] text-white">
              INTEGRASI KARHUTLA.CLOUD & UU 24/2007
            </span>
          </div>

          {/* Giant Condensed Headline with Overlapping Stickers (Exact Muse Group aesthetic) */}
          <div className="relative mb-8">
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black font-display tracking-tight leading-[0.88] uppercase text-[#121212]">
              SIAGA TANGGAP <br />
              <span className="text-[#dc5645] inline-block hover:scale-[1.01] transition-transform">
                DARURAT KARHUTLA
              </span>
            </h1>

            {/* Overlapping Sticker Badges */}
            <div className="mt-4 sm:mt-0 sm:absolute sm:right-6 sm:bottom-4 flex flex-wrap gap-2">
              <span className="sticker-badge bg-[#e6a73c] text-black text-sm px-4 py-1.5 shadow-soft">
                PEMANTAUAN SPASIAL 60 FPS
              </span>
              <span className="sticker-badge bg-[#4392f1] text-white text-sm px-4 py-1.5 shadow-soft">
                REUNI KELUARGA PENGUNGSI
              </span>
            </div>
          </div>

          {/* Floating Angled Editorial Cards (Inspired by Muse Group Video frames) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
            {/* Card 1: Satelit & Hotspot */}
            <div className="soft-card p-6 bg-white rotate-[-1.5deg] hover:rotate-0 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-[#dc5645] border-2 border-black flex items-center justify-center text-white mb-3 shadow-soft-sm">
                  <Flame className="w-5 h-5" />
                </div>
                <span className="font-mono text-xs font-bold text-slate-500 uppercase block">KOMPONEN 01</span>
                <h3 className="font-display text-2xl font-black uppercase text-black mt-1">
                  2.400+ TITIK PANAS AKTIF
                </h3>
                <p className="font-mono text-xs text-slate-700 mt-2 leading-relaxed">
                  Deteksi sensor NASA-TERRA/AQUA, NOAA20, dan VIIRS terindeks kanvas Supercluster GIS bebas lag.
                </p>
              </div>
              <a
                href="#peta"
                className="mt-4 inline-flex items-center gap-1.5 font-display text-sm font-black text-[#dc5645] hover:text-black uppercase tracking-wider"
              >
                JELAJAHI PETA SPASIAL →
              </a>
            </div>

            {/* Card 2: Posko & Reuni Keluarga */}
            <div className="soft-card p-6 bg-[#fbf9f4] rotate-[1.5deg] hover:rotate-0 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-[#20bf6b] border-2 border-black flex items-center justify-center text-black mb-3 shadow-soft-sm">
                  <Shield className="w-5 h-5 stroke-[2.5]" />
                </div>
                <span className="font-mono text-xs font-bold text-slate-500 uppercase block">KOMPONEN 02</span>
                <h3 className="font-display text-2xl font-black uppercase text-black mt-1">
                  REUNI KELUARGA & POSKO
                </h3>
                <p className="font-mono text-xs text-slate-700 mt-2 leading-relaxed">
                  Pencarian instan kerabat selamat di Posko A, B, dan C dilengkapi kondisi medis dan nomor narahubung PIC resmi.
                </p>
              </div>
              <a
                href="#posko"
                className="mt-4 inline-flex items-center gap-1.5 font-display text-sm font-black text-[#20bf6b] hover:text-black uppercase tracking-wider"
              >
                CARI DAFTAR KORBAN →
              </a>
            </div>

            {/* Card 3: Indeks Udara AQI & Mitigasi */}
            <div className="soft-card p-6 bg-white rotate-[-1deg] hover:rotate-0 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-[#4392f1] border-2 border-black flex items-center justify-center text-white mb-3 shadow-soft-sm">
                  <Wind className="w-5 h-5" />
                </div>
                <span className="font-mono text-xs font-bold text-slate-500 uppercase block">KOMPONEN 03</span>
                <h3 className="font-display text-2xl font-black uppercase text-black mt-1">
                  KUALITAS UDARA AQI & HUKUM
                </h3>
                <p className="font-mono text-xs text-slate-700 mt-2 leading-relaxed">
                  Pantauan US EPA AQI stasiun daerah terdampak serta sanksi pidana ketat UU No. 24 Tahun 2007 Pasal 75–79.
                </p>
              </div>
              <a
                href="#aqi"
                className="mt-4 inline-flex items-center gap-1.5 font-display text-sm font-black text-[#4392f1] hover:text-black uppercase tracking-wider"
              >
                PANTAU INDEKS AQI →
              </a>
            </div>
          </div>

          {/* Quick Action Pill Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t-2 border-[#121212]">
            <p className="font-mono text-xs sm:text-sm text-slate-800 max-w-xl">
              Seluruh data mengacu pada rujukan <strong>BNPB 2026</strong>, integrasi <strong>karhutla.cloud</strong>, serta perlindungan pengungsi berbasis <strong>UU No. 24 Tahun 2007</strong>.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#posko"
                className="pill-btn-coral"
              >
                <Search className="w-4 h-4" />
                <span>CARI KORBAN DI POSKO</span>
              </a>
              <Link
                href="/lapor"
                className="pill-btn-black"
              >
                <AlertCircle className="w-4 h-4 text-[#dc5645]" />
                <span>LAPOR HILANG (TIKET)</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Section: Interactive 60 FPS Hotspot Geoportal Map (#peta) */}
      <section id="peta" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b-2 border-[#121212] pb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-3 h-3 rounded-full bg-[#dc5645] inline-block animate-pulse"></span>
              <span className="font-mono text-xs font-bold text-slate-600 uppercase">MODUL SPASIAL 01</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-display uppercase tracking-tight text-[#121212]">
              PETA SEBARAN TITIK PANAS (GIS 2026)
            </h2>
            <p className="font-mono text-xs text-slate-700">
              Visualisasi OpenStreetMap 100% bebas watermark • Clustering Dinamis Supercluster 60 FPS • Pin Posko A, B, C
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs shrink-0">
            <span className="sticker-badge bg-white text-black">
              SUMATERA & KALIMANTAN
            </span>
          </div>
        </div>

        {/* Map Container */}
        <HotspotMap hotspots={hotspots} shelters={shelters} />
      </section>

      {/* 3. Section: Korban & Posko Evakuasi Interactive Directory (#posko) */}
      <EvacueeSearchSection initialEvacuees={evacuees} shelters={shelters} />

      {/* 4. Section: Indeks Kualitas Udara (US EPA AQI - from karhutla.cloud) (#aqi)
          Styled in bold terracotta/coral background like frame_007 & frame_011 in Muse Group video! */}
      <section id="aqi" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#dc5645] text-white border-y-3 border-[#121212]">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-white/40 pb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="sticker-badge bg-[#e6a73c] text-black text-xs font-bold">
                  ★ KARHUTLA.CLOUD INTEGRATION
                </span>
                <span className="sticker-badge bg-white text-black text-xs font-bold">
                  US EPA STANDARDS
                </span>
              </div>
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-black font-display tracking-tight uppercase">
                INDEKS KUALITAS UDARA (AQI)
              </h2>
              <p className="font-mono text-xs sm:text-sm text-white/90 max-w-2xl mt-1">
                Kadar partikulat polusi PM2.5 akibat kabut asap karhutla di stasiun pemantauan 6 provinsi rawan.
              </p>
            </div>

            {/* Giant Stat Callout (like "150M downloads" in video) */}
            <div className="bg-black text-white p-4 rounded-3xl border-2 border-white/60 shadow-soft">
              <span className="font-mono text-[10px] text-slate-400 uppercase block">AQI TERTINGGI HARI INI:</span>
              <div className="text-4xl sm:text-5xl font-black font-display text-[#e6a73c]">
                278 AQI
              </div>
              <span className="font-mono text-[11px] text-white font-bold block">
                SAMPIT (KOTIM) - SANGAT TIDAK SEHAT
              </span>
            </div>
          </div>

          {/* 6 City Station Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {aqiStations.map((station) => (
              <div
                key={station.id}
                className="bg-white text-black p-5 rounded-3xl border-2 border-black shadow-soft flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-slate-500 uppercase">{station.province}</span>
                    <span
                      className="sticker-badge text-[10px]"
                      style={{ backgroundColor: station.color, color: station.category === 'SEDANG' ? '#000' : '#fff' }}
                    >
                      {station.category}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-black uppercase text-black">
                    {station.city}
                  </h3>

                  <div className="flex items-baseline gap-2 my-2 font-display">
                    <span className="text-4xl font-black" style={{ color: station.color }}>
                      {station.aqi} AQI
                    </span>
                    <span className="font-mono text-xs text-slate-600 font-bold">
                      PM2.5: {station.pm25} µg/m³
                    </span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t-2 border-[#121212] font-mono text-xs bg-[#f5f2eb] p-2.5 rounded-2xl border border-black text-slate-800">
                  <strong className="block text-black text-[11px]">Saran Medis:</strong>
                  {station.recommendation}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Section: Mitigasi Teknis & Ketentuan Hukum (UU 24/2007) (#mitigasi) */}
      <section id="mitigasi" className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="sticker-badge bg-[#4392f1] text-white text-xs font-bold">
              ★ MODUL MITIGASI & REGULASI
            </span>
            <span className="sticker-badge bg-[#e6a73c] text-black text-xs font-bold">
              UU NO. 24 TAHUN 2007
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight uppercase text-[#121212]">
            MITIGASI FISIK GAMBUT & PENEGAKAN HUKUM
          </h2>
          <p className="font-mono text-xs sm:text-sm text-slate-700 mt-1 max-w-2xl">
            Solusi rekayasa hidrologi gambut berkelanjutan serta jaminan hak korban dan pertanggungjawaban pidana mutlak.
          </p>
        </div>

        {/* 3 Structural Solutions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="soft-card p-6 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#4392f1] border-2 border-black flex items-center justify-center text-white shadow-soft-sm">
                <Droplets className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h3 className="font-display text-2xl font-black uppercase text-black">
                CANAL BLOCKING (REWETTING)
              </h3>
              <p className="font-mono text-xs text-slate-700 leading-relaxed">
                Pembangunan sekat kanal bertingkat untuk menahan air dan menjaga tinggi muka air gambut minimal <strong>40 cm</strong> di bawah permukaan tanah (PP No. 57/2016).
              </p>
            </div>
            <div className="mt-4 p-2 bg-[#f5f2eb] border border-black rounded-xl font-mono text-[11px] font-bold">
              Mencegah gambut mengalami kekeringan pirolitik.
            </div>
          </div>

          <div className="soft-card p-6 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#20bf6b] border-2 border-black flex items-center justify-center text-black shadow-soft-sm">
                <Trees className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h3 className="font-display text-2xl font-black uppercase text-black">
                EMBUNG AIR RETENSI DARURAT
              </h3>
              <p className="font-mono text-xs text-slate-700 leading-relaxed">
                Kolam penampungan air cadangan di tengah kawasan konsesi rawan untuk menyuplai regu darat Manggala Agni dan helikopter <em>water bombing</em>.
              </p>
            </div>
            <div className="mt-4 p-2 bg-[#f5f2eb] border border-black rounded-xl font-mono text-[11px] font-bold">
              Radius hisap suplai hingga 5 km garis api.
            </div>
          </div>

          <div className="soft-card p-6 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#dc5645] border-2 border-black flex items-center justify-center text-white shadow-soft-sm">
                <Flame className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h3 className="font-display text-2xl font-black uppercase text-black">
                SEKAT BAKAR (FIREBREAKS)
              </h3>
              <p className="font-mono text-xs text-slate-700 leading-relaxed">
                Pembersihan koridor tanah mineral selebar 10–30 meter tanpa vegetasi bahan bakar untuk memutus rambatan api tajuk (*crown fire*) antar blok kebun.
              </p>
            </div>
            <div className="mt-4 p-2 bg-[#f5f2eb] border border-black rounded-xl font-mono text-[11px] font-bold">
              Garis pertahanan fisik utama regu TRC satgas.
            </div>
          </div>
        </div>

        {/* 2 Law Cards: Pasal 40 & Pasal 75-79 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="soft-card p-6 bg-white space-y-3">
            <span className="sticker-badge bg-[#20bf6b] text-black">
              PASAL 40 UU NO. 24/2007
            </span>
            <h3 className="font-display text-2xl font-black uppercase text-black">
              HAK MUTLAK PENGUNGSI BENCANA
            </h3>
            <p className="font-mono text-xs text-slate-800 leading-relaxed">
              Setiap korban di posko penampungan resmi berhak secara hukum memperoleh:
            </p>
            <ul className="font-mono text-xs text-slate-700 space-y-1.5 list-disc pl-4">
              <li>Kebutuhan pangan higienis, selimut, air bersih, dan masker respirator N95.</li>
              <li>Pelayanan kesehatan darurat dan terapi nebulizer ISPA bebas biaya.</li>
              <li>Akses informasi valid mengenai keberadaan sanak saudara yang terpisah.</li>
            </ul>
          </div>

          <div className="soft-card p-6 bg-[#fbf9f4] space-y-3">
            <span className="sticker-badge bg-[#dc5645] text-white">
              PASAL 75–79: STRICT LIABILITY
            </span>
            <h3 className="font-display text-2xl font-black uppercase text-black">
              SANKSI PIDANA PEMBAKARAN LAHAN
            </h3>
            <p className="font-mono text-xs text-slate-800 leading-relaxed">
              Ketentuan pidana tegas bagi pelaku perorangan maupun korporasi:
            </p>
            <ul className="font-mono text-xs text-slate-700 space-y-1.5 list-disc pl-4">
              <li><strong>Kelalaian (Pasal 76):</strong> Penjara paling lama 3 tahun / denda Rp300 Juta.</li>
              <li><strong>Pembakaran Sengaja Korporasi:</strong> Penjara hingga 10 tahun dan denda hingga Rp10 Miliar.</li>
              <li><strong>Pencabutan Izin Konsesi:</strong> Disertai kewajiban pemulihan ekologis gambut.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 6. Section: Transparansi Konsesi Korporasi (karhutla.cloud reference) (#konsesi) */}
      <section id="konsesi" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t-2 border-[#121212]">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Building2 className="w-4 h-4 text-[#dc5645]" />
              <span className="font-mono text-xs font-bold text-slate-600 uppercase">AKUNTABILITAS KORPORASI</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-display uppercase tracking-tight text-[#121212]">
              REKAM JEJAK KONSESI DI LAHAN GAMBUT
            </h2>
            <p className="font-mono text-xs text-slate-700">
              Data transparansi izin perkebunan kelapa sawit (HGU) dan kehutanan (PBPH-HTI) di sekitar sebaran titik api aktif.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 font-mono text-xs">
          {corporateConcessions.map((corp) => (
            <div
              key={corp.id}
              className="soft-card p-5 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="sticker-badge bg-[#f5f2eb] text-black text-[10px]">
                  {corp.sector}
                </span>
                <span className="sticker-badge bg-[#dc5645] text-white text-[10px]">
                  {corp.gakkum_status}
                </span>
              </div>
              <h3 className="font-display text-2xl font-black uppercase text-black">
                {corp.company_name}
              </h3>
              <p className="text-slate-600 text-xs">
                Grup Induk: <strong>{corp.group_name}</strong> • Wilayah: <strong>{corp.regency}, {corp.province}</strong>
              </p>
              <div className="bg-[#f5f2eb] p-3 rounded-2xl border border-black space-y-1">
                <div>Titik Panas 2026 di Konsesi: <strong className="text-[#dc5645]">{corp.hotspots_count_2026} Hotspot</strong></div>
                <div>Karakteristik Gambut: <strong>{corp.peat_depth}</strong></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
