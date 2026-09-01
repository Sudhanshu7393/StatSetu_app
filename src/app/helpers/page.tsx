'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Wrench, Star, ShieldCheck, BadgeCheck, MapPin, Clock,
  ChevronRight, Info, Phone, X, Send,
} from 'lucide-react';
import { MOCK_HELPERS, COLLEGES_DATA, DomesticHelper } from '@/lib/mock-data';
import { CollegeSearchInput } from '@/components/search/CollegeSearchInput';

const CATEGORIES = [
  { id: 'ALL',          label: 'All Services' },
  { id: 'COOKING',      label: '🍳 Cooking' },
  { id: 'CLEANING',     label: '🧹 Cleaning' },
  { id: 'UTENSILS',     label: '🫙 Utensils' },
  { id: 'LAUNDRY',      label: '👕 Laundry' },
  { id: 'FULL_DOMESTIC',label: '🏠 Full Domestic' },
];

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  COOKING:       ['cook', 'cooking', 'food'],
  CLEANING:      ['clean', 'sweeping', 'mopping'],
  UTENSILS:      ['utensil', 'washing'],
  LAUNDRY:       ['laundry', 'wash', 'fold'],
  FULL_DOMESTIC: ['full', 'domestic'],
};

function matchesCategory(helper: DomesticHelper, cat: string) {
  if (cat === 'ALL') return true;
  const keywords = CATEGORY_KEYWORDS[cat] || [];
  return helper.services.some(s =>
    keywords.some(k => s.name.toLowerCase().includes(k))
  );
}

