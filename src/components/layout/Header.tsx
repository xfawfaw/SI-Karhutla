'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Flame, ShieldAlert, Search, UserCheck, BookOpen, Menu, X, PhoneCall } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Peta Hotspot GIS', icon: Flame },
    { href: '/posko', label: 'Cari Korban & Posko', icon: Search },
    { href: '/lapor', label: 'Lapor Orang Hilang', icon: ShieldAlert },
    { href: '/mitigasi', label: 'Mitigasi & UU 24/2007', icon: BookOpen },
    { href: '/petugas', label: 'Portal Petugas', icon: UserCheck },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0b1220]/95 backdrop-blur-md border-b border-slate-800 text-slate-100">
      {/* Top Emergency Status Marquee/Banner */}
      <div className="bg-gradient-to-r from-red-950 via-orange-950 to-slate-900 border-b border-orange-900/40 px-4 py-1 text-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          <span className="font-semibold text-orange-300 uppercase tracking-wider text-[11px]">
            STATUS TANGGAP DARURAT KARHUTLA 2026
          </span>
          <span className="hidden sm:inline text-slate-400 text-[11px]">
            | Data Kurasi BNPB 2026 Prioritas 6 Provinsi (Riau, Jambi, Sumsel, Kalbar, Kalteng, Kalsel)
          </span>
        </div>
        <div className="flex items-center gap-2 text-slate-300 font-mono text-[11px]">
          <PhoneCall className="w-3 h-3 text-red-400" />
          <span>Hotline Darurat: <strong className="text-white">117</strong> / <strong className="text-orange-400">0800-1-BNPB</strong></span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-600 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-600/30 group-hover:scale-105 transition-transform">
            <Flame className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-black tracking-tight text-white font-mono">
                SI-KARHUTLA
              </span>
              <span className="text-[10px] bg-red-500/20 text-red-400 border border-red-500/30 px-1.5 py-0.5 rounded font-mono font-semibold">
                BNPB 2026
              </span>
            </div>
            <p className="text-[10px] text-slate-400 leading-none">
              Sistem Informasi Spasial & Posko Evakuasi
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium font-mono transition-colors ${
                  isActive
                    ? 'bg-orange-600/20 text-orange-400 border border-orange-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-orange-400' : 'text-slate-400'}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile menu button */}
        <div className="flex md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#0b1220] px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-mono ${
                  isActive
                    ? 'bg-orange-600/20 text-orange-400 font-bold'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4 text-orange-400" />
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
