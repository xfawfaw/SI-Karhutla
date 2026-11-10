'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Flame, ShieldAlert, Search, UserCheck, BookOpen, Menu, X, PhoneCall } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Peta Hotspot', icon: Flame },
    { href: '/posko', label: 'Cari Korban', icon: Search },
    { href: '/lapor', label: 'Lapor Hilang', icon: ShieldAlert },
    { href: '/mitigasi', label: 'Mitigasi Gambut', icon: BookOpen },
    { href: '/petugas', label: 'Portal Petugas', icon: UserCheck },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#090d16]/95 backdrop-blur-md border-b border-slate-800/80 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded bg-orange-600 flex items-center justify-center text-white shadow-sm">
            <Flame className="w-4 h-4" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-base font-bold tracking-tight text-white font-mono">
              SI-KARHUTLA
            </span>
            <span className="hidden sm:inline text-[11px] font-mono text-slate-400 border-l border-slate-700 pl-2">
              BNPB 2026
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 font-mono text-xs">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors ${
                  isActive
                    ? 'bg-slate-800 text-orange-400 font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-850'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-orange-400' : 'text-slate-400'}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Emergency Hotline Right Badge */}
        <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-slate-400 border border-slate-800 rounded px-2.5 py-1 bg-slate-900/60">
          <PhoneCall className="w-3.5 h-3.5 text-orange-500" />
          <span>Hotline: <strong className="text-white">117</strong></span>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-slate-800"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#090d16] px-4 py-3 space-y-1 font-mono text-xs">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded transition-colors ${
                  isActive
                    ? 'bg-slate-800 text-orange-400 font-semibold'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
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
