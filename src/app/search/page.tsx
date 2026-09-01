'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  MapPin, SlidersHorizontal, Map as MapIcon, List as ListIcon,
  Building2, ShieldCheck, Utensils, ChevronDown, X, RotateCcw, ArrowUpDown,
} from 'lucide-react';
import { COLLEGES_DATA, PROPERTIES_DATA, Property } from '@/lib/mock-data';
import { PropertyCard } from '@/components/property/PropertyCard';
import { MapView } from '@/components/map/MapView';
import { CollegeSearchInput } from '@/components/search/CollegeSearchInput';

const SORT_OPTIONS = [
  { value: 'RECOMMENDED',    label: 'Recommended' },
  { value: 'DISTANCE',       label: 'Distance' },
  { value: 'RENT_LOW_HIGH',  label: 'Rent: Low to High' },
  { value: 'RATING',         label: 'Rating' },
  { value: 'RECENTLY_ADDED', label: 'Recently Added' },
];

const DISTANCE_OPTIONS = [
  { value: 500,  label: 'Under 500 m' },
  { value: 1000, label: 'Under 1 km' },
  { value: 2000, label: 'Under 2 km' },
  { value: 5000, label: 'Under 5 km' },
  { value: 99999,label: 'Any distance' },
];

const AMENITY_OPTIONS = [
  'High-Speed Wi-Fi', 'Air Conditioning', 'Laundry Service', 'Parking',
  'Power Backup 24x7', 'RO Water Purifier', 'Study Table & Chair',
  'Attached Bathroom', 'CCTV Surveillance', 'Daily Housekeeping', 'Geyser',
];

