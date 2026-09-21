'use client';

import React, { useState } from 'react';
import {
  MessageCircle,
  X,
  Share2,
  Copy,
  Check,
  QrCode,
  MapPin,
  Clock,
  Car,
  Truck,
  User,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

interface WhatsAppPassModalProps {
  isOpen: boolean;
  onClose: () => void;
  flatNo?: string;
}

export function WhatsAppPassModal({
  isOpen,
  onClose,
  flatNo = 'Tower A - Flat 102',
}: WhatsAppPassModalProps) {
  const [visitorType, setVisitorType] = useState<'GUEST' | 'CAB' | 'DELIVERY' | 'SERVICE'>('GUEST');
  const [visitorName, setVisitorName] = useState('');
  const [visitorPhone, setVisitorPhone] = useState('');
  const [validityHours, setValidityHours] = useState('6');
  const [isCopied, setIsCopied] = useState(false);
  const [generatedPass, setGeneratedPass] = useState<{
    code: string;
    qrUrl: string;
    shareText: string;
    whatsappUrl: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleGenerateAndShare = () => {
    const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
    const guestLabel = visitorName.trim() || (visitorType === 'GUEST' ? 'Guest' : visitorType);
    const gateLocation = 'https://maps.google.com/?q=28.4595,77.0266';
    
    const text = `🏡 *StaySetu Smart Entry Pass*\n\n` +
      `Hello ${guestLabel},\n` +
      `You are invited to *${flatNo}*, Greenwood Grand Township.\n\n` +
      `🔑 *Gate Access PIN:* \`${randomCode}\`\n` +
      `⏳ *Validity:* Next ${validityHours} Hours\n` +
      `📍 *Gate 01 Location:* ${gateLocation}\n\n` +
      `Show this code or tell the guard at the boom barrier for fast 0.4s seamless entry!`;

    const encoded = encodeURIComponent(text);
    const phoneClean = visitorPhone.replace(/\D/g, '');
    const waUrl = phoneClean.length >= 10
      ? `https://api.whatsapp.com/send?phone=91${phoneClean.slice(-10)}&text=${encoded}`
      : `https://api.whatsapp.com/send?text=${encoded}`;

    setGeneratedPass({
      code: randomCode,
      qrUrl: `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=STAYSETU-PASS-${randomCode}`,
      shareText: text,
      whatsappUrl: waUrl,
    });
  };

  const handleCopy = () => {
    if (!generatedPass) return;
    navigator.clipboard.writeText(generatedPass.shareText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-800 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-emerald-200 shadow-inner">
              <MessageCircle className="w-6 h-6 text-emerald-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black tracking-tight text-white">WhatsApp 1-Click Pass</h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-100 border border-emerald-300/30 text-[10px] font-bold uppercase tracking-wider">
                  Instant
                </span>
              </div>
              <p className="text-xs text-emerald-100/80">Share Seamless Gate Passes with Google Maps</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">

          {!generatedPass ? (
            <div className="space-y-4">
              {/* Visitor Type Selector */}
              <div>
                <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider block mb-2">
                  Select Visitor Type
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(
                    [
                      { type: 'GUEST', label: 'Guest', icon: User },
                      { type: 'CAB', label: 'Cab / Taxi', icon: Car },
                      { type: 'DELIVERY', label: 'Delivery', icon: Truck },
                      { type: 'SERVICE', label: 'Service', icon: Sparkles },
                    ] as const
                  ).map(item => {
                    const Icon = item.icon;
                    const isSel = visitorType === item.type;
                    return (
                      <button
                        key={item.type}
                        type="button"
                        onClick={() => setVisitorType(item.type)}
                        className={`p-3 rounded-2xl border text-center flex flex-col items-center gap-1.5 transition-all ${
                          isSel
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-900 shadow-sm'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <Icon className={`w-5 h-5 ${isSel ? 'text-emerald-600' : 'text-slate-400'}`} />
                        <span className="text-[11px] font-bold">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Visitor Name & Mobile Input */}
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider block mb-1">
                    Visitor / Guest Name (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Rahul Sharma"
                    value={visitorName}
                    onChange={e => setVisitorName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider block mb-1">
                    WhatsApp Mobile Number (Optional for Direct Chat)
                  </label>
                  <input
                    type="tel"
                    placeholder="10-digit mobile number"
                    value={visitorPhone}
                    onChange={e => setVisitorPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider block mb-1">
                    Pass Validity Duration
                  </label>
                  <select
                    value={validityHours}
                    onChange={e => setValidityHours(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="2">2 Hours (Quick Delivery / Cab)</option>
                    <option value="6">6 Hours (Standard Guest Visit)</option>
                    <option value="12">12 Hours (Full Day Event)</option>
                    <option value="24">24 Hours (Overnight Stay)</option>
                  </select>
                </div>
              </div>

              {/* Generate Action Button */}
              <button
                onClick={handleGenerateAndShare}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20 transition-all active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Generate WhatsApp Pass</span>
              </button>
            </div>
          ) : (
            /* Pass Generated Result Screen */
            <div className="space-y-4 text-center">
              <div className="p-5 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[10px] font-black uppercase text-emerald-400 tracking-wider">
                    {visitorType} GATE PASS
                  </span>
                  <span className="text-slate-400">Valid for {validityHours} hrs</span>
                </div>

                <div className="text-3xl font-black tracking-widest text-emerald-400 py-1">
                  {generatedPass.code}
                </div>

                <div className="text-xs text-slate-300">
                  Invited by: <strong className="text-white">{flatNo}</strong> (Sudhanshu Pandey)
                </div>

                {/* Pre-formatted Message Card */}
                <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-3 text-left text-xs text-slate-300 whitespace-pre-line font-mono text-[11px] leading-relaxed">
                  {generatedPass.shareText}
                </div>
              </div>

              {/* WhatsApp Share & Copy Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={generatedPass.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-900/20 transition-all active:scale-95"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Send on WhatsApp</span>
                </a>
                <button
                  onClick={handleCopy}
                  className="py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  <span>{isCopied ? 'Copied!' : 'Copy Text'}</span>
                </button>
              </div>

              <button
                onClick={() => setGeneratedPass(null)}
                className="text-xs text-slate-500 font-bold hover:text-slate-700 pt-2"
              >
                ← Create Another Pass
              </button>
            </div>
          )}

        </div>

        {/* Modal Bottom Dock */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Includes Direct Google Maps Gate 01 Navigation</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 font-bold text-slate-800 text-xs transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
