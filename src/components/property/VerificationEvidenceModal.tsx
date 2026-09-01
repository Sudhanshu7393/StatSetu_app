'use client';

import React from 'react';
import { ShieldCheck, CheckCircle2, UserCheck, FileCheck, MapPin, Award, X } from 'lucide-react';
import { Property } from '@/lib/mock-data';

interface VerificationEvidenceModalProps {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
}

export function VerificationEvidenceModal({ property, isOpen, onClose }: VerificationEvidenceModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-950 rounded-2xl border-2 border-slate-200 dark:border-slate-800 border-b-4 border-b-slate-300 w-full max-w-lg p-6 space-y-5 shadow-elevated animate-in fade-in zoom-in-95 duration-150 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 shadow-xs">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-black px-2.5 py-0.5 rounded-full border border-emerald-200">
              <Award className="w-3.5 h-3.5" /> 100% Physical Campus Verified
            </div>
            <h3 className="font-extrabold text-slate-900 dark:text-white text-lg mt-0.5">
              StaySetu Trust Guarantee
            </h3>
          </div>
        </div>

        {/* Property Context */}
        <div className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800">
          <p className="font-bold text-slate-900 dark:text-white text-sm">{property.name}</p>
          <p className="text-xs text-slate-500">{property.address}</p>
        </div>

        {/* Verification Evidence Checklist */}
        <div className="space-y-3">
          <p className="text-xs font-black uppercase tracking-wider text-slate-400">Verified Evidence Checklist</p>

          <div className="space-y-2.5">
            {[
              {
                icon: MapPin,
                title: 'On-Site Physical Audit',
                desc: 'StaySetu field agent physically inspected rooms, washrooms, Wi-Fi speed & water quality.',
                date: 'Verified on 15 June 2026',
              },
              {
                icon: FileCheck,
                title: 'Ownership & Lease Deed Check',
                desc: 'Government Aadhar ID and legal property ownership deed verified with the landlord.',
                date: 'Verified by StaySetu Legal Team',
              },
              {
                icon: UserCheck,
                title: 'Landlord Identity Verification',
                desc: `Owner ${property.owner.name} (${property.owner.responseTime} response time) identity verified.`,
                date: `Owner Role: ${property.owner.role}`,
              },
              {
                icon: CheckCircle2,
                title: 'Zero Brokerage Fraud Guarantee',
                desc: 'Move-in rent, deposit & brokerage costs are transparently frozen. No hidden charges.',
                date: 'Protected by StaySetu Policy',
              },
            ].map(({ icon: Icon, title, desc, date }) => (
              <div key={title} className="flex items-start gap-3 p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{title}</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">{desc}</p>
                  <span className="inline-block text-[10px] font-bold text-emerald-700 dark:text-emerald-400 mt-1 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-200/60">
                    ✓ {date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="btn-primary w-full text-sm py-2.5"
          >
            Got It, Thanks!
          </button>
        </div>
      </div>
    </div>
  );
}
