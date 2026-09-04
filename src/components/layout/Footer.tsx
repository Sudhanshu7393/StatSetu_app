'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ShieldCheck,
  MapPin,
} from 'lucide-react';
import { StaySetuLogo } from '@/components/brand/StaySetuLogo';

const SOCIETY_MODULE_LINKS = [
  { label: 'Wrong Parking Alert', href: '/#wrong-parking-spotlight' },
  { label: 'Domestic Helper Radar', href: '/#society-modules' },
  { label: 'Smart Package Vault', href: '/#rwa-dues' },
  { label: 'ANPR FastTag Gate', href: '/#rwa-dues' },
  { label: 'Move-In Lift Booking', href: '/#society-modules' },
];

const RWA_GOVERNANCE_LINKS = [
  { label: 'Maintenance UPI Pay', href: '/#rwa-dues' },
  { label: 'Auditable GST Balance Sheet', href: '/#rwa-dues' },
  { label: 'Resident AGM Voting Polls', href: '/#community' },
  { label: 'Official Society Notices', href: '/#community' },
  { label: 'Resident Buy & Sell Market', href: '/#community' },
];

const LEADERSHIP_LINKS = [
  { label: 'Sudhanshu Pandey (Founder & CEO)', href: '/#leadership' },
  { label: 'Township Enterprise Onboarding', href: '/auth/signup' },
  { label: 'SOC-2 & 256-Bit Security', href: '/#wrong-parking-spotlight' },
];

export function Footer() {
  const pathname = usePathname();
  if (pathname === '/') return null;
  return (
    <footer className="bg-[#0F172A] text-[#94A3B8] mt-auto font-sans border-t border-[#1E293B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-10">
          
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-4">
            <Link href="/" className="group inline-flex items-center">
              <StaySetuLogo variant="light" size="md" />
            </Link>

            <p className="text-xs text-[#94A3B8] leading-relaxed max-w-md">
              The operating system for modern gated communities &amp; smart townships across India. Instant wrong parking alerts, live domestic helper attendance radar, ANPR FastTag boom entry, and 100% auditable RWA GST accounting.
            </p>

            <div className="pt-2 text-xs text-[#64748B] space-y-1">
              <p className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#38BDF8]" />
                <span>Enterprise SOC-2 Compliant &amp; 256-Bit Encrypted</span>
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#38BDF8]" />
                <span>Operating across Delhi NCR, Gurugram &amp; Greater Noida Townships</span>
              </p>
            </div>
          </div>

          {/* Society Modules */}
          <div className="lg:col-span-2 space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F1F5F9]">
              Society Modules
            </p>
            <ul className="space-y-2 text-xs text-[#CBD5E1]">
              {SOCIETY_MODULE_LINKS.map(link => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* RWA & Governance */}
          <div className="lg:col-span-2 space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F1F5F9]">
              RWA &amp; Governance
            </p>
            <ul className="space-y-2 text-xs text-[#CBD5E1]">
              {RWA_GOVERNANCE_LINKS.map(link => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Leadership & Enterprise */}
          <div className="lg:col-span-3 space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F1F5F9]">
              Leadership &amp; Team
            </p>
            <ul className="space-y-2 text-xs text-[#CBD5E1]">
              {LEADERSHIP_LINKS.map(link => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-6 border-t border-[#334155] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748B]">
          <p>© {new Date().getFullYear()} StaySetu Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Founded by Sudhanshu Pandey</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
