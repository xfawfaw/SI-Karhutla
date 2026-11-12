'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CorporateConcession } from '@/types';
import { TactileHighlight } from '@/components/ui/tactile-highlight';
import { Building2, ShieldAlert, AlertTriangle, Layers, Flame, MapPin } from 'lucide-react';

interface ConcessionsSectionProps {
  corporateConcessions: CorporateConcession[];
}

export default function ConcessionsSection({ corporateConcessions }: ConcessionsSectionProps) {
  return (
    <section
      id="konsesi"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full transition-colors duration-500 overflow-hidden"
    >
      {/* Section Header with Scroll Animation */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-black/[0.08]"
      >
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#dc5645]" />
            <span className="font-mono text-xs font-bold text-[#121212] uppercase tracking-wider">
              AKUNTABILITAS KORPORASI • DATA TRANSPARANSI
            </span>
            <span className="text-black/20">•</span>
            <span className="font-mono text-xs text-slate-500 uppercase">
              GAKKUM KLHK 2026
            </span>
          </div>

          {/* Combined Font Style Title */}
          <h2 className="leading-[0.92] uppercase text-[#121212]">
            <span className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-tight block">
              REKAM JEJAK KONSESI
            </span>
            <span className="flex flex-wrap items-baseline gap-2 sm:gap-3 mt-1 sm:mt-2">
              <span className="font-serif italic lowercase font-normal text-3xl sm:text-5xl md:text-6xl text-slate-600 tracking-normal select-none">
                di bentang
              </span>
              <TactileHighlight direction="left" delay={0.15} trigger="inView">
                <span className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white">
                  LAHAN GAMBUT
                </span>
              </TactileHighlight>
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-sans max-w-2xl leading-relaxed pt-1">
            Data transparansi izin perkebunan kelapa sawit (HGU) dan kehutanan (PBPH-HTI) di sekitar sebaran titik api aktif beserta status penegakan hukum KLHK.
          </p>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 text-[#121212] font-mono text-xs font-bold self-start sm:self-auto shrink-0">
          <ShieldAlert className="w-4 h-4 text-[#dc5645]" />
          <span>4 KONSESI TERPANTAU</span>
        </div>
      </motion.div>

      {/* Open Broadsheet Architecture (Zero Box Overload! Replacing Clunky soft-card rounded-3xl Boxes) */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="border-y border-black/[0.08] py-8 sm:py-12 my-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-black/[0.08] gap-y-10">
          {corporateConcessions.map((corp, idx) => {
            const isLeftCol = idx % 2 === 0;
            const paddingClass = isLeftCol ? 'py-6 md:py-0 md:pr-10' : 'py-6 md:py-0 md:pl-10';

            return (
              <motion.div
                key={corp.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`${paddingClass} flex flex-col justify-between group`}
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-black/5 text-[#121212] uppercase tracking-wider">
                      {corp.sector}
                    </span>
                    <span className="font-mono text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#dc5645] text-white uppercase tracking-wider">
                      {corp.gakkum_status}
                    </span>
                  </div>

                  {/* Company Name */}
                  <h3 className="leading-tight mb-2">
                    <span className="font-display text-2xl sm:text-3xl font-black uppercase text-[#121212] group-hover:text-[#dc5645] transition-colors block">
                      {corp.company_name}
                    </span>
                    <span className="font-serif italic text-slate-500 text-xs block mt-1">
                      Grup: {corp.group_name} • {corp.regency}, {corp.province}
                    </span>
                  </h3>

                  {/* Telemetry Strip */}
                  <div className="space-y-2 font-mono text-xs text-slate-700 py-3.5 border-y border-black/[0.06] my-4">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-slate-500">
                        <Flame className="w-3.5 h-3.5 text-[#dc5645]" />
                        Titik Panas 2026 di Konsesi:
                      </span>
                      <strong className="text-[#dc5645] text-sm font-bold">
                        {corp.hotspots_count_2026} Hotspot
                      </strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-slate-500">
                        <Layers className="w-3.5 h-3.5 text-slate-600" />
                        Karakteristik Gambut:
                      </span>
                      <strong className="text-[#121212]">
                        {corp.peat_depth}
                      </strong>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-black/[0.06] flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-500">ASAS PERTANGGUNGJAWABAN MUTLAK</span>
                  <span className="text-[#121212] font-bold">STRICT LIABILITY ✓</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
