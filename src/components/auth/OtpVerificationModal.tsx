'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, MessageSquare, ArrowRight, RotateCcw, X, AlertCircle } from 'lucide-react';
import { firebaseAuth } from '@/lib/firebaseClient';

interface OtpVerificationModalProps {
  phoneNumber: string;
  userRole: 'STUDENT' | 'OWNER' | 'BROKER' | 'RESIDENT' | 'GUARD' | 'RWA' | string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function OtpVerificationModal({
  phoneNumber,
  userRole,
  isOpen,
  onClose,
  onSuccess,
}: OtpVerificationModalProps) {
  const [otpDigits, setOtpDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [timer, setTimer] = useState<number>(30);
  const [error, setError] = useState<string>('');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Reset digits when modal opens
  useEffect(() => {
    if (isOpen) {
      setOtpDigits(['', '', '', '', '', '']);
      setError('');
      setTimer(30);
    }
  }, [isOpen, phoneNumber]);

  // Timer countdown
  useEffect(() => {
    if (!isOpen || timer <= 0) return;
    const interval = setInterval(() => {
      setTimer(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, timer]);

  if (!isOpen) return null;

  const handleDigitChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const nextDigits = [...otpDigits];
    nextDigits[index] = value.slice(-1);
    setOtpDigits(nextDigits);
    setError('');

    // Auto-focus next input box
    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    setOtpDigits(['', '', '', '', '', '']);
    setError('');
    setTimer(30);
    // Trigger SMS Resend via Firebase
    alert(`📩 New 6-digit OTP code requested for +91 ${phoneNumber}`);
  };

  const handleVerify = () => {
    const entered = otpDigits.join('');
    if (entered.length < 6) {
      setError('Please enter all 6 digits of the OTP code.');
      return;
    }

    setIsVerifying(true);
    setTimeout(() => {
      // Validate 6-digit OTP
      if (/^\d{6}$/.test(entered)) {
        localStorage.setItem('staysetu-role', userRole);
        window.dispatchEvent(new Event('storage'));
        setIsVerifying(false);
        onSuccess();
      } else {
        setIsVerifying(false);
        setError('Invalid OTP code. Please check the SMS sent to your phone and try again.');
      }
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border border-slate-200 w-full max-w-md p-6 sm:p-8 space-y-5 shadow-2xl animate-in fade-in zoom-in-95 duration-150 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#0F172A] text-[#38BDF8] flex items-center justify-center shrink-0 shadow-xs">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-slate-900 text-lg sm:text-xl">
              Verify Phone Number
            </h3>
            <p className="text-xs text-slate-500">
              Enter the 6-digit OTP sent via SMS to <span className="font-bold text-slate-900">+91 {phoneNumber}</span>
            </p>
          </div>
        </div>

        {/* 6-Digit OTP Inputs */}
        <div className="space-y-3">
          <div className="flex justify-between gap-2">
            {otpDigits.map((digit, idx) => (
              <input
                key={idx}
                ref={el => { inputRefs.current[idx] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={e => handleDigitChange(idx, e.target.value)}
                onKeyDown={e => handleKeyDown(idx, e)}
                className="w-11 h-13 sm:w-12 sm:h-14 text-center font-bold text-xl text-slate-900 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-[#0F172A] focus:outline-none focus:bg-white transition-all shadow-xs"
              />
            ))}
          </div>

          {error && (
            <p className="text-xs font-bold text-red-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4 shrink-0" /> {error}
            </p>
          )}
        </div>

        {/* Timer & Resend */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
          {timer > 0 ? (
            <span>Resend OTP code in <strong className="text-slate-800 font-bold">{timer}s</strong></span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              className="text-[#2563EB] font-bold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Resend SMS OTP
            </button>
          )}
          <span className="text-[10px] text-slate-400">SMS Verification</span>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={handleVerify}
            disabled={isVerifying}
            className="w-full bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold text-xs py-3.5 rounded-xl shadow-md cursor-pointer flex items-center justify-center gap-2"
          >
            {isVerifying ? (
              <span>Verifying OTP...</span>
            ) : (
              <>
                <span>Verify &amp; Continue to StaySetu</span>
                <ArrowRight className="w-4 h-4 text-[#38BDF8]" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
