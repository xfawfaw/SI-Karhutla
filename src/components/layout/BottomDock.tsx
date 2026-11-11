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
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 hidden md:flex items-center gap-1.5 p-1.5 bg-[#f5f2eb]/90 backdrop-blur-md rounded-full border-2 border-[#121212] shadow-soft-lg">
      <button
        onClick={() => handleSmoothScroll('peta')}
        className="pill-btn-black text-xs py-1.5 px-3.5 hover:bg-[#dc5645] transition-colors"
      >
        <Flame className="w-3.5 h-3.5 text-[#e6a73c]" />
        <span>PETA HOTSPOT</span>
      </button>

      <button
        onClick={() => handleSmoothScroll('posko')}
        className="pill-btn-black text-xs py-1.5 px-3.5 hover:bg-[#20bf6b] transition-colors"
      >
        <Shield className="w-3.5 h-3.5 text-[#20bf6b]" />
        <span>KORBAN & POSKO</span>
      </button>

      <button
        onClick={() => handleSmoothScroll('aqi')}
        className="pill-btn-black text-xs py-1.5 px-3.5 hover:bg-[#4392f1] transition-colors"
      >
        <Wind className="w-3.5 h-3.5 text-[#4392f1]" />
        <span>INDEKS AQI</span>
      </button>

      <button
        onClick={() => handleSmoothScroll('mitigasi')}
        className="pill-btn-black text-xs py-1.5 px-3.5 hover:bg-[#e6a73c] transition-colors"
      >
        <BookOpen className="w-3.5 h-3.5 text-[#e6a73c]" />
        <span>MITIGASI & HUKUM</span>
      </button>

      <Link
        href="/lapor"
        className="pill-btn-coral text-xs py-1.5 px-4 font-bold"
      >
        <AlertCircle className="w-3.5 h-3.5 text-white" />
        <span>LAPOR HILANG</span>
      </Link>

      <Link
        href="/petugas"
        className="pill-btn-blue text-xs py-1.5 px-3.5 font-bold"
      >
        <UserCheck className="w-3.5 h-3.5 text-white" />
        <span>PETUGAS</span>
      </Link>
    </div>
  );
}
