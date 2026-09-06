'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Shield } from 'lucide-react';

export default function AdminDashboardPage() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('staysetu_user_role', 'RWA');
      router.replace('/');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white px-4 text-center">
      <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center mb-4 animate-pulse">
        <Shield className="w-7 h-7 text-indigo-400" />
      </div>
      <h1 className="text-xl font-bold font-heading mb-2">Connecting to RWA Governance Terminal...</h1>
      <p className="text-sm text-slate-400 max-w-sm">
        Switching persona to Society Admin & Estate Manager. Please wait...
      </p>
    </div>
  );
}

