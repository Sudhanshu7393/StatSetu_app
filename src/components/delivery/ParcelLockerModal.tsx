'use client';

import React, { useState, useEffect } from 'react';
import {
  Package,
  X,
  Camera,
  KeyRound,
  Home,
  Users,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ChevronRight,
  QrCode,
  Copy,
  Check,
  Truck,
  RotateCw,
  Sparkles,
} from 'lucide-react';
import { SocietyStore, ParcelPackage } from '@/lib/societyStore';

interface ParcelLockerModalProps {
  isOpen: boolean;
  onClose: () => void;
  flatNo?: string;
}

export function ParcelLockerModal({
  isOpen,
  onClose,
  flatNo = 'Tower A - Flat 102',
}: ParcelLockerModalProps) {
  const [packages, setPackages] = useState<ParcelPackage[]>([]);
  const [selectedPkg, setSelectedPkg] = useState<ParcelPackage | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      loadPackages();
    }
  }, [isOpen]);

  const loadPackages = () => {
    const list = SocietyStore.getPackages();
    setPackages(list);
    if (list.length > 0 && !selectedPkg) {
      setSelectedPkg(list[0]);
    }
  };

  if (!isOpen) return null;

  const handleRouteToDoor = (pkgId: string) => {
    SocietyStore.updatePackageStatus(pkgId, 'DELIVERED_DOOR');
    loadPackages();
    setActionSuccess('Approved! Delivery partner is heading up to your doorstep.');
    setTimeout(() => setActionSuccess(null), 4000);
  };

  const handleRouteToLocker = (pkgId: string) => {
    const randomOtp = Math.floor(1000 + Math.random() * 9000).toString();
    const lockerNum = `Locker #${Math.floor(1 + Math.random() * 12).toString().padStart(2, '0')} (Guard Room)`;
    SocietyStore.updatePackageStatus(pkgId, 'IN_LOCKER', lockerNum, randomOtp);
    loadPackages();
    setActionSuccess(`Secured in ${lockerNum}! Pickup OTP: ${randomOtp}`);
    setTimeout(() => setActionSuccess(null), 5000);
  };

  const handleCopyOtp = (otp: string) => {
    navigator.clipboard.writeText(otp);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const pendingAtGate = packages.filter(p => p.status === 'AT_GATE');
  const inLocker = packages.filter(p => p.status === 'IN_LOCKER');
  const delivered = packages.filter(p => p.status === 'DELIVERED_DOOR' || p.status === 'COLLECTED');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-slate-900 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-amber-300 shadow-inner">
              <Package className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black tracking-tight text-white">Smart Parcel & Locker Hub</h2>
                {pendingAtGate.length > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-black uppercase tracking-wider animate-pulse">
                    {pendingAtGate.length} At Gate
                  </span>
                )}
              </div>
              <p className="text-xs text-amber-100/80">Photo Verification & Secure OTP Pickups</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Feedback Alert */}
        {actionSuccess && (
          <div className="mx-4 mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-2 text-xs font-semibold text-emerald-800 shadow-sm animate-bounce">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{actionSuccess}</span>
          </div>
        )}

        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">

          {/* Pending At Gate Section with Photo Snapshot */}
          {pendingAtGate.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black uppercase text-amber-800 tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
                  Deliveries Waiting At Gate
                </h3>
              </div>

              {pendingAtGate.map(pkg => (
                <div
                  key={pkg.id}
                  className="bg-gradient-to-br from-amber-50/70 to-orange-50/50 border-2 border-amber-300 rounded-3xl p-4 shadow-md space-y-3"
                >
                  <div className="flex gap-3">
                    {/* Gate Camera Snapshot Preview */}
                    <div className="relative w-24 h-24 rounded-2xl overflow-hidden border border-slate-200 shadow-inner shrink-0 bg-slate-900">
                      <img
                        src={pkg.photoUrl}
                        alt="Parcel Gate Snapshot"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-1 left-1 right-1 bg-black/70 backdrop-blur-sm rounded-md px-1 py-0.5 text-[8px] font-bold text-white text-center flex items-center justify-center gap-0.5">
                        <Camera className="w-2.5 h-2.5 text-amber-300" /> Gate Cam
                      </div>
                    </div>

                    {/* Delivery Meta */}
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded-lg bg-amber-200/80 text-amber-900 font-black text-[10px] tracking-wider uppercase">
                          {pkg.courier} Delivery
                        </span>
                        <span className="text-[11px] text-slate-500 font-semibold">{pkg.arrivedAt}</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900">Tracking #{pkg.trackingNo}</h4>
                      <p className="text-xs text-slate-600">
                        Delivery Partner: <span className="font-semibold text-slate-900">{pkg.deliveryBoy}</span>
                      </p>
                      <p className="text-[11px] text-slate-500">For {flatNo} • Sudhanshu Pandey</p>
                    </div>
                  </div>

                  {/* 3-Way Instant Action Buttons */}
                  <div className="pt-2 border-t border-amber-200/60 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleRouteToDoor(pkg.id)}
                      className="py-2.5 px-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-95"
                    >
                      <Home className="w-3.5 h-3.5" />
                      <span>Allow to Doorstep</span>
                    </button>
                    <button
                      onClick={() => handleRouteToLocker(pkg.id)}
                      className="py-2.5 px-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-95 border border-amber-400/30"
                    >
                      <KeyRound className="w-3.5 h-3.5" />
                      <span>Keep in Locker (OTP)</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Secure Smart Locker Pickups Card */}
          {inLocker.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-black uppercase text-slate-700 tracking-wider flex items-center gap-1.5">
                <KeyRound className="w-4 h-4 text-emerald-600" />
                Uncollected Packages In Smart Locker ({inLocker.length})
              </h3>

              {inLocker.map(pkg => (
                <div
                  key={pkg.id}
                  className="p-4 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-black uppercase text-emerald-400 tracking-wider">
                        Stored in Guard Room
                      </span>
                      <h4 className="text-sm font-bold text-white">{pkg.lockerNo}</h4>
                    </div>
                    <span className="px-2 py-1 rounded-xl bg-white/10 text-xs font-semibold text-slate-300">
                      {pkg.courier}
                    </span>
                  </div>

                  {/* High Contrast Pickup OTP Display */}
                  <div className="bg-emerald-950/60 border border-emerald-500/40 rounded-2xl p-3 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-emerald-400">Guard Pickup OTP</div>
                      <div className="text-2xl font-black text-white tracking-widest">{pkg.lockerOtp}</div>
                    </div>
                    <button
                      onClick={() => handleCopyOtp(pkg.lockerOtp || '')}
                      className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-emerald-300 flex items-center gap-1 transition-colors"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{isCopied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  <p className="text-[11px] text-slate-400">
                    Show this OTP to the security guard at Gate 01 when collecting your parcel.
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Delivered History */}
          <div className="space-y-2">
            <h3 className="text-xs font-black uppercase text-slate-500 tracking-wider">
              Recent Delivered Parcels
            </h3>
            {delivered.map(pkg => (
              <div
                key={pkg.id}
                className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black">
                    ✓
                  </div>
                  <div>
                    <div className="font-bold text-slate-800">{pkg.courier} (#{pkg.trackingNo})</div>
                    <div className="text-slate-400 text-[11px]">{pkg.deliveryBoy} • {pkg.arrivedAt}</div>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 text-[10px] font-bold">
                  Delivered
                </span>
              </div>
            ))}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>AI CCTV Gate Verification Enabled</span>
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
