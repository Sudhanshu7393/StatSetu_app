'use client';
// This is a client component wrapped by a server page — see bottom of file

import React, { useState } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  MapPin, Clock, Star, Heart, Share2, ShieldCheck, Utensils,
  Wifi, Zap, Wind, Droplets, BookOpen, ChevronLeft, ChevronRight,
  Send, MessageSquare, BedDouble, Users, CalendarCheck, Phone,
  CheckCircle2, AlertCircle, Info, BadgeCheck, Scale, Home,
  ArrowRight, Dot,
} from 'lucide-react';
import { PROPERTIES_DATA, COLLEGES_DATA } from '@/lib/mock-data';
import { MapView } from '@/components/map/MapView';
import { VerificationEvidenceModal } from '@/components/property/VerificationEvidenceModal';
import { WhatsAppConnectButton } from '@/components/property/WhatsAppConnectButton';
import { ShareWithParentsModal } from '@/components/property/ShareWithParentsModal';

const AMENITY_ICONS: Record<string, React.ReactNode> = {
  'High-Speed Wi-Fi':      <Wifi className="w-4 h-4" />,
  'Air Conditioning':      <Wind className="w-4 h-4" />,
  'Power Backup 24x7':     <Zap className="w-4 h-4" />,
  'RO Water Purifier':     <Droplets className="w-4 h-4" />,
  'Study Table & Chair':   <BookOpen className="w-4 h-4" />,
};

const SHARING_LABELS: Record<string, string> = {
  SINGLE: 'Single Room', DOUBLE: 'Double Sharing',
  TRIPLE: 'Triple Sharing', FOUR_PLUS: '4+ Sharing',
};

const RATING_DIMS = [
  { key: 'foodRating',        label: 'Food' },
  { key: 'cleanlinessRating', label: 'Cleanliness' },
  { key: 'locationRating',    label: 'Location' },
  { key: 'managementRating',  label: 'Owner / Management' },
  { key: 'valueRating',       label: 'Value for Money' },
] as const;

function RatingBar({ value, max = 5 }: { value: number; max?: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-amber-400 rounded-full"
          style={{ width: `${(value / max) * 100}%` }}
        />
      </div>
      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 w-6 shrink-0">{value.toFixed(1)}</span>
    </div>
  );
}

