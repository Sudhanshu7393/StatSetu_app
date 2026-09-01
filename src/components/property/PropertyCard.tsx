'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  MapPin,
  Clock,
  Star,
  Heart,
  ShieldCheck,
  Utensils,
  BedDouble,
  CalendarCheck,
  Scale,
  Share2,
} from 'lucide-react';
import { useSavedStays } from '@/context/SavedStaysContext';
import { useCompare } from '@/context/CompareContext';
import { WhatsAppConnectButton } from '@/components/property/WhatsAppConnectButton';
import { ShareWithParentsModal } from '@/components/property/ShareWithParentsModal';
import { Property } from '@/lib/mock-data';

interface PropertyCardProps {
  property: Property;
  selectedCollegeId?: string;
}

const SHARING_LABELS: Record<string, string> = {
  SINGLE: 'Single',
  DOUBLE: 'Double Sharing',
  TRIPLE: 'Triple Sharing',
  FOUR: 'Four Sharing',
};

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  selectedCollegeId = 'col-1',
}) => {
  const { isSaved, toggleSave } = useSavedStays();
  const { isInCompare, toggleCompare } = useCompare();

  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState(property.images[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80');

  const saved = isSaved(property.id);
  const inCompare = isInCompare(property.id);

  // Pick closest college relation
  const collegeRel =
    (selectedCollegeId
      ? property.colleges.find(c => c.collegeId === selectedCollegeId)
      : undefined) || property.colleges[0];

  const minRentRoom = property.rooms.reduce((min, r) =>
    r.monthlyRent < min.monthlyRent ? r : min, property.rooms[0]);

  const distanceLabel =
    collegeRel
      ? collegeRel.distanceMeters >= 1000
        ? `${(collegeRel.distanceMeters / 1000).toFixed(1)} km`
        : `${collegeRel.distanceMeters} m`
      : null;

  const foodLabel =
    property.foodPlan.availabilityType === 'INCLUDED'
      ? 'Food Included'
      : property.foodPlan.availabilityType === 'EXTRA_COST'
      ? 'Food Available'
      : 'No Food';

  const genderLabel =
    property.genderPreference === 'BOYS'
      ? 'Boys'
      : property.genderPreference === 'GIRLS'
      ? 'Girls'
      : 'Co-ed';

  const genderClass =
    property.genderPreference === 'BOYS'
      ? 'badge-boys'
      : property.genderPreference === 'GIRLS'
      ? 'badge-girls'
      : 'badge-coed';

  return (
    <div className="card card-hover group flex flex-col overflow-hidden">
      {/* Share Modal */}
      <ShareWithParentsModal
        property={property}
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
      />

      {/* ── Image Container ── */}
      <div className="relative h-52 bg-slate-100 dark:bg-slate-800 overflow-hidden">
        <Image
          src={imgSrc}
          alt={property.name}
          fill
          className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          onError={() => setImgSrc('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80')}
          unoptimized
        />

        {/* Save & Compare Buttons Overlay */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
          {/* Compare Button */}
          <button
            type="button"
            onClick={e => { e.preventDefault(); e.stopPropagation(); toggleCompare(property.id); }}
            className={`h-8 px-2.5 rounded-full flex items-center gap-1 text-[11px] font-bold shadow-card transition-all ${
              inCompare
                ? 'bg-brand-600 text-white'
                : 'bg-white/90 dark:bg-slate-900/80 text-slate-700 hover:bg-white dark:hover:bg-slate-900'
            }`}
            title="Add to side-by-side compare"
          >
            <Scale className="w-3.5 h-3.5" />
            {inCompare ? 'Compared' : '+Compare'}
          </button>

          {/* Heart Bookmark Button */}
          <button
            type="button"
            onClick={e => { e.preventDefault(); e.stopPropagation(); toggleSave(property.id); }}
            className={`w-8 h-8 rounded-full flex items-center justify-center shadow-card transition-all ${
              saved
                ? 'bg-red-500 text-white'
                : 'bg-white/90 dark:bg-slate-900/80 text-slate-600 hover:text-red-500'
            }`}
            title="Save stay"
          >
            <Heart className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Verified Overlay */}
        {property.verificationStatus === 'VERIFIED' && (
          <div className="absolute top-3 left-3 badge-verified">
            <ShieldCheck className="w-3.5 h-3.5" />
            Verified
          </div>
        )}

        {/* Full state */}
        {property.status === 'FULL' && (
          <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center">
            <span className="bg-white text-slate-900 text-sm font-bold px-4 py-1.5 rounded-full">
              Currently Full
            </span>
          </div>
        )}
      </div>

      {/* ── Content Body ── */}
      <div className="flex flex-col flex-1 p-5 space-y-3.5">

        {/* Title & Type */}
        <div>
          <div className="flex items-start justify-between gap-2">
            <Link
              href={`/stay/${property.slug}`}
              className="font-bold text-slate-900 dark:text-white text-base leading-snug hover:text-brand-600 dark:hover:text-brand-400 transition-colors line-clamp-2"
            >
              {property.name}
            </Link>
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded-md shrink-0 bg-slate-50 dark:bg-slate-800">
              {property.type}
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{property.locality}, {property.city}</p>
        </div>

        {/* Rent */}
        <div className="flex items-baseline gap-1.5">
          <span className="text-xl font-extrabold text-slate-900 dark:text-white">
            ₹{minRentRoom?.monthlyRent.toLocaleString('en-IN')}
          </span>
          <span className="text-xs text-slate-500 font-medium">/month onwards</span>
        </div>

        {/* Distance + Travel */}
        {distanceLabel && collegeRel && (
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-2 rounded-lg border border-slate-100 dark:border-slate-800">
            <span className="flex items-center gap-1 font-medium">
              <MapPin className="w-3.5 h-3.5 text-brand-600 shrink-0" />
              {distanceLabel} from {collegeRel.collegeName.split('—')[0].trim()}
            </span>
            <span className="flex items-center gap-1 text-slate-500">
              <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              {collegeRel.estimatedWalkingMinutes} min walk
            </span>
          </div>
        )}

        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <span className={genderClass}>{genderLabel}</span>

          <span className="badge-food">
            <Utensils className="w-3 h-3 mr-1" />
            {foodLabel}
          </span>

          {property.rooms.slice(0, 2).map(r => (
            <span key={r.id} className="inline-flex items-center gap-1 text-xs text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded-lg bg-white dark:bg-slate-900 font-medium">
              <BedDouble className="w-3 h-3 text-slate-400" />
              {SHARING_LABELS[r.sharingType]}
            </span>
          ))}
        </div>

        {/* Rating & Availability */}
        <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-1 text-slate-800 dark:text-slate-200">
            <Star className="w-4 h-4 text-amber-400 fill-current" />
            <span className="font-bold text-sm">{property.rating}</span>
            <span className="text-slate-500">({property.reviewCount} stays)</span>
          </div>
          <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
            <CalendarCheck className="w-3.5 h-3.5" />
            {property.availableFrom}
          </div>
        </div>

        {/* CTAs */}
        <div className="pt-2 mt-auto space-y-2">
          <div className="flex gap-2">
            <Link
              href={`/stay/${property.slug}`}
              className="btn-primary flex-1 text-xs py-2.5 text-center justify-center"
            >
              View Details
            </Link>
            <WhatsAppConnectButton
              property={property}
              college={collegeRel ? { id: collegeRel.collegeId, name: collegeRel.collegeName, slug: '', city: property.city, state: '', popularLocalities: [], latitude: 0, longitude: 0 } : undefined}
              variant="secondary"
            />
            <button
              type="button"
              onClick={e => { e.preventDefault(); e.stopPropagation(); setShareModalOpen(true); }}
              className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl transition-colors shrink-0"
              title="Share Summary with Parents"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
