'use client';

import React from 'react';

interface StaySetuLogoProps {
  variant?: 'light' | 'dark'; // 'dark' for light backgrounds, 'light' for dark backgrounds (like footer)
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

export function StaySetuLogo({
  variant = 'dark',
  size = 'md',
  showText = true,
  className = '',
}: StaySetuLogoProps) {
  // Dimensions map
  const sizeMap = {
    sm: { icon: 28, text: 'text-lg', gap: 'gap-2' },
    md: { icon: 40, text: 'text-2xl', gap: 'gap-2.5' },
    lg: { icon: 52, text: 'text-3xl', gap: 'gap-3' },
    xl: { icon: 68, text: 'text-4xl', gap: 'gap-3.5' },
  };

  const currentSize = sizeMap[size];

  // Colors based on variant
  const houseColor = variant === 'light' ? '#FFFFFF' : '#0F172A';
  const windowColor = variant === 'light' ? '#38BDF8' : '#2563EB';
  const stayTextColor = variant === 'light' ? 'text-white' : 'text-[#0F172A]';
  const setuTextColor = variant === 'light' ? 'text-[#38BDF8]' : 'text-[#2563EB]';
  const subtextColor = variant === 'light' ? 'text-[#94A3B8]' : 'text-[#64748B]';

  return (
    <div className={`inline-flex items-center ${currentSize.gap} ${className}`}>
      {/* ── Official House-Pin SVG Logo Mark ── */}
      <svg
        width={currentSize.icon}
        height={currentSize.icon}
        viewBox="0 0 100 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform group-hover:scale-105"
      >
        {/* House Pin Main Body with Roof, Chimney & Pointed Bottom */}
        <path
          d="M 50 10 
             L 86 38 
             C 88 39.5, 88.5 42.5, 87 44.5 
             L 83 48.5 
             C 81.5 50, 78.5 50.5, 76.5 49 
             L 76 48.5
             V 60
             C 76 74, 50 96, 50 96
             C 50 96, 24 74, 24 60
             V 48.5
             L 23.5 49
             C 21.5 50.5, 18.5 50, 17 48.5
             L 13 44.5
             C 11.5 42.5, 12 39.5, 14 38
             Z"
          fill={houseColor}
        />
        {/* Chimney */}
        <path
          d="M 68 24
             V 16
             C 68 14.5, 69.5 13, 71 13
             H 75
             C 76.5 13, 78 14.5, 78 16
             V 32
             L 68 24 Z"
          fill={houseColor}
        />

        {/* 4 Center Window Panes (2x2 rounded grid) */}
        {/* Top-Left */}
        <rect x="39" y="44" width="9.5" height="9.5" rx="2.5" fill={windowColor} />
        {/* Top-Right */}
        <rect x="51.5" y="44" width="9.5" height="9.5" rx="2.5" fill={windowColor} />
        {/* Bottom-Left */}
        <rect x="39" y="56.5" width="9.5" height="9.5" rx="2.5" fill={windowColor} />
        {/* Bottom-Right */}
        <rect x="51.5" y="56.5" width="9.5" height="9.5" rx="2.5" fill={windowColor} />
      </svg>

      {/* ── Official Wordmark Typography ── */}
      {showText && (
        <div className="flex flex-col leading-none">
          <span className={`font-serif font-black tracking-tight ${currentSize.text} ${stayTextColor}`}>
            Stay<span className={setuTextColor}>Setu</span>
          </span>
          <span className={`text-[8px] font-bold uppercase tracking-[0.2em] mt-1 ${subtextColor}`}>
            Smart Gated Society
          </span>
        </div>
      )}
    </div>
  );
}
