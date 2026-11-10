'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Flame, ShieldAlert, Search, UserCheck, BookOpen, Wind, Building2, Menu, X, PhoneCall } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'PETA HOTSPOT', icon: Flame },
    { href: '/posko', label: 'CARI KORBAN & POSKO', icon: Search },
    { href: '/lapor', label: 'LAPOR HILANG', icon: ShieldAlert },
    { href: '/mitigasi', label: 'MITIGASI & HUKUM', icon: BookOpen },
    { href: '/petugas', label: 'PORTAL PETUGAS', icon: UserCheck },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#ffffff] border-b-3 border-black text-[#0a0a0a]">
      {/* Top Warning Ribbon in Neobrutalist Hazard Pattern */}
      <div className="bg-[#ffde59] border-b-2 border-black px-4 py-1 flex items-center justify-between text-xs font-mono font-black tracking-wider">
        <div className="flex items-center gap-2">
          <span className="bg-black text-[#ffde59] px-1.5 py-0.2 text-[10px] font-bold">
            LIVE MONITOR
          </span>
          <span className="truncate">
            SIAGA TANGGAP DARURAT KARHUTLA & POSKO EVAKUASI SUMATERA & KALIMANTAN (BNPB 2026)
          </span>
        </div>
        <div className="flex items-center gap-2 text-black shrink-0">
          <span className="hidden sm:inline">PUSAT PENGENDALIAN OPERASI:</span>
          <span className="bg-[#ff5722] text-white px-2 py-0.5 border-2 border-black shadow-brutal-sm text-[11px] font-bold">
            HOTLINE 117
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-none bg-[#ff5722] border-2 border-black shadow-brutal-sm flex items-center justify-center text-white group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:shadow-none transition-all">
            <Flame className="w-6 h-6 text-white stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 leading-none">
              <span className="text-xl sm:text-2xl font-black font-display tracking-wider text-black">
                SI-KARHUTLA
              </span>
              <span className="bg-[#ffde59] text-black text-[10px] font-mono font-black px-1.5 py-0.5 border border-black shadow-brutal-sm">
                CLOUD
              </span>
            </div>
            <p className="text-[10px] font-mono font-bold text-slate-700 uppercase tracking-tighter">
              Peta Spasial & Posko Evakuasi
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-2 font-mono text-xs font-bold">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 border-2 border-black transition-all ${
                  isActive
                    ? 'bg-[#ffde59] shadow-brutal font-black text-black'
                    : 'bg-white hover:bg-[#f4f0e8] hover:shadow-brutal-sm text-black'
                }`}
              >
                <Icon className="w-3.5 h-3.5 stroke-[2.5]" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Emergency Search Callout button */}
        <div className="hidden sm:flex items-center gap-2 font-mono text-xs">
          <Link
            href="/posko"
            className="px-3 py-1.5 bg-[#20bf6b] text-black font-black border-2 border-black shadow-brutal brutal-btn flex items-center gap-1.5"
          >
            <Search className="w-3.5 h-3.5 stroke-[3]" />
            CARI KORBAN
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 border-2 border-black bg-[#ffde59] shadow-brutal-sm text-black"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 stroke-[3]" /> : <Menu className="w-6 h-6 stroke-[3]" />}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t-2 border-black bg-[#f4f0e8] p-4 space-y-2 font-mono text-xs font-bold">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 border-2 border-black transition-all ${
                  isActive ? 'bg-[#ffde59] shadow-brutal font-black' : 'bg-white'
                }`}
              >
                <Icon className="w-4 h-4 text-black stroke-[2.5]" />
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
