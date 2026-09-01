'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Heart, X, ArrowUpDown, Scale, Star, MapPin, Utensils,
  ShieldCheck, BedDouble, CalendarCheck, ChevronRight, Building2,
} from 'lucide-react';
import { PROPERTIES_DATA, Property } from '@/lib/mock-data';

const COMPARE_DIMS = [
  { key: 'minRent',          label: 'Starting Rent' },
  { key: 'minDeposit',       label: 'Security Deposit' },
  { key: 'minBrokerage',     label: 'Min. Brokerage' },
  { key: 'moveIn',           label: 'Total Move-In (est.)' },
  { key: 'distance',         label: 'Distance from College' },
  { key: 'type',             label: 'Property Type' },
  { key: 'gender',           label: 'Gender' },
  { key: 'food',             label: 'Food' },
  { key: 'foodRating',       label: 'Food Rating' },
  { key: 'amenities',        label: 'Amenity Count' },
  { key: 'rating',           label: 'Overall Rating' },
  { key: 'availability',     label: 'Availability' },
  { key: 'verification',     label: 'Verification' },
];

import { useCompare } from '@/context/CompareContext';

export default function ComparePage() {
  const { comparedProperties, toggleCompare, clearCompare } = useCompare();
  const [pickOpen, setPickOpen] = useState(false);

  // Fallback to first 2 properties if nothing selected yet
  const compared = comparedProperties.length > 0 ? comparedProperties : PROPERTIES_DATA.slice(0, 2);

  const remove = (id: string) => toggleCompare(id);

  const add = (prop: Property) => {
    toggleCompare(prop.id);
    setPickOpen(false);
  };

  const getValue = (prop: Property, key: string): string => {
    const rel = prop.colleges[0];
    switch(key) {
      case 'minRent':      return `₹${prop.minRent.toLocaleString('en-IN')}/month`;
      case 'minDeposit':   return `₹${prop.minDeposit.toLocaleString('en-IN')}`;
      case 'minBrokerage': return prop.minBrokerage > 0 ? `₹${prop.minBrokerage.toLocaleString('en-IN')}` : '—';
      case 'moveIn':       return `₹${(prop.minRent + prop.minDeposit + prop.minBrokerage).toLocaleString('en-IN')}`;
      case 'distance':     return rel ? (rel.distanceMeters >= 1000 ? `${(rel.distanceMeters/1000).toFixed(1)} km` : `${rel.distanceMeters} m`) : '—';
      case 'type':         return prop.type;
      case 'gender':       return prop.genderPreference === 'BOYS' ? 'Boys' : prop.genderPreference === 'GIRLS' ? 'Girls' : 'Co-ed';
      case 'food':         return prop.foodPlan.availabilityType === 'INCLUDED' ? '✅ Included' : prop.foodPlan.availabilityType === 'EXTRA_COST' ? '+ Extra Cost' : '✗ Not Available';
      case 'foodRating':   return prop.foodPlan.rating ? `${prop.foodPlan.rating}/5` : '—';
      case 'amenities':    return `${prop.amenities.length} amenities`;
      case 'rating':       return `${prop.rating} ★ (${prop.reviewCount} reviews)`;
      case 'availability': return prop.availableFrom;
      case 'verification': return prop.verificationStatus === 'VERIFIED' ? '✅ Verified' : prop.verificationStatus === 'PENDING' ? '⏳ Pending' : '—';
      default:             return '—';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900/30 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-6 space-y-1">
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
            <Link href="/" className="hover:text-brand-600">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-700 dark:text-slate-300">Compare Stays</span>
          </nav>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Scale className="w-6 h-6 text-brand-600" />
            Compare Stays
          </h1>
          <p className="text-sm text-slate-500">Side-by-side comparison of rent, costs, food, distance and amenities.</p>
        </div>

        {/* Property Cards Row */}
        <div className="overflow-x-auto">
          <div className="min-w-full">
            {/* Card headers */}
            <div className="grid gap-4 mb-4" style={{ gridTemplateColumns: `200px repeat(${compared.length}, 1fr)${compared.length < 3 ? ' 180px' : ''}` }}>
              <div />
              {compared.map(prop => (
                <div key={prop.id} className="card p-4 relative">
                  <button
                    onClick={() => remove(prop.id)}
                    className="absolute top-2 right-2 w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                  <div className="relative h-28 rounded-lg overflow-hidden mb-3 bg-slate-200">
                    <Image src={prop.images[0]} alt={prop.name} fill className="object-cover" unoptimized />
                  </div>
                  <p className="font-semibold text-slate-900 dark:text-white text-sm line-clamp-2 mb-1">{prop.name}</p>
                  <p className="text-xs text-slate-500">{prop.locality}, {prop.city}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <Star className="w-3 h-3 text-amber-400 fill-current" />
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{prop.rating}</span>
                  </div>
                  <Link href={`/stay/${prop.slug}`} className="btn-primary w-full text-xs py-1.5 mt-3">View Details</Link>
                </div>
              ))}
              {compared.length < 3 && (
                <div
                  onClick={() => setPickOpen(true)}
                  className="card p-4 border-dashed cursor-pointer hover:border-brand-400 transition-colors flex flex-col items-center justify-center gap-2 text-center min-h-[220px]"
                >
                  <Building2 className="w-8 h-8 text-slate-300 dark:text-slate-600" />
                  <p className="text-sm font-medium text-slate-500">Add a property to compare</p>
                  <span className="btn-outline text-xs px-3 py-1.5">+ Add</span>
                </div>
              )}
            </div>

            {/* Comparison rows */}
            <div className="card overflow-hidden">
              {COMPARE_DIMS.map(({ key, label }, idx) => (
                <div
                  key={key}
                  className={`grid gap-4 px-4 py-3 ${idx % 2 === 0 ? 'bg-slate-50 dark:bg-slate-900/50' : 'bg-white dark:bg-slate-900'}`}
                  style={{ gridTemplateColumns: `200px repeat(${compared.length}, 1fr)` }}
                >
                  <span className="text-xs font-semibold text-slate-500 self-center">{label}</span>
                  {compared.map(prop => (
                    <span key={prop.id} className="text-sm text-slate-800 dark:text-slate-200 self-center font-medium">
                      {getValue(prop, key)}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pick property modal */}
      {pickOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 w-full max-w-md p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 dark:text-white">Select a property to compare</h3>
              <button onClick={() => setPickOpen(false)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>
            <div className="space-y-2 max-h-72 overflow-y-auto">
              {PROPERTIES_DATA.filter(p => !compared.find(c => c.id === p.id)).map(prop => (
                <button
                  key={prop.id}
                  onClick={() => add(prop)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 text-left transition-colors"
                >
                  <div className="w-12 h-10 rounded-lg overflow-hidden bg-slate-200 shrink-0 relative">
                    <Image src={prop.images[0]} alt={prop.name} fill className="object-cover" unoptimized />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white text-sm">{prop.name}</p>
                    <p className="text-xs text-slate-500">{prop.type} · ₹{prop.minRent.toLocaleString('en-IN')}/month</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      <div className="lg:hidden h-20" />
    </div>
  );
}
