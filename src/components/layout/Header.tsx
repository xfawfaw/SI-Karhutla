'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Flame, Phone, Menu, X } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Exactly 3 main pages/tabs
  const primaryTabs = [
    { href: '/', label: 'PETA & POSKO UTAMA' },
    { href: '/lapor', label: 'LAPORAN HILANG' },
    { href: '/petugas', label: 'PORTAL PETUGAS' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#dc5645]/95 backdrop-blur-md text-white border-b border-white/15 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-[#dc5645] group-hover:scale-105 transition-transform shadow-md">
            <Flame className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-2xl tracking-tight text-white leading-none">
                SI-KARHUTLA
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#121212] text-white text-[10px] font-mono font-bold">
                2026
              </span>
            </div>
            <p className="text-[10px] font-mono font-medium text-white/80 uppercase tracking-tight">
              GEOPORTAL SPASIAL & POSKO KORBAN
            </p>
          </div>
        </Link>

        {/* Desktop 3 Main Tabs */}
        <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-full bg-black/20 backdrop-blur-md">
          {primaryTabs.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-5 py-2 rounded-full font-display text-sm font-bold tracking-wide transition-all duration-300 ${
                  isActive
                    ? 'bg-[#121212] text-white shadow-md'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right side: Emergency Hotline Badge */}
        <div className="hidden sm:flex items-center">
          <a
            href="tel:117"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#121212] hover:bg-white text-white hover:text-[#121212] font-mono text-xs font-semibold tracking-wider transition-all shadow-md"
          >
            <Phone className="w-3.5 h-3.5 text-[#e6a73c]" />
            <span>DARURAT BNPB: 117</span>
          </a>
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
        <div className="md:hidden bg-[#dc5645] px-6 py-4 space-y-3 font-display text-lg border-t border-white/10 text-white">
          {primaryTabs.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2.5 px-4 rounded-2xl transition-colors ${
                  isActive ? 'bg-[#121212] text-white' : 'text-white/90 hover:bg-white/10'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="pt-2 border-t border-white/10">
            <a
              href="tel:117"
              className="flex items-center justify-center gap-2 py-3 rounded-full bg-[#121212] text-white text-sm font-mono"
            >
              <Phone className="w-4 h-4 text-[#e6a73c]" />
              <span>DARURAT BNPB: 117</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
