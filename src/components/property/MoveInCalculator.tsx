'use client';

import React, { useState } from 'react';
import { Calculator, Info, CheckCircle } from 'lucide-react';
import { RoomOption } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/compatibility';

interface MoveInCalculatorProps {
  rooms: RoomOption[];
  monthlyExtraFoodCost?: number;
}

export const MoveInCalculator: React.FC<MoveInCalculatorProps> = ({
  rooms,
  monthlyExtraFoodCost = 0,
}) => {
  const [selectedRoomId, setSelectedRoomId] = useState<string>(rooms[0]?.id || '');
  const [otherCharges, setOtherCharges] = useState<number>(0);

  const selectedRoom = rooms.find((r) => r.id === selectedRoomId) || rooms[0];

  if (!selectedRoom) return null;

  const rent = selectedRoom.monthlyRent;
  const deposit = selectedRoom.securityDeposit;
  const brokerage = selectedRoom.brokerage;
  const foodCost = monthlyExtraFoodCost;

  const totalMoveIn = rent + deposit + brokerage + otherCharges + foodCost;

  return (
    <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 shadow-xs">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-200">
        <Calculator className="w-5 h-5 text-brand-600" />
        <div>
          <h3 className="font-bold text-slate-900 text-base">Total Move-In Cost Calculator</h3>
          <p className="text-xs text-slate-500">
            Transparent breakdown of initial expenses before moving in. No hidden costs.
          </p>
        </div>
      </div>

      {/* Select Room Option */}
      <div className="mb-4">
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
          Select Room Sharing Option:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {rooms.map((r) => (
            <button
              key={r.id}
              onClick={() => setSelectedRoomId(r.id)}
              className={`p-2.5 rounded-lg border text-left transition-all ${
                selectedRoomId === r.id
                  ? 'border-brand-600 bg-brand-50/70 ring-2 ring-brand-600/20 font-semibold'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                {r.sharingType.replace('_', ' ')}
              </div>
              <div className="text-sm font-bold text-slate-900">{formatCurrency(r.monthlyRent)}/mo</div>
            </button>
          ))}
        </div>
      </div>

      {/* Breakdown Matrix */}
      <div className="space-y-2.5 text-sm bg-white p-4 rounded-lg border border-slate-200 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-slate-600 flex items-center gap-1">
            First Month Rent
            <span className="text-[11px] text-slate-400 font-normal">(Monthly)</span>
          </span>
          <span className="font-semibold text-slate-900">{formatCurrency(rent)}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-600 flex items-center gap-1">
            Security Deposit
            <span className="text-[11px] text-emerald-600 bg-emerald-50 px-1 rounded font-medium">
              Refundable One-Time
            </span>
          </span>
          <span className="font-semibold text-slate-900">{formatCurrency(deposit)}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-600 flex items-center gap-1">
            Brokerage / Token Fee
            <span className="text-[11px] text-slate-400 font-normal">
              {brokerage > 0 ? '(One-Time)' : '(Zero Brokerage)'}
            </span>
          </span>
          <span className={`font-semibold ${brokerage > 0 ? 'text-slate-900' : 'text-emerald-600'}`}>
            {brokerage > 0 ? formatCurrency(brokerage) : '₹0'}
          </span>
        </div>

        {foodCost > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-slate-600 flex items-center gap-1">
              Food Plan Extra
              <span className="text-[11px] text-slate-400 font-normal">(Monthly)</span>
            </span>
            <span className="font-semibold text-slate-900">{formatCurrency(foodCost)}</span>
          </div>
        )}

        <div className="flex items-center justify-between pt-1">
          <span className="text-slate-600">Other Maintenance / Key Deposit</span>
          <span className="font-semibold text-slate-900">{formatCurrency(otherCharges)}</span>
        </div>

        <div className="border-t border-slate-200 pt-3 mt-2 flex items-center justify-between text-base">
          <span className="font-bold text-slate-900 flex items-center gap-1.5">
            Total Move-In Amount
          </span>
          <span className="font-black text-brand-700 text-lg">{formatCurrency(totalMoveIn)}</span>
        </div>
      </div>

      {/* Distinction Badge */}
      <div className="flex items-start gap-2 text-xs text-slate-600 bg-brand-50/60 border border-brand-100 p-3 rounded-lg">
        <Info className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-brand-900">
            One-time upfront costs: {formatCurrency(deposit + brokerage + otherCharges)} | Monthly recurring: {formatCurrency(rent + foodCost)}
          </p>
          <p className="text-[11px] text-brand-700 mt-0.5">
            StaySetu strictly mandates full transparency so you know exact expenses before visiting or booking.
          </p>
        </div>
      </div>
    </div>
  );
};
