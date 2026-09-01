'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  LayoutDashboard, List, MessageSquare, Inbox, BarChart2,
  ShieldCheck, User, PlusCircle, Eye, Pencil, Pause,
  CheckCircle2, Clock, XCircle, Building2, ChevronRight,
} from 'lucide-react';
import { PROPERTIES_DATA } from '@/lib/mock-data';

const SIDEBAR_ITEMS = [
  { label: 'Overview',      href: '/owner',                    icon: LayoutDashboard, active: true },
  { label: 'My Listings',   href: '/owner/listings',           icon: List },
  { label: 'Inquiries',     href: '/owner/inquiries',          icon: Inbox },
  { label: 'Messages',      href: '/messages',                 icon: MessageSquare },
  { label: 'Analytics',     href: '/owner',                    icon: BarChart2 },
  { label: 'Verification',  href: '/owner/verification',       icon: ShieldCheck },
  { label: 'My Profile',    href: '/profile',                  icon: User },
];

const MOCK_INQUIRIES = [
  { id: 'inq-1', student: 'Aman Verma', property: 'Sunrise Student PG', date: '25 Jul 2026', status: 'NEW', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=40&q=80' },
  { id: 'inq-2', student: 'Priya Sharma', property: 'GreenNest Girls PG', date: '24 Jul 2026', status: 'CONTACTED', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=40&q=80' },
  { id: 'inq-3', student: 'Rohan Gupta', property: 'Sunrise Student PG', date: '22 Jul 2026', status: 'VISIT_SCHEDULED', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=40&q=80' },
  { id: 'inq-4', student: 'Kabir Mehta', property: 'GreenNest Girls PG', date: '20 Jul 2026', status: 'BOOKED', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=40&q=80' },
];

const STATUS_CONFIG: Record<string, { label: string; className: string; icon: React.ReactNode }> = {
  NEW:             { label: 'New',             className: 'text-blue-700 bg-blue-50 border-blue-200',    icon: <Clock className="w-3 h-3" /> },
  CONTACTED:       { label: 'Contacted',       className: 'text-amber-700 bg-amber-50 border-amber-200', icon: <MessageSquare className="w-3 h-3" /> },
  VISIT_SCHEDULED: { label: 'Visit Scheduled', className: 'text-violet-700 bg-violet-50 border-violet-200', icon: <CheckCircle2 className="w-3 h-3" /> },
  BOOKED:          { label: 'Booked',          className: 'text-emerald-700 bg-emerald-50 border-emerald-200', icon: <CheckCircle2 className="w-3 h-3" /> },
  CLOSED:          { label: 'Closed',          className: 'text-slate-600 bg-slate-100 border-slate-300',  icon: <XCircle className="w-3 h-3" /> },
};

const OWNER_PROPERTIES = PROPERTIES_DATA.filter(p => p.owner.id === 'own-1' || p.owner.id === 'own-2');

export default function OwnerDashboard() {
  const [activeItem, setActiveItem] = useState('Overview');

  const stats = [
    { label: 'Active Listings',     value: OWNER_PROPERTIES.filter(p => p.status === 'ACTIVE').length, icon: Building2,    color: 'text-brand-600',   bg: 'bg-brand-50 dark:bg-brand-950' },
    { label: 'New Inquiries',        value: MOCK_INQUIRIES.filter(i => i.status === 'NEW').length, icon: Inbox,        color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-950/50' },
    { label: 'Unread Messages',      value: 3,               icon: MessageSquare, color: 'text-amber-600',   bg: 'bg-amber-50 dark:bg-amber-950/50' },
    { label: 'Saved by Students',    value: 18,              icon: Eye,           color: 'text-violet-600',  bg: 'bg-violet-50 dark:bg-violet-950/50' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">

          {/* ── Sidebar ── */}
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="card p-3 space-y-0.5 sticky top-20">
              <div className="px-3 py-2 mb-2">
                <p className="font-bold text-slate-900 dark:text-white text-sm">Owner Portal</p>
                <p className="text-xs text-slate-500">Rajesh Sharma</p>
              </div>
              {SIDEBAR_ITEMS.map(({ label, href, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setActiveItem(label)}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeItem === label
                      ? 'bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              ))}
              <div className="pt-2 px-3">
                <Link href="/owner/listings/new" className="btn-primary w-full text-xs py-2 justify-center">
                  <PlusCircle className="w-3.5 h-3.5" />
                  Add Listing
                </Link>
              </div>
            </div>
          </aside>

          {/* ── Main Content ── */}
          <div className="flex-1 min-w-0 space-y-6">

            {/* Page header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-slate-900 dark:text-white">Dashboard Overview</h1>
                <p className="text-sm text-slate-500 mt-0.5">Welcome back, Rajesh</p>
              </div>
              <Link href="/owner/listings/new" className="btn-primary text-sm">
                <PlusCircle className="w-4 h-4" />
                New Listing
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map(({ label, value, icon: Icon, color, bg }) => (
                <div key={label} className="card p-4 space-y-3">
                  <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${color}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Inquiries */}
            <div className="card">
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-800">
                <h2 className="font-semibold text-slate-900 dark:text-white text-sm">Recent Inquiries</h2>
                <Link href="/owner/inquiries" className="text-xs text-brand-600 hover:underline flex items-center gap-1">
                  View all <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {MOCK_INQUIRIES.map(inq => {
                  const cfg = STATUS_CONFIG[inq.status];
                  return (
                    <div key={inq.id} className="flex items-center gap-3 px-5 py-3">
                      <div className="w-9 h-9 rounded-full overflow-hidden bg-slate-200 shrink-0">
                        <Image src={inq.avatar} alt={inq.student} width={36} height={36} unoptimized />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-slate-900 dark:text-white text-sm">{inq.student}</p>
                        <p className="text-xs text-slate-500 truncate">{inq.property} · {inq.date}</p>
                      </div>
                      <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${cfg.className}`}>
                        {cfg.icon}{cfg.label}
                      </span>
                      <button className="btn-ghost text-xs px-2 py-1">Reply</button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* My Listings */}
            <div className="card">
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-800">
                <h2 className="font-semibold text-slate-900 dark:text-white text-sm">My Listings</h2>
                <Link href="/owner/listings/new" className="text-xs text-brand-600 hover:underline flex items-center gap-1">
                  <PlusCircle className="w-3.5 h-3.5" /> Add new
                </Link>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {OWNER_PROPERTIES.map(prop => (
                  <div key={prop.id} className="flex items-center gap-3 px-5 py-3">
                    <div className="w-14 h-10 rounded-lg overflow-hidden bg-slate-200 shrink-0 relative">
                      <Image src={prop.images[0]} alt={prop.name} fill className="object-cover" unoptimized />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-900 dark:text-white text-sm truncate">{prop.name}</p>
                      <p className="text-xs text-slate-500">{prop.type} · ₹{prop.minRent.toLocaleString('en-IN')}–{prop.maxRent.toLocaleString('en-IN')}/month</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <Eye className="w-3.5 h-3.5" />
                      <span>{prop.reviewCount * 8} views</span>
                    </div>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      prop.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}>
                      {prop.status}
                    </span>
                    <div className="flex items-center gap-1">
                      <Link href={`/stay/${prop.slug}`} className="btn-ghost px-2 py-1 text-xs"><Eye className="w-3.5 h-3.5" /></Link>
                      <button className="btn-ghost px-2 py-1 text-xs"><Pencil className="w-3.5 h-3.5" /></button>
                      <button className="btn-ghost px-2 py-1 text-xs text-amber-600"><Pause className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:hidden h-20" />
    </div>
  );
}
