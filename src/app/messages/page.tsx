'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  MessageSquare, Send, Building2, ShieldCheck,
  Clock, ChevronRight, Phone, Info,
} from 'lucide-react';
import { PROPERTIES_DATA } from '@/lib/mock-data';

const MOCK_CONVERSATIONS = [
  {
    id: 'conv-1',
    propertyId: 'prop-1',
    ownerName: 'Rajesh Sharma',
    ownerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=40&q=80',
    lastMessage: 'Yes, the room is still available. Please visit any morning.',
    lastTime: '10 mins ago',
    unread: 2,
  },
  {
    id: 'conv-2',
    propertyId: 'prop-2',
    ownerName: 'Sunita Agarwal',
    ownerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=40&q=80',
    lastMessage: 'Please share your college ID to proceed.',
    lastTime: '2 hours ago',
    unread: 0,
  },
];

export default function MessagesPage() {
  const [activeConvId, setActiveConvId] = useState<string | null>(MOCK_CONVERSATIONS[0]?.id || null);
  const [message, setMessage]           = useState('');
  const [messages, setMessages]         = useState([
    { id: 'm-1', sender: 'owner', text: 'Hello! Yes the room is available. When would you like to visit?', time: '9:15 AM' },
    { id: 'm-2', sender: 'student', text: 'Hi! I was looking at the double sharing room. Is it still available?', time: '9:10 AM' },
  ]);

  const activeConv = MOCK_CONVERSATIONS.find(c => c.id === activeConvId);
  const activeProp = PROPERTIES_DATA.find(p => p.id === activeConv?.propertyId);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setMessages(msgs => [...msgs, { id: `m-${Date.now()}`, sender: 'student', text: message.trim(), time: 'Now' }]);
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-xl font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-brand-600" />
          Messages
        </h1>

        <div className="card overflow-hidden flex" style={{ height: 'calc(100vh - 14rem)' }}>
          {/* Conversation list */}
          <div className={`${activeConvId ? 'hidden sm:flex' : 'flex'} flex-col w-full sm:w-72 border-r border-slate-200 dark:border-slate-800`}>
            <div className="p-3 border-b border-slate-200 dark:border-slate-800">
              <input type="search" placeholder="Search conversations..." className="input-base text-sm" />
            </div>
            <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
              {MOCK_CONVERSATIONS.map(conv => {
                const prop = PROPERTIES_DATA.find(p => p.id === conv.propertyId);
                return (
                  <button
                    key={conv.id}
                    onClick={() => setActiveConvId(conv.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors text-left ${activeConvId === conv.id ? 'bg-brand-50 dark:bg-brand-950/30' : ''}`}
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-200 shrink-0 relative">
                      <Image src={conv.ownerAvatar} alt={conv.ownerName} fill className="object-cover" unoptimized />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-slate-900 dark:text-white text-sm truncate">{conv.ownerName}</p>
                        <span className="text-[10px] text-slate-400">{conv.lastTime}</span>
                      </div>
                      <p className="text-xs text-slate-500 truncate">{prop?.name}</p>
                      <p className="text-xs text-slate-400 truncate mt-0.5">{conv.lastMessage}</p>
                    </div>
                    {conv.unread > 0 && (
                      <span className="w-5 h-5 rounded-full bg-brand-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                        {conv.unread}
                      </span>
                    )}
                  </button>
                );
              })}
              {MOCK_CONVERSATIONS.length === 0 && (
                <div className="p-8 text-center">
                  <MessageSquare className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-sm text-slate-500">No conversations yet</p>
                </div>
              )}
            </div>
          </div>

          {/* Chat window */}
          {activeConvId && activeConv ? (
            <div className="flex-1 flex flex-col min-w-0">
              {/* Header */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
                <button onClick={() => setActiveConvId(null)} className="sm:hidden text-slate-500 hover:text-slate-700 mr-1">
                  ←
                </button>
                {activeProp && (
                  <div className="w-10 h-8 rounded-lg overflow-hidden bg-slate-200 shrink-0 relative">
                    <Image src={activeProp.images[0]} alt={activeProp.name} fill className="object-cover" unoptimized />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900 dark:text-white text-sm">{activeConv.ownerName}</p>
                  <p className="text-xs text-slate-500 truncate">{activeProp?.name} · ₹{activeProp?.minRent.toLocaleString('en-IN')}/month</p>
                </div>
                {activeConv && (
                  <div className="flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs text-emerald-600 font-medium hidden sm:inline">Verified Owner</span>
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800 flex gap-2 overflow-x-auto">
                {['Request Visit', 'Ask Availability', 'Send Booking Request'].map(a => (
                  <button key={a} className="filter-chip text-[10px] whitespace-nowrap">{a}</button>
                ))}
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 flex flex-col-reverse">
                {[...messages].reverse().map(msg => (
                  <div key={msg.id} className={`flex ${msg.sender === 'student' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm ${
                      msg.sender === 'student'
                        ? 'bg-brand-600 text-white rounded-br-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-sm'
                    }`}>
                      <p>{msg.text}</p>
                      <p className={`text-[10px] mt-1 ${msg.sender === 'student' ? 'text-brand-100' : 'text-slate-400'}`}>{msg.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Privacy note */}
              <div className="px-4 py-1.5 bg-amber-50 dark:bg-amber-950/30 border-t border-amber-100 dark:border-amber-900">
                <p className="text-[10px] text-amber-700 dark:text-amber-400 flex items-center gap-1">
                  <Info className="w-3 h-3 shrink-0" />
                  Phone numbers are shared only after you send a booking inquiry. Keep conversations on StaySetu.
                </p>
              </div>

              {/* Input */}
              <form onSubmit={sendMessage} className="flex items-center gap-2 px-4 py-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
                <input
                  type="text"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="input-base text-sm flex-1"
                />
                <button type="submit" className="btn-primary px-4 py-2.5">
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          ) : (
            <div className="hidden sm:flex flex-1 items-center justify-center flex-col gap-3 text-center">
              <MessageSquare className="w-10 h-10 text-slate-300 dark:text-slate-600" />
              <p className="text-sm font-medium text-slate-500">Select a conversation to start messaging</p>
              <Link href="/search" className="btn-outline text-sm">Find a Stay to Inquire</Link>
            </div>
          )}
        </div>
      </div>
      <div className="lg:hidden h-20" />
    </div>
  );
}
