import React from 'react';
import { MapPin, Bike } from 'lucide-react';
import { calculateTravelEstimates } from '@/lib/compatibility';

interface DistanceBadgeProps {
  collegeName?: string;
  distanceMeters: number;
  className?: string;
}

export const DistanceBadge: React.FC<DistanceBadgeProps> = ({
  collegeName = 'Campus',
  distanceMeters,
  className = '',
}) => {
  const { walkingMinutes, distanceText } = calculateTravelEstimates(distanceMeters);

  return (
    <div className={`inline-flex items-center gap-1 bg-slate-900/90 dark:bg-slate-900/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg border border-white/20 shadow-xs ${className}`}>
      <MapPin className="w-3 h-3 text-brand-400 shrink-0" />
      <span>{distanceText} from {collegeName} ({walkingMinutes} min walk)</span>
    </div>
  );
};
