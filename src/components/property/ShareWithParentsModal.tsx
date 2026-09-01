'use client';

import React, { useState } from 'react';
import { Share2, Check, X, ShieldCheck, MapPin, Scale, MessageCircle, Copy } from 'lucide-react';
import { Property } from '@/lib/mock-data';

interface ShareWithParentsModalProps {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
}

export function ShareWithParentsModal({ property, isOpen, onClose }: ShareWithParentsModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const rent = property.minRent.toLocaleString('en-IN');
  const deposit = property.minDeposit.toLocaleString('en-IN');
  const brokerage = property.minBrokerage > 0 ? `₹${property.minBrokerage.toLocaleString('en-IN')}` : '₹0 (Zero)';
  const totalMoveIn = (property.minRent + property.minDeposit + property.minBrokerage).toLocaleString('en-IN');

  const parentShareText = `📍 *StaySetu Student Accommodation Summary*\n\n` +
    `🏠 *Property Name:* ${property.name}\n` +
    `🗺️ *Address:* ${property.address}\n` +
    `🎓 *Distance from Campus:* ${property.colleges[0]?.estimatedWalkingMinutes || 5} min walk (${property.colleges[0]?.distanceMeters || 300} meters)\n\n` +
    `💰 *Financial Breakdown:*\n` +
    `• Monthly Rent: ₹${rent}/month\n` +
    `• Security Deposit: ₹${deposit} (Refundable)\n` +
    `• Brokerage: ${brokerage}\n` +
    `• Total Move-In Expense: ₹${totalMoveIn}\n\n` +
    `🍱 *Food & Amenities:*\n` +
    `• Food Status: ${property.foodPlan.availabilityType === 'INCLUDED' ? 'Food Included (3 Meals/Day)' : 'Mess Available'}\n` +
    `• Verification: ${property.verificationStatus === 'VERIFIED' ? '100% Physical Campus Verified' : 'Pending'}\n\n` +
    `🔗 *View Full Details & Photos on StaySetu:*\nhttps://staysetu.online/stay/${property.slug}`;

  const whatsappParentUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(parentShareText)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(parentShareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-950 rounded-2xl border-2 border-slate-200 dark:border-slate-800 border-b-4 border-b-slate-300 w-full max-w-md p-6 space-y-4 shadow-elevated animate-in fade-in zoom-in-95 duration-150 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-700 dark:bg-brand-950 dark:text-brand-300 flex items-center justify-center shrink-0">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
              Share Summary with Parents
            </h3>
            <p className="text-xs text-slate-500">Send clean rent & safety breakup to family for approval</p>
          </div>
        </div>

        {/* Visual Summary Preview Box */}
        <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3 text-xs">
          <div>
            <p className="font-extrabold text-slate-900 dark:text-white text-sm">{property.name}</p>
            <p className="text-slate-500">{property.address}</p>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Monthly Rent</span>
              <span className="font-bold text-slate-900 dark:text-white text-sm">₹{rent}/mo</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Total Move-In</span>
              <span className="font-bold text-brand-600 dark:text-brand-400 text-sm">₹{totalMoveIn}</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold pt-1">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Physical Audit Verified by StaySetu Team</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-1">
          <a
            href={whatsappParentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary bg-emerald-600 hover:bg-emerald-700 border-emerald-600 text-white text-xs py-3 w-full justify-center flex items-center gap-2 shadow-md"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Send Summary Card via WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={handleCopy}
            className="btn-secondary w-full text-xs py-2.5 justify-center flex items-center gap-1.5"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied Summary Text!' : 'Copy Summary Text'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
