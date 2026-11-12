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
              <TactileHighlight
                direction="left"
                delay={0.15}
                trigger="inView"
                highlightClassName="bg-[#dc5645] shadow-xl"
              >
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
          <div className="max-w-4xl space-y-3">
            <span className="font-mono text-xs font-bold text-[#dc5645] uppercase tracking-widest block">
              BAB 01 / DEFINISI RESMI
            </span>
            <h3 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white leading-tight">
              APA ITU KEBAKARAN HUTAN & LAHAN (KARHUTLA)?
            </h3>
            <p className="text-base sm:text-xl text-slate-300 font-sans leading-relaxed pt-1">
              <strong>Kebakaran Hutan dan Lahan (Karhutla)</strong> adalah peristiwa terbakarnya kawasan hutan atau lahan, seperti kawasan hutan lindung, lahan pertanian, perkebunan, dan bentang lahan gambut, yang menyebabkan kehancuran ekosistem, degradasi lingkungan hidup, serta mengganggu seluruh sendi kehidupan masyarakat.
            </p>
          </div>
        </motion.div>

        {/* Bab 2: PENYEBAB KARHUTLA (Slide 4 - 8 PDF) - Broadsheet 2-Column Divider (No Box Overload) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          <div>
            <span className="font-mono text-xs font-bold text-[#e6a73c] uppercase tracking-widest block">
              BAB 02 / PENYEBAB & STUDI KASUS NYATA
            </span>
            <h3 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white mt-2">
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

                {/* Dokumentasi Kasus Alami: Broadsheet Border Divider (No Inner Box) */}
                <div className="mt-8 pt-4 border-t border-white/10 space-y-2 text-xs font-mono">
                  <span className="text-[#4392f1] font-bold block uppercase tracking-wider">
                    ★ DOKUMENTASI KASUS ALAMI:
                  </span>
                  <p className="text-slate-300">
                    • <strong>Lembata, NTT (30 Juli 2021):</strong> Lava pijar erupsi Gunung Ile Lewotolok memicu kebakaran hutan lereng.
                  </p>
                  <p className="text-slate-300">
                    • <strong>Kota Batu, Jatim (21 November 2023):</strong> Disambar petir kering, lereng Gunung Panderman terbakar hebat.
                  </p>
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

                {/* Dokumentasi Kasus Manusia: Broadsheet Border Divider (No Inner Box) */}
                <div className="mt-8 pt-4 border-t border-white/10 space-y-2 text-xs font-mono">
                  <span className="text-[#dc5645] font-bold block uppercase tracking-wider">
                    ★ DOKUMENTASI KASUS HUKUM:
                  </span>
                  <p className="text-slate-300">
                    • <strong>Muara Enim, Sumsel (25 Agustus 2026):</strong> Pelaku ditangkap dan dijadikan tersangka setelah sengaja membakar lahan untuk tanam sawit.
                  </p>
                  <p className="text-slate-300">
                    • <strong>Gunung Bromo, Jatim (6 September 2023):</strong> Flare foto prewedding membakar 504 hektar savana kaldera, merugikan negara <strong>Rp 5,4 Miliar</strong>!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bab 3: DUA SISI DAMPAK (Slide 9 - 12 PDF) - Broadsheet 2-Column Divider (No Box Overload) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          <div>
            <span className="font-mono text-xs font-bold text-[#20bf6b] uppercase tracking-widest block">
              BAB 03 / DILEMA EKOLOGIS
            </span>
            <h3 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white mt-2">
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
                    <span className="font-mono text-xs font-bold text-[#dc5645] uppercase tracking-widest">
                      DAMPAK NEGATIF MASIF
                    </span>
                  </div>

                  <h4 className="font-display font-bold text-2xl sm:text-3xl uppercase text-[#dc5645] tracking-wide">
                    BENCANA KEMANUSIAAN & EKOLOGIS
                  </h4>

                  {/* Clean Hairline Dividers (Zero Box Containers) */}
                  <div className="space-y-4 font-sans text-xs text-slate-300 divide-y divide-white/10 pt-2">
                    <div className="pt-3.5 first:pt-0">
                      <strong className="text-white text-sm block mb-1">1. Krisis Kesehatan (Asap Beracun)</strong>
                      <p className="leading-relaxed">
                        Memicu lonjakan penderita ISPA, memperparah penyakit asma, bronkitis kronis, hingga risiko kanker paru-paru jangka panjang pada anak-anak dan lansia.
                      </p>
                    </div>
                    <div className="pt-3.5">
                      <strong className="text-white text-sm block mb-1">2. Kerusakan Ekologis & Kepunahan</strong>
                      <p className="leading-relaxed">
                        Menghancurkan habitat satwa liar (Orangutan, Harimau Sumatera) dan mengancam kepunahan spesies flora endemik yang belum sempat dipelajari.
                      </p>
                    </div>
                    <div className="pt-3.5">
                      <strong className="text-white text-sm block mb-1">3. Lumpuhnya Sektor Publik & Transportasi</strong>
                      <p className="leading-relaxed">
                        Kabut asap pekat membuat jarak pandang drop di bawah 200 meter. Bandara lumpuh, pelayaran sungai terhenti, dan sekolah terpaksa diliburkan.
                      </p>
                    </div>
                    <div className="pt-3.5">
                      <strong className="text-white text-sm block mb-1">4. Kerugian Ekonomi Masif</strong>
                      <p className="leading-relaxed">
                        Menghancurkan fasilitas publik, mematikan industri perkayuan legal, dan memusnahkan mata pencarian petani lokal.
                      </p>
                    </div>
                    <div className="pt-3.5">
                      <strong className="text-white text-sm block mb-1">5. Krisis Iklim & Bencana Lanjutan</strong>
                      <p className="leading-relaxed">
                        Melepas miliaran ton gas rumah kaca (CO2 & CH4); hutan gundul memicu kekeringan parah saat kemarau dan banjir bandang saat hujan.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sisi Positif Alami */}
              <div className="py-6 lg:py-0 lg:pl-10 flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#20bf6b] uppercase tracking-widest">
                      PERSPEKTIF ALAM LIAR
                    </span>
                    <span className="text-xs text-slate-400 font-mono italic">&ldquo;Emangnya ada?&rdquo;</span>
                  </div>

                  <h4 className="font-display font-bold text-2xl sm:text-3xl uppercase text-[#20bf6b] tracking-wide">
                    MANFAAT EKOLOGIS SIKLUS ALAMI
                  </h4>

                  {/* Clean Hairline Dividers (Zero Box Containers) */}
                  <div className="space-y-4 font-sans text-xs text-slate-300 divide-y divide-white/10 pt-2">
                    <div className="pt-3.5 first:pt-0">
                      <strong className="text-[#20bf6b] text-sm block mb-1">1. Pembersihan Lantai Hutan (Natural Cleansing)</strong>
                      <p className="leading-relaxed">
                        Api membakar tumpukan seresah daun mati, semak belukar liar, dan dahan membusuk. Ini memberi ruang agar sinar matahari bisa menembus lantai hutan untuk benih baru.
                      </p>
                    </div>
                    <div className="pt-3.5">
                      <strong className="text-[#20bf6b] text-sm block mb-1">2. Siklus Nutrisi Tanah</strong>
                      <p className="leading-relaxed">
                        Abu sisa pembakaran biomassa organik mengandung mineral berharga (seperti fosfor dan kalium) yang seketika mengembalikan kesuburan tanah mineral.
                      </p>
                    </div>
                    <div className="pt-3.5">
                      <strong className="text-[#20bf6b] text-sm block mb-1">3. Memicu Pertumbuhan Spesies Tertentu (Serotiny)</strong>
                      <p className="leading-relaxed">
                        Beberapa jenis pohon memiliki cangkang biji keras (*serotinous cones*) yang <strong>hanya bisa membuka dan bertunas</strong> jika terkena suhu panas ekstrem api!
                      </p>
                    </div>
                    <div className="pt-3.5">
                      <strong className="text-[#20bf6b] text-sm block mb-1">4. Membasmi Hama & Jamur Patogen Hutan</strong>
                      <p className="leading-relaxed">
                        Suhu panas api alami mematikan serangga parasit invasif dan jamur penyakit yang menginfeksi serta melemahkan tegakan pepohonan tua.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bab 4: TRIAS PENANGGULANGAN SIKLUS BENCANA (Slide 13 - 15 PDF) - Broadsheet 3-Column Divider */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          <div>
            <span className="font-mono text-xs font-bold text-[#4392f1] uppercase tracking-widest block">
              BAB 04 / LANGKAH TANGGAP SIKLUS BENCANA
            </span>
            <h3 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white mt-2">
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

        {/* Bab 5: MITIGASI RESMI UU 24/2007 (Slide 16 - 18 PDF) - Broadsheet 2-Column Divider (No Box Overload) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          <div>
            <span className="font-mono text-xs font-bold text-[#e6a73c] uppercase tracking-widest block">
              BAB 05 / RUJUKAN HUKUM & REKAYASA TEKNIS
            </span>
            <h3 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white mt-2">
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
                    <span className="font-mono text-xs font-bold text-[#4392f1] uppercase tracking-widest">
                      STRUKTURAL (FISIK & TEKNIS)
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#4392f1] group-hover:bg-[#4392f1] group-hover:text-white transition-colors">
                      <Droplets className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  </div>

                  <h4 className="font-display font-bold text-2xl sm:text-3xl uppercase text-white tracking-wide">
                    REKAYASA HIDROLOGI & KORIDOR FISIK
                  </h4>

                  {/* Clean Broadsheet Divider List (No Inner Boxes) */}
                  <div className="space-y-4 font-sans text-xs text-slate-300 divide-y divide-white/10 pt-2">
                    <div className="pt-3.5 first:pt-0">
                      <strong className="text-white text-sm block mb-1">1. Rewetting (Pembasahan Gambut)</strong>
                      <p className="leading-relaxed">
                        Upaya membasahi kembali lahan gambut yang kering dengan cara menahan laju aliran air drainase menggunakan sekat kanal bertingkat (*canal blocking*).
                      </p>
                    </div>
                    <div className="pt-3.5">
                      <strong className="text-white text-sm block mb-1">2. Pembangunan Infrastruktur Air Cepat</strong>
                      <p className="leading-relaxed">
                        Penyediaan tampungan air statis, kantong air terpal, dan embung retensi darurat di dalam kawasan hutan rawan untuk mempercepat respon pemadaman.
                      </p>
                    </div>
                    <div className="pt-3.5">
                      <strong className="text-white text-sm block mb-1">3. Pembuatan Sekat Bakar Buatan (Firebreak)</strong>
                      <p className="leading-relaxed">
                        Pembersihan jalur tanah selebar 5 sampai 10 meter tanpa vegetasi kering untuk memutus persambungan bahan bakar biomassa di lantai hutan.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mitigasi Non-Struktural */}
              <div className="py-6 md:py-0 md:pl-10 flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#dc5645] uppercase tracking-widest">
                      NON-STRUKTURAL (ATURAN, SOSIAL & TEKNOLOGI)
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#dc5645] group-hover:bg-[#dc5645] group-hover:text-white transition-colors">
                      <Scale className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  </div>

                  <h4 className="font-display font-bold text-2xl sm:text-3xl uppercase text-white tracking-wide">
                    PENEGAKAN HUKUM, SOSIAL & SATELIT
                  </h4>

                  {/* Clean Broadsheet Divider List (No Inner Boxes) */}
                  <div className="space-y-4 font-sans text-xs text-slate-300 divide-y divide-white/10 pt-2">
                    <div className="pt-3.5 first:pt-0">
                      <strong className="text-white text-sm block mb-1">1. Penegakan Regulasi Pidana (Pasal 75–79)</strong>
                      <p className="leading-relaxed">
                        Sanksi penjara hingga 10 tahun dan denda hingga Rp10 Miliar bagi pembakar sengaja korporasi, disertai asas pertanggungjawaban mutlak (*strict liability*).
                      </p>
                    </div>
                    <div className="pt-3.5">
                      <strong className="text-white text-sm block mb-1">2. Izin Wajib Analisis Risiko Bencana (Pasal 40 & 41)</strong>
                      <p className="leading-relaxed">
                        Kewajiban penyusunan dokumen Analisis Risiko Bencana bagi setiap kegiatan usaha perkebunan dan kehutanan yang berpotensi memicu bencana.
                      </p>
                    </div>
                    <div className="pt-3.5">
                      <strong className="text-white text-sm block mb-1">3. Pemberdayaan Masyarakat Peduli Api (MPA)</strong>
                      <p className="leading-relaxed">
                        Pelatihan teknik Pembukaan Lahan Tanpa Bakar (PLTB) dan insentif pengelolaan mikro bagi kelompok tani di sekitar tapak hutan.
                      </p>
                    </div>
                    <div className="pt-3.5">
                      <strong className="text-white text-sm block mb-1">4. Sistem Peringatan Dini (FDRS & Satelit)</strong>
                      <p className="leading-relaxed">
                        Fire Danger Rating System (FDRS) BMKG dan pemantauan satelit hotspot MODIS/VIIRS secara real-time oleh BNPB.
                      </p>
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
