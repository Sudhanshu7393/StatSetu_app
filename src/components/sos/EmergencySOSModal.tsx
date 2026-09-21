'use client';

import React, { useState } from 'react';
import {
  ShieldAlert,
  X,
  AlertTriangle,
  Flame,
  PhoneCall,
  Activity,
  CheckCircle2,
  BellRing,
  Radio,
  ShieldCheck,
} from 'lucide-react';
import { SocietyStore } from '@/lib/societyStore';

interface EmergencySOSModalProps {
  isOpen: boolean;
  onClose: () => void;
  flatNo?: string;
  residentName?: string;
  phone?: string;
}

export function EmergencySOSModal({
  isOpen,
  onClose,
  flatNo = 'Tower A - Flat 102',
  residentName = 'Sudhanshu Pandey',
  phone = '73930 11350',
}: EmergencySOSModalProps) {
  const [selectedEmergency, setSelectedEmergency] = useState<'MEDICAL' | 'LIFT' | 'FIRE' | 'THREAT' | null>(null);
  const [isTriggered, setIsTriggered] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(3);

  if (!isOpen) return null;

  const handleTriggerSOS = (type: 'MEDICAL' | 'LIFT' | 'FIRE' | 'THREAT') => {
    setSelectedEmergency(type);
    setIsTriggered(true);

    const emergencyLabels = {
      MEDICAL: 'Medical Emergency Alert',
      LIFT: 'Lift Stuck Distress Call',
      FIRE: 'Fire Hazard Warning',
      THREAT: 'Security Threat / Intruder Alert',
    };

    // Log to Gate Terminal immediately
    SocietyStore.addGateLog(
      'EMERGENCY',
      `🚨 SOS: ${emergencyLabels[type]} — ${flatNo} (${residentName}, ${phone})`,
      'GUARD SIREN ON',
      true
    );
  };

  const handleCancelSOS = () => {
    setIsTriggered(false);
    setSelectedEmergency(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-rose-100 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 via-rose-700 to-slate-950 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-rose-200 shadow-inner">
              <ShieldAlert className="w-6 h-6 text-rose-200 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black tracking-tight text-white">Emergency SOS Terminal</h2>
                <span className="px-2 py-0.5 rounded-full bg-rose-400/20 text-rose-100 border border-rose-300/30 text-[10px] font-bold uppercase tracking-wider">
                  24/7 Gate Dispatch
                </span>
              </div>
              <p className="text-xs text-rose-100/80">Direct Siren Trigger to Security Guard Post</p>
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

          {!isTriggered ? (
            <div className="space-y-4">
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-900 leading-relaxed">
                <strong>Important:</strong> Tapping any button below will trigger a loud emergency siren on the Security Guard's terminal and broadcast your flat location (<strong>{flatNo}</strong>) instantly.
              </div>

              {/* 4 Core Emergency Action Grid */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleTriggerSOS('MEDICAL')}
                  className="p-4 rounded-3xl bg-rose-50 border-2 border-rose-300 hover:border-rose-500 hover:shadow-lg transition-all text-left flex flex-col justify-between h-32 active:scale-95 group"
                >
                  <div className="w-10 h-10 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-md">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-rose-950">Medical Help</h4>
                    <p className="text-[10px] text-rose-700">First Aid & Ambulance</p>
                  </div>
                </button>

                <button
                  onClick={() => handleTriggerSOS('LIFT')}
                  className="p-4 rounded-3xl bg-amber-50 border-2 border-amber-300 hover:border-amber-500 hover:shadow-lg transition-all text-left flex flex-col justify-between h-32 active:scale-95 group"
                >
                  <div className="w-10 h-10 rounded-2xl bg-amber-600 text-white flex items-center justify-center shadow-md">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-amber-950">Lift Stuck</h4>
                    <p className="text-[10px] text-amber-700">Technician Dispatch</p>
                  </div>
                </button>

                <button
                  onClick={() => handleTriggerSOS('FIRE')}
                  className="p-4 rounded-3xl bg-orange-50 border-2 border-orange-300 hover:border-orange-500 hover:shadow-lg transition-all text-left flex flex-col justify-between h-32 active:scale-95 group"
                >
                  <div className="w-10 h-10 rounded-2xl bg-orange-600 text-white flex items-center justify-center shadow-md">
                    <Flame className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-orange-950">Fire Alert</h4>
                    <p className="text-[10px] text-orange-700">Extinguisher Team</p>
                  </div>
                </button>

                <button
                  onClick={() => handleTriggerSOS('THREAT')}
                  className="p-4 rounded-3xl bg-slate-900 border-2 border-slate-700 hover:border-rose-500 hover:shadow-lg transition-all text-left flex flex-col justify-between h-32 active:scale-95 group text-white"
                >
                  <div className="w-10 h-10 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-md">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">Security Threat</h4>
                    <p className="text-[10px] text-rose-300">Intruder & Guard Alarm</p>
                  </div>
                </button>
              </div>

              {/* Direct Quick Dial Numbers */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-black uppercase text-slate-500 tracking-wider">
                  Direct Guard Intercom & Hotlines
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="tel:9871100222"
                    className="p-3 rounded-2xl bg-slate-50 border border-slate-200 hover:bg-slate-100 flex items-center gap-2 text-xs font-bold text-slate-800 transition-colors"
                  >
                    <PhoneCall className="w-4 h-4 text-emerald-600" />
                    <span>Main Gate Guard</span>
                  </a>
                  <a
                    href="tel:112"
                    className="p-3 rounded-2xl bg-slate-50 border border-slate-200 hover:bg-slate-100 flex items-center gap-2 text-xs font-bold text-slate-800 transition-colors"
                  >
                    <PhoneCall className="w-4 h-4 text-rose-600" />
                    <span>Police (112)</span>
                  </a>
                </div>
              </div>
            </div>
          ) : (
            /* SOS Dispatched Screen */
            <div className="space-y-4 text-center py-2">
              <div className="p-6 rounded-3xl bg-rose-950 text-white border-2 border-rose-500 shadow-2xl space-y-4">
                <div className="w-16 h-16 rounded-full bg-rose-600 flex items-center justify-center mx-auto shadow-lg shadow-rose-600/50 animate-pulse">
                  <BellRing className="w-8 h-8 text-white" />
                </div>

                <div className="space-y-1">
                  <span className="px-3 py-1 rounded-full bg-rose-500/30 text-rose-300 border border-rose-400 text-xs font-black uppercase tracking-widest animate-ping">
                    SIREN DISPATCHED
                  </span>
                  <h3 className="text-xl font-black text-white pt-2">
                    Guard Team Notified!
                  </h3>
                  <p className="text-xs text-rose-200 max-w-xs mx-auto">
                    Security Guards on duty at Gate 01 & Tower A lobby are rushing to <strong>{flatNo}</strong>.
                  </p>
                </div>

                <div className="bg-rose-900/60 rounded-2xl p-3 text-xs text-rose-200 border border-rose-800 space-y-1">
                  <div>Resident: <strong>{residentName}</strong></div>
                  <div>Phone: <strong>{phone}</strong></div>
                  <div>Broadcast: <strong>{selectedEmergency} ALERT</strong></div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleCancelSOS}
                  className="py-3 px-6 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
                >
                  I Am Safe (Cancel False Alarm)
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Dock */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-rose-600" />
            <span>Emergency audio beacon active on Guard terminal</span>
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
