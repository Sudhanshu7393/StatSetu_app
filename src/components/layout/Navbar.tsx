'use client';

import React from 'react';
import Link from 'next/link';
import { User } from 'lucide-react';
import { StaySetuLogo } from '@/components/brand/StaySetuLogo';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-[#F8FAFC]/95 backdrop-blur-md border-b border-[#E2E8F0] transition-colors">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* ── Official Brand Logo ── */}
          <Link href="/" className="group flex items-center shrink-0">
            <StaySetuLogo variant="dark" size="sm" />
          </Link>

          {/* ── Center Editorial Navigation ── */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold text-[#475569]">
            <Link href="/" className="text-[#0F172A] font-bold hover:text-[#2563EB] transition-colors">
              Home
            </Link>
            <Link href="/#wrong-parking-spotlight" className="hover:text-[#0F172A] transition-colors">
              Parking Alert
            </Link>
            <Link href="/#society-modules" className="hover:text-[#0F172A] transition-colors">
              Helper Radar
            </Link>
            <Link href="/#rwa-dues" className="hover:text-[#0F172A] transition-colors">
              RWA Ledger
            </Link>
            <Link href="/#community" className="hover:text-[#0F172A] transition-colors">
              Forum
            </Link>
            <Link href="/#leadership" className="hover:text-[#0F172A] transition-colors">
              Founders
            </Link>
          </nav>

          {/* ── Right Action Button (Muted Slate Pill) ── */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/auth/login"
              className="bg-[#0F172A] hover:bg-[#1E293B] text-white font-semibold text-[11px] sm:text-xs px-4 sm:px-6 py-2 sm:py-2.5 rounded-full shadow-md transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
            >
              <User className="w-3.5 h-3.5 text-[#94A3B8]" />
              <span>Login</span>
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
}
