'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Mic, Users, CreditCard, User } from 'lucide-react';

const TABS = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Gate Pass', href: '/#rwa-dues', icon: Mic },
  { label: 'Helper Radar', href: '/#society-modules', icon: Users },
  { label: 'RWA Dues', href: '/#rwa-dues', icon: CreditCard },
  { label: 'Resident', href: '/auth/login', icon: User },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#F8FAFC]/95 backdrop-blur-md border-t border-[#E2E8F0] px-2 pb-safe-bottom transition-colors shadow-lg">
      <div className="flex items-center justify-around py-1">
        {TABS.map(({ label, href, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={label}
              href={href}
              className={`flex flex-col items-center gap-0.5 px-3 py-2 min-w-[3.5rem] rounded-xl transition-colors ${
                active
                  ? 'text-[#0F172A] font-bold'
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              <Icon className={`w-4 h-4 ${active ? 'text-[#2563EB] stroke-[2.5]' : 'stroke-2'}`} />
              <span className="text-[10px] font-semibold tracking-tight">
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
