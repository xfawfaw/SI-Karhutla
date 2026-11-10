import React from 'react';
import { Droplets, Flame, Trees, Scale } from 'lucide-react';

export default function MitigasiPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1 space-y-8 font-mono text-xs">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Mitigasi Kebakaran Hutan & Lahan Gambut
        </h1>
        <p className="text-slate-400 mt-1">
          Rujukan teknis rekayasa gambut dan ketentuan regulasi UU No. 24 Tahun 2007.
        </p>
      </div>

      {/* 1. Comparison Matrix */}
      <section className="space-y-3">
        <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider border-b border-slate-800 pb-2">
          1. Perbandingan Penyebab Karhutla
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#0f172a] border border-slate-800 rounded-lg p-4 space-y-2">
            <span className="text-blue-400 font-bold block">Faktor Alami (&lt;1%)</span>
            <h3 className="text-white font-bold text-sm">Petir Kering & Panas Ekstrem</h3>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Sambaran petir kering (*dry lightning*) pada kemarau panjang atau piroklastik vulkanik. Sebaran sporadis pada elevasi tinggi tanpa pola parit.
            </p>
          </div>

          <div className="bg-[#0f172a] border border-slate-800 rounded-lg p-4 space-y-2">
            <span className="text-orange-400 font-bold block">Faktor Manusia (&gt;99%)</span>
            <h3 className="text-white font-bold text-sm">Pembukaan Lahan & Drainase Kanal</h3>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Pembakaran sengaja untuk perkebunan sawit/HTI. Pembuatan parit menurunkan muka air tanah, menyebabkan kebakaran gambut bawah tanah (*smoldering fire*).
            </p>
          </div>
        </div>
      </section>

      {/* 2. Structural Solutions */}
      <section className="space-y-3">
        <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider border-b border-slate-800 pb-2">
          2. Mitigasi Fisik Struktural
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#0f172a] border border-slate-800 rounded-lg p-4 space-y-2">
            <div className="w-8 h-8 rounded bg-blue-950 border border-blue-800 flex items-center justify-center text-blue-400">
              <Droplets className="w-4 h-4" />
            </div>
            <h3 className="text-white font-bold">Canal Blocking (Rewetting)</h3>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Sekat kanal bertingkat untuk menahan limpasan air dan menjaga elevasi air gambut minimal 40 cm dari permukaan tanah (PP No. 57/2016).
            </p>
          </div>

          <div className="bg-[#0f172a] border border-slate-800 rounded-lg p-4 space-y-2">
            <div className="w-8 h-8 rounded bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400">
              <Trees className="w-4 h-4" />
            </div>
            <h3 className="text-white font-bold">Embung Air Darurat</h3>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Kolam retensi air di tengah kawasan hutan rawan sebagai pasokan regu pemadam darat dan helikopter <em>water bombing</em>.
            </p>
          </div>

          <div className="bg-[#0f172a] border border-slate-800 rounded-lg p-4 space-y-2">
            <div className="w-8 h-8 rounded bg-orange-950 border border-orange-800 flex items-center justify-center text-orange-400">
              <Flame className="w-4 h-4" />
            </div>
            <h3 className="text-white font-bold">Sekat Bakar (Firebreak)</h3>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Pembersihan koridor tanah mineral selebar 10–30 meter tanpa vegetasi kering untuk memutus rambatan api tajuk antar-blok konsesi.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Non-Structural & Law */}
      <section className="space-y-3">
        <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider border-b border-slate-800 pb-2">
          3. Ketentuan Hukum (UU No. 24 Tahun 2007)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#0f172a] border border-slate-800 rounded-lg p-4 space-y-2">
            <h3 className="text-emerald-400 font-bold">Pasal 40: Hak Pengungsi</h3>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Korban bencana berhak atas pemenuhan kebutuhan dasar: pangan, air bersih, masker PM2.5, layanan medis darurat ISPA bebas biaya, dan informasi keberadaan anggota keluarga.
            </p>
          </div>

          <div className="bg-[#0f172a] border border-slate-800 rounded-lg p-4 space-y-2">
            <h3 className="text-red-400 font-bold">Pasal 75–79: Pidana Pembakaran Lahan</h3>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Kelalaian dipidana penjara hingga 3 tahun (Pasal 76). Pembakaran sengaja oleh korporasi diancam penjara hingga 10 tahun dan denda hingga Rp10 Miliar serta ganti rugi restorasi gambut.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
