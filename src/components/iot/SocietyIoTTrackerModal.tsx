'use client';

import React, { useState, useEffect } from 'react';
import {
  Droplets,
  Zap,
  X,
  RotateCw,
  Clock,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
  Activity,
  Truck,
  Fuel,
  Sparkles,
} from 'lucide-react';
import { SocietyStore, IoTStatus } from '@/lib/societyStore';

interface SocietyIoTTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SocietyIoTTrackerModal({
  isOpen,
  onClose,
}: SocietyIoTTrackerModalProps) {
  const [iotData, setIotData] = useState<IoTStatus | null>(null);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      loadIoT();
    }
  }, [isOpen]);

  const loadIoT = () => {
    const data = SocietyStore.getIoTStatus();
    setIotData(data);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      loadIoT();
      setIsRefreshing(false);
    }, 600);
  };

  if (!isOpen || !iotData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-700 via-blue-800 to-slate-900 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-cyan-300 shadow-inner">
              <Activity className="w-6 h-6 text-cyan-300 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black tracking-tight text-white">Smart Water & DG Live IoT</h2>
                <span className="px-2 py-0.5 rounded-full bg-cyan-400/20 text-cyan-200 border border-cyan-300/30 text-[10px] font-bold uppercase tracking-wider">
                  Live Sensors
                </span>
              </div>
              <p className="text-xs text-cyan-100/80">Automated Overhead Tankers & Generator Backup</p>
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

          {/* Sync Header */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              {iotData.lastUpdated}
            </span>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="text-cyan-700 font-bold hover:text-cyan-800 flex items-center gap-1 disabled:opacity-50"
            >
              <RotateCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Refresh Telemetry</span>
            </button>
          </div>

          {/* WATER TANK IOT CARD */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-cyan-950 via-slate-900 to-blue-950 text-white border border-cyan-500/30 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Droplets className="w-5 h-5 text-cyan-400" />
                <span className="text-xs font-black uppercase text-cyan-300 tracking-wider">
                  Society Overhead Water Reserve
                </span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 text-[10px] font-bold">
                Optimal Level
              </span>
            </div>

            <div className="flex items-baseline justify-between">
              <div>
                <div className="text-3xl font-black text-white">{iotData.waterTankPercent}% Full</div>
                <p className="text-xs text-slate-300 mt-0.5">
                  {(iotData.waterRemainingLiters / 1000).toLocaleString()}k Liters remaining of {(iotData.waterCapacityLiters / 1000).toLocaleString()}k L capacity
                </p>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400">Today's Inflow</span>
                <div className="text-base font-bold text-cyan-300">{iotData.tankersToday} Tankers Added</div>
              </div>
            </div>

            {/* Liquid Fill Progress Bar */}
            <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden border border-slate-700">
              <div
                className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all duration-500 shadow-lg shadow-cyan-500/50"
                style={{ width: `${iotData.waterTankPercent}%` }}
              />
            </div>

            {/* Tanker Schedule Pill */}
            <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-2 text-xs text-cyan-200">
              <Truck className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>{iotData.tankerArrivalStatus}</span>
            </div>
          </div>

          {/* DIESEL GENERATOR (DG) BACKUP IOT CARD */}
          <div className="p-5 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-400" />
                <span className="text-xs font-black uppercase text-amber-300 tracking-wider">
                  DG Power Backup Status
                </span>
              </div>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                  iotData.dgStatus === 'RUNNING'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-400/30 animate-pulse'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                }`}
              >
                Grid Active • DG {iotData.dgStatus}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-3">
                <div className="text-[10px] uppercase font-bold text-slate-400">Monthly Backup Units</div>
                <div className="text-xl font-black text-white mt-1">{iotData.dgMonthlyUnits} Units</div>
                <span className="text-[10px] text-slate-400">Consumed this month</span>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-3">
                <div className="text-[10px] uppercase font-bold text-slate-400">DG Power Tariff</div>
                <div className="text-xl font-black text-amber-300 mt-1">₹{iotData.dgRatePerUnit}/unit</div>
                <span className="text-[10px] text-slate-400">Sub-metered billing</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              DG generator automatically switches on within 15 seconds of any grid failure. Units consumed are deducted automatically via the Smart Meter.
            </p>
          </div>

        </div>

        {/* Modal Bottom Dock */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Connected to Ultrasonic Level & Sub-Meter Sensors</span>
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
