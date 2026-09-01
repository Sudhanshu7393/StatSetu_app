'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Scale, X, ArrowRight, Check } from 'lucide-react';
import { useCompare } from '@/context/CompareContext';

export function FloatingCompareDock() {
  const { comparedProperties, toggleCompare, clearCompare } = useCompare();

  if (comparedProperties.length === 0) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-full max-w-xl px-4 animate-in slide-in-from-bottom-5 duration-200">
      <div className="bg-slate-900 text-white rounded-2xl border-2 border-slate-700 shadow-elevated p-3 sm:p-4 flex items-center justify-between gap-3">
        {/* Left: Info & Thumbnails */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-brand-600 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
            <Scale className="w-5 h-5" />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto py-1">
            {comparedProperties.map(prop => (
              <div
                key={prop.id}
                className="flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-xl px-2.5 py-1.5 shrink-0 relative group"
              >
                <div className="w-7 h-7 rounded-lg overflow-hidden relative shrink-0">
                  <Image src={prop.images[0]} alt={prop.name} fill className="object-cover" unoptimized />
                </div>
                <div className="text-left max-w-[100px] truncate">
                  <p className="text-xs font-bold text-white truncate">{prop.name}</p>
                  <p className="text-[10px] text-brand-400 font-semibold">₹{(prop.minRent/1000).toFixed(1)}k/mo</p>
                </div>
                <button
                  onClick={() => toggleCompare(prop.id)}
                  className="p-1 text-slate-400 hover:text-red-400 rounded-full hover:bg-slate-700/60 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={clearCompare}
            className="text-xs font-bold text-slate-400 hover:text-white px-2 py-1 transition-colors hidden sm:block"
          >
            Clear
          </button>
          <Link
            href="/compare"
            className="btn-primary text-xs font-black px-4 py-2.5 flex items-center gap-1.5 shadow-md"
          >
            Compare ({comparedProperties.length}) <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
