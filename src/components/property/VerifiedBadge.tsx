import React from 'react';
import { CheckCircle2, ShieldCheck } from 'lucide-react';

interface VerifiedBadgeProps {
  type?: 'identity' | 'property' | 'stay';
  className?: string;
}

export const VerifiedBadge: React.FC<VerifiedBadgeProps> = ({ type = 'property', className = '' }) => {
  const labels = {
    property: 'Verified Property',
    identity: 'Identity Verified',
    stay: 'Verified Stay',
  };

  const tooltips = {
    property: 'Verified by StaySetu team: Ownership & physical property details confirmed.',
    identity: 'Verified Government ID provided by owner.',
    stay: 'Confirmed past tenant stay.',
  };

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80 shadow-xs cursor-help transition-colors hover:bg-emerald-100/70 ${className}`}
      title={tooltips[type]}
    >
      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />
      <span>{labels[type]}</span>
    </div>
  );
};
