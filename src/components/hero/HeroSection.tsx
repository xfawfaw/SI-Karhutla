'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TactileHighlight } from '@/components/ui/tactile-highlight';
import {
  Flame,
  Search,
  Shield,
  Radio,
  BookOpen,
  ArrowRight,
  Activity,
  Compass,
  AlertTriangle,
  Phone
} from 'lucide-react';

interface HeroSectionProps {
  totalOccupants: number;
  totalCapacity: number;
}

export default function HeroSection({ totalOccupants, totalCapacity }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax scroll effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const headlineY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -35]);
  const imageRotate = useTransform(scrollYProgress, [0, 1], [-1, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.3]);

  return (
    <section
      ref={containerRef}
      className="relative px-4 sm:px-6 lg:px-8 pt-8 pb-16 sm:pb-24 overflow-hidden bg-[#dc5645] text-white transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto">
        {/* Top Status Strip: Monospace Technical Eyebrow with High Contrast */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-between gap-4 pb-5 mb-8 border-b border-white/20"
        >
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121212] text-white font-mono text-[11px] uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#20bf6b] animate-ping" />
              SISTEM AKTIF 2026
            </span>
            <span className="font-mono text-xs text-white/90 uppercase tracking-wide">
              PUSDALOPS BNPB • KEMENLHK • TELEMETRI NASA/NOAA
            </span>
          </div>

          <div className="hidden md:flex items-center gap-5 font-mono text-xs text-white/80">
            <span className="flex items-center gap-1.5 font-bold text-white">
              <Activity className="w-3.5 h-3.5 text-[#e6a73c]" />
              6 PROVINSI PRIORITAS
            </span>
            <span className="text-white/30">•</span>
            <span>STANDARDISASI UU NO. 24 TAHUN 2007</span>
          </div>
        </motion.div>

        {/* Hero Main Grid: Headline & Floating Firefighter Photography */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12">
          {/* Colossal Combined Headline */}
          <motion.div
            style={{ y: headlineY, opacity }}
            className="lg:col-span-8 select-none"
          >
            <h1 className="leading-[0.88] uppercase text-white">
              <motion.span
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] tracking-tight block text-white drop-shadow-sm"
              >
                SIAGA TANGGAP
              </motion.span>

              {/* Combined Font Style: Elegant Italic Serif accentuating Bold Grotesk & Tactile Highlight */}
              <motion.span
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap items-baseline gap-2.5 sm:gap-4 mt-2 sm:mt-3"
              >
                <span className="font-serif italic lowercase font-normal text-3xl sm:text-5xl md:text-6xl text-[#e6a73c] tracking-normal select-none">
                  fase
                </span>
                <TactileHighlight
                  direction="left"
                  delay={0.25}
                  trigger="inView"
                  highlightClassName="bg-[#121212] shadow-2xl"
                >
                  <span className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-[7rem] tracking-tight text-white">
                    DARURAT KARHUTLA
                  </span>
                </TactileHighlight>
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg sm:text-2xl text-white/90 font-sans leading-relaxed max-w-2xl mt-6"
            >
              Geoportal pemantauan titik panas satelit NASA & NOAA secara real-time, koordinasi cepat posko pengungsian korban bencana, serta ensiklopedia mitigasi kebakaran hutan & lahan gambut Indonesia.
            </motion.p>

            {/* High-Contrast CTA Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4 mt-8"
            >
              <a
                href="#peta"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#121212] hover:bg-white text-white hover:text-[#121212] font-mono text-xs font-bold tracking-wider transition-all duration-300 shadow-xl group"
              >
                <Flame className="w-4 h-4 text-[#e6a73c] group-hover:text-[#dc5645] transition-colors" />
                <span>LIHAT PETA TITIK PANAS</span>
              </a>
              <a
                href="#posko"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-[#121212] text-[#121212] hover:text-white font-mono text-xs font-bold tracking-wider transition-all duration-300 shadow-xl"
              >
                <Search className="w-4 h-4" />
                <span>CARI KORBAN DI POSKO</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Floating Editorial Photography: Imported User Firefighter Photo Asset (Uncluttered) */}
          <motion.div
            style={{ y: imageY, rotate: imageRotate }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 relative"
          >
            <div className="relative rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-[#121212] aspect-[4/5] max-w-sm mx-auto group">
              {/* Imported Firefighter Image from User */}
              <img
                src="/images/firefighter-hero.jpg"
                alt="Petugas Pemadam Karhutla Bencana"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
              />

              {/* Editorial Gradient & Telemetry HUD Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />

              {/* Top HUD Badge */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-white font-mono text-[10px]">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 uppercase">
                  <span className="w-2 h-2 rounded-full bg-[#e6a73c] animate-ping" />
                  SATGAS MANGGALA AGNI
                </span>
                <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 uppercase text-slate-300">
                  SIAGA 24 JAM
                </span>
              </div>

              {/* Bottom HUD Information */}
              <div className="absolute bottom-5 left-5 right-5 text-white space-y-1.5">
                <span className="font-mono text-[10px] text-white/70 uppercase tracking-widest block">
                  TELEMETRI SATELIT LIVE
                </span>
                <div className="font-display font-extrabold text-2xl uppercase tracking-tight text-white leading-tight">
                  2.400+ ANOMALI TERMAL
                </div>
                <p className="font-serif italic text-xs text-white/80">
                  resolusi spasial 375m sensor VIIRS terindeks supercluster
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 3 Architectural Editorial Modules (Open Broadsheet Divider Layout on Red Background) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-50px' }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="border-y border-white/20 py-8 sm:py-12 my-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/20">
            {/* Column 1: Modul Spasial */}
            <div className="py-6 md:py-0 md:pr-8 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-white/75 uppercase tracking-widest">
                    MODUL 01 / SPASIAL
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#dc5645] transition-colors">
                    <Flame className="w-4 h-4 stroke-[2.5]" />
                  </div>
                </div>

                <h3 className="leading-tight mb-2">
                  <TactileHighlight
                    direction="left"
                    delay={0.1}
                    trigger="hover"
                    highlightClassName="bg-[#121212]"
                  >
                    <span className="font-display text-3xl sm:text-4xl font-extrabold uppercase text-white">
                      2.400+ TITIK API
                    </span>
                  </TactileHighlight>
                  <span className="font-serif italic text-white/75 text-xs block mt-1.5 lowercase">
                    deteksi anomali termal satelit nasa/noaa
                  </span>
                </h3>
                <p className="font-sans text-sm text-white/85 leading-relaxed mb-6">
                  Deteksi sensor satelit NASA-TERRA/AQUA, NOAA20, dan VIIRS terindeks Supercluster kanvas 60 FPS bebas lag tanpa watermark.
                </p>
              </div>

              <a
                href="#peta"
                className="inline-flex items-center gap-2 font-display text-lg font-bold uppercase tracking-wider text-white hover:text-[#e6a73c] transition-colors"
              >
                <span>Buka Geoportal Satelit</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            {/* Column 2: Reuni Keluarga Posko */}
            <div className="py-6 md:py-0 md:px-8 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-white/75 uppercase tracking-widest">
                    MODUL 02 / REUNI WARGA
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#20bf6b] group-hover:bg-[#20bf6b] group-hover:text-white transition-colors">
                    <Shield className="w-4 h-4 stroke-[2.5]" />
                  </div>
                </div>

                <h3 className="leading-tight mb-2">
                  <TactileHighlight
                    direction="left"
                    delay={0.15}
                    trigger="hover"
                    highlightClassName="bg-[#121212]"
                  >
                    <span className="font-display text-3xl sm:text-4xl font-extrabold uppercase text-white">
                      DIREKTORI POSKO
                    </span>
                  </TactileHighlight>
                  <span className="font-serif italic text-white/75 text-xs block mt-1.5 lowercase">
                    manifes pengungsi resmi binaan satgas
                  </span>
                </h3>
                <p className="font-sans text-sm text-white/85 leading-relaxed mb-6">
                  Pencarian instan kerabat yang dievakuasi di Posko A (Riau), Posko B (Sumsel), dan Posko C (Kalteng) terhubung langsung ke narahubung resmi.
                </p>
              </div>

              <a
                href="#posko"
                className="inline-flex items-center gap-2 font-display text-lg font-bold uppercase tracking-wider text-white hover:text-[#20bf6b] transition-colors"
              >
                <span>Cari Daftar Korban</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            {/* Column 3: Edukasi & Penanggulangan */}
            <div className="py-6 md:py-0 md:pl-8 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-white/75 uppercase tracking-widest">
                    MODUL 03 / MITIGASI & HUKUM
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#e6a73c] group-hover:bg-[#e6a73c] group-hover:text-[#121212] transition-colors">
                    <BookOpen className="w-4 h-4 stroke-[2.5]" />
                  </div>
                </div>

                <h3 className="leading-tight mb-2">
                  <TactileHighlight
                    direction="left"
                    delay={0.2}
                    trigger="hover"
                    highlightClassName="bg-[#121212]"
                  >
                    <span className="font-display text-3xl sm:text-4xl font-extrabold uppercase text-white">
                      EDUKASI GAMBUT
                    </span>
                  </TactileHighlight>
                  <span className="font-serif italic text-white/75 text-xs block mt-1.5 lowercase">
                    pedoman rekayasa kanal & sanksi uu 24/2007
                  </span>
                </h3>
                <p className="font-sans text-sm text-white/85 leading-relaxed mb-6">
                  Kajian ilmiah penyebab karhutla, 5 dampak negatif vs 4 dampak positif alami, restorasi canal blocking, serta regulasi UU No. 24/2007.
                </p>
              </div>

              <a
                href="#edukasi"
                className="inline-flex items-center gap-2 font-display text-lg font-bold uppercase tracking-wider text-white hover:text-[#e6a73c] transition-colors"
              >
                <span>Pelajari Materi Edukasi</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Clean Grounding Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 font-mono text-xs text-white/75">
          <p>
            Standardisasi data <strong>PUSDALOPS BNPB 2026</strong> • Integrasi <strong>karhutla.cloud</strong> • Rujukan yuridis <strong>UU No. 24 Tahun 2007</strong>
          </p>
          <div className="flex items-center gap-2 font-bold text-white">
            <span>HOTLINE DARURAT 24 JAM:</span>
            <a href="tel:117" className="text-[#e6a73c] hover:underline">
              117 (BNPB)
            </a>
            <span>/</span>
            <a href="tel:115" className="text-[#e6a73c] hover:underline">
              115 (BASARNAS)
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
