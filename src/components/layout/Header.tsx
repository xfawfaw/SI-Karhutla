'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Flame, ArrowUpRight, Menu, X } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Strictly 3 pages/tabs as requested by user
  const primaryTabs = [
    { href: '/', label: 'PETA & POSKO UTAMA' },
    { href: '/lapor', label: 'LAPORAN HILANG' },
    { href: '/petugas', label: 'PORTAL PETUGAS' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#f5f2eb]/90 backdrop-blur-md text-[#121212] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand / Logo (Muse Group inspired clean typographic branding) */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl bg-[#dc5645] flex items-center justify-center text-white group-hover:scale-105 transition-transform">
            <Flame className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bebas text-3xl tracking-wider text-[#121212] leading-none">
                SI-KARHUTLA
              </span>
              <span className="sticker-badge bg-[#e6a73c] text-[#121212] text-[10px] py-0 px-2 font-black">
                2026
              </span>
            </div>
            <p className="text-[10px] font-mono font-medium text-slate-500 uppercase tracking-tight">
              GEOPORTAL SPASIAL & POSKO KORBAN
            </p>
          </div>
        </Link>

        {/* Desktop 3 Main Tabs: Pure Typography with ZERO firm lines or box outlines */}
        <nav className="hidden md:flex items-center gap-8 font-bebas text-xl tracking-wider">
          {primaryTabs.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative py-1 transition-colors ${
                  isActive
                    ? 'text-[#dc5645] font-black'
                    : 'text-[#121212]/70 hover:text-[#dc5645]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#dc5645] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Button: Borderless Black Pill with Circular Arrow (Exact Muse Group Style) */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/lapor"
            className="pill-btn-coral group text-xs tracking-wider"
          >
            <span>LAPOR HILANG</span>
            <div className="w-5 h-5 rounded-full bg-white text-[#dc5645] flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[3]" />
            </div>
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 rounded-full bg-[#121212] text-white flex items-center justify-center"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#f5f2eb] px-6 py-4 space-y-3 font-bebas text-xl border-t border-black/5">
          {primaryTabs.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2 ${
                  isActive ? 'text-[#dc5645] font-black' : 'text-[#121212]'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="pt-2">
            <Link
              href="/lapor"
              onClick={() => setMobileMenuOpen(false)}
              className="pill-btn-coral w-full text-center block text-sm"
            >
              LAPOR ORANG HILANG →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
