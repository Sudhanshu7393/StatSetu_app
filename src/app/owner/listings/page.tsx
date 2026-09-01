'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  List,
  Building2,
  PlusCircle,
  Pencil,
  Pause,
  Play,
  Trash2,
  Eye,
  ShieldCheck,
  MapPin,
  CheckCircle2,
  LayoutDashboard,
  Inbox,
  MessageSquare,
  BarChart2,
  User,
} from 'lucide-react';
import { PROPERTIES_DATA, Property } from '@/lib/mock-data';

const SIDEBAR_ITEMS = [
  { label: 'Overview',      href: '/owner',                    icon: LayoutDashboard },
  { label: 'My Listings',   href: '/owner/listings',           icon: List, active: true },
  { label: 'Inquiries',     href: '/owner/inquiries',          icon: Inbox },
  { label: 'Messages',      href: '/messages',                 icon: MessageSquare },
  { label: 'Analytics',     href: '/owner',                    icon: BarChart2 },
  { label: 'My Profile',    href: '/profile',                  icon: User },
];

export default function OwnerListingsPage() {
  const [properties, setProperties] = useState<Property[]>(
    PROPERTIES_DATA.filter(p => p.owner.id === 'own-1' || p.owner.id === 'own-2')
  );

  const toggleStatus = (id: string) => {
    setProperties(prev =>
      prev.map(p =>
        p.id === id ? { ...p, status: p.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE' } : p
      )
    );
  };

  const deleteProperty = (id: string) => {
    if (confirm('Are you sure you want to remove this property listing?')) {
      setProperties(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900/30 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="card p-3 space-y-0.5 sticky top-20">
              <div className="px-3 py-2 mb-2">
                <p className="font-bold text-slate-900 dark:text-white text-sm">Owner Portal</p>
                <p className="text-xs text-slate-500">Rajesh Sharma</p>
              </div>
              {SIDEBAR_ITEMS.map(({ label, href, icon: Icon, active }) => (
                <Link
                  key={label}
                  href={href}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? 'bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 font-bold'
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

          {/* Content */}
          <div className="flex-1 min-w-0 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-slate-900 dark:text-white">My Property Listings</h1>
                <p className="text-sm text-slate-500 mt-0.5">Manage availability, edit details and track student views</p>
              </div>
              <Link href="/owner/listings/new" className="btn-primary text-sm">
                <PlusCircle className="w-4 h-4" /> Add New Property
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {properties.map(property => (
                <div key={property.id} className="card p-5 space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="relative h-44 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                      <Image
                        src={property.images[0]}
                        alt={property.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                      <span className={`absolute top-3 left-3 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider ${
                        property.status === 'ACTIVE'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-amber-600 text-white'
                      }`}>
                        {property.status}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-extrabold text-slate-900 dark:text-white text-base">{property.name}</h3>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-brand-600 shrink-0" /> {property.address}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 p-2.5 rounded-xl border border-slate-100 dark:border-slate-700">
                      <span>Rent Range: <strong>₹{property.minRent.toLocaleString('en-IN')} - ₹{property.maxRent.toLocaleString('en-IN')}</strong></span>
                      <span>{property.rooms.length} Room Types</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2 text-xs">
                    <Link
                      href={`/stay/${property.slug}`}
                      className="btn-secondary py-1.5 px-3 flex items-center gap-1 text-xs"
                    >
                      <Eye className="w-3.5 h-3.5" /> View
                    </Link>

                    <button
                      onClick={() => toggleStatus(property.id)}
                      className="btn-secondary py-1.5 px-3 flex items-center gap-1 text-xs"
                    >
                      {property.status === 'ACTIVE' ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      {property.status === 'ACTIVE' ? 'Pause' : 'Activate'}
                    </button>

                    <button
                      onClick={() => deleteProperty(property.id)}
                      className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                      title="Delete Listing"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
