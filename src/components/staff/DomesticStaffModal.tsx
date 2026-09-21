'use client';

import React, { useState, useEffect } from 'react';
import {
  Users,
  X,
  MapPin,
  Calendar,
  Phone,
  Star,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ChevronRight,
  Plus,
  DollarSign,
  Search,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import { SocietyStore, HelperStaff } from '@/lib/societyStore';

interface DomesticStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  flatNo?: string;
  onOpenPayment?: (amount: number, purposeTitle: string) => void;
}

export function DomesticStaffModal({
  isOpen,
  onClose,
  flatNo = 'Tower A - Flat 102',
  onOpenPayment,
}: DomesticStaffModalProps) {
  const [helpers, setHelpers] = useState<HelperStaff[]>([]);
  const [activeSubTab, setActiveSubTab] = useState<'MY_STAFF' | 'FIND_REPLACEMENT' | 'SALARY'>('MY_STAFF');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStaff, setSelectedStaff] = useState<HelperStaff | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      loadStaff();
    }
  }, [isOpen]);

  const loadStaff = () => {
    const list = SocietyStore.getHelpers();
    setHelpers(list);
  };

  if (!isOpen) return null;

  const handleBookHelper = (helper: HelperStaff) => {
    SocietyStore.bookHelper(helper.id);
    loadStaff();
    setToastMessage(`Assigned ${helper.name} (${helper.role}) to your flat for today!`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handlePaySalary = (helper: HelperStaff, amount: number) => {
    if (onOpenPayment) {
      onClose();
      onOpenPayment(amount, `Monthly Salary Payout to ${helper.name} (${helper.role})`);
    } else {
      setToastMessage(`Paid ₹${amount} to ${helper.name} via StaySetu Wallet.`);
      setTimeout(() => setToastMessage(null), 4000);
    }
  };

  const myStaffList = helpers.slice(0, 2); // Sunita Devi & Ramesh Kumar as my registered staff
  const availableDirectory = helpers.filter(h =>
    h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    h.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-700 via-emerald-800 to-slate-900 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-teal-300 shadow-inner">
              <Users className="w-6 h-6 text-teal-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black tracking-tight text-white">Daily Help & Staff 360</h2>
                <span className="px-2 py-0.5 rounded-full bg-teal-400/20 text-teal-200 border border-teal-300/30 text-[10px] font-bold uppercase tracking-wider">
                  Live Radar
                </span>
              </div>
              <p className="text-xs text-teal-100/80">Attendance, Gate Radar & Salary Hub</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sub Navigation Tabs */}
        <div className="flex border-b border-slate-100 bg-slate-50/80 p-1.5 gap-1">
          <button
            onClick={() => setActiveSubTab('MY_STAFF')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'MY_STAFF'
                ? 'bg-white text-teal-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            My Daily Staff ({myStaffList.length})
          </button>
          <button
            onClick={() => setActiveSubTab('FIND_REPLACEMENT')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'FIND_REPLACEMENT'
                ? 'bg-white text-teal-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Find Maid / Cook
          </button>
          <button
            onClick={() => setActiveSubTab('SALARY')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'SALARY'
                ? 'bg-white text-teal-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Salary & Attendance
          </button>
        </div>

        {/* Toast Notification */}
        {toastMessage && (
          <div className="mx-4 mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-2 text-xs font-semibold text-emerald-800 shadow-sm animate-bounce">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">

          {/* TAB 1: MY DAILY STAFF */}
          {activeSubTab === 'MY_STAFF' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-slate-500 tracking-wider">
                  Assigned To Your Flat ({flatNo})
                </span>
                <span className="text-[11px] text-teal-700 font-bold">Auto In-Gate Notification ON</span>
              </div>

              {myStaffList.map(staff => (
                <div
                  key={staff.id}
                  className="p-4 rounded-3xl bg-white border border-slate-200 hover:border-teal-400 hover:shadow-md transition-all space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-700 text-white font-black text-base flex items-center justify-center shadow-md">
                        {staff.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-slate-900">{staff.name}</h4>
                          <span className="px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 text-[10px] font-black uppercase">
                            {staff.role}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-500">
                          <span className="flex items-center gap-0.5 text-amber-500 font-bold">
                            <Star className="w-3.5 h-3.5 fill-amber-400" /> {staff.rating}
                          </span>
                          <span>•</span>
                          <span>{staff.phone}</span>
                        </div>
                      </div>
                    </div>

                    {/* Live Inside Society Radar Badge */}
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 ${
                        staff.isInsideCampus
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          staff.isInsideCampus ? 'bg-emerald-500 animate-ping' : 'bg-slate-400'
                        }`}
                      />
                      {staff.isInsideCampus ? 'Inside Campus' : 'Not In Society'}
                    </span>
                  </div>

                  {/* Live Location Radar & Attendance Stamp */}
                  <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-slate-700">
                      <MapPin className="w-4 h-4 text-teal-600 shrink-0" />
                      <span className="font-semibold">Current Location: </span>
                      <span className="text-slate-900 font-bold">{staff.currentLocation}</span>
                    </div>
                    <a
                      href={`tel:${staff.phone}`}
                      className="px-3 py-1 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-700 font-bold flex items-center gap-1 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" /> Call
                    </a>
                  </div>

                  <div className="flex items-center justify-between pt-1 text-xs text-slate-500">
                    <span>Gate Check-In: <strong className="text-slate-800">07:42 AM Today</strong></span>
                    <span>Monthly Salary: <strong className="text-slate-800">₹{staff.ratePerDay * 26}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: FIND REPLACEMENT MAID / COOK */}
          {activeSubTab === 'FIND_REPLACEMENT' && (
            <div className="space-y-3">
              {/* Search input */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search cook, cleaning, baby sitter, driver..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-slate-500 tracking-wider">
                  Verified Society Helpers ({availableDirectory.length})
                </span>
                <span className="text-[11px] text-teal-700 font-semibold">Police & Guard Verified ✓</span>
              </div>

              <div className="space-y-3">
                {availableDirectory.map(helper => (
                  <div
                    key={helper.id}
                    className="p-4 rounded-3xl bg-white border border-slate-200 hover:border-teal-400 hover:shadow-md transition-all space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-slate-900">{helper.name}</h4>
                          <span className="flex items-center gap-0.5 text-amber-500 text-xs font-bold bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                            ★ {helper.rating}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500">{helper.role}</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">Rate: ₹{helper.ratePerDay}/day • ₹{helper.ratePerDay * 26}/month</p>
                      </div>

                      <div className="flex flex-col items-end gap-1">
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          {helper.currentLocation}
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                      <a
                        href={`tel:${helper.phone}`}
                        className="flex-1 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5" /> Call Directly
                      </a>
                      <button
                        onClick={() => handleBookHelper(helper)}
                        className="flex-1 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-95"
                      >
                        <Plus className="w-3.5 h-3.5" /> Hire for Flat
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: SALARY & ATTENDANCE */}
          {activeSubTab === 'SALARY' && (
            <div className="space-y-4">
              <div className="p-4 rounded-3xl bg-gradient-to-br from-slate-900 to-teal-950 text-white border border-teal-500/30 shadow-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wider">
                    September 2026 Payroll
                  </span>
                  <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full text-slate-300">
                    26 Working Days
                  </span>
                </div>
                <div className="text-2xl font-black text-white">₹14,300 Total Payroll</div>
                <p className="text-xs text-slate-300">
                  Calculated automatically from gate biometric check-in timestamps.
                </p>
              </div>

              <div className="space-y-3">
                {myStaffList.map(staff => {
                  const monthlyAmount = staff.ratePerDay * 26;
                  return (
                    <div
                      key={staff.id}
                      className="p-4 rounded-3xl bg-white border border-slate-200 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-sm text-slate-900">{staff.name}</h4>
                          <p className="text-xs text-slate-500">{staff.role} • 26 Days Present</p>
                        </div>
                        <div className="text-right">
                          <div className="text-base font-black text-slate-900">₹{monthlyAmount}</div>
                          <span className="text-[10px] text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded-full">
                            Due by 01 Oct
                          </span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                        <button
                          onClick={() => handlePaySalary(staff, monthlyAmount)}
                          className="w-full py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-95"
                        >
                          <DollarSign className="w-3.5 h-3.5" /> Pay Salary (Instant UPI / Receipt)
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Dock */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>100% Background & Police Verified Staff</span>
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
