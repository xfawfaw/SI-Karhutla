'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Flame, ShieldAlert, UserCheck, LayoutDashboard, ArrowUpRight, Menu, X } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Exactly 3 pages/tabs as requested by user
  const primaryTabs = [
    { href: '/', label: 'PETA & POSKO UTAMA', icon: LayoutDashboard },
    { href: '/lapor', label: 'LAPORAN HILANG', icon: ShieldAlert },
    { href: '/petugas', label: 'PORTAL PETUGAS', icon: UserCheck },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#f5f2eb]/90 backdrop-blur-md border-b-2 border-[#121212] text-[#121212]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand / Logo (Muse Group inspired clean badge) */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-2xl bg-[#dc5645] border-2 border-[#121212] shadow-soft-sm flex items-center justify-center text-white group-hover:rotate-6 transition-transform">
            <Flame className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black font-display tracking-wider text-[#121212]">
                SI-KARHUTLA
              </span>
              <span className="sticker-badge bg-[#e6a73c] text-[#121212] text-[10px] py-0 px-2">
                2026
              </span>
            </div>
            <p className="text-[10px] font-mono font-bold text-slate-600 uppercase tracking-tighter">
              GEOPORTAL SPASIAL & POSKO EVAKUASI
            </p>
          </div>
        </Link>

        {/* Desktop 3 Main Tabs (Strictly 3 tabs as requested) */}
        <nav className="hidden md:flex items-center gap-2 font-display text-sm tracking-wider">
          {primaryTabs.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full border-2 border-[#121212] transition-all ${
                  isActive
                    ? 'bg-[#121212] text-white shadow-soft-sm font-bold'
                    : 'bg-white hover:bg-[#e6a73c] text-[#121212]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action: Pill Button with Arrow (Muse Group Style: "CONTACTS ->") */}
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
            className="w-10 h-10 rounded-full border-2 border-[#121212] bg-[#e6a73c] flex items-center justify-center text-black"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 stroke-[2.5]" /> : <Menu className="w-5 h-5 stroke-[2.5]" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t-2 border-[#121212] bg-[#f5f2eb] p-4 space-y-2 font-display text-base">
          {primaryTabs.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl border-2 border-[#121212] transition-all ${
                  isActive ? 'bg-[#121212] text-white font-bold' : 'bg-white text-black'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
