'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Bell, Search, Trash2, CheckCircle2, Bookmark, SlidersHorizontal } from 'lucide-react';
import { COLLEGES_DATA } from '@/lib/mock-data';

export default function SavedSearchesPage() {
  const [searches, setSearches] = useState([
    {
      id: 'ss-1',
      title: 'Boys PG within 1 km of ABES under ₹10,000 with food',
      collegeName: 'ABES Engineering College',
      filters: 'Boys PG • Within 1 km • Max ₹10,000 • Food Included',
      alertsEnabled: true,
      newMatches: 2,
    },
    {
      id: 'ss-2',
      title: 'Independent 2BHK Flat near DU North Campus',
      collegeName: 'Delhi University (North Campus)',
      filters: 'Student Flat • Max ₹15,000 • Under 2 km',
      alertsEnabled: true,
      newMatches: 0,
    }
  ]);

  const toggleAlert = (id: string) => {
    setSearches(
      searches.map((s) => (s.id === id ? { ...s, alertsEnabled: !s.alertsEnabled } : s))
    );
  };

  const deleteSearch = (id: string) => {
    setSearches(searches.filter((s) => s.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-card flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900">Saved Searches & Property Alerts</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Receive automatic alerts when new stays matching your college criteria become available.
            </p>
          </div>
          <Bell className="w-8 h-8 text-brand-600 shrink-0" />
        </div>

        <div className="space-y-3">
          {searches.map((item) => (
            <div
              key={item.id}
              className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-900 text-base">{item.title}</h3>
                  {item.newMatches > 0 && (
                    <span className="bg-brand-50 text-brand-700 text-xs font-bold px-2 py-0.5 rounded border border-brand-200">
                      {item.newMatches} New Matches
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600 font-medium">🎓 {item.collegeName}</p>
                <p className="text-[11px] text-slate-400">{item.filters}</p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0">
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={item.alertsEnabled}
                    onChange={() => toggleAlert(item.id)}
                    className="rounded text-brand-600 focus:ring-brand-500"
                  />
                  <span>Alerts On</span>
                </label>

                <button
                  onClick={() => deleteSearch(item.id)}
                  className="p-2 text-slate-400 hover:text-rose-600 transition-colors"
                  title="Delete search"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
