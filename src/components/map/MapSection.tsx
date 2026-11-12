'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TactileHighlight } from '@/components/ui/tactile-highlight';
import HotspotMap from '@/components/map/HotspotMap';
import { Hotspot, Shelter } from '@/types';
import { Flame, Radio, Globe2, Sparkles, MapPin, Layers } from 'lucide-react';

interface MapSectionProps {
  hotspots: Hotspot[];
  shelters: Shelter[];
}

export default function MapSection({ hotspots, shelters }: MapSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const titleY = useTransform(scrollYProgress, [0, 0.4], [30, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section
      id="peta"
      ref={sectionRef}
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-8"
    >
      {/* Section Header with Combined Fonts & Tactile Highlight */}
      <motion.div
        style={{ y: titleY, opacity: titleOpacity }}
        className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-black/[0.08]"
      >
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#dc5645] inline-block animate-ping" />
            <span className="font-mono text-xs font-bold text-[#dc5645] uppercase tracking-wider">
              MODUL 01 • TELEMETRI SPASIAL SATELIT
            </span>
            <span className="text-black/20">•</span>
            <span className="font-mono text-xs text-slate-500 uppercase">
              KANVAS 60 FPS BEBAS LAG
            </span>
          </div>

          {/* Combined Font Style: Bold Sans + Editorial Italic Serif + Tactile Highlight */}
          <h2 className="leading-[0.92] uppercase text-[#121212]">
            <span className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-tight block">
              PETA SEBARAN
            </span>
            <span className="flex flex-wrap items-baseline gap-2 sm:gap-3 mt-1 sm:mt-2">
              <span className="font-serif italic lowercase font-normal text-3xl sm:text-5xl md:text-6xl text-slate-600 tracking-normal select-none">
                anomali
              </span>
              <TactileHighlight direction="left" delay={0.15} trigger="inView">
                <span className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white">
                  TITIK PANAS (GIS 2026)
                </span>
              </TactileHighlight>
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-sans max-w-2xl leading-relaxed pt-1">
            Visualisasi satelit OpenStreetMap 100% bebas watermark beresolusi tinggi, diintegrasikan dengan kluster spasial Supercluster kustom untuk deteksi dini karhutla Sumatera dan Kalimantan.
          </p>
        </div>

        {/* Satellite Imagery Pill Card (Unsplash Real Satellite Asset) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-3.5 p-2 pr-5 rounded-2xl bg-white border border-black/[0.08] shadow-sm shrink-0 self-start lg:self-auto"
        >
          <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0">
            {/* Real Unsplash Earth Satellite Photography */}
            <img
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=200&q=80"
              alt="NASA Earth Satellite Telemetry"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#dc5645]/20 mix-blend-overlay" />
          </div>
          <div className="font-mono text-xs">
            <span className="flex items-center gap-1.5 font-bold text-[#121212] uppercase">
              <Globe2 className="w-3.5 h-3.5 text-[#dc5645]" />
              ORBITAL TELEMETRY
            </span>
            <span className="text-[11px] text-slate-500 block mt-0.5">
              NASA-FIRMS / NOAA-20
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Quick Status / Region Strip */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-600 bg-white/60 backdrop-blur-sm p-3.5 px-5 rounded-2xl border border-black/[0.06]"
      >
        <div className="flex flex-wrap items-center gap-4">
          <span className="flex items-center gap-1.5 text-[#121212] font-bold">
            <Flame className="w-4 h-4 text-[#dc5645]" />
            2.400 Titik Api Aktif
          </span>
          <span className="text-black/20">•</span>
          <span>Riau, Sumsel, Jambi, Kalteng, Kalbar, Kalsel</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 text-[#20bf6b] font-bold">
            <MapPin className="w-3.5 h-3.5" />
            3 Posko Evakuasi Terhubung
          </span>
        </div>
      </motion.div>

      {/* Interactive Map Component Container with Smooth Reveal */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        <HotspotMap hotspots={hotspots} shelters={shelters} />
      </motion.div>
    </section>
  );
}
