'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Heart,
  Building2,
  Trash2,
  CheckCircle2,
  SlidersHorizontal,
  ArrowRight,
  ShieldCheck,
  Star,
  MapPin,
  Utensils
} from 'lucide-react';
import { PROPERTIES_DATA, Property } from '@/lib/mock-data';
import { PropertyCard } from '@/components/property/PropertyCard';
import { useSavedStays } from '@/context/SavedStaysContext';
import { formatCurrency } from '@/lib/compatibility';

export default function SavedPropertiesPage() {
  const { savedProperties, toggleSave, clearAllSaved } = useSavedStays();
  const [activeCollection, setActiveCollection] = useState<'SAVED' | 'SHORTLISTED' | 'VISIT_LATER'>('SAVED');
  const [activeTab, setActiveTab] = useState<'GRID' | 'COMPARE'>('GRID');

  const savedItems = savedProperties;
  const removeProperty = (id: string) => toggleSave(id);

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900">Saved Properties & Comparison</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Review saved listings, manage shortlists, and perform side-by-side cost comparisons.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
            <button
              onClick={() => setActiveTab('GRID')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'GRID' ? 'bg-white text-brand-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Saved Grid ({savedItems.length})
            </button>
            <button
              onClick={() => setActiveTab('COMPARE')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'COMPARE' ? 'bg-white text-brand-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Compare Matrix
            </button>
          </div>
        </div>

        {/* Collection Selector */}
        <div className="flex gap-2 text-xs font-bold border-b border-slate-200 pb-3">
          {[
            { key: 'SAVED', label: 'All Saved' },
            { key: 'SHORTLISTED', label: 'Shortlisted Stays' },
            { key: 'VISIT_LATER', label: 'Schedule Visit Later' },
          ].map((col) => (
            <button
              key={col.key}
              onClick={() => setActiveCollection(col.key as any)}
              className={`px-3 py-1.5 rounded-lg border transition-colors ${
                activeCollection === col.key
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {col.label}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        {savedItems.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-3 shadow-card">
            <Heart className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="font-bold text-slate-900 text-lg">No saved properties yet</h3>
            <p className="text-xs text-slate-500">
              Properties you shortlist while exploring near your college will appear here.
            </p>
            <Link
              href="/search"
              className="inline-block bg-brand-600 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-xs"
            >
              Explore College Stays
            </Link>
          </div>
        ) : activeTab === 'GRID' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedItems.map((prop) => (
              <div key={prop.id} className="relative group">
                <PropertyCard property={prop} />
                <button
                  onClick={() => removeProperty(prop.id)}
                  className="absolute top-3 right-12 z-20 p-2 rounded-full bg-white/90 text-slate-500 hover:text-rose-600 shadow-xs"
                  title="Remove from saved"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          /* COMPARISON MATRIX */
          <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-x-auto p-6">
            <h2 className="font-bold text-slate-900 text-lg mb-4">Side-by-Side Property Comparison</h2>
            <table className="w-full text-left text-xs border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="p-3 font-bold text-slate-700 w-1/4">Comparison Metric</th>
                  {savedItems.map((p) => (
                    <th key={p.id} className="p-3 font-bold text-slate-900 w-1/4 text-center">
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="p-3 font-semibold text-slate-900">Monthly Rent</td>
                  {savedItems.map((p) => (
                    <td key={p.id} className="p-3 text-center font-bold text-brand-700 text-sm">
                      {formatCurrency(p.minRent)}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900">Security Deposit</td>
                  {savedItems.map((p) => (
                    <td key={p.id} className="p-3 text-center font-semibold">
                      {formatCurrency(p.minDeposit)}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900">Brokerage Fee</td>
                  {savedItems.map((p) => (
                    <td key={p.id} className="p-3 text-center font-semibold text-slate-800">
                      {p.minBrokerage > 0 ? formatCurrency(p.minBrokerage) : '₹0'}
                    </td>
                  ))}
                </tr>
                <tr className="bg-brand-50/50 font-bold">
                  <td className="p-3 text-brand-900">Total Move-In Cost</td>
                  {savedItems.map((p) => (
                    <td key={p.id} className="p-3 text-center text-brand-700 text-sm">
                      {formatCurrency(p.minRent + p.minDeposit + p.minBrokerage)}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900">Campus Proximity</td>
                  {savedItems.map((p) => {
                    const col = p.colleges[0];
                    return (
                      <td key={p.id} className="p-3 text-center">
                        {col ? `${col.distanceMeters} m (${col.estimatedWalkingMinutes} min walk)` : 'N/A'}
                      </td>
                    );
                  })}
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900">Food Plan</td>
                  {savedItems.map((p) => (
                    <td key={p.id} className="p-3 text-center font-medium">
                      {p.foodPlan.availabilityType === 'INCLUDED' ? '✓ Included' : 'No Food'}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900">Rating</td>
                  {savedItems.map((p) => (
                    <td key={p.id} className="p-3 text-center font-bold text-amber-600">
                      ★ {p.rating.toFixed(1)} ({p.reviewCount})
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900">Action</td>
                  {savedItems.map((p) => (
                    <td key={p.id} className="p-3 text-center">
                      <Link
                        href={`/stay/${p.slug}`}
                        className="inline-block bg-slate-900 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg"
                      >
                        View Details
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
