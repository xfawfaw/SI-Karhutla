import React from 'react';
import Link from 'next/link';
import { BookOpen, Scale, Droplets, Flame, Trees, AlertTriangle, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';

export default function MitigasiPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1 space-y-10">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-orange-600/20 text-orange-400 border border-orange-500/30 uppercase tracking-wider">
            ENSIKLOPEDIA MITIGASI & REGULASI
          </span>
          <span className="text-xs text-slate-400 font-mono">
            Rujukan Ilmiah & UU No. 24 Tahun 2007
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
          Mitigasi Bencana Kebakaran Hutan & Lahan Gambut
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
          Panduan teknis penanggulangan karhutla berbasis rekayasa lingkungan (struktural) dan penegakan hukum tata kelola lahan (non-struktural) untuk mencegah bencana kabut asap lintas batas (*transboundary haze*).
        </p>
      </div>

      {/* Cause Comparison Matrix: Alami vs Manusia */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
          <Flame className="w-5 h-5 text-orange-400" />
          <h2 className="text-lg font-bold font-mono text-white">
            1. Perbandingan Penyebab Karhutla: Alami vs. Antropogenik
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Alami */}
          <div className="bg-[#101726] border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-blue-400 bg-blue-950/60 border border-blue-800 px-2 py-0.5 rounded">
                FAKTOR ALAMI (&lt;1%)
              </span>
              <span className="text-xs text-slate-500 font-mono">Frekuensi Jarang</span>
            </div>
            <h3 className="text-base font-bold text-white font-mono">
              Petir Vulkanik & Panas Ekstrem El Niño
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Kebakaran alami umumnya dipicu oleh sambaran petir kering (*dry lightning*) pada musim kemarau ekstrem atau semburan material piroklastik vulkanik di kawasan lereng gunung berapi.
            </p>
            <ul className="text-xs text-slate-400 space-y-1.5 pt-2 border-t border-slate-800 font-mono">
              <li>• Karakteristik: Titik api terisolasi dan berada di vegetasi pegunungan tinggi.</li>
              <li>• Pola Sebaran: Sporadis tanpa pola kanal atau petak lahan.</li>
              <li>• Dampak Gambut: Sangat jarang menyentuh kedalaman kubah gambut tebal.</li>
            </ul>
          </div>

          {/* Manusia */}
          <div className="bg-[#101726] border border-red-950/80 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-red-400 bg-red-950/80 border border-red-800 px-2 py-0.5 rounded">
                FAKTOR ANTROPOGENIK (&gt;99%)
              </span>
              <span className="text-xs text-red-400 font-mono font-bold">Penyebab Utama</span>
            </div>
            <h3 className="text-base font-bold text-white font-mono">
              Pembukaan Lahan (Land Clearing) & Drainase Gambut
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Sebagian besar karhutla di Indonesia dipicu pembakaran sengaja untuk penyiapan lahan perkebunan sawit atau HTI karena biayanya yang jauh lebih murah dibandingkan metode mekanis (*zero-burning*).
            </p>
            <ul className="text-xs text-slate-400 space-y-1.5 pt-2 border-t border-slate-800 font-mono">
              <li>• Pembuatan Parit/Kanal Drainase: Menurunkan muka air tanah, gambut menjadi bahan bakar kering.</li>
              <li>• Titik Api Linier: Mengikuti batas konsesi dan jalan setapak korporasi.</li>
              <li>• Dampak Bawah Permukaan (*Smoldering Fire*): Api merambat di bawah tanah tanpa api terbuka.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Structural Mitigation Solutions */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
          <Droplets className="w-5 h-5 text-blue-400" />
          <h2 className="text-lg font-bold font-mono text-white">
            2. Solusi Mitigasi Fisik Struktural
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Canal Blocking */}
          <div className="bg-[#101726] border border-slate-800 rounded-2xl p-5 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
                <Droplets className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white font-mono">
                Canal Blocking (Rewetting)
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Pembangunan sekat kanal bertingkat untuk menahan limpasan air permukaan dan mengembalikan elevasi air tanah gambut minimal <strong>40 cm</strong> di bawah permukaan (PP No. 57/2016).
              </p>
            </div>
            <div className="pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-400">
              Mencegah gambut mengalami kekeringan pirolitik irreversibel.
            </div>
          </div>

          {/* Embung Air */}
          <div className="bg-[#101726] border border-slate-800 rounded-2xl p-5 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <Trees className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white font-mono">
                Embung Penampung Air Darurat
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Pembuatan kolam retensi air di tengah kawasan hutan rawan kebakaran sebagai sumber pasokan hisap bagi regu pemadam darat (Manggala Agni) dan helikopter <em>water bombing</em>.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-400">
              Radius jangkau suplai air hingga 5 km dari garis api.
            </div>
          </div>

          {/* Sekat Bakar */}
          <div className="bg-[#101726] border border-slate-800 rounded-2xl p-5 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-orange-600/20 border border-orange-500/40 flex items-center justify-center text-orange-400">
                <Flame className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white font-mono">
                Sekat Bakar (Firebreaks)
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Pembersihan koridor jalur tanah mineral selebar 10–30 meter tanpa vegetasi bahan bakar untuk memutus rambatan api tajuk (*crown fire*) antar blok konsesi perkebunan.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-400">
              Garis pertahanan fisik utama regu TRC pemadam.
            </div>
          </div>
        </div>
      </section>

      {/* Non-Structural Mitigation: UU No. 24 Tahun 2007 & Penegakan Hukum */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
          <Scale className="w-5 h-5 text-orange-400" />
          <h2 className="text-lg font-bold font-mono text-white">
            3. Mitigasi Non-Struktural: Regulasi UU No. 24 Tahun 2007
          </h2>
        </div>

        <div className="bg-[#101726] border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-orange-400 uppercase tracking-wider">
              HAK WARGA & TANGGUNG JAWAB NEGARA
            </span>
            <h3 className="text-base font-bold text-white font-mono">
              Pasal 40 UU No. 24 Tahun 2007 (Hak Pengungsi Korban Bencana)
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Setiap warga masyarakat yang terdampak langsung oleh bencana kebakaran hutan dan lahan berhak memperoleh:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-xs">
                <strong className="text-white block font-mono">a. Kebutuhan Dasar</strong>
                <span className="text-slate-400 text-[11px]">Ransum pangan higienis, air bersih, selimut, dan masker filtrasi partikulat PM2.5.</span>
              </div>
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-xs">
                <strong className="text-white block font-mono">b. Pelayanan Medis Bebas Biaya</strong>
                <span className="text-slate-400 text-[11px]">Penanganan rawat inap ISPA akut, terapi nebulizer, dan obat pereda iritasi mata.</span>
              </div>
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-xs">
                <strong className="text-white block font-mono">c. Informasi Keberadaan Keluarga</strong>
                <span className="text-slate-400 text-[11px]">Akses terhadap sistem pelacakan korban dan pemulihan kontak keluarga yang terpisah.</span>
              </div>
            </div>
          </div>

          {/* Sanksi Pidana Pasal 75 - 79 */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-wider">
              KETENTUAN PIDANA & PERTANGGUNGJAWABAN MUTLAK (STRICT LIABILITY)
            </span>
            <h3 className="text-base font-bold text-white font-mono">
              Pasal 75–79 UU No. 24 Tahun 2007 & UU No. 32 Tahun 2009
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-red-950/20 border border-red-900/40 p-4 rounded-xl space-y-1.5">
                <div className="flex items-center justify-between text-red-300 font-bold">
                  <span>Pidana Kelalaian (Negligence)</span>
                  <span className="text-[10px] bg-red-900/60 px-1.5 py-0.5 rounded">Pasal 76</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Setiap orang yang karena kelalaiannya mengakibatkan terjadinya bencana kebakaran diancam pidana penjara paling lama <strong>3 (tiga) tahun</strong> atau denda maksimal <strong>Rp300.000.000,-</strong>.
                </p>
              </div>

              <div className="bg-red-950/40 border border-red-800/60 p-4 rounded-xl space-y-1.5">
                <div className="flex items-center justify-between text-red-400 font-bold">
                  <span>Pembakaran Sengaja Korporasi</span>
                  <span className="text-[10px] bg-red-900/90 px-1.5 py-0.5 rounded">Pasal 75 / UU PPLH</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Pelaku pembakaran lahan disengaja dipidana penjara maksimal <strong>10 (sepuluh) tahun</strong> dan denda hingga <strong>Rp10.000.000.000,-</strong> disertai pencabutan izin konsesi perkebunan dan ganti rugi restorasi ekologis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
