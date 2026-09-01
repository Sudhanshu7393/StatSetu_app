import React from 'react';
import { notFound } from 'next/navigation';
import { COLLEGES_DATA, PROPERTIES_DATA } from '@/lib/mock-data';
import { PropertyCard } from '@/components/property/PropertyCard';
import { MapPin, ShieldCheck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface CollegePageProps {
  params: Promise<{ collegeSlug: string }>;
}

export default async function CollegeStaysPage({ params }: CollegePageProps) {
  const { collegeSlug } = await params;

  const college = COLLEGES_DATA.find((c) => c.slug === collegeSlug);

  if (!college) {
    notFound();
  }

  const collegeProperties = PROPERTIES_DATA.filter((p) =>
    p.colleges.some((c) => c.collegeId === college.id)
  );

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <Link
          href="/search"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All College Search</span>
        </Link>

        {/* Hero Banner for College */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 bg-brand-50 text-brand-700 text-xs font-bold px-3 py-1 rounded-full border border-brand-100">
              <MapPin className="w-3.5 h-3.5" />
              <span>Campus Locality Hub</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              Verified Student Housing near {college.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              Browse PGs, hostels and student flats within walking distance of {college.name}, {college.city}.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-center shrink-0">
            <span className="text-2xl font-black text-brand-600">{collegeProperties.length}</span>
            <span className="block text-xs font-bold text-slate-700">Verified Stays Nearby</span>
          </div>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {collegeProperties.map((prop) => (
            <PropertyCard key={prop.id} property={prop} selectedCollegeId={college.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
