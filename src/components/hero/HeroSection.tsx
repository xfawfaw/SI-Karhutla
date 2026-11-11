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
  ArrowUpRight,
  AlertCircle,
  Activity
} from 'lucide-react';

interface HeroSectionProps {
  totalOccupants: number;
  totalCapacity: number;
}

export default function HeroSection({ totalOccupants, totalCapacity }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll animations for the hero section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const headlineY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.25]);

  return (
    <section
      ref={containerRef}
      className="relative px-4 sm:px-6 lg:px-8 pt-8 pb-16 sm:pb-24 overflow-hidden bg-[#f5f2eb] text-[#121212]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Top Operational Status Strip - Open & Unboxed */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-between gap-4 pb-5 mb-8 border-b border-black/[0.08]"
        >
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121212] text-white font-mono text-[11px] uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#20bf6b] animate-ping" />
              SISTEM AKTIF 2026
            </span>
            <span className="font-mono text-xs text-slate-600 uppercase tracking-wide">
              PUSDALOPS BNPB • KEMENLHK • TELEMETRI NASA/NOAA
            </span>
          </div>

          <div className="hidden md:flex items-center gap-5 font-mono text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-[#dc5645]" />
              6 PROVINSI PRIORITAS
            </span>
            <span className="text-black/20">•</span>
            <span>STANDARDISASI UU NO. 24 TAHUN 2007</span>
          </div>
        </motion.div>

        {/* Colossal Monumental Headline with Scroll Parallax & Tactile Highlight */}
        <motion.div
          style={{ y: headlineY, opacity }}
          className="relative mb-10 select-none"
        >
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[7.25rem] xl:text-[8rem] font-extrabold tracking-tight leading-[0.9] uppercase text-[#121212]">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              SIAGA TANGGAP
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="block mt-1 sm:mt-2 text-[#dc5645]"
            >
              <TactileHighlight direction="left" delay={0.25} trigger="inView">
                DARURAT KARHUTLA
              </TactileHighlight>
            </motion.span>
          </h1>
        </motion.div>

        {/* Editorial Summary & Typographic Telemetry - Free of Clunky Card Boxes */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <p className="text-lg sm:text-2xl text-slate-700 font-sans leading-relaxed">
              Geoportal pemantauan titik panas satelit NASA & NOAA secara real-time, koordinasi cepat posko pengungsian korban bencana, serta ensiklopedia mitigasi kebakaran hutan & lahan gambut Indonesia.
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-6">
              <a href="#peta" className="pill-btn-black text-sm">
                <Flame className="w-4 h-4 text-[#dc5645]" />
                <span>LIHAT PETA TITIK PANAS</span>
              </a>
              <a href="#posko" className="pill-btn-coral text-sm">
                <Search className="w-4 h-4" />
                <span>CARI KORBAN DI POSKO</span>
              </a>
            </div>
          </motion.div>

          {/* Integrated Typographic Telemetry Strip (No Card Boxes!) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col justify-between space-y-4 pt-2 border-t lg:border-t-0 lg:border-l border-black/[0.08] lg:pl-8"
          >
            <div className="flex items-baseline justify-between border-b border-black/[0.06] pb-3">
              <div>
                <span className="font-display text-4xl sm:text-5xl font-bold text-[#121212] tracking-tight block leading-none">
                  2.400+
                </span>
                <span className="font-mono text-xs text-slate-500 uppercase tracking-wide block mt-1">
                  Titik Panas Terdeteksi Satelit
                </span>
              </div>
              <span className="font-mono text-xs font-bold text-[#dc5645] bg-[#dc5645]/10 px-2.5 py-1 rounded-full">
                NASA VIIRS LIVE
              </span>
            </div>

            <div className="flex items-baseline justify-between border-b border-black/[0.06] pb-3">
              <div>
                <span className="font-display text-4xl sm:text-5xl font-bold text-[#121212] tracking-tight block leading-none">
                  {totalOccupants}{' '}
                  <span className="text-xl font-normal text-slate-400">/ {totalCapacity}</span>
                </span>
                <span className="font-mono text-xs text-slate-500 uppercase tracking-wide block mt-1">
                  Penyintas di 3 Posko Resmi
                </span>
              </div>
              <span className="font-mono text-xs font-bold text-[#20bf6b] bg-[#20bf6b]/10 px-2.5 py-1 rounded-full">
                TERVERIFIKASI
              </span>
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-slate-500 pt-1">
              <span>SUMATERA & KALIMANTAN</span>
              <span>STANDAR BNPB 2026</span>
            </div>
          </motion.div>
        </div>

        {/* 3 Architectural Editorial Modules (No Box Overload! Seamless Column Grid on Canvas) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-50px' }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="border-y border-black/[0.08] py-8 sm:py-12 my-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-black/[0.08]">
            {/* Column 1: Modul Spasial */}
            <div className="py-6 md:py-0 md:pr-8 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-slate-400 uppercase tracking-widest">
                    MODUL 01 / SPASIAL
                  </span>
                  <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center text-[#dc5645] group-hover:bg-[#dc5645] group-hover:text-white transition-colors">
                    <Flame className="w-4 h-4 stroke-[2.5]" />
                  </div>
                </div>

                <h3 className="font-display text-3xl sm:text-4xl font-bold uppercase text-[#121212] leading-tight mb-3">
                  <TactileHighlight direction="left" delay={0.1} trigger="hover">
                    2.400+ TITIK API
                  </TactileHighlight>
                </h3>
                <p className="font-sans text-sm text-slate-600 leading-relaxed mb-6">
                  Deteksi sensor satelit NASA-TERRA/AQUA, NOAA20, dan VIIRS terindeks Supercluster kanvas 60 FPS bebas lag tanpa watermark.
                </p>
              </div>

              <a
                href="#peta"
                className="inline-flex items-center gap-2 font-display text-lg font-bold uppercase tracking-wider text-[#121212] hover:text-[#dc5645] transition-colors"
              >
                <span>Buka Geoportal Satelit</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            {/* Column 2: Reuni Keluarga Posko */}
            <div className="py-6 md:py-0 md:px-8 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-slate-400 uppercase tracking-widest">
                    MODUL 02 / REUNI WARGA
                  </span>
                  <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center text-[#20bf6b] group-hover:bg-[#20bf6b] group-hover:text-white transition-colors">
                    <Shield className="w-4 h-4 stroke-[2.5]" />
                  </div>
                </div>

                <h3 className="font-display text-3xl sm:text-4xl font-bold uppercase text-[#121212] leading-tight mb-3">
                  <TactileHighlight direction="left" delay={0.15} trigger="hover">
                    DIREKTORI POSKO
                  </TactileHighlight>
                </h3>
                <p className="font-sans text-sm text-slate-600 leading-relaxed mb-6">
                  Pencarian instan kerabat yang dievakuasi di Posko A (Riau), Posko B (Sumsel), dan Posko C (Kalteng) terhubung langsung ke narahubung resmi.
                </p>
              </div>

              <a
                href="#posko"
                className="inline-flex items-center gap-2 font-display text-lg font-bold uppercase tracking-wider text-[#121212] hover:text-[#20bf6b] transition-colors"
              >
                <span>Cari Daftar Korban</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            {/* Column 3: Edukasi & Penanggulangan */}
            <div className="py-6 md:py-0 md:pl-8 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-slate-400 uppercase tracking-widest">
                    MODUL 03 / MITIGASI & HUKUM
                  </span>
                  <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center text-[#e6a73c] group-hover:bg-[#e6a73c] group-hover:text-[#121212] transition-colors">
                    <BookOpen className="w-4 h-4 stroke-[2.5]" />
                  </div>
                </div>

                <h3 className="font-display text-3xl sm:text-4xl font-bold uppercase text-[#121212] leading-tight mb-3">
                  <TactileHighlight direction="left" delay={0.2} trigger="hover">
                    EDUKASI GAMBUT
                  </TactileHighlight>
                </h3>
                <p className="font-sans text-sm text-slate-600 leading-relaxed mb-6">
                  Kajian ilmiah penyebab karhutla, 5 dampak negatif vs 4 dampak positif alami, restorasi canal blocking, serta regulasi UU No. 24/2007.
                </p>
              </div>

              <a
                href="#edukasi"
                className="inline-flex items-center gap-2 font-display text-lg font-bold uppercase tracking-wider text-[#121212] hover:text-[#e6a73c] transition-colors"
              >
                <span>Pelajari Materi Edukasi</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Clean Minimalist Grounding Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 font-mono text-xs text-slate-500">
          <p>
            Standardisasi data <strong>PUSDALOPS BNPB 2026</strong> • Integrasi <strong>karhutla.cloud</strong> • Rujukan yuridis <strong>UU No. 24 Tahun 2007</strong>
          </p>
          <div className="flex items-center gap-2 font-bold text-[#121212]">
            <span>HOTLINE DARURAT 24 JAM:</span>
            <a href="tel:117" className="text-[#dc5645] hover:underline">
              117 (BNPB)
            </a>
            <span>/</span>
            <a href="tel:115" className="text-[#dc5645] hover:underline">
              115 (BASARNAS)
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
