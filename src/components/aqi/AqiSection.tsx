'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AirQualityStation } from '@/types';
import { TactileHighlight } from '@/components/ui/tactile-highlight';
import { Wind, Activity, HeartPulse } from 'lucide-react';

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
                <TactileHighlight direction="left" delay={0.15} trigger="inView">
                  <span className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-[#121212]">
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

        {/* 6 City Station Cards - Restored Original High-Contrast White Composition with Smooth Scroll Reveal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {aqiStations.map((station, idx) => (
            <motion.div
              key={station.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white/95 backdrop-blur-md text-[#121212] p-6 sm:p-7 rounded-3xl shadow-md flex flex-col justify-between group hover:bg-white hover:shadow-xl transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-bold text-slate-500 uppercase tracking-wider">
                    {station.province}
                  </span>
                  <span
                    className="px-2.5 py-0.5 rounded-full font-mono text-[10px] font-black uppercase tracking-wider"
                    style={{
                      backgroundColor: station.color,
                      color: station.category === 'SEDANG' ? '#000' : '#fff',
                    }}
                  >
                    {station.category}
                  </span>
                </div>

                <h3 className="leading-tight mb-2">
                  <TactileHighlight direction="left" delay={0.05 * (idx + 1)} trigger="hover">
                    <span className="font-display text-3xl font-extrabold uppercase text-white">
                      {station.city}
                    </span>
                  </TactileHighlight>
                </h3>

                <div className="flex items-baseline gap-3 my-3">
                  <span
                    className="font-display font-black text-5xl leading-none"
                    style={{ color: station.color }}
                  >
                    {station.aqi}
                  </span>
                  <span className="font-mono text-xs text-slate-500 font-bold">
                    AQI • PM2.5: {station.pm25} µg/m³
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-black/5 font-sans text-xs bg-[#f5f2eb] p-3.5 rounded-2xl text-slate-800 space-y-1">
                <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase font-bold text-[#dc5645]">
                  <HeartPulse className="w-3.5 h-3.5" />
                  <span>Saran Medis & Masker:</span>
                </div>
                <p className="leading-relaxed">{station.recommendation}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