function FilterSidebar({
  selectedCollegeId, onCollegeChange,
  propertyType, onTypeChange,
  maxDistance, onDistanceChange,
  maxRent, onMaxRentChange,
  genderPref, onGenderChange,
  sharingPref, onSharingChange,
  foodType, onFoodTypeChange,
  foodPref, onFoodPrefChange,
  verifiedOnly, onVerifiedChange,
  availabilityFilter, onAvailabilityChange,
  selectedAmenities, onAmenityToggle,
  onReset,
}: any) {
  return (
    <aside className="space-y-6">
      {/* College */}
      <div>
        <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide block mb-2">
          Target College / University
        </label>
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl">
          <CollegeSearchInput
            selectedCollegeId={selectedCollegeId}
            onSelectCollege={col => onCollegeChange(col.id)}
            placeholder="Search college or city..."
          />
        </div>
      </div>

      {/* Property Type */}
      <div>
        <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide block mb-2">
          Property Type
        </label>
        <div className="flex flex-col gap-1">
          {['ALL', 'PG', 'HOSTEL', 'FLAT'].map(t => (
            <label key={t} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio" name="type" value={t}
                checked={propertyType === t}
                onChange={() => onTypeChange(t)}
                className="accent-brand-600"
              />
              <span className="text-sm text-slate-700 dark:text-slate-300">
                {t === 'ALL' ? 'All Types' : t === 'FLAT' ? 'Student Flat' : t}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Distance */}
      <div>
        <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide block mb-2">
          Distance From College
        </label>
        <div className="flex flex-col gap-1">
          {DISTANCE_OPTIONS.map(d => (
            <label key={d.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio" name="distance" value={d.value}
                checked={maxDistance === d.value}
                onChange={() => onDistanceChange(d.value)}
                className="accent-brand-600"
              />
              <span className="text-sm text-slate-700 dark:text-slate-300">{d.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Monthly Rent */}
      <div>
        <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide block mb-2">
          Monthly Rent — up to ₹{maxRent.toLocaleString('en-IN')}
        </label>
        <input
          type="range" min={2000} max={30000} step={500}
          value={maxRent}
          onChange={e => onMaxRentChange(Number(e.target.value))}
          className="w-full accent-brand-600"
        />
        <div className="flex justify-between text-xs text-slate-400 mt-1">
          <span>₹2,000</span>
          <span>₹30,000+</span>
        </div>
      </div>

      {/* Gender */}
      <div>
        <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide block mb-2">
          Gender
        </label>
        <div className="flex flex-col gap-1">
          {[
            { value: 'ALL', label: 'All' },
            { value: 'BOYS', label: 'Boys' },
            { value: 'GIRLS', label: 'Girls' },
            { value: 'COED', label: 'Co-ed' },
          ].map(g => (
            <label key={g.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio" name="gender" value={g.value}
                checked={genderPref === g.value}
                onChange={() => onGenderChange(g.value)}
                className="accent-brand-600"
              />
              <span className="text-sm text-slate-700 dark:text-slate-300">{g.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Sharing */}
      <div>
        <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide block mb-2">
          Room Sharing
        </label>
        <div className="flex flex-col gap-1">
          {[
            { value: 'ALL', label: 'Any' },
            { value: 'SINGLE', label: 'Single' },
            { value: 'DOUBLE', label: 'Double' },
            { value: 'TRIPLE', label: 'Triple' },
            { value: 'FOUR_PLUS', label: '4+ Sharing' },
          ].map(s => (
            <label key={s.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio" name="sharing" value={s.value}
                checked={sharingPref === s.value}
                onChange={() => onSharingChange(s.value)}
                className="accent-brand-600"
              />
              <span className="text-sm text-slate-700 dark:text-slate-300">{s.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Food */}
      <div>
        <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide block mb-2">
          Food
        </label>
        <div className="flex flex-col gap-1">
          {[
            { value: 'ALL', label: 'Any' },
            { value: 'INCLUDED', label: 'Included in Rent' },
            { value: 'EXTRA_COST', label: 'Available (Extra Cost)' },
            { value: 'NOT_AVAILABLE', label: 'Not Available' },
          ].map(f => (
            <label key={f.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio" name="food" value={f.value}
                checked={foodType === f.value}
                onChange={() => onFoodTypeChange(f.value)}
                className="accent-brand-600"
              />
              <span className="text-sm text-slate-700 dark:text-slate-300">{f.label}</span>
            </label>
          ))}
        </div>
        <div className="mt-2 flex flex-col gap-1">
          <p className="text-xs text-slate-400 mb-1">Food Preference</p>
          {[
            { value: 'ALL', label: 'Any' },
            { value: 'VEGETARIAN', label: 'Vegetarian' },
            { value: 'NON_VEGETARIAN', label: 'Non-Vegetarian' },
            { value: 'BOTH', label: 'Both' },
          ].map(f => (
            <label key={f.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio" name="foodPref" value={f.value}
                checked={foodPref === f.value}
                onChange={() => onFoodPrefChange(f.value)}
                className="accent-brand-600"
              />
              <span className="text-sm text-slate-700 dark:text-slate-300">{f.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div>
        <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide block mb-2">
          Amenities
        </label>
        <div className="flex flex-col gap-1.5">
          {AMENITY_OPTIONS.map(a => (
            <label key={a} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedAmenities.includes(a)}
                onChange={() => onAmenityToggle(a)}
                className="accent-brand-600 rounded"
              />
              <span className="text-sm text-slate-700 dark:text-slate-300">{a}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Verification */}
      <div>
        <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide block mb-2">
          Verification
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={verifiedOnly}
            onChange={e => onVerifiedChange(e.target.checked)}
            className="accent-brand-600 rounded"
          />
          <span className="text-sm text-slate-700 dark:text-slate-300">Verified Properties Only</span>
        </label>
      </div>

      {/* Availability */}
      <div>
        <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide block mb-2">
          Availability
        </label>
        <div className="flex flex-col gap-1">
          {[
            { value: 'ALL', label: 'Any' },
            { value: 'NOW', label: 'Available Now' },
          ].map(av => (
            <label key={av.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio" name="availability" value={av.value}
                checked={availabilityFilter === av.value}
                onChange={() => onAvailabilityChange(av.value)}
                className="accent-brand-600"
              />
              <span className="text-sm text-slate-700 dark:text-slate-300">{av.label}</span>
            </label>
          ))}
        </div>
      </div>

      <button onClick={onReset} className="btn-ghost w-full text-sm border border-slate-200 dark:border-slate-700">
        <RotateCcw className="w-4 h-4" />
        Reset Filters
      </button>
    </aside>
  );
}

// ── Main Search Page ──────────────────────────────────────────────────────────
function SearchPageContent() {
  const searchParams = useSearchParams();
  const collegeParam  = searchParams.get('college') || COLLEGES_DATA[0].id;

  const [selectedCollegeId, setSelectedCollegeId] = useState(collegeParam);
  const [propertyType, setPropertyType]           = useState('ALL');
  const [maxDistance, setMaxDistance]             = useState(99999);
  const [maxRent, setMaxRent]                     = useState(30000);
  const [genderPref, setGenderPref]               = useState('ALL');
  const [sharingPref, setSharingPref]             = useState('ALL');
  const [foodType, setFoodType]                   = useState('ALL');
  const [foodPref, setFoodPref]                   = useState('ALL');
  const [verifiedOnly, setVerifiedOnly]           = useState(false);
  const [availabilityFilter, setAvailabilityFilter] = useState('ALL');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [sortBy, setSortBy]                       = useState('RECOMMENDED');
  const [activePropertyId, setActivePropertyId]   = useState<string | undefined>(undefined);
  const [mobileView, setMobileView]               = useState<'LIST' | 'MAP'>('LIST');
  const [mobileFilterOpen, setMobileFilterOpen]   = useState(false);

  const selectedCollege = COLLEGES_DATA.find(c => c.id === selectedCollegeId) || COLLEGES_DATA[0];

  const toggleAmenity = (a: string) =>
    setSelectedAmenities(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]);

  const resetFilters = () => {
    setPropertyType('ALL'); setMaxDistance(99999); setMaxRent(30000);
    setGenderPref('ALL'); setSharingPref('ALL'); setFoodType('ALL');
    setFoodPref('ALL'); setVerifiedOnly(false); setAvailabilityFilter('ALL');
    setSelectedAmenities([]);
  };

  const filtered = useMemo(() => {
    let result = PROPERTIES_DATA.filter(p => {
      const rel = p.colleges.find(c => c.collegeId === selectedCollegeId);
      if (!rel) return false;
      if (rel.distanceMeters > maxDistance) return false;
      if (propertyType !== 'ALL' && p.type !== propertyType) return false;
      if (p.minRent > maxRent) return false;
      if (genderPref !== 'ALL' && p.genderPreference !== genderPref) return false;
      if (sharingPref !== 'ALL' && !p.rooms.some(r => r.sharingType === sharingPref)) return false;
      if (foodType !== 'ALL' && p.foodPlan.availabilityType !== foodType) return false;
      if (foodPref !== 'ALL' && foodPref !== 'BOTH' && p.foodPlan.foodPreference !== foodPref && p.foodPlan.foodPreference !== 'BOTH') return false;
      if (verifiedOnly && p.verificationStatus !== 'VERIFIED') return false;
      if (availabilityFilter === 'NOW' && p.availableFrom !== 'Available Now') return false;
      if (selectedAmenities.length > 0 && !selectedAmenities.every(a => p.amenities.includes(a))) return false;
      return true;
    });

    if (sortBy === 'DISTANCE') {
      result = result.sort((a, b) => {
        const da = a.colleges.find(c => c.collegeId === selectedCollegeId)?.distanceMeters || 9999;
        const db = b.colleges.find(c => c.collegeId === selectedCollegeId)?.distanceMeters || 9999;
        return da - db;
      });
    } else if (sortBy === 'RENT_LOW_HIGH') {
      result = result.sort((a, b) => a.minRent - b.minRent);
    } else if (sortBy === 'RATING') {
      result = result.sort((a, b) => b.rating - a.rating);
    }
    return result;
  }, [selectedCollegeId, propertyType, maxDistance, maxRent, genderPref, sharingPref, foodType, foodPref, verifiedOnly, availabilityFilter, selectedAmenities, sortBy]);

  const filterProps = {
    selectedCollegeId, onCollegeChange: setSelectedCollegeId,
    propertyType, onTypeChange: setPropertyType,
    maxDistance, onDistanceChange: setMaxDistance,
    maxRent, onMaxRentChange: setMaxRent,
    genderPref, onGenderChange: setGenderPref,
    sharingPref, onSharingChange: setSharingPref,
    foodType, onFoodTypeChange: setFoodType,
    foodPref, onFoodPrefChange: setFoodPref,
    verifiedOnly, onVerifiedChange: setVerifiedOnly,
    availabilityFilter, onAvailabilityChange: setAvailabilityFilter,
    selectedAmenities, onAmenityToggle: toggleAmenity,
    onReset: resetFilters,
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900/30">
      {/* ── Header bar ── */}
      <div className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              Stays near {selectedCollege.name}
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              {filtered.length} {filtered.length === 1 ? 'property' : 'properties'} found
            </p>
          </div>
          <div className="flex items-center gap-2">
            {/* Sort */}
            <div className="relative flex items-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 gap-1.5">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="bg-transparent text-sm text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer pr-1"
              >
                {SORT_OPTIONS.map(s => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
            {/* Mobile filter button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden btn-secondary text-sm px-3 py-2 gap-1.5"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
            {/* Mobile Map/List Toggle */}
            <div className="lg:hidden flex rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
              <button
                onClick={() => setMobileView('LIST')}
                className={`px-3 py-2 text-sm font-medium flex items-center gap-1 ${mobileView === 'LIST' ? 'bg-brand-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}
              >
                <ListIcon className="w-4 h-4" /> List
              </button>
              <button
                onClick={() => setMobileView('MAP')}
                className={`px-3 py-2 text-sm font-medium flex items-center gap-1 ${mobileView === 'MAP' ? 'bg-brand-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}
              >
                <MapIcon className="w-4 h-4" /> Map
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* ── Desktop Filter Sidebar ── */}
          <div className="hidden lg:block w-64 shrink-0">
            <div className="card p-5 sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                </h2>
              </div>
              <FilterSidebar {...filterProps} />
            </div>
          </div>

          {/* ── Results ── */}
          <div className="flex-1 min-w-0">
            {/* Desktop: List + Map side by side */}
            <div className="hidden lg:flex gap-5 h-[calc(100vh-11rem)]">
              {/* Property list */}
              <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                {filtered.length === 0 ? (
                  <div className="card p-10 text-center">
                    <Building2 className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                    <h3 className="font-semibold text-slate-700 dark:text-slate-300 mb-1">Nothing matches all your filters yet.</h3>
                    <p className="text-sm text-slate-500 mb-4">Try increasing the distance or adjusting your budget.</p>
                    <div className="flex gap-2 justify-center">
                      <button onClick={resetFilters} className="btn-secondary text-sm">Clear Filters</button>
                      <button onClick={() => setMaxDistance(5000)} className="btn-outline text-sm">Increase Distance</button>
                    </div>
                  </div>
                ) : (
                  filtered.map(prop => (
                    <div
                      key={prop.id}
                      onMouseEnter={() => setActivePropertyId(prop.id)}
                      onMouseLeave={() => setActivePropertyId(undefined)}
                    >
                      <PropertyCard property={prop} selectedCollegeId={selectedCollegeId} />
                    </div>
                  ))
                )}
              </div>

              {/* Map Sidebar */}
              <div className="w-[450px] xl:w-[500px] shrink-0 h-full">
                <div className="card h-full overflow-hidden p-0 border-2 border-slate-200 dark:border-slate-800">
                  <MapView
                    properties={filtered}
                    selectedCollege={COLLEGES_DATA.find(c => c.id === selectedCollegeId)}
                    activePropertyId={activePropertyId}
                    radiusMeters={maxDistance}
                  />
                </div>
              </div>
            </div>

            {/* Mobile: List OR Map */}
            <div className="lg:hidden">
              {mobileView === 'LIST' ? (
                <div className="space-y-4">
                  {filtered.length === 0 ? (
                    <div className="card p-8 text-center">
                      <Building2 className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                      <h3 className="font-semibold text-slate-700 dark:text-slate-300 mb-1">Nothing matches your filters.</h3>
                      <button onClick={resetFilters} className="btn-secondary text-sm mt-3">Clear Filters</button>
                    </div>
                  ) : filtered.map(prop => (
                    <PropertyCard key={prop.id} property={prop} selectedCollegeId={selectedCollegeId} />
                  ))}
                </div>
              ) : (
                <div className="card h-[calc(100vh-14rem)] p-0 overflow-hidden">
                  <MapView
                    properties={filtered}
                    selectedCollege={COLLEGES_DATA.find(c => c.id === selectedCollegeId)}
                    activePropertyId={activePropertyId}
                    radiusMeters={maxDistance}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile Filter Bottom Sheet ── */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setMobileFilterOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-slate-950 rounded-t-2xl max-h-[85vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-slate-950 flex items-center justify-between px-4 pt-4 pb-3 border-b border-slate-200 dark:border-slate-800">
              <h2 className="font-semibold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </h2>
              <button onClick={() => setMobileFilterOpen(false)} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            <div className="px-4 py-4">
              <FilterSidebar {...filterProps} />
            </div>
            <div className="sticky bottom-0 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 p-4">
              <button onClick={() => setMobileFilterOpen(false)} className="btn-primary w-full text-sm">
                Show {filtered.length} Results
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile bottom nav spacer */}
      <div className="lg:hidden h-20" />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="animate-spin w-6 h-6 border-2 border-brand-600 border-t-transparent rounded-full" /></div>}>
      <SearchPageContent />
    </Suspense>
  );
}

