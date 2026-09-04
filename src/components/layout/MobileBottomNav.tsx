'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Car, Users, CreditCard, User } from 'lucide-react';

const TABS = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Parking', href: '/#wrong-parking-spotlight', icon: Car },
  { label: 'Maid Radar', href: '/#society-modules', icon: Users },
  { label: 'RWA Dues', href: '/#rwa-dues', icon: CreditCard },
  { label: 'Account', href: '/auth/login', icon: User },
];

export function MobileBottomNav() {
  const pathname = usePathname();
  if (pathname === '/' || pathname.startsWith('/auth')) return null;

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#F8FAFC]/95 backdrop-blur-xl border-t border-[#E2E8F0] px-2 py-1.5 shadow-[0_-8px_30px_rgba(15,23,42,0.08)]">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {TABS.map(({ label, href, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={label}
              href={href}
              className={`flex flex-col items-center gap-0.5 px-2.5 py-1 min-w-[3.25rem] rounded-xl transition-all active:scale-95 ${
                active
                  ? 'text-[#0F172A] font-bold'
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              <div className={`p-1 rounded-xl transition-colors ${active ? 'bg-[#0F172A] text-white shadow-xs' : 'text-[#64748B]'}`}>
                <Icon className="w-4 h-4" />
              </div>
              <span className={`text-[10px] font-semibold tracking-tight ${active ? 'text-[#0F172A] font-black' : 'text-[#64748B]'}`}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
