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
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  HeartPulse,
  Users,
  Compass,
  FileText
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
      {/* 1. Dynamic Hero Section (Muse Group Style: Giant condensed typography, borderless organic cards, description merged with background) */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-12 pb-16 sm:pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Top Pill Badges */}
          <div className="flex flex-wrap items-center gap-2.5 mb-6">
            <span className="sticker-badge bg-[#dc5645] text-white">
              ★ TANGGAP DARURAT 2026
            </span>
            <span className="sticker-badge bg-[#e6a73c] text-[#121212]">
              6 PROVINSI PRIORITAS
            </span>
            <span className="sticker-badge bg-[#4392f1] text-white">
              INTEGRASI KARHUTLA.CLOUD & EDUKASI KEBENCANAAN
            </span>
          </div>

          {/* Giant Condensed Headline (Muse Group pure typography) */}
          <div className="relative mb-6">
            <h1 className="font-bebas text-6xl sm:text-8xl md:text-9xl tracking-tight leading-[0.88] uppercase text-[#121212]">
              SIAGA TANGGAP <br />
              <span className="text-[#dc5645]">
                DARURAT KARHUTLA
              </span>
            </h1>

            {/* Floating Editorial Badges */}
            <div className="mt-4 sm:mt-0 sm:absolute sm:right-4 sm:bottom-4 flex flex-wrap gap-2">
              <span className="sticker-badge bg-[#121212] text-white text-xs px-4 py-1.5">
                PEMANTAUAN SPASIAL 60 FPS
              </span>
              <span className="sticker-badge bg-[#20bf6b] text-white text-xs px-4 py-1.5">
                REUNI KELUARGA PENGUNGSI
              </span>
            </div>
          </div>

          {/* Description Merged directly with the canvas background - No box border! */}
          <p className="text-lg sm:text-2xl text-slate-700 font-sans max-w-3xl leading-relaxed mb-10">
            Geoportal pemantauan titik panas berbasis satelit NASA/NOAA, direktori posko evakuasi pengungsi, indeks kualitas udara AQI, dan ensiklopedia edukasi penanggulangan kebakaran hutan & lahan gambut.
          </p>

          {/* Floating Organic Preview Cards (Muse Group style: rounded-3xl, gentle tilt, borderless soft elevation) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
            {/* Card 1: Satelit & Hotspot */}
            <div className="soft-card p-7 rotate-[-1.5deg] hover:rotate-0 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#dc5645] flex items-center justify-center text-white mb-4">
                  <Flame className="w-6 h-6 stroke-[2.5]" />
                </div>
                <span className="font-mono text-xs font-bold text-slate-400 uppercase tracking-wider block">MODUL SPASIAL</span>
                <h3 className="font-bebas text-3xl uppercase text-[#121212] mt-1">
                  2.400+ TITIK PANAS AKTIF
                </h3>
                <p className="font-sans text-xs text-slate-600 mt-2 leading-relaxed">
                  Deteksi sensor satelit NASA-TERRA/AQUA, NOAA20, dan VIIRS terindeks Supercluster kanvas bebas lag.
                </p>
              </div>
              <a
                href="#peta"
                className="mt-6 inline-flex items-center gap-1.5 font-bebas text-lg text-[#dc5645] hover:text-[#121212] transition-colors"
              >
                JELAJAHI PETA SPASIAL →
              </a>
            </div>

            {/* Card 2: Posko & Reuni Keluarga */}
            <div className="soft-card p-7 rotate-[1.5deg] hover:rotate-0 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#20bf6b] flex items-center justify-center text-white mb-4">
                  <Shield className="w-6 h-6 stroke-[2.5]" />
                </div>
                <span className="font-mono text-xs font-bold text-slate-400 uppercase tracking-wider block">POSKO DARURAT</span>
                <h3 className="font-bebas text-3xl uppercase text-[#121212] mt-1">
                  REUNI KELUARGA PENGUNGSI
                </h3>
                <p className="font-sans text-xs text-slate-600 mt-2 leading-relaxed">
                  Pencarian instan kerabat yang dievakuasi di Posko A, B, dan C dilengkapi kondisi medis dan narahubung resmi.
                </p>
              </div>
              <a
                href="#posko"
                className="mt-6 inline-flex items-center gap-1.5 font-bebas text-lg text-[#20bf6b] hover:text-[#121212] transition-colors"
              >
                CARI DAFTAR KORBAN →
              </a>
            </div>

            {/* Card 3: Edukasi & Penanggulangan */}
            <div className="soft-card p-7 rotate-[-1deg] hover:rotate-0 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#e6a73c] flex items-center justify-center text-[#121212] mb-4">
                  <BookOpen className="w-6 h-6 stroke-[2.5]" />
                </div>
                <span className="font-mono text-xs font-bold text-slate-400 uppercase tracking-wider block">MODUL EDUKASI</span>
                <h3 className="font-bebas text-3xl uppercase text-[#121212] mt-1">
                  EDUKASI & MITIGASI BENCANA
                </h3>
                <p className="font-sans text-xs text-slate-600 mt-2 leading-relaxed">
                  Studi ilmiah penyebab karhutla, 5 dampak negatif vs 4 dampak positif alami, serta regulasi UU No. 24/2007.
                </p>
              </div>
              <a
                href="#edukasi"
                className="mt-6 inline-flex items-center gap-1.5 font-bebas text-lg text-[#e6a73c] hover:text-[#121212] transition-colors"
              >
                BACA MATERI EDUKASI →
              </a>
            </div>
          </div>

          {/* Quick Action Navigation Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-black/10">
            <p className="font-sans text-xs sm:text-sm text-slate-600 max-w-xl">
              Seluruh data mengacu pada standar <strong>BNPB 2026</strong>, integrasi <strong>karhutla.cloud</strong>, serta rujukan <strong>UU No. 24 Tahun 2007</strong>.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#posko"
                className="pill-btn-coral text-sm"
              >
                <Search className="w-4 h-4" />
                <span>CARI KORBAN DI POSKO</span>
              </a>
              <Link
                href="/lapor"
                className="pill-btn-black text-sm"
              >
                <AlertCircle className="w-4 h-4 text-[#dc5645]" />
                <span>LAPOR HILANG (TIKET)</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Hotspot Geoportal Map (#peta) - Smooth, borderless, seamless */}
      <section id="peta" className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-3 h-3 rounded-full bg-[#dc5645] inline-block animate-ping"></span>
              <span className="font-mono text-xs font-bold text-slate-500 uppercase">MODUL SPASIAL LIVE</span>
            </div>
            <h2 className="font-bebas text-5xl sm:text-7xl uppercase tracking-wider text-[#121212] leading-none">
              PETA SEBARAN TITIK PANAS (GIS 2026)
            </h2>
            <p className="text-sm sm:text-base text-slate-700 font-sans mt-2 max-w-2xl">
              Visualisasi satelit OpenStreetMap 100% bebas watermark • Algoritma Supercluster Canvas 60 FPS • Penanda Posko Evakuasi A, B, C
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs shrink-0">
            <span className="sticker-badge bg-[#121212] text-white">
              SUMATERA & KALIMANTAN
            </span>
          </div>
        </div>

        {/* Map Container */}
        <div className="rounded-3xl overflow-hidden shadow-xl">
          <HotspotMap hotspots={hotspots} shelters={shelters} />
        </div>
      </section>

      {/* 3. Section: Korban & Posko Evakuasi Interactive Directory (#posko) */}
      <EvacueeSearchSection initialEvacuees={evacuees} shelters={shelters} />

      {/* 4. Section: Indeks Kualitas Udara (US EPA AQI - from karhutla.cloud) (#aqi)
          Rich Terracotta/Coral backdrop with borderless cards */}
      <section id="aqi" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#dc5645] text-white">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/20 pb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="sticker-badge bg-[#e6a73c] text-[#121212] text-xs font-bold">
                  ★ KARHUTLA.CLOUD INTEGRATION
                </span>
                <span className="sticker-badge bg-white text-[#121212] text-xs font-bold">
                  US EPA AIRNOW STANDARDS
                </span>
              </div>
              <h2 className="font-bebas text-6xl sm:text-8xl tracking-wider uppercase leading-none">
                INDEKS KUALITAS UDARA (AQI)
              </h2>
              <p className="text-base sm:text-lg text-white/90 font-sans max-w-2xl mt-2 leading-relaxed">
                Pemantauan konsentrasi partikulat polusi PM2.5 akibat kabut asap karhutla di 6 stasiun daerah terdampak paling parah.
              </p>
            </div>

            {/* Giant Stat Callout (Muse Group style big typography highlight) */}
            <div className="bg-[#121212] text-white p-6 rounded-3xl shadow-2xl shrink-0">
              <span className="font-mono text-xs text-slate-400 uppercase tracking-wider block">AQI TERTINGGI HARI INI:</span>
              <div className="font-bebas text-5xl sm:text-6xl text-[#e6a73c] leading-none my-1">
                278 AQI
              </div>
              <span className="font-mono text-xs text-white font-bold block">
                SAMPIT (KOTIM) - SANGAT TIDAK SEHAT
              </span>
            </div>
          </div>

          {/* 6 City Station Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {aqiStations.map((station) => (
              <div
                key={station.id}
                className="bg-white/95 backdrop-blur-md text-[#121212] p-6 rounded-3xl shadow-md flex flex-col justify-between"
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

                  <h3 className="font-bebas text-4xl uppercase text-[#121212] leading-tight">
                    {station.city}
                  </h3>

                  <div className="flex items-baseline gap-3 my-2 font-display">
                    <span className="font-bebas text-5xl leading-none" style={{ color: station.color }}>
                      {station.aqi} AQI
                    </span>
                    <span className="font-mono text-xs text-slate-500 font-bold">
                      PM2.5: {station.pm25} µg/m³
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-black/5 font-sans text-xs bg-[#f5f2eb] p-3 rounded-2xl text-slate-800">
                  <strong className="block text-[#121212] font-display text-xs mb-0.5">Saran Medis & Masker:</strong>
                  {station.recommendation}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Section: EDUKASI & MITIGASI KARHUTLA (Full Education Section based on Red and Black Bold Firefighter Presentation.pdf) */}
      <section id="edukasi" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#181818] text-white">
        <div id="mitigasi" className="max-w-7xl mx-auto space-y-16">
          {/* Section Header & Author Attribution from PDF */}
          <div className="border-b border-white/10 pb-8">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="sticker-badge bg-[#dc5645] text-white">
                ★ ENSIKLOPEDIA EDUKASI BENCANA
              </span>
              <span className="sticker-badge bg-[#e6a73c] text-[#121212]">
                RUJUKAN ILMIAH & REGULASI UU NO. 24/2007
              </span>
            </div>

            <h2 className="font-bebas text-6xl sm:text-8xl md:text-9xl uppercase tracking-wider text-white leading-none">
              EDUKASI & MITIGASI KARHUTLA
            </h2>

            {/* Description merged seamlessly with background */}
            <p className="text-base sm:text-xl text-slate-300 font-sans max-w-3xl mt-4 leading-relaxed">
              Panduan edukasi komprehensif penanggulangan kebakaran hutan dan lahan: mulai dari identifikasi penyebab, dua sisi dampak ekologis, trias siklus penanggulangan, hingga mitigasi fisik & hukum gambut.
            </p>

            {/* Tim Peneliti & Penyusun Mahasiswa (Slide 2 PDF) */}
            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
              <span className="text-white font-bold uppercase">Tim Mahasiswa Penyusun:</span>
              <span className="bg-white/10 px-3 py-1 rounded-full text-slate-200">Makfiy Ahmad Hamizan (124250245)</span>
              <span className="bg-white/10 px-3 py-1 rounded-full text-slate-200">Muammar Ghazy Syafrudin (124250133)</span>
              <span className="bg-white/10 px-3 py-1 rounded-full text-slate-200">Farel Paul Jhogi Silalahi (124250132)</span>
              <span className="bg-white/10 px-3 py-1 rounded-full text-slate-200">Bintang Fergiawan (124250143)</span>
            </div>
          </div>

          {/* Bab 1: DEFINISI RESMI (Slide 3 PDF) */}
          <div className="bg-[#242424] rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#dc5645]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="max-w-3xl space-y-4">
              <span className="sticker-badge bg-[#dc5645] text-white">
                BAB 01 • DEFINISI
              </span>
              <h3 className="font-bebas text-4xl sm:text-6xl uppercase tracking-wider text-white leading-none">
                APA ITU KEBAKARAN HUTAN & LAHAN (KARHUTLA)?
              </h3>
              <p className="text-base sm:text-xl text-slate-300 font-sans leading-relaxed">
                <strong>Kebakaran Hutan dan Lahan (Karhutla)</strong> adalah peristiwa terbakarnya kawasan hutan atau lahan, seperti kawasan hutan lindung, lahan pertanian, perkebunan, dan bentang lahan gambut, yang menyebabkan kehancuran ekosistem, degradasi lingkungan hidup, serta mengganggu seluruh sendi kehidupan masyarakat.
              </p>
            </div>
          </div>

          {/* Bab 2: PENYEBAB KARHUTLA: ALAMI VS CAMPUR TANGAN MANUSIA (Slide 4 - 8 PDF) */}
          <div className="space-y-6">
            <div>
              <span className="sticker-badge bg-[#e6a73c] text-[#121212]">
                BAB 02 • PENYEBAB & STUDI KASUS NYATA
              </span>
              <h3 className="font-bebas text-4xl sm:text-6xl uppercase tracking-wider text-white mt-2">
                FAKTOR PENYEBAB: ALAMI (&lt;1%) VS. MANUSIA (&gt;99%)
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Penyebab Alami */}
              <div className="bg-[#242424] p-8 rounded-3xl space-y-5 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#4392f1] flex items-center justify-center text-white">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h4 className="font-bebas text-3xl uppercase text-white">
                    1. SECARA ALAMI (&lt;1% KASUS)
                  </h4>
                  <p className="text-sm text-slate-300 font-sans leading-relaxed">
                    Kebakaran yang dipicu oleh aktivitas murni fenomena alam tanpa campur tangan manusia. Terjadi sporadis pada musim kemarau ekstrem:
                  </p>
                  <ul className="text-xs font-mono text-slate-300 space-y-2 list-disc pl-5">
                    <li><strong>Kegiatan Vulkanik:</strong> Lontaran material piroklastik atau lava pijar dari gunung api aktif.</li>
                    <li><strong>Sambaran Petir Kering:</strong> Petir (*dry lightning*) yang menyambar vegetasi kering tanpa disertai curah hujan.</li>
                  </ul>
                </div>

                {/* Studi Kasus Alami dari Slide 6 PDF */}
                <div className="bg-black/40 p-4 rounded-2xl space-y-2 text-xs font-mono">
                  <span className="text-[#4392f1] font-bold block">★ DOKUMENTASI KASUS ALAMI:</span>
                  <div className="text-slate-300">
                    • <strong>Lembata, NTT (30 Juli 2021):</strong> Lava pijar erupsi Gunung Ile Lewotolok memicu kebakaran hutan lereng.
                  </div>
                  <div className="text-slate-300">
                    • <strong>Kota Batu, Jatim (21 November 2023):</strong> Disambar petir kering, lereng Gunung Panderman terbakar hebat.
                  </div>
                </div>
              </div>

              {/* Campur Tangan Manusia */}
              <div className="bg-[#242424] p-8 rounded-3xl space-y-5 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#dc5645] flex items-center justify-center text-white">
                    <Flame className="w-6 h-6" />
                  </div>
                  <h4 className="font-bebas text-3xl uppercase text-white">
                    2. CAMPUR TANGAN MANUSIA (&gt;99% UTAMA)
                  </h4>
                  <p className="text-sm text-slate-300 font-sans leading-relaxed">
                    Hampir seluruh bencana karhutla di Indonesia dipicu oleh perbuatan manusia, baik faktor kesengajaan ekonomis maupun kelalaian konyol:
                  </p>
                  <ul className="text-xs font-mono text-slate-300 space-y-2 list-disc pl-5">
                    <li><strong>Secara Disengaja:</strong> Praktik land clearing murah untuk perkebunan kelapa sawit dan HTI dengan membakar biomassa gambut.</li>
                    <li><strong>Secara Tidak Disengaja:</strong> Puntung rokok sembarangan, api unggun liar, dan penggunaan benda pemicu percikan api di area kering.</li>
                  </ul>
                </div>

                {/* Studi Kasus Manusia dari Slide 8 PDF */}
                <div className="bg-black/40 p-4 rounded-2xl space-y-2 text-xs font-mono">
                  <span className="text-[#dc5645] font-bold block">★ DOKUMENTASI KASUS HUKUM:</span>
                  <div className="text-slate-300">
                    • <strong>Muara Enim, Sumsel (25 Agustus 2026):</strong> Pelaku ditangkap dan dijadikan tersangka setelah sengaja membakar lahan untuk tanam sawit.
                  </div>
                  <div className="text-slate-300">
                    • <strong>Gunung Bromo, Jatim (6 September 2023):</strong> Flare foto prewedding membakar 504 hektar savana kaldera, merugikan negara <strong>Rp 5,4 Miliar</strong>!
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bab 3: DUA SISI DAMPAK: NEGATIF VS POSITIF (Slide 9 - 12 PDF) */}
          <div className="space-y-6">
            <div>
              <span className="sticker-badge bg-[#20bf6b] text-white">
                BAB 03 • DILEMA EKOLOGIS
              </span>
              <h3 className="font-bebas text-4xl sm:text-6xl uppercase tracking-wider text-white mt-2">
                DUA SISI DAMPAK: 5 DAMPAK NEGATIF VS. 4 DAMPAK POSITIF ALAMI
              </h3>
              <p className="text-sm text-slate-400 font-sans">
                Apakah kebakaran hutan selalu berdampak buruk, atau adakah peran biologis di alam liar?
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Sisi Negatif */}
              <div className="bg-[#242424] p-8 rounded-3xl space-y-4">
                <div className="flex items-center gap-2">
                  <span className="sticker-badge bg-[#dc5645] text-white">DAMPAK NEGATIF MASIF</span>
                </div>
                <h4 className="font-bebas text-3xl uppercase text-[#dc5645]">
                  BENCANA KEMANUSIAAN & EKOLOGIS
                </h4>
                <div className="space-y-4 font-sans text-xs text-slate-300">
                  <div className="p-3.5 bg-black/30 rounded-2xl">
                    <strong className="text-white text-sm block mb-1">1. Krisis Kesehatan (Asap Beracun)</strong>
                    Memicu lonjakan penderita ISPA, memperparah penyakit asma, bronkitis kronis, hingga risiko kanker paru-paru jangka panjang pada anak-anak dan lansia.
                  </div>
                  <div className="p-3.5 bg-black/30 rounded-2xl">
                    <strong className="text-white text-sm block mb-1">2. Kerusakan Ekologis & Kepunahan</strong>
                    Menghancurkan habitat satwa liar (Orangutan, Harimau Sumatera) dan mengancam kepunahan spesies flora endemik yang belum sempat dipelajari.
                  </div>
                  <div className="p-3.5 bg-black/30 rounded-2xl">
                    <strong className="text-white text-sm block mb-1">3. Lumpuhnya Sektor Publik & Transportasi</strong>
                    Kabut asap pekat membuat jarak pandang drop di bawah 200 meter. Bandara lumpuh, pelayaran sungai terhenti, dan sekolah terpaksa diliburkan.
                  </div>
                  <div className="p-3.5 bg-black/30 rounded-2xl">
                    <strong className="text-white text-sm block mb-1">4. Kerugian Ekonomi Masif</strong>
                    Menghancurkan fasilitas publik, mematikan industri perkayuan legal, dan memusnahkan mata pencarian petani lokal.
                  </div>
                  <div className="p-3.5 bg-black/30 rounded-2xl">
                    <strong className="text-white text-sm block mb-1">5. Krisis Iklim & Bencana Lanjutan</strong>
                    Melepas miliaran ton gas rumah kaca (CO2 & CH4); hutan gundul memicu kekeringan parah saat kemarau dan banjir bandang saat hujan.
                  </div>
                </div>
              </div>

              {/* Sisi Positif Alami (Slide 11-12 PDF) */}
              <div className="bg-[#242424] p-8 rounded-3xl space-y-4">
                <div className="flex items-center gap-2">
                  <span className="sticker-badge bg-[#20bf6b] text-white">PERSPEKTIF ALAM LIAR</span>
                  <span className="text-xs text-slate-400 font-mono italic">&ldquo;Emangnya ada?&rdquo;</span>
                </div>
                <h4 className="font-bebas text-3xl uppercase text-[#20bf6b]">
                  MANFAAT EKOLOGIS SIKLUS ALAMI
                </h4>
                <div className="space-y-4 font-sans text-xs text-slate-300">
                  <div className="p-3.5 bg-black/30 rounded-2xl">
                    <strong className="text-[#20bf6b] text-sm block mb-1">1. Pembersihan Lantai Hutan (Natural Cleansing)</strong>
                    Api membakar tumpukan seresah daun mati, semak belukar liar, dan dahan membusuk. Ini memberi ruang agar sinar matahari bisa menembus lantai hutan untuk benih baru.
                  </div>
                  <div className="p-3.5 bg-black/30 rounded-2xl">
                    <strong className="text-[#20bf6b] text-sm block mb-1">2. Siklus Nutrisi Tanah</strong>
                    Abu sisa pembakaran biomassa organik mengandung mineral berharga (seperti fosfor dan kalium) yang seketika mengembalikan kesuburan tanah mineral.
                  </div>
                  <div className="p-3.5 bg-black/30 rounded-2xl">
                    <strong className="text-[#20bf6b] text-sm block mb-1">3. Memicu Pertumbuhan Spesies Tertentu (Serotiny)</strong>
                    Beberapa jenis pohon (seperti pohon pinus tertentu atau eucalyptus) memiliki cangkang biji keras (*serotinous cones*) yang <strong>hanya bisa membuka dan bertunas</strong> jika terkena suhu panas ekstrem api!
                  </div>
                  <div className="p-3.5 bg-black/30 rounded-2xl">
                    <strong className="text-[#20bf6b] text-sm block mb-1">4. Membasmi Hama & Jamur Patogen Hutan</strong>
                    Suhu panas api alami mematikan serangga parasit invasif dan jamur penyakit yang menginfeksi serta melemahkan tegakan pepohonan tua.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bab 4: TRIAS PENANGGULANGAN SIKLUS BENCANA (Slide 13 - 15 PDF) */}
          <div className="space-y-6">
            <div>
              <span className="sticker-badge bg-[#4392f1] text-white">
                BAB 04 • LANGKAH TANGGAP SIKLUS BENCANA
              </span>
              <h3 className="font-bebas text-4xl sm:text-6xl uppercase tracking-wider text-white mt-2">
                TRIAS PENANGGULANGAN KARHUTLA
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Pra-Bencana */}
              <div className="bg-[#242424] p-7 rounded-3xl space-y-4">
                <span className="sticker-badge bg-[#4392f1] text-white text-[11px]">
                  1. PENCEGAHAN (PRA-BENCANA)
                </span>
                <h4 className="font-bebas text-2xl uppercase text-white">
                  DETEKSI DINI & TATA KELOLA GAMBUT
                </h4>
                <ul className="text-xs font-sans text-slate-300 space-y-2">
                  <li><strong>• Deteksi Dini:</strong> Pemantauan anomali hotspot via satelit MODIS/VIIRS dan patroli terpadu Manggala Agni.</li>
                  <li><strong>• Pengelolaan Gambut:</strong> Pembuatan sekat kanal (*canal blocking*) untuk menahan muka air minimal 40 cm.</li>
                  <li><strong>• Edukasi & Regulasi:</strong> Penerapan aturan ketat larangan membakar (*zero burning*) bagi warga dan pemilik konsesi.</li>
                </ul>
              </div>

              {/* Saat Bencana */}
              <div className="bg-[#242424] p-7 rounded-3xl space-y-4">
                <span className="sticker-badge bg-[#dc5645] text-white text-[11px]">
                  2. PENANGANAN (SAAT BENCANA)
                </span>
                <h4 className="font-bebas text-2xl uppercase text-white">
                  PEMADAMAN & EVAKUASI WARGA
                </h4>
                <ul className="text-xs font-sans text-slate-300 space-y-2">
                  <li><strong>• Operasi Pemadaman:</strong> Kombinasi regu tembak darat di titik api dan operasi helikopter *water bombing* udara.</li>
                  <li><strong>• Evakuasi Kelompok Rentan:</strong> Memindahkan anak-anak, ibu hamil, dan lansia ke ruang penampungan posko bebas asap.</li>
                  <li><strong>• Evakuasi Medis Cepat:</strong> Distribusi masker respirator N95 dan posko penanganan gawat darurat ISPA.</li>
                </ul>
              </div>

              {/* Pasca Bencana */}
              <div className="bg-[#242424] p-7 rounded-3xl space-y-4">
                <span className="sticker-badge bg-[#20bf6b] text-white text-[11px]">
                  3. PEMULIHAN (PASCA-BENCANA)
                </span>
                <h4 className="font-bebas text-2xl uppercase text-white">
                  REBOISASI & RESTORASI EKONOMI
                </h4>
                <ul className="text-xs font-sans text-slate-300 space-y-2">
                  <li><strong>• Reboisasi Ekologis:</strong> Penanaman kembali spesies pohon asli ramah gambut yang memiliki ketahanan alami terhadap api.</li>
                  <li><strong>• Pemulihan Ekonomi:</strong> Bantuan modal dan revitalisasi sumber pencaharian bagi petani lokal yang kebunnya hangus terbakar.</li>
                  <li><strong>• Audit Forensik Kebakaran:</strong> Investigasi legalitas konsesi untuk penetapan tersangka dan gugatan ganti rugi pemulihan.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bab 5: MITIGASI STRUKTURAL & NON-STRUKTURAL UU 24/2007 (Slide 16 - 18 PDF) */}
          <div className="space-y-6">
            <div>
              <span className="sticker-badge bg-[#e6a73c] text-[#121212]">
                BAB 05 • RUJUKAN HUKUM & REKAYASA TEKNIS
              </span>
              <h3 className="font-bebas text-4xl sm:text-6xl uppercase tracking-wider text-white mt-2">
                MITIGASI RESMI: UU NO. 24 TAHUN 2007 (PASAL 1 ANGKA 9)
              </h3>
              <p className="text-sm text-slate-300 font-sans max-w-3xl leading-relaxed">
                Mitigasi adalah serangkaian upaya untuk mengurangi risiko bencana, baik melalui pembangunan fisik maupun penyadaran dan peningkatan kemampuan menghadapi ancaman bencana.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Mitigasi Struktural (Slide 17 PDF) */}
              <div className="bg-[#242424] p-8 rounded-3xl space-y-5">
                <div className="flex items-center gap-2">
                  <span className="sticker-badge bg-[#4392f1] text-white">STRUKTURAL (FISIK & TEKNIS)</span>
                </div>
                <h4 className="font-bebas text-3xl uppercase text-white">
                  REKAYASA HIDROLOGI & KORIDOR FISIK
                </h4>
                <div className="space-y-4 font-sans text-xs text-slate-300">
                  <div className="p-4 bg-black/40 rounded-2xl space-y-1">
                    <strong className="text-white text-sm block">1. Rewetting (Pembasahan Gambut)</strong>
                    <p>Upaya membasahi kembali lahan gambut yang kering dengan cara menahan laju aliran air drainase menggunakan sekat kanal bertingkat (*canal blocking*).</p>
                  </div>
                  <div className="p-4 bg-black/40 rounded-2xl space-y-1">
                    <strong className="text-white text-sm block">2. Pembangunan Infrastruktur Air Cepat</strong>
                    <p>Penyediaan tampungan air statis, kantong air terpal, dan embung retensi darurat di dalam kawasan hutan rawan untuk mempercepat respon pemadaman.</p>
                  </div>
                  <div className="p-4 bg-black/40 rounded-2xl space-y-1">
                    <strong className="text-white text-sm block">3. Pembuatan Sekat Bakar Buatan (Firebreak)</strong>
                    <p>Pembersihan jalur tanah selebar 5 sampai 10 meter tanpa vegetasi kering untuk memutus persambungan bahan bakar biomassa di lantai hutan.</p>
                  </div>
                </div>
              </div>

              {/* Mitigasi Non-Struktural (Slide 18 PDF) */}
              <div className="bg-[#242424] p-8 rounded-3xl space-y-5">
                <div className="flex items-center gap-2">
                  <span className="sticker-badge bg-[#dc5645] text-white">NON-STRUKTURAL (ATURAN, SOSIAL & TEKNOLOGI)</span>
                </div>
                <h4 className="font-bebas text-3xl uppercase text-white">
                  PENEGAKAN HUKUM, SOSIAL & SATELIT
                </h4>
                <div className="space-y-4 font-sans text-xs text-slate-300">
                  <div className="p-4 bg-black/40 rounded-2xl space-y-1">
                    <strong className="text-white text-sm block">1. Penegakan Regulasi Pidana (Pasal 75–79)</strong>
                    <p>Sanksi penjara hingga 10 tahun dan denda hingga Rp10 Miliar bagi pembakar sengaja korporasi, disertai asas pertanggungjawaban mutlak (*strict liability*).</p>
                  </div>
                  <div className="p-4 bg-black/40 rounded-2xl space-y-1">
                    <strong className="text-white text-sm block">2. Izin Wajib Analisis Risiko Bencana (Pasal 40 & 41)</strong>
                    <p>Kewajiban penyusunan dokumen Analisis Risiko Bencana bagi setiap kegiatan usaha perkebunan dan kehutanan yang berpotensi memicu bencana.</p>
                  </div>
                  <div className="p-4 bg-black/40 rounded-2xl space-y-1">
                    <strong className="text-white text-sm block">3. Pemberdayaan Masyarakat Peduli Api (MPA)</strong>
                    <p>Pelatihan teknik Pembukaan Lahan Tanpa Bakar (PLTB) dan insentif pengelolaan mikro bagi kelompok tani di sekitar tapak hutan.</p>
                  </div>
                  <div className="p-4 bg-black/40 rounded-2xl space-y-1">
                    <strong className="text-white text-sm block">4. Sistem Peringatan Dini (FDRS & Satelit)</strong>
                    <p>Fire Danger Rating System (FDRS) BMKG dan pemantauan satelit hotspot MODIS/VIIRS secara real-time oleh BNPB.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Section: Transparansi Konsesi Korporasi (karhutla.cloud reference) (#konsesi) */}
      <section id="konsesi" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Building2 className="w-4 h-4 text-[#dc5645]" />
              <span className="font-mono text-xs font-bold text-slate-500 uppercase">AKUNTABILITAS KORPORASI</span>
            </div>
            <h2 className="font-bebas text-5xl sm:text-7xl uppercase tracking-wider text-[#121212] leading-none">
              REKAM JEJAK KONSESI DI LAHAN GAMBUT
            </h2>
            <p className="text-sm sm:text-base text-slate-700 font-sans mt-2 max-w-2xl">
              Data transparansi izin perkebunan kelapa sawit (HGU) dan kehutanan (PBPH-HTI) di sekitar sebaran titik api aktif.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
          {corporateConcessions.map((corp) => (
            <div
              key={corp.id}
              className="soft-card p-6 space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="sticker-badge bg-[#f5f2eb] text-[#121212] text-[10px]">
                  {corp.sector}
                </span>
                <span className="sticker-badge bg-[#dc5645] text-white text-[10px]">
                  {corp.gakkum_status}
                </span>
              </div>
              <div>
                <h3 className="font-bebas text-3xl uppercase text-[#121212] leading-tight">
                  {corp.company_name}
                </h3>
                <p className="text-slate-500 text-xs font-sans mt-0.5">
                  Grup Induk: <strong>{corp.group_name}</strong> • Wilayah: <strong>{corp.regency}, {corp.province}</strong>
                </p>
              </div>

              <div className="bg-[#f5f2eb] p-4 rounded-2xl space-y-1.5 font-mono text-xs text-slate-800">
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
