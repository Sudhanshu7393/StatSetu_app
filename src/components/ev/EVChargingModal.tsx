'use client';

import React, { useState, useEffect } from 'react';
import {
  Zap,
  X,
  BatteryCharging,
  Clock,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  ChevronRight,
  Gauge,
  ArrowRight,
  Power,
  RotateCw,
  Sparkles,
} from 'lucide-react';
import { SocietyStore, EVBay } from '@/lib/societyStore';

interface EVChargingModalProps {
  isOpen: boolean;
  onClose: () => void;
  flatNo?: string;
  onOpenPayment?: (amount: number, purposeTitle: string) => void;
}

export function EVChargingModal({
  isOpen,
  onClose,
  flatNo = 'Tower A - Flat 102',
  onOpenPayment,
}: EVChargingModalProps) {
  const [bays, setBays] = useState<EVBay[]>([]);
  const [activeChargingBayId, setActiveChargingBayId] = useState<string | null>(null);
  const [chargingPercent, setChargingPercent] = useState<number>(45);
  const [kwhDelivered, setKwhDelivered] = useState<number>(4.8);
  const [sessionCost, setSessionCost] = useState<number>(69.6);
  const [sessionSeconds, setSessionSeconds] = useState<number>(420); // 7 mins
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [showSuccessToast, setShowSuccessToast] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      loadBays();
    }
  }, [isOpen]);

  const loadBays = () => {
    const list = SocietyStore.getEVBays();
    setBays(list);
    const active = list.find(b => b.status === 'CHARGING');
    if (active) {
      setActiveChargingBayId(active.id);
      setChargingPercent(active.batteryPercent || 74);
      setKwhDelivered(active.kwhDelivered || 18.6);
      setSessionCost(Math.round((active.kwhDelivered || 18.6) * active.ratePerKwh));
    }
  };

  // Telemetry real-time ticking when charging
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeChargingBayId) {
      interval = setInterval(() => {
        setChargingPercent(prev => (prev < 100 ? prev + 1 : 100));
        setKwhDelivered(prev => +(prev + 0.1).toFixed(2));
        setSessionSeconds(prev => prev + 1);
        setSessionCost(prev => +(prev + 1.45).toFixed(1));
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [activeChargingBayId]);

  if (!isOpen) return null;

  const handleReserveBay = (bay: EVBay) => {
    setIsProcessing(true);
    setTimeout(() => {
      SocietyStore.reserveEVBay(bay.id, flatNo);
      loadBays();
      setIsProcessing(false);
      setShowSuccessToast(`Reserved ${bay.bayName} for 15 mins. Head to Basement B1!`);
      setTimeout(() => setShowSuccessToast(null), 4000);
    }, 600);
  };

  const handleStartCharging = (bay: EVBay) => {
    setIsProcessing(true);
    setTimeout(() => {
      SocietyStore.startEVCharge(bay.id, `Tata Nexon EV (${flatNo})`);
      setActiveChargingBayId(bay.id);
      setChargingPercent(35);
      setKwhDelivered(1.2);
      setSessionCost(17.4);
      loadBays();
      setIsProcessing(false);
      setShowSuccessToast(`Plug-in verified! HyperCharge started on ${bay.bayName}`);
      setTimeout(() => setShowSuccessToast(null), 4000);
    }, 800);
  };

  const handleStopCharging = (bayId: string) => {
    setIsProcessing(true);
    setTimeout(() => {
      SocietyStore.stopEVCharge(bayId);
      const totalAmount = Math.round(sessionCost);
      setActiveChargingBayId(null);
      loadBays();
      setIsProcessing(false);
      if (onOpenPayment) {
        onClose();
        onOpenPayment(totalAmount, `EV Charging Session (${kwhDelivered} kWh)`);
      } else {
        setShowSuccessToast(`Session stopped! ₹${totalAmount} deducted from StaySetu Wallet.`);
        setTimeout(() => setShowSuccessToast(null), 4000);
      }
    }, 700);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s < 10 ? '0' : ''}${s}s`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-700 to-slate-900 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-emerald-300 shadow-inner">
              <Zap className="w-6 h-6 animate-pulse text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black tracking-tight text-white">Smart EV Charging Hub</h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-200 border border-emerald-300/30 text-[10px] font-bold uppercase tracking-wider">
                  Live IoT
                </span>
              </div>
              <p className="text-xs text-emerald-100/80">Greenwood Township • Basement B1 & B2</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toast Notification */}
        {showSuccessToast && (
          <div className="mx-4 mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-2 text-xs font-semibold text-emerald-800 shadow-sm animate-bounce">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{showSuccessToast}</span>
          </div>
        )}

        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
          
          {/* Active Live Telemetry Hero (If user has active session) */}
          {activeChargingBayId && (
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 p-5 text-white shadow-xl border border-emerald-500/30">
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                    Charging In Progress
                  </span>
                </div>
                <span className="text-[11px] font-medium text-slate-300 bg-white/10 px-2.5 py-1 rounded-full border border-white/10">
                  Tata Nexon EV ({flatNo})
                </span>
              </div>

              {/* Circular / Ring Metrics */}
              <div className="grid grid-cols-3 gap-3 my-3 text-center">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-3 backdrop-blur-sm">
                  <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">Battery</div>
                  <div className="text-2xl font-black text-emerald-400 flex items-center justify-center gap-1">
                    {chargingPercent}%
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2 overflow-hidden">
                    <div
                      className="bg-emerald-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${chargingPercent}%` }}
                    />
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-3 backdrop-blur-sm">
                  <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">Delivered</div>
                  <div className="text-2xl font-black text-white">{kwhDelivered}</div>
                  <div className="text-[10px] text-slate-400 font-semibold mt-1">kWh Power</div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-3 backdrop-blur-sm">
                  <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">Est. Amount</div>
                  <div className="text-2xl font-black text-amber-300">₹{Math.round(sessionCost)}</div>
                  <div className="text-[10px] text-slate-400 font-semibold mt-1">{formatTime(sessionSeconds)}</div>
                </div>
              </div>

              {/* Stop Charging Action Button */}
              <button
                disabled={isProcessing}
                onClick={() => handleStopCharging(activeChargingBayId)}
                className="w-full mt-2 py-3 px-4 rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-rose-900/30 transition-all active:scale-95 disabled:opacity-50"
              >
                <Power className="w-4 h-4" />
                <span>Stop Session & Deduct from Wallet</span>
              </button>
            </div>
          )}

          {/* Quick Tariff Info Banner */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50/80 border border-emerald-100 text-xs">
            <div className="flex items-center gap-2 text-emerald-900">
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <span className="font-bold">Society Subsidized EV Tariff: </span>
                <span className="text-emerald-700">₹11.0/kWh (Fast AC) • ₹14.5/kWh (Hyper DC)</span>
              </div>
            </div>
          </div>

          {/* Available Charging Bays List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black uppercase text-slate-700 tracking-wider">
                Society Charging Bays ({bays.length} Points)
              </h3>
              <button
                onClick={loadBays}
                className="text-[11px] text-emerald-600 font-bold hover:text-emerald-700 flex items-center gap-1"
              >
                <RotateCw className="w-3 h-3" /> Refresh
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {bays.map(bay => {
                const isAvailable = bay.status === 'AVAILABLE';
                const isCharging = bay.status === 'CHARGING';
                const isReserved = bay.status === 'RESERVED';

                return (
                  <div
                    key={bay.id}
                    className={`p-4 rounded-2xl border transition-all ${
                      isCharging
                        ? 'bg-slate-50 border-slate-200'
                        : isAvailable
                        ? 'bg-white border-emerald-200 hover:border-emerald-400 hover:shadow-md'
                        : 'bg-amber-50/50 border-amber-200'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-slate-900">{bay.bayName}</span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                              bay.type === 'DC_FAST'
                                ? 'bg-indigo-100 text-indigo-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {bay.powerKw} kW • {bay.type === 'DC_FAST' ? 'Hyper DC' : 'Type 2 AC'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500">{bay.location}</p>
                      </div>

                      {/* Status Badge */}
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1 ${
                          isAvailable
                            ? 'bg-emerald-100 text-emerald-800'
                            : isCharging
                            ? 'bg-blue-100 text-blue-800 animate-pulse'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {isAvailable && <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>}
                        {isCharging && <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>}
                        {bay.status}
                      </span>
                    </div>

                    {/* Meta info / Action Footer */}
                    <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <div className="text-slate-600 font-medium">
                        Rate: <span className="font-bold text-slate-900">₹{bay.ratePerKwh}/kWh</span>
                      </div>

                      {isAvailable && (
                        <div className="flex items-center gap-2">
                          <button
                            disabled={isProcessing}
                            onClick={() => handleReserveBay(bay)}
                            className="px-3 py-1.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs transition-colors"
                          >
                            Reserve 15m
                          </button>
                          <button
                            disabled={isProcessing}
                            onClick={() => handleStartCharging(bay)}
                            className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 shadow-sm transition-all active:scale-95"
                          >
                            <Zap className="w-3.5 h-3.5" /> Start Plug-in
                          </button>
                        </div>
                      )}

                      {isCharging && (
                        <span className="text-xs text-blue-700 font-semibold flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> Est. {bay.sessionMinutesRemaining || 15}m left
                        </span>
                      )}

                      {isReserved && (
                        <span className="text-xs text-amber-700 font-semibold">
                          Reserved by {bay.reservedByFlat || 'Resident'}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Bottom Dock */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Auto-stops at 100% to protect EV battery lifespan</span>
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
