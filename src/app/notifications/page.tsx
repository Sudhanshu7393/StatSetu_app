'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bell, Building2, Users, Heart, Tag, CheckCircle2, ChevronRight, X } from 'lucide-react';

const MOCK_NOTIFICATIONS = [
  { id: 'n-1', type: 'NEW_LISTING',    title: 'New PG near ABES',          message: 'A new boys PG has been listed 400m from ABES Engineering College within your budget.', time: '5 mins ago',   read: false },
  { id: 'n-2', type: 'INQUIRY_UPDATE', title: 'Inquiry status updated',     message: 'Rajesh Sharma has accepted your inquiry for Sunrise Student PG. Contact details shared.', time: '2 hours ago',  read: false },
  { id: 'n-3', type: 'PRICE_DROP',     title: 'Rent drop: GreenNest PG',   message: 'GreenNest Girls PG has reduced triple sharing rent from ₹8,000 to ₹7,500/month.', time: 'Yesterday',    read: true  },
  { id: 'n-4', type: 'AVAILABILITY',   title: 'Room now available',         message: 'Hudson Lane Boys PG now has a single room available from 1 Aug 2026.', time: '2 days ago',   read: true  },
  { id: 'n-5', type: 'REVIEW',         title: 'Review request',             message: 'How was your stay at Sunrise Student PG? Share your experience to help other students.', time: '3 days ago',   read: true  },
];

const TYPE_CONFIG: Record<string, { icon: React.ReactNode; color: string; bg: string }> = {
  NEW_LISTING:    { icon: <Building2 className="w-4 h-4" />, color: 'text-brand-600',   bg: 'bg-brand-50 dark:bg-brand-950' },
  INQUIRY_UPDATE: { icon: <CheckCircle2 className="w-4 h-4" />, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-950/50' },
  PRICE_DROP:     { icon: <Tag className="w-4 h-4" />,       color: 'text-amber-600',   bg: 'bg-amber-50 dark:bg-amber-950/50' },
  AVAILABILITY:   { icon: <Bell className="w-4 h-4" />,      color: 'text-violet-600',  bg: 'bg-violet-50 dark:bg-violet-950/50' },
  REVIEW:         { icon: <Heart className="w-4 h-4" />,     color: 'text-rose-600',    bg: 'bg-rose-50 dark:bg-rose-950/50' },
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [filter, setFilter]               = useState<'all' | 'unread'>('all');

  const markAllRead = () => setNotifications(ns => ns.map(n => ({ ...n, read: true })));
  const dismiss     = (id: string) => setNotifications(ns => ns.filter(n => n.id !== id));

  const shown = filter === 'unread' ? notifications.filter(n => !n.read) : notifications;
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900/30 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Bell className="w-6 h-6 text-brand-600" />
              Notifications
            </h1>
            {unreadCount > 0 && (
              <p className="text-sm text-slate-500 mt-0.5">{unreadCount} unread notification{unreadCount > 1 ? 's' : ''}</p>
            )}
          </div>
          {unreadCount > 0 && (
            <button onClick={markAllRead} className="text-xs text-brand-600 hover:underline font-semibold">
              Mark all as read
            </button>
          )}
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-5">
          {(['all', 'unread'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold capitalize transition-colors ${
                filter === f ? 'bg-brand-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {f === 'unread' ? `Unread (${unreadCount})` : 'All'}
            </button>
          ))}
        </div>

        {/* Notification list */}
        {shown.length === 0 ? (
          <div className="card p-10 text-center">
            <Bell className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
            <h3 className="font-semibold text-slate-700 dark:text-slate-300 mb-1">No notifications</h3>
            <p className="text-sm text-slate-500">
              {filter === 'unread' ? 'No unread notifications.' : 'You have no notifications yet.'}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {shown.map(notif => {
              const cfg = TYPE_CONFIG[notif.type] || TYPE_CONFIG['NEW_LISTING'];
              return (
                <div
                  key={notif.id}
                  className={`card p-4 flex items-start gap-3 transition-all ${!notif.read ? 'border-brand-200 dark:border-brand-800' : ''}`}
                >
                  <div className={`w-9 h-9 rounded-xl ${cfg.bg} flex items-center justify-center shrink-0 ${cfg.color}`}>
                    {cfg.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className={`text-sm font-semibold ${!notif.read ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                        {notif.title}
                        {!notif.read && <span className="inline-block w-2 h-2 rounded-full bg-brand-600 ml-2 align-middle" />}
                      </p>
                      <button onClick={() => dismiss(notif.id)} className="text-slate-400 hover:text-slate-600 shrink-0">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{notif.message}</p>
                    <p className="text-[10px] text-slate-400 mt-1.5">{notif.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Saved Search Alerts CTA */}
        <div className="mt-8 card p-5 border-dashed">
          <h3 className="font-semibold text-slate-900 dark:text-white text-sm mb-1 flex items-center gap-2">
            <Bell className="w-4 h-4 text-brand-600" />
            Saved Search Alerts
          </h3>
          <p className="text-xs text-slate-500 mb-3">
            Save a search like "Boys PG within 1 km of ABES under ₹10,000 with food" and get notified when new listings match.
          </p>
          <Link href="/saved-searches" className="btn-outline text-xs">
            Manage Saved Searches <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
      <div className="lg:hidden h-20" />
    </div>
  );
}
