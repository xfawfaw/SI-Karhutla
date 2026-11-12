'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TactileHighlight } from '@/components/ui/tactile-highlight';
import {
  Sparkles,
  Flame,
  Shield,
  BookOpen,
  Scale,
  Trees,
  Droplets,
  AlertTriangle,
  Building2,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export default function EducationSection() {
  return (
    <section
      id="edukasi"
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#181818] text-white transition-colors duration-500 overflow-hidden"
    >
      <div id="mitigasi" className="max-w-7xl mx-auto space-y-16">
        {/* Section Header & Author Attribution */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="border-b border-white/10 pb-8 space-y-4"
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#dc5645] text-white font-mono text-[11px] font-bold uppercase tracking-wider">
              ★ ENSIKLOPEDIA EDUKASI BENCANA
            </span>
            <span className="px-3 py-1 rounded-full bg-[#e6a73c] text-[#121212] font-mono text-[11px] font-bold uppercase tracking-wider">
              RUJUKAN ILMIAH & REGULASI UU NO. 24/2007
            </span>
          </div>

          {/* Combined Font Style Title */}
          <h2 className="leading-[0.92] uppercase text-white">
            <span className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight block">
              EDUKASI & MITIGASI
            </span>
            <span className="flex flex-wrap items-baseline gap-2 sm:gap-3 mt-1 sm:mt-2">
              <span className="font-serif italic lowercase font-normal text-3xl sm:text-5xl md:text-6xl text-[#dc5645] tracking-normal select-none">
                panduan komprehensif
              </span>
              <TactileHighlight direction="left" delay={0.15} trigger="inView">
                <span className="font-display font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white">
                  KEBAKARAN LAHAN
                </span>
              </TactileHighlight>
            </span>
          </h2>

          <p className="text-base sm:text-xl text-slate-300 font-sans max-w-3xl leading-relaxed pt-1">
            Panduan edukasi komprehensif penanggulangan kebakaran hutan dan lahan: mulai dari identifikasi penyebab, dua sisi dampak ekologis, trias siklus penanggulangan, hingga mitigasi fisik & regulasi hukum gambut.
          </p>

          {/* Tim Peneliti & Penyusun Mahasiswa (Slide 2 PDF) */}
          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400">
            <span className="text-white font-bold uppercase tracking-wider">Tim Mahasiswa Penyusun:</span>
            <span className="bg-white/10 px-3 py-1 rounded-full text-slate-200">Makfiy Ahmad Hamizan (124250245)</span>
            <span className="bg-white/10 px-3 py-1 rounded-full text-slate-200">Muammar Ghazy Syafrudin (124250133)</span>
            <span className="bg-white/10 px-3 py-1 rounded-full text-slate-200">Farel Paul Jhogi Silalahi (124250132)</span>
            <span className="bg-white/10 px-3 py-1 rounded-full text-slate-200">Bintang Fergiawan (124250143)</span>
          </div>
        </motion.div>

        {/* Bab 1: DEFINISI RESMI (Slide 3 PDF) - Broadsheet Architectural Divider */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="border-y border-white/10 py-8 sm:py-12 my-6"
        >
          <div className="max-w-4xl space-y-4">
            <span className="inline-block px-3 py-1 rounded-full bg-[#dc5645] text-white font-mono text-[11px] font-bold uppercase tracking-wider">
              BAB 01 • DEFINISI RESMI
            </span>
            <h3 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white leading-tight">
              APA ITU KEBAKARAN HUTAN & LAHAN (KARHUTLA)?
            </h3>
            <p className="text-base sm:text-xl text-slate-300 font-sans leading-relaxed">
              <strong>Kebakaran Hutan dan Lahan (Karhutla)</strong> adalah peristiwa terbakarnya kawasan hutan atau lahan, seperti kawasan hutan lindung, lahan pertanian, perkebunan, dan bentang lahan gambut, yang menyebabkan kehancuran ekosistem, degradasi lingkungan hidup, serta mengganggu seluruh sendi kehidupan masyarakat.
            </p>
          </div>
        </motion.div>

        {/* Bab 2: PENYEBAB KARHUTLA (Slide 4 - 8 PDF) - Broadsheet Architectural 2-Column Divider */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-[#e6a73c] text-[#121212] font-mono text-[11px] font-bold uppercase tracking-wider">
              BAB 02 • PENYEBAB & STUDI KASUS NYATA
            </span>
            <h3 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white mt-3">
              FAKTOR PENYEBAB: ALAMI (&lt;1%) VS. MANUSIA (&gt;99%)
            </h3>
          </div>

          <div className="border-y border-white/10 py-8 sm:py-12 my-6">
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10 gap-y-10">
              {/* Penyebab Alami */}
              <div className="py-6 md:py-0 md:pr-10 flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#4392f1] uppercase tracking-widest">
                      FAKTOR ALAM
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#4392f1] group-hover:bg-[#4392f1] group-hover:text-white transition-colors">
                      <Sparkles className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  </div>

                  <h4 className="font-display font-bold text-2xl sm:text-3xl uppercase text-white tracking-wide">
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

                {/* Studi Kasus Alami */}
                <div className="mt-6 bg-white/5 p-4 rounded-2xl space-y-2 text-xs font-mono border border-white/10">
                  <span className="text-[#4392f1] font-bold block uppercase">★ DOKUMENTASI KASUS ALAMI:</span>
                  <div className="text-slate-300">
                    • <strong>Lembata, NTT (30 Juli 2021):</strong> Lava pijar erupsi Gunung Ile Lewotolok memicu kebakaran hutan lereng.
                  </div>
                  <div className="text-slate-300">
                    • <strong>Kota Batu, Jatim (21 November 2023):</strong> Disambar petir kering, lereng Gunung Panderman terbakar hebat.
                  </div>
                </div>
              </div>

              {/* Campur Tangan Manusia */}
              <div className="py-6 md:py-0 md:pl-10 flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#dc5645] uppercase tracking-widest">
                      FAKTOR UTAMA MANUSIA
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#dc5645] group-hover:bg-[#dc5645] group-hover:text-white transition-colors">
                      <Flame className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  </div>

                  <h4 className="font-display font-bold text-2xl sm:text-3xl uppercase text-white tracking-wide">
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

                {/* Studi Kasus Manusia */}
                <div className="mt-6 bg-white/5 p-4 rounded-2xl space-y-2 text-xs font-mono border border-white/10">
                  <span className="text-[#dc5645] font-bold block uppercase">★ DOKUMENTASI KASUS HUKUM:</span>
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
        </motion.div>

        {/* Bab 3: DUA SISI DAMPAK (Slide 9 - 12 PDF) - Broadsheet Architectural 2-Column Divider */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-[#20bf6b] text-white font-mono text-[11px] font-bold uppercase tracking-wider">
              BAB 03 • DILEMA EKOLOGIS
            </span>
            <h3 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white mt-3">
              DUA SISI DAMPAK: 5 DAMPAK NEGATIF VS. 4 DAMPAK POSITIF ALAMI
            </h3>
            <p className="text-sm text-slate-400 font-sans mt-1">
              Apakah kebakaran hutan selalu berdampak buruk, atau adakah peran biologis di alam liar?
            </p>
          </div>

          <div className="border-y border-white/10 py-8 sm:py-12 my-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-white/10 gap-y-10">
              {/* Sisi Negatif */}
              <div className="py-6 lg:py-0 lg:pr-10 flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-[#dc5645] text-white font-mono text-[11px] font-bold uppercase tracking-wider">
                      DAMPAK NEGATIF MASIF
                    </span>
                  </div>

                  <h4 className="font-display font-bold text-2xl sm:text-3xl uppercase text-[#dc5645] tracking-wide">
                    BENCANA KEMANUSIAAN & EKOLOGIS
                  </h4>

                  <div className="space-y-3 font-sans text-xs text-slate-300">
                    <div className="p-3.5 bg-white/5 rounded-2xl border border-white/5">
                      <strong className="text-white text-sm block mb-1">1. Krisis Kesehatan (Asap Beracun)</strong>
                      Memicu lonjakan penderita ISPA, memperparah penyakit asma, bronkitis kronis, hingga risiko kanker paru-paru jangka panjang pada anak-anak dan lansia.
                    </div>
                    <div className="p-3.5 bg-white/5 rounded-2xl border border-white/5">
                      <strong className="text-white text-sm block mb-1">2. Kerusakan Ekologis & Kepunahan</strong>
                      Menghancurkan habitat satwa liar (Orangutan, Harimau Sumatera) dan mengancam kepunahan spesies flora endemik yang belum sempat dipelajari.
                    </div>
                    <div className="p-3.5 bg-white/5 rounded-2xl border border-white/5">
                      <strong className="text-white text-sm block mb-1">3. Lumpuhnya Sektor Publik & Transportasi</strong>
                      Kabut asap pekat membuat jarak pandang drop di bawah 200 meter. Bandara lumpuh, pelayaran sungai terhenti, dan sekolah terpaksa diliburkan.
                    </div>
                    <div className="p-3.5 bg-white/5 rounded-2xl border border-white/5">
                      <strong className="text-white text-sm block mb-1">4. Kerugian Ekonomi Masif</strong>
                      Menghancurkan fasilitas publik, mematikan industri perkayuan legal, dan memusnahkan mata pencarian petani lokal.
                    </div>
                    <div className="p-3.5 bg-white/5 rounded-2xl border border-white/5">
                      <strong className="text-white text-sm block mb-1">5. Krisis Iklim & Bencana Lanjutan</strong>
                      Melepas miliaran ton gas rumah kaca (CO2 & CH4); hutan gundul memicu kekeringan parah saat kemarau dan banjir bandang saat hujan.
                    </div>
                  </div>
                </div>
              </div>

              {/* Sisi Positif Alami */}
              <div className="py-6 lg:py-0 lg:pl-10 flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#20bf6b] text-white font-mono text-[11px] font-bold uppercase tracking-wider">
                      PERSPEKTIF ALAM LIAR
                    </span>
                    <span className="text-xs text-slate-400 font-mono italic">&ldquo;Emangnya ada?&rdquo;</span>
                  </div>

                  <h4 className="font-display font-bold text-2xl sm:text-3xl uppercase text-[#20bf6b] tracking-wide">
                    MANFAAT EKOLOGIS SIKLUS ALAMI
                  </h4>

                  <div className="space-y-3 font-sans text-xs text-slate-300">
                    <div className="p-3.5 bg-white/5 rounded-2xl border border-white/5">
                      <strong className="text-[#20bf6b] text-sm block mb-1">1. Pembersihan Lantai Hutan (Natural Cleansing)</strong>
                      Api membakar tumpukan seresah daun mati, semak belukar liar, dan dahan membusuk. Ini memberi ruang agar sinar matahari bisa menembus lantai hutan untuk benih baru.
                    </div>
                    <div className="p-3.5 bg-white/5 rounded-2xl border border-white/5">
                      <strong className="text-[#20bf6b] text-sm block mb-1">2. Siklus Nutrisi Tanah</strong>
                      Abu sisa pembakaran biomassa organik mengandung mineral berharga (seperti fosfor dan kalium) yang seketika mengembalikan kesuburan tanah mineral.
                    </div>
                    <div className="p-3.5 bg-white/5 rounded-2xl border border-white/5">
                      <strong className="text-[#20bf6b] text-sm block mb-1">3. Memicu Pertumbuhan Spesies Tertentu (Serotiny)</strong>
                      Beberapa jenis pohon memiliki cangkang biji keras (*serotinous cones*) yang <strong>hanya bisa membuka dan bertunas</strong> jika terkena suhu panas ekstrem api!
                    </div>
                    <div className="p-3.5 bg-white/5 rounded-2xl border border-white/5">
                      <strong className="text-[#20bf6b] text-sm block mb-1">4. Membasmi Hama & Jamur Patogen Hutan</strong>
                      Suhu panas api alami mematikan serangga parasit invasif dan jamur penyakit yang menginfeksi serta melemahkan tegakan pepohonan tua.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bab 4: TRIAS PENANGGULANGAN SIKLUS BENCANA (Slide 13 - 15 PDF) - Broadsheet Architectural 3-Column Divider */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-[#4392f1] text-white font-mono text-[11px] font-bold uppercase tracking-wider">
              BAB 04 • LANGKAH TANGGAP SIKLUS BENCANA
            </span>
            <h3 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white mt-3">
              TRIAS PENANGGULANGAN KARHUTLA
            </h3>
          </div>

          <div className="border-y border-white/10 py-8 sm:py-12 my-6">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10 gap-y-10">
              {/* Pra-Bencana */}
              <div className="py-6 md:py-0 md:pr-8 flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-slate-400 uppercase tracking-widest">
                      MODUL 01 / PENCEGAHAN
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#4392f1] group-hover:bg-[#4392f1] group-hover:text-white transition-colors">
                      <Shield className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  </div>

                  <h4 className="font-display font-bold text-2xl uppercase text-white mb-3 leading-tight">
                    DETEKSI DINI & TATA KELOLA GAMBUT
                  </h4>
                  <ul className="text-xs font-sans text-slate-300 space-y-2.5">
                    <li><strong>• Deteksi Dini:</strong> Pemantauan anomali hotspot via satelit MODIS/VIIRS dan patroli terpadu Manggala Agni.</li>
                    <li><strong>• Pengelolaan Gambut:</strong> Pembuatan sekat kanal (*canal blocking*) untuk menahan muka air minimal 40 cm.</li>
                    <li><strong>• Edukasi & Regulasi:</strong> Penerapan aturan ketat larangan membakar (*zero burning*) bagi warga dan pemilik konsesi.</li>
                  </ul>
                </div>
              </div>

              {/* Saat Bencana */}
              <div className="py-6 md:py-0 md:px-8 flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-slate-400 uppercase tracking-widest">
                      MODUL 02 / PENANGANAN
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#dc5645] group-hover:bg-[#dc5645] group-hover:text-white transition-colors">
                      <Flame className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  </div>

                  <h4 className="font-display font-bold text-2xl uppercase text-white mb-3 leading-tight">
                    PEMADAMAN & EVAKUASI WARGA
                  </h4>
                  <ul className="text-xs font-sans text-slate-300 space-y-2.5">
                    <li><strong>• Operasi Pemadaman:</strong> Kombinasi regu tembak darat di titik api dan operasi helikopter *water bombing* udara.</li>
                    <li><strong>• Evakuasi Kelompok Rentan:</strong> Memindahkan anak-anak, ibu hamil, dan lansia ke ruang penampungan posko bebas asap.</li>
                    <li><strong>• Evakuasi Medis Cepat:</strong> Distribusi masker respirator N95 dan posko penanganan gawat darurat ISPA.</li>
                  </ul>
                </div>
              </div>

              {/* Pasca Bencana */}
              <div className="py-6 md:py-0 md:pl-8 flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-slate-400 uppercase tracking-widest">
                      MODUL 03 / PEMULIHAN
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#20bf6b] group-hover:bg-[#20bf6b] group-hover:text-white transition-colors">
                      <Trees className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  </div>

                  <h4 className="font-display font-bold text-2xl uppercase text-white mb-3 leading-tight">
                    REBOISASI & RESTORASI EKONOMI
                  </h4>
                  <ul className="text-xs font-sans text-slate-300 space-y-2.5">
                    <li><strong>• Reboisasi Ekologis:</strong> Penanaman kembali spesies pohon asli ramah gambut yang memiliki ketahanan alami terhadap api.</li>
                    <li><strong>• Pemulihan Ekonomi:</strong> Bantuan modal dan revitalisasi sumber pencaharian bagi petani lokal yang kebunnya hangus terbakar.</li>
                    <li><strong>• Audit Forensik Kebakaran:</strong> Investigasi legalitas konsesi untuk penetapan tersangka dan gugatan ganti rugi pemulihan.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bab 5: MITIGASI STRUKTURAL & NON-STRUKTURAL UU 24/2007 (Slide 16 - 18 PDF) - Broadsheet Architectural 2-Column Divider */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-[#e6a73c] text-[#121212] font-mono text-[11px] font-bold uppercase tracking-wider">
              BAB 05 • RUJUKAN HUKUM & REKAYASA TEKNIS
            </span>
            <h3 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white mt-3">
              MITIGASI RESMI: UU NO. 24 TAHUN 2007 (PASAL 1 ANGKA 9)
            </h3>
            <p className="text-sm text-slate-300 font-sans max-w-3xl leading-relaxed mt-1">
              Mitigasi adalah serangkaian upaya untuk mengurangi risiko bencana, baik melalui pembangunan fisik maupun penyadaran dan peningkatan kemampuan menghadapi ancaman bencana.
            </p>
          </div>

          <div className="border-y border-white/10 py-8 sm:py-12 my-6">
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10 gap-y-10">
              {/* Mitigasi Struktural */}
              <div className="py-6 md:py-0 md:pr-10 flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-[#4392f1] text-white font-mono text-[11px] font-bold uppercase tracking-wider">
                      STRUKTURAL (FISIK & TEKNIS)
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#4392f1] group-hover:bg-[#4392f1] group-hover:text-white transition-colors">
                      <Droplets className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  </div>

                  <h4 className="font-display font-bold text-2xl sm:text-3xl uppercase text-white tracking-wide">
                    REKAYASA HIDROLOGI & KORIDOR FISIK
                  </h4>

                  <div className="space-y-3 font-sans text-xs text-slate-300">
                    <div className="p-4 bg-white/5 rounded-2xl space-y-1 border border-white/5">
                      <strong className="text-white text-sm block">1. Rewetting (Pembasahan Gambut)</strong>
                      <p>Upaya membasahi kembali lahan gambut yang kering dengan cara menahan laju aliran air drainase menggunakan sekat kanal bertingkat (*canal blocking*).</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-2xl space-y-1 border border-white/5">
                      <strong className="text-white text-sm block">2. Pembangunan Infrastruktur Air Cepat</strong>
                      <p>Penyediaan tampungan air statis, kantong air terpal, dan embung retensi darurat di dalam kawasan hutan rawan untuk mempercepat respon pemadaman.</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-2xl space-y-1 border border-white/5">
                      <strong className="text-white text-sm block">3. Pembuatan Sekat Bakar Buatan (Firebreak)</strong>
                      <p>Pembersihan jalur tanah selebar 5 sampai 10 meter tanpa vegetasi kering untuk memutus persambungan bahan bakar biomassa di lantai hutan.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mitigasi Non-Struktural */}
              <div className="py-6 md:py-0 md:pl-10 flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-[#dc5645] text-white font-mono text-[11px] font-bold uppercase tracking-wider">
                      NON-STRUKTURAL (ATURAN, SOSIAL & TEKNOLOGI)
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#dc5645] group-hover:bg-[#dc5645] group-hover:text-white transition-colors">
                      <Scale className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  </div>

                  <h4 className="font-display font-bold text-2xl sm:text-3xl uppercase text-white tracking-wide">
                    PENEGAKAN HUKUM, SOSIAL & SATELIT
                  </h4>

                  <div className="space-y-3 font-sans text-xs text-slate-300">
                    <div className="p-4 bg-white/5 rounded-2xl space-y-1 border border-white/5">
                      <strong className="text-white text-sm block">1. Penegakan Regulasi Pidana (Pasal 75–79)</strong>
                      <p>Sanksi penjara hingga 10 tahun dan denda hingga Rp10 Miliar bagi pembakar sengaja korporasi, disertai asas pertanggungjawaban mutlak (*strict liability*).</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-2xl space-y-1 border border-white/5">
                      <strong className="text-white text-sm block">2. Izin Wajib Analisis Risiko Bencana (Pasal 40 & 41)</strong>
                      <p>Kewajiban penyusunan dokumen Analisis Risiko Bencana bagi setiap kegiatan usaha perkebunan dan kehutanan yang berpotensi memicu bencana.</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-2xl space-y-1 border border-white/5">
                      <strong className="text-white text-sm block">3. Pemberdayaan Masyarakat Peduli Api (MPA)</strong>
                      <p>Pelatihan teknik Pembukaan Lahan Tanpa Bakar (PLTB) dan insentif pengelolaan mikro bagi kelompok tani di sekitar tapak hutan.</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-2xl space-y-1 border border-white/5">
                      <strong className="text-white text-sm block">4. Sistem Peringatan Dini (FDRS & Satelit)</strong>
                      <p>Fire Danger Rating System (FDRS) BMKG dan pemantauan satelit hotspot MODIS/VIIRS secara real-time oleh BNPB.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