export default function HelpersPage() {
  const [selectedCollegeId, setSelectedCollegeId] = useState<string>(COLLEGES_DATA[0].id);
  const [category, setCategory]     = useState('ALL');
  const [contactOpen, setContact]   = useState<DomesticHelper | null>(null);
  const [messageText, setMessage]   = useState('');
  const [sent, setSent]             = useState(false);

  const filtered = MOCK_HELPERS.filter(h => matchesCategory(h, category));

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => { setContact(null); setSent(false); setMessage(''); }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900/30 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 text-xs font-bold px-3.5 py-1 rounded-full border border-emerald-200">
            <Wrench className="w-3.5 h-3.5" />
            <span>StaySetu Verified Helpers Network</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Find Help Near Your College Stay
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
            Identity-verified cooks, maids, laundry & tiffin service providers working around student hostels.
          </p>
        </div>

        {/* Campus Location Search */}
        <div className="max-w-md mx-auto bg-white dark:bg-slate-800 p-2 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-card">
          <CollegeSearchInput
            selectedCollegeId={selectedCollegeId}
            onSelectCollege={col => setSelectedCollegeId(col.id)}
            placeholder="Search helper area by college name..."
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`filter-chip text-sm ${category === cat.id ? 'filter-chip-active' : ''}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Helper Grid */}
        {filtered.length === 0 ? (
          <div className="card p-10 text-center">
            <Wrench className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
            <p className="font-semibold text-slate-700 dark:text-slate-300">No helpers found for this category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(helper => (
              <div key={helper.id} className="card card-hover overflow-hidden">
                {/* Profile Header */}
                <div className="p-5 pb-4">
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-200 shrink-0">
                        <Image src={helper.avatar} alt={helper.name} width={56} height={56} unoptimized className="object-cover" />
                      </div>
                      {helper.verificationStatus === 'VERIFIED' && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900">
                          <BadgeCheck className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white text-base">{helper.name}</p>
                          <p className="text-xs text-slate-500 capitalize">{helper.gender} · {helper.experienceYears} yr exp.</p>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <Star className="w-3.5 h-3.5 text-amber-400 fill-current" />
                          <span className="font-bold text-sm text-slate-900 dark:text-white">{helper.rating}</span>
                          <span className="text-xs text-slate-400">({helper.reviewCount})</span>
                        </div>
                      </div>

                      {/* Verification */}
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {helper.verificationStatus === 'VERIFIED' && (
                          <span className="badge-verified text-[10px]">
                            <ShieldCheck className="w-3 h-3" /> ID Verified
                          </span>
                        )}
                        {helper.backgroundCheckStatus && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2 py-0.5 rounded-full border border-blue-200 dark:border-blue-800">
                            <BadgeCheck className="w-3 h-3" /> Background Checked
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Area */}
                  <div className="flex items-start gap-1.5 mt-3 text-xs text-slate-600 dark:text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-brand-600 shrink-0 mt-0.5" />
                    {helper.serviceArea}
                  </div>

                  {/* Availability */}
                  <div className="flex items-center gap-1.5 mt-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                    <Clock className="w-3.5 h-3.5 shrink-0" />
                    {helper.availability}
                  </div>
                </div>

                {/* Services */}
                <div className="border-t border-slate-100 dark:border-slate-800 px-5 py-3 bg-slate-50/50 dark:bg-slate-900/50">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Services & Rates</p>
                  <div className="space-y-1.5">
                    {helper.services.map(s => (
                      <div key={s.name} className="flex items-center justify-between text-xs">
                        <span className="text-slate-700 dark:text-slate-300">{s.name}</span>
                        <span className="font-semibold text-slate-800 dark:text-white shrink-0 ml-2">{s.priceRange}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <button
                    onClick={() => setContact(helper)}
                    className="btn-primary w-full text-xs py-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Send Inquiry
                  </button>
                  <p className="text-[10px] text-slate-400 text-center flex items-center justify-center gap-1">
                    <Info className="w-3 h-3 shrink-0" />
                    Phone number shared after inquiry approval
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Info box */}
        <div className="mt-10 card p-5 border-dashed">
          <h3 className="font-semibold text-slate-900 dark:text-white text-sm mb-1">Are you a domestic helper?</h3>
          <p className="text-xs text-slate-500 mb-3">
            Register with StaySetu to connect with students in your area. We help verified helpers get more reliable work.
          </p>
          <Link href="/auth/signup" className="btn-outline text-xs">Register as Helper</Link>
        </div>
      </div>

      {/* Contact Modal */}
      {contactOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 w-full max-w-md p-5 space-y-4">
            {sent ? (
              <div className="text-center py-6">
                <BadgeCheck className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                <h3 className="font-bold text-slate-900 dark:text-white text-lg">Inquiry Sent!</h3>
                <p className="text-sm text-slate-500 mt-1">
                  {contactOpen.name} will be notified. Contact details will be shared once they accept.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 dark:text-white">Contact {contactOpen.name}</h3>
                  <button onClick={() => setContact(null)} className="text-slate-400 hover:text-slate-700">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-3 text-sm">
                  <p className="font-medium text-slate-800 dark:text-white">{contactOpen.name}</p>
                  <p className="text-slate-500 text-xs">{contactOpen.serviceArea}</p>
                </div>
                <form onSubmit={handleSend} className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-500 block mb-1">Select Services Needed</label>
                    <div className="space-y-1">
                      {contactOpen.services.map(s => (
                        <label key={s.name} className="flex items-center gap-2 text-sm cursor-pointer">
                          <input type="checkbox" className="accent-brand-600" />
                          <span className="text-slate-700 dark:text-slate-300">{s.name}</span>
                          <span className="text-slate-400 text-xs ml-auto">{s.priceRange}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-500 block mb-1">Message</label>
                    <textarea
                      value={messageText}
                      onChange={e => setMessage(e.target.value)}
                      className="input-base text-sm resize-none h-20"
                      placeholder="Describe your requirements, timings, etc."
                    />
                  </div>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => setContact(null)} className="btn-secondary flex-1 text-sm">Cancel</button>
                    <button type="submit" className="btn-primary flex-1 text-sm">
                      <Send className="w-4 h-4" /> Send
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      <div className="lg:hidden h-20" />
    </div>
  );
}