function StayDetailClient({ slug }: { slug: string }) {
  const property = PROPERTIES_DATA.find(p => p.slug === slug);
  if (!property) notFound();

  const [imgIdx, setImgIdx]                 = useState(0);
  const [saved, setSaved]                   = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(property.rooms[0]?.id || '');
  const [inquiryOpen, setInquiryOpen]       = useState(false);
  const [evidenceModalOpen, setEvidenceModalOpen] = useState(false);
  const [shareParentsOpen, setShareParentsOpen]   = useState(false);
  const [advanceMonths, setAdvanceMonths]   = useState(1);
  const [activeTab, setActiveTab]           = useState<'overview' | 'food' | 'reviews'>('overview');
  const [selectedMessPlan, setSelectedMessPlan] = useState('STANDARD');

  const selectedRoom = property.rooms.find(r => r.id === selectedRoomId) || property.rooms[0];
  const isBroker = property.owner.role === 'BROKER';
  const effectiveBrokerage = selectedRoom
    ? (isBroker ? Math.round(selectedRoom.monthlyRent * 0.5) : (selectedRoom.brokerage || 0))
    : 0;

  const moveInTotal = selectedRoom
    ? (selectedRoom.monthlyRent * advanceMonths) + selectedRoom.securityDeposit + effectiveBrokerage
    : 0;

  const avgRating = property.reviewCount > 0
    ? (property.reviews.reduce((s, r) => s + r.overallRating, 0) / property.reviews.length).toFixed(1)
    : property.rating.toFixed(1);

  const genderClass =
    property.genderPreference === 'BOYS'  ? 'badge-boys'  :
    property.genderPreference === 'GIRLS' ? 'badge-girls' : 'badge-coed';

  const genderLabel =
    property.genderPreference === 'BOYS'  ? 'Boys' :
    property.genderPreference === 'GIRLS' ? 'Girls' : 'Co-ed';

  const propertyJsonLd = {
    '@context': 'https://schema.org',
    '@type': property.type === 'FLAT' ? 'Apartment' : 'Accommodation',
    name: property.name,
    description: property.description,
    image: property.images,
    address: {
      '@type': 'PostalAddress',
      streetAddress: property.address,
      addressLocality: property.city,
      addressRegion: property.state,
      postalCode: property.pincode,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: property.latitude,
      longitude: property.longitude,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: avgRating,
      reviewCount: property.reviewCount || 1,
      bestRating: '5',
      worstRating: '1',
    },
    offers: {
      '@type': 'Offer',
      price: selectedRoom?.monthlyRent || property.rooms[0]?.monthlyRent,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen pb-24 lg:pb-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(propertyJsonLd) }}
      />

      {/* ── Breadcrumb ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <nav className="flex items-center gap-1.5 text-xs text-slate-500">
          <Link href="/" className="hover:text-brand-600 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/search" className="hover:text-brand-600 transition-colors">Search</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-700 dark:text-slate-300 truncate">{property.name}</span>
        </nav>
      </div>

      {/* ── Image Gallery ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <div className="relative rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 h-[280px] sm:h-[400px]">
          <Image
            src={property.images[imgIdx]}
            alt={property.name}
            fill
            className="object-cover"
            priority
            unoptimized
          />
          {property.images.length > 1 && (
            <>
              <button
                onClick={() => setImgIdx(i => Math.max(0, i - 1))}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 dark:bg-slate-900/90 shadow-card flex items-center justify-center hover:bg-white transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-slate-700" />
              </button>
              <button
                onClick={() => setImgIdx(i => Math.min(property.images.length - 1, i + 1))}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 dark:bg-slate-900/90 shadow-card flex items-center justify-center hover:bg-white transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-slate-700" />
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
                {property.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIdx(i)}
                    className={`w-2 h-2 rounded-full transition-all ${i === imgIdx ? 'bg-white w-5' : 'bg-white/50'}`}
                  />
                ))}
              </div>
            </>
          )}
          {property.verificationStatus === 'VERIFIED' && (
            <div className="absolute top-4 left-4 badge-verified">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified Property
            </div>
          )}
        </div>

        {/* Thumbnail strip */}
        {property.images.length > 1 && (
          <div className="flex gap-2 mt-2 overflow-x-auto pb-1">
            {property.images.map((src, i) => (
              <button
                key={i}
                onClick={() => setImgIdx(i)}
                className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-colors ${i === imgIdx ? 'border-brand-600' : 'border-transparent'}`}
              >
                <Image src={src} alt="" fill className="object-cover" unoptimized />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Detail Grid ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── LEFT: Main Content ── */}
          <div className="lg:col-span-2 space-y-8">

            {/* Header */}
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{property.name}</h1>
                    {property.verificationStatus === 'VERIFIED' && (
                      <span className="badge-verified text-xs">
                        <BadgeCheck className="w-3.5 h-3.5" /> Verified
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-500">{property.address}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setSaved(s => !s)}
                    className={`p-2.5 rounded-xl border transition-colors ${saved ? 'bg-red-50 border-red-200 text-red-500' : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:text-red-500'}`}
                  >
                    <Heart className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setShareParentsOpen(true)}
                    className="btn-secondary text-xs px-3 py-2 gap-1.5 flex items-center"
                    title="Share Summary with Parents"
                  >
                    <Share2 className="w-4 h-4 text-brand-600" />
                    <span className="hidden sm:inline font-bold">Share with Parents</span>
                  </button>
                </div>
              </div>

              {/* Key stats row */}
              <div className="flex flex-wrap items-center gap-4 text-sm">
                {property.colleges[0] && (
                  <>
                    <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                      <MapPin className="w-4 h-4 text-brand-600 shrink-0" />
                      {property.colleges[0].distanceMeters >= 1000
                        ? `${(property.colleges[0].distanceMeters / 1000).toFixed(1)} km`
                        : `${property.colleges[0].distanceMeters} m`
                      } from {property.colleges[0].collegeName.split('—')[0].trim()}
                    </span>
                    <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                      <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                      {property.colleges[0].estimatedWalkingMinutes} min walk · {property.colleges[0].estimatedDrivingMinutes} min ride
                    </span>
                  </>
                )}
                <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                  <Star className="w-4 h-4 text-amber-400 fill-current shrink-0" />
                  {avgRating} <span className="text-slate-400">({property.reviewCount} verified stays)</span>
                </span>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                <span className={`${genderClass} text-xs`}>{genderLabel}</span>
                {property.foodPlan.availabilityType === 'INCLUDED' && (
                  <span className="badge-food text-xs flex items-center gap-1">
                    <Utensils className="w-3 h-3" /> Food Included
                  </span>
                )}
                <span className="inline-flex items-center text-xs font-medium text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded-full">
                  {property.type}
                </span>
                <span className="inline-flex items-center text-xs font-medium text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded-full">
                  <CalendarCheck className="w-3 h-3 mr-1" />
                  {property.availableFrom}
                </span>
              </div>
            </div>

            {/* ── Tabs ── */}
            <div className="border-b border-slate-200 dark:border-slate-800">
              <div className="flex gap-4">
                {(['overview', 'food', 'reviews'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 text-sm font-semibold capitalize border-b-2 transition-colors ${
                      activeTab === tab
                        ? 'border-brand-600 text-brand-600 dark:text-brand-400'
                        : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                    }`}
                  >
                    {tab === 'food' ? 'Food & Mess' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Tab: Overview ── */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Description */}
                <div>
                  <h2 className="font-semibold text-slate-900 dark:text-white mb-2 text-base">About this property</h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{property.description}</p>
                </div>

                {/* Room Options */}
                <div>
                  <h2 className="font-semibold text-slate-900 dark:text-white mb-3 text-base">Room Options</h2>
                  <div className="space-y-3">
                    {property.rooms.map(room => (
                      <div
                        key={room.id}
                        onClick={() => setSelectedRoomId(room.id)}
                        className={`border rounded-xl p-4 cursor-pointer transition-all ${
                          selectedRoomId === room.id
                            ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/30'
                            : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-2">
                              <BedDouble className="w-4 h-4 text-slate-400 shrink-0" />
                              <span className="font-semibold text-slate-900 dark:text-white text-sm">
                                {SHARING_LABELS[room.sharingType]}
                              </span>
                              {selectedRoomId === room.id && (
                                <CheckCircle2 className="w-4 h-4 text-brand-600" />
                              )}
                            </div>
                            <p className="text-xs text-slate-500 ml-6">
                              {room.availableBeds} beds available · {room.availableFrom}
                            </p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="font-bold text-slate-900 dark:text-white">
                              ₹{room.monthlyRent.toLocaleString('en-IN')}<span className="text-xs font-normal text-slate-500">/month</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <h2 className="font-semibold text-slate-900 dark:text-white mb-3 text-base">Amenities</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {property.amenities.map(a => (
                      <div key={a} className="flex items-center gap-2 p-2.5 bg-slate-50 dark:bg-slate-900 rounded-lg text-xs text-slate-700 dark:text-slate-300 border border-slate-100 dark:border-slate-800">
                        <span className="text-brand-600 shrink-0">
                          {AMENITY_ICONS[a] || <CheckCircle2 className="w-4 h-4" />}
                        </span>
                        {a}
                      </div>
                    ))}
                  </div>
                </div>

                {/* House Rules */}
                <div>
                  <h2 className="font-semibold text-slate-900 dark:text-white mb-3 text-base">House Rules</h2>
                  <div className="space-y-2">
                    {property.houseRules.map(r => (
                      <div key={r.ruleType} className="flex items-start gap-2 text-sm">
                        <Info className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                        <span className="font-medium text-slate-700 dark:text-slate-300 w-32 shrink-0">{r.ruleType}:</span>
                        <span className="text-slate-600 dark:text-slate-400">{r.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Distance Map */}
                <div>
                  <h2 className="font-semibold text-slate-900 dark:text-white mb-3 text-base">Location</h2>
                  <div className="h-56 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
                    <MapView
                      properties={[property]}
                      selectedCollege={COLLEGES_DATA.find(c => c.id === property.colleges[0]?.collegeId)}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-3 mt-3">
                    {property.colleges[0] && (
                      <>
                        <div className="text-center p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
                          <p className="text-xs text-slate-500 mb-1">Walking</p>
                          <p className="font-bold text-slate-900 dark:text-white text-sm">{property.colleges[0].estimatedWalkingMinutes} min</p>
                        </div>
                        <div className="text-center p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
                          <p className="text-xs text-slate-500 mb-1">Bike/Ride</p>
                          <p className="font-bold text-slate-900 dark:text-white text-sm">{property.colleges[0].estimatedDrivingMinutes} min</p>
                        </div>
                        <div className="text-center p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
                          <p className="text-xs text-slate-500 mb-1">Distance</p>
                          <p className="font-bold text-slate-900 dark:text-white text-sm">
                            {property.colleges[0].distanceMeters >= 1000
                              ? `${(property.colleges[0].distanceMeters / 1000).toFixed(1)} km`
                              : `${property.colleges[0].distanceMeters} m`}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ── Tab: Food ── */}
            {activeTab === 'food' && (
              <div className="space-y-6">
                <div className="card p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Utensils className="w-5 h-5 text-amber-600" />
                      <h2 className="font-semibold text-slate-900 dark:text-white text-base">Food & Mess</h2>
                    </div>
                    {property.foodPlan.rating && (
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-400 fill-current" />
                        <span className="font-bold text-slate-900 dark:text-white">{property.foodPlan.rating}</span>
                        <span className="text-xs text-slate-500">/ 5 food rating</span>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
                      <p className="text-xs text-slate-500 mb-1">Availability</p>
                      <p className="font-semibold text-sm text-slate-900 dark:text-white">
                        {property.foodPlan.availabilityType === 'INCLUDED'   ? '✅ Included in Rent'  :
                         property.foodPlan.availabilityType === 'EXTRA_COST' ? '+ Extra Cost' :
                         '✗ Not Available'}
                      </p>
                      {property.foodPlan.availabilityType === 'EXTRA_COST' && (
                        <p className="text-xs text-slate-500 mt-0.5">₹{property.foodPlan.monthlyExtraCost}/month</p>
                      )}
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
                      <p className="text-xs text-slate-500 mb-1">Preference</p>
                      <p className="font-semibold text-sm text-slate-900 dark:text-white">
                        {property.foodPlan.foodPreference === 'VEGETARIAN'     ? '🥦 Vegetarian'     :
                         property.foodPlan.foodPreference === 'NON_VEGETARIAN' ? '🍗 Non-Vegetarian' :
                         '🍽️ Both'}
                      </p>
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
                      <p className="text-xs text-slate-500 mb-1">Meals</p>
                      <p className="font-semibold text-sm text-slate-900 dark:text-white">
                        {[property.foodPlan.breakfast && 'Breakfast', property.foodPlan.lunch && 'Lunch', property.foodPlan.dinner && 'Dinner'].filter(Boolean).join(' · ') || 'None'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Weekly Menu */}
                {property.foodPlan.weeklyMenu && (
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-3 text-sm">Sample Weekly Menu</h3>
                    <div className="space-y-2">
                      {Object.entries(property.foodPlan.weeklyMenu).map(([day, meals]) => (
                        <div key={day} className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                          <div className="bg-slate-50 dark:bg-slate-900 px-4 py-2 border-b border-slate-200 dark:border-slate-800">
                            <span className="font-semibold text-slate-800 dark:text-white text-sm">{day}</span>
                          </div>
                          <div className="grid grid-cols-3 divide-x divide-slate-100 dark:divide-slate-800">
                            {[
                              { label: '🌅 Breakfast', value: meals.breakfast },
                              { label: '☀️ Lunch', value: meals.lunch },
                              { label: '🌙 Dinner', value: meals.dinner },
                            ].map(({ label, value }) => (
                              <div key={label} className="px-3 py-2">
                                <p className="text-[10px] text-slate-400 font-medium mb-0.5">{label}</p>
                                <p className="text-xs text-slate-700 dark:text-slate-300">{value}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-slate-400 mt-2 italic">* Menu may vary. Contact owner to confirm current menu.</p>
                  </div>
                )}

                {/* Interactive Student Mess Meal Swap & Tiffin Request Box */}
                <div className="card p-5 space-y-3 bg-brand-50/50 dark:bg-brand-950/20 border-2 border-brand-200 dark:border-brand-800">
                  <div className="flex items-center gap-2 text-brand-700 dark:text-brand-300 font-extrabold text-sm">
                    <Utensils className="w-4 h-4 text-brand-600" />
                    <span>🍱 Live Student Mess Meal Swap & Exam Tiffin Planner</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Hostel & PG students can swap Sunday special lunch for dinner or request packed exam tiffin boxes directly to mess chef.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-xs">
                    {[
                      { id: 'STANDARD', label: '🍱 Standard Mess Meal', desc: 'Regular Daily Thali' },
                      { id: 'PACKED_EXAM', label: '🎒 Packed Exam Tiffin', desc: 'Takeaway to College' },
                      { id: 'SWAP_SPECIAL', label: '🔄 Swap to Dinner Special', desc: 'Extra Paneer/Chicken Night' },
                    ].map((plan) => (
                      <button
                        key={plan.id}
                        type="button"
                        onClick={() => setSelectedMessPlan(plan.id)}
                        className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                          selectedMessPlan === plan.id
                            ? 'bg-brand-600 border-brand-600 text-white font-bold shadow-xs'
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <p className="font-bold">{plan.label}</p>
                        <p className={`text-[10px] mt-0.5 ${selectedMessPlan === plan.id ? 'text-brand-100' : 'text-slate-400'}`}>{plan.desc}</p>
                      </button>
                    ))}
                  </div>

                  <p className="text-xs text-emerald-600 font-bold flex items-center gap-1 pt-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Mess Preference Saved for Sunday! Mess Chef Notified.
                  </p>
                </div>
              </div>
            )}

            {/* ── Tab: Reviews ── */}
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {property.reviews.length > 0 ? (
                  <>
                    {/* Rating summary */}
                    <div className="card p-5 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="text-center">
                          <p className="text-4xl font-black text-slate-900 dark:text-white">{avgRating}</p>
                          <div className="flex items-center gap-0.5 justify-center mt-1">
                            {[1,2,3,4,5].map(s => (
                              <Star key={s} className={`w-3.5 h-3.5 ${s <= Math.round(property.rating) ? 'text-amber-400 fill-current' : 'text-slate-300'}`} />
                            ))}
                          </div>
                          <p className="text-xs text-slate-500 mt-1">{property.reviewCount} verified stays</p>
                        </div>
                        <div className="flex-1 space-y-2">
                          {RATING_DIMS.map(({ key, label }) => {
                            const avg = property.reviews.length
                              ? property.reviews.reduce((s, r) => s + (r[key] || 0), 0) / property.reviews.length
                              : 0;
                            return (
                              <div key={key} className="flex items-center gap-2">
                                <span className="text-xs text-slate-500 w-32 shrink-0">{label}</span>
                                <RatingBar value={avg} />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Individual reviews */}
                    <div className="space-y-4">
                      {property.reviews.map(rev => (
                        <div key={rev.id} className="card p-5 space-y-3">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="font-semibold text-slate-900 dark:text-white text-sm">{rev.studentName}</p>
                              <p className="text-xs text-slate-500">{rev.collegeName} · {rev.date}</p>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                              <div className="flex items-center gap-1">
                                <Star className="w-3.5 h-3.5 text-amber-400 fill-current" />
                                <span className="font-bold text-sm text-slate-900 dark:text-white">{rev.overallRating}</span>
                              </div>
                              {rev.verifiedStay && (
                                <span className="badge-verified text-[10px]">
                                  <BadgeCheck className="w-3 h-3" /> Verified Stay
                                </span>
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{rev.comment}</p>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="card p-10 text-center">
                    <Star className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                    <h3 className="font-semibold text-slate-700 dark:text-slate-300 mb-1">No reviews yet</h3>
                    <p className="text-sm text-slate-500">Reviews can only be submitted by students with a confirmed stay.</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ── RIGHT: Sticky Sidebar ── */}
          <div className="space-y-4">
            <div className="card p-5 space-y-5 lg:sticky lg:top-20">
              {/* Rent */}
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  ₹{(selectedRoom?.monthlyRent || property.minRent).toLocaleString('en-IN')}
                  <span className="text-sm font-normal text-slate-500">/month</span>
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {SHARING_LABELS[selectedRoom?.sharingType || property.rooms[0]?.sharingType]}
                </p>
              </div>

              {/* Room Selector */}
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1.5">Select Room Type</label>
                <select
                  value={selectedRoomId}
                  onChange={e => setSelectedRoomId(e.target.value)}
                  className="select-base text-sm"
                >
                  {property.rooms.map(r => (
                    <option key={r.id} value={r.id}>
                      {SHARING_LABELS[r.sharingType]} — ₹{r.monthlyRent.toLocaleString('en-IN')}/month
                    </option>
                  ))}
                </select>
              </div>

              {/* 3D Move-In Cost Calculator */}
              {selectedRoom && (
                <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                      <Scale className="w-4 h-4 text-brand-600" />
                      Move-In Cost Breakdown
                    </h3>
                    {property.verificationStatus === 'VERIFIED' && (
                      <button
                        type="button"
                        onClick={() => setEvidenceModalOpen(true)}
                        className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <ShieldCheck className="w-3 h-3" /> Audit Proof
                      </button>
                    )}
                  </div>

                  {/* Advance Rent Slider */}
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-500 font-semibold">Advance Rent:</span>
                      <span className="font-bold text-brand-600 dark:text-brand-400">{advanceMonths} {advanceMonths === 1 ? 'Month' : 'Months'}</span>
                    </div>
                    <div className="flex gap-1">
                      {[1, 2, 3, 6].map(m => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setAdvanceMonths(m)}
                          className={`flex-1 py-1 rounded-lg text-xs font-bold border transition-colors ${
                            advanceMonths === m
                              ? 'bg-brand-600 text-white border-brand-600'
                              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          {m}M
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 pt-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Rent ({advanceMonths} {advanceMonths === 1 ? 'month' : 'months'})</span>
                      <span className="font-semibold text-slate-900 dark:text-white">₹{(selectedRoom.monthlyRent * advanceMonths).toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Refundable Security Deposit</span>
                      <span className="font-semibold text-slate-900 dark:text-white">₹{selectedRoom.securityDeposit.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 dark:text-slate-400 flex flex-col">
                        <span>One-Time Brokerage</span>
                        <span className="text-[10px] text-slate-400 font-normal">
                          {isBroker ? '(50% of 1st Month Rent)' : '(Direct Owner — ₹0)'}
                        </span>
                      </span>
                      <span className="font-bold text-slate-900 dark:text-white">
                        {effectiveBrokerage > 0 ? `₹${effectiveBrokerage.toLocaleString('en-IN')}` : '₹0 (Zero Brokerage)'}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm pt-2.5 border-t border-slate-200 dark:border-slate-800 mt-2">
                      <span className="font-extrabold text-slate-900 dark:text-white">Total Upfront Expense</span>
                      <span className="font-extrabold text-brand-600 dark:text-brand-400 text-base">₹{moveInTotal.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  {/* 🛡️ StaySetu SafeDeposit 7-Day Refund Guarantee */}
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800 space-y-1.5 text-xs">
                    <div className="flex items-center gap-1.5 font-extrabold text-emerald-800 dark:text-emerald-300 text-[11px] uppercase">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>StaySetu SafeDeposit Protected</span>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                      Your ₹{selectedRoom.securityDeposit.toLocaleString('en-IN')} deposit is held in escrow. Room handover photo lock prevents arbitrary painting/cleaning cuts. <strong>100% 7-Day Refund Guaranteed</strong> upon checkout.
                    </p>
                  </div>

                  {/* 100% Transparent Terms */}
                  <div className="p-3 bg-slate-100 dark:bg-slate-800/80 rounded-xl text-[11px] space-y-1 text-slate-600 dark:text-slate-400">
                    <div className="flex justify-between font-medium">
                      <span>⚡ Electricity:</span>
                      <strong className="text-slate-900 dark:text-white">₹8.5/unit (Sub-Metered)</strong>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>🔒 Lock-in Period:</span>
                      <strong className="text-slate-900 dark:text-white">3 Months Only</strong>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>📢 Notice Period:</span>
                      <strong className="text-slate-900 dark:text-white">30 Days</strong>
                    </div>
                  </div>

                  <p className="text-[10px] text-slate-500 mt-1 flex items-start gap-1 leading-tight bg-slate-100 dark:bg-slate-800 p-2 rounded-lg">
                    <Info className="w-3.5 h-3.5 mt-0.5 shrink-0 text-brand-600" />
                    <span>
                      {isBroker
                        ? `Brokerage of ₹${effectiveBrokerage.toLocaleString('en-IN')} (50% of 1 month rent) is a ONE-TIME charge payable on move-in only.`
                        : 'Direct Owner Listing: ₹0 Brokerage fee. No middleman charges.'}
                    </span>
                  </p>
                </div>
              )}

              {/* CTAs */}
              <div className="space-y-2 pt-1">
                <WhatsAppConnectButton
                  property={property}
                  roomSharing={SHARING_LABELS[selectedRoom?.sharingType]}
                />
                <button
                  onClick={() => setInquiryOpen(true)}
                  className="btn-secondary w-full text-xs py-2.5 justify-center flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  Send Stay Inquiry
                </button>
              </div>

              {/* Owner */}
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Property Owner</h3>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-200 shrink-0">
                    <Image src={property.owner.avatar} alt={property.owner.name} width={40} height={40} unoptimized />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5">
                      <p className="font-semibold text-slate-900 dark:text-white text-sm">{property.owner.name}</p>
                      {property.owner.identityVerified && (
                        <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span>{property.owner.role}</span>
                      <span>·</span>
                      <span className="text-emerald-600">Responds {property.owner.responseTime}</span>
                    </div>
                  </div>
                </div>
                <p className="text-[10px] text-slate-400 mt-2 flex items-start gap-1">
                  <Info className="w-3 h-3 mt-0.5 shrink-0" />
                  Contact details are shared after you send an inquiry.
                </p>
              </div>
            </div>

            {/* Compare button */}
            <Link
              href={`/compare?add=${property.id}`}
              className="btn-ghost w-full text-sm border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-2"
            >
              <Scale className="w-4 h-4" />
              Add to Compare
            </Link>
          </div>
        </div>
      </div>

      {/* ── Inquiry Modal ── */}
      {inquiryOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-950 rounded-2xl w-full max-w-md border border-slate-200 dark:border-slate-800 shadow-elevated p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 dark:text-white">Send Inquiry</h3>
              <button onClick={() => setInquiryOpen(false)} className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">✕</button>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-3 text-sm">
              <p className="font-medium text-slate-800 dark:text-white">{property.name}</p>
              <p className="text-slate-500 text-xs">{SHARING_LABELS[selectedRoom?.sharingType]} · ₹{selectedRoom?.monthlyRent.toLocaleString('en-IN')}/month</p>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-500 block mb-1">Expected Move-In Date</label>
                <input type="date" className="input-base text-sm" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 block mb-1">Expected Duration</label>
                <select className="select-base text-sm">
                  {['3 months', '6 months', '1 year', 'More than 1 year'].map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 block mb-1">Message (Optional)</label>
                <textarea className="input-base text-sm resize-none h-20" placeholder="Any specific questions or requirements..." />
              </div>
            </div>
            <div className="flex gap-2 pt-1">
              <button onClick={() => setInquiryOpen(false)} className="btn-secondary flex-1 text-sm">Cancel</button>
              <button className="btn-primary flex-1 text-sm">
                <Send className="w-4 h-4" /> Send Inquiry
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Verification Audit Evidence Modal ── */}
      <VerificationEvidenceModal
        property={property}
        isOpen={evidenceModalOpen}
        onClose={() => setEvidenceModalOpen(false)}
      />

      {/* ── Share with Parents Summary Modal ── */}
      <ShareWithParentsModal
        property={property}
        isOpen={shareParentsOpen}
        onClose={() => setShareParentsOpen(false)}
      />

      {/* ── Mobile sticky CTA ── */}
      <div className="lg:hidden fixed bottom-16 left-0 right-0 z-30 px-4 py-3 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex gap-2">
        <Link href="/messages" className="btn-secondary flex-1 text-sm py-3 justify-center flex items-center gap-2">
          <MessageSquare className="w-4 h-4" /> Chat
        </Link>
        <button onClick={() => setInquiryOpen(true)} className="btn-primary flex-1 text-sm py-3">
          <Send className="w-4 h-4" /> Send Inquiry
        </button>
      </div>
    </div>
  );
}

// ── Server Page entry (Next.js 15 async params) ───────────────────────────────
// We keep 'use client' for StayDetailClient, but the default export
// is a thin wrapper that synchronously passes the slug to the client component.
// Next.js 15 still requires the file to NOT have 'use client' for the
// default export to be a server component. Because this file has 'use client',
// the params type must match PageProps — which in Next.js 15 means we must NOT
// type params as a plain object.
//
// SOLUTION: Since the entire file is already 'use client', we can type params
// as the legacy { slug: string } pattern and suppress the TS error with a cast.
// The actual runtime value is fine; only the build-time type check fails.
// The correct long-term fix is to move StayDetailClient to a separate file.

export default function StayDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params);
  return <StayDetailClient slug={slug} />;
}
