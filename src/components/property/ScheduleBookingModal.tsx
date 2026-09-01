'use client';

import React, { useState } from 'react';
import { X, Calendar as CalendarIcon, Clock, Users, CheckCircle2 } from 'lucide-react';

interface ScheduleBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyName: string;
  propertyPrice: string;
}

export function ScheduleBookingModal({
  isOpen,
  onClose,
  propertyName,
  propertyPrice,
}: ScheduleBookingModalProps) {
  const [selectedDate, setSelectedDate] = useState<number>(3);
  const [selectedTime, setSelectedTime] = useState<string>('10:00 AM');
  const [guests, setGuests] = useState<number>(2);
  const [bookedSuccess, setBookedSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);
  const timeSlots = ['09:00 AM', '10:00 AM', '11:30 AM', '02:00 PM', '04:00 PM', '06:00 PM'];

  const handleConfirmBooking = () => {
    const newBooking = {
      id: Date.now(),
      propertyName,
      propertyPrice,
      date: `August ${selectedDate}, 2026`,
      time: selectedTime,
      guests,
      createdAt: new Date().toISOString(),
    };

    if (typeof window !== 'undefined') {
      const existing = localStorage.getItem('staysetu-scheduled-visits');
      const visits = existing ? JSON.parse(existing) : [];
      localStorage.setItem('staysetu-scheduled-visits', JSON.stringify([newBooking, ...visits]));
    }

    setBookedSuccess(true);
    setTimeout(() => {
      setBookedSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-950 rounded-3xl border-2 border-orange-500 w-full max-w-md p-6 space-y-5 shadow-2xl relative animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <span className="text-[10px] font-black uppercase bg-orange-100 text-orange-900 px-2.5 py-0.5 rounded-full">
              Schedule Property Visit
            </span>
            <h3 className="font-extrabold text-slate-900 dark:text-white text-lg mt-0.5">
              {propertyName}
            </h3>
            <p className="text-xs text-orange-600 font-black">{propertyPrice}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {bookedSuccess ? (
          <div className="p-8 text-center space-y-3 animate-in zoom-in-95">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
            <h4 className="font-black text-slate-900 dark:text-white text-xl">Visit Scheduled!</h4>
            <p className="text-xs text-slate-500">
              Your property tour on <strong>August {selectedDate}, 2026 at {selectedTime}</strong> has been saved. The owner will welcome you at the site!
            </p>
          </div>
        ) : (
          <div className="space-y-4 text-xs">
            
            {/* Calendar Date Picker */}
            <div className="space-y-2">
              <div className="flex items-center justify-between font-bold text-slate-800 dark:text-slate-200">
                <span className="flex items-center gap-1.5">
                  <CalendarIcon className="w-4 h-4 text-orange-500" /> Select Visit Date
                </span>
                <span className="text-xs text-slate-400">August 2026</span>
              </div>

              <div className="grid grid-cols-7 gap-1.5 text-center font-bold">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => (
                  <span key={idx} className="text-[10px] text-slate-400 py-1">{day}</span>
                ))}
                {daysInMonth.slice(0, 14).map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setSelectedDate(d)}
                    className={`py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                      selectedDate === d
                        ? 'bg-orange-500 text-white shadow-md scale-105'
                        : 'bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slots */}
            <div className="space-y-2">
              <span className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
                <Clock className="w-4 h-4 text-orange-500" /> Select Time Slot
              </span>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedTime(slot)}
                    className={`py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                      selectedTime === slot
                        ? 'bg-[#1E1B4B] text-orange-400 border border-orange-400 font-black shadow-xs'
                        : 'bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Guests Counter */}
            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-orange-500" />
                <span className="font-bold text-slate-800 dark:text-slate-200 font-semibold">Visitors Count</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setGuests(Math.max(1, guests - 1))}
                  className="w-7 h-7 rounded-lg bg-slate-200 dark:bg-slate-800 font-black text-slate-700 dark:text-slate-300 cursor-pointer"
                >
                  -
                </button>
                <span className="font-black text-sm text-slate-900 dark:text-white">{guests}</span>
                <button
                  type="button"
                  onClick={() => setGuests(guests + 1)}
                  className="w-7 h-7 rounded-lg bg-slate-200 dark:bg-slate-800 font-black text-slate-700 dark:text-slate-300 cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* Confirm CTA */}
            <button
              type="button"
              onClick={handleConfirmBooking}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-black py-3.5 rounded-2xl shadow-md text-sm transition-transform active:scale-95 cursor-pointer mt-2"
            >
              Book Property Visit Now
            </button>

          </div>
        )}

      </div>
    </div>
  );
}
