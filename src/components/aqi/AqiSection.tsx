'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AirQualityStation } from '@/types';
import { TactileHighlight } from '@/components/ui/tactile-highlight';
import { Wind, HeartPulse } from 'lucide-react';

interface AqiSectionProps {
  aqiStations: AirQualityStation[];
}

export default function AqiSection({ aqiStations }: AqiSectionProps) {
  // Find highest AQI station dynamically
  const highestStation = aqiStations.reduce(
    (prev, current) => (prev.aqi > current.aqi ? prev : current),
    aqiStations[0] || { aqi: 0, city: '-', category: '-', province: '' }
  );

  return (
    <section
      id="aqi"
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#dc5645] text-white transition-colors duration-500 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Header with Scroll Entrance */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-white/20"
        >
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e6a73c] text-[#121212] font-mono text-[11px] font-bold uppercase tracking-wider">
                <Wind className="w-3.5 h-3.5" />
                INTEGRASI KARHUTLA.CLOUD
              </span>
              <span className="px-3 py-1 rounded-full bg-white text-[#121212] font-mono text-[11px] font-bold uppercase tracking-wider">
                STANDAR US EPA AIRNOW
              </span>
            </div>

            {/* Combined Font Style Title */}
            <h2 className="leading-[0.92] uppercase text-white">
              <span className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight block">
                INDEKS KUALITAS UDARA
              </span>
              <span className="flex flex-wrap items-baseline gap-2 sm:gap-3 mt-1 sm:mt-2">
                <span className="font-serif italic lowercase font-normal text-3xl sm:text-5xl md:text-6xl text-white/80 tracking-normal select-none">
                  konsentrasi pm2.5
                </span>
                <TactileHighlight
                  direction="left"
                  delay={0.15}
                  trigger="inView"
                  highlightClassName="bg-[#121212] shadow-xl"
                >
                  <span className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white">
                    (AQI LIVE)
                  </span>
                </TactileHighlight>
              </span>
            </h2>

            <p className="text-base sm:text-lg text-white/90 font-sans max-w-2xl leading-relaxed pt-1">
              Pemantauan konsentrasi partikulat polusi mikro PM2.5 akibat kabut asap kebakaran hutan di 6 stasiun daerah terdampak paling parah Sumatera dan Kalimantan.
            </p>
          </div>

          {/* Editorial Stat Callout */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#121212] text-white p-6 sm:p-7 rounded-3xl shadow-2xl shrink-0 border border-white/10"
          >
            <div className="flex items-center justify-between gap-4 mb-2">
              <span className="font-mono text-xs text-slate-400 uppercase tracking-wider">
                AQI TERTINGGI HARI INI
              </span>
              <span className="w-2 h-2 rounded-full bg-[#eb3b5a] animate-ping" />
            </div>
            <div className="font-display font-black text-5xl sm:text-6xl text-[#e6a73c] leading-none my-2">
              {highestStation.aqi} AQI
            </div>
            <span className="font-mono text-xs text-white font-bold block uppercase tracking-wide">
              {highestStation.city} ({highestStation.province}) — {highestStation.category}
            </span>
          </motion.div>
        </motion.div>

        {/* 6 City Station Display: Open Broadsheet Divider Layout (Matching Architecture without Box Overload) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="border-y border-white/20 py-8 sm:py-12 my-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/20 gap-y-12">
            {aqiStations.map((station, idx) => {
              const paddingClass =
                idx % 3 === 0
                  ? 'py-6 md:py-0 md:pr-8'
                  : idx % 3 === 1
                  ? 'py-6 md:py-0 md:px-8'
                  : 'py-6 md:py-0 md:pl-8';

              return (
                <div
                  key={station.id}
                  className={`${paddingClass} flex flex-col justify-between group`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs font-bold text-white/80 uppercase tracking-widest">
                        {station.province}
                      </span>
                      <span
                        className="px-2.5 py-0.5 rounded-full font-mono text-[10px] font-black uppercase tracking-wider shadow-sm"
                        style={{
                          backgroundColor: station.color,
                          color: station.category === 'SEDANG' ? '#000' : '#fff',
                        }}
                      >
                        {station.category}
                      </span>
                    </div>

                    <h3 className="leading-tight mb-2">
                      <TactileHighlight
                        direction="left"
                        delay={0.05 * (idx + 1)}
                        trigger="hover"
                        highlightClassName="bg-[#121212]"
                      >
                        <span className="font-display text-3xl font-extrabold uppercase text-white">
                          {station.city}
                        </span>
                      </TactileHighlight>
                    </h3>

                    <div className="flex items-baseline gap-3 my-3">
                      <span
                        className="font-display font-black text-5xl leading-none text-white drop-shadow-sm"
                      >
                        {station.aqi}
                      </span>
                      <span className="font-mono text-xs text-white/90 font-bold">
                        AQI • PM2.5: {station.pm25} µg/m³
                      </span>
                    </div>
                  </div>

                  {/* Clean Broadsheet Divider for Medical Advice (No Box Overload) */}
                  <div className="mt-6 pt-4 border-t border-white/20 font-sans text-xs text-white/90 space-y-1">
                    <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase font-bold text-[#e6a73c]">
                      <HeartPulse className="w-3.5 h-3.5" />
                      <span>Saran Medis & Masker:</span>
                    </div>
                    <p className="leading-relaxed text-white/85">{station.recommendation}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
