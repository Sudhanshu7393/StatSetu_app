'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Inbox, Clock, MessageSquare, CalendarCheck, CheckCircle2,
  XCircle, ChevronRight, Filter, Eye,
} from 'lucide-react';
import { PROPERTIES_DATA } from '@/lib/mock-data';

const MOCK_INQUIRIES = [
  { id: 'inq-1', student: 'Aman Verma', course: 'B.Tech CSE, ABES', property: 'Sunrise Student PG', room: 'Double Sharing', moveIn: '1 Aug 2026', duration: '1 year', date: '25 Jul 2026', status: 'NEW', message: 'Hi, I am interested in the double sharing room. Is it still available?', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=40&q=80' },
  { id: 'inq-2', student: 'Priya Sharma', course: 'B.Tech IT, ABES', property: 'GreenNest Girls PG', room: 'Double Sharing', moveIn: '15 Aug 2026', duration: '6 months', date: '24 Jul 2026', status: 'CONTACTED', message: 'Looking for a girls PG near college. Do you provide food?', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=40&q=80' },
  { id: 'inq-3', student: 'Rohan Gupta', course: 'B.Tech ECE, ABES', property: 'Sunrise Student PG', room: 'Triple Sharing', moveIn: '1 Sep 2026', duration: '1 year', date: '22 Jul 2026', status: 'VISIT_SCHEDULED', message: 'Please schedule a visit for me next week.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=40&q=80' },
  { id: 'inq-4', student: 'Kabir Mehta', course: 'B.Tech CSE, ABES', property: 'Sunrise Student PG', room: 'Double Sharing', moveIn: '1 Jul 2026', duration: '1 year', date: '18 Jul 2026', status: 'BOOKED', message: 'I would like to confirm the booking. What documents do I need?', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=40&q=80' },
  { id: 'inq-5', student: 'Neha Kapoor', course: 'B.Tech IT, ABES', property: 'GreenNest Girls PG', room: 'Triple Sharing', moveIn: '1 Jun 2026', duration: '3 months', date: '10 Jun 2026', status: 'CLOSED', message: 'Found another accommodation. Thank you.', avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=40&q=80' },
];

const STATUS_CONFIG: Record<string, { label: string; className: string; icon: React.ReactNode }> = {
  NEW:             { label: 'New',             className: 'text-blue-700 bg-blue-50 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400',    icon: <Clock className="w-3 h-3" /> },
  CONTACTED:       { label: 'Contacted',       className: 'text-amber-700 bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400', icon: <MessageSquare className="w-3 h-3" /> },
  VISIT_SCHEDULED: { label: 'Visit Scheduled', className: 'text-violet-700 bg-violet-50 border-violet-200 dark:bg-violet-950/30 dark:text-violet-400', icon: <CalendarCheck className="w-3 h-3" /> },
  BOOKED:          { label: 'Booked',          className: 'text-emerald-700 bg-emerald-50 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400', icon: <CheckCircle2 className="w-3 h-3" /> },
  CLOSED:          { label: 'Closed',          className: 'text-slate-600 bg-slate-100 border-slate-200 dark:bg-slate-800 dark:text-slate-400',  icon: <XCircle className="w-3 h-3" /> },
};

const ACTIONS: Record<string, string[]> = {
  NEW:             ['Mark Contacted', 'Schedule Visit', 'Decline'],
  CONTACTED:       ['Schedule Visit', 'Mark Booked', 'Decline'],
  VISIT_SCHEDULED: ['Mark Booked', 'Request Discussion', 'Decline'],
  BOOKED:          ['Mark Closed'],
  CLOSED:          [],
};

export default function OwnerInquiriesPage() {
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selected, setSelected]         = useState<string | null>(null);

  const filtered = statusFilter === 'ALL'
    ? MOCK_INQUIRIES
    : MOCK_INQUIRIES.filter(i => i.status === statusFilter);

  const selectedInq = MOCK_INQUIRIES.find(i => i.id === selected);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900/30 py-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-2">
              <Link href="/owner" className="hover:text-brand-600">Owner Dashboard</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-slate-700 dark:text-slate-300">Inquiries</span>
            </nav>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Inbox className="w-5 h-5 text-brand-600" />
              Student Inquiries
            </h1>
          </div>
        </div>

        {/* Status filter */}
        <div className="flex flex-wrap gap-2 mb-5">
          {['ALL', ...Object.keys(STATUS_CONFIG)].map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`filter-chip text-xs ${statusFilter === s ? 'filter-chip-active' : ''}`}
            >
              {s === 'ALL' ? 'All' : STATUS_CONFIG[s]?.label}
              {s !== 'ALL' && (
                <span className="ml-1 font-bold">
                  ({MOCK_INQUIRIES.filter(i => i.status === s).length})
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Inquiry list */}
          <div className="lg:col-span-2 space-y-3">
            {filtered.length === 0 ? (
              <div className="card p-10 text-center">
                <Inbox className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                <p className="font-semibold text-slate-700 dark:text-slate-300">No inquiries in this category</p>
              </div>
            ) : filtered.map(inq => {
              const cfg = STATUS_CONFIG[inq.status];
              return (
                <div
                  key={inq.id}
                  onClick={() => setSelected(inq.id)}
                  className={`card p-4 cursor-pointer transition-all ${selected === inq.id ? 'border-brand-400 bg-brand-50/30 dark:bg-brand-950/10' : 'hover:border-slate-300'}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-200 shrink-0 relative">
                      <Image src={inq.avatar} alt={inq.student} fill className="object-cover" unoptimized />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white text-sm">{inq.student}</p>
                          <p className="text-xs text-slate-500">{inq.course}</p>
                        </div>
                        <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${cfg.className} shrink-0`}>
                          {cfg.icon}{cfg.label}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 line-clamp-2">{inq.message}</p>
                      <div className="flex flex-wrap gap-3 mt-2 text-[10px] text-slate-400">
                        <span>{inq.property} · {inq.room}</span>
                        <span>Move-in: {inq.moveIn}</span>
                        <span>{inq.date}</span>
                      </div>
                    </div>
                  </div>
                  {ACTIONS[inq.status]?.length > 0 && (
                    <div className="flex gap-2 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                      {ACTIONS[inq.status].map(action => (
                        <button
                          key={action}
                          onClick={e => e.stopPropagation()}
                          className={`text-xs px-3 py-1.5 rounded-lg font-semibold border transition-colors ${
                            action === 'Decline'
                              ? 'border-red-200 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30'
                              : 'btn-secondary py-1.5'
                          }`}
                        >
                          {action}
                        </button>
                      ))}
                      <button
                        onClick={e => e.stopPropagation()}
                        className="ml-auto btn-ghost text-xs flex items-center gap-1"
                      >
                        <MessageSquare className="w-3.5 h-3.5" /> Reply
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Detail panel */}
          <div>
            {selectedInq ? (
              <div className="card p-5 space-y-4 sticky top-20">
                <h3 className="font-semibold text-slate-900 dark:text-white text-sm">Inquiry Details</h3>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-200 relative">
                    <Image src={selectedInq.avatar} alt={selectedInq.student} fill className="object-cover" unoptimized />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white text-sm">{selectedInq.student}</p>
                    <p className="text-xs text-slate-500">{selectedInq.course}</p>
                  </div>
                </div>
                <div className="space-y-2 text-xs">
                  {[
                    { label: 'Property', value: selectedInq.property },
                    { label: 'Room Type', value: selectedInq.room },
                    { label: 'Move-in', value: selectedInq.moveIn },
                    { label: 'Duration', value: selectedInq.duration },
                    { label: 'Received', value: selectedInq.date },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between">
                      <span className="text-slate-500">{label}</span>
                      <span className="font-medium text-slate-800 dark:text-slate-200">{value}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-3 text-xs text-slate-600 dark:text-slate-400 italic">
                  "{selectedInq.message}"
                </div>
                <div className="flex gap-2">
                  <Link href="/messages" className="btn-secondary flex-1 text-xs py-2 justify-center flex gap-1">
                    <MessageSquare className="w-3.5 h-3.5" /> Message
                  </Link>
                  <button className="btn-primary flex-1 text-xs py-2">
                    Accept
                  </button>
                </div>
              </div>
            ) : (
              <div className="card p-8 text-center">
                <Eye className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
                <p className="text-sm text-slate-500">Select an inquiry to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="lg:hidden h-20" />
    </div>
  );
}
