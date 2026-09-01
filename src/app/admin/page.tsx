'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Building2,
  Users,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Sparkles,
  Search,
  Check,
  X
} from 'lucide-react';
import { PROPERTIES_DATA, MOCK_HELPERS } from '@/lib/mock-data';

export default function AdminDashboardPage() {
  const [pendingVerifications, setPendingVerifications] = useState([
    {
      id: 'v-101',
      ownerName: 'Rajesh Sharma',
      property: 'Sunrise Student Luxury PG',
      documentType: 'Government Aadhar ID + Property Deed',
      date: '25 Jul 2026',
      status: 'PENDING',
    },
    {
      id: 'v-102',
      ownerName: 'Sunita Agarwal',
      property: 'GreenNest Girls Student Residency',
      documentType: 'PAN Card + Lease Authorization',
      date: '24 Jul 2026',
      status: 'PENDING',
    }
  ]);

  const handleApprove = (id: string) => {
    setPendingVerifications(
      pendingVerifications.map((v) => (v.id === id ? { ...v, status: 'VERIFIED' } : v))
    );
  };

  const handleReject = (id: string) => {
    setPendingVerifications(
      pendingVerifications.map((v) => (v.id === id ? { ...v, status: 'REJECTED' } : v))
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-card flex items-center justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 bg-purple-900 text-purple-200 text-xs font-bold px-2.5 py-0.5 rounded border border-purple-700">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>StaySetu Admin Moderation Hub</span>
            </div>
            <h1 className="text-2xl font-black text-white">Platform Administration</h1>
          </div>
          <span className="text-xs bg-emerald-500/20 text-emerald-300 font-bold px-3 py-1 rounded-full border border-emerald-500/40">
            System Normal
          </span>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-card space-y-1">
            <span className="text-xs text-slate-500 font-semibold block">Pending Approvals</span>
            <span className="text-2xl font-black text-amber-600">2</span>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-card space-y-1">
            <span className="text-xs text-slate-500 font-semibold block">Verified Owners</span>
            <span className="text-2xl font-black text-emerald-600">14</span>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-card space-y-1">
            <span className="text-xs text-slate-500 font-semibold block">Active Stays</span>
            <span className="text-2xl font-black text-slate-900">{PROPERTIES_DATA.length}</span>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-card space-y-1">
            <span className="text-xs text-slate-500 font-semibold block">Colleges Mapped</span>
            <span className="text-2xl font-black text-brand-600">5</span>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-card space-y-1">
            <span className="text-xs text-slate-500 font-semibold block">Domestic Helpers</span>
            <span className="text-2xl font-black text-purple-600">{MOCK_HELPERS.length}</span>
          </div>
        </div>

        {/* VERIFICATION QUEUE */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 space-y-4">
          <h2 className="font-bold text-slate-900 text-lg">Verification Queue & Document Moderation</h2>

          <div className="space-y-3">
            {pendingVerifications.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{item.ownerName}</span>
                    <span className="text-xs font-semibold text-brand-700">({item.property})</span>
                  </div>
                  <p className="text-xs text-slate-600">Attached Doc: <span className="font-semibold text-slate-800">{item.documentType}</span></p>
                  <p className="text-[10px] text-slate-400">Submitted: {item.date}</p>
                </div>

                <div className="flex items-center gap-2">
                  {item.status === 'PENDING' ? (
                    <>
                      <button
                        onClick={() => handleApprove(item.id)}
                        className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg shadow-xs flex items-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" /> Approve
                      </button>
                      <button
                        onClick={() => handleReject(item.id)}
                        className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-lg shadow-xs flex items-center gap-1"
                      >
                        <X className="w-3.5 h-3.5" /> Reject
                      </button>
                    </>
                  ) : (
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-md ${
                        item.status === 'VERIFIED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {item.status}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
