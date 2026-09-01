'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Property, College } from '@/lib/mock-data';

interface WhatsAppConnectButtonProps {
  property: Property;
  college?: College;
  roomSharing?: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'icon';
}

export function WhatsAppConnectButton({
  property,
  college,
  roomSharing = 'Double Sharing',
  className = '',
  variant = 'primary',
}: WhatsAppConnectButtonProps) {
  const phone = (property.owner as any).phone || '9876543210';
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const targetPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;

  const collegeName = college ? college.name : property.colleges[0]?.collegeId || 'Campus';
  const rent = property.minRent.toLocaleString('en-IN');

  const text = `Namaste ${property.owner.name}! I saw your property *${property.name}* on StaySetu near *${collegeName}*.\n\n` +
    `Is a *${roomSharing}* room available for move-in from *${property.availableFrom}*? (Rent: ₹${rent}/mo)\n\n` +
    `Please let me know room availability & visit timings. Thanks!`;

  const whatsappUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(text)}`;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  if (variant === 'icon') {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={`w-9 h-9 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-card transition-transform hover:scale-105 ${className}`}
        title="Direct WhatsApp Chat with Owner"
      >
        <MessageCircle className="w-4 h-4 fill-current" />
      </button>
    );
  }

  if (variant === 'secondary') {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={`inline-flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 font-bold text-xs px-3 py-2 rounded-xl border border-emerald-200 dark:border-emerald-800 transition-colors ${className}`}
      >
        <MessageCircle className="w-4 h-4 fill-current text-emerald-600" />
        <span>WhatsApp Owner</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`btn-primary bg-emerald-600 hover:bg-emerald-700 border-emerald-600 text-white text-sm py-3 w-full justify-center shadow-md ${className}`}
    >
      <MessageCircle className="w-4 h-4 fill-current" />
      <span>1-Click Direct WhatsApp Chat</span>
    </button>
  );
}
