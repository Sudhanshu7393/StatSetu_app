'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, LogOut, ChevronDown, ShieldCheck, Home } from 'lucide-react';
import { StaySetuLogo } from '@/components/brand/StaySetuLogo';

interface CurrentUser {
  name?: string;
  email?: string;
  phone?: string;
  role?: string;
  flat?: string;
  society?: string;
}

export function Navbar() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Sync logged in user state
  useEffect(() => {
    const checkUser = () => {
      if (typeof window === 'undefined') return;
      const userRaw = localStorage.getItem('staysetu-current-user');
      const roleRaw = localStorage.getItem('staysetu-role');

      if (userRaw) {
        try {
          const parsed = JSON.parse(userRaw);
          setCurrentUser(parsed);
          return;
        } catch {
          // ignore
        }
      }

      if (roleRaw) {
        setCurrentUser({
          name: 'Sudhanshu Pandey',
          email: 'staysetu26@gmail.com',
          role: roleRaw,
          flat: 'Tower A - Flat 102',
          society: 'Greenwood Grand Township, Gurugram',
        });
      } else {
        setCurrentUser(null);
      }
    };

    checkUser();

    // Listen to login/logout across tabs and within page
    window.addEventListener('storage', checkUser);
    return () => window.removeEventListener('storage', checkUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('staysetu-current-user');
    localStorage.removeItem('staysetu-role');
    setCurrentUser(null);
    setDropdownOpen(false);
    window.dispatchEvent(new Event('storage'));
    router.push('/auth/login');
  };

  return (
    <header className="sticky top-0 z-50 bg-[#EEF2F6]/95 backdrop-blur-md border-b-2 border-[#CBD5E1] transition-colors">
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

          {/* ── Right Action / Profile Button ── */}
          <div className="relative flex items-center gap-2 sm:gap-4">
            {currentUser ? (
              <div className="relative">
                {/* User Logged In Profile Pill */}
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-full pl-2 pr-3 py-1.5 shadow-md flex items-center gap-2 cursor-pointer transition-transform active:scale-95 border border-[#334155]"
                >
                  <div className="w-7 h-7 rounded-full bg-[#2563EB] text-white font-bold text-xs flex items-center justify-center shadow-xs shrink-0">
                    {(currentUser.name || 'U').charAt(0).toUpperCase()}
                  </div>
                  <div className="text-left hidden sm:block">
                    <p className="text-[11px] font-bold text-white leading-tight max-w-[120px] truncate">
                      {currentUser.name || 'Resident User'}
                    </p>
                    <p className="text-[9px] text-[#38BDF8] font-semibold leading-none">
                      {currentUser.flat || currentUser.role || 'Flat Owner'}
                    </p>
                  </div>
                  <ChevronDown className={`w-3.5 h-3.5 text-[#94A3B8] transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Profile Interactive Dropdown Menu */}
                {dropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setDropdownOpen(false)}
                    />
                    <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-[0_20px_50px_rgba(15,23,42,0.18)] border-2 border-[#CBD5E1] p-3.5 z-50 space-y-3 animate-in fade-in zoom-in-95 duration-150">
                      
                      {/* User Summary Box */}
                      <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#CBD5E1] space-y-1">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-700">
                            StaySetu Verified Account
                          </span>
                        </div>
                        <p className="font-serif font-bold text-xs text-[#0F172A] truncate">
                          {currentUser.name || 'Resident User'}
                        </p>
                        <p className="text-[10px] text-[#64748B] truncate">
                          {currentUser.email || currentUser.phone || 'staysetu26@gmail.com'}
                        </p>
                        <p className="text-[10px] font-semibold text-[#2563EB]">
                          🏡 {currentUser.flat || 'Tower A - Flat 102'}
                        </p>
                      </div>

                      {/* Navigation Links */}
                      <div className="space-y-1 text-xs">
                        <Link
                          href="/"
                          onClick={() => setDropdownOpen(false)}
                          className="w-full p-2 hover:bg-[#F1F5F9] rounded-xl font-semibold text-[#0F172A] flex items-center gap-2 transition-colors"
                        >
                          <Home className="w-4 h-4 text-[#2563EB]" />
                          <span>Society Dashboard</span>
                        </Link>

                        <button
                          type="button"
                          onClick={handleLogout}
                          className="w-full p-2 hover:bg-rose-50 rounded-xl font-bold text-rose-600 flex items-center gap-2 transition-colors cursor-pointer text-left"
                        >
                          <LogOut className="w-4 h-4 text-rose-600" />
                          <span>Sign Out / Log Out</span>
                        </button>
                      </div>

                    </div>
                  </>
                )}
              </div>
            ) : (
              /* User Logged Out Sign In Pill */
              <Link
                href="/auth/login"
                className="bg-[#0F172A] hover:bg-[#1E293B] text-white font-semibold text-[11px] sm:text-xs px-4 sm:px-6 py-2 sm:py-2.5 rounded-full shadow-md transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-[#94A3B8]" />
                <span>Sign In</span>
              </Link>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}
