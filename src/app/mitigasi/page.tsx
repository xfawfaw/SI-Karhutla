import React from 'react';
import Link from 'next/link';
import { Droplets, Flame, Trees, Scale, Building2, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function MitigasiPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1 space-y-10 font-mono text-black">
      {/* Title */}
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="bg-[#ffde59] text-black font-mono font-bold text-xs uppercase px-2.5 py-0.5 border-2 border-black shadow-brutal-sm">
            ★ ENSIKLOPEDIA MITIGASI GAMBUT
          </span>
          <span className="bg-[#eb3b5a] text-white font-mono font-bold text-xs uppercase px-2.5 py-0.5 border-2 border-black shadow-brutal-sm">
            RUJUKAN UU NO. 24 TAHUN 2007
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight uppercase text-black">
          MITIGASI TEKNIS & PENEGAKAN HUKUM KARHUTLA
        </h1>
        <p className="text-xs sm:text-sm text-slate-800 mt-1 max-w-2xl font-mono">
          Pedoman rekayasa lingkungan lahan gambut berkelanjutan serta sanksi pidana dan perdata bagi pembakaran hutan dan lahan.
        </p>
      </div>

      {/* 1. Comparison Matrix: Alami vs Manusia */}
      <section className="space-y-4">
        <h2 className="text-2xl font-black font-display uppercase tracking-wide border-b-2 border-black pb-1">
          1. PERBANDINGAN PENYEBAB: ALAMI VS. ANTROPOGENIK
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-white border-3 border-black p-5 shadow-brutal space-y-3">
            <span className="bg-[#3867d6] text-white font-black text-xs px-2.5 py-1 border-2 border-black inline-block shadow-brutal-sm">
              FAKTOR ALAMI (&lt;1%)
            </span>
            <h3 className="text-2xl font-black font-display uppercase">PETIR KERING & PANAS EKSTREM</h3>
            <p className="text-xs text-slate-700 leading-relaxed">
              Sambaran petir kering (*dry lightning*) saat puncak El Niño atau lontaran material vulkanik. Sebaran titik api bersifat sporadis pada puncak bukit tanpa pola sistem parit buatan manusia.
            </p>
          </div>

          <div className="bg-white border-3 border-black p-5 shadow-brutal space-y-3">
            <span className="bg-[#eb3b5a] text-white font-black text-xs px-2.5 py-1 border-2 border-black inline-block shadow-brutal-sm">
              FAKTOR MANUSIA (&gt;99% UTAMA)
            </span>
            <h3 className="text-2xl font-black font-display uppercase">PEMBUKAAN LAHAN & DRAINASE KANAL</h3>
            <p className="text-xs text-slate-700 leading-relaxed">
              Pembakaran sengaja untuk penyiapan perkebunan sawit/HTI. Pembuatan kanal drainase menyebabkan air tanah gambut terkuras, sehingga kubah gambut berubah menjadi bahan bakar kering yang mudah terbakar di bawah permukaan (*smoldering fire*).
            </p>
          </div>
        </div>
      </section>

      {/* 2. Structural Solutions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-black font-display uppercase tracking-wide border-b-2 border-black pb-1">
          2. MITIGASI FISIK STRUKTURAL GAMBUT
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-white border-3 border-black p-5 shadow-brutal space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-12 h-12 bg-[#3867d6] border-2 border-black shadow-brutal-sm flex items-center justify-center text-white">
                <Droplets className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h3 className="text-xl font-black font-display uppercase">CANAL BLOCKING (REWETTING)</h3>
              <p className="text-xs text-slate-700 leading-relaxed">
                Pembangunan sekat kanal bertingkat untuk menahan laju air dan menjaga tinggi muka air tanah gambut minimal <strong>40 cm</strong> di bawah permukaan tanah (PP No. 57/2016).
              </p>
            </div>
            <div className="p-2 bg-[#f4f0e8] border border-black text-[11px] font-bold">
              Target: Membasahi kembali kubah gambut kering.
            </div>
          </div>

          <div className="bg-white border-3 border-black p-5 shadow-brutal space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-12 h-12 bg-[#20bf6b] border-2 border-black shadow-brutal-sm flex items-center justify-center text-black">
                <Trees className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h3 className="text-xl font-black font-display uppercase">EMBUNG PENAMPUNG AIR</h3>
              <p className="text-xs text-slate-700 leading-relaxed">
                Kolam retensi air darurat di tengah blok konsesi hutan rawan untuk menyuplai armada pemadam darat (Manggala Agni) dan helikopter <em>water bombing</em>.
              </p>
            </div>
            <div className="p-2 bg-[#f4f0e8] border border-black text-[11px] font-bold">
              Radius hisap suplai air hingga 5 km.
            </div>
          </div>

          <div className="bg-white border-3 border-black p-5 shadow-brutal space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-12 h-12 bg-[#ff5722] border-2 border-black shadow-brutal-sm flex items-center justify-center text-white">
                <Flame className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h3 className="text-xl font-black font-display uppercase">SEKAT BAKAR (FIREBREAKS)</h3>
              <p className="text-xs text-slate-700 leading-relaxed">
                Pembersihan koridor tanah mineral selebar 10–30 meter tanpa vegetasi kering guna memutus rambatan api tajuk (*crown fire*) antar petak lahan.
              </p>
            </div>
            <div className="p-2 bg-[#f4f0e8] border border-black text-[11px] font-bold">
              Barier fisik pertahanan regu TRC satgas.
            </div>
          </div>
        </div>
      </section>

      {/* 3. Non-Structural & Law (UU 24/2007) */}
      <section className="space-y-4">
        <h2 className="text-2xl font-black font-display uppercase tracking-wide border-b-2 border-black pb-1">
          3. KETENTUAN HUKUM & HAK WARGA (UU NO. 24 TAHUN 2007)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border-3 border-black p-6 shadow-brutal space-y-3">
            <span className="bg-[#20bf6b] text-black font-black text-xs px-2.5 py-1 border-2 border-black inline-block shadow-brutal-sm">
              PASAL 40: HAK PENGUNGSI BENCANA
            </span>
            <h3 className="text-2xl font-black font-display uppercase">PEMENUHAN KEBUTUHAN DASAR</h3>
            <p className="text-xs text-slate-800 leading-relaxed">
              Setiap korban yang dievakuasi di posko penampungan resmi berhak secara mutlak atas:
            </p>
            <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-4 pt-1">
              <li>Pangan higienis, air bersih, selimut, dan masker partikulat N95.</li>
              <li>Layanan medis ISPA darurat bebas biaya di fasilitas posko.</li>
              <li>Akses informasi status dan pelacakan keluarga yang terpisah.</li>
            </ul>
          </div>

          <div className="bg-[#ffde59] border-3 border-black p-6 shadow-brutal space-y-3">
            <span className="bg-[#eb3b5a] text-white font-black text-xs px-2.5 py-1 border-2 border-black inline-block shadow-brutal-sm">
              PASAL 75–79: PIDANA PEMBAKARAN
            </span>
            <h3 className="text-2xl font-black font-display uppercase">PERTANGGUNGJAWABAN MUTLAK</h3>
            <p className="text-xs text-slate-800 leading-relaxed">
              Sanksi hukum berat bagi pelaku dan korporasi pembakar lahan:
            </p>
            <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-4 pt-1">
              <li><strong>Kelalaian (Pasal 76):</strong> Pidana penjara hingga 3 tahun atau denda Rp300 Juta.</li>
              <li><strong>Pembakaran Sengaja Korporasi:</strong> Pidana penjara hingga 10 tahun dan denda perdata hingga Rp10 Miliar.</li>
              <li><strong>Pencabutan Izin HGU/HTI:</strong> Disertai kewajiban pemulihan ekologis gambut (*strict liability*).</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
