'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Flame, Shield, Wind, BookOpen, AlertCircle, UserCheck } from 'lucide-react';

export default function BottomDock() {
  const pathname = usePathname();

  const handleSmoothScroll = (id: string) => {
    if (pathname !== '/') {
      window.location.href = `/#${id}`;
      return;
    }
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 hidden md:flex items-center gap-6 px-7 py-3 bg-[#121212]/95 backdrop-blur-lg rounded-full text-white shadow-2xl font-bebas text-lg tracking-wider">
      <button
        onClick={() => handleSmoothScroll('peta')}
        className="text-white/75 hover:text-[#e6a73c] transition-colors cursor-pointer flex items-center gap-1.5"
      >
        <Flame className="w-4 h-4 text-[#e6a73c]" />
        <span>PETA HOTSPOT</span>
      </button>

      <button
        onClick={() => handleSmoothScroll('posko')}
        className="text-white/75 hover:text-[#20bf6b] transition-colors cursor-pointer flex items-center gap-1.5"
      >
        <Shield className="w-4 h-4 text-[#20bf6b]" />
        <span>KORBAN & POSKO</span>
      </button>

      <button
        onClick={() => handleSmoothScroll('aqi')}
        className="text-white/75 hover:text-[#4392f1] transition-colors cursor-pointer flex items-center gap-1.5"
      >
        <Wind className="w-4 h-4 text-[#4392f1]" />
        <span>INDEKS AQI</span>
      </button>

      <button
        onClick={() => handleSmoothScroll('edukasi')}
        className="text-white/75 hover:text-[#e6a73c] transition-colors cursor-pointer flex items-center gap-1.5"
      >
        <BookOpen className="w-4 h-4 text-[#e6a73c]" />
        <span>EDUKASI & MITIGASI</span>
      </button>

      {/* Seamless CTA Capsule Pill without rigid border */}
      <Link
        href="/lapor"
        className="bg-[#dc5645] hover:bg-[#c94535] text-white px-4 py-1.5 rounded-full text-sm font-black transition-all flex items-center gap-1.5"
      >
        <AlertCircle className="w-3.5 h-3.5" />
        <span>LAPOR HILANG</span>
      </Link>

      <Link
        href="/petugas"
        className="text-white/75 hover:text-[#4392f1] transition-colors flex items-center gap-1"
      >
        <UserCheck className="w-4 h-4" />
        <span>PETUGAS</span>
      </Link>
    </div>
  );
}
