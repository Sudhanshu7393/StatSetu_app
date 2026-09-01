'use client';

import React from 'react';
import Link from 'next/link';
import { User, ShieldCheck, MapPin, BookOpen, Heart, Bell, MessageSquare, PlusCircle } from 'lucide-react';
import { COLLEGES_DATA } from '@/lib/mock-data';

export default function ProfilePage() {
  const user = {
    name: 'Aman Verma',
    email: 'aman.verma@abes.ac.in',
    phone: '+91 98765 43210',
    role: 'STUDENT',
    college: COLLEGES_DATA[0],
    course: 'B.Tech Computer Science & Engg',
    year: '3rd Year (Batch 2024-2028)',
    budget: '₹7,000 – ₹10,000 / month',
    gender: 'Male',
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header Profile Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-brand-600 text-white font-black text-2xl flex items-center justify-center border-2 border-brand-200 shrink-0">
              AV
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900">{user.name}</h1>
                <span className="bg-brand-50 text-brand-700 text-xs font-bold px-2 py-0.5 rounded border border-brand-100">
                  Student
                </span>
              </div>
              <p className="text-xs text-slate-500">{user.email} • {user.phone}</p>
              <p className="text-xs font-bold text-brand-700">🎓 {user.college.name}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Link
              href="/saved"
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold text-center"
            >
              Saved Stays
            </Link>
            <Link
              href="/roommates"
              className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold text-center"
            >
              Roommate Profile
            </Link>
          </div>
        </div>

        {/* Details Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-card space-y-4">
          <h2 className="font-bold text-slate-900 text-base">Academic & Accommodation Preferences</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="text-slate-400 block font-medium">Course & Branch</span>
              <span className="font-bold text-slate-900 text-sm">{user.course}</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="text-slate-400 block font-medium">Academic Year</span>
              <span className="font-bold text-slate-900 text-sm">{user.year}</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="text-slate-400 block font-medium">Preferred Budget Range</span>
              <span className="font-bold text-brand-700 text-sm">{user.budget}</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="text-slate-400 block font-medium">Verification Status</span>
              <span className="font-bold text-emerald-700 text-sm flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> College Email Verified
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
