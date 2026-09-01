'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Users,
  Search,
  Filter,
  CheckCircle2,
  Send,
  Shield,
  Sparkles,
  UserCheck,
  Moon,
  Sun,
  Flame,
  BookOpen,
  Heart,
  PlusCircle
} from 'lucide-react';
import { MOCK_ROOMMATES, COLLEGES_DATA, Roommate } from '@/lib/mock-data';
import { calculateRoommateCompatibility } from '@/lib/compatibility';
import { CollegeSearchInput } from '@/components/search/CollegeSearchInput';

export default function RoommateFinderPage() {
  const [selectedCollegeId, setSelectedCollegeId] = useState<string>(COLLEGES_DATA[0].id);
  const [filterGender, setFilterGender] = useState<string>('ALL');
  const [filterSmoking, setFilterSmoking] = useState<string>('ALL');
  const [filterSleep, setFilterSleep] = useState<string>('ALL');

  const [connectionModalOpen, setConnectionModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Roommate | null>(null);
  const [connectionSent, setConnectionSent] = useState(false);

  const myProfile: Partial<Roommate> = {
    collegeId: selectedCollegeId,
    budgetMin: 7000,
    budgetMax: 12000,
    smoking: 'No',
    drinking: 'No',
    sleepSchedule: 'Night Owl',
    cleanliness: 'Very Organised',
    studyStyle: 'Quiet',
  };

  const filteredRoommates = MOCK_ROOMMATES.filter((rm) => {
    if (filterGender !== 'ALL' && rm.gender !== filterGender) return false;
    if (filterSmoking !== 'ALL' && rm.smoking !== filterSmoking) return false;
    if (filterSleep !== 'ALL' && rm.sleepSchedule !== filterSleep) return false;
    return true;
  });

  const handleConnectClick = (rm: Roommate) => {
    setSelectedCandidate(rm);
    setConnectionSent(false);
    setConnectionModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Hero */}
        <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 bg-brand-800/80 text-brand-200 text-xs font-bold px-3 py-1 rounded-full border border-brand-700">
              <Users className="w-3.5 h-3.5" />
              <span>StaySetu Compatibility Engine</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              Smart Student Roommate Finder
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Find disciplined, compatible room partners around your college town based on lifestyle habits, budget alignment, and quiet study preferences.
            </p>
          </div>

          <div className="bg-slate-800 border border-slate-700 p-4 rounded-xl text-xs space-y-1.5 shrink-0">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <Shield className="w-4 h-4" /> Mutual Approval Protection
            </div>
            <p className="text-slate-400 text-[11px]">
              Personal phone numbers are strictly hidden until connection requests are mutually accepted.
            </p>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1 text-sm">
              <Filter className="w-4 h-4 text-brand-600" /> Target Campus:
            </span>

            <div className="w-72 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <CollegeSearchInput
                selectedCollegeId={selectedCollegeId}
                onSelectCollege={col => setSelectedCollegeId(col.id)}
                placeholder="Filter by college..."
              />
            </div>
          </div>

          <span className="text-slate-500 font-bold text-sm">{filteredRoommates.length} Compatible Profiles</span>
        </div>

        {/* Roommate Cards Grid */}
        {filteredRoommates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRoommates.map((rm) => {
              const { score, matchedTraits } = calculateRoommateCompatibility(myProfile, rm);

              return (
                <div
                  key={rm.id}
                  className="card card-hover p-5 flex flex-col justify-between space-y-4"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-full overflow-hidden relative border-2 border-brand-200 shrink-0 shadow-xs">
                          <Image src={rm.avatar} alt={rm.name} fill className="object-cover" unoptimized />
                        </div>
                        <div>
                          <h3 className="font-extrabold text-slate-900 dark:text-white text-base">{rm.name}, {rm.age}</h3>
                          <p className="text-xs text-slate-500 font-medium">{rm.course} • {rm.year}</p>
                        </div>
                      </div>

                      <div className="bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 px-3 py-1 rounded-xl text-center shrink-0 shadow-xs">
                        <span className="font-black text-emerald-700 dark:text-emerald-400 text-base">{score}%</span>
                        <span className="block text-[9px] font-black text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">Match</span>
                      </div>
                    </div>

                    {/* Campus & Budget */}
                    <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/80 p-3 rounded-xl border border-slate-200 dark:border-slate-700 mb-3">
                      <p className="font-bold text-brand-700 dark:text-brand-300 flex items-center gap-1 truncate">
                        🎓 {rm.collegeName}
                      </p>
                      <p className="font-medium text-slate-600 dark:text-slate-400">Budget: <span className="font-extrabold text-slate-900 dark:text-white">₹{rm.budgetMin.toLocaleString()} – ₹{rm.budgetMax.toLocaleString()}/mo</span></p>
                    </div>

                    {/* Lifestyle Attributes */}
                    <div className="grid grid-cols-2 gap-1.5 mb-3 text-xs">
                      <span className="p-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-700 dark:text-slate-300 font-semibold flex items-center gap-1">
                        🌙 {rm.sleepSchedule}
                      </span>
                      <span className="p-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-700 dark:text-slate-300 font-semibold flex items-center gap-1">
                        🧹 {rm.cleanliness}
                      </span>
                      <span className="p-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-700 dark:text-slate-300 font-semibold flex items-center gap-1">
                        📚 {rm.studyStyle}
                      </span>
                      <span className="p-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-700 dark:text-slate-300 font-semibold flex items-center gap-1">
                        🚭 Non-Smoker
                      </span>
                    </div>

                    {/* Matched Traits */}
                    <div className="flex flex-wrap items-center gap-1 mb-2">
                      {matchedTraits.map((trait) => (
                        <span key={trait} className="bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 text-[11px] font-bold px-2.5 py-0.5 rounded-lg border border-emerald-200">
                          ✓ {trait}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                    <button
                      onClick={() => handleConnectClick(rm)}
                      className="btn-primary w-full text-xs py-2.5 justify-center"
                    >
                      <Send className="w-4 h-4" />
                      Send Roommate Connection Request
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-10 text-center max-w-md mx-auto space-y-4 shadow-card">
            <Users className="w-12 h-12 text-slate-300 mx-auto" />
            <div className="space-y-1">
              <h3 className="font-bold text-slate-900 dark:text-white text-lg">No roommate profiles created yet</h3>
              <p className="text-xs text-slate-500">
                Be the first student to create a roommate compatibility profile for this college campus.
              </p>
            </div>
            <Link
              href="/profile"
              className="inline-flex items-center gap-1 bg-brand-600 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-xs"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create My Roommate Profile</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
