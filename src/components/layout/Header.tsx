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
    <header className="sticky top-0 z-50 bg-[#f5f2eb]/90 backdrop-blur-md text-[#121212] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand / Logo (Muse Group pure typographic style) */}
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

        {/* Desktop 3 Main Tabs: Smooth Background Pill Transitions */}
        <nav className="hidden md:flex items-center gap-2 p-1.5 rounded-full bg-black/[0.03]">
          {primaryTabs.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-5 py-2 rounded-full font-bebas text-xl tracking-wider transition-all duration-300 ${
                  isActive
                    ? 'bg-[#121212] text-white shadow-sm'
                    : 'text-[#121212]/75 hover:text-[#dc5645] hover:bg-black/[0.04]'
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
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#121212] hover:bg-[#dc5645] text-white font-bebas text-sm tracking-wider transition-colors"
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
        <div className="md:hidden bg-[#f5f2eb] px-6 py-4 space-y-3 font-bebas text-xl border-t border-black/5">
          {primaryTabs.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2.5 px-4 rounded-2xl transition-colors ${
                  isActive ? 'bg-[#121212] text-white' : 'text-[#121212]'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="pt-2 border-t border-black/5">
            <a
              href="tel:117"
              className="flex items-center justify-center gap-2 py-3 rounded-full bg-[#121212] text-white text-sm"
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
