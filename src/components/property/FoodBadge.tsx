import React from 'react';
import { Utensils, Leaf } from 'lucide-react';
import { FoodPlan } from '@/lib/mock-data';

export const FoodBadge: React.FC<{ foodPlan: FoodPlan; className?: string }> = ({ foodPlan, className = '' }) => {
  if (foodPlan.availabilityType === 'NOT_AVAILABLE') {
    return (
      <span className={`inline-flex items-center gap-1 text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded font-medium ${className}`}>
        <Utensils className="w-3 h-3 text-slate-400" /> No Food
      </span>
    );
  }

  const isInc = foodPlan.availabilityType === 'INCLUDED';

  return (
    <div className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded ${isInc ? 'bg-amber-50 text-amber-800 border border-amber-200/60' : 'bg-slate-100 text-slate-700'} ${className}`}>
      <Utensils className="w-3 h-3 text-amber-600" />
      <span>{isInc ? 'Food Included' : `Food @ ₹${foodPlan.monthlyExtraCost}/mo`}</span>
      {foodPlan.foodPreference === 'VEGETARIAN' && (
        <span title="Pure Vegetarian" className="flex items-center gap-0.5 text-emerald-700 font-semibold text-[11px] ml-0.5">
          • <Leaf className="w-2.5 h-2.5 text-emerald-600 inline" /> Veg
        </span>
      )}
    </div>
  );
};
