'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SocietyHubRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/');
  }, [router]);

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-6 text-center">
      <div className="space-y-3">
        <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="font-extrabold text-sm text-slate-300">
          Redirecting to StaySetu Society & Housing Super-App...
        </p>
      </div>
    </div>
  );
}
