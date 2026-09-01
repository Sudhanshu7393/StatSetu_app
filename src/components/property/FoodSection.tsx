'use client';

import React, { useState } from 'react';
import { Utensils, Star, CheckCircle, Leaf, CalendarDays } from 'lucide-react';
import { FoodPlan } from '@/lib/mock-data';

interface FoodSectionProps {
  foodPlan: FoodPlan;
}

export const FoodSection: React.FC<FoodSectionProps> = ({ foodPlan }) => {
  const [selectedDay, setSelectedDay] = useState<keyof NonNullable<FoodPlan['weeklyMenu']>>('monday');

  if (foodPlan.availabilityType === 'NOT_AVAILABLE') {
    return (
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
        <div className="flex items-center gap-2 text-slate-600 font-bold mb-1">
          <Utensils className="w-5 h-5 text-slate-400" />
          <span>Food & Mess Facility</span>
        </div>
        <p className="text-sm text-slate-500">
          Food is not served directly by this property. Independent kitchen / induction setup or nearby tiffin service is available.
        </p>
      </div>
    );
  }

  const days: { key: keyof NonNullable<FoodPlan['weeklyMenu']>; label: string }[] = [
    { key: 'monday', label: 'Mon' },
    { key: 'tuesday', label: 'Tue' },
    { key: 'wednesday', label: 'Wed' },
    { key: 'thursday', label: 'Thu' },
    { key: 'friday', label: 'Fri' },
    { key: 'saturday', label: 'Sat' },
    { key: 'sunday', label: 'Sun' },
  ];

  return (
    <div className="bg-gradient-to-br from-amber-50/70 via-white to-white border border-amber-200/80 rounded-xl p-5 shadow-xs">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-amber-200/60">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 bg-amber-100 text-amber-800 rounded-lg">
            <Utensils className="w-5 h-5 text-amber-700" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-900 text-base">Food & Mess Facilities</h3>
              <span className="text-xs bg-amber-200/70 text-amber-900 font-bold px-2 py-0.5 rounded-full">
                {foodPlan.availabilityType === 'INCLUDED' ? 'Included in Rent' : `+₹${foodPlan.monthlyExtraCost}/mo`}
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              Hygienic meals cooked fresh daily for students.
            </p>
          </div>
        </div>

        {foodPlan.rating && (
          <div className="flex items-center gap-1.5 bg-white border border-amber-200 px-3 py-1.5 rounded-lg shadow-2xs">
            <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
            <span className="font-bold text-slate-900 text-sm">{foodPlan.rating.toFixed(1)}</span>
            <span className="text-xs text-slate-500">/ 5.0 Food Rating</span>
          </div>
        )}
      </div>

      {/* Overview Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        <div className="bg-white p-3 rounded-lg border border-amber-100">
          <span className="text-xs text-slate-500 block font-medium">Dietary Preference</span>
          <span className="text-sm font-bold text-slate-900 flex items-center gap-1 mt-0.5">
            <Leaf className="w-4 h-4 text-emerald-600" />
            {foodPlan.foodPreference}
          </span>
        </div>

        <div className="bg-white p-3 rounded-lg border border-amber-100">
          <span className="text-xs text-slate-500 block font-medium">Breakfast</span>
          <span className="text-sm font-bold text-slate-900 flex items-center gap-1 mt-0.5">
            <CheckCircle className="w-4 h-4 text-emerald-600" /> Served Daily
          </span>
        </div>

        <div className="bg-white p-3 rounded-lg border border-amber-100">
          <span className="text-xs text-slate-500 block font-medium">Lunch</span>
          <span className="text-sm font-bold text-slate-900 flex items-center gap-1 mt-0.5">
            <CheckCircle className="w-4 h-4 text-emerald-600" /> Served / Packed
          </span>
        </div>

        <div className="bg-white p-3 rounded-lg border border-amber-100">
          <span className="text-xs text-slate-500 block font-medium">Dinner</span>
          <span className="text-sm font-bold text-slate-900 flex items-center gap-1 mt-0.5">
            <CheckCircle className="w-4 h-4 text-emerald-600" /> Served Daily
          </span>
        </div>
      </div>

      {/* Weekly Menu Tab */}
      {foodPlan.weeklyMenu && (
        <div className="bg-white p-4 rounded-xl border border-amber-200/70 shadow-2xs">
          <div className="flex items-center gap-2 mb-3">
            <CalendarDays className="w-4 h-4 text-amber-700" />
            <h4 className="font-bold text-slate-900 text-sm">Sample Weekly Food Menu</h4>
          </div>

          <div className="flex gap-1.5 overflow-x-auto pb-2 mb-3 scrollbar-none">
            {days.map((d) => (
              <button
                key={d.key}
                onClick={() => setSelectedDay(d.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedDay === d.key
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-amber-50 text-slate-700 hover:bg-amber-100'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80">
              <span className="font-bold text-amber-900 uppercase block mb-1">Breakfast</span>
              <p className="text-slate-700 font-medium">{foodPlan.weeklyMenu[selectedDay].breakfast}</p>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80">
              <span className="font-bold text-amber-900 uppercase block mb-1">Lunch</span>
              <p className="text-slate-700 font-medium">{foodPlan.weeklyMenu[selectedDay].lunch}</p>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80">
              <span className="font-bold text-amber-900 uppercase block mb-1">Dinner</span>
              <p className="text-slate-700 font-medium">{foodPlan.weeklyMenu[selectedDay].dinner}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
